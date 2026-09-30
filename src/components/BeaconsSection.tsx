import React from 'react';
import type { BeaconsProfile, BeaconsLink } from '../types/dashboard';
import {
  IconBeacons, IconExternalLink, IconFacebook, IconInstagram, IconYoutube,
  IconTwitter, IconGlobe, IconWhatsapp, IconAward, IconTrendUp, IconUsers, IconEye, IconLink
} from './Sidebar';

interface BeaconsSectionProps {
  profile: BeaconsProfile;
  links: BeaconsLink[];
}

function getLinkIcon(platform: string) {
  switch (platform) {
    case 'facebook':  return <IconFacebook />;
    case 'instagram': return <IconInstagram />;
    case 'youtube':   return <IconYoutube />;
    case 'twitter':   return <IconTwitter />;
    case 'whatsapp':  return <IconWhatsapp />;
    case 'website':   return <IconGlobe />;
    default:          return <IconLink />;
  }
}

function getLinkColor(platform: string) {
  switch (platform) {
    case 'facebook':  return '#60a5fa';
    case 'instagram': return '#f472b6';
    case 'youtube':   return '#f87171';
    case 'twitter':   return '#93c5fd';
    case 'whatsapp':  return '#4ade80';
    case 'website':   return '#4ade80';
    default:          return '#ccff00';
  }
}

function getLinkBg(platform: string) {
  switch (platform) {
    case 'facebook':  return 'rgba(24,119,242,0.12)';
    case 'instagram': return 'rgba(225,48,108,0.12)';
    case 'youtube':   return 'rgba(255,0,0,0.10)';
    case 'twitter':   return 'rgba(29,161,242,0.10)';
    case 'whatsapp':  return 'rgba(37,211,102,0.10)';
    case 'website':   return 'rgba(34,197,94,0.10)';
    default:          return 'rgba(204,255,0,0.08)';
  }
}

export const BeaconsSection: React.FC<BeaconsSectionProps> = ({ profile, links }) => {
  const totalClicks = links.reduce((sum, l) => sum + l.clicks, 0);

  return (
    <div style={{ marginBottom: 28 }}>
      {/* Section Header */}
      <div style={{ marginBottom: 20 }}>
        <h2 className="section-title" style={{ fontSize: '1.05rem' }}>
          <IconBeacons />
          Beacons.ai — Hub de Links & Métricas de Conversión
        </h2>
        <p className="section-subtitle">
          Análisis de desempeño del perfil <strong style={{ color: 'var(--text-neon)' }}>beacons.ai/{profile.handle}</strong> — Directorio centralizado de canales de la Policía TDF
        </p>
      </div>

      {/* Beacons Profile Hero */}
      <div className="card card-neon" style={{ padding: 24, marginBottom: 20, background: 'linear-gradient(135deg, #1a1826 0%, #0f0d18 100%)', position: 'relative', overflow: 'hidden' }}>
        {/* BG glow */}
        <div style={{ position: 'absolute', top: -40, right: -40, width: 220, height: 220, borderRadius: '50%', background: 'radial-gradient(circle, rgba(204,255,0,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, alignItems: 'flex-start', position: 'relative' }}>
          {/* Profile Info */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, flex: 1, minWidth: 240 }}>
            <div style={{ width: 64, height: 64, borderRadius: 18, background: 'rgba(204,255,0,0.12)', border: '2px solid rgba(204,255,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--neon)', flexShrink: 0 }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.1rem', color: 'var(--text-primary)' }}>
                  {profile.displayName}
                </h3>
                <span className="badge badge-neon" style={{ fontSize: '0.6rem' }}>VERIFICADO</span>
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-neon)', fontFamily: 'monospace', marginTop: 2 }}>
                beacons.ai/{profile.handle}
              </div>
              <p style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: 4, lineHeight: 1.5, maxWidth: 380 }}>
                {profile.bio}
              </p>
              <div style={{ marginTop: 8 }}>
                <a
                  href={profile.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-neon"
                  style={{ fontSize: '0.72rem', padding: '6px 14px' }}
                >
                  Abrir Beacons.ai <IconExternalLink />
                </a>
              </div>
            </div>
          </div>

          {/* Profile Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, minWidth: 280 }}>
            {[
              { label: 'Clics Totales', value: profile.totalClicks.toLocaleString('es-AR'), change: `+${profile.clickGrowth}%`, icon: <IconLink />, color: 'var(--neon)' },
              { label: 'Visitantes Únicos', value: profile.uniqueVisitors.toLocaleString('es-AR'), change: '+18.2%', icon: <IconUsers />, color: '#60a5fa' },
              { label: 'Top Link (clics)', value: profile.topLinkClicks.toLocaleString('es-AR'), change: 'Sitio Web Oficial', icon: <IconEye />, color: '#4ade80' },
              { label: 'Tiempo Promedio', value: profile.avgTimeOnPage, change: 'En la página', icon: <IconTrendUp />, color: '#f59e0b' },
            ].map(stat => (
              <div key={stat.label} style={{ padding: '12px 14px', borderRadius: 12, background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6, color: stat.color }}>
                  {stat.icon}
                  <span style={{ fontSize: '0.62rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{stat.label}</span>
                </div>
                <div style={{ fontSize: '1.2rem', fontWeight: 900, fontFamily: 'var(--font-heading)', color: stat.color, lineHeight: 1 }}>{stat.value}</div>
                <div style={{ fontSize: '0.62rem', color: 'var(--text-muted)', marginTop: 4 }}>{stat.change}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Links Analytics Table */}
      <div className="card" style={{ padding: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
          <div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 7 }}>
              <span style={{ color: 'var(--neon)', display: 'inline-flex' }}><IconAward /></span>
              Análisis de Links — Tráfico y Conversión
            </h3>
            <p style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: 2 }}>Rendimiento de cada enlace en el hub Beacons.ai del perfil @{profile.handle}</p>
          </div>
          <span className="badge badge-neon">{links.length} Links Activos</span>
        </div>

        {/* Table Header */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '3fr 90px 90px 160px',
          gap: 12, padding: '8px 12px',
          borderRadius: 8, background: 'rgba(255,255,255,0.03)',
          border: '1px solid var(--border-subtle)', marginBottom: 8
        }}>
          {['Enlace / Descripción', 'Clics', 'CTR', 'Rendimiento'].map(h => (
            <div key={h} style={{ fontSize: '0.62rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</div>
          ))}
        </div>

        {/* Table Rows */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {links.sort((a, b) => b.clicks - a.clicks).map((link, idx) => {
            const color = getLinkColor(link.platform);
            const maxClicks = links[0]?.clicks || 1;
            return (
              <div
                key={link.id}
                className="channel-row"
                style={{ gridTemplateColumns: '3fr 90px 90px 160px', display: 'grid', gap: 12, alignItems: 'center', cursor: 'default' }}
              >
                {/* Link Info */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
                  <div style={{ width: 34, height: 34, borderRadius: 10, background: getLinkBg(link.platform), display: 'flex', alignItems: 'center', justifyContent: 'center', color, flexShrink: 0 }}>
                    {getLinkIcon(link.platform)}
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontWeight: 700, fontSize: '0.78rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 6 }}>
                      {link.title}
                      {idx === 0 && <span className="badge badge-neon" style={{ fontSize: '0.55rem', padding: '1px 6px' }}>TOP</span>}
                    </div>
                    <a href={link.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.62rem', color: 'var(--text-muted)', fontFamily: 'monospace', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block', maxWidth: 220 }}>
                      {link.url.replace('https://', '')}
                    </a>
                  </div>
                </div>

                {/* Clicks */}
                <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '0.92rem', color }}>
                  {link.clicks.toLocaleString('es-AR')}
                </div>

                {/* CTR */}
                <div style={{ fontSize: '0.8rem', fontWeight: 800, color: link.clickRate > 20 ? 'var(--success)' : 'var(--text-secondary)' }}>
                  {link.clickRate.toFixed(1)}%
                </div>

                {/* Progress Bar */}
                <div>
                  <div className="progress-track">
                    <div className="progress-fill" style={{ width: `${(link.clicks / maxClicks) * 100}%`, background: color }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary Footer */}
        <div style={{ marginTop: 16, padding: '10px 14px', borderRadius: 10, background: 'var(--neon-bg)', border: '1px solid var(--border-neon)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.72rem' }}>
          <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>
            🔗 Total de clics registrados en el período:
          </span>
          <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '1rem', color: 'var(--neon)' }}>
            {totalClicks.toLocaleString('es-AR')} clics
          </span>
        </div>
      </div>

      {/* Usage Recommendation */}
      <div style={{ marginTop: 16, padding: '16px 20px', borderRadius: 14, background: 'rgba(100,149,255,0.06)', border: '1px solid rgba(100,149,255,0.25)' }}>
        <h4 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.85rem', color: '#93c5fd', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 7 }}>
          <IconBeacons /> Recomendación: Actualizar Beacons.ai como Enlace Único en Bios de Redes
        </h4>
        <p style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          Reemplazar los múltiples links en la bio de Instagram y X por el link único <strong style={{ color: 'var(--text-neon)' }}>beacons.ai/policiatdf</strong> centralizaría el tráfico y aumentaría la trazabilidad de cada canal. Los datos muestran que el <strong style={{ color: 'var(--text-primary)' }}>Sitio Web Oficial</strong> (38.7% CTR) y <strong style={{ color: 'var(--text-primary)' }}>Facebook</strong> (25.6% CTR) son los destinos más demandados desde el Hub.
        </p>
      </div>
    </div>
  );
};
