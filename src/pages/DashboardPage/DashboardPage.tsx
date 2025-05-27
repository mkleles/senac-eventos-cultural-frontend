import React, {useEffect, useState, type FormEvent} from "react";
import styles from './DashboardPage.module.css'
import NavBarComponent from "../../components/NavBar/NavBarComponent";
import { useNavigate } from "react-router";

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

function DashboardPage() {
    const navigate = useNavigate();
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    const [editing, setEditing] = useState<Event | null>(null);
    const [formData, setFormData] = useState<Partial<Event & { bannerFile?: File }>>([]);
    const [modalError, setModalError] = useState<string | null>(null);
    const [modalSuccess, setModalSucess] = useState<boolean>(false);

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
        setEditing(evt),
        setFormData({
           title: evt.title,
           description: evt.description,
           location: evt.location,
           price: evt.price ?? 0 
        });
        setModalError(null);
        setModalSucess(false);
    };

    const handleUpdate = async (e: FormEvent) => {
        e.preventDefault();
        if (!editing) return;
        setModalError(null);
        setModalSucess(false);

        const token = localStorage.getItem('token');
        const fd = new FormData();
        fd.append('title', formData.title!);
        fd.append('description', formData.description!);
        fd.append('location', formData.location!);
        fd.append('pride', String(formData.price ?? 0));
        if (formData.bannerFile) fd.append('banner', formData.bannerFile);

        try {
            const res = await fetch(`${baseUrl}/events/${editing.id}`, {
                method: 'PUT',
                headers: { Authorization: `Baarer ${token}`},
                body: fd
            });
            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.message || `Erro ${res.status}`);
            }
            setModalSucess(true);
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
        if (!window.confirm('Confirmar exclusão deste evento')) return;
        const token = localStorage.getItem('token');
        try {
            const res = await fetch(`${baseUrl}/events/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}`}
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
            Carregando Eventos...
        </div>
    )


    return (
        <>
        <NavBarComponent />
        <div className={styles.container}>
            <h1> Meus Eventos</h1>
            <div>
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
                    {events.map(evt =>(
                        <tr key={evt.id}>
                            
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        {editing && (

        )}
        </>
    );
}

export default DashboardPage;