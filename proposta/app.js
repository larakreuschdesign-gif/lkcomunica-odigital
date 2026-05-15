// =================================================================
//  LK Comunicação Digital · Sistema de Propostas Comerciais
// =================================================================

const DB_KEY   = 'lk_propostas_v1';
const SERV_KEY = 'lk_servicos_v1';

function getAll() {
  try { return JSON.parse(localStorage.getItem(DB_KEY)) || []; } catch { return []; }
}
function saveAll(list) { localStorage.setItem(DB_KEY, JSON.stringify(list)); }
function getById(id) { return getAll().find(p => p.id === id) || null; }
function deleteById(id) { saveAll(getAll().filter(p => p.id !== id)); }
function upsert(p) {
  const list = getAll(), i = list.findIndex(x => x.id === p.id);
  if (i >= 0) list[i] = p; else list.unshift(p);
  saveAll(list);
}

function getAllServicos() {
  try { return JSON.parse(localStorage.getItem(SERV_KEY)) || []; } catch { return []; }
}
function saveServicos(list) { localStorage.setItem(SERV_KEY, JSON.stringify(list)); }
function getServico(id) { return getAllServicos().find(s => s.id === id) || null; }
function deleteServico(id) { saveServicos(getAllServicos().filter(s => s.id !== id)); }
function upsertServico(s) {
  const list = getAllServicos(), i = list.findIndex(x => x.id === s.id);
  if (i >= 0) list[i] = s; else list.unshift(s);
  saveServicos(list);
}

function genId() { return 'p' + Date.now() + Math.random().toString(36).slice(2, 6); }
function today() { return new Date().toISOString().slice(0, 10); }
function fmtDate(d) {
  if (!d) return '—';
  const p = d.split('-');
  return p.length === 3 ? `${p[2]}/${p[1]}/${p[0]}` : d;
}
function fmtMoney(n) {
  return Number(n || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}
function esc(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;').replace(/'/g,'&#x27;');
}

const STATUS = {
  rascunho: { label: 'Rascunho', cls: 'status--draft' },
  enviada:  { label: 'Enviada',  cls: 'status--sent'  },
  aprovada: { label: 'Aprovada', cls: 'status--ok'    },
  recusada: { label: 'Recusada', cls: 'status--no'    },
};

function calcSubtotal(itens) {
  return (itens||[]).reduce((s,it) => s+(Number(it.qtd)||0)*(Number(it.unit)||0), 0);
}
function calcTotal(v) {
  return calcSubtotal((v||{}).itens) - (Number((v||{}).desconto)||0);
}

let _form = {}, _step = 1, _serv = {};
const STEPS = 3;
const STEP_TITLES = ['Dados do Cliente','Escopo do Serviço','Valores & Condições'];
function go(hash) { location.hash = hash; }

// =================================================================
//  ROUTER
// =================================================================
function route() {
  const h = location.hash || '#';
  const app = document.getElementById('app');
  if (!h || h === '#' || h === '#dashboard') renderDashboard(app);
  else if (h === '#servicos')                renderCatalogo(app);
  else if (h === '#servicos/novo')           renderServicoForm(app, null);
  else if (h.startsWith('#servicos/editar/')) renderServicoForm(app, h.slice(17));
  else if (h === '#nova')                    renderForm(app, null);
  else if (h.startsWith('#editar/'))         renderForm(app, h.slice(8));
  else if (h.startsWith('#ver/'))            renderView(app, h.slice(5));
  else renderDashboard(app);
}
window.addEventListener('hashchange', route);
window.addEventListener('DOMContentLoaded', route);

