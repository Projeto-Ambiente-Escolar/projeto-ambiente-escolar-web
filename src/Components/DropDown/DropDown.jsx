import { useState } from "react"
import styles from "./Dropdown.module.css"

function Dropdown({ options = [], onSelect }) {
    const [aberto, setAberto] = useState(false)
    const [selecionado, setSelecionado] = useState(null)

    const selecionar = (opcao) => {
        setSelecionado(opcao)
        setAberto(false)
        if (onSelect) onSelect(opcao)
    }

    return (
        <div className={styles.dropdown}>
            <div 
                className={styles.header}
                onClick={() => setAberto(!aberto)}
            >
                {selecionado ? selecionado.label : "Em Revisão ▾"}
            </div>

            {aberto && (
                <div className={styles.lista}>
                    {options.map((opcao) => (
                        <div 
                            key={opcao.value}
                            className={styles.item}
                            onClick={() => selecionar(opcao)}
                        >
                            {opcao.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Dropdown
