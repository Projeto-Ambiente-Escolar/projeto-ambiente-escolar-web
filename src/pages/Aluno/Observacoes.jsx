import { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import DisciplinaCard from "./components/DisciplinaCard";
import ObservacaoModal from "./components/ObservacaoModal";
import styles from "./Observacoes.module.css";

function Observacoes() {
    const [disciplinas, setDisciplinas] = useState([
        { id: 1, nome: "Matemática", observacao: "O aluno demonstra dificuldades com frações e equações de segundo grau. Recomenda-se reforço." },
        { id: 2, nome: "Português", observacao: "Boa participação nas aulas. Precisa melhorar a produção textual e a coesão das redações." },
        { id: 3, nome: "História", observacao: "Excelente desempenho nas atividades. Demonstra interesse pelo conteúdo e participa ativamente." },
        { id: 4, nome: "Geografia", observacao: "Apresenta dificuldades em cartografia. Sugere-se exercícios extras sobre coordenadas geográficas." },
    ]);

    const [modalAberto, setModalAberto] = useState(null);

    useEffect(() => {
        // TODO: substituir pela URL real da API
        // fetch("https://api.exemplo.com/disciplinas")
        //     .then(res => res.json())
        //     .then(data => setDisciplinas(data));
    }, []);

    return (
        <div className={styles.container}>
            <Sidebar nome="Leonardo Lins" tipo="aluno" />

            <main className={styles.content}>
                <h3 className={styles.titulo}>Observações</h3>

                <div className={styles.grid}>
                    {disciplinas.map(d => (
                        <DisciplinaCard
                            key={d.id}
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