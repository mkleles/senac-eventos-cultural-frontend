import React, { useState, type FormEvent } from 'react';
import styles from './RegisterPage.module.css';

interface RegisterProps {
  onRegisterSuccess?: () => void;
}

const RegisterPage: React.FC<RegisterProps> = ({ onRegisterSuccess }) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'PARTICIPANT' | 'ORGANIZER'>('PARTICIPANT');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;
    const senhaRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    if (!email || !emailRegex.test(email)) {
      newErrors.email = 'Por favor, insira um e-mail válido.';
    }
    if (!password || !senhaRegex.test(password)) {
      newErrors.password = 'A senha deve ter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas e números.';
    }
    if (!nome) {
      newErrors.name = 'O nome é obrigatório.';
    }
    if (!role) {
      newErrors.role = 'Selecione um tipo de usuário.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const res = await fetch(
        'https://senac-eventos-cultural-backend-production.up.railway.app/auth/register',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: nome, email, password, role }),
        }
      );

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Falha no registro');
      }

      alert('Cadastro realizado com sucesso!');
      onRegisterSuccess?.();
      window.location.href = '/login';
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      alert(`Erro ao registrar: ${msg}`);
    }
  };

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
        <h2 className={styles.title}>Registro</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="name">Nome</label>
            <input
              id="name"
              type="text"
              className={styles.input}
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Digite seu nome"
              required
            />
            {errors.name && <p className={styles.error}>{errors.name}</p>}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              type="email"
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu e-mail"
              required
            />
            {errors.email && <p className={styles.error}>{errors.email}</p>}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">Senha</label>
            <input
              id="password"
              type="password"
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua senha"
              required
            />
            {errors.password && <p className={styles.error}>{errors.password}</p>}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="role" className={styles.label}>Tipo</label>
            <select
              id="role"
              className={styles.select}
              value={role}
              onChange={(e) => setRole(e.target.value as 'PARTICIPANT' | 'ORGANIZER')}
              required
            >
              <option value="">Selecione</option>
              <option value="PARTICIPANT">Participante</option>
              <option value="ORGANIZER">Organizador</option>
            </select>
            {errors.role && <p className={styles.error}>{errors.role}</p>}
          </div>

          <button type="submit" className={styles.btnEntrar}>Registrar</button>
        </form>
      </main>
    </div>
  );
};

export default RegisterPage;
