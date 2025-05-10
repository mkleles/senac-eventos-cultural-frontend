import type React from "react";
import styles from "./LoginPage.module.css";
import { useState, type FormEvent } from "react";


interface LoginProps {
  onLoginSuccess?: (token: string) => void;
}


const LoginPage: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    try{
      const res = await fetch(
        "https://senac-eventos-cultural-backend-production.up.railway.app/auth/login",
        {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({ email, password}),

        }

      );
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message ||"Falha no login");
      }
      const data = await res.json();
      onLoginSuccess?.(data.token);
      alert("Login Efetuado");

    } catch (err: unknown) {
      if (err instanceof Error){
        setError(err.message);
        alert('Erro ao logar: ${err.message}');
      } else {
        const erroMsg = String(err);
        setError(erroMsg);
        alert('Erro ao logar: $(erroMsg)');

      }

    }
    
   }


  return (
    <div className={styles.login}>
      <form className={styles.form} onSubmit={handleSubmit}>
         {error && <div>{error}</div>}
      <div>
        <label className={styles.email}>Email</label>
        <input
        id="email"
        type="email"
        value={email}
        onChange={(e)=> setEmail(e.target.value)}
        
        />

      </div>

    
      <div>
        <label className={styles.senha}> Senha</label>
        <input  id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button type="submit" className={styles.button}>Entrar</button>
      </form>
    </div>
  );
}
export default LoginPage;
