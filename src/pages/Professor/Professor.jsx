import "./Professor.css"
import SideBar from "../../Components/SideBar/SideBar"
import Notas from "../Notas/Notas";
import { useState } from "react";
import Foto from "../../../public/assets/foto_perfil_1.svg"
import CardNota from "../../Components/CardNota/CardNota";
import Turmas from "../Turma/Turmas";


function Professor() {

    const professor = {nome:"Paulo Vaz", foto:Foto}

    const [aba, setAba] = useState("desempenho")

    const [selecionar, setSelecionar] = useState(false)

    const [turma, setTurma] = useState(0)

    const [mostrarCard, setMostrarCard] = useState(false)

    const trocarAba = (novaAba) => {
    setAba(novaAba)
    setSelecionar(false)}
    
    const abrir = () => {
        setMostrarCard(true)
    }

    const escolher = (id) =>{
        setSelecionar(true)
        setTurma(id)
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
                
            </div>

            {mostrarCard && <CardNota fechar={() => setMostrarCard(false)} />}
        </div>
    )
}


export default Professor