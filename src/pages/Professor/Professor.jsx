import "./Professor.css"
import SideBar from "../../Components/SideBar/SideBar"
import Notas from "../Notas/Notas";
import { useState } from "react";
import Foto from "../../../public/assets/foto_perfil_1.svg"
import CardNota from "../../Components/CardNota/CardNota";
import Turmas from "../Turma/Turmas";
import Recados from "../Recados/Recados";
import CardRecado from "../../Components/CardRecado/CardRecado";


function Professor() {

    const professor = {nome:"Paulo Vaz", foto:Foto}

    const [aba, setAba] = useState("desempenho")

    const [selecionar, setSelecionar] = useState(false)

    const [turma, setTurma] = useState(0)

    const [mostrarCardNota, setMostrarCardNota] = useState(false)

    const [mostrarCardRecado, setMostrarCardRecado] = useState(false)

    const [aluno, setAluno] = useState()
   

    const trocarAba = (novaAba) => {
    setAba(novaAba)
    setSelecionar(false)}
    
    const abrir = () => {
        setMostrarCardNota(true)
    }

    const escolher = (id) =>{
        setSelecionar(true)
        setTurma(id)
    }

    const abrirRecado = (id) =>{
        setAluno(id)
        setMostrarCardRecado(true)
    }

    return (
        <div className="professor-body">
            <SideBar aba={aba} escolher={trocarAba} />            
            <div id="conteudo-professor">
                <div id="header-professor">
                    <p>{`Professor ${professor.nome}`}</p>
                    <img src={professor?.foto || Foto} className="foto-professor" />
                </div>
                {aba === "lancar" && (
                    !selecionar 
                        ? <Turmas definir={escolher}/> 
                        : <Notas idturma={turma} visualizar={abrir}/>
                )}

                {aba === "recado" && <Recados abrir={abrirRecado}/>}
                
            </div>

            {mostrarCardNota && <CardNota fechar={() => setMostrarCardNota(false)} />}

            {mostrarCardRecado && <CardRecado id={aluno} fechar={() => setMostrarCardRecado(false)} />}
        </div>
    )
}


export default Professor