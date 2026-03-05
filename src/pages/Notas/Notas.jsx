import Filtro from "../../../public/assets/filter_icon.svg"
import CardAluno from "../../Components/CardAluno/CardAluno"
import { useState, useEffect } from "react";
import "./Notas.css"
import Cookies from "js-cookie";
import { buscarAlunosComStatus } from "../../services/alunoService";


function Notas({idturma, visualizar, atualizar, at}) {
    const cookieData = Cookies.get('usuario')
    const usuario = cookieData ? JSON.parse(cookieData) : {nome: '', foto: null, id: null }

    const [matricula, setMatricula] = useState("")
    const [termoFiltrado, setTermoFiltrado] = useState("");
    const [ordem, setOrdem] = useState(0);
    const [mostrarDropdown, setMostrarDropdown] = useState(false);

    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(null);

    const [alunos, setAlunos] = useState([]);

    useEffect(() => {
        if (!usuario.id) {
            setErro("Usuário não identificado.");
            setCarregando(false);
            return;
        }
    
        buscarAlunosComStatus(usuario.id, idturma)
            .then((data) => {
                setAlunos(data);
                at(false)
            })
            .catch(() => {
                setErro("Erro ao carregar as Turmas. Tente novamente.");
            })
            .finally(() => {
                setCarregando(false);
            });
    
    }, [usuario.id, idturma, atualizar]);

    const handleBuscar = () => {
        setTermoFiltrado(matricula);
    };    

    return (
        <div id="professor-content">
                <h3 className="titulo-professor">Lançar Notas</h3>
                <div id="professor-search">
                    <input 
                        type="text" 
                        placeholder="Buscar por matrícula" 
                        id="search-input" 
                        onChange={(e) => {
                            setMatricula(e.target.value);
                            if (e.target.value === "") setTermoFiltrado("");
                        }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") handleBuscar();
                        }}
                    />                    <div>
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
                {carregando && <p style={{ textAlign: "center" }}>Carregando notas...</p>}
                {erro && <p style={{ textAlign: "center", color: "#b71c1c" }}>{erro}</p>}
                    {
                      [...alunos]
                      .filter(aluno => aluno.cmatricula.includes(termoFiltrado))
                      .sort((a, b) =>
                        ordem === 1
                          ? a.cnmAluno.localeCompare(b.cnmAluno)
                          : ordem === -1
                          ? b.cnmAluno.localeCompare(a.cnmAluno)
                          : 0
                      ).map((aluno, index) => (
                        <CardAluno
                            id={aluno.ncdAluno}
                            foto={aluno.cfoto}
                            nome={aluno.cnmAluno}
                            matricula={aluno.cmatricula}
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