// =================================================================
//  SIDEBAR
// =================================================================
function sidebarHTML() {
  const h = location.hash || '#';
  const isDash = !h || h === '#' || h === '#dashboard';
  const isNova = h === '#nova';
  const isServ = h.startsWith('#servicos');
  return `
    <aside class="sidebar">
      <div class="sidebar__logo">
        <img src="logo.png" alt="LK" class="sidebar__logo-img"
             onerror="this.style.display='none';this.nextElementSibling.style.display='block'" />
        <svg style="display:none" viewBox="0 0 54 56" fill="none" width="34" height="34">
          <line x1="8" y1="7" x2="8" y2="40" stroke="#E8175D" stroke-width="8" stroke-linecap="round"/>
          <line x1="23" y1="7" x2="23" y2="40" stroke="#E8175D" stroke-width="8" stroke-linecap="round"/>
          <line x1="23" y1="22" x2="46" y2="7" stroke="#E8175D" stroke-width="8" stroke-linecap="round"/>
          <line x1="23" y1="22" x2="39" y2="34" stroke="#E8175D" stroke-width="8" stroke-linecap="round"/>
          <circle cx="45" cy="46" r="6" fill="#E8175D"/>
        </svg>
        <div class="sidebar__logo-text"><strong>LK</strong><span>Propostas</span></div>
      </div>
      <nav class="sidebar__nav">
        <a href="#dashboard" class="sidebar__link ${isDash?'active':''}">
          <span class="sidebar__link-icon">📋</span> Propostas
        </a>
        <a href="#nova" class="sidebar__link ${isNova?'active':''}">
          <span class="sidebar__link-icon">✏️</span> Nova Proposta
        </a>
        <a href="#servicos" class="sidebar__link ${isServ?'active':''}">
          <span class="sidebar__link-icon">🛠️</span> Meus Serviços
        </a>
      </nav>
      <div class="sidebar__footer">
        <a href="../index.html" class="sidebar__link">
          <span class="sidebar__link-icon">←</span> Site LK
        </a>
      </div>
    </aside>`;
}

// =================================================================
//  DASHBOARD
// =================================================================
function renderDashboard(app) {
  const list = getAll();
  app.innerHTML = `
    <div class="layout">
      ${sidebarHTML()}
      <main class="main">
        <header class="topbar">
          <div>
            <h1 class="page-title">Propostas Comerciais</h1>
            <p class="page-sub">${list.length} proposta${list.length!==1?'s':''}</p>
          </div>
          <a href="#nova" class="btn btn--primary">+ Nova Proposta</a>
        </header>
        ${list.length===0 ? emptyStateHTML() : gridHTML(list)}
      </main>
    </div>`;
}
function emptyStateHTML() {
  return `<div class="empty">
    <div class="empty__icon">📋</div>
    <h3>Nenhuma proposta ainda</h3>
    <p>Crie sua primeira proposta comercial e envie para seus clientes.</p>
    <a href="#nova" class="btn btn--primary">Criar primeira proposta</a>
  </div>`;
}
function gridHTML(list) {
  return `<div class="card-grid">${list.map(cardHTML).join('')}</div>`;
}
function cardHTML(p) {
  const st = STATUS[p.status]||STATUS.rascunho;
  const total = calcTotal(p.valores);
  const empresa = (p.cliente&&(p.cliente.empresa||p.cliente.responsavel))||'—';
  const titulo = (p.servico&&p.servico.titulo)||'Sem título';
  return `
    <div class="prop-card">
      <div class="prop-card__top">
        <span class="status-badge ${st.cls}">${st.label}</span>
        <span class="prop-card__date">${fmtDate(p.criadaEm)}</span>
      </div>
      <h3 class="prop-card__title">${esc(titulo)}</h3>
      <p class="prop-card__client"><span>👤</span> ${esc(empresa)}</p>
      <p class="prop-card__total">${fmtMoney(total)}<span>/mês</span></p>
      <div class="prop-card__actions">
        <a href="#ver/${esc(p.id)}" class="btn btn--sm btn--outline">Ver</a>
        <a href="#editar/${esc(p.id)}" class="btn btn--sm btn--outline">Editar</a>
        <button class="btn btn--sm btn--danger" onclick="doDelete('${esc(p.id)}')">Excluir</button>
      </div>
    </div>`;
}
window.doDelete = function(id) {
  if (!confirm('Excluir esta proposta?')) return;
  deleteById(id);
  renderDashboard(document.getElementById('app'));
};

