import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import styles from './EventsPage.module.css';

function EventsPage() {
  const events = [
    { title: 'Evento 1', location: 'Local 1' },
    { title: 'Evento 2', location: 'Local 2' },
    { title: 'Evento 3', location: 'Local 3' },
  ];

  return (
    <>
      {/* Cabeçalho fixo */}
      <header className={styles.header}>
        <div className={styles.logo}>Senac Eventos Cultural</div>
        <nav className={styles.nav}>
          <button className={styles.navButton}>Login</button>
          <button className={styles.navButton}>Eventos</button>
          <button className={styles.navButton}>Meus Eventos</button>
        </nav>
      </header>

      {/* Conteúdo da página */}
      <div className={styles.container}>
        <h1 className={styles.title}>Página de Eventos</h1>

        <div className={styles.cardContainer}>
          {events.map((event, index) => (
            <div key={index} className={styles.card}>
              <h2>{event.title}</h2>
              <p>{event.location}</p>
              <ButtonComponent>Inscrever-se</ButtonComponent>
              <button>Contactar organizador</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default EventsPage;
