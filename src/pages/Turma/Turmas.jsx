import { useState, useEffect } from "react";
import Filtro from "../../../public/assets/filter_icon.svg"
import styles from "./Turmas.module.css"
import CardTurma from "../../Components/CardTurma/CardTurma";
import { buscarTurmas } from "../../services/turmaService";
import Cookies from "js-cookie";



function Turmas({definir}) {
    const cookieData = Cookies.get('usuario')
    const usuario = cookieData ? JSON.parse(cookieData) : { nome: '', foto: null, id: null }

    
    const [ordem, setOrdem] = useState(1);
    const [mostrarDropdown, setMostrarDropdown] = useState(false);

    const [turmas, setTurmas] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(null);
    

    useEffect(() => {
        if (!usuario.id) {
            setErro("Usuário não identificado.");
            setCarregando(false);
            return;
        }
    
        buscarTurmas()
            .then((data) => {
                setTurmas(data);
            })
            .catch(() => {
                setErro("Erro ao carregar as Turmas. Tente novamente.");
            })
            .finally(() => {
                setCarregando(false);
            });
    
    }, [usuario.id]);

    return (
        <div id={styles.turmas_content}>    
            <h3 className={styles.titulo}>Minhas Turmas</h3>
            <div id={styles.turmas_search}>
                <div>
                    <button
                    id="buttom-filtrar"
                    onClick={() => setMostrarDropdown(!mostrarDropdown)}>
                    <img src={Filtro} id="filtro"/>
                    </button>
                    <div id="dropdown-content" className={mostrarDropdown ? "ativo" : ""}>
                            <button id="drop-element" onClick={() => setOrdem(1)}>A-Z</button>
                            <button id="drop-element" onClick={() => setOrdem(-1)}>Z-A</button>
                    </div>
                </div>
            </div>

            {carregando && <p style={{ textAlign: "center" }}>Carregando notas...</p>}
            {erro && <p style={{ textAlign: "center", color: "#b71c1c" }}>{erro}</p>}

            <div id={styles.turmas_cards}>
                {
                    [...turmas]
                        .sort((a, b) => {
                            const nomeA = `${a.serie} ${a.turma}`;
                            const nomeB = `${b.serie} ${b.turma}`;

                            return ordem === 1
                                ? nomeA.localeCompare(nomeB)
                                : nomeB.localeCompare(nomeA);
                        })
                        .map((turma) => (
                            <CardTurma
                                key={turma.id}
                                id={turma.id}
                                nome={`${turma.serie}°${turma.turma}`}
                                onClick={() => definir(turma.id)}
                            />
                        ))
                }
            </div>
        </div>
    )
}

export default Turmas