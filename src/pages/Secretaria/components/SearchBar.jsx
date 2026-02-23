import styles from "../Secretaria.module.css";

function SearchBar({ inputBusca, setInputBusca, onBuscar }) {
    return (
        <div id={styles.searchContainer}>
            <input
                className={styles.searchInput}
                type="text"
                placeholder="Buscar por matrícula"
                value={inputBusca}
                onChange={(e) => {
                    setInputBusca(e.target.value);
                    if (e.target.value === "") onBuscar(""); 
                }}
                onKeyDown={(e) => {
                    if (e.key === "Enter") onBuscar();
                }}
            />

            <button
                className={styles.searchButton}
                onClick={onBuscar}
            >
                Buscar
            </button>
        </div>
    );
}

export default SearchBar;
