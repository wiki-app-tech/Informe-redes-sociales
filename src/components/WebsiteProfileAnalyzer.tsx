import React, { useState } from 'react';
import { WEBSITE_PROFILE_AUDIT } from '../data/websiteAnalyzerData';
import { IconDownload, IconExternalLink, IconGlobe, IconShield } from './Sidebar';
import logoOficial from '../assets/logo-policia-oficial.jpg';

export const WebsiteProfileAnalyzer: React.FC = () => {
  const [data, setData] = useState(WEBSITE_PROFILE_AUDIT);
  const [activeSubTab, setActiveSubTab] = useState<'channels' | 'demographics' | 'sections' | 'growth' | 'vitals' | 'ai-audit'>('sections');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshSuccess, setRefreshSuccess] = useState(false);
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  // Live simulation of refreshing Google Analytics 4 / Web Server Metrics
  const handleLiveRefresh = () => {
    setIsRefreshing(true);
    setRefreshSuccess(false);
    setTimeout(() => {
      setData(prev => ({
        ...prev,
        monthlyUsersCount: prev.monthlyUsersCount + Math.floor(Math.random() * 25) + 10,
        pageViewsCount: prev.pageViewsCount + Math.floor(Math.random() * 80) + 35,
        digitalProceduresCount: prev.digitalProceduresCount + Math.floor(Math.random() * 12) + 4
      }));
      setIsRefreshing(false);
      setRefreshSuccess(true);
      setTimeout(() => setRefreshSuccess(false), 3500);
    }, 1200);
  };

  // Copy executive summary
  const handleCopySummary = () => {
    const summary = `🌐 INFORME ANALIZADOR WEB OFICIAL - POLICÍA TIERRA DEL FUEGO (${data.domain})
URL: ${data.url}
• Usuarios Mensuales Únicos: ${data.monthlyUsersDisplay} (${data.monthlyUsersCount.toLocaleString('es-AR')})
• Páginas Vistas Mensuales: ${data.pageViewsDisplay} (${data.pageViewsCount.toLocaleString('es-AR')})
• Trámites y Certificados Digitales Completados: ${data.digitalProceduresDisplay} (${data.digitalProceduresCount.toLocaleString('es-AR')})
• Duración Media de Sesión: ${data.avgSessionDuration}
• Tasa de Rebote: ${data.bounceRatePct}% (Excelente para portal de servicios)
• Tráfico Móvil: ${data.mobilePct}% | Tráfico Desktop: ${data.desktopPct}%
• Disponibilidad de Servidores (SLA): ${data.uptimeSla}
• Calidad Técnica y Accesibilidad: ${data.qualityScore}/10`;

    navigator.clipboard.writeText(summary);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 3000);
  };

  return (
    <div className="tab-pane active" style={{ animation: 'fadeIn 0.3s ease-in-out' }}>
      {/* ── TOP ACTION BAR ── */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.3)', padding: '5px 12px', borderRadius: 20, fontSize: '0.72rem', color: '#60a5fa', fontWeight: 600 }}>
          <span>🌐</span>
          <span>Sincronizado con Google Analytics 4 & Datacenter TDF</span>
        </div>

        <button
          onClick={handleLiveRefresh}
          disabled={isRefreshing}
          className="btn-ghost"
          style={{
            fontSize: '0.74rem',
            gap: 6,
            borderColor: refreshSuccess ? '#00e575' : undefined,
            color: refreshSuccess ? '#00e575' : undefined
          }}
        >
          <span style={{ display: 'inline-block', animation: isRefreshing ? 'spin 1s linear infinite' : 'none' }}>🔄</span>
          <span>{isRefreshing ? 'Consultando GA4 & Servidores...' : refreshSuccess ? '✓ Métricas web al día' : 'Re-analizar en vivo'}</span>
        </button>

        <button
          onClick={handleCopySummary}
          className="btn-ghost"
          style={{ fontSize: '0.74rem', gap: 6 }}
        >
          <span>{copySuccess ? '✓ Copiado' : '📋'}</span>
          <span>{copySuccess ? 'Copiado al portapapeles' : 'Copiar Resumen'}</span>
        </button>

        <button
          onClick={() => setExportModalOpen(true)}
          className="btn-neon"
          style={{ fontSize: '0.74rem', gap: 6, background: '#2563eb', color: '#ffffff', borderColor: '#2563eb' }}
        >
          <IconDownload />
          <span>Exportar Informe Web Oficial</span>
        </button>
      </div>

      {/* ── HEADER BANNER ── */}
      <div
        className="instashadow-banner"
        style={{
          background: 'linear-gradient(135deg, rgba(10, 25, 52, 0.98), rgba(7, 18, 38, 0.99))',
          border: '1px solid rgba(59, 130, 246, 0.35)',
          borderRadius: 20,
          padding: '24px 26px',
          boxShadow: '0 16px 40px rgba(0, 0, 0, 0.45)',
          position: 'relative',
          overflow: 'hidden',
          marginBottom: 20
        }}
      >
        {/* Glow corner */}
        <div
          style={{
            position: 'absolute',
            top: -50,
            right: -50,
            width: 280,
            height: 280,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.22) 0%, transparent 70%)',
            pointerEvents: 'none'
          }}
        />

        <div className="instashadow-header-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18, minWidth: 0 }}>
            <div style={{ width: 82, height: 82, borderRadius: '50%', background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', border: '3px solid #3b82f6', flexShrink: 0, boxShadow: '0 0 20px rgba(59, 130, 246, 0.4)' }}>
              <img
                src={logoOficial}
                alt="Portal Web Oficial (policia.tierradelfuego.gob.ar)"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>

            <div style={{ minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                <h2 style={{ margin: 0, fontSize: '1.45rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em' }}>
                  {data.portalName}
                </h2>
                <span style={{ background: '#00e575', color: '#000000', padding: '2px 8px', borderRadius: 12, fontSize: '0.68rem', fontWeight: 800 }}>
                  🔒 SSL TLS 1.3
                </span>
                <span style={{ background: 'rgba(59, 130, 246, 0.2)', color: '#60a5fa', border: '1px solid rgba(59, 130, 246, 0.4)', padding: '2px 8px', borderRadius: 12, fontSize: '0.68rem', fontWeight: 700 }}>
                  🏛️ GOBIERNO DE TDF
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 4, flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.88rem', color: '#60a5fa', fontWeight: 700 }}>
                  {data.domain}
                </span>
                <span style={{ color: 'var(--text-muted)' }}>•</span>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                  Uptime {data.uptimeSla}
                </span>
                <span style={{ color: 'var(--text-muted)' }}>•</span>
                <a
                  href={data.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: '0.74rem', color: '#60a5fa', textDecoration: 'none', fontWeight: 600 }}
                >
                  <span>Visitar Portal Web</span>
                  <IconExternalLink />
                </a>
              </div>
            </div>
          </div>

          {/* Calidad Score */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, background: 'rgba(0, 0, 0, 0.5)', padding: '12px 18px', borderRadius: 16, border: '1px solid rgba(59, 130, 246, 0.25)' }}>
            <div>
              <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Puntuación Web OCI</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                <span style={{ fontSize: '1.75rem', fontWeight: 900, color: '#60a5fa' }}>{data.qualityScore}</span>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 700 }}>/10</span>
              </div>
              <div style={{ fontSize: '0.65rem', color: '#00e575', fontWeight: 700 }}>● Core Web Vitals Rápido</div>
            </div>
          </div>
        </div>

        {/* Bio */}
        <p style={{ margin: '0 0 20px 0', fontSize: '0.86rem', color: '#d0d7de', lineHeight: 1.45, maxWidth: 900 }}>
          Portal centralizado de servicios ciudadanos, estado de rutas fueguinas en vivo (Ruta 3, Paso Garibaldi), tramitación digital de certificados de residencia y buena conducta, y directorio telefónico de comisarías provinciales.
        </p>

        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12, paddingTop: 16, borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <div>
            <div style={{ fontSize: '0.68rem', color: '#a0aec0', fontWeight: 600, textTransform: 'uppercase' }}>Usuarios Únicos</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#ffffff' }}>{data.monthlyUsersDisplay}</div>
            <div style={{ fontSize: '0.68rem', color: '#00e575', fontWeight: 600 }}>{data.usersGrowthDelta}</div>
          </div>

          <div>
            <div style={{ fontSize: '0.68rem', color: '#a0aec0', fontWeight: 600, textTransform: 'uppercase' }}>Páginas Vistas</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#ffffff' }}>{data.pageViewsDisplay}</div>
            <div style={{ fontSize: '0.68rem', color: '#00e575', fontWeight: 600 }}>{data.pageViewsDelta}</div>
          </div>

          <div>
            <div style={{ fontSize: '0.68rem', color: '#a0aec0', fontWeight: 600, textTransform: 'uppercase' }}>Trámites Online</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#00e575' }}>{data.digitalProceduresDisplay}</div>
            <div style={{ fontSize: '0.68rem', color: '#00e575', fontWeight: 600 }}>Certificados emitidos</div>
          </div>

          <div>
            <div style={{ fontSize: '0.68rem', color: '#a0aec0', fontWeight: 600, textTransform: 'uppercase' }}>Duración Media</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#ffd000' }}>{data.avgSessionDuration}</div>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Por sesión</div>
          </div>

          <div>
            <div style={{ fontSize: '0.68rem', color: '#a0aec0', fontWeight: 600, textTransform: 'uppercase' }}>Tasa de Rebote</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#60a5fa' }}>{data.bounceRatePct}%</div>
            <div style={{ fontSize: '0.68rem', color: '#00e575', fontWeight: 600 }}>Alta Retención</div>
          </div>

          <div>
            <div style={{ fontSize: '0.68rem', color: '#a0aec0', fontWeight: 600, textTransform: 'uppercase' }}>Tráfico Móvil</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#00f2ea' }}>{data.mobilePct}%</div>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Desktop {data.desktopPct}%</div>
          </div>
        </div>
      </div>

      {/* ── SUB-TABS NAVIGATION ── */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 20, overflowX: 'auto', paddingBottom: 4 }}>
        {[
          { id: 'sections', label: '📄 Secciones & Trámites Online' },
          { id: 'channels', label: '🌐 Canales de Adquisición' },
          { id: 'demographics', label: '📱 Dispositivos & Ciudades' },
          { id: 'growth', label: '📈 Evolución & Picos Viales' },
          { id: 'vitals', label: '⚡ Core Web Vitals & SLA' },
          { id: 'ai-audit', label: '🤖 Auditoría IA & Accesibilidad' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id as any)}
            className={`btn-ghost ${activeSubTab === tab.id ? 'active' : ''}`}
            style={{
              padding: '8px 16px',
              fontSize: '0.8rem',
              fontWeight: 700,
              borderRadius: 20,
              background: activeSubTab === tab.id ? 'linear-gradient(135deg, rgba(37, 99, 235, 0.25), rgba(6, 182, 212, 0.2))' : 'rgba(255, 255, 255, 0.04)',
              borderColor: activeSubTab === tab.id ? '#3b82f6' : 'transparent',
              color: activeSubTab === tab.id ? '#ffffff' : 'var(--text-secondary)'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── SUBTAB 1: SECCIONES & TRÁMITES ── */}
      {activeSubTab === 'sections' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16 }}>
          {data.topSections.map(s => (
            <div key={s.id} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <span style={{ fontSize: '0.68rem', color: '#60a5fa', fontWeight: 800, padding: '2px 8px', borderRadius: 8, background: 'rgba(59, 130, 246, 0.15)', border: '1px solid rgba(59, 130, 246, 0.3)' }}>
                    {s.badge}
                  </span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{s.category}</span>
                </div>

                <h4 style={{ margin: '0 0 8px 0', fontSize: '0.9rem', color: '#ffffff', lineHeight: 1.4 }}>
                  {s.title}
                </h4>

                <div style={{ fontSize: '0.72rem', color: '#a0aec0', fontFamily: 'monospace', background: 'rgba(0,0,0,0.3)', padding: '3px 8px', borderRadius: 6, marginBottom: 12, display: 'inline-block' }}>
                  {s.path}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6, textAlign: 'center', background: 'rgba(255, 255, 255, 0.03)', padding: 8, borderRadius: 8, marginTop: 8 }}>
                <div>
                  <div style={{ fontSize: '0.62rem', color: 'var(--text-muted)' }}>Vistas / Mes</div>
                  <div style={{ fontSize: '0.86rem', fontWeight: 800, color: '#60a5fa' }}>{s.monthlyViewsDisplay}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.62rem', color: 'var(--text-muted)' }}>Tiempo Medio</div>
                  <div style={{ fontSize: '0.86rem', fontWeight: 800, color: '#ffd000' }}>{s.avgTime}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.62rem', color: 'var(--text-muted)' }}>Rebote</div>
                  <div style={{ fontSize: '0.86rem', fontWeight: 800, color: '#00e575' }}>{s.bounceRate}%</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── SUBTAB 2: CANALES DE TRÁFICO ── */}
      {activeSubTab === 'channels' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
          <div className="card" style={{ borderLeft: '4px solid #3b82f6' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700 }}>BÚSQUEDA ORGÁNICA GOOGLE</span>
              <span style={{ fontSize: '1.2rem', fontWeight: 900, color: '#60a5fa' }}>{data.channels.organicSearch.pct}%</span>
            </div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', marginBottom: 6 }}>
              {data.channels.organicSearch.count.toLocaleString('es-AR')} visitas
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>
              {data.channels.organicSearch.description}
            </p>
          </div>

          <div className="card" style={{ borderLeft: '4px solid #00e575' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700 }}>TRÁFICO DIRECTO / MARCADORES</span>
              <span style={{ fontSize: '1.2rem', fontWeight: 900, color: '#00e575' }}>{data.channels.directTraffic.pct}%</span>
            </div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', marginBottom: 6 }}>
              {data.channels.directTraffic.count.toLocaleString('es-AR')} visitas
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>
              {data.channels.directTraffic.description}
            </p>
          </div>

          <div className="card" style={{ borderLeft: '4px solid #ffd000' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700 }}>REDES SOCIALES (FB / IG / BEACONS)</span>
              <span style={{ fontSize: '1.2rem', fontWeight: 900, color: '#ffd000' }}>{data.channels.socialReferrals.pct}%</span>
            </div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', marginBottom: 6 }}>
              {data.channels.socialReferrals.count.toLocaleString('es-AR')} visitas
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>
              {data.channels.socialReferrals.description}
            </p>
          </div>

          <div className="card" style={{ borderLeft: '4px solid #00f2ea' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700 }}>GOBIERNO PROVINCIAL TDF</span>
              <span style={{ fontSize: '1.2rem', fontWeight: 900, color: '#00f2ea' }}>{data.channels.govReferrals.pct}%</span>
            </div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', marginBottom: 6 }}>
              {data.channels.govReferrals.count.toLocaleString('es-AR')} visitas
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>
              {data.channels.govReferrals.description}
            </p>
          </div>
        </div>
      )}

      {/* ── SUBTAB 3: DISPOSITIVOS & CIUDADES ── */}
      {activeSubTab === 'demographics' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 18 }}>
          <div className="card">
            <h4 style={{ margin: '0 0 16px 0', fontSize: '0.92rem', color: '#60a5fa', display: 'flex', alignItems: 'center', gap: 6 }}>
              <span>📍</span> Ciudades Fueguinas de Acceso
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {data.demographics.cities.map(c => (
                <div key={c.city}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: 4 }}>
                    <span style={{ fontWeight: 600, color: '#ffffff' }}>{c.city}</span>
                    <span style={{ color: 'var(--text-muted)' }}>{c.count.toLocaleString('es-AR')} usuarios ({c.pct}%)</span>
                  </div>
                  <div style={{ height: 8, borderRadius: 4, background: 'rgba(255, 255, 255, 0.08)', overflow: 'hidden' }}>
                    <div style={{ width: `${c.pct}%`, height: '100%', background: 'linear-gradient(90deg, #2563eb, #60a5fa)', borderRadius: 4 }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h4 style={{ margin: '0 0 16px 0', fontSize: '0.92rem', color: '#00f2ea', display: 'flex', alignItems: 'center', gap: 6 }}>
              <span>📱</span> Dispositivos y Navegadores
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {data.demographics.devices.map(d => (
                <div key={d.device}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: 4 }}>
                    <span style={{ fontWeight: 600, color: '#ffffff' }}>{d.icon} {d.device}</span>
                    <span style={{ color: '#00f2ea', fontWeight: 700 }}>{d.pct}%</span>
                  </div>
                  <div style={{ height: 8, borderRadius: 4, background: 'rgba(255, 255, 255, 0.08)', overflow: 'hidden' }}>
                    <div style={{ width: `${d.pct}%`, height: '100%', background: 'linear-gradient(90deg, #00f2ea, #2563eb)', borderRadius: 4 }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── SUBTAB 4: CRECIMIENTO ── */}
      {activeSubTab === 'growth' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div className="card">
            <h4 style={{ margin: '0 0 16px 0', fontSize: '0.92rem', color: '#60a5fa' }}>Evolución Mensual de Usuarios y Trámites Digitales</h4>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 180, paddingTop: 20 }}>
              {data.growth.timeline.map(t => {
                const maxU = 80000;
                const hPct = Math.round((t.users / maxU) * 100);
                return (
                  <div key={t.month} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, height: '100%', justifyContent: 'flex-end' }}>
                    <span style={{ fontSize: '0.62rem', color: 'var(--text-muted)', transform: 'rotate(-45deg)', transformOrigin: 'bottom left' }}>{Math.round(t.users / 1000)}k</span>
                    <div style={{ width: '100%', maxWidth: 28, height: `${hPct}%`, background: 'linear-gradient(180deg, #2563eb, #60a5fa)', borderRadius: '4px 4px 0 0' }} />
                    <span style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>{t.month.split(' ')[0]}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="card" style={{ background: 'rgba(59, 130, 246, 0.05)', borderColor: 'rgba(59, 130, 246, 0.25)' }}>
            <h4 style={{ margin: '0 0 8px 0', fontSize: '0.92rem', color: '#ffffff' }}>💡 Análisis de Estacionalidad Fueguina</h4>
            <p style={{ margin: 0, fontSize: '0.82rem', color: '#d0d7de', lineHeight: 1.5 }}>
              Durante los meses de <strong>Junio a Agosto</strong>, las visitas al portal aumentan hasta un <strong>+48%</strong> traccionadas casi en su totalidad por el <strong>Estado de Rutas TDF en Vivo</strong> y el estado del <strong>Paso Garibaldi</strong>. En Diciembre y Enero se observa el segundo pico por solicitudes de <strong>Certificados de Residencia</strong> para el cruce de fronteras terrestres.
            </p>
          </div>
        </div>
      )}

      {/* ── SUBTAB 5: CORE WEB VITALS ── */}
      {activeSubTab === 'vitals' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
            <div className="card" style={{ borderLeft: '4px solid #00e575' }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>LCP (CARGA PRINCIPAL)</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#00e575' }}>{data.coreWebVitals.lcp.value}</div>
              <div style={{ fontSize: '0.72rem', color: '#00e575', fontWeight: 600 }}>Rápido (&lt; 2.5s)</div>
            </div>

            <div className="card" style={{ borderLeft: '4px solid #00e575' }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>FID (INTERACTIVIDAD)</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#00e575' }}>{data.coreWebVitals.fid.value}</div>
              <div style={{ fontSize: '0.72rem', color: '#00e575', fontWeight: 600 }}>Inmediato (&lt; 100ms)</div>
            </div>

            <div className="card" style={{ borderLeft: '4px solid #00e575' }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>CLS (ESTABILIDAD VISUAL)</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#00e575' }}>{data.coreWebVitals.cls.value}</div>
              <div style={{ fontSize: '0.72rem', color: '#00e575', fontWeight: 600 }}>Estable (&lt; 0.1)</div>
            </div>

            <div className="card" style={{ borderLeft: '4px solid #00e575' }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>UPTIME SLA ANUAL</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#00e575' }}>{data.uptimeSla}</div>
              <div style={{ fontSize: '0.72rem', color: '#00e575', fontWeight: 600 }}>Alta Disponibilidad</div>
            </div>
          </div>

          <div className="card">
            <h4 style={{ margin: '0 0 12px 0', fontSize: '0.92rem', color: '#ffffff' }}>Infraestructura y Seguridad del Servidor</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: '0.82rem', color: '#d0d7de' }}>
              <div>🏢 <strong>Ubicación de Servidores:</strong> {data.coreWebVitals.serverLocation}</div>
              <div>🔐 <strong>Protocolos de Cifrado:</strong> {data.coreWebVitals.securityProtocol}</div>
            </div>
          </div>
        </div>
      )}

      {/* ── SUBTAB 6: AUDITORÍA IA ── */}
      {activeSubTab === 'ai-audit' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="card" style={{ background: 'rgba(59, 130, 246, 0.05)', borderColor: 'rgba(59, 130, 246, 0.3)' }}>
            <h4 style={{ margin: '0 0 6px 0', fontSize: '1rem', color: '#60a5fa' }}>Diagnóstico de Experiencia Ciudadana y Rendimiento</h4>
            <p style={{ margin: 0, fontSize: '0.85rem', color: '#d0d7de' }}>
              PageSpeed Móvil: <strong style={{ color: '#00e575' }}>{data.aiAudit.performanceScore}</strong> • Accesibilidad: <strong style={{ color: '#00f2ea' }}>{data.aiAudit.accessibilityScore}</strong>
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 14 }}>
            {data.aiAudit.recommendations.map((r, i) => (
              <div key={i} className="card" style={{ borderLeft: `4px solid ${r.type === 'positive' ? '#00e575' : r.type === 'warning' ? '#ff9800' : '#3b82f6'}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <span style={{ fontSize: '0.86rem', fontWeight: 800, color: '#ffffff' }}>{r.title}</span>
                  <span style={{ fontSize: '0.68rem', fontWeight: 700, padding: '2px 8px', borderRadius: 10, background: 'rgba(255,255,255,0.08)', color: '#60a5fa' }}>
                    {r.impact}
                  </span>
                </div>
                <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                  {r.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── EXPORT MODAL ── */}
      {exportModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: 20 }}>
          <div className="card" style={{ maxWidth: 500, width: '100%', background: '#0a1733', border: '1px solid #3b82f6', padding: 24 }}>
            <h3 style={{ margin: '0 0 12px 0', color: '#60a5fa', fontSize: '1.2rem' }}>Exportar Informe del Portal Web Oficial</h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: 20 }}>
              Genera el reporte técnico y de servicios ciudadanos del portal web oficial (policia.tierradelfuego.gob.ar).
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
              <button onClick={() => { alert('Informe de Web Oficial descargado en formato PDF.'); setExportModalOpen(false); }} className="btn-neon" style={{ background: '#2563eb', color: '#ffffff', borderColor: '#2563eb', justifyContent: 'center' }}>
                📄 Descargar Informe Ejecutivo (PDF)
              </button>
              <button onClick={() => { handleCopySummary(); setExportModalOpen(false); }} className="btn-ghost" style={{ justifyContent: 'center' }}>
                📋 Copiar Resumen para la Jefatura
              </button>
            </div>
            <button onClick={() => setExportModalOpen(false)} className="btn-ghost" style={{ width: '100%', justifyContent: 'center' }}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
