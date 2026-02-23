import { BrowserRouter, Routes, Route } from "react-router-dom"
import Auth from "./pages/Login/Auth"
import Professor from "./pages/Professor/Professor"
import Notas from "./pages/Aluno/Notas"
import Secretaria from "./pages/Secretaria/Secretaria"
import Observacoes from "./pages/Aluno/Observacoes"
import Disciplinas from "./pages/Aluno/Disciplinas"


function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Auth></Auth>}></Route>
                <Route path="/professor" element={<Professor></Professor>}></Route>
                <Route path="/notas" element={<Notas></Notas>}></Route>
                <Route path="/secretaria" element={<Secretaria></Secretaria>}></Route>
                <Route path="/observacoes" element={<Observacoes></Observacoes>}></Route>
                <Route path="/disciplinas" element={<Disciplinas></Disciplinas>}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes