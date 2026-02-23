import styles from "./DisciplinaItemCard.module.css";

function DisciplinaItemCard({ nome, cor }) {
    return (
        <div className={styles.card}>
            <div className={styles.barra} style={{ backgroundColor: cor }} />
            <span className={styles.nome}>{nome}</span>
        </div>
    );
}

export default DisciplinaItemCard;
