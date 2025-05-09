import { useState } from 'react';
import styles from './RegistroPage.module.css';

const RegistroPage = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [tipo, setTipo] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;
    const senhaRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    if (!email || !emailRegex.test(email)) {
      newErrors.email = 'Por favor, insira um e-mail válido.';
    }
    if (!senha || !senhaRegex.test(senha)) {
      newErrors.senha = 'A senha deve ter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas e números.';
    }
    if (!nome) {
      newErrors.nome = 'O nome é obrigatório.';
    }
    if (!tipo) {
      newErrors.tipo = 'Selecione um tipo de usuário.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Dados do usuário:', { nome, email, senha, tipo });
      // Aqui você pode adicionar lógica para enviar os dados para um servidor
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
            <label htmlFor="nome">Nome</label>
            <input
              type="text"
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Digite seu nome"
              required
            />
            {errors.nome && <p className={styles.error}>{errors.nome}</p>}
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu e-mail"
              required
            />
            {errors.email && <p className={styles.error}>{errors.email}</p>}
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Digite sua senha"
              required
            />
            {errors.senha && <p className={styles.error}>{errors.senha}</p>}
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="tipo">Tipo</label>
            <select
              id="tipo"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              required
            >
              <option value="">Selecione</option>
              <option value="participante">Participante</option>
              <option value="organizador">Organizador</option>
            </select>
            {errors.tipo && <p className={styles.error}>{errors.tipo}</p>}
          </div>
          <button type="submit" className={styles.btnEntrar}>Registrar</button>
        </form>
      </main>
    </div>
  );
};

export default RegistroPage;
