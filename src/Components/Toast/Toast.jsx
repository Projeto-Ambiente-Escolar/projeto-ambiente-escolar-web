import { useEffect, useState } from 'react'
import styles from './Toast.module.css'

function Toast({ mensagem, tipo, onClose }) {
  const [saindo, setSaindo] = useState(false)

  useEffect(() => {
    const timerSaindo = setTimeout(() => setSaindo(true), 2700)
    const timerClose = setTimeout(() => onClose(), 3200)
    return () => {
      clearTimeout(timerSaindo)
      clearTimeout(timerClose)
    }
  }, [])

  return (
    <div className={`${styles.toast} ${saindo ? styles.saindo : ''}`}>
      <p className={styles.mensagem}>{ mensagem }</p>
      <div className={`${styles.barra} ${styles[tipo]}`} />
    </div>
  )
}

export default Toast
