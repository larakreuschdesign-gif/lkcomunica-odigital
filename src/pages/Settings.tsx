import { useState } from 'react'
import { Save, Plus, Trash2 } from 'lucide-react'

export function Settings() {
  const [brands, setBrands] = useState([
    { id: '1', name: 'Marca Padrão', niche: 'Geral' },
  ])
  const [newBrand, setNewBrand] = useState({ name: '', niche: '' })
  const [activeTab, setActiveTab] = useState('brands')

  const addBrand = () => {
    if (newBrand.name) {
      setBrands([...brands, { id: Date.now().toString(), ...newBrand }])
      setNewBrand({ name: '', niche: '' })
    }
  }

  const removeBrand = (id: string) => {
    setBrands(brands.filter((b) => b.id !== id))
  }

  return (
    <div className="settings">
      <div className="container" style={{ padding: '3rem 1.5rem', maxWidth: '800px' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '2rem' }}>Configurações</h1>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
          <button
            onClick={() => setActiveTab('brands')}
            className={`btn btn--sm ${activeTab === 'brands' ? 'btn--primary' : 'btn--ghost'}`}
          >
            Minhas Marcas
          </button>
          <button
            onClick={() => setActiveTab('account')}
            className={`btn btn--sm ${activeTab === 'account' ? 'btn--primary' : 'btn--ghost'}`}
          >
            Conta
          </button>
          <button
            onClick={() => setActiveTab('preferences')}
            className={`btn btn--sm ${activeTab === 'preferences' ? 'btn--primary' : 'btn--ghost'}`}
          >
            Preferências
          </button>
        </div>

        {/* Brands Tab */}
        {activeTab === 'brands' && (
          <div>
            {/* Add New Brand */}
            <div className="card" style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1.5rem' }}>Adicionar Nova Marca</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '1rem' }}>
                <div className="form-group">
                  <label className="form-group__label">Nome da Marca</label>
                  <input
                    type="text"
                    className="input"
                    placeholder="Ex: Minha Empresa"
                    value={newBrand.name}
                    onChange={(e) => setNewBrand({ ...newBrand, name: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-group__label">Nicho</label>
                  <input
                    type="text"
                    className="input"
                    placeholder="Ex: Tecnologia"
                    value={newBrand.niche}
                    onChange={(e) => setNewBrand({ ...newBrand, niche: e.target.value })}
                  />
                </div>
              </div>
              <button className="btn btn--primary" onClick={addBrand}>
                <Plus size={16} />
                Adicionar Marca
              </button>
            </div>

            {/* Brands List */}
            <div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem' }}>Suas Marcas</h3>
              <div style={{ display: 'grid', gap: '1rem' }}>
                {brands.map((brand) => (
                  <div key={brand.id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                        {brand.name}
                      </h4>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                        {brand.niche}
                      </p>
                    </div>
                    <button
                      className="btn btn--secondary btn--sm"
                      onClick={() => removeBrand(brand.id)}
                    >
                      <Trash2 size={16} />
                      Remover
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Account Tab */}
        {activeTab === 'account' && (
          <div>
            <div className="card" style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1.5rem' }}>Informações da Conta</h3>
              <div style={{ display: 'grid', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-group__label">Email</label>
                  <input type="email" className="input" placeholder="seu@email.com" />
                </div>
                <div className="form-group">
                  <label className="form-group__label">Nome</label>
                  <input type="text" className="input" placeholder="Seu Nome" />
                </div>
                <button className="btn btn--primary">
                  <Save size={16} />
                  Salvar Mudanças
                </button>
              </div>
            </div>

            <div className="card">
              <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem' }}>Segurança</h3>
              <button className="btn btn--secondary">Alterar Senha</button>
            </div>
          </div>
        )}

        {/* Preferences Tab */}
        {activeTab === 'preferences' && (
          <div>
            <div className="card">
              <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1.5rem' }}>Preferências</h3>
              <div style={{ display: 'grid', gap: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h4 style={{ fontWeight: 600 }}>Notificações por Email</h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                      Receba notificações sobre seus roteiros
                    </p>
                  </div>
                  <input type="checkbox" defaultChecked style={{ width: '20px', height: '20px', cursor: 'pointer' }} />
                </div>

                <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h4 style={{ fontWeight: 600 }}>Modo Escuro</h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                      Usar tema escuro por padrão
                    </p>
                  </div>
                  <input type="checkbox" style={{ width: '20px', height: '20px', cursor: 'pointer' }} />
                </div>

                <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h4 style={{ fontWeight: 600 }}>Análise Automática</h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                      Analisar automaticamente roteiros ao gerar
                    </p>
                  </div>
                  <input type="checkbox" defaultChecked style={{ width: '20px', height: '20px', cursor: 'pointer' }} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