// =================================================================
//  CATÁLOGO DE SERVIÇOS
// =================================================================
function renderCatalogo(app) {
  const list = getAllServicos();
  app.innerHTML = `
    <div class="layout">
      ${sidebarHTML()}
      <main class="main">
        <header class="topbar">
          <div>
            <h1 class="page-title">Meus Serviços</h1>
            <p class="page-sub">Catálogo de serviços e valores padrão</p>
          </div>
          <a href="#servicos/novo" class="btn btn--primary">+ Novo Serviço</a>
        </header>
        ${list.length===0 ? emptyCatalogoHTML() : catalogoGridHTML(list)}
      </main>
    </div>`;
}
function emptyCatalogoHTML() {
  return `<div class="empty">
    <div class="empty__icon">🛠️</div>
    <h3>Nenhum serviço cadastrado</h3>
    <p>Cadastre seus serviços e valores padrão para selecioná-los rapidamente nas propostas.</p>
    <a href="#servicos/novo" class="btn btn--primary">Cadastrar primeiro serviço</a>
  </div>`;
}
function catalogoGridHTML(list) {
  return `<div class="card-grid">${list.map(s=>`
    <div class="prop-card">
      <div class="prop-card__top">
        <span class="status-badge status--sent">${esc(s.categoria||'Serviço')}</span>
      </div>
      <h3 class="prop-card__title">${esc(s.nome)}</h3>
      ${s.descricao?`<p class="prop-card__client">${esc(s.descricao)}</p>`:''}
      <p class="prop-card__total">${fmtMoney(s.valor)}<span>/unid</span></p>
      <div class="prop-card__actions">
        <a href="#servicos/editar/${esc(s.id)}" class="btn btn--sm btn--outline">Editar</a>
        <button class="btn btn--sm btn--danger" onclick="doDeleteServico('${esc(s.id)}')">Excluir</button>
      </div>
    </div>`).join('')}</div>`;
}
window.doDeleteServico = function(id) {
  if (!confirm('Excluir este serviço do catálogo?')) return;
  deleteServico(id);
  renderCatalogo(document.getElementById('app'));
};

function renderServicoForm(app, id) {
  const existing = id ? getServico(id) : null;
  _serv = existing ? JSON.parse(JSON.stringify(existing)) : { id: genId() };
  app.innerHTML = `
    <div class="layout">
      ${sidebarHTML()}
      <main class="main">
        <header class="topbar">
          <div>
            <a href="#servicos" class="back-link">← Voltar para Meus Serviços</a>
            <h1 class="page-title">${existing?'Editar Serviço':'Novo Serviço'}</h1>
          </div>
        </header>
        <div class="form-shell">
          <div class="form-card">
            <h2 class="form-section-title">Dados do Serviço</h2>
            <div class="form-grid">
              <div class="form-group form-group--full">
                <label>Nome do serviço <span class="required">*</span></label>
                <input id="s-nome" type="text" value="${esc(_serv.nome||'')}" placeholder="Ex: Gestão de Social Media, Reels, Identidade Visual..." />
              </div>
              <div class="form-group">
                <label>Categoria</label>
                <input id="s-categoria" type="text" value="${esc(_serv.categoria||'')}" placeholder="Ex: Social Media, Design, Vídeo..." />
              </div>
              <div class="form-group">
                <label>Valor padrão (R$) <span class="required">*</span></label>
                <input id="s-valor" type="number" min="0" step="0.01" value="${_serv.valor||''}" placeholder="0,00" />
              </div>
              <div class="form-group form-group--full">
                <label>Descrição <span class="label-hint">(aparece na proposta)</span></label>
                <textarea id="s-descricao" rows="3" placeholder="Descreva brevemente o que inclui este serviço...">${esc(_serv.descricao||'')}</textarea>
              </div>
            </div>
            <div class="form-nav">
              <a href="#servicos" class="btn btn--outline">Cancelar</a>
              <button class="btn btn--primary" onclick="saveServico()">💾 Salvar Serviço</button>
            </div>
          </div>
        </div>
      </main>
    </div>`;
}
window.saveServico = function() {
  const nome  = document.getElementById('s-nome')?.value?.trim();
  const valor = parseFloat(document.getElementById('s-valor')?.value);
  if (!nome)           { alert('Informe o nome do serviço.'); return; }
  if (!valor||valor<=0){ alert('Informe um valor válido.'); return; }
  _serv.nome      = nome;
  _serv.valor     = valor;
  _serv.categoria = document.getElementById('s-categoria')?.value?.trim()||'';
  _serv.descricao = document.getElementById('s-descricao')?.value?.trim()||'';
  upsertServico(_serv);
  go('#servicos');
};

