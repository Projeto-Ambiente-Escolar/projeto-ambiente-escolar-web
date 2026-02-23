import { 
    FaClipboardList, 
    FaBook, 
    FaGraduationCap 
} from "react-icons/fa";

export const menuConfig = {
    aluno: [
        {
            label: "Observações",
            rota: "/observacoes",
            icon: FaClipboardList
        },
        {
            label: "Notas",
            rota: "/notas",
            icon: FaGraduationCap
        },
        {
            label: "Disciplinas",
            rota: "/disciplinas",
            icon: FaBook
        },
    ],
    professor: [
        {
            label: "Minhas Turmas",
            rota: "/turmas",
            icon: FaBook
        },
        {
            label: "Lançar Notas",
            rota: "/lancar-notas",
            icon: FaClipboardList
        },
    ]
};