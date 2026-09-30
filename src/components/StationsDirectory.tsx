import React, { useState } from 'react';
import type { StationContact } from '../types/dashboard';
import { IconPhone, IconMapPin, IconSearch, IconShield, IconSiren } from './Sidebar';

interface DirectoryProps {
  stations: StationContact[];
  selectedCity?: string;
}

export const DirectorySection: React.FC<DirectoryProps> = ({ stations }) => {
  const [cityFilter, setCityFilter] = useState<string>('todas');
  const [search, setSearch] = useState('');

  const filtered = stations.filter(s => {
    if (cityFilter !== 'todas' && s.city !== cityFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return s.name.toLowerCase().includes(q) || s.address.toLowerCase().includes(q) || (s.jurisdiction || '').toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, marginBottom: 16 }}>
        <div>
          <h2 className="section-title"><IconPhone />Comisarías & Directorio Institucional</h2>
          <p className="section-subtitle">Canales de atención ciudadana 24hs — Toda la Provincia</p>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {['todas', 'Ushuaia', 'Río Grande', 'Tolhuin'].map(c => (
            <button
              key={c}
              onClick={() => setCityFilter(c)}
              style={{
                padding: '6px 14px', borderRadius: 999, border: 'none', cursor: 'pointer', fontSize: '0.72rem', fontWeight: 700,
                background: cityFilter === c ? 'var(--neon)' : 'var(--bg-card)',
                color: cityFilter === c ? '#0f0d13' : 'var(--text-secondary)',
                transition: 'all 0.15s', fontFamily: 'var(--font-body)',
                borderWidth: 1, borderStyle: 'solid',
                borderColor: cityFilter === c ? 'var(--neon)' : 'var(--border-subtle)'
              }}
            >
              {c === 'todas' ? 'Todas' : c}
            </button>
          ))}
        </div>
      </div>

      {/* Emergency Hero */}
      <div style={{
        padding: '16px 20px', borderRadius: 14, marginBottom: 20,
        background: 'linear-gradient(135deg, rgba(239,68,68,0.15) 0%, rgba(239,68,68,0.05) 100%)',
        border: '1px solid rgba(239,68,68,0.3)',
        display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 12
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ padding: 12, borderRadius: 12, background: 'rgba(239,68,68,0.2)', color: '#f87171', animation: 'pulse-red 2s infinite' }}>
            <IconSiren />
          </div>
          <div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-primary)' }}>
              ¿Emergencia o Situación de Riesgo?
            </h3>
            <p style={{ fontSize: '0.72rem', color: '#f87171', marginTop: 2 }}>
              Comunicarse de forma inmediata con el sistema de atención de emergencias policiales
            </p>
          </div>
        </div>
        <a href="tel:101" className="btn-danger" style={{ fontSize: '0.88rem', padding: '10px 22px', letterSpacing: '0.05em' }}>
          📞 LLAMAR AL 101
        </a>
      </div>

      {/* Search */}
      <div style={{ position: 'relative', maxWidth: 340, marginBottom: 16 }}>
        <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
          <IconSearch />
        </span>
        <input type="text" placeholder="Buscar comisaría..." value={search} onChange={e => setSearch(e.target.value)}
          className="input-dark" style={{ paddingLeft: 34, fontSize: '0.75rem' }} />
      </div>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 }}>
        {filtered.map(st => (
          <div key={st.id} className="card" style={{ padding: 18, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <span className="badge badge-neon">{st.city}</span>
                <IconShield />
              </div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-primary)', marginBottom: 10 }}>{st.name}</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: '0.72rem', color: 'var(--text-secondary)', marginBottom: 12 }}>
                <span style={{ display: 'flex', gap: 6, alignItems: 'flex-start' }}><IconMapPin /> {st.address}</span>
                <a href={`tel:${st.phone.replace(/[^0-9+]/g, '')}`} style={{ display: 'flex', gap: 6, alignItems: 'center', color: '#60a5fa', fontFamily: 'monospace', fontWeight: 600, textDecoration: 'none' }}>
                  <IconPhone /> {st.phone}
                </a>
              </div>
              <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', padding: '6px 10px', borderRadius: 8, background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-subtle)' }}>
                <strong style={{ color: 'var(--text-secondary)' }}>Jurisdicción:</strong> {st.jurisdiction}
              </div>
            </div>
            <a href={`tel:${st.phone.replace(/[^0-9+]/g, '')}`} className="btn-ghost" style={{ marginTop: 12, justifyContent: 'center' }}>
              <IconPhone /> Llamar a la Dependencia
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};
