import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import './Auth.css'
import Logo from '../../../public/assets/Logooo.svg'
import { cadastrarAluno } from '../../services/alunoService'
import { uploadFotoCloudinary } from '../../services/cloudinaryService'
import Toast from '../../Components/Toast/Toast'

function Auth() {
  const navigate = useNavigate()

  const [isCadastro, setIsCadastro] = useState(true)

  const [nome, setNome] = useState('')
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
  const [toast, setToast] = useState(null) 

  const mostrarToast = (mensagem, tipo) => setToast({ mensagem, tipo })

  const isAluno = (credencial) => credencial.includes('@')

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
  
      // 🔐 1️⃣ Verificação do Admin
      if (credenciais === "AdminSecretario" && senha2 === "admin123") {
        Cookies.set('usuario', JSON.stringify({ tipo: 'secretaria' }), { expires: 1 })
        navigate('/secretaria') // crie essa rota depois
        return
      }
  
      // 🎓 2️⃣ Se contém "@", é aluno
      if (credenciais.includes("@")) {
        const response = await fetch('/api/aluno/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: credenciais, senha: senha2 }),
        })
  
        const text = await response.text()
        if (!response.ok || !text) throw new Error()
  
        const data = JSON.parse(text)
        const { foto, ...dadosSemFoto } = data
        if (foto) localStorage.setItem('usuario_foto', foto)
        Cookies.set('usuario', JSON.stringify({ ...dadosSemFoto, tipo: 'aluno' }), { expires: 1 })
        mostrarToast('Login feito com sucesso', 'sucesso')
        setTimeout(() => navigate('/notas'), 1000)
        return
      }
  
      // 👨‍🏫 3️⃣ Caso contrário, é professor
      const response = await fetch('/api/professor/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: credenciais, senha: senha2 }),
      })
  
      const text = await response.text()
      if (!response.ok || !text) throw new Error()
  
      const data = JSON.parse(text)
        const { foto, ...dadosSemFoto } = data
        if (foto) localStorage.setItem('usuario_foto', foto)
      Cookies.set('usuario', JSON.stringify({ ...dadosSemFoto, tipo: 'professor' }), { expires: 1 })
      mostrarToast('Login feito com sucesso', 'sucesso')
        setTimeout(() => navigate('/turmas'), 1000)
  
    } catch (err) {
      setErroLogin(true)
      mostrarToast('Não foi possível fazer o login', 'erro')
    } finally {
      setCarregando(false)
    }
  }  

  const handleCadastro = async () => {
    const vazios = []
    if (!nome) vazios.push('nome')
    if (!email) vazios.push('email')
    if (!senha) vazios.push('senha')

    if (vazios.length > 0) {
      setErroCadastro(vazios)
      return
    }

    setErroCadastro([])
    setCarregando(true)

    try {
      // 1. Faz upload da foto para o Cloudinary e recebe a URL pública
      const fotoUrl = await uploadFotoCloudinary(fotoBase64)

      // 2. Cadastra o aluno enviando a URL da foto (curta) ao invés do Base64
      await cadastrarAluno({ nome, email, senha, foto: fotoUrl })
      setNome('')
      setEmail('')
      setSenha('')
      setFotoBase64('')
      setFotoPreview(null)
      setCadastroSucesso(true)
      setIsCadastro(true)
      mostrarToast('Cadastro feito com sucesso', 'sucesso')
    } catch (err) {
      setErroCadastro(['nome', 'email', 'senha'])
    } finally {
      setCarregando(false)
    }
  }

  return (
    <div className={`login-body ${isCadastro ? 'ativo' : ''}`}>

      {toast && (
        <Toast
          mensagem={toast.mensagem}
          tipo={toast.tipo}
          onClose={() => setToast(null)}
        />
      )}

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