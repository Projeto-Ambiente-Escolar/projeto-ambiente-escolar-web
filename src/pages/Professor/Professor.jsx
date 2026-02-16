import "./Professor.css"
import SideBar from "../../Components/SideBar/SideBar"
import Notas from "../Notas/Notas";
import { useState } from "react";
import Foto from "../../../public/assets/foto_perfil_1.svg"


function Professor() {

    const professor = {nome:"Paulo Vaz", foto:Foto}

    const [aba, setAba] = useState("desempenho")

    return (
        <div className="professor-body">
            <SideBar aba={aba} escolher={setAba} />
            
            <div id="conteudo-professor">
                <div id="header-professor">
                    <p>{`Professor ${professor.nome}`}</p>
                    <img src={professor.foto} className="foto-professor" />
                </div>
                {aba === "lancar" && <Notas />}
            </div>
        </div>
    )
}


export default Professor