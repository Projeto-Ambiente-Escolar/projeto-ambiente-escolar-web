import styles from "./BarraSuperior.module.css"
import Logo from "../../../public/assets/logooo.svg"
import Foto from "../../../public/assets/foto_perfil.svg"

function BarraSuperior() {
    return (
        <div className={styles.barContent}>
            <img src={Logo} width="40vh" />
            <div id={styles.perfil}>
                <p>Professor Paulo</p>
                <img src={Foto} width="35vh" />
            </div>
        </div>
    )
}

export default BarraSuperior