// =================================================================
//  FORM (multi-step)
// =================================================================
function renderForm(app, id) {
  const existing = id ? getById(id) : null;
  _form = existing ? JSON.parse(JSON.stringify(existing)) : {
    id: genId(), criadaEm: today(), status: 'rascunho',
    cliente: {},
    servico: { entregas: [''] },
    valores: { itens: [], desconto: 0 },
  };
  _step = 1;
  renderStep(app);
}
function renderStep(app) {
  const isEdit = !!getById(_form.id);
  app.innerHTML = `
    <div class="layout">
      ${sidebarHTML()}
      <main class="main">
        <header class="topbar">
          <div>
            <a href="#dashboard" class="back-link">← Voltar para propostas</a>
            <h1 class="page-title">${isEdit?'Editar Proposta':'Nova Proposta'}</h1>
          </div>
        </header>
        <div class="form-shell">
          <div class="stepper">
            ${[1,2,3].map(i=>`
              <div class="stepper__item ${i===_step?'active':''} ${i<_step?'done':''}">
                <div class="stepper__dot">${i<_step?'✓':i}</div>
                <span class="stepper__label">${STEP_TITLES[i-1]}</span>
              </div>
              ${i<3?'<div class="stepper__line"></div>':''}`).join('')}
          </div>
          <div class="form-card">
            ${_step===1?step1HTML():_step===2?step2HTML():step3HTML()}
            <div class="form-nav">
              ${_step>1?`<button class="btn btn--outline" onclick="prevStep()">← Anterior</button>`:'<span></span>'}
              ${_step<STEPS
                ?`<button class="btn btn--primary" onclick="nextStep()">Próximo →</button>`
                :`<button class="btn btn--primary" onclick="saveForm()">💾 Salvar Proposta</button>`}
            </div>
          </div>
        </div>
      </main>
    </div>`;
  if (_step === 3) bindStep3Events();
}

// ── Step 1
function step1HTML() {
  const c = _form.cliente||{};
  return `
    <h2 class="form-section-title">Dados do Cliente</h2>
    <div class="form-grid">
      <div class="form-group form-group--full">
        <label>Empresa / Nome do cliente <span class="required">*</span></label>
        <input id="f-empresa" type="text" value="${esc(c.empresa||'')}" placeholder="Ex: Silva & Cia Ltda" />
      </div>
      <div class="form-group">
        <label>Responsável / Contato <span class="required">*</span></label>
        <input id="f-responsavel" type="text" value="${esc(c.responsavel||'')}" placeholder="Nome do responsável" />
      </div>
      <div class="form-group">
        <label>E-mail</label>
        <input id="f-email" type="email" value="${esc(c.email||'')}" placeholder="email@empresa.com" />
      </div>
      <div class="form-group">
        <label>Telefone / WhatsApp</label>
        <input id="f-telefone" type="tel" value="${esc(c.telefone||'')}" placeholder="(47) 99999-9999" />
      </div>
      <div class="form-group">
        <label>Cidade / Estado</label>
        <input id="f-cidade" type="text" value="${esc(c.cidade||'')}" placeholder="Blumenau, SC" />
      </div>
    </div>`;
}

