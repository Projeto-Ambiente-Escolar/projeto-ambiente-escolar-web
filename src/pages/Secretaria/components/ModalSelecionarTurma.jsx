import styles from "./ModalSelecionarTurma.module.css";

function ModalSelecionarTurma({ aluno, turmas, onSelecionar, onClose }) {

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>

                <h2  className={styles.nomeAluno}>
                    {aluno.nome}
                </h2>

                <p>
                    Selecionar turma:               
                </p>

                <div className={styles.turmas}>
                    {turmas.map((turma) => (
                        <button
                            key={turma.id}
                            className={styles.turmaBtn}
                            onClick={() => onSelecionar(turma.id)}
                        >
                            {turma.serie}{turma.turma}
                        </button>
                    ))}
                </div>

                <button
                    className={styles.cancelar}
                    onClick={onClose}
                >
                    Cancelar
                </button>

            </div>
        </div>
    );
}

export default ModalSelecionarTurma;