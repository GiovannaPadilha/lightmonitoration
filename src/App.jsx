import { useState } from 'react'

import './App.css'

const postesIniciais = [
  { id: 1, status: 'OK', atualizacao: '04/10/2026 10:20' },
  { id: 2, status: 'OK', atualizacao: '04/10/2026 10:20' },
  { id: 3, status: 'OK', atualizacao: '04/10/2026 10:40' },
  { id: 4, status: 'FALHA', atualizacao: '04/10/2026 10:50' },
];


function App() {

  const [sidebarAberta, setSidebarAberta] = useState(false);
  const [postes] = useState(postesIniciais);

  const operacionais = postes.filter(
    (poste) => poste.status === 'OK'
  ).length;

  const comFalha = postes.filter(
    (poste) => poste.status === 'FALHA'
  ).length;

  function verDetalhes(poste) {
    alert(
      `Poste ${poste.id}\n` +
      `Status: ${poste.status}\n` +
      `Última atualização: ${poste.atualizacao}`
    );
  }  
  return (
    <>
   <div className="container">
      <nav
        id="sidebar"
        className={sidebarAberta ? 'open-sidebar' : ''}
      >
        <div id="sidebar_content">
          <div id="user">
            <img
              src="/src/img/icon-poste.png"
              id="avatar"
              alt="Light Monitoration"
            />

            <p id="name">
              <span className="item_description">
                Light Monitoration
              </span>
            </p>
          </div>

          <ul id="side_items">
            <li className="side_item active">
              <a href="#visao-geral" title="Visão Geral">
                <i className="fa-solid fa-house" />
                <span className="item_description">
                  Visão Geral
                </span>
              </a>
            </li>

            <li className="side_item">
              <a href="#postes" title="Postes">
                <i className="fa-solid fa-location-dot" />
                <span className="item_description">
                  Postes
                </span>
              </a>
            </li>

            <li className="side_item">
              <a href="#relatorios" title="Relatórios">
                <i className="fa-solid fa-chart-column" />
                <span className="item_description">
                  Relatórios
                </span>
              </a>
            </li>

            <li className="side_item">
              <a href="#configuracoes" title="Configurações">
                <i className="fa-solid fa-gear" />
                <span className="item_description">
                  Configurações
                </span>
              </a>
            </li>
          </ul>

          <button
            id="open_btn"
            onClick={() => setSidebarAberta(!sidebarAberta)}
            aria-label={
              sidebarAberta ? 'Recolher menu' : 'Expandir menu'
            }
          >
            <i
              id="open_btn_icon"
              className={`fa-solid ${
                sidebarAberta
                  ? 'fa-chevron-left'
                  : 'fa-chevron-right'
              }`}
            />
          </button>
        </div>

        <div id="logout">
          <button id="logout_btn" onClick={() => alert('Logout ainda não implementado.')}>
            <i className="fa-solid fa-right-from-bracket" />
            <span className="item_description">Logout</span>
          </button>
        </div>
      </nav>

      <div id="content">
        <div id="top-content">
          <main id="visao-geral">
            <h1>Monitoramento de Iluminação Pública</h1>
          </main>

          <div id="date-item">
            <p className="date-item">
              <i className="fa-regular fa-calendar-days" />
              <span className="date">04/10/2026</span>
            </p>

            <span className="date">10:30</span>
          </div>
        </div>

        <section id="cards">
          <div className="card-light">
            <div className="card-info">
              <span className="card-number">{postes.length}</span>
              <span>Postes monitorados</span>
            </div>
            <i className="fa-solid fa-wave-square" />
          </div>

          <div className="card-check">
            <div className="card-info">
              <span className="card-number">{operacionais}</span>
              <span>Operacionais</span>
            </div>
            <i className="fa-solid fa-circle-check" />
          </div>

          <div className="card-error">
            <div className="card-info">
              <span className="card-number">{comFalha}</span>
              <span>Com falha</span>
            </div>
            <i className="fa-solid fa-triangle-exclamation" />
          </div>
        </section>

        <section id="postes">
          <h2>Informações dos postes</h2>

          <div className="table-container">
            <table className="infos_post">
              <thead>
                <tr>
                  <th>Poste</th>
                  <th>Status</th>
                  <th>Última atualização</th>
                  <th>Ação</th>
                </tr>
              </thead>

              <tbody>
                {postes.map((poste) => (
                  <tr key={poste.id}>
                    <td>Poste {poste.id}</td>

                    <td>
                      <span
                        className={
                          poste.status === 'OK'
                            ? 'status-ok'
                            : 'status-error'
                        }
                      >
                        {poste.status}
                      </span>
                    </td>

                    <td>{poste.atualizacao}</td>

                    <td>
                      <button
                        className="action-button"
                        onClick={() => verDetalhes(poste)}
                        aria-label={`Ver detalhes do poste ${poste.id}`}
                        title="Ver detalhes"
                      >
                        <i className="fa-solid fa-file" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
    </>
  )
}

export default App
