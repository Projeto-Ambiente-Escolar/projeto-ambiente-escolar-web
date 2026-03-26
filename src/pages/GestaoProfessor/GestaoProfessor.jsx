import { useEffect, useState } from "react";
import styles from "./GestaoProfessor.module.css";
import ModalCadastroProfessor from "./components/ModalCadastroProfessor";
import { listarProfessores, deletarProfessor } from "../../services/professorService";
import SideBar from "../../Components/SideBar/SideBar"
import Foto from "../../../public/assets/foto_perfil.svg";


function CadastroProfessor() {
    const [professores, setProfessores] = useState([]);
    const [modalAberto, setModalAberto] = useState(false);
    const [professorEditando, setProfessorEditando] = useState(null);

    const carregarProfessores = async () => {
        const data = await listarProfessores();
        setProfessores(data);
    };

    useEffect(() => {
        carregarProfessores();
    }, []);

    const abrirCadastro = () => {
        setProfessorEditando(null);
        setModalAberto(true);
    };

    const editarProfessor = (prof) => {
        setProfessorEditando(prof);
        setModalAberto(true);
    };

    const excluirProfessor = async (id) => {
        if (window.confirm("Deseja excluir?")) {
            await deletarProfessor(id);
            carregarProfessores();
        }
    };

    return (
        <div className={styles.adminContainer}>
            <SideBar tipo="admin" nome="Super Admin" foto={Foto} />

            <div className={styles.adminContent}>
                
                <div className={styles.content}>
                    
                    <div className={styles.headerTabela}>
                        <h1>Gestão de Professores</h1>

                        <button
                            className={styles.btnCadastrarProfessor}
                            onClick={abrirCadastro}
                        >
                            + Cadastrar
                        </button>
                    </div>

                    <div className={styles.tabelaContainer}>
                        <table className={styles.tabela}>
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Usuário</th>
                                    <th>Disciplina</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>

                            <tbody>
                                {professores.map((prof) => (
                                    <tr key={prof.id}>
                                        <td>{prof.nome}</td>
                                        <td>{prof.usuario}</td>
                                        <td>{prof.disciplina}</td>
                                        <td>
                                            <button
                                                className={styles.btnEditar}
                                                onClick={() => editarProfessor(prof)}
                                            >
                                                Editar
                                            </button>

                                            <button
                                                className={styles.btnExcluir}
                                                onClick={() => excluirProfessor(prof.id)}
                                            >
                                                Excluir
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </div>

                {modalAberto && (
                    <ModalCadastroProfessor
                        onClose={() => setModalAberto(false)}
                        onSalvo={carregarProfessores}
                        professorEditando={professorEditando}
                    />
                )}
            </div>
        </div>
    );
}

export default CadastroProfessor;