// ── Step 2
function step2HTML() {
  const s = _form.servico||{};
  const entregas = (s.entregas&&s.entregas.length>0)?s.entregas:[''];
  return `
    <h2 class="form-section-title">Escopo do Serviço</h2>
    <div class="form-grid">
      <div class="form-group form-group--full">
        <label>Título da proposta <span class="required">*</span></label>
        <input id="f-titulo" type="text" value="${esc(s.titulo||'')}" placeholder="Ex: Social Media, Identidade Visual, Site..." />
      </div>
      <div class="form-group form-group--full">
        <label>Descrição do serviço</label>
        <textarea id="f-descricao" rows="4" placeholder="Descreva o que será entregue, objetivos, como funciona...">${esc(s.descricao||'')}</textarea>
      </div>
      <div class="form-group form-group--full">
        <label>Entregas incluídas <span class="label-hint">(o que o cliente vai receber)</span></label>
        <div id="entregas-list">
          ${entregas.map((e,i)=>entregaRowHTML(e,i)).join('')}
        </div>
        <button type="button" class="btn btn--sm btn--outline add-btn" onclick="addEntrega()">+ Adicionar entrega</button>
      </div>
    </div>`;
}
function entregaRowHTML(val,i) {
  return `<div class="entrega-row" data-idx="${i}">
    <input type="text" class="entrega-input" value="${esc(val)}" placeholder="Ex: 12 posts por mês, Relatório mensal..." />
    <button type="button" class="rm-btn" onclick="removeEntrega(${i})">×</button>
  </div>`;
}

// ── Step 3 — Service selector
function step3HTML() {
  const v = _form.valores||{};
  const itens = v.itens||[];
  const catalogo = getAllServicos();
  const subtotal = calcSubtotal(itens);
  const desconto = Number(v.desconto)||0;
  const total = subtotal - desconto;

  return `
    <h2 class="form-section-title">Valores & Condições</h2>

    <!-- Seletor de serviço -->
    <div class="form-group form-group--full" style="margin-bottom:1.5rem">
      <label>Selecionar serviço</label>
      ${catalogo.length>0?`
      <div class="service-selector">
        <select id="sel-servico" class="service-selector__select" onchange="onServSelect()">
          <option value="">— Escolha um serviço —</option>
          ${catalogo.map(s=>`<option value="${esc(s.id)}" data-val="${s.valor}">${esc(s.nome)} — ${fmtMoney(s.valor)}</option>`).join('')}
          <option value="__custom">✏️ Item personalizado...</option>
        </select>
        <input type="number" id="sel-qtd" value="1" min="1" class="service-selector__qtd" placeholder="Qtd" />
        <button type="button" class="btn btn--primary" onclick="addServiceFromSelect()">+ Adicionar</button>
      </div>
      <div id="custom-row" class="custom-item-row" style="display:none">
        <input type="text"   id="custom-desc"  placeholder="Nome do serviço personalizado" />
        <input type="number" id="custom-valor" placeholder="Valor R$" min="0" step="0.01" />
      </div>`
      :`<div class="catalog-empty-hint">💡 Nenhum serviço cadastrado. <a href="#servicos">Cadastre em Meus Serviços</a> para selecionar aqui.</div>`}
    </div>

    <!-- Itens adicionados -->
    <div class="form-group form-group--full" style="margin-bottom:1.25rem">
      <label>Serviços desta proposta</label>
      <div id="selected-items-list">
        ${itens.length>0
          ? itens.map((it,i)=>selectedItemHTML(it,i)).join('')
          : `<div class="items-empty">Nenhum serviço adicionado ainda.</div>`
        }
      </div>
    </div>

    <!-- Condições -->
    <div class="form-grid">
      <div class="form-group">
        <label>Desconto (R$)</label>
        <input id="f-desconto" type="number" min="0" step="0.01" value="${v.desconto||0}" placeholder="0,00" />
      </div>
      <div class="form-group">
        <label>Prazo de execução</label>
        <input id="f-prazo" type="text" value="${esc(v.prazo||'')}" placeholder="Ex: 8 meses" />
      </div>
      <div class="form-group">
        <label>Forma de pagamento</label>
        <input id="f-pagamento" type="text" value="${esc(v.pagamento||'')}" placeholder="Ex: Boleto mensal, PIX" />
      </div>
      <div class="form-group">
        <label>Duração do contrato</label>
        <input id="f-contrato" type="text" value="${esc(v.contrato||'')}" placeholder="Ex: 8 meses com renovação" />
      </div>
      <div class="form-group">
        <label>Validade da proposta</label>
        <input id="f-validade" type="date" value="${v.validade||''}" />
      </div>
      <div class="form-group">
        <label>Status</label>
        <select id="f-status">
          ${Object.entries(STATUS).map(([k,s])=>`<option value="${k}" ${_form.status===k?'selected':''}>${s.label}</option>`).join('')}
        </select>
      </div>
      <div class="form-group form-group--full">
        <label>Termos e condições</label>
        <textarea id="f-termos" rows="4" placeholder="Termos, observações ou condições específicas desta proposta...">${esc(v.termos||'')}</textarea>
      </div>
    </div>

    <div class="total-preview">
      <div class="total-preview__row"><span>Subtotal</span><strong id="prev-subtotal">${fmtMoney(subtotal)}</strong></div>
      ${desconto>0?`<div class="total-preview__row total-preview__row--discount"><span>Desconto</span><strong>– ${fmtMoney(desconto)}</strong></div>`:''}
      <div class="total-preview__row total-preview__row--total"><span>Total</span><strong id="prev-total">${fmtMoney(total)}</strong></div>
    </div>`;
}

