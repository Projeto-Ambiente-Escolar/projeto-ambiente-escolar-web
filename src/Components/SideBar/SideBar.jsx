import styles from "./SideBar.module.css"
import Logo from "../../../public/assets/logo_side.svg"
import Desempenho from "../../../public/assets/desempenho_icon.svg"


function SideBar() {
    return (
        <div className={styles.barContent}>
            <img src={Logo} width="180vh"/>
            <div id={styles.navegadores}>
                <div id={styles.desempenho}>
                    <img src={Desempenho} width="16vh"/>
                    <p>Desempenho</p>
                </div>

            </div>
        </div>
    )
}

export default SideBar