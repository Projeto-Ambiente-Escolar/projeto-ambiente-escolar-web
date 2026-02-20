import style from "./Recado.module.css"

function Recado({nome, texto}) {
    return (
        <div className={style.aluno_card}>
                <div id={style.info_aluno}>
                    <p id={style.matricula}>Professor {nome ? nome.slice(0, 22) : "sem usuário"}</p>
                    <p>{texto ? texto : "......"}</p>
                </div>
        </div>
    )
}

export default Recado