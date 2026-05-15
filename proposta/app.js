// =================================================================
//  LK Comunicação Digital · Sistema de Propostas Comerciais
// =================================================================

const DB_KEY = 'lk_propostas_v1';

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
  rascunho:    { label: 'Rascunho',    cls: 'status--draft'   },
  enviada:     { label: 'Enviada',     cls: 'status--sent'    },
  sem_retorno: { label: 'Sem Retorno', cls: 'status--pending' },
  aprovada:    { label: 'Aprovada',    cls: 'status--ok'      },
  reprovada:   { label: 'Reprovada',   cls: 'status--no'      },
};

const KANBAN_COLS = ['enviada','sem_retorno','aprovada','reprovada'];

function calcSubtotal(itens) {
  return (itens||[]).reduce((s,it) => s + (Number(it.qtd)||0) * (Number(it.unit)||0), 0);
}
function calcTotal(v) {
  return calcSubtotal((v||{}).itens) - (Number((v||{}).desconto)||0);
}

let _form = {}, _step = 1;
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
  else if (h === '#nova')            renderForm(app, null);
  else if (h.startsWith('#editar/')) renderForm(app, h.slice(8));
  else if (h.startsWith('#ver/'))    renderView(app, h.slice(5));
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
  const isNova = h === '#nova' || h.startsWith('#editar/') || h.startsWith('#ver/');
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
        <a href="#nova" class="sidebar__link ${h==='#nova'?'active':''}">
          <span class="sidebar__link-icon">✏️</span> Nova Proposta
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
//  DASHBOARD – KANBAN
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
        ${list.length===0 ? emptyStateHTML() : kanbanHTML(list)}
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

function kanbanHTML(list) {
  const drafts = list.filter(p => !KANBAN_COLS.includes(p.status));
  return `
    ${drafts.length > 0 ? `
      <div class="kanban-drafts">
        <p class="kanban-drafts__label">Rascunhos (${drafts.length})</p>
        <div class="kanban-drafts__row">${drafts.map(p => kanbanCardHTML(p, false)).join('')}</div>
      </div>` : ''}
    <div class="kanban-board">
      ${KANBAN_COLS.map(s => kanbanColHTML(s, list.filter(p => p.status === s))).join('')}
    </div>`;
}

function kanbanColHTML(status, cards) {
  const st = STATUS[status];
  const slug = status.replace('_','-');
  return `
    <div class="kanban-col kanban-col--${slug}" data-status="${status}"
         ondragover="event.preventDefault();this.classList.add('kanban-col--over')"
         ondragleave="this.classList.remove('kanban-col--over')"
         ondrop="onKanbanDrop(event,'${status}')">
      <div class="kanban-col__header">
        <span class="kanban-col__title">${st.label}</span>
        <span class="kanban-col__badge">${cards.length}</span>
      </div>
      <div class="kanban-col__body">
        ${cards.length===0
          ? '<div class="kanban-empty">Arraste uma proposta aqui</div>'
          : cards.map(p => kanbanCardHTML(p, true)).join('')}
      </div>
    </div>`;
}

function kanbanCardHTML(p, draggable) {
  const total   = calcTotal(p.valores);
  const empresa = (p.cliente && (p.cliente.empresa || p.cliente.responsavel)) || '—';
  const titulo  = (p.servico && p.servico.titulo) || 'Sem título';
  const st      = STATUS[p.status] || STATUS.rascunho;
  return `
    <div class="kanban-card"
         ${draggable ? `draggable="true" ondragstart="onKanbanDragStart(event,'${esc(p.id)}')" ondragend="this.style.opacity='1'"` : ''}>
      <div class="kanban-card__top">
        <span class="kanban-card__date">${fmtDate(p.criadaEm)}</span>
        ${!draggable ? `<span class="status-badge ${st.cls}">${st.label}</span>` : ''}
      </div>
      <h3 class="kanban-card__title">${esc(titulo)}</h3>
      <p class="kanban-card__client">👤 ${esc(empresa)}</p>
      <strong class="kanban-card__total">${fmtMoney(total)}</strong>
      <div class="kanban-card__actions">
        <a href="#ver/${esc(p.id)}"    class="btn btn--sm btn--outline">Ver</a>
        <a href="#editar/${esc(p.id)}" class="btn btn--sm btn--outline">Editar</a>
        <button class="btn btn--sm btn--danger" onclick="doDelete('${esc(p.id)}')">×</button>
      </div>
    </div>`;
}

window.onKanbanDragStart = function(e, id) {
  e.dataTransfer.setData('proposta_id', id);
  e.dataTransfer.effectAllowed = 'move';
  setTimeout(() => { if (e.target) e.target.style.opacity = '.35'; }, 0);
};

window.onKanbanDrop = function(e, newStatus) {
  e.preventDefault();
  e.currentTarget.classList.remove('kanban-col--over');
  const id = e.dataTransfer.getData('proposta_id');
  if (!id) return;
  const p = getById(id);
  if (!p) return;
  p.status = newStatus;
  upsert(p);
  renderDashboard(document.getElementById('app'));
};

window.doDelete = function(id) {
  if (!confirm('Excluir esta proposta?')) return;
  deleteById(id);
  renderDashboard(document.getElementById('app'));
};

// =================================================================
//  FORM
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
  if (_step===3) {
    document.getElementById('f-desconto')?.addEventListener('input', refreshTotals);
  }
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
  const entregas = (s.entregas&&s.entregas.length>0) ? s.entregas : [''];
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

