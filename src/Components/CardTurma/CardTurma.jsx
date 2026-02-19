import style from "./CardTurma.module.css"

function CardTurma({id, nome, onClick}) {
    return (
        <div className={style.content} onClick={onClick}>
                <div>
                    <h1>{nome}</h1>
                </div>
        </div>
    )
}

export default CardTurma