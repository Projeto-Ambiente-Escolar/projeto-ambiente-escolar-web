import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./pages/Login/Auth";
import Professor from "./pages/Professor/Professor";
import Notas from "./pages/Aluno/Notas";
import Secretaria from "./pages/Secretaria/Secretaria";
import Observacoes from "./pages/Aluno/Observacoes";
import Disciplinas from "./pages/Aluno/Disciplinas";
import Desempenho from "./pages/Desempenho/Desempenho";
import PrivateRoute from "./routes/PrivateRoute";
import AcessoNegado from "./pages/AcessoNegado/AcessoNegado";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/acesso-negado" element={<AcessoNegado />} />

        <Route
          path="/notas"
          element={
            <PrivateRoute allowedRoles={["aluno"]}>
              <Notas />
            </PrivateRoute>
          }
        />

        <Route
          path="/observacoes"
          element={
            <PrivateRoute allowedRoles={["aluno"]}>
              <Observacoes />
            </PrivateRoute>
          }
        />

        <Route
          path="/disciplinas"
          element={
            <PrivateRoute allowedRoles={["aluno"]}>
              <Disciplinas />
            </PrivateRoute>
          }
        />

        <Route
          path="/professor"
          element={
            <PrivateRoute allowedRoles={["professor"]}>
              <Professor />
            </PrivateRoute>
          }
        />

        <Route
          path="/turmas"
          element={
            <PrivateRoute allowedRoles={["professor"]}>
              <Professor />
            </PrivateRoute>
          }
        />

        <Route
          path="/lancar-notas"
          element={
            <PrivateRoute allowedRoles={["professor"]}>
              <Professor />
            </PrivateRoute>
          }
        />

        <Route
          path="/recados"
          element={
            <PrivateRoute allowedRoles={["professor"]}>
              <Professor />
            </PrivateRoute>
          }
        />

        <Route
          path="/desempenho"
          element={
            <PrivateRoute allowedRoles={["professor"]}>
              <Professor />
            </PrivateRoute>
          }
        />

        <Route
          path="/secretaria"
          element={
            <PrivateRoute allowedRoles={["secretaria"]}>
              <Secretaria />
            </PrivateRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;