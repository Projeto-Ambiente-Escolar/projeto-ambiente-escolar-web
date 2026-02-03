import BarraSuperior from "../BarraSuperior/BarraSuperior";
import Foto from "../../../public/assets/foto_perfil.svg";
import styles from "./Aluno.module.css";
import html2pdf from "html2pdf.js";

function TabelaNotas() {
    const notas = [
        { disciplina: "Matemática", n1: 8.5, n2: 9.0 },
        { disciplina: "Português", n1: 7.0, n2: 8.0 },
        { disciplina: "História", n1: 6.0, n2: 6.5 },
        { disciplina: "Geografia", n1: 9.0, n2: 8.5 }
    ];

    function gerarPDF() {
        const elemento = document.getElementById("boletim-pdf");

        const opcoes = {
            margin: 10,
            filename: "boletim.pdf",
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }
        };

        html2pdf().set(opcoes).from(elemento).save();
    }

    return (
        <div>
            <BarraSuperior nome="Leonardo Lins" foto={Foto} />

            <div id="boletim-pdf">
                <h1 className={styles.titulo}>Boletim</h1>

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
                            const media = ((item.n1 + item.n2) / 2).toFixed(2);
                            const aprovado = media >= 7;

                            return (
                                <tr key={index}>
                                    <td>{item.disciplina}</td>
                                    <td>{item.n1}</td>
                                    <td>{item.n2}</td>
                                    <td>{media}</td>
                                    <td className={aprovado ? styles.aprovado : styles.reprovado}>
                                        {aprovado ? "Aprovado" : "Reprovado"}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <div className={styles.botoes}>
                <button className={styles.pdf} onClick={gerarPDF}>
                    Gerar PDF
                    <img src="../../../public/assets/pdf.png" alt="Ícone PDF" />
                </button>
            </div>
        </div>
    );
}

export default TabelaNotas;