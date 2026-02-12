import styles from "../Secretaria.module.css";

function SelectActions({ selecionarTodos, todosSelecionados }) {
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
                <button className={styles.btnAprovar}>Aprovar</button>
                <button className={styles.btnReprovar}>Reprovar</button>
            </div>
        </div>
    );
}

export default SelectActions;