function selectedItemHTML(it, i) {
  const sub = (Number(it.qtd)||0)*(Number(it.unit)||0);
  return `
    <div class="selected-item" data-idx="${i}">
      <div class="selected-item__info">
        <span class="selected-item__name">${esc(it.desc||'—')}</span>
        <span class="selected-item__unit">${fmtMoney(it.unit)} / unid</span>
      </div>
      <div class="selected-item__controls">
        <button type="button" class="qty-btn" onclick="changeQty(${i},-1)">−</button>
        <span class="qty-val">${it.qtd||1}</span>
        <button type="button" class="qty-btn" onclick="changeQty(${i},1)">+</button>
      </div>
      <span class="selected-item__total">${fmtMoney(sub)}</span>
      <button type="button" class="rm-btn" onclick="removeSelectedItem(${i})">×</button>
    </div>`;
}

function bindStep3Events() {
  document.getElementById('f-desconto')?.addEventListener('input', refreshTotals);
}

window.onServSelect = function() {
  const sel = document.getElementById('sel-servico');
  const customRow = document.getElementById('custom-row');
  if (!customRow) return;
  customRow.style.display = sel.value === '__custom' ? 'grid' : 'none';
};

window.addServiceFromSelect = function() {
  collectStep3();
  const sel   = document.getElementById('sel-servico');
  const qtd   = Math.max(1, parseInt(document.getElementById('sel-qtd')?.value)||1);
  if (!sel.value) { alert('Selecione um serviço.'); return; }

  if (sel.value === '__custom') {
    const desc  = document.getElementById('custom-desc')?.value?.trim();
    const valor = parseFloat(document.getElementById('custom-valor')?.value)||0;
    if (!desc)  { alert('Informe o nome do serviço personalizado.'); return; }
    if (!valor) { alert('Informe o valor do serviço personalizado.'); return; }
    _form.valores.itens.push({ desc, qtd, unit: valor });
  } else {
    const s = getServico(sel.value);
    if (!s) return;
    _form.valores.itens.push({ desc: s.nome, qtd, unit: s.valor });
  }
  renderStep(document.getElementById('app'));
};

window.changeQty = function(i, delta) {
  collectStep3();
  const it = _form.valores.itens[i];
  if (!it) return;
  it.qtd = Math.max(1, (Number(it.qtd)||1) + delta);
  renderStep(document.getElementById('app'));
};

window.removeSelectedItem = function(i) {
  collectStep3();
  _form.valores.itens.splice(i, 1);
  renderStep(document.getElementById('app'));
};

function refreshTotals() {
  const itens = _form.valores?.itens || [];
  const sub = calcSubtotal(itens);
  const d = parseFloat(document.getElementById('f-desconto')?.value)||0;
  const e1 = document.getElementById('prev-subtotal');
  const e2 = document.getElementById('prev-total');
  if (e1) e1.textContent = fmtMoney(sub);
  if (e2) e2.textContent = fmtMoney(sub-d);
}

