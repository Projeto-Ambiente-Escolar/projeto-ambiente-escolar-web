import styles from "./CardDesempenho.module.css"
import Foto from "../../../public/assets/foto_perfil_1.svg"
import { useState, useEffect } from "react"
import { buscarNotasAluno } from "../../services/alunoService"

function CardDesempenho({ idAluno, idUsuario, foto, fechar }) {

    const [recado, setRecado] = useState("")
    const [enviado, setEnviado] = useState(false)
    const [dadosAluno, setDadosAluno] = useState(null)
    const [carregando, setCarregando] = useState(true)

    useEffect(() => {
        if (!idAluno || !idUsuario) return;
        buscarNotasAluno(idAluno, idUsuario)
            .then((dados) => {
                if (!dados) { setCarregando(false); return }
                setDadosAluno({
                    nota1: dados.nnota1,
                    nota2: dados.nnota2,
                    media: dados.nmedia,
                    turma: `${dados.iserie}º${dados.cnmTurma}`,
                    matricula: dados.cmatricula,
                    nome: dados.cnmAluno,
                    foto: foto
                })
                setCarregando(false)
            })
            .catch((err) => {
                setCarregando(false)
            })
    }, [idAluno, idUsuario])

    const enviarRecado = () => {
        if (recado.trim()) {
            setEnviado(true)
            setTimeout(() => setEnviado(false), 2000)
            setRecado("")
        }
    }

    return (
        <div>
            <div className={styles.overlay} onClick={fechar}></div>
            <div className={styles.card}>

                {carregando ? (
                    <div className={styles.loadingWrapper}>
                        <div className={styles.spinner} />
                    </div>
                ) : (
                    <>
                        {/* esquerda */}
                        <div className={styles.colEsquerda}>
                            <img src={dadosAluno?.foto || Foto} alt="foto" className={styles.foto} />
                            <p className={styles.nome}>{dadosAluno?.nome || "Nome do Aluno"}</p>
                            <p className={styles.info}>Matrícula: {dadosAluno?.matricula || "000000"}</p>
                            <p className={styles.info}>Turma: {dadosAluno?.turma || "—"}</p>
                        </div>

                        {/* direita */}
                        <div className={styles.colDireita}>

                            <div className={styles.notas}>
                                <div className={styles.notaItem}>
                                    <span className={styles.notaLabel}>Nota 1</span>
                                    <span className={styles.notaValor}>{dadosAluno?.nota1 ?? "—"}</span>
                                </div>
                                <div className={styles.notaItem}>
                                    <span className={styles.notaLabel}>Nota 2</span>
                                    <span className={styles.notaValor}>{dadosAluno?.nota2 ?? "—"}</span>
                                </div>
                                <div className={`${styles.notaItem} ${styles.mediaDestaque}`}>
                                    <span className={styles.notaLabel}>Média</span>
                                    <span className={styles.notaValor}>{dadosAluno?.media ?? "—"}</span>
                                </div>
                            </div>

                            <div className={styles.recadoArea}>
                                <p className={styles.recadoTitulo}>Escrever recado</p>
                                <textarea
                                    className={styles.textarea}
                                    maxLength={100}
                                    placeholder="Escreva um recado para o aluno..."
                                    value={recado}
                                    onChange={(e) => setRecado(e.target.value)}
                                />
                                <div className={styles.contador}>{recado.length}/100</div>
                                <button
                                    className={`${styles.btnEnviar} ${!recado.trim() ? styles.inativo : ""}`}
                                    onClick={enviarRecado}
                                    disabled={!recado.trim()}
                                >
                                    {enviado ? "Enviado ✓" : "Enviar recado"}
                                </button>
                            </div>

                        </div>
                    </>
                )}

            </div>
        </div>
    )
}

export default CardDesempenho