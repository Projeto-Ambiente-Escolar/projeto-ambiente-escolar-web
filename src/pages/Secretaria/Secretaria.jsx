import { useState } from "react";
import Foto from "../../../public/assets/foto_perfil.svg";
import styles from "./Secretaria.module.css";

import SearchBar from "./components/SearchBar";
import SelectActions from "./components/SelectActions";
import SolicitacaoCard from "./components/SolicitacaoCard";
import ModalDetalhes from "./components/ModalDetalhes";
import ModalCadastroAluno from "./components/ModalCadastroAluno";

function Secretaria() {

    const [inputBusca, setInputBusca] = useState("");

    const [matriculaBusca, setMatriculaBusca] = useState("");

    const [selecionados, setSelecionados] = useState([]);

    const solicitacoesMock = [
        { id: 1, nome: "Marcelo Paschoareli", matricula: "3451209" },
        { id: 2, nome: "Ana Souza", matricula: "9876543" },
        { id: 3, nome: "Carlos Lima", matricula: "1234567" }
    ];

    const solicitacoesFiltradas = solicitacoesMock.filter((aluno) =>
        aluno.matricula.includes(matriculaBusca)
    );

    const handleBuscar = (valorDireto) => {
        const termo = valorDireto !== undefined ? valorDireto : inputBusca;
        setMatriculaBusca(termo);
        setSelecionados([]);
    };

    const toggleSelecionado = (id) => {
        if (selecionados.includes(id)) {
            setSelecionados(selecionados.filter((item) => item !== id));
        } else {
            setSelecionados([...selecionados, id]);
        }
    };

    const selecionarTodos = () => {
        if (selecionados.length === solicitacoesFiltradas.length) {
            setSelecionados([]);
        } else {
            setSelecionados(solicitacoesFiltradas.map((aluno) => aluno.id));
        }
    };

    const [modalAberto, setModalAberto] = useState(false);
    const [alunoSelecionado, setAlunoSelecionado] = useState(null);

    const abrirModal = (aluno) => {
        setAlunoSelecionado(aluno);
        setModalAberto(true);
    };
    
    const fecharModal = () => {
        setModalAberto(false);
        setAlunoSelecionado(null);
    };

    const [modalCadastroAberto, setModalCadastroAberto] = useState(false);
    

    return (
        <div>
            <div className={styles.header}>
                <p>Super Admin</p>
                <img src={Foto} className={styles.fotoPerfil} />
            </div>

            <div className={styles.topoAcoes}>
                <SearchBar
                    inputBusca={inputBusca}
                    setInputBusca={setInputBusca}
                    onBuscar={handleBuscar}
                />
                <button
                    className={styles.btnCadastrarAluno}
                    onClick={() => setModalCadastroAberto(true)}
                >
                    + Cadastrar Aluno
                </button>
            </div>

            <SelectActions
                selecionarTodos={selecionarTodos}
                quantidadeSelecionados={selecionados.length}
                todosSelecionados={
                    solicitacoesFiltradas.length > 0 &&
                    selecionados.length === solicitacoesFiltradas.length
                }
            />

            <div id={styles.solicitacoesContainer}>
                {solicitacoesFiltradas.map((aluno) => (
                    <SolicitacaoCard
                        key={aluno.id}
                        id={aluno.id}
                        nome={aluno.nome}
                        matricula={aluno.matricula}
                        selecionado={selecionados.includes(aluno.id)}
                        toggleSelecionado={toggleSelecionado}
                        onDetalhes={() => abrirModal(aluno)}
                    />
                ))}
            </div>
            {modalAberto && (
                <ModalDetalhes
                    aluno={alunoSelecionado}
                    onClose={fecharModal}
                />
            )}

            {modalCadastroAberto && (
                <ModalCadastroAluno
                    onClose={() => setModalCadastroAberto(false)}
                />
            )}
        </div>
    );
}

export default Secretaria;
