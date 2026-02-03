import BarraSuperior from "../../Components/BarraSuperior/BarraSuperior"
import Foto from "../../../public/assets/foto_perfil.svg"
import Filtro from "../../../public/assets/filter_icon.svg"
import CardAluno from "../../Components/CardAluno/CardAluno"
import "./Professor.css"

function Professor() {

    const alunos = [
        { id:1, nome:"Marcelo Paschoareli", matricula:"998900", status:"Em Revisão"},
        { id:1, nome:"Marcelo Paschoareli", matricula:"998900", status:"Em Revisão"},
        { id:1, nome:"Marcelo Paschoareli", matricula:"998900", status:"Em Revisão"},
    ]

    return (
        <div className="professor-body">
            <BarraSuperior nome={"Professor Paulo"} foto={Foto}></BarraSuperior>
            <div id="professor-content">
                <div id="professor-search">
                    <input type="text" placeholder="Buscar por Matrícula" id="search-input"/>
                    <button id="buttom-filtrar">
                        <img src={Filtro} width="20vh" />
                    </button>
                    <button id="buttom-buscar">Buscar</button>
                </div>
                <div id="professor-alunos">
                    {
                      alunos.map((aluno) => (
                        <CardAluno
                            id={aluno.id}
                            foto={aluno.foto}
                            nome={aluno.nome}
                            matricula={aluno.matricula}
                            status={aluno.status}
                        ></CardAluno>
                      ))  
                    }
                </div>
            </div>
        </div>
    )
}

export default Professor