import { useState } from "react"
import { criarRecado } from "../../services/recadoService"
import styles from "./CardRecado.module.css"

function CardRecado({fechar, id, idprofessor, nome, atualizar}) {

    const [mensagem, setMensagem] = useState("")

    const enviar = async () => {
        await criarRecado({ professor: idprofessor, aluno: id, mensagem: mensagem })
        atualizar();
        fechar()
    }

    return(
        <div>
        <div className={styles.overlay} onClick={fechar}></div>
            <div className={styles.cardnota}>
                <p id={styles.matricula}>Professor {nome ? nome.slice(0, 22) : "sem usuário"}</p>
                <textarea id={styles.inputobservacao} rows="2" maxLength={240} placeholder="Digite sua obervação..." onChange={(e) => setMensagem(e.target.value)}/>
                <div id={styles.button}>
                    <button id={styles.buttom_buscar} onClick={enviar}>Enviar</button>
                </div>
            </div>
        </div>
    )
}

export default CardRecado