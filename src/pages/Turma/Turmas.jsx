import { useState } from "react"
import Filtro from "../../../public/assets/filter_icon.svg"
import styles from "./Turmas.module.css"
import CardTurma from "../../Components/CardTurma/CardTurma";


function Turmas({definir}) {
    
    const [ordem, setOrdem] = useState(1);
    const [mostrarDropdown, setMostrarDropdown] = useState(false);

    const turmas = [{id:1, nome:"3°G"}, {id:2, nome:"2°G"}, {id:3, nome:"1°G"}, {id:4, nome:"3°A"}]
    

    return (
        <div id={styles.turmas_content}>
            <h3 className={styles.titulo}>Minhas Turmas</h3>
            <div id={styles.turmas_search}>
                <div>
                    <button
                    id="buttom-filtrar"
                    onClick={() => setMostrarDropdown(!mostrarDropdown)}>
                    <img src={Filtro} id="filtro"/>
                    </button>
                    <div id="dropdown-content" className={mostrarDropdown ? "ativo" : ""}>
                            <button id="drop-element" onClick={() => setOrdem(1)}>A-Z</button>
                            <button id="drop-element" onClick={() => setOrdem(-1)}>Z-A</button>
                    </div>
                </div>
            </div>
            <div id={styles.turmas_cards}>
                {
                    turmas.sort((a, b) =>
                        ordem === 1
                            ? a.nome.localeCompare(b.nome)
                            : b.nome.localeCompare(a.nome)
                    ).map((turma, index) => (
                        <CardTurma key={index} id={turma.id} nome={turma.nome} onClick={() => definir(turma.id)}>
                        </CardTurma>
                    ))
                }
            </div>
        </div>
    )
}

export default Turmas