// ── Collect
function collectStep1(v) {
  const empresa = document.getElementById('f-empresa')?.value?.trim();
  const resp    = document.getElementById('f-responsavel')?.value?.trim();
  if (v&&!empresa){ alert('Informe o nome da empresa ou cliente.'); return false; }
  if (v&&!resp)   { alert('Informe o nome do responsável.'); return false; }
  _form.cliente = {
    empresa: empresa||'', responsavel: resp||'',
    email:    document.getElementById('f-email')?.value?.trim()||'',
    telefone: document.getElementById('f-telefone')?.value?.trim()||'',
    cidade:   document.getElementById('f-cidade')?.value?.trim()||'',
  };
  return true;
}
function collectStep2(v) {
  const titulo = document.getElementById('f-titulo')?.value?.trim();
  if (v&&!titulo){ alert('Informe o título da proposta.'); return false; }
  const entregas = [...document.querySelectorAll('.entrega-input')].map(el=>el.value.trim()).filter(Boolean);
  _form.servico = { titulo:titulo||'', descricao:document.getElementById('f-descricao')?.value?.trim()||'', entregas };
  return true;
}
function collectStep3() {
  if (!_form.valores) _form.valores = { itens: [] };
  _form.valores.desconto  = parseFloat(document.getElementById('f-desconto')?.value)||0;
  _form.valores.prazo     = document.getElementById('f-prazo')?.value?.trim()||'';
  _form.valores.pagamento = document.getElementById('f-pagamento')?.value?.trim()||'';
  _form.valores.contrato  = document.getElementById('f-contrato')?.value?.trim()||'';
  _form.valores.validade  = document.getElementById('f-validade')?.value||'';
  _form.valores.termos    = document.getElementById('f-termos')?.value?.trim()||'';
  _form.status = document.getElementById('f-status')?.value||'rascunho';
}

window.nextStep = function() {
  const ok = _step===1?collectStep1(true):_step===2?collectStep2(true):true;
  if (!ok) return;
  if (_step===3) collectStep3();
  _step++; renderStep(document.getElementById('app')); window.scrollTo(0,0);
};
window.prevStep = function() {
  if (_step===1) collectStep1(false);
  else if (_step===2) collectStep2(false);
  else collectStep3();
  _step--; renderStep(document.getElementById('app')); window.scrollTo(0,0);
};
window.saveForm = function() { collectStep3(); upsert(_form); go('#ver/'+_form.id); };

window.addEntrega    = function() { collectStep2(false); (_form.servico.entregas=_form.servico.entregas||[]).push(''); renderStep(document.getElementById('app')); };
window.removeEntrega = function(i) { collectStep2(false); const l=_form.servico.entregas||[]; if(l.length>1)l.splice(i,1); else _form.servico.entregas=['']; renderStep(document.getElementById('app')); };

// =================================================================
//  PROPOSAL VIEW
// =================================================================
function renderView(app, id) {
  const p = getById(id); if (!p){ go('#dashboard'); return; }
  app.innerHTML = `
    <div class="layout">
      ${sidebarHTML()}
      <main class="main">
        <header class="topbar no-print">
          <div><a href="#dashboard" class="back-link">← Voltar para propostas</a></div>
          <div class="topbar__actions">
            <a href="#editar/${esc(p.id)}" class="btn btn--outline">✏️ Editar</a>
            <button class="btn btn--primary" onclick="window.print()">🖨️ Imprimir / PDF</button>
          </div>
        </header>
        ${proposalDocHTML(p)}
      </main>
    </div>`;
}

