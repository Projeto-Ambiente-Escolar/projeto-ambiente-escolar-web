import { Link, useLocation, useNavigate } from "react-router-dom"
import Cookies from "js-cookie"
import styles from "./SideBar.module.css"
import { menuConfig } from "./menuConfig"
import Logo from "../../../public/assets/logo_side.svg"
import FotoPadrao from "../../../public/assets/foto_perfil.svg"

function SideBar({ tipo, nome }) {
    const menu = menuConfig[tipo] || []
    const location = useLocation()
    const navigate = useNavigate()

    const fotoRaw = localStorage.getItem('usuario_foto')
    const fotoSrc = fotoRaw
        ? fotoRaw.startsWith('data:') || fotoRaw.startsWith('http') || fotoRaw.startsWith('/')
            ? fotoRaw
            : `data:image/jpeg;base64,${fotoRaw}`
        : FotoPadrao

    const handleLogout = () => {
        Cookies.remove('usuario')
        localStorage.removeItem('usuario_foto')
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
