import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

function PrivateRoute({ children, allowedRoles }) {
  const usuarioCookie = Cookies.get("usuario");

  if (!usuarioCookie) {
    return <Navigate to="/" replace />;
  }

  const usuario = JSON.parse(usuarioCookie);

  if (allowedRoles && !allowedRoles.includes(usuario.tipo)) {
    return <Navigate to="/acesso-negado" replace />;
  }

  return children;
}

export default PrivateRoute;