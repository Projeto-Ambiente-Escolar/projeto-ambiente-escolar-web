import styles from "./CardNota.module.css"
import Foto from "../../../public/assets/foto_perfil_1.svg"
import { useState, useEffect } from "react"
import Cookies from "js-cookie";
import { buscarNotasTurma, cadastrarNota } from "../../services/notaService";

function CardNota({aluno, fechar, at}) {
    const cookieData = Cookies.get('usuario')
    const usuario = cookieData ? JSON.parse(cookieData) : { nome: '', foto: null, id: null }

    const [ativo, setAtivo] = useState(false)

    const [nota1, setNota1] = useState("")
    const [nota2, setNota2] = useState("")
    const [media, setMedia] = useState("")
    const [status, setStatus] = useState("")
    const [habilitado, setHabilitado] = useState(false)
    const [obser, setObser] = useState(true)
    const [calcular, setCalcular] = useState(true)
    const [observacao, setObservacao] = useState("")
 
    function limitarNota(valor) {
        if (valor === "") return ""
        
        let numero = Number(valor)
    
        if (numero < 0) return 0
        if (numero > 10) return 10
    
        return numero
    }

    function calcularMedia() {
        if (nota1 !== "" && nota2 !== "") {
            const mediaCalculada = (nota1 + nota2) / 2
            setMedia(mediaCalculada)
    
            if (mediaCalculada > 7) {
                setStatus("Aprovado")
            } else {
                setStatus("Reprovado")
            }
    
            setHabilitado(true)
            setAtivo(true)
            setCalcular(false) 
        }
    }

    const enviarNotas = async () => {
        const payload = {'aluno': aluno.id, 'observacao':observacao,'professor': usuario.id,'nota1': nota1,'nota2': nota2,'media': media}
        await cadastrarNota(payload)
        at(true)
        fechar()
    }

    useEffect(() => {
        if (!usuario.id) {
            return;
        }
        
        setStatus(aluno.status)
        
        buscarNotasTurma(aluno.id, usuario.id)
            .then((data) => {
                if (aluno.status!=="Em espera") {
                    setNota1(data[0].nota1)
                    setNota2(data[0].nota2)
                    setMedia(data[0].media)
                    setObservacao(data[0].observacao)
                    setHabilitado(true)
                    setCalcular(false)
                    setObser(false)
                }
            })
    
    }, [usuario.id]);

    return(
        <div>
        <div className={styles.overlay} onClick={fechar}></div>

            <div className={styles.cardnota}>
                <div id={styles.info}>
                    <img src={aluno?.foto || Foto} />
                    <div>
                        <p id={styles.nome}>{aluno?.nome || "..........................."}</p>
                        <p id={styles.matricula}>Matrícula: {aluno?.matricula || "000000"}</p>
                    </div>
                    <button id={styles.status}>
                        {status}
                    </button>
                    {<button className={`${styles.enviar} ${ativo ? "" : styles.inativo}`} onClick={enviarNotas}>Enviar</button>}
                </div>
                <div id={styles.lancamento}>
                    <div id={styles.primeira}>
                        <div id={styles.nota}>
                            <p>Nota 1:</p>
                            <input type="number" id={styles.inputnota} placeholder="0" min={0} max={10} value={nota1} onChange={(e) => setNota1(limitarNota(e.target.value))} disabled={habilitado}/>
                        </div>
                        <div id={styles.meio}>
                            <p>+</p>
                        </div>
                        <div id={styles.nota}>
                            <p>Nota 2:</p>
                            <input type="number" id={styles.inputnota} placeholder="0" min={0} max={10} value={nota2} onChange={(e) => setNota2(limitarNota(e.target.value))} disabled={habilitado}/>
                        </div>
                    </div>
                    <div id={styles.meio}>
                            <p>=</p>
                        </div>
                    <div id={styles.segunda}>
                        <div id={styles.nota}>
                            <p>Média:</p>
                            <input type="number" disabled value={media} placeholder="0" id={styles.inputnota}/>
                        </div>
                    </div>
                    <div id={styles.terceira}>
                        <button className={`${styles.calcular} ${calcular ? "" : styles.inativo}`} onClick={calcularMedia} disabled={!calcular}>Calcular</button>
                    </div>
                    <div id={styles.quarta}>
                        <div id={styles.observacao}>
                            <p>Observação:</p>
                            <textarea id={styles.inputobservacao} placeholder="Digite a observação" value={observacao} onChange={(e) => setObservacao(e.target.value)} rows="2" maxLength={240} disabled={!obser}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardNota