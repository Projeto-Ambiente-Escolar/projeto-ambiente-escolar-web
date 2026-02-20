import styles from "./CardRecado.module.css"

function CardRecado({fechar, id, nome}) {

    const enviar = () => {
        console.log("dwd")
        fechar()
    }

    return(
        <div>
        <div className={styles.overlay} onClick={fechar}></div>
            <div className={styles.cardnota}>
                <p id={styles.matricula}>Professor {nome ? nome.slice(0, 22) : "sem usuário"}</p>
                <textarea id={styles.inputobservacao} rows="2" maxLength={240}/>
                <div id={styles.button}>
                    <button id={styles.buttom_buscar} onClick={enviar}>Enviar</button>
                </div>
            </div>
        </div>
    )
}

export default CardRecado