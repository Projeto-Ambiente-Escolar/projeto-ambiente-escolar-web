import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import './Auth.css'
import Logo from '../../../public/assets/Logooo.svg'
import { cadastrarAluno } from '../../services/alunoService'

function Auth() {
  const navigate = useNavigate()

  const [isCadastro, setIsCadastro] = useState(true)

  const [nome, setNome] = useState('')
  const [matricula, setMatricula] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [fotoBase64, setFotoBase64] = useState('')
  const [fotoPreview, setFotoPreview] = useState(null)

  const [credenciais, setCredenciais] = useState('')
  const [senha2, setSenha2] = useState('')
  const [erroLogin, setErroLogin] = useState(false)
  const [erroCadastro, setErroCadastro] = useState([])
  const [carregando, setCarregando] = useState(false)
  const [cadastroSucesso, setCadastroSucesso] = useState(false)

  const isAluno = (email) => email.endsWith('@email.com')

  const handleFotoChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    const img = new Image()
    const url = URL.createObjectURL(file)
    img.src = url

    img.onload = () => {
      const MAX = 512
      let { width, height } = img

      if (width > height) {
        if (width > MAX) { height = Math.round(height * MAX / width); width = MAX }
      } else {
        if (height > MAX) { width = Math.round(width * MAX / height); height = MAX }
      }

      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0, width, height)

      // JPEG 80% — mesmo padrão do mobile (Bitmap.CompressFormat.JPEG, 80)
      const dataUrl = canvas.toDataURL('image/jpeg', 0.8)
      setFotoBase64(dataUrl.split(',')[1])
      setFotoPreview(dataUrl)
      URL.revokeObjectURL(url)
    }
  }

  const handleLogin = async () => {
    if (!credenciais || !senha2) {
      setErroLogin(true)
      return
    }

    setErroLogin(false)
    setCarregando(true)

    try {
      if (isAluno(credenciais)) {
        const response = await fetch('/api/aluno/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: credenciais, senha: senha2 }),
        })

        const text = await response.text()
        if (!response.ok || !text) throw new Error()

        const data = JSON.parse(text)
        Cookies.set('usuario', JSON.stringify({ ...data, tipo: 'aluno' }), { expires: 1 })
        navigate('/notas')
      } else {
        const response = await fetch('/api/professor/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: credenciais, senha: senha2 }),
        })

        const text = await response.text()
        if (!response.ok || !text) throw new Error()

        const data = JSON.parse(text)
        Cookies.set('usuario', JSON.stringify({ ...data, tipo: 'professor' }), { expires: 1 })
        navigate('/desempenho')
      }
    } catch (err) {
      setErroLogin(true)
    } finally {
      setCarregando(false)
    }
  }

  const handleCadastro = async () => {
    const vazios = []
    if (!nome) vazios.push('nome')
    if (!matricula) vazios.push('matricula')
    if (!email) vazios.push('email')
    if (!senha) vazios.push('senha')

    if (vazios.length > 0) {
      setErroCadastro(vazios)
      return
    }

    setErroCadastro([])
    setCarregando(true)

    try {
      await cadastrarAluno({ nome, matricula, email, senha, foto: fotoBase64 })
      setNome('')
      setMatricula('')
      setEmail('')
      setSenha('')
      setFotoBase64('')
      setFotoPreview(null)
      setCadastroSucesso(true)
      setIsCadastro(true)
    } catch (err) {
      setErroCadastro(['nome', 'matricula', 'email', 'senha'])
    } finally {
      setCarregando(false)
    }
  }

  return (
    <div className={`login-body ${isCadastro ? 'ativo' : ''}`}>

        <div className={`card-informacao ${cadastroSucesso ? 'ativo' : ''}`}>
            <h2>Cadastrado com Sucesso</h2>
            <p>Espere a aprovação da secretaria</p>
            <button id='buttom-1' onClick={() => setCadastroSucesso(false)}>Ok</button>
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
                className={`input-1 ${erroLogin && !credenciais ? 'input-erro' : ''}`}
                placeholder="E-mail / Usuário"
                value={credenciais}
                onChange={(e) => { setCredenciais(e.target.value); setErroLogin(false) }}
              />
              <input
                className={`input-1 ${erroLogin && !senha2 ? 'input-erro' : ''}`}
                type="password"
                placeholder="Senha"
                value={senha2}
                onChange={(e) => { setSenha2(e.target.value); setErroLogin(false) }}
              />
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
            <div id="foto-upload" onClick={() => document.getElementById('inputFoto').click()}>
              {fotoPreview
                ? <img src={fotoPreview} alt="Foto selecionada" id="foto-preview" />
                : <div id="foto-placeholder">📷</div>
              }
              <input
                id="inputFoto"
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleFotoChange}
              />
            </div>
            <input className={`input-1 ${erroCadastro.includes('nome') ? 'input-erro' : ''}`} placeholder="Nome Completo" value={nome} onChange={(e) => { setNome(e.target.value); setErroCadastro(p => p.filter(c => c !== 'nome')) }} />
            <input className={`input-1 ${erroCadastro.includes('matricula') ? 'input-erro' : ''}`} placeholder="Matrícula" value={matricula} onChange={(e) => { setMatricula(e.target.value); setErroCadastro(p => p.filter(c => c !== 'matricula')) }} />
            <input className={`input-1 ${erroCadastro.includes('email') ? 'input-erro' : ''}`} placeholder="E-mail" value={email} onChange={(e) => { setEmail(e.target.value); setErroCadastro(p => p.filter(c => c !== 'email')) }} />
            <input className={`input-1 ${erroCadastro.includes('senha') ? 'input-erro' : ''}`} type="password" placeholder="Senha" value={senha} onChange={(e) => { setSenha(e.target.value); setErroCadastro(p => p.filter(c => c !== 'senha')) }} />
          </div>

          <div id="login-informations">
            <p onClick={() => setIsCadastro(true)}>Login</p>
            <button id="buttom-1" onClick={handleCadastro} disabled={carregando}>
              {carregando ? 'Cadastrando...' : 'Cadastrar'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth