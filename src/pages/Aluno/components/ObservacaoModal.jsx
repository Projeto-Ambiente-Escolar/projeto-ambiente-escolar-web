import styles from "./ObservacaoModal.module.css";

function ObservacaoModal({ disciplina, observacao, onClose }) {
    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
                <button className={styles.fechar} onClick={onClose}>✕</button>

                <h2 className={styles.titulo}>Observação</h2>
                <p className={styles.disciplina}>{disciplina}</p>

                <div className={styles.caixaConteudo}>
                    <p className={styles.texto}>{observacao}</p>
                </div>
            </div>
        </div>
    );
}

export default ObservacaoModal;
