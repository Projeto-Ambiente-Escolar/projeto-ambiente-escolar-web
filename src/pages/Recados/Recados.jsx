import { useState, useEffect } from "react";
import styles from "./Recados.module.css"
import CardAlunoSimples from "../../Components/CardAlunoSimples/CardAlunoSimples";
import Foto from "../../../public/assets/foto_perfil_1.svg"
import Recado from "../../Components/Recado/Recado";
import Cookies from "js-cookie";
import { buscarAlunos } from "../../services/alunoService";
import { buscarRecados } from "../../services/recadoService";


function Recados({abrir}) {
    const cookieData = Cookies.get('usuario')
    const usuario = cookieData ? JSON.parse(cookieData) : { nome: '', foto: null, id: null }

    const [alunos, setAlunos] = useState([]);
    const [recados, setRecados] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(null);

    const [carregando2, setCarregando2] = useState(true);
    const [erro2, setErro2] = useState(null);

    const [matricula, setMatricula] = useState("")
    const [termoFiltrado, setTermoFiltrado] = useState("");
    
     const handleBuscar = () => {
        setTermoFiltrado(matricula);
    };    

    const [alunoItem, setAluno] = useState()

    const selecionar = (o) => {
        setAluno(o);
    };

    useEffect(() => {
        if (!usuario.id) {
            setErro("Usuário não identificado.");
            setCarregando(false);
            return;
        }
    
        buscarAlunos()
            .then((data) => {
                setAlunos(data);
            })
            .catch(() => {
                setErro("Erro ao carregar os alunos.");
            })
            .finally(() => {
                setCarregando(false);
            });
    
    }, [usuario.id]);

    useEffect(() => {
        if (alunoItem?.id) {
            atualizarRecados();
        }
    }, [alunoItem]);

    useEffect(() => {
        const atualizar = () => {
            atualizarRecados();
        };
    
        window.addEventListener("atualizarRecados", atualizar);
    
        return () => {
            window.removeEventListener("atualizarRecados", atualizar);
        };
    }, [alunoItem]);

    const atualizarRecados = () => {
        if (!alunoItem?.id) return;
    
        setCarregando2(true);
    
        buscarRecados(alunoItem.id)
            .then((data) => {
                setRecados(data);
            })
            .catch(() => {
                setErro2("Erro ao carregar os recados.");
            })
            .finally(() => {
                setCarregando2(false);
            });
    };

    return (
        <div id={styles.recados_content}>
            <h3 className={styles.titulo}>Recados</h3>
            <div id={styles.recados_search}>
                    <input 
                        type="text" 
                        placeholder="Buscar por matrícula ou nome" 
                        id="search-input" 
                        onChange={(e) => {
                            setMatricula(e.target.value);
                            if (e.target.value === "") setTermoFiltrado("");
                        }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") handleBuscar();
                        }}
                    />
                    <button id="buttom-buscar" onClick={handleBuscar}>Buscar</button>
            </div>
            <div id={styles.recados_division}>
                <div id={styles.alunos}>
                {carregando && <p style={{ textAlign: "center" }}>Carregando notas...</p>}
                {erro && <p style={{ textAlign: "center", color: "#b71c1c" }}>{erro}</p>}
                    {
                    alunos
                    .filter(aluno => 
                        aluno.matricula?.includes(termoFiltrado) ||
                        aluno.nome.toLowerCase().includes(termoFiltrado.toLowerCase())
                    )   
                    .map((aluno, index) => (
                        <CardAlunoSimples key={aluno.id} id={aluno.id} nome={aluno.nome} foto={aluno.foto} matricula={aluno.matricula} abrir={selecionar} selecionado={alunoItem?.id === aluno.id}></CardAlunoSimples>
                    ))
                }
                </div>
                <div id={styles.mural}>
                    {alunoItem? alunoItem.nome : "Selecione um aluno para deixar um recado"}
                    <button className={`${styles.criar} ${!alunoItem? styles.ativo : ''}`} disabled={!alunoItem? true : false} onClick={() => abrir(alunoItem)}>Enviar Recado</button>
                    {carregando2 && ( alunoItem && <p style={{ textAlign: "center" }}>Carregando notas...</p>)}
                    {erro2 && <p style={{ textAlign: "center", color: "#b71c1c" }}>{erro}</p>}
                        {recados.map(
                            (recado, index) => (
                                <Recado id={recado?.professor} texto={recado?.mensagem}></Recado>
                            )
                        )}
                </div>
            </div>
        </div>
    )
}


export default Recados