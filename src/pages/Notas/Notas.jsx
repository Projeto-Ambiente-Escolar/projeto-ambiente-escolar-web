import Filtro from "../../../public/assets/filter_icon.svg"
import CardAluno from "../../Components/CardAluno/CardAluno"
import { useState } from "react"
import "./Notas.css"


function Notas({idturma, visualizar}) {

    const [matricula, setMatricula] = useState("")
    const [termoFiltrado, setTermoFiltrado] = useState("");
    const [ordem, setOrdem] = useState(0);
    const [mostrarDropdown, setMostrarDropdown] = useState(false);


    const [alunos, setAlunos] = useState([        
        { id:1, nome:"Arcelo Paschoareli", matricula:"998900", status:"Em Revisão"},
        { id:2, nome:"Barcelo Paschoareli", matricula:"124302", status:"Em Revisão"},
        { id:3, nome:"Carcelo Paschoareli", matricula:"3413440", status:"Em Revisão"},
                { id:4, nome:"Darcelo Paschoareli", matricula:"3413440", status:"Em Revisão"},
                        { id:5, nome:"Earcelo Paschoareli", matricula:"3413440", status:"Em Revisão"},


    ]);

    const handleBuscar = () => {
        setTermoFiltrado(matricula);
    };    

    return (
        <div id="professor-content">
                <div id="professor-search">
                    <input type="text" placeholder="Buscar por matrícula" id="search-input" onChange={(e) => {setMatricula(e.target.value); if(e.target.value === "") setTermoFiltrado("");}}/>
                    <div>
                    <button
            id="buttom-filtrar"
            onClick={() => setMostrarDropdown(!mostrarDropdown)}
            >
            <img src={Filtro} id="filtro"/>
            </button>
            <div id="dropdown-content" className={mostrarDropdown ? "ativo" : ""}>
                    <button id="drop-element" onClick={() => setOrdem(1)}>A-Z</button>
                    <button id="drop-element" onClick={() => setOrdem(-1)}>Z-A</button>
                </div>
            </div>
            <button id="buttom-buscar" onClick={handleBuscar}>Buscar</button>
                </div>
                <div id="professor-alunos">
                    {
                      [...alunos]
                      .filter(aluno => aluno.matricula.includes(termoFiltrado))
                      .sort((a, b) =>
                        ordem === 1
                          ? a.nome.localeCompare(b.nome)
                          : ordem === -1
                          ? b.nome.localeCompare(a.nome)
                          : 0
                      ).map((aluno, index) => (
                        <CardAluno
                            id={aluno.id}
                            foto={aluno.foto}
                            nome={aluno.nome}
                            matricula={aluno.matricula}
                            status={aluno.status}
                            abrir={visualizar}
                        ></CardAluno>
                      ))  
                    }
                </div>
            </div>
    )
}

export default Notas