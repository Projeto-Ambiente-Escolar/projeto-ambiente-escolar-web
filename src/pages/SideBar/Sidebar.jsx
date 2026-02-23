import { Link, useLocation } from "react-router-dom"
import styles from "./Sidebar.module.css"
import { menuConfig } from "./menuConfig"
import Logo from "../../../public/assets/logooo.svg"
import Foto from "../../../public/assets/foto_perfil.svg"

function Sidebar({ nome, foto, tipo }) {
    const menu = menuConfig[tipo] || []
    const location = useLocation()

    return (
        <aside className={styles.sidebar}>
            <div className={styles.topo}>
                <img src={Logo} className={styles.logo} />
                <h2>Escola<br />Conecta</h2>
            </div>

            <nav className={styles.menu}>
                {menu.map((item) => {
                    const Icon = item.icon
                    const ativo = location.pathname === item.rota
                    return (
                        <Link
                            key={item.label}
                            to={item.rota}
                            className={`${styles.item} ${ativo ? styles.ativo : ""}`}
                        >
                            <Icon className={styles.icon} />
                            <span>{item.label}</span>
                        </Link>
                    )
                })}
            </nav>

            <div className={styles.perfil}>
                <img src={foto || Foto} />
                <p>{nome}</p>
            </div>
        </aside>
    )
}

export default Sidebar