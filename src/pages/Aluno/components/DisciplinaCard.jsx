import styles from "./DisciplinaCard.module.css";

function DisciplinaCard({ nome, onClick }) {
    return (
        <div className={styles.card}>
            <h3>{nome}</h3>
            <button onClick={onClick}>
                Ver observação
            </button>
        </div>
    );
}

export default DisciplinaCard;