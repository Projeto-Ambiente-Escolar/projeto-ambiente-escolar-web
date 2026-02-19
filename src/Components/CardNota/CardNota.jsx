import styles from "./CardNota.module.css"
import Foto from "../../../public/assets/foto_perfil_1.svg"
import Dropdown from "../DropDown/DropDown"
import { useState } from "react"

function CardNota({fechar, aluno}) {

    const opcoes = [
        { value: "nome", label: "Em Revisão" },
        { value: "nota", label: "Aprovado" },
        { value: "matricula", label: "Reprovado" }
    ]

    const [ativo, setAtivo] = useState(false)

    return(
        <div>
        <div className={styles.overlay} onClick={fechar}></div>

            <div className={styles.cardnota}>
                <div id={styles.info}>
                    <img src={aluno?.foto || Foto} />
                    <div>
                        <p id={styles.nome}>{aluno?.nome || "..........................."}</p>
                        <p id={styles.matricula}>Matrícula: {aluno?.matricula || "000000"}</p>
                    </div>
                    <Dropdown options={opcoes}></Dropdown>
                    <button className={`${styles.enviar} ${ativo ? "" : styles.inativo}`}>Enviar</button>
                </div>
                <div id={styles.lancamento}>
                    <div id={styles.primeira}>
                        <div id={styles.nota}>
                            <p>Nota 1:</p>
                            <input type="number" id={styles.inputnota} placeholder="0"/>
                        </div>
                        <div id={styles.meio}>
                            <p>+</p>
                        </div>
                        <div id={styles.nota}>
                            <p>Nota 2:</p>
                            <input type="number" id={styles.inputnota} placeholder="0"/>
                        </div>
                    </div>
                    <div id={styles.meio}>
                            <p>=</p>
                        </div>
                    <div id={styles.segunda}>
                        <div id={styles.nota}>
                            <p>Média:</p>
                            <input type="number" disabled="true" value={0} placeholder="0" id={styles.inputnota}/>
                        </div>
                    </div>
                    <div id={styles.terceira}>
                        <button id={styles.calcular}>Calcular</button>
                    </div>
                    <div id={styles.quarta}>
                        <div id={styles.observacao}>
                            <p>Observação:</p>
                            <textarea id={styles.inputobservacao} rows="2" maxLength={240}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardNota