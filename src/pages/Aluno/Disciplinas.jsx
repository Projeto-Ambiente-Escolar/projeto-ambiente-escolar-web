import { useState, useEffect } from "react";
import Sidebar from "../../Components/SideBar/SideBar";
import Cookies from "js-cookie";
import DisciplinaItemCard from "./components/DisciplinaItemCard";
import styles from "./Disciplinas.module.css";
import { buscarTabelaNotas } from "../../services/alunoService";

const CORES = [
    "#4A90D9",
    "#E07B54",
    "#5DBE8A",
    "#A259D9",
    "#F2C94C",
    "#E25C7A",
    "#45C4C4",
    "#F2994A",
];

function Disciplinas() {
    const cookieData = Cookies.get('usuario')
    const usuario = cookieData ? JSON.parse(cookieData) : { nome: '', foto: null, id: null }

    const [disciplinas, setDisciplinas] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(null);

    useEffect(() => {
        if (!usuario.id) {
            setErro("Usuário não identificado.");
            setCarregando(false);
            return;
        }

        buscarTabelaNotas(usuario.id)
            .then((data) => {
                const nomes = data.map(item => item.disciplina);
                setDisciplinas(nomes);
            })
            .catch(() => {
                setErro("Erro ao carregar as disciplinas. Tente novamente.");
            })
            .finally(() => {
                setCarregando(false);
            });
    }, [usuario.id]);

    return (
        <div className={styles.container}>
            <Sidebar nome={usuario.nome} foto={usuario.foto} tipo="aluno" />

            <main className={styles.content}>
                <h3 className={styles.titulo}>Disciplinas</h3>

                {carregando && <p style={{ textAlign: "center" }}>Carregando disciplinas...</p>}
                {erro && <p style={{ textAlign: "center", color: "#b71c1c" }}>{erro}</p>}
                {!carregando && !erro && disciplinas.length === 0 && (
                    <p style={{ textAlign: "center", color: "#666" }}>Nenhuma disciplina disponível.</p>
                )}

                <div className={styles.grid}>
                    {disciplinas.map((nome, index) => (
                        <DisciplinaItemCard
                            key={index}
                            nome={nome}
                            cor={CORES[index % CORES.length]}
                        />
                    ))}
                </div>
            </main>
        </div>
    );
}

export default Disciplinas;
