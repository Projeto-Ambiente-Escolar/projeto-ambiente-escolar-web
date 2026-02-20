import { useState } from "react";
import styles from "./Recados.module.css"
import CardAlunoSimples from "../../Components/CardAlunoSimples/CardAlunoSimples";
import Foto from "../../../public/assets/foto_perfil_1.svg"
import Recado from "../../Components/Recado/Recado";

function Recados({abrir}) {

    const alunos = [{id:0, nome:"Marcelo Paschoareli", foto:Foto, matricula:"23"}, 
        {id:1, nome:"Marcelo", foto:Foto, matricula:"232130"}, 
        {id:2, nome:"Marcelo Paschoareli", foto:Foto, matricula:"232130"}]


    const recados = [{id:0, nome:"Paulo Vaz", texto:"sla qualquiewr cjoiqwjd"}, {id:1, nome:"Maria Antonia", texto:"dw3didij3widj2 cjoiqwjd"}, {id:0, nome:"Paulo Vaz", texto:"sla qualquiewr cjoiqwjd"}]

    const [matricula, setMatricula] = useState("")
    const [termoFiltrado, setTermoFiltrado] = useState("");
    
     const handleBuscar = () => {
        setTermoFiltrado(matricula);
    };    

    const [alunoItem, setAluno] = useState()

    const selecionar = (o) => {
        setAluno(o)
    }

    return (
        <div id={styles.recados_content}>
            <div id={styles.recados_search}>
                    <input type="text" placeholder="Buscar por matrícula ou nome" id="search-input" onChange={(e) => {setMatricula(e.target.value); if(e.target.value === "") setTermoFiltrado("");}}/>
                    <button id="buttom-buscar" onClick={handleBuscar}>Buscar</button>
            </div>
            <div id={styles.recados_division}>
                <div id={styles.alunos}>
                    {
                    alunos
                    .filter(aluno => 
                        aluno.matricula.includes(termoFiltrado) ||
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
                        {recados.map(
                            (recado, index) => (
                                <Recado nome={recado.nome} texto={recado.texto}></Recado>
                            )
                        )}
                </div>
            </div>
        </div>
    )
}

export default Recados