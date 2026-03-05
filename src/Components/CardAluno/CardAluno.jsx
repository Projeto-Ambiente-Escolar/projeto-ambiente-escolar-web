import style from "./CardAluno.module.css"
import Foto from "../../../public/assets/foto_perfil_1.svg"

function CardAluno({id, foto, nome, matricula, status, abrir}) {
    return (
        <div className={style.content} onClick={() => abrir({id, foto, nome, matricula, status})}>                
            <img src={foto? foto : Foto} width="110vh"/>
            <div>
                <p>{nome ? nome.slice(0, 22) : "........."}</p>
                <p id={style.matricula}>Matrícula: {matricula? matricula : 0}</p>
            </div>
            <button id={style.status}>
                {status? status : 'Não Carregado'}
            </button>
        </div>
    )
}

export default CardAluno