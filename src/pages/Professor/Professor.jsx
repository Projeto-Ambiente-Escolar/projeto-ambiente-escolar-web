import BarraSuperior from "../BarraSuperior/BarraSuperior"
import Foto from "../../../public/assets/foto_perfil.svg"


function Professor() {
    return (
        <div>
            <BarraSuperior nome={"Professor Paulo"} foto={Foto}></BarraSuperior>
        </div>
    )
}

export default Professor