import { useEffect, useState } from "react";
import Sidebar from "../../Components/SideBar/SideBar";
import Cookies from "js-cookie";
import styles from "./Notas.module.css";
import html2pdf from "html2pdf.js";
import { buscarTabelaNotas } from "../../services/alunoService";

function TabelaNotas() {
    const cookieData = Cookies.get('usuario')
    const usuario = cookieData ? JSON.parse(cookieData) : { nome: '', foto: null, id: null }

    const [notas, setNotas] = useState([]);
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
                setNotas(data);
            })
            .catch(() => {
                setErro("Erro ao carregar as notas. Tente novamente.");
            })
            .finally(() => {
                setCarregando(false);
            });
    }, [usuario.id]);

    function gerarPDF() {
        const elemento = document.getElementById("boletim-pdf");

        const opcoes = {
            margin: 10,
            filename: (usuario.nome).replace(/\s/g, "") +"-Boletim-2025.pdf",
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }
        };

        html2pdf().set(opcoes).from(elemento).save();
    }

    return (
        <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#f5f6fa" }}>
            <Sidebar nome={usuario.nome} foto={usuario.foto} tipo="aluno" />

            <main style={{ flex: 1, padding: "2.5rem 3rem" }}>
                <div id="boletim-pdf">
                    <h3 className={styles.titulo}>Boletim</h3>

                    {carregando && <p style={{ textAlign: "center" }}>Carregando notas...</p>}
                    {erro && <p style={{ textAlign: "center", color: "#b71c1c" }}>{erro}</p>}

                    {!carregando && !erro && (
                        <table className={styles.tabela}>
                            <thead>
                                <tr>
                                    <th>Disciplina</th>
                                    <th>Nota 1</th>
                                    <th>Nota 2</th>
                                    <th>Média</th>
                                    <th>Situação</th>
                                </tr>
                            </thead>

                            <tbody>
                                {notas.map((item, index) => {
                                    const aprovado = item.media >= 7;

                                    return (
                                        <tr key={index}>
                                            <td>{item.disciplina}</td>
                                            <td>{item.nota1}</td>
                                            <td>{item.nota2}</td>
                                            <td>{item.media}</td>
                                            <td className={aprovado ? styles.aprovado : styles.reprovado}>
                                                {aprovado ? "Aprovado" : "Reprovado"}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    )}
                </div>

                <div className={styles.botoes}>
                    <button className={styles.pdf} onClick={gerarPDF}>
                        Gerar PDF
                        <img src="../../../public/assets/pdf.png" alt="Ícone PDF" />
                    </button>
                </div>
            </main>
        </div>
    );
}

export default TabelaNotas;