import styles from "./LoginPage.module.css";

function LoginPage() {
  return (
    <div className={styles.login}>
      <div>
        <label className={styles.email}>Email</label>
        <input type="Email" />
      </div>

      <div>
        <label className={styles.senha}> Senha</label>
        <input type="Senha" />
      </div>
      <button className={styles.button}>Entrar</button>
    </div>
  );
}
export default LoginPage;
