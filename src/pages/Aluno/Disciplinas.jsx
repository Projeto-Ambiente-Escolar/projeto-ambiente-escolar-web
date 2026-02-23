import { useState } from "react";
import Sidebar from "../../Components/SideBar/SideBar";
import DisciplinaItemCard from "./components/DisciplinaItemCard";
import styles from "./Disciplinas.module.css";

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
    const [disciplinas] = useState([
        { id: 1, nome: "Matemática" },
        { id: 2, nome: "Português" },
        { id: 3, nome: "História" },
        { id: 4, nome: "Geografia" },
        { id: 5, nome: "Ciências" },
        { id: 6, nome: "Educação Física" },
        { id: 7, nome: "Arte" },
        { id: 8, nome: "Inglês" },
    ]);

    return (
        <div className={styles.container}>
            <Sidebar nome="Leonardo Lins" tipo="aluno" />

            <main className={styles.content}>
                <h3 className={styles.titulo}>Disciplinas</h3>

                <div className={styles.grid}>
                    {disciplinas.map((d, index) => (
                        <DisciplinaItemCard
                            key={d.id}
                            nome={d.nome}
                            cor={CORES[index % CORES.length]}
                        />
                    ))}
                </div>
            </main>
        </div>
    );
}

export default Disciplinas;
