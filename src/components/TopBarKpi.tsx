import React, { useState, useEffect } from 'react';
import type { MetricCard, CityFilter, TabId } from '../types/dashboard';
import {
  IconUsers, IconEye, IconActivity, IconThumbUp, IconLink, IconTrendUp, IconSearch, IconX
} from './Sidebar';

interface TopBarProps {
  title: string;
  subtitle: string;
  selectedCity: CityFilter;
  onCityChange: (city: CityFilter) => void;
  onOpenReport: () => void;
  onMobileMenuToggle: () => void;
  onSelectTab: (tab: TabId) => void;
  allTabs: Record<TabId, { title: string; sub: string }>;
  showToast: (msg: string) => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  title, subtitle, selectedCity, onCityChange, onOpenReport, onMobileMenuToggle, onSelectTab, allTabs, showToast
}) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');

  // Keyboard shortcut listener (Cmd/Ctrl + K to open search, Esc to close)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen(prev => !prev);
      } else if (e.key === 'Escape') {
        setSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const cities: { id: CityFilter; label: string; temp?: string }[] = [
    { id: 'todas', label: 'TDF Completa' },
    { id: 'ushuaia', label: 'Ushuaia', temp: '8°C' },
    { id: 'rio_grande', label: 'Río Grande', temp: '6°C' },
    { id: 'tolhuin', label: 'Tolhuin', temp: '5°C' },
  ];

  const searchResults = query.trim() === '' ? [] : (Object.entries(allTabs) as [TabId, { title: string; sub: string }][])
    .filter(([_, t]) => t.title.toLowerCase().includes(query.toLowerCase()) || t.sub.toLowerCase().includes(query.toLowerCase()));

  return (
    <>
      <header className="main-topbar">
        {/* Left Side: Mobile Hamburger & Section Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0, flex: '1 1 auto' }}>
          <button
            onClick={onMobileMenuToggle}
            className="mobile-menu-btn"
            aria-label="Abrir Menú de Navegación"
            title="Abrir menú"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>

          <div style={{ minWidth: 0 }}>
            <h1
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(0.85rem, 1.4vw, 1.02rem)',
                fontWeight: 800,
                color: 'var(--text-primary)',
                letterSpacing: '-0.02em',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: 'min(440px, 45vw)'
              }}
              title={title}
            >
              {title}
            </h1>
            <p
              style={{
                fontSize: '0.68rem',
                color: 'var(--text-muted)',
                marginTop: 1,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: 'min(440px, 45vw)'
              }}
              className="topbar-subtitle"
            >
              {subtitle}
            </p>
          </div>
        </div>

        {/* Center: Search Bar & Location Switcher */}
        <div className="topbar-center-actions">
          {/* Search Bar Pill / Button */}
          <button
            onClick={() => setSearchOpen(true)}
            className="topbar-search-pill"
            title="Buscar módulo o reporte (Ctrl + K)"
          >
            <IconSearch />
            <span className="search-text">Buscar módulo...</span>
            <kbd className="search-kbd">Ctrl K</kbd>
          </button>

          {/* Desktop Location Switcher */}
          <div className="topbar-cities-desktop">
            {cities.map(c => {
              const active = selectedCity === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => {
                    onCityChange(c.id);
                    showToast(`📍 Filtro de ubicación: ${c.label}`);
                  }}
                  className={`city-pill-btn ${active ? 'active' : ''}`}
                >
                  {c.id !== 'todas' && <span style={{ fontSize: '0.65rem' }}>📍</span>}
                  <span>{c.label}</span>
                  {c.temp && <span className="city-temp">{c.temp}</span>}
                </button>
              );
            })}
          </div>

          {/* Mobile & Tablet Compact Location Selector */}
          <div className="topbar-cities-mobile">
            <select
              value={selectedCity}
              onChange={e => {
                const val = e.target.value as CityFilter;
                onCityChange(val);
                const match = cities.find(c => c.id === val);
                showToast(`📍 Filtro de ubicación: ${match?.label || val}`);
              }}
              className="city-select-mobile"
              aria-label="Seleccionar ubicación"
            >
              {cities.map(c => (
                <option key={c.id} value={c.id}>
                  {c.id === 'todas' ? '🌐 TDF Completa' : `📍 ${c.label} (${c.temp || ''})`}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Right Actions: Live Indicator, Emergencias 101 & Report Button */}
        <div className="topbar-right-actions">
          {/* Live Status Badge */}
          <div className="topbar-live-badge">
            <span className="live-dot" />
            <span className="live-text">GA4 En Vivo</span>
          </div>

          {/* Emergency 101 badge */}
          <a
            href="tel:101"
            className="topbar-101-badge"
            title="Línea 101 Emergencias Policiales"
          >
            101
          </a>

          {/* Report Button */}
          <button
            onClick={() => {
              onOpenReport();
              showToast('📄 Abriendo Generador de Informes Institucionales...');
            }}
            className="btn-neon topbar-report-btn"
            title="Generar informe oficial"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            <span className="report-btn-text">Informe</span>
          </button>
        </div>
      </header>

      {/* ── COMMAND PALETTE / SEARCH MODAL (UX Improvement) ── */}
      {searchOpen && (
        <div className="overlay" onClick={() => setSearchOpen(false)}>
          <div
            className="modal anim-fadein"
            onClick={e => e.stopPropagation()}
            style={{ maxWidth: 540, padding: 20, borderRadius: 20 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, borderBottom: '1px solid var(--border-subtle)', paddingBottom: 12, marginBottom: 12 }}>
              <IconSearch />
              <input
                type="text"
                autoFocus
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Buscar módulo, informe, métrica..."
                className="input-dark"
                style={{ border: 'none', background: 'transparent', fontSize: '0.92rem', padding: 0 }}
              />
              <button
                onClick={() => setSearchOpen(false)}
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
              >
                <IconX />
              </button>
            </div>

            {query.trim() === '' ? (
              <div style={{ padding: '20px 0', textOverflow: 'ellipsis', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                Escribe para buscar entre los 20+ módulos analíticos e informes OCI.
              </div>
            ) : searchResults.length === 0 ? (
              <div style={{ padding: '20px 0', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                No se encontraron módulos con «{query}».
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, maxHeight: 300, overflowY: 'auto' }}>
                {searchResults.map(([id, item]) => (
                  <button
                    key={id}
                    onClick={() => {
                      onSelectTab(id);
                      setSearchOpen(false);
                      setQuery('');
                      showToast(`🚀 Navegando a: ${item.title}`);
                    }}
                    style={{
                      display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
                      padding: '10px 14px', borderRadius: 12,
                      background: 'var(--bg-input)', border: '1px solid var(--border-subtle)',
                      color: 'var(--text-primary)', cursor: 'pointer', textAlign: 'left',
                      transition: 'all 0.15s ease'
                    }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--neon)'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-subtle)'}
                  >
                    <span style={{ fontWeight: 700, fontSize: '0.82rem', color: 'var(--neon)' }}>{item.title}</span>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{item.sub}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

// ── KPI CARDS ROW ─────────────────────────────────────────────────────────────
interface KpiCardsProps {
  metrics: MetricCard[];
}

function getKpiIcon(icon: string) {
  switch (icon) {
    case 'Users':       return <IconUsers />;
    case 'Eye':         return <IconEye />;
    case 'Activity':    return <IconActivity />;
    case 'ThumbsUp':    return <IconThumbUp />;
    case 'Link':        return <IconLink />;
    default:            return <IconTrendUp />;
  }
}

export const KpiCards: React.FC<KpiCardsProps> = ({ metrics }) => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: 16, marginBottom: 28 }}>
      {metrics.map((m, i) => (
        <div key={m.id} className="kpi-card anim-fadein" style={{ animationDelay: `${i * 60}ms` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
            {/* Police Sunburst Gold icon badge */}
            <div style={{
              padding: 8, borderRadius: 12,
              background: 'var(--neon-bg)',
              border: '1px solid var(--border-neon)',
              color: 'var(--text-neon)'
            }}>
              {getKpiIcon(m.icon)}
            </div>
            <span className={m.isPositive ? 'kpi-change-up' : 'kpi-change-neutral'}>
              {m.change}
            </span>
          </div>

          <div className="kpi-label" style={{ marginBottom: 6 }}>{m.title}</div>
          <div className="kpi-value" style={{ marginBottom: 6 }}>{m.value}</div>
          <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>{m.description}</div>
        </div>
      ))}
    </div>
  );
};
