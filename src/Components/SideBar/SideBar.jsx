import { Link, useLocation, useNavigate } from "react-router-dom"
import Cookies from "js-cookie"
import styles from "./SideBar.module.css"
import { menuConfig } from "./menuConfig"
import Logo from "../../../public/assets/logo_side.svg"
import FotoPadrao from "../../../public/assets/foto_perfil.svg"

function SideBar({ tipo, nome, foto }) {
    const menu = menuConfig[tipo] || []
    const location = useLocation()
    const navigate = useNavigate()

    const fotoSrc = foto
        ? foto.startsWith('data:') || foto.startsWith('http') || foto.startsWith('/')
            ? foto
            : `data:image/jpeg;base64,${foto}`
        : FotoPadrao

    const handleLogout = () => {
        Cookies.remove('usuario')
        navigate('/')
    }

    return (
        <div className={styles.barContent}>
            <div className={styles.topo}>
                <img src={Logo} className={styles.imagem} />
            </div>

            <nav className={styles.navegadores}>
                {menu.map((item) => {
                    const ativo = location.pathname === item.rota
                    return (
                        <Link
                            key={item.label}
                            to={item.rota}
                            className={`${styles.opcao} ${ativo ? styles.ativo : ""}`}
                        >
                            <img src={item.icon} alt={item.label} className={styles.icone} />
                            <p>{item.label}</p>
                        </Link>
                    )
                })}
            </nav>

            <div className={styles.perfil}>
                <img src={fotoSrc} className={styles.fotoPerfil} />
                <p>{nome}</p>
            </div>

            <button className={styles.logout} onClick={handleLogout}>
                Sair
            </button>
        </div>
    )
}

export default SideBar
