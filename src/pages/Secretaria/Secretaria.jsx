import { useState, useEffect } from "react";
import Foto from "../../../public/assets/foto_perfil.svg";
import styles from "./Secretaria.module.css";

import SideBar from "../../Components/SideBar/SideBar"
import SearchBar from "./components/SearchBar";
import SelectActions from "./components/SelectActions";
import SolicitacaoCard from "./components/SolicitacaoCard";
import ModalDetalhes from "./components/ModalDetalhes";
import ModalCadastroAluno from "./components/ModalCadastroProfessor";
import ModalSelecionarTurma from "./components/ModalSelecionarTurma";
import { buscarAlunosPendentes, alterarStatus, buscarTurmas, vincularTurma } from "../../services/alunoService.js";


function Secretaria() {

    const [inputBusca, setInputBusca] = useState("");

    const [matriculaBusca, setMatriculaBusca] = useState("");

    const [selecionados, setSelecionados] = useState([]);

    const [solicitacoes, setSolicitacoes] = useState([]);

    const solicitacoesFiltradas = solicitacoes.filter((aluno) =>
    (aluno.matricula ?? "")
        .toString()
        .includes(inputBusca)
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

    const carregarSolicitacoes = async () => {
        try {
            const data = await buscarAlunosPendentes();
            setSolicitacoes(data);
        } catch (error) {
            console.error("Erro ao buscar solicitações:", error);
        }
    };

    useEffect(() => {
        carregarSolicitacoes();
    }, []);

    const aprovarAluno = async (id) => {
        try {
            await alterarStatus(id, 1);

            await carregarSolicitacoes();
    
            setSolicitacoes((prev) =>
                prev.filter((aluno) => aluno.id !== id)
            );
    
        } catch (error) {
            console.error("Erro ao aprovar aluno:", error);
        }
    };

    const aprovarSelecionados = () => {

        const alunosSelecionados = solicitacoes.filter((aluno) =>
            selecionados.includes(aluno.id)
        );
    
        if (alunosSelecionados.length === 0) return;
    
        setFilaAprovacao(alunosSelecionados);
        setAlunoAprovacaoAtual(alunosSelecionados[0]);
        setModalTurmaAberto(true);
    };

    const reprovarAluno = async (id) => {
        try {
            await alterarStatus(id, 0); // 0 = reprovado

            await carregarSolicitacoes();
    
            setSolicitacoes((prev) =>
                prev.filter((aluno) => aluno.id !== id)
            );
    
        } catch (error) {
            console.error("Erro ao reprovar aluno:", error);
        }
    };

    const reprovarSelecionados = async () => {
        try {
    
            await Promise.all(
                selecionados.map((id) => alterarStatus(id, 0))
            );
    
            setSolicitacoes((prev) =>
                prev.filter((aluno) => !selecionados.includes(aluno.id))
            );
    
            setSelecionados([]);

            await carregarSolicitacoes();
    
        } catch (error) {
            console.error("Erro ao reprovar alunos:", error);
        }
    };

    const [modalTurmaAberto, setModalTurmaAberto] = useState(false);
    const [filaAprovacao, setFilaAprovacao] = useState([]);
    const [alunoAprovacaoAtual, setAlunoAprovacaoAtual] = useState(null);

    const iniciarAprovacao = (aluno) => {
        setFilaAprovacao([aluno]);
        setAlunoAprovacaoAtual(aluno);
        setModalTurmaAberto(true);
    };

    const confirmarTurma = async (idTurma) => {

        try {
    
            await vincularTurma(alunoAprovacaoAtual.id, idTurma);
    
            await alterarStatus(alunoAprovacaoAtual.id, 1);
    
            const novaFila = filaAprovacao.slice(1);
    
            if (novaFila.length === 0) {
    
                setModalTurmaAberto(false);
                setAlunoAprovacaoAtual(null);
                setFilaAprovacao([]);
                setSelecionados([]);
    
                await carregarSolicitacoes();
    
            } else {
    
                setFilaAprovacao(novaFila);
                setAlunoAprovacaoAtual(novaFila[0]);
    
            }
    
        } catch (error) {
            console.error("Erro ao aprovar aluno:", error);
        }
    };

    const [turmas, setTurmas] = useState([]);

    useEffect(() => {
        carregarSolicitacoes();
        carregarTurmas();
    }, []);

    const carregarTurmas = async () => {
        try {
            const data = await buscarTurmas();
            setTurmas(data);
        } catch (error) {
            console.error("Erro ao buscar turmas:", error);
        }
    };

    return (
        <div className={styles.adminContainer}>
            <SideBar tipo="admin" nome='Super Admin' foto={Foto} />
            <div className={styles.adminContent}>
            <div className={styles.topo}>
            <div className={styles.topoAcoes}>
                <SearchBar
                    inputBusca={inputBusca}
                    setInputBusca={setInputBusca}
                    onBuscar={handleBuscar}
                />
                {/* <button
                    className={styles.btnCadastrarProfessor}
                    onClick={() => setModalCadastroAberto(true)}
                >
                    + Cadastrar Professor
                </button> */}
            </div>

            <SelectActions
                selecionarTodos={selecionarTodos}
                quantidadeSelecionados={selecionados.length}
                todosSelecionados={
                    solicitacoesFiltradas.length > 0 &&
                    selecionados.length === solicitacoesFiltradas.length
                }
                onAprovarSelecionados={aprovarSelecionados}
                onReprovarSelecionados={reprovarSelecionados}
            />
            </div>

            <div id={styles.solicitacoesContainer}>
                {solicitacoes.length === 0 ? (
                    <p className={styles.semSolicitacoes}>
                        Sem aprovações pendentes
                    </p>
                ) : solicitacoesFiltradas.length === 0 ? (
                    <p className={styles.semSolicitacoes}>
                        Nenhum aluno encontrado
                    </p>
                ) : (
                    solicitacoesFiltradas.map((aluno) => (
                        <SolicitacaoCard
                            key={aluno.id}
                            id={aluno.id}
                            nome={aluno.nome}
                            matricula={aluno.matricula}
                            selecionado={selecionados.includes(aluno.id)}
                            toggleSelecionado={toggleSelecionado}
                            onDetalhes={() => abrirModal(aluno)}
                            onAprovar={() => iniciarAprovacao(aluno)}
                            onReprovar={() => reprovarAluno(aluno.id)}
                        />
                    ))
                )}
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

            {modalTurmaAberto && alunoAprovacaoAtual && (
            <ModalSelecionarTurma
                aluno={alunoAprovacaoAtual}
                turmas={turmas}
                onSelecionar={confirmarTurma}
                onClose={() => setModalTurmaAberto(false)}
            />
)}
        </div>
    );
}

export default Secretaria;
