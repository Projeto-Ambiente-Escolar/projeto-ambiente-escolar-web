import styles from "../Secretaria.module.css";

function ModalDetalhes({ aluno, onClose }) {
    if (!aluno) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContainer}>
                <h2 className={styles.modalTitulo}>
                    Detalhes do Aluno
                </h2>

                <p><strong>Nome:</strong> {aluno.nome}</p>
                <p><strong>Matrícula:</strong> {aluno.matricula}</p>

                <button
                    className={styles.modalBotaoFechar}
                    onClick={onClose}
                >
                    Fechar
                </button>
            </div>
        </div>
    );
}

export default ModalDetalhes;
