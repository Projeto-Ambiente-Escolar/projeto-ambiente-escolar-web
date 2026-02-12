import styles from "../Secretaria.module.css";

function SolicitacaoCard({
    id,
    nome,
    matricula,
    selecionado,
    toggleSelecionado,
    onDetalhes
}) {
    return (
        <div className={styles.solicitacaoAluno}>
            <label className={styles.selectOneLabel}>
                <input
                    className={styles.selectOneInput}
                    type="checkbox"
                    checked={selecionado}
                    onChange={() => toggleSelecionado(id)}
                />
                <span className={styles.selectOneCheckmark}></span>
            </label>

            <div className={styles.linha}></div>

            <div className={styles.infosAluno}>
                <p className={styles.nomeAluno}>{nome}</p>
                <p className={styles.matriculaAluno}>
                    Matrícula: {matricula}
                </p>
            </div>

            <div className={styles.btnsAluno}>
                <button className={styles.btnDetalhes} onClick={onDetalhes}>Detalhes</button>
                <button className={styles.btnAprovar}>Aprovar</button>
                <button className={styles.btnReprovar}>Reprovar</button>
            </div>
        </div>
    );
}

export default SolicitacaoCard;
