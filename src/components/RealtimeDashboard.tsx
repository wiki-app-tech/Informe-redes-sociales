import React, { useState, useEffect } from 'react';
import { IconGlobe, IconActivity, IconEye, IconUsers, IconCheck } from './Sidebar';

export const RealtimeDashboard: React.FC = () => {
  const [activeUsers, setActiveUsers] = useState(328);
  const [pageViewsPerMin, setPageViewsPerMin] = useState(142);
  const [bounceRate, setBounceRate] = useState(32.4);
  const [lastUpdated, setLastUpdated] = useState<string>('Ahora mismo');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [countdown, setCountdown] = useState(30);

  // Auto-refresh timer simulated 30s GA4 polling
  useEffect(() => {
    if (!autoRefresh) return;
    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          // Simulate realtime updates
          setActiveUsers(prevUsers => Math.max(150, prevUsers + Math.floor(Math.random() * 21) - 10));
          setPageViewsPerMin(prevViews => Math.max(60, prevViews + Math.floor(Math.random() * 15) - 7));
          setLastUpdated(new Date().toLocaleTimeString('es-AR'));
          return 30;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [autoRefresh]);

  // Traffic past hour (60 mins)
  const trafficData = Array.from({ length: 12 }, (_, i) => ({
    minute: `${(11 - i) * 5}m`,
    users: Math.floor(200 + Math.sin(i) * 80 + Math.random() * 40)
  })).reverse();

  // Active event stream
  const [events] = useState([
    { id: 1, type: 'page_view', page: '/portal/alertas-viales', country: '🇦🇷 Argentina', device: 'Mobile', time: 'Hace 2s' },
    { id: 2, type: 'click_call_101', page: '/directorio/emergencias', country: '🇦🇷 Argentina', device: 'Mobile', time: 'Hace 6s' },
    { id: 3, type: 'linkinbio_click', page: '/ig/post-104', country: '🇦🇷 Argentina', device: 'Desktop', time: 'Hace 12s' },
    { id: 4, type: 'page_view', page: '/tramites/licencia-conducir', country: '🇦🇷 Argentina', device: 'Mobile', time: 'Hace 18s' },
    { id: 5, type: 'download_pdf', page: '/informes/reporte-agosto', country: '🇦🇷 Argentina', device: 'Desktop', time: 'Hace 24s' },
  ]);

  return (
    <div style={{ marginBottom: 28 }}>
      {/* Header with live indicator */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 12, marginBottom: 20 }}>
        <div>
          <h2 className="section-title" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ position: 'relative', display: 'inline-flex', width: 12, height: 12 }}>
              <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'var(--neon)', opacity: 0.75, animation: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite' }} />
              <span style={{ position: 'relative', width: 12, height: 12, borderRadius: '50%', background: 'var(--neon)' }} />
            </span>
            Monitoreo en Tiempo Real (GA4 API Direct / MCP)
          </h2>
          <p className="section-subtitle">
            Tráfico en vivo en el portal web y blog oficial · Actualizado hace {lastUpdated}
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>
            🔄 Refresco en: <strong style={{ color: 'var(--text-neon)' }}>{countdown}s</strong>
          </div>
          <button
            onClick={() => setAutoRefresh(p => !p)}
            className={autoRefresh ? 'btn-neon' : 'btn-ghost'}
            style={{ fontSize: '0.72rem' }}
          >
            {autoRefresh ? 'PAUSAR EN VIVO' : 'REANUDAR EN VIVO'}
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div className="kpi-card" style={{ borderLeft: '4px solid var(--neon)' }}>
          <div className="kpi-label">Usuarios Activos en este Momento</div>
          <div className="kpi-value" style={{ fontSize: '2.2rem', color: 'var(--text-neon)', fontFamily: 'var(--font-heading)' }}>
            {activeUsers}
          </div>
          <div style={{ fontSize: '0.68rem', color: 'var(--success)' }}>🟢 84% navegando desde móviles</div>
        </div>

        <div className="kpi-card" style={{ borderLeft: '4px solid #60a5fa' }}>
          <div className="kpi-label">Páginas Vistas por Minuto</div>
          <div className="kpi-value" style={{ fontSize: '2.2rem', color: '#60a5fa', fontFamily: 'var(--font-heading)' }}>
            {pageViewsPerMin}
          </div>
          <div style={{ fontSize: '0.68rem', color: 'var(--text-secondary)' }}>📈 Ritmo de lectura alto</div>
        </div>

        <div className="kpi-card" style={{ borderLeft: '4px solid #f472b6' }}>
          <div className="kpi-label">Tasa de Rebote (Bounce Rate)</div>
          <div className="kpi-value" style={{ fontSize: '2.2rem', color: '#f472b6', fontFamily: 'var(--font-heading)' }}>
            {bounceRate}%
          </div>
          <div style={{ fontSize: '0.68rem', color: 'var(--success)' }}>-3.2% respecto a promedio diario</div>
        </div>
      </div>

      {/* Realtime Graph & Active Pages */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16, marginBottom: 24 }}>
        {/* Graph */}
        <div className="card" style={{ padding: 20 }}>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 14 }}>
            📊 Tráfico de Usuarios por Minuto (Última Hora)
          </h3>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 160, paddingBottom: 20, borderBottom: '1px solid var(--border-subtle)' }}>
            {trafficData.map((d, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <div
                  title={`${d.users} usuarios`}
                  style={{
                    width: '100%',
                    height: `${(d.users / 320) * 120}px`,
                    background: i === trafficData.length - 1 ? 'var(--neon)' : 'rgba(204, 255, 0, 0.3)',
                    borderRadius: 4,
                    transition: 'height 0.3s ease'
                  }}
                />
                <span style={{ fontSize: '0.58rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>{d.minute}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Active Pages */}
        <div className="card" style={{ padding: 20 }}>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 14 }}>
            🔥 Páginas Más Vistas Ahora
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { path: '/portal/alertas-viales', count: 134, pct: 41 },
              { path: '/directorio/emergencias-101', count: 82, pct: 25 },
              { path: '/tramites/licencia-conducir', count: 60, pct: 18 },
              { path: '/ig/post-104', count: 52, pct: 16 },
            ].map(p => (
              <div key={p.path}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', marginBottom: 4 }}>
                  <span style={{ fontFamily: 'monospace', color: 'var(--text-primary)' }}>{p.path}</span>
                  <span style={{ fontWeight: 800, color: 'var(--text-neon)' }}>{p.count} act.</span>
                </div>
                <div style={{ width: '100%', height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.05)' }}>
                  <div style={{ width: `${p.pct}%`, height: '100%', borderRadius: 2, background: 'var(--neon)' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Realtime Events Log Feed */}
      <div className="card" style={{ padding: 20 }}>
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 14 }}>
          ⚡ Log de Eventos en Tiempo Real (Pageview, Click, Conversión)
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {events.map(e => (
            <div key={e.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: 'rgba(255,255,255,0.02)', borderRadius: 8, fontSize: '0.72rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span className="badge badge-neon" style={{ fontSize: '0.6rem' }}>{e.type.toUpperCase()}</span>
                <span style={{ fontFamily: 'monospace', color: 'var(--text-primary)' }}>{e.page}</span>
              </div>
              <div style={{ display: 'flex', gap: 16, color: 'var(--text-muted)' }}>
                <span>{e.device}</span>
                <span>{e.country}</span>
                <span style={{ color: 'var(--text-secondary)', fontWeight: 700 }}>{e.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
