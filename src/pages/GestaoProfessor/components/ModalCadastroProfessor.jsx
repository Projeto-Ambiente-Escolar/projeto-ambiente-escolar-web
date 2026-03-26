import { useState, useEffect } from "react";
import styles from "../GestaoProfessor.module.css";
import { cadastrarProfessor, atualizarProfessor } from "../../../services/professorService";

const camposIniciais = {
    id: null,
    nome: "",
    usuario: "",
    senha: "",
    disciplina: ""
};

function ModalCadastroProfessor({ onClose, onSalvo, professorEditando }) {
    const [form, setForm] = useState(camposIniciais);
    const [erros, setErros] = useState({});
    const [popupErro, setPopupErro] = useState(false);
    const [mensagemErro, setMensagemErro] = useState("");
    const [carregando, setCarregando] = useState(false);

    useEffect(() => {
        if (professorEditando) {
            console.log("🔍 Professor recebido para edição:", professorEditando);

            setForm({
                id: professorEditando.id, // 👈 IMPORTANTE
                nome: professorEditando.nome || "",
                usuario: professorEditando.usuario || "",
                senha: "",
                disciplina: professorEditando.disciplina || ""
            });
        } else {
            setForm(camposIniciais);
        }
    }, [professorEditando]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        setErros((prev) => ({ ...prev, [name]: false }));
    };

    const validar = () => {
        const novosErros = {};
        if (!form.nome.trim()) novosErros.nome = true;
        if (!form.usuario.trim()) novosErros.usuario = true;
        if (!professorEditando && !form.senha.trim()) novosErros.senha = true;
        if (!form.disciplina.trim()) novosErros.disciplina = true;
        return novosErros;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("📤 Dados do formulário antes de enviar:", form);

        const novosErros = validar();
        if (Object.keys(novosErros).length > 0) {
            setErros(novosErros);
            setMensagemErro("Preencha corretamente");
            setPopupErro(true);
            return;
        }

        setCarregando(true);

        try {
            if (professorEditando) {
                // 🔥 REMOVE SENHA NO UPDATE
                const { senha, ...dadosSemSenha } = form;

                console.log("✏️ Atualizando professor:", dadosSemSenha);

                await atualizarProfessor(dadosSemSenha);
            } else {
                console.log("🆕 Cadastrando professor:", form);

                await cadastrarProfessor(form);
            }

            onSalvo();
            onClose();

        } catch (err) {
            console.error("❌ ERRO COMPLETO:", err);

            // 🔥 MOSTRA ERRO REAL DO BACKEND
            const mensagem =
                err.response?.data?.message ||
                err.response?.data ||
                "Erro ao salvar";

            console.log("📛 Mensagem do backend:", mensagem);

            setMensagemErro(mensagem);
            setPopupErro(true);

        } finally {
            setCarregando(false);
        }
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>

                <div className={styles.modalHeader}>
                    <h2 className={styles.titulo}>
                        {professorEditando ? "Editar Professor" : "Cadastrar Professor"}
                    </h2>
                    <button onClick={onClose} className={styles.btnFecharX}>✕</button>
                </div>

                {popupErro && <div className={styles.popupErro}>{mensagemErro}</div>}

                <form onSubmit={handleSubmit} className={styles.form}>

                    <div className={styles.grupo}>
                        <label className={styles.label}>Nome</label>
                        <input
                            className={`${styles.input} ${erros.nome ? styles.inputErro : ""}`}
                            name="nome"
                            value={form.nome}
                            onChange={handleChange}
                            placeholder="Nome"
                        />
                    </div>

                    <div className={styles.grupo}>
                        <label className={styles.label}>Usuario</label>
                        <input
                            className={`${styles.input} ${erros.usuario ? styles.inputErro : ""}`}
                            name="usuario"
                            value={form.usuario}
                            onChange={handleChange}
                            placeholder="Usuario"
                        />
                    </div>

                    {!professorEditando && (
                        <div className={styles.grupo}>
                            <label className={styles.label}>Senha</label>
                            <input
                                type="password"
                                className={`${styles.input} ${erros.senha ? styles.inputErro : ""}`}
                                name="senha"
                                value={form.senha}
                                onChange={handleChange}
                                placeholder="Senha"
                            />
                        </div>
                    )}

                    <div className={styles.grupo}>
                        <label className={styles.label}>Disciplina</label>
                        <input
                            className={`${styles.input} ${erros.disciplina ? styles.inputErro : ""}`}
                            name="disciplina"
                            value={form.disciplina}
                            onChange={handleChange}
                            placeholder="Disciplina"
                        />
                    </div>

                    <div className={styles.acoes}>
                        <button
                            type="button"
                            className={styles.btnCancelar}
                            onClick={onClose}
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            className={styles.btnCadastrar}
                            disabled={carregando}
                        >
                            {carregando ? "Salvando..." : "Salvar"}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default ModalCadastroProfessor;