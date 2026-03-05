import { useNavigate } from "react-router-dom";
import styles from "./AcessoNegado.module.css";

function AcessoNegado() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>🚫 Acesso Negado</h1>

      <p className={styles.text}>
        Você não tem permissão para acessar esta página!!!
      </p>

      <button
        className={styles.button}
        onClick={() => navigate("/")}
      >
        Voltar para o Login
      </button>
    </div>
  );
}

export default AcessoNegado;