import { useEffect, useRef, useState } from 'react'
import logo from './img/icon-poste.png'
import './App.css'

const pages = [
  ['visao-geral', 'Visão geral', 'fa-house'],
  ['postes', 'Postes', 'fa-location-dot'],
  ['relatorios', 'Relatórios', 'fa-chart-column'],
  ['configuracoes', 'Configurações', 'fa-gear'],
]

const poles = [
  { id: 1, street: 'Av. Central', time: '19:30', status: 'ok', motion: false, x: 18, y: 53 },
  { id: 2, street: 'Rua das Flores', time: '19:45', status: 'fault', motion: false, x: 51, y: 61 },
  { id: 3, street: 'Rua do Parque', time: '19:30', status: 'ok', motion: true, x: 82, y: 47 },
]
const sampleDate = '24/09/2026'

function readLocal(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback
  } catch {
    return fallback
  }
}

function getPage() {
  return pages.find(([id]) => '#' + id === window.location.hash)?.[0] ?? pages[0][0]
}

function Icon({ name }) {
  return <i className={'fa-solid ' + name} aria-hidden="true" />
}

function Status({ pole }) {
  return <span className={'status ' + pole.status}>{pole.status === 'ok' ? 'Operacional' : 'Com falha'}</span>
}

function PoleTable({ items, onSelect }) {
  if (!items.length) return <p className="empty">Nenhum poste encontrado.</p>

  return (
    <div className="table-wrap">
      <table>
        <thead><tr><th>Poste</th><th>Status</th><th>Última atualização</th><th>Ações</th></tr></thead>
        <tbody>{items.map(pole => (
          <tr key={pole.id}>
            <td><strong>Poste {pole.id}</strong><small>{pole.street}</small></td>
            <td><Status pole={pole} /></td>
            <td>{sampleDate} · {pole.time}</td>
            <td><button className="icon-button" aria-label={'Ver detalhes do Poste ' + pole.id} onClick={() => onSelect(pole)}> <Icon name="fa-file-lines" /> </button></td>
          </tr>
        ))}</tbody>
      </table>
    </div>
  )
}

function PoleMap({ onSelect }) {
  return (
    <section className="panel map-panel">
      <div className="section-head"><h2>Mapa dos postes</h2><span>Mapa esquemático</span></div>
      <div className="map">
        <span className="street street-main">Av. Central</span>
        <span className="street street-side">Rua das Flores</span>
        {poles.map(pole => (
          <button key={pole.id} className={'marker ' + pole.status} style={{ left: pole.x + '%', top: pole.y + '%' }}
            onClick={() => onSelect(pole)} aria-label={'Ver Poste ' + pole.id + ' em ' + pole.street}>
            <span className="marker-pin"><span className="lamp" /><span className="marker-status"><Icon name={pole.status === 'ok' ? 'fa-check' : 'fa-exclamation'} /></span></span>
            <strong>Poste {pole.id}</strong>
          </button>
        ))}
      </div>
    </section>
  )
}

