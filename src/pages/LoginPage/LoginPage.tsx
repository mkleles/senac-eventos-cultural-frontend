
import { useState } from 'react';
import styles from './LoginPage.module.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('E-mail:', email);
    console.log('Senha:', senha);
  };

  return (
    <>
    <header className={styles.header}>
      <h1 className={styles.title}>Senac Eventos Cultural</h1>
      <nav>
        <button className={styles.navButton}>Login</button>
      </nav>
    </header>
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite seu e-mail"
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="senha">Senha</label>
          <input
            type="password"
            id="senha"
            name="senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Digite sua senha"
            required
          />
        </div>
        <button type="submit" className={styles.btnEntrar}>Entrar</button>
        <p className={styles.cadastroLink}>
          Não tem uma conta? <a href="/registro">Registre-se</a>
        </p>
      </form>
    </div>
    </>
  );
};

export default LoginPage;
