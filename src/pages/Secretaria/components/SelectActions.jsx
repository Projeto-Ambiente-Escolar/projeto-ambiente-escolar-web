import styles from "../Secretaria.module.css";

function SelectActions({selecionarTodos, quantidadeSelecionados, todosSelecionados, onAprovarSelecionados, onReprovarSelecionados
}) {
    return (
        <div id={styles.selectContainer}>
            <label className={styles.selectAllLabel}>
                <input
                    className={styles.selectAllInput}
                    type="checkbox"
                    checked={todosSelecionados}
                    onChange={selecionarTodos}
                />
                <span className={styles.selectAllCheckmark}></span>
                Selecionar Todos
            </label>

            <h2>Selecionados:</h2>

            <div id={styles.selectAllButtons}>
                <button className={styles.btnAprovar} onClick={onAprovarSelecionados}>Aprovar</button>
                <button className={styles.btnReprovar} onClick={onReprovarSelecionados}>Reprovar</button>
            </div>
        </div>
    );
}

export default SelectActions;
