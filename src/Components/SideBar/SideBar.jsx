import { useState } from "react"
import styles from "./SideBar.module.css"
import Logo from "../../../public/assets/logo_side.svg"
import Desempenho from "../../../public/assets/desempenho_icon.svg"
import Lancar from "../../../public/assets/lancar_icon.svg"
import Recado from "../../../public/assets/recado_icon.svg"

function SideBar({ aba, escolher }) {

    const clicar = (escolha) => {
        escolher(escolha)
    }

    return (
        <div className={styles.barContent}>
            <img src={Logo} id={styles.imagem}/>

            <div id={styles.navegadores}>
                <div
                    className={`${styles.opcao} ${aba === "desempenho" ? styles.ativo : ""}`}
                    onClick={() => clicar("desempenho")}>
                    <img src={Desempenho} width="16vh" />
                    <p>Desempenho</p>
                </div>
                <div
                    className={`${styles.opcao} ${aba === "lancar" ? styles.ativo : ""}`}
                    onClick={() => clicar("lancar")}>
                    <img src={Lancar} width="16vh" />
                    <p>Lançar Notas</p>
                </div>
                <div
                    className={`${styles.opcao} ${aba === "recado" ? styles.ativo : ""}`}
                    onClick={() => clicar("recado")}>
                    <img src={Recado} width="24vh" />
                    <p>Recados</p>
                </div>

            </div>
        </div>
    )
}


export default SideBar
