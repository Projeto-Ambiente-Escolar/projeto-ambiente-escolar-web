import style from "./Recado.module.css"
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { buscarAluno } from "../../services/alunoService";

function Recado({id, texto}) {

    const cookieData = Cookies.get('usuario')
    const usuario = cookieData ? JSON.parse(cookieData) : { nome: '', foto: null, id: null }

    const [professor, setProfessor] = useState([]);

    useEffect(() => {
        if (!usuario.id) {
            setErro("Usuário não identificado.");
            setCarregando(false);
            return;
        }
    
        buscarAluno(id)
            .then((data) => {
                setProfessor(data);
            })
    
    }, [usuario.id]);

    return (
        <div className={style.aluno_card}>
                <div id={style.info_aluno}>
                    <p id={style.matricula}>{professor.nome ? "Professor(a) " + professor.nome.slice(0, 22) : "Carregando..."}</p>
                    <p>{texto ? texto : "......"}</p>
                </div>
        </div>
    )
}

export default Recado