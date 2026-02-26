import { useState, useEffect } from "react";
import "./Desempenho.css";
import Filtro from "../../../public/assets/filter_icon.svg";

const mediaGeral = 7.645;

const alunosAtencao = [
  { nome: "Marcelo ne", media: 3.6 },
  { nome: "Luan Melo", media: 3.9 },
  { nome: "Ivo Sales", media: 4.8 },
  { nome: "Eva Nunes", media: 5.0 },
  { nome: "Noa Rios", media: 5.2 },
  { nome: "leo lins", media: 5.3 },
  { nome: "Marcelo ne", media: 3.6 },
  { nome: "Luan Melo", media: 3.9 },
  { nome: "Ivo Sales", media: 4.8 },
  { nome: "Eva Nunes", media: 5.0 },
  { nome: "Noa Rios", media: 5.2 },
  { nome: "leo lins", media: 5.3 },
];

const alunosDestaque = [
  { nome: "Lara Mota", nota: 9.6, posicao: 2 },
  { nome: "Ana Silva", nota: 10, posicao: 1 },
  { nome: "Bia Luz", nota: 9.4, posicao: 3 },
];

const mediasTurmaSemData = [
  { turma: "1ºC", media: 5},
  { turma: "1ºD", media: 8},
  { turma: "2ºA", media: 15},
  { turma: "3ºA", media: 12},
  { turma: "2ºB", media: 11},
  { turma: "1ºB", media: 20},
];

const getAno = (turma) => {
  const match = turma.match(/^(\d)/);
  return match ? parseInt(match[1]) : 0;
};

const ordemPodio = [2, 1, 3];

function AvatarIcon({ size = 52, color = "#b0bec5" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="24" fill={color + "22"} />
      <circle cx="24" cy="18" r="9" fill={color} />
      <ellipse cx="24" cy="38" rx="14" ry="8" fill={color} />
    </svg>
  );
}

function Circulo({ value, max = 10 }) {
  const [animated, setAnimated] = useState(1);
  const radius = 70;
  const stroke = 14;
  const circumference = 2 * Math.PI * radius;
  const dash = circumference * (animated / max);
  const gap = circumference - dash;

  useEffect(() => {
    const t = setTimeout(() => setAnimated(value), 100);
    return () => clearTimeout(t);
  }, [value]);

  return (
    <svg viewBox="0 0 180 180" style={{ width: "100%", height: "100%" }}>
      <circle cx="90" cy="90" r={radius} fill="none" stroke="#e8edf2" strokeWidth={stroke} />
      <circle
        cx="90" cy="90" r={radius}
        fill="none"
        stroke="url(#donutGrad)"
        strokeWidth={stroke}
        strokeDasharray={`${dash} ${gap}`}
        strokeLinecap="round"
        transform="rotate(-90 90 90)"
        style={{ transition: "stroke-dasharray 1.2s cubic-bezier(.4,0,.2,1)" }}
      />
      <defs>
        <linearGradient id="donutGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#0ea5e9" />
        </linearGradient>
      </defs>
      <text x="90" y="97" textAnchor="middle" className="donut-label">
        {value.toFixed(3)}
      </text> 
    </svg>
  );
}

export default function Desempenho({abrir}) {
  const [mostrarDropdown, setMostrarDropdown] = useState(false);
  const [filtroAno, setFiltroAno] = useState(1);

   const mediasFiltradas = filtroAno === 0
    ? mediasTurmaSemData
    : mediasTurmaSemData.filter((t) => getAno(t.turma) === filtroAno);

  const maxMedia = Math.max(...mediasFiltradas.map((t) => t.media));

  const selecionarAno = (ano) => {
    setFiltroAno(ano);
    setMostrarDropdown(false);
  };

  return (
    <div className="desempenho-page">
      <header className="desempenho-header">
        <h1 className="page-title">Desempenho</h1>
      </header>

      <div className="desempenho-grid">

        {/* Média Geral */}
        <div className="card card-media-geral">
          <p className="card-label">Média Geral</p>
          <div className="donut-wrapper">
            <Circulo value={mediaGeral} max={10} />
          </div>
        </div>

        {/* Atenção */}
        <div className="card card-atencao">
          <div className="card-atencao-header">
            <span className="icon-warn">⚠</span>
            <h2>Alunos que precisam de atenção</h2>
          </div>
          <p className="card-subtitle">Necessitam acompanhamento — média menor que 7</p>
          <div className={`atencao-list ${alunosAtencao.length > 5 ? "scrollavel" : ""}`}>
            {alunosAtencao.map((a) => (
              <div className="aluno-item" key={a.nome} onClick={() => abrir(a)} style={{ cursor: "pointer" }}>
                <AvatarIcon size={56} color="#90a4ae" />
                <span className="aluno-nome">{a.nome}</span>
                <span className="aluno-media atencao">{a.media}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Destaque */}
        <div className="card card-destaque">
          <div className="card-destaque-header">
            <span>👑</span>
            <h2>Alunos em destaque</h2>
          </div>
          <div className="podio">
            {[...alunosDestaque]
              .sort((a, b) => ordemPodio.indexOf(a.posicao) - ordemPodio.indexOf(b.posicao))
              .map((a) => (
                <div className={`podio-col pos-${a.posicao}`} key={a.nome} onClick={() => abrir(a)} style={{ cursor: "pointer" }}>
                  <AvatarIcon size={48} color="#78909c" />
                  <span className="podio-nome">{a.nome}</span>
                  <span className="podio-nota">{a.nota}</span>
                  <div className={`podio-bar pos-${a.posicao}`}>
                    <span className="podio-rank">{a.posicao}</span>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Turmas */}
        <div className="card card-turmas">
          <div className="turmas-title-row">
            <h2 className="turmas-title">Média de Notas por turma</h2>
            <div className="turmas-filtro-wrapper">
              <button id="buttom-filtrar" onClick={() => setMostrarDropdown(!mostrarDropdown)}>
                <img src={Filtro} id="filtro" alt="filtrar" />
              </button>
              <div id="dropdown-content" className={mostrarDropdown ? "ativo" : ""}>
                <button id="drop-element" onClick={() => selecionarAno(1)}>1º Ano</button>
                <button id="drop-element" onClick={() => selecionarAno(2)}>2º Ano</button>
                <button id="drop-element" onClick={() => selecionarAno(3)}>3º Ano</button>
              </div>
            </div>
          </div>

          <div className="bar-chart">
            {mediasFiltradas.length === 0 ? (
              <p className="turmas-vazio">Nenhuma turma encontrada.</p>
            ) : (
              mediasFiltradas.map((t) => (
                <div className="bar-row" key={t.turma}>
                  <span className="bar-label">{t.turma}</span>
                  <div className="bar-track">
                    <div className="bar-fill" style={{ "--bar-width": `${(t.media / maxMedia) * 100}%` }} />
                  </div>
                  <span className="bar-value">{t.media}</span>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
