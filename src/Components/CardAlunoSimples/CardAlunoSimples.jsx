import style from "./CardAlunoSimples.module.css"
import Foto from "../../../public/assets/foto_perfil_1.svg"

function CardAlunoSimples({id, foto, nome, matricula, abrir, selecionado}) {
    return(
        <div className={`${style.aluno_card} ${selecionado ? style.ativo : ''}`} onClick={() => abrir({id, nome})}>
            <img src={foto? foto : Foto} />
            <div id={style.info_aluno}>
                <p>{nome ? nome.slice(0, 22) : "........."}</p>
                <p id={style.matricula}>Matrícula: {matricula? matricula : 0}</p>
            </div>
        </div>
    )
}

export default CardAlunoSimples