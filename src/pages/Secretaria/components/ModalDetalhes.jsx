import styles from "./ModalDetalhes.module.css";
import FotoPadrao from "../../../../public/assets/foto_perfil_1.svg"

function ModalDetalhes({ aluno, onClose }) {
    if (!aluno) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContainer}>
            <button
                    className={styles.modalBotaoFechar}
                    onClick={onClose}
                >
                X
            </button>
            
            <img
                src={aluno.foto && aluno.foto !== "" ? aluno.foto : FotoPadrao}
                alt="Foto do aluno"
                className={styles.modalFoto}
            />
                <div className={styles.modalTexts}>
                    <p className={styles.modalNome}>{aluno.nome}</p>
                    <p className={styles.modalMatricula}>Matrícula: {aluno.matricula}</p>
                    <p className={styles.modalEmail}>{aluno.email}</p>
                </div>
            </div>
        </div>
    );
}

export default ModalDetalhes;
