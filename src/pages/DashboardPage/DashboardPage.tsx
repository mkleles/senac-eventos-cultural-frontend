// src/pages/MyEventsPage.tsx
import React, { useEffect, useState, type FormEvent } from 'react';
import styles from './DashboardPage.module.css';
import NavBarComponent from '../../components/NavBar/NavBarComponent';
import { useNavigate } from 'react-router';
import ParticipantsModal from '../../components/ParticipantsModal/ParticipantsModal';

interface Event {
  id: number;
  title: string;
  description: string;
  location: string;
  bannerUrl: string;
  price: number | null;
  createdAt: string;
  subscriptionCount: number;
}

function DashBoardPage() {
  const [viewingEventId, setViewingEventId] = useState<number | null>(null);
  const navigate = useNavigate();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  

  const [editing, setEditing] = useState<Event | null>(null);
  const [formData, setFormData] = useState<Partial<Event & { bannerFile?: File }>>({});
  const [modalError, setModalError] = useState<string | null>(null);
  const [modalSuccess, setModalSuccess] = useState<boolean>(false);

  const baseUrl = 'https://senac-eventos-cultural-backend-production.up.railway.app';

  const fetchEvents = async () => {
    setLoading(true);
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${baseUrl}/events/myevents`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error(`Erro ${res.status}`);
      const data: Event[] = await res.json();
      setEvents(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || 'Erro ao buscar eventos');
      } else {
        setError('Erro ao buscar eventos');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const openEditModal = (evt: Event) => {
    setEditing(evt);
    setFormData({
      title: evt.title,
      description: evt.description,
      location: evt.location,
      price: evt.price ?? 0
    });
    setModalError(null);
    setModalSuccess(false);
  };

  // Submete update
  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    setModalError(null);
    setModalSuccess(false);

    const token = localStorage.getItem('token');
    const fd = new FormData();
    fd.append('title', formData.title!);
    fd.append('description', formData.description!);
    fd.append('location', formData.location!);
    fd.append('price', String(formData.price ?? 0));
    if (formData.bannerFile) fd.append('banner', formData.bannerFile);

    try {
      const res = await fetch(`${baseUrl}/events/${editing.id}`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
        body: fd
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || `Erro ${res.status}`);
      }
      setModalSuccess(true);
      fetchEvents();          
      setEditing(null);        
    } catch (err: unknown) {
      if (err instanceof Error) {
        setModalError(err.message);
      } else {
        setModalError('Erro ao atualizar evento');
      }
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Confirmar exclusão deste evento?')) return;
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${baseUrl}/events/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error(`Erro ${res.status}`);
      fetchEvents();
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message || 'Erro ao apagar evento');
      } else {
        alert('Erro ao apagar evento');
      }
    }
  };
  

  if (loading) return (
        <div className={styles.loading}>
            Carregando eventos…
        </div>
    )
  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <>
      <NavBarComponent />
      <div className={styles.container}>
        <h1>Meus Eventos</h1>
        <div className={styles.addButtonContainer}>
            <button className={styles.addButton} onClick={() => navigate('/create_events')}>
                + Criar novo evento
            </button>
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Título</th>
              <th>Inscritos</th>
              <th>Criado em</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {events.map(evt => (
              <tr key={evt.id}>
                <td>{evt.title}</td>
                <td>{evt.subscriptionCount}</td>
                <td>{new Date(evt.createdAt).toLocaleDateString()}</td>
                <td className={styles.actions}>
                  <button onClick={() => setViewingEventId(evt.id)}>
                    Visualizar participantes
                  </button>


                  {viewingEventId !== null && (
                    <ParticipantsModal
                      eventId={viewingEventId}
                      onClose={() => setViewingEventId(null)}
                    />
                  )}
                  <button onClick={() => openEditModal(evt)}>Editar</button>
                  <button className={styles.deleteBtn} onClick={() => handleDelete(evt.id)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editing && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>Editar Evento</h2>
            {modalError && <div className={styles.error}>{modalError}</div>}
            <form onSubmit={handleUpdate}>
              <label>
                Título
                <input
                  type="text"
                  value={formData.title}
                  onChange={e => setFormData(f => ({ ...f, title: e.target.value }))}
                  required
                />
              </label>
              <label>
                Descrição
                <textarea
                  value={formData.description}
                  onChange={e => setFormData(f => ({ ...f, description: e.target.value }))}
                  required
                />
              </label>
              <label>
                Localização
                <input
                  type="text"
                  value={formData.location}
                  onChange={e => setFormData(f => ({ ...f, location: e.target.value }))}
                  required
                />
              </label>
              <label>
                Preço (R$)
                <input
                  type="number"
                  min="0"
                  value={formData.price ?? ''}
                  onChange={e => setFormData(f => ({ ...f, price: Number(e.target.value) }))}
                  required
                />
              </label>
              <label>
                Novo Banner (opcional)
                <input
                  type="file"
                  accept="image/*"
                  onChange={e => {
                    const file = e.target.files?.[0];
                    setFormData(f => ({ ...f, bannerFile: file }));
                  }}
                />
              </label>
              <div className={styles.modalActions}>
                <button type="button" onClick={() => setEditing(null)}>Cancelar</button>
                <button type="submit">Salvar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default DashBoardPage;