function proposalDocHTML(p) {
  const c=p.cliente||{}, s=p.servico||{}, v=p.valores||{};
  const itens=v.itens||[], subtotal=calcSubtotal(itens);
  const desconto=Number(v.desconto)||0, total=subtotal-desconto;
  return `
    <div class="proposta-doc">
      <div class="doc-capa">
        <div class="doc-capa__brand">
          <img src="logo.png" alt="LK Comunicação Digital" class="doc-logo-img"
               onerror="this.style.display='none';this.nextElementSibling.style.display='block'" />
          <div class="doc-logo-fallback" style="display:none">
            <div class="doc-brand-name">LK</div>
            <div class="doc-brand-sub">Comunicação Digital</div>
          </div>
        </div>
        <div class="doc-capa__right">
          <p class="doc-label">Proposta de serviço</p>
          <h1 class="doc-title">${esc(s.titulo||'Proposta Comercial')}</h1>
          <p class="doc-for">Preparada para <strong>${esc(c.empresa||c.responsavel||'Cliente')}</strong></p>
          <div class="doc-meta">
            ${c.responsavel?`<span>👤 ${esc(c.responsavel)}</span>`:''}
            ${c.email?`<span>✉️ ${esc(c.email)}</span>`:''}
            ${c.telefone?`<span>📱 ${esc(c.telefone)}</span>`:''}
            ${c.cidade?`<span>📍 ${esc(c.cidade)}</span>`:''}
          </div>
          <p class="doc-date">Data: ${fmtDate(p.criadaEm)}${v.validade?` · Válida até: ${fmtDate(v.validade)}`:''}</p>
        </div>
      </div>

      ${(s.descricao||(s.entregas&&s.entregas.length>0))?`
      <div class="doc-section">
        <h2 class="doc-section-title">📋 Escopo do Serviço</h2>
        ${s.descricao?`<p class="doc-text">${esc(s.descricao)}</p>`:''}
        ${s.entregas&&s.entregas.length>0?`
          <h3 class="doc-sub-title">O que está incluso:</h3>
          <ul class="doc-list">${s.entregas.map(e=>`<li>${esc(e)}</li>`).join('')}</ul>`:''}
      </div>`:''}

      <div class="doc-section">
        <h2 class="doc-section-title">💰 Investimento</h2>
        <table class="doc-table">
          <thead><tr>
            <th>Serviço / Item</th><th class="text-center">Qtd</th>
            <th class="text-right">Valor Unit.</th><th class="text-right">Subtotal</th>
          </tr></thead>
          <tbody>${itens.map(it=>`
            <tr>
              <td>${esc(it.desc||'—')}</td>
              <td class="text-center">${it.qtd||1}</td>
              <td class="text-right">${fmtMoney(it.unit)}</td>
              <td class="text-right">${fmtMoney((Number(it.qtd)||0)*(Number(it.unit)||0))}</td>
            </tr>`).join('')}</tbody>
          <tfoot>
            ${desconto>0?`
              <tr class="tfoot-sub"><td colspan="3">Subtotal</td><td class="text-right">${fmtMoney(subtotal)}</td></tr>
              <tr class="tfoot-disc"><td colspan="3">Desconto</td><td class="text-right">– ${fmtMoney(desconto)}</td></tr>`:''}
            <tr class="tfoot-total"><td colspan="3"><strong>Total</strong></td><td class="text-right"><strong>${fmtMoney(total)}</strong></td></tr>
          </tfoot>
        </table>
      </div>

      ${(v.prazo||v.pagamento||v.contrato||v.validade)?`
      <div class="doc-section">
        <h2 class="doc-section-title">📄 Condições Comerciais</h2>
        <div class="doc-conditions">
          ${v.prazo?`<div class="doc-condition"><strong>Prazo</strong><span>${esc(v.prazo)}</span></div>`:''}
          ${v.pagamento?`<div class="doc-condition"><strong>Pagamento</strong><span>${esc(v.pagamento)}</span></div>`:''}
          ${v.contrato?`<div class="doc-condition"><strong>Contrato</strong><span>${esc(v.contrato)}</span></div>`:''}
          ${v.validade?`<div class="doc-condition"><strong>Validade</strong><span>${fmtDate(v.validade)}</span></div>`:''}
        </div>
      </div>`:''}

      ${v.termos?`
      <div class="doc-section">
        <h2 class="doc-section-title">📜 Termos e Condições</h2>
        <p class="doc-text doc-text--muted">${esc(v.termos).replace(/\n/g,'<br/>')}</p>
      </div>`:''}

      <div class="doc-footer">
        <div class="doc-footer__left">
          <p class="doc-footer__brand">LK Comunicação Digital</p>
          <p>larakreuschdesign@gmail.com</p>
          <p>lkcomunicacaodigital.com</p>
        </div>
        <div class="doc-footer__right">
          <p>Aceite desta proposta:</p>
          <div class="doc-sign-line"></div>
          <p class="doc-sign-label">${esc(c.responsavel||'Responsável')}</p>
          <div class="doc-sign-line" style="margin-top:1.5rem"></div>
          <p class="doc-sign-label">Data</p>
        </div>
      </div>
    </div>`;
}