function App() {
  const [page, setPage] = useState(getPage)
  const [collapsed, setCollapsed] = useState(false)
  const [selected, setSelected] = useState(null)
  const [registering, setRegistering] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const [showAlert, setShowAlert] = useState(() => readLocal('light-alert', true))
  const [tickets, setTickets] = useState(() => readLocal('light-tickets', []))
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('all')
  const [notice, setNotice] = useState('')
  const modal = useRef(null)

  useEffect(() => {
    function navigate() {
      setPage(getPage())
      setNotice('')
    }
    window.addEventListener('hashchange', navigate)
    return () => window.removeEventListener('hashchange', navigate)
  }, [])

  useEffect(() => {
    if (selected && !modal.current.open) modal.current.showModal()
  }, [selected])

  const fault = poles.find(pole => pole.status === 'fault')
  const failures = poles.filter(pole => pole.status === 'fault').length
  const operational = poles.length - failures
  const activeTicket = tickets.find(ticket => ticket.poleId === fault.id && !ticket.closed)
  const search = query.trim().toLocaleLowerCase('pt-BR')
  const visiblePoles = poles.filter(pole =>
    (filter === 'all' || pole.status === filter) &&
    ('poste ' + pole.id + ' ' + pole.street).toLocaleLowerCase('pt-BR').includes(search),
  )

  function openPole(pole, register = false) {
    setSelected(pole)
    setRegistering(register)
  }

  function saveTickets(next, message) {
    setTickets(next)
    localStorage.setItem('light-tickets', JSON.stringify(next))
    setNotice(message)
  }

  function submitTicket(event) {
    event.preventDefault()
    const description = new FormData(event.currentTarget).get('description').trim()
    if (!description || activeTicket) return

    saveTickets([{
      id: Date.now(), poleId: selected.id, description, closed: false,
      date: new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }),
    }, ...tickets], 'Chamado de manutenção registrado.')
    modal.current.close()
  }

  return (
    <div className={collapsed ? 'layout compact' : 'layout'}>
      <aside className="sidebar">
        <a className="brand" href="#visao-geral" aria-label="Light Monitoration"><img src={logo} alt="" /><span>Light <br />Monitoration</span></a>
        <nav id="main-nav" aria-label="Menu principal">
          {pages.map(([id, label, icon]) => (
            <a key={id} href={'#' + id} aria-label={label} title={collapsed ? label : undefined} aria-current={page === id ? 'page' : undefined}><Icon name={icon} /><span>{label}</span></a>
          ))}
        </nav>
        <button className="icon-button sidebar-toggle" type="button" aria-controls="main-nav" aria-expanded={!collapsed} aria-label={collapsed ? 'Expandir menu' : 'Recolher menu'} onClick={() => setCollapsed(!collapsed)}><Icon name={collapsed ? 'fa-chevron-right' : 'fa-chevron-left'} /></button>
        <div className="sidebar-footer"><span /> Modo demonstração</div>
      </aside>

      <main>
        <header className="page-head">
          <div><p className="eyebrow">Central de operações</p><h1>{page === 'visao-geral' ? 'Monitoramento de Iluminação Pública' : pages.find(([id]) => id === page)[1]}</h1></div>
          <div className="date"><Icon name="fa-calendar-days" /><div><strong>{sampleDate}</strong><small>19:45 · Telemetria de exemplo</small></div></div>
        </header>
        {notice && <p className="notice" role="status">{notice}</p>}

        {page === 'visao-geral' && <>
          <div className="metrics">
            {[[poles.length, 'Postes monitorados', 'fa-lightbulb', 'purple'], [operational, 'Operacionais', 'fa-circle-check', 'green'], [failures, 'Com falha', 'fa-triangle-exclamation', 'red']].map(([value, label, icon, color]) => (
              <div key={label} className={'metric ' + color}><div><strong>{value}</strong><span>{label}</span></div><span className="metric-icon"><Icon name={icon} /></span></div>
            ))}
          </div>
          <div className="overview-grid">
            <PoleMap onSelect={openPole} />
            {showAlert && !dismissed && (
              <section className="panel alert-panel">
                <div className="section-head"><h2><Icon name="fa-circle-exclamation" /> Alerta de falha</h2><button className="icon-button" aria-label="Dispensar alerta" onClick={() => setDismissed(true)}>×</button></div>
                <div className="alert-info"><span className="alert-lamp"><span className="lamp" /></span><div><strong>Poste {fault.id}</strong><p>{fault.street}</p><small>Detectada em {sampleDate} às {fault.time}</small></div></div>
                {activeTicket ? <a className="button secondary" href="#relatorios">Acompanhar chamado</a> : <button className="button danger" onClick={() => openPole(fault, true)}>Registrar manutenção</button>}
              </section>
            )}
            <section className="panel"><div className="section-head"><h2>Postes monitorados</h2><a className="text-link" href="#postes">Ver todos</a></div><PoleTable items={poles} onSelect={openPole} /></section>
            <section className="panel"><div className="section-head"><h2>Status dos postes</h2></div><div className="chart">
              <div className="donut" style={{ '--operational': operational / poles.length * 100 + '%' }} aria-hidden="true"><strong>{poles.length}</strong></div>
              <div className="legend"><span className="status ok">Operacionais ({operational})</span><span className="status fault">Com falha ({failures})</span></div>
            </div></section>
          </div>
        </>}

        {page === 'postes' && <div className="page-stack">
          <section className="panel">
            <div className="section-head"><h2>Lista de postes</h2></div>
            <div className="filters">
              <label>Buscar poste<input type="search" placeholder="Número ou rua" value={query} onChange={event => setQuery(event.target.value)} /></label>
              <label>Status<select value={filter} onChange={event => setFilter(event.target.value)}><option value="all">Todos</option><option value="ok">Operacionais</option><option value="fault">Com falha</option></select></label>
            </div>
            <PoleTable items={visiblePoles} onSelect={openPole} />
          </section>
          <PoleMap onSelect={openPole} />
        </div>}

        {page === 'relatorios' && <div className="page-stack">
          <section className="panel">
            <div className="section-head"><h2>Histórico de falhas</h2></div>
            <PoleTable items={poles.filter(pole => pole.status === 'fault')} onSelect={openPole} />
          </section>
          <section className="panel">
            <div className="section-head"><h2>Chamados de manutenção</h2></div>
            {tickets.length ? <ul className="ticket-list">{tickets.map(ticket => (
              <li key={ticket.id}><div><strong>Poste {ticket.poleId} · {ticket.closed ? 'Concluído' : 'Aberto'}</strong><small>{ticket.date}</small><p>{ticket.description}</p></div>
                {!ticket.closed && <button className="button secondary" onClick={() => saveTickets(tickets.map(item => item.id === ticket.id ? { ...item, closed: true } : item), 'Chamado concluído.')}>Concluir chamado</button>}
              </li>
            ))}</ul> : <p className="empty">Nenhum chamado registrado. Abra os detalhes de um poste com falha para registrar a manutenção.</p>}
          </section>
        </div>}

        {page === 'configuracoes' && <section className="panel settings">
          <div className="section-head"><h2>Preferências da central</h2></div>
          <label className="setting-row"><span><strong>Alertas de falha</strong><small>Exibir o cartão de alerta na visão geral.</small></span><input type="checkbox" checked={showAlert} onChange={event => {
            setShowAlert(event.target.checked)
            setDismissed(false)
            localStorage.setItem('light-alert', JSON.stringify(event.target.checked))
          }} /></label>
        </section>}
      </main>

      <dialog aria-labelledby="pole-dialog-title" ref={modal} onClose={() => { setSelected(null); setRegistering(false) }}>
        {selected && <div className="dialog-body">
          <div className="section-head"><h2 id="pole-dialog-title">{registering ? 'Registrar manutenção' : 'Detalhes do poste'}</h2><button className="icon-button" aria-label="Fechar janela" onClick={() => modal.current.close()}>×</button></div>
          <div className="dialog-content">
            <h3>Poste {selected.id} · {selected.street}</h3>
            <Status pole={selected} />
            {registering ? <form onSubmit={submitTicket}>
              <label>Descrição da manutenção<textarea name="description" required maxLength={500} rows={4} onChange={event => event.target.setCustomValidity(event.target.value.trim() ? '' : 'Informe a descrição da manutenção.')} /></label>
              <button className="button primary" type="submit">Salvar chamado</button>
            </form> : <>
              <dl><div><dt>Última atualização</dt><dd>{sampleDate} às {selected.time}</dd></div>
                <div><dt>Sensor de movimento</dt><dd>{selected.status === 'fault' ? 'Sem leitura' : selected.motion ? 'Movimento detectado' : 'Sem movimento'}</dd></div>
                <div><dt>Intensidade da luminária</dt><dd>{selected.status === 'fault' ? 'Sem leitura' : selected.motion ? '100%' : '50%'}</dd></div></dl>
              {selected.status === 'fault' && (activeTicket ? <a className="button secondary" href="#relatorios" onClick={() => modal.current.close()}>Acompanhar chamado</a> : <button className="button danger" onClick={() => setRegistering(true)}>Registrar manutenção</button>)}
            </>}
          </div>
        </div>}
      </dialog>
    </div>
  )
}

export default App

