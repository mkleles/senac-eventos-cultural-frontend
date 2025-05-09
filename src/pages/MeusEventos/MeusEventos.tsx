import styles from './MeusEventos.module.css'; // Ajuste o caminho para o seu arquivo de CSS

const MeusEventos = () => {
  const eventos = [
    { nome: 'João Silva' },
    { nome: 'Maria Souza' },
    { nome: 'Pedro Oliveira' },
  ];

  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <div className={styles.logo}>Senac Eventos Cultural</div>
        <nav className={styles.nav}>
          <button className={styles.navButton}>Login</button>
          <button className={styles.navButton}>Eventos</button>
          <button className={styles.navButton}>Meus Eventos</button>
        </nav>
      </header>

      <main className={styles.mainContent}>
        <h2 className={styles.title}>Meus Eventos</h2>
        <table className={styles.eventTable}>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {eventos.map((evento, index) => (
              <tr key={index}>
                <td>{evento.nome}</td>
                <td className={styles.actions}>
                  <button className={styles.viewBtn}>Visualizar participantes</button>
                  <button className={styles.editBtn}>Editar</button>
                  <button className={styles.shareBtn}>Partilhar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default MeusEventos;

