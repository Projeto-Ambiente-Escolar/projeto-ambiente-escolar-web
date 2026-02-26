import CardAlunoDesempenho from "../../Components/CardAluno/CardAluno"

// state
const [mostrarCard, setMostrarCard] = useState(false)
const [alunoSelecionado, setAlunoSelecionado] = useState(null)

const abrirCard = (aluno) => {
    setAlunoSelecionado(aluno)
    setMostrarCard(true)
}

{mostrarCard && (
    <CardAlunoDesempenho
        aluno={alunoSelecionado}
        fechar={() => setMostrarCard(false)}
    />
)}