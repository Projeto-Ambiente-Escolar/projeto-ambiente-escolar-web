import styles from "./CardDesempenho.module.css"
import Foto from "../../../public/assets/foto_perfil_1.svg"
import { useState } from "react"

function CardDesempenho({ fechar, aluno }) {

    const [recado, setRecado] = useState("")
    const [enviado, setEnviado] = useState(false)

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

                {/* esquerda */}
                <div className={styles.colEsquerda}>
                    <img src={aluno?.foto || Foto} alt="foto" className={styles.foto} />
                    <p className={styles.nome}>{aluno?.nome || "Nome do Aluno"}</p>
                    <p className={styles.info}>Matrícula: {aluno?.matricula || "000000"}</p>
                    <p className={styles.info}>Turma: {aluno?.turma || "—"}</p>
                </div>

                {/* direita */}
                <div className={styles.colDireita}>

                    <div className={styles.notas}>
                        <div className={styles.notaItem}>
                            <span className={styles.notaLabel}>Nota 1</span>
                            <span className={styles.notaValor}>{aluno?.nota1 ?? "—"}</span>
                        </div>
                        <div className={styles.notaItem}>
                            <span className={styles.notaLabel}>Nota 2</span>
                            <span className={styles.notaValor}>{aluno?.nota2 ?? "—"}</span>
                        </div>
                        <div className={`${styles.notaItem} ${styles.mediaDestaque}`}>
                            <span className={styles.notaLabel}>Média</span>
                            <span className={styles.notaValor}>{aluno?.media ?? "—"}</span>
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

            </div>
        </div>
    )
}

export default CardDesempenho