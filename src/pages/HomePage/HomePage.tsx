import styles from './HomePage.module.css'

function HomePage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Senac Eventos Cultural</h1>
      <p className={styles.subtitle}>Seja bem-vindo!</p>
    </div>
  )
}

export default HomePage