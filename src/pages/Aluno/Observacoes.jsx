import { useEffect, useState } from "react";
import Sidebar from "../../Components/SideBar/SideBar";
import Cookies from "js-cookie";
import DisciplinaCard from "./components/DisciplinaCard";
import ObservacaoModal from "./components/ObservacaoModal";
import styles from "./Observacoes.module.css";
import { buscarTabelaNotas } from "../../services/alunoService";

function Observacoes() {
    const cookieData = Cookies.get('usuario')
    const usuario = cookieData ? JSON.parse(cookieData) : { nome: '', foto: null, id: null }

    const [disciplinas, setDisciplinas] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(null);
    const [modalAberto, setModalAberto] = useState(null);

    useEffect(() => {
        if (!usuario.id) {
            setErro("Usuário não identificado.");
            setCarregando(false);
            return;
        }

        buscarTabelaNotas(usuario.id)
            .then((data) => {
                const comObservacao = data
                    .filter(item => item.observacao && item.observacao.trim() !== "")
                    .map(item => ({ nome: item.disciplina, observacao: item.observacao }));
                setDisciplinas(comObservacao);
            })
            .catch(() => {
                setErro("Erro ao carregar as observações. Tente novamente.");
            })
            .finally(() => {
                setCarregando(false);
            });
    }, [usuario.id]);

    return (
        <div className={styles.container}>
            <Sidebar nome={usuario.nome} foto={usuario.foto} tipo="aluno" />

            <main className={styles.content}>
                <h3 className={styles.titulo}>Observações</h3>

                {carregando && <p style={{ textAlign: "center" }}>Carregando observações...</p>}
                {erro && <p style={{ textAlign: "center", color: "#b71c1c" }}>{erro}</p>}
                {!carregando && !erro && disciplinas.length === 0 && (
                    <p style={{ textAlign: "center", color: "#666" }}>Nenhuma observação disponível.</p>
                )}

                <div className={styles.grid}>
                    {disciplinas.map((d, index) => (
                        <DisciplinaCard
                            key={index}
                            nome={d.nome}
                            onClick={() => setModalAberto(d)}
                        />
                    ))}
                </div>
            </main>

            {modalAberto && (
                <ObservacaoModal
                    disciplina={modalAberto.nome}
                    observacao={modalAberto.observacao}
                    onClose={() => setModalAberto(null)}
                />
            )}
        </div>
    );
}

export default Observacoes;