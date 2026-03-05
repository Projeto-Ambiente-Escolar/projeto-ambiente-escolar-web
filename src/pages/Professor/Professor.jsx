import "./Professor.css"
import SideBar from "../../Components/SideBar/SideBar"
import Notas from "../Notas/Notas";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import CardNota from "../../Components/CardNota/CardNota";
import Turmas from "../Turma/Turmas";
import Recados from "../Recados/Recados";
import CardRecado from "../../Components/CardRecado/CardRecado";
import { useLocation, Navigate } from "react-router-dom";
import Desempenho from "../Desempenho/Desempenho";


function Professor() {

    const cookieData = Cookies.get('usuario')
    const professor = cookieData ? JSON.parse(cookieData) : { id: 0, nome: '', foto: null }

    const location = useLocation()

    const [selecionar, setSelecionar] = useState(false)

    const [turma, setTurma] = useState(0)

    const [mostrarCardNota, setMostrarCardNota] = useState(false)

    const [mostrarCardRecado, setMostrarCardRecado] = useState(false)

    const [aluno, setAluno] = useState()

    const [att, setAtt] = useState(false)

    const aba = location.pathname

    useEffect(() => {
        setSelecionar(false)
        setTurma(0)
    }, [aba])

    if (aba === "/professor") return <Navigate to="/desempenho" replace />

    const abrir = (a) => {
        setAluno(a)
        setMostrarCardNota(true)
    }

    const escolher = (id) =>{
        setSelecionar(true)
        setTurma(id)
    }

    const abrirRecado = (a) =>{
        setAluno(a)
        setMostrarCardRecado(true)
    }

    const atualizarAlunos = (d) =>{
        setAtt(d)
    }

    return (
        <div className="professor-body">
            <SideBar tipo="professor" nome={professor.nome} foto={professor.foto} />
            <div id="conteudo-professor">
                {aba === "/lancar-notas" && (
                    !selecionar
                        ? <Turmas definir={escolher}/>
                        : <Notas idturma={turma} visualizar={abrir} atualizar={att} at={atualizarAlunos}/>
                )}

                {aba === "/desempenho" && <Desempenho abrir={Desempenho}/>}

                {aba === "/recados" && <Recados abrir={abrirRecado}/>}
                
            </div>

            {mostrarCardNota && <CardNota atualizar={att} at={atualizarAlunos} aluno={aluno} fechar={() => setMostrarCardNota(false)} />}

            {mostrarCardRecado && <CardRecado id={aluno.id} idprofessor={professor.id} nome={professor.nome} fechar={() => setMostrarCardRecado(false)} atualizar={() => {window.dispatchEvent(new Event("atualizarRecados"))}}/>}
        </div>
    )
}


export default Professor