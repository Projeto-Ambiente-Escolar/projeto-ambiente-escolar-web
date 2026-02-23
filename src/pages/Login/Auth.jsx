import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import './Auth.css'
import Logo from '../../../public/assets/Logooo.svg'

function Auth() {
  const navigate = useNavigate()

  const [isCadastro, setIsCadastro] = useState(true)

  const [nome, setNome] = useState('')
  const [matricula, setMatricula] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')

  const [credenciais, setCredenciais] = useState('')
  const [senha2, setSenha2] = useState('')
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)

  const isAluno = (email) => email.endsWith('@email.com')

  const handleLogin = async () => {
    if (!credenciais || !senha2) {
      setErro('Preencha todos os campos.')
      return
    }

    setErro('')
    setCarregando(true)

    try {
      if (isAluno(credenciais)) {
        const response = await fetch('/api/aluno/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: credenciais, senha: senha2 }),
        })

        if (!response.ok) throw new Error('Credenciais inválidas.')

        const data = await response.json()
        Cookies.set('usuario', JSON.stringify({ ...data, tipo: 'aluno' }), { expires: 1 })
        navigate('/notas')
      } else {
        const response = await fetch('/api/professor/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: credenciais, senha: senha2 }),
        })

        if (!response.ok) throw new Error('Credenciais inválidas.')

        const data = await response.json()
        Cookies.set('usuario', JSON.stringify({ ...data, tipo: 'professor' }), { expires: 1 })
        navigate('/turmas')
      }
    } catch (err) {
      setErro(err.message || 'Erro ao fazer login.')
    } finally {
      setCarregando(false)
    }
  }

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
              <h1>Bem Vindo!</h1>
              <p style={{ fontWeight: 'lighter' }}>Seja Bem Vindo de Volta!</p>
            </div>

            <div id="login-inputs-2">
              <input
                id="input-1"
                placeholder="E-mail / Usuário"
                value={credenciais}
                onChange={(e) => setCredenciais(e.target.value)}
              />
              <input
                id="input-1"
                type="password"
                placeholder="Senha"
                value={senha2}
                onChange={(e) => setSenha2(e.target.value)}
              />
              {erro && <p style={{ color: '#ff6b6b', fontSize: '1.4vh', margin: 0 }}>{erro}</p>}
            </div>
          </div>

          <div id="login-informations-2">
            <p onClick={() => setIsCadastro(false)}>Cadastro</p>
            <button id="buttom-2" onClick={handleLogin} disabled={carregando}>
              {carregando ? 'Entrando...' : 'Entrar'}
            </button>
          </div>
        </div>

        <div id="login-content">
          <div id="login-title">
            <h1>Aluno</h1>
            <p style={{ fontWeight: 'lighter' }}>Cadastrar</p>
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