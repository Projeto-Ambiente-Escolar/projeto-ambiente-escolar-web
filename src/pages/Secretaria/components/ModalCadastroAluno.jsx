import { useState } from "react";
import { cadastrarAluno } from "../../../services/alunoService";
import styles from "./ModalCadastroAluno.module.css";

const camposIniciais = {
    nome: "",
    matricula: "",
    email: "",
    senha: "",
    turma: "",
    status: "s",
    foto: "",
};

function ModalCadastroAluno({ onClose, onCadastrado }) {
    const [form, setForm] = useState(camposIniciais);
    const [erros, setErros] = useState({});
    const [popupErro, setPopupErro] = useState(false);
    const [mensagemErro, setMensagemErro] = useState("Erro ao cadastrar aluno. Verifique os campos.");
    const [carregando, setCarregando] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        setErros((prev) => ({ ...prev, [name]: false }));
    };

    const validar = () => {
        const novosErros = {};
        if (!form.nome.trim()) novosErros.nome = true;
        if (!form.matricula.trim()) novosErros.matricula = true;
        if (!form.email.trim()) novosErros.email = true;
        if (!form.senha.trim()) novosErros.senha = true;
        if (!form.turma || isNaN(Number(form.turma))) novosErros.turma = true;
        return novosErros;
    };

    const mostrarErroPopup = (mensagem = "Erro ao cadastrar aluno. Verifique os campos.") => {
        setMensagemErro(mensagem);
        setPopupErro(true);
        setTimeout(() => setPopupErro(false), 4000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const novosErros = validar();
        if (Object.keys(novosErros).length > 0) {
            setErros(novosErros);
            mostrarErroPopup();
            return;
        }

        setCarregando(true);
        try {
            const payload = {
                turma: Number(form.turma),
                nome: form.nome,
                matricula: form.matricula,
                email: form.email,
                senha: form.senha,
                status: form.status,
                foto: form.foto || "",
            };

            const resultado = await cadastrarAluno(payload);
            onCadastrado && onCadastrado(resultado);
            onClose();
        } catch (err) {
            const mensagem =
                err?.status === 408
                    ? "Servidor demorou para responder. Tente novamente."
                    : err?.message || "Erro ao cadastrar aluno. Verifique os campos.";
            mostrarErroPopup(mensagem);

            // Marca campos que podem ter causado erro conforme resposta da API
            const camposComErro = {};
            if (!form.nome.trim()) camposComErro.nome = true;
            if (!form.matricula.trim()) camposComErro.matricula = true;
            if (!form.email.trim()) camposComErro.email = true;
            if (!form.senha.trim()) camposComErro.senha = true;
            if (!form.turma || isNaN(Number(form.turma))) camposComErro.turma = true;
            setErros(camposComErro);
        } finally {
            setCarregando(false);
        }
    };

    return (
        <div className={styles.overlay}>
            {popupErro && (
                <div className={styles.popupErro}>
                    <span className={styles.popupErroIcone}>✕</span>
                    <span>{mensagemErro}</span>
                </div>
            )}

            <div className={styles.modal}>
                <div className={styles.modalHeader}>
                    <h2 className={styles.titulo}>Cadastrar Aluno</h2>
                    <button className={styles.btnFecharX} onClick={onClose}>✕</button>
                </div>

                <form onSubmit={handleSubmit} className={styles.form} noValidate>
                    <div className={styles.grupo}>
                        <label className={styles.label}>Nome</label>
                        <input
                            className={`${styles.input} ${erros.nome ? styles.inputErro : ""}`}
                            type="text"
                            name="nome"
                            placeholder="Nome completo"
                            value={form.nome}
                            onChange={handleChange}
                        />
                    </div>

                    <div className={styles.grupo}>
                        <label className={styles.label}>Matrícula</label>
                        <input
                            className={`${styles.input} ${erros.matricula ? styles.inputErro : ""}`}
                            type="text"
                            name="matricula"
                            placeholder="Número de matrícula"
                            value={form.matricula}
                            onChange={handleChange}
                        />
                    </div>

                    <div className={styles.grupo}>
                        <label className={styles.label}>E-mail</label>
                        <input
                            className={`${styles.input} ${erros.email ? styles.inputErro : ""}`}
                            type="email"
                            name="email"
                            placeholder="E-mail do aluno"
                            value={form.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className={styles.grupo}>
                        <label className={styles.label}>Senha</label>
                        <input
                            className={`${styles.input} ${erros.senha ? styles.inputErro : ""}`}
                            type="password"
                            name="senha"
                            placeholder="Senha de acesso"
                            value={form.senha}
                            onChange={handleChange}
                        />
                    </div>

                    <div className={styles.grupo}>
                        <label className={styles.label}>Turma (ID)</label>
                        <input
                            className={`${styles.input} ${erros.turma ? styles.inputErro : ""}`}
                            type="number"
                            name="turma"
                            placeholder="ID da turma"
                            value={form.turma}
                            onChange={handleChange}
                        />
                    </div>

                    <div className={styles.grupo}>
                        <label className={styles.label}>Foto (URL)</label>
                        <input
                            className={styles.input}
                            type="text"
                            name="foto"
                            placeholder="URL da foto (opcional)"
                            value={form.foto}
                            onChange={handleChange}
                        />
                    </div>

                    <div className={styles.acoes}>
                        <button
                            type="button"
                            className={styles.btnCancelar}
                            onClick={onClose}
                            disabled={carregando}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className={styles.btnCadastrar}
                            disabled={carregando}
                        >
                            {carregando ? "Cadastrando..." : "Cadastrar"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ModalCadastroAluno;