function entregaRowHTML(val, i) {
  return `<div class="entrega-row" data-idx="${i}">
    <input type="text" class="entrega-input" value="${esc(val)}" placeholder="Ex: 12 posts por mês, Relatório mensal..." />
    <button type="button" class="rm-btn" onclick="removeEntrega(${i})">×</button>
  </div>`;
}

// ── Step 3
function step3HTML() {
  const v = _form.valores||{};
  const itens = v.itens||[];
  const subtotal = calcSubtotal(itens);
  const desconto = Number(v.desconto)||0;
  const total = subtotal - desconto;

  return `
    <h2 class="form-section-title">Valores & Condições</h2>

    <div class="form-group form-group--full" style="margin-bottom:1.5rem">
      <label>Serviços & Itens</label>
      <div class="items-table">
        <div class="items-table__header">
          <span>Serviço / Item</span>
          <span class="text-center">Qtd</span>
          <span class="text-right">Valor unit.</span>
          <span class="text-right">Subtotal</span>
          <span></span>
        </div>
        <div id="items-list">
          ${itens.length>0
            ? itens.map((it,i)=>itemRowHTML(it,i)).join('')
            : '<div class="items-empty" style="border:none;border-radius:0;background:transparent">Nenhum item. Clique em + Adicionar para começar.</div>'}
        </div>
      </div>
      <button type="button" class="btn btn--sm btn--outline add-btn" onclick="addItem()">+ Adicionar item</button>
    </div>

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

function itemRowHTML(it, i) {
  const sub = (Number(it.qtd)||0) * (Number(it.unit)||0);
  return `
    <div class="item-row" data-idx="${i}">
      <input type="text" class="item-desc" value="${esc(it.desc||'')}" placeholder="Descrição do serviço ou item"
             oninput="updateItem(${i},'desc',this.value)" />
      <input type="number" class="item-qtd" value="${Number(it.qtd)||1}" min="1"
             oninput="updateItem(${i},'qtd',this.value)" />
      <input type="number" class="item-unit" value="${Number(it.unit)||''}" min="0" step="0.01"
             placeholder="0,00" oninput="updateItem(${i},'unit',this.value)" />
      <span class="item-sub" data-idx="${i}">${fmtMoney(sub)}</span>
      <button type="button" class="rm-btn" onclick="removeItem(${i})">×</button>
    </div>`;
}

window.addItem = function() {
  collectStep3();
  (_form.valores.itens = _form.valores.itens||[]).push({desc:'', qtd:1, unit:0});
  renderStep(document.getElementById('app'));
};

window.removeItem = function(i) {
  collectStep3();
  _form.valores.itens.splice(i, 1);
  renderStep(document.getElementById('app'));
};

window.updateItem = function(i, field, val) {
  if (!_form.valores?.itens?.[i]) return;
  _form.valores.itens[i][field] = field==='desc' ? val : (Number(val)||0);
  const it = _form.valores.itens[i];
  const sub = (Number(it.qtd)||0) * (Number(it.unit)||0);
  const el = document.querySelector(`.item-sub[data-idx="${i}"]`);
  if (el) el.textContent = fmtMoney(sub);
  refreshTotals();
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

function collectStep1(validate) {
  const empresa = document.getElementById('f-empresa')?.value?.trim();
  const resp    = document.getElementById('f-responsavel')?.value?.trim();
  if (validate && !empresa) { alert('Informe o nome da empresa ou cliente.'); return false; }
  if (validate && !resp)    { alert('Informe o nome do responsável.'); return false; }
  _form.cliente = {
    empresa: empresa||'', responsavel: resp||'',
    email:    document.getElementById('f-email')?.value?.trim()||'',
    telefone: document.getElementById('f-telefone')?.value?.trim()||'',
    cidade:   document.getElementById('f-cidade')?.value?.trim()||'',
  };
  return true;
}

function collectStep2(validate) {
  const titulo = document.getElementById('f-titulo')?.value?.trim();
  if (validate && !titulo) { alert('Informe o título da proposta.'); return false; }
  const entregas = [...document.querySelectorAll('.entrega-input')].map(el=>el.value.trim()).filter(Boolean);
  _form.servico = { titulo:titulo||'', descricao:document.getElementById('f-descricao')?.value?.trim()||'', entregas };
  return true;
}

function collectStep3() {
  if (!_form.valores) _form.valores = { itens:[] };
  const rows = document.querySelectorAll('.item-row');
  if (rows.length > 0) {
    _form.valores.itens = [...rows].map(row => ({
      desc: row.querySelector('.item-desc')?.value?.trim()||'',
      qtd:  Number(row.querySelector('.item-qtd')?.value)||1,
      unit: Number(row.querySelector('.item-unit')?.value)||0,
    }));
  }
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

window.addEntrega = function() {
  collectStep2(false);
  (_form.servico.entregas = _form.servico.entregas||[]).push('');
  renderStep(document.getElementById('app'));
};
window.removeEntrega = function(i) {
  collectStep2(false);
  const l = _form.servico.entregas||[];
  if (l.length>1) l.splice(i,1); else _form.servico.entregas = [''];
  renderStep(document.getElementById('app'));
};

// =================================================================
//  PROPOSAL VIEW
// =================================================================
function renderView(app, id) {
  const p = getById(id);
  if (!p) { go('#dashboard'); return; }
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
