import styles from "./BarraSuperior.module.css"
import Logo from "../../../public/assets/logooo.svg"
import Foto from "../../../public/assets/foto_perfil.svg"

function BarraSuperior({nome, foto}) {
    return (
        <div className={styles.barContent}>
            <img src={Logo} width="40vh" />
            <div id={styles.perfil}>
                <p>{nome}</p>
                <img src={foto? foto : Foto } width="35vh" />
            </div>
        </div>
    )
}

export default BarraSuperior