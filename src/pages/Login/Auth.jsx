import { useState } from 'react'
import './Auth.css'
import Logo from '../../../public/assets/Logooo.svg'

function Auth() {
  const [isCadastro, setIsCadastro] = useState(true)

  const [nome, setNome] = useState('')
  const [matricula, setMatricula] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')

  const [cresenciais, setCredenciais] = useState('')
  const [senha2, setSenha2] = useState('')


  return (
    <div className={`login-body ${isCadastro ? 'ativo' : ''}`}>

        <div className='card-informacao'>
            <h2>Cadastrado com Sucesso</h2>
            <p>Espere a aprovação da secretaria</p>
            <button id='buttom-1'>Ok</button>
        </div>

      <div id="login-container" className={isCadastro ? 'ativo' : ''}>

        <div id='logo'>
          <img src={Logo}/>
        </div>

        <div id="login-content-2">
          <div id="login-title-2">
            <div>
              <h1>Aluno</h1>
              <p>Seja Bem Vindo de Volta!</p>
            </div>

            <div id="login-inputs-2">
              <input id="input-1" placeholder="E-mail/Usuário" value={cresenciais} onChange={(e) => setCredenciais(e.target.value)} />
              <input id="input-1" type="password" placeholder="Senha" value={senha2} onChange={(e) => setSenha2(e.target.value)} />
            </div>
          </div>

          <div id="login-informations-2">
            <p onClick={() => setIsCadastro(false)}>Cadastro</p>
            <button id="buttom-2">Entrar</button>
          </div>
        </div>

        <div id="login-content">
          <div id="login-title">
            <h1>Aluno</h1>
            <p>Cadastrar</p>
          </div>

          <div id="login-inputs">
            <input id="input-1" placeholder="Nome Completo" value={nome} onChange={(e) => setNome(e.target.value)} />
            <input id="input-1" placeholder="Matrícula" value={matricula} onChange={(e) => setMatricula(e.target.value)} />
            <input id="input-1" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input id="input-1" type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} />
          </div>

          <div id="login-informations">
            <p onClick={() => setIsCadastro(true)}>Login</p>
            <button id="buttom-1">Cadastrar</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth