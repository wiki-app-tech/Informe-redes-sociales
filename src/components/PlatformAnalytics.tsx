import React from 'react';
import type { SocialAccount, MonthlyTrend, CategoryBreakdown, LocationDistribution } from '../types/dashboard';
import { IconFacebook, IconInstagram, IconYoutube, IconTwitter, IconGlobe, IconBeacons, IconExternalLink, IconCheck, IconTrendUp, IconBarChart, IconActivity, IconThumbUp } from './Sidebar';

// ── PLATFORM OVERVIEW CARDS ────────────────────────────────────────────────────
interface PlatformCardsProps {
  accounts: SocialAccount[];
}

function getPlatformStyle(platform: string): { badge: string; color: string; icon: React.ReactNode; bg: string } {
  switch (platform) {
    case 'facebook':  return { badge: 'badge-fb', color: '#60a5fa', icon: <IconFacebook />, bg: 'rgba(24,119,242,0.1)' };
    case 'instagram': return { badge: 'badge-ig', color: '#f472b6', icon: <IconInstagram />, bg: 'linear-gradient(135deg,rgba(225,48,108,0.12),rgba(245,96,64,0.12))' };
    case 'youtube':   return { badge: 'badge-yt', color: '#f87171', icon: <IconYoutube />, bg: 'rgba(255,0,0,0.10)' };
    case 'twitter':   return { badge: 'badge-info', color: '#93c5fd', icon: <IconTwitter />, bg: 'rgba(29,161,242,0.10)' };
    case 'website':   return { badge: 'badge-success', color: '#4ade80', icon: <IconGlobe />, bg: 'rgba(34,197,94,0.10)' };
    case 'beacons':   return { badge: 'badge-bc', color: '#d4ff00', icon: <IconBeacons />, bg: 'rgba(204,255,0,0.08)' };
    default:          return { badge: 'badge-info', color: '#93c5fd', icon: <IconGlobe />, bg: 'rgba(100,149,255,0.10)' };
  }
}

export const PlatformCards: React.FC<PlatformCardsProps> = ({ accounts }) => {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ marginBottom: 16 }}>
        <h2 className="section-title"><IconGlobe />Canales Oficiales — Desempeño Comparado</h2>
        <p className="section-subtitle">Audiencia, alcance y engagement por plataforma digital</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 14 }}>
        {accounts.map(acc => {
          const s = getPlatformStyle(acc.platform);
          return (
            <div key={acc.id} className="card" style={{ padding: 18 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 38, height: 38, borderRadius: 11, background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.color, flexShrink: 0 }}>
                    {s.icon}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.82rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 5 }}>
                      {acc.name}
                      {acc.verified && <span style={{ color: '#6495ff' }}><IconCheck /></span>}
                    </div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>{acc.handle}</div>
                  </div>
                </div>
                <span className={`badge ${s.badge}`}>{acc.platform.toUpperCase()}</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14, padding: '10px 12px', background: 'rgba(255,255,255,0.03)', borderRadius: 10, border: '1px solid var(--border-subtle)' }}>
                <div>
                  <div style={{ fontSize: '0.62rem', color: 'var(--text-muted)', marginBottom: 2, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Seguidores</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 900, fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>
                    {acc.followers > 0 ? acc.followers.toLocaleString('es-AR') : 'Abierto'}
                  </div>
                  <div style={{ fontSize: '0.65rem', color: 'var(--success)', fontWeight: 700 }}>+{acc.growthRate}%/mes</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.62rem', color: 'var(--text-muted)', marginBottom: 2, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Alcance/mes</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 900, fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>
                    {acc.monthlyReach.toLocaleString('es-AR')}
                  </div>
                  <div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', fontWeight: 600 }}>{acc.monthlyPosts} posts/mes</div>
                </div>
              </div>

              {acc.engagementRate > 0 && (
                <div style={{ marginBottom: 14 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', marginBottom: 5 }}>
                    <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>Engagement Rate</span>
                    <span style={{ color: s.color, fontWeight: 800 }}>{acc.engagementRate}%</span>
                  </div>
                  <div className="progress-track">
                    <div className="progress-fill" style={{ width: `${Math.min(acc.engagementRate * 8, 100)}%`, background: s.color }} />
                  </div>
                </div>
              )}

              <a
                href={acc.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                  padding: '8px 12px', borderRadius: 9, border: `1px solid ${s.color}30`,
                  background: `${s.color}08`, color: s.color, fontSize: '0.73rem', fontWeight: 700,
                  textDecoration: 'none', transition: 'all 0.15s', width: '100%'
                }}
              >
                Visitar Perfil Oficial <IconExternalLink />
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ── ANALYTICS CHARTS ────────────────────────────────────────────────────────
interface AnalyticsChartsProps {
  trends: MonthlyTrend[];
  categories: CategoryBreakdown[];
  locations: LocationDistribution[];
}

export const AnalyticsCharts: React.FC<AnalyticsChartsProps> = ({ trends, categories, locations }) => {
  const maxFb = Math.max(...trends.map(t => t.facebookReach));
  const maxIg = Math.max(...trends.map(t => t.instagramReach));
  const maxReach = Math.max(maxFb, maxIg);
  const W = 460, H = 160, PAD = 30;
  const chartW = W - PAD * 2;
  const chartH = H - PAD;

  const fbPath = trends.map((t, i) => {
    const x = PAD + (i / (trends.length - 1)) * chartW;
    const y = PAD + (1 - t.facebookReach / maxReach) * chartH;
    return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');

  const igPath = trends.map((t, i) => {
    const x = PAD + (i / (trends.length - 1)) * chartW;
    const y = PAD + (1 - t.instagramReach / maxReach) * chartH;
    return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');

  const fbFill = trends.map((t, i) => {
    const x = PAD + (i / (trends.length - 1)) * chartW;
    const y = PAD + (1 - t.facebookReach / maxReach) * chartH;
    return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ') + ` L ${PAD + chartW} ${PAD + chartH} L ${PAD} ${PAD + chartH} Z`;

  const igFill = trends.map((t, i) => {
    const x = PAD + (i / (trends.length - 1)) * chartW;
    const y = PAD + (1 - t.instagramReach / maxReach) * chartH;
    return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ') + ` L ${PAD + chartW} ${PAD + chartH} L ${PAD} ${PAD + chartH} Z`;

  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ marginBottom: 16 }}>
        <h2 className="section-title"><IconBarChart />Análisis de Tendencias y Demografía</h2>
        <p className="section-subtitle">Evolución semestral del alcance digital por plataforma</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16, marginBottom: 16 }}>
        {/* SVG Trend Chart */}
        <div className="card" style={{ padding: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                Alcance Mensual — Mar a Ago 2026
              </h3>
              <p style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: 2 }}>Impresiones únicas totales por plataforma</p>
            </div>
            <div style={{ display: 'flex', gap: 14, fontSize: '0.68rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#60a5fa', fontWeight: 700 }}>
                <span style={{ width: 10, height: 10, borderRadius: 3, background: '#60a5fa' }} /> Facebook
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#f472b6', fontWeight: 700 }}>
                <span style={{ width: 10, height: 10, borderRadius: 3, background: '#f472b6' }} /> Instagram
              </span>
            </div>
          </div>

          <svg viewBox={`0 0 ${W} ${H + 20}`} width="100%" style={{ overflow: 'visible' }}>
            <defs>
              <linearGradient id="fbGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.25"/>
                <stop offset="100%" stopColor="#60a5fa" stopOpacity="0"/>
              </linearGradient>
              <linearGradient id="igGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f472b6" stopOpacity="0.25"/>
                <stop offset="100%" stopColor="#f472b6" stopOpacity="0"/>
              </linearGradient>
            </defs>

            {/* Grid */}
            {[0.25, 0.5, 0.75, 1].map(v => (
              <line key={v} x1={PAD} y1={PAD + (1 - v) * chartH} x2={PAD + chartW} y2={PAD + (1 - v) * chartH}
                stroke="rgba(255,255,255,0.05)" strokeDasharray="4" />
            ))}

            {/* Fill areas */}
            <path d={fbFill} fill="url(#fbGrad)" />
            <path d={igFill} fill="url(#igGrad)" />

            {/* Lines */}
            <path d={fbPath} fill="none" stroke="#60a5fa" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d={igPath} fill="none" stroke="#f472b6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

            {/* Data Points & Labels */}
            {trends.map((t, i) => {
              const x = PAD + (i / (trends.length - 1)) * chartW;
              const yFb = PAD + (1 - t.facebookReach / maxReach) * chartH;
              const yIg = PAD + (1 - t.instagramReach / maxReach) * chartH;
              return (
                <g key={t.month}>
                  <circle cx={x} cy={yFb} r="4" fill="#60a5fa" />
                  <circle cx={x} cy={yIg} r="4" fill="#f472b6" />
                  <text x={x} y={H + 14} fill="var(--text-muted)" fontSize="10" textAnchor="middle" fontFamily="var(--font-body)">{t.month}</text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Category Breakdown */}
        <div className="card" style={{ padding: 20 }}>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)', marginBottom: 4 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 7 }}><IconActivity /> Distribución Temática</span>
          </h3>
          <p style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginBottom: 16 }}>Tipos de contenido publicado por la OCI</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {categories.map(cat => (
              <div key={cat.category}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', marginBottom: 4 }}>
                  <span style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>{cat.label}</span>
                  <span style={{ fontWeight: 800, color: cat.color }}>{cat.percentage}%</span>
                </div>
                <div className="progress-track">
                  <div className="progress-fill" style={{ width: `${cat.percentage}%`, background: cat.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Location & Sentiment Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr', gap: 16 }}>
        {/* Location Bars */}
        <div className="card" style={{ padding: 20 }}>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)', marginBottom: 4 }}>
            Audiencia por Localidad — Tierra del Fuego
          </h3>
          <p style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginBottom: 16 }}>Distribución estimada de seguidores según geo-localización</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12 }}>
            {locations.map(loc => (
              <div key={loc.city} style={{ padding: '14px 16px', borderRadius: 12, background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginBottom: 4 }}>{loc.city}</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 900, fontFamily: 'var(--font-heading)', color: loc.color }}>{loc.percentage}%</div>
                <div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', marginTop: 4 }}>~{loc.followersCount.toLocaleString('es-AR')} seguidores</div>
              </div>
            ))}
          </div>
        </div>

        {/* Sentiment Gauge */}
        <div className="card" style={{ padding: 20, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.88rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 7, marginBottom: 4 }}>
              <IconThumbUp /> Sentimiento Ciudadano
            </h3>
            <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginBottom: 16 }}>Índice de comentarios favorables</p>
          </div>

          <div style={{ textAlign: 'center', padding: '16px 0' }}>
            <div style={{ fontSize: '3rem', fontWeight: 900, fontFamily: 'var(--font-heading)', color: 'var(--neon)', lineHeight: 1 }}>91.8%</div>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--success)', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: 6 }}>Favorable</div>
          </div>

          <div style={{ padding: '10px 12px', borderRadius: 10, background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)', fontSize: '0.68rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            Valorado por: Alertas viales en tiempo real e intervenciones del G.E.B.yR. en zonas agrestes.
          </div>
        </div>
      </div>
    </div>
  );
};
