import { useState } from 'react'
import './Login.css'
import Logo from '../../../public/assets/Logooo.svg'

function Login() {
    const [nome, setNome] = useState()
    const [matricula, setMatricula] = useState()
    const [email, setEmail] = useState()
    const [senha, setSenha] = useState()

    function clicar() {
        alert(nome + ' ' + matricula + ' ' + email + ' ' + senha)
    }

    return (
        <div className='login-body'>
            <div id='login-container'>
                <div id='login-content'>
                    <div id='login-title'>
                        <h1>Aluno</h1>
                        <p>Cadastrar</p>
                    </div>
                    <div id='login-inputs'>
                        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} id='input-1' placeholder='Nome Completo'/>
                        <input type="text" value={matricula} onChange={(e) => setMatricula(e.target.value)} id='input-1' placeholder='Matrícula'/>
                        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} id='input-1' placeholder='E-mail'/>
                        <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} id='input-1' placeholder='Senha'/>
                    </div>
                    <div id='login-informations'>
                        <p>Login</p>
                        <button id='buttom-1' onClick={clicar}>Cadastrar</button>
                    </div>
                </div>
                <div id='login-logo'>
                    <img src={Logo} />
                </div>
            </div>
        </div>
    )
}

export default Login