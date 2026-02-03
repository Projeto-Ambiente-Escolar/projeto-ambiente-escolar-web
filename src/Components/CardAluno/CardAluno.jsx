import style from "./CardAluno.module.css"
import Foto from "../../../public/assets/foto_perfil_1.svg"

function CardAluno({foto}) {
    return (
        <div className={style.content}>
                <img src={foto? foto : Foto} width="110vh"/>
                <div>
                    <p>Marcelo Paschoareli</p>
                    <p id={style.matricula}>Matrícula: {929292092}</p>
                </div>
                <button id={style.status}>
                    Em Revisão
                </button>
        </div>
    )
}

export default CardAluno