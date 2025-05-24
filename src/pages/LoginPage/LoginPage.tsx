import React, { useState, type FormEvent } from 'react';
import styles from './LoginPage.module.css';
import { useAuth } from '../../contexts/AuthContext';
import NavBarComponent from '../../components/NavBar/NavBarComponent';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await fetch(
        'https://senac-eventos-cultural-backend-production.up.railway.app/auth/login',
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Falha no login");
      }
      const { token } = await res.json();
      login(token);
      window.location.href = "/"
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
        alert(`Erro ao logar: ${err.message}`);
      } else {
        const errorMsg = String(err);
        setError(errorMsg);
        alert(`Erro ao logar: ${errorMsg}`);
      }
    }
  };

  return (
   <div className={styles.pageContainer}>
  <NavBarComponent />
  <div className={styles.container}>
    <h2 className={styles.title}>Login</h2>
    <form onSubmit={handleSubmit} className={styles.form}>
      {/* Email */}
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

      {/* Senha */}
      <div className={styles.inputGroup}>
        <label htmlFor="password">Senha</label>
        <input
          type="password"
          id="password"
          name="senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Digite sua senha"
          required
        />
      </div>

      {/* Botão */}
      <button type="submit" className={styles.btnEntrar}>Entrar</button>

      {/* Erro */}
      {error && <div className={styles.error}>{error}</div>}

      {/* Link de cadastro */}
      <p className={styles.cadastroLink}>
        Não tem uma conta? <a href="/registro">Registre-se</a>
      </p>
    </form>
  </div>
</div>
  
  );
};

export default LoginPage;
