import { BrowserRouter, Routes, Route } from "react-router-dom"
import Auth from "./pages/Login/Auth"
import Professor from "./pages/Professor/Professor"
import Aluno from "./pages/Aluno/Aluno"


function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Auth></Auth>}></Route>
                <Route path="/professor" element={<Professor></Professor>}></Route>
                <Route path="/aluno" element={<Aluno></Aluno>}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes