import React from 'react';
import { COMPETITORS } from '../data/institutionalData';
import { IconExternalLink, IconGlobe, IconBarChart, IconCheck, IconTrendUp } from './Sidebar';

// ── 1. COMPARATIVA INSTITUCIONAL (BENCHMARKING) ──────────────────────────────
export const ComparativaSection: React.FC = () => {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ marginBottom: 20 }}>
        <h2 className="section-title"><IconBarChart />Comparativa de Competencias e Instituciones (Benchmarking)</h2>
        <p className="section-subtitle">Evaluación comparativa contra la Policía de Córdoba, Policía de la Ciudad (CABA) y Policía Nacional de España</p>
      </div>

      {/* Competitors Overview Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16, marginBottom: 24 }}>
        {COMPETITORS.map(comp => (
          <div key={comp.id} className="card" style={{ padding: 20, borderColor: comp.id === 'tdf' ? 'var(--neon)' : 'var(--border-subtle)', background: comp.id === 'tdf' ? 'rgba(204,255,0,0.03)' : 'var(--bg-card)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: '1.4rem' }}>{comp.flag}</span>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '0.88rem', color: 'var(--text-primary)' }}>{comp.name}</h3>
                  <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{comp.province}</div>
                </div>
              </div>
              {comp.id === 'tdf' && <span className="badge badge-neon">NUESTRA FUERZA</span>}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14, padding: 10, background: 'rgba(255,255,255,0.03)', borderRadius: 10 }}>
              <div>
                <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Seguidores IG</div>
                <div style={{ fontSize: '1rem', fontWeight: 900, color: 'var(--text-primary)' }}>{comp.followers.instagram.toLocaleString('es-AR')}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Engagement</div>
                <div style={{ fontSize: '1rem', fontWeight: 900, color: comp.accentColor }}>{comp.engagementRate}%</div>
              </div>
            </div>

            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginBottom: 4 }}>Tipos de Contenido Destacados:</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                {comp.contentTypes.map(ct => (
                  <span key={ct} style={{ padding: '2px 6px', borderRadius: 4, background: 'rgba(255,255,255,0.05)', fontSize: '0.6rem', color: 'var(--text-secondary)' }}>
                    {ct}
                  </span>
                ))}
              </div>
            </div>

            <a href={comp.url} target="_blank" rel="noopener noreferrer" className="btn-ghost" style={{ fontSize: '0.7rem', width: '100%', justifyContent: 'center' }}>
              Visitar Portal Oficial <IconExternalLink />
            </a>
          </div>
        ))}
      </div>

      {/* Detailed Benchmark Table */}
      <div className="card" style={{ padding: 20 }}>
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 14 }}>
          Tabla Comparativa Rendimiento Digital
        </h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.75rem' }}>
            <thead>
              <tr style={{ background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid var(--border-subtle)' }}>
                <th style={{ padding: 10, textAlign: 'left' }}>Institución</th>
                <th style={{ padding: 10, textAlign: 'right' }}>Facebook</th>
                <th style={{ padding: 10, textAlign: 'right' }}>Instagram</th>
                <th style={{ padding: 10, textAlign: 'right' }}>Posts / Mes</th>
                <th style={{ padding: 10, textAlign: 'right' }}>Engagement</th>
                <th style={{ padding: 10, textAlign: 'center' }}>Tiempo Respuesta</th>
              </tr>
            </thead>
            <tbody>
              {COMPETITORS.map(comp => (
                <tr key={comp.id} style={{ borderBottom: '1px solid var(--border-subtle)', background: comp.id === 'tdf' ? 'rgba(204,255,0,0.04)' : 'transparent' }}>
                  <td style={{ padding: 10, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span>{comp.flag}</span>
                    <span>{comp.shortName}</span>
                  </td>
                  <td style={{ padding: 10, textAlign: 'right' }}>{comp.followers.facebook.toLocaleString('es-AR')}</td>
                  <td style={{ padding: 10, textAlign: 'right' }}>{comp.followers.instagram.toLocaleString('es-AR')}</td>
                  <td style={{ padding: 10, textAlign: 'right' }}>{comp.monthlyPosts}</td>
                  <td style={{ padding: 10, textAlign: 'right', fontWeight: 800, color: comp.accentColor }}>{comp.engagementRate}%</td>
                  <td style={{ padding: 10, textAlign: 'center', color: 'var(--text-secondary)' }}>{comp.responseTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};


// ── 2. INTEGRACIONES DE DATOS ──────────────────────────────────────────────────
export const IntegracionesSection: React.FC = () => {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ marginBottom: 20 }}>
        <h2 className="section-title"><IconGlobe />Estado de Integraciones y APIs (Metricool TDF Hub)</h2>
        <p className="section-subtitle">Conexiones activas e integraciones institucionales para reporte de datos</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
        {[
          { name: 'Meta Graph API (Facebook / Instagram)', status: 'Conectado', color: 'var(--success)', desc: 'Extracción de impresiones, likes y métricas de Reels.', icon: '🟢' },
          { name: 'Beacons.ai Analytics API', status: 'Conectado', color: 'var(--success)', desc: 'Trazabilidad de clics en el hub @policiatdf.', icon: '🟢' },
          { name: 'Portal Web (policia.tierradelfuego.gob.ar)', status: 'Conectado', color: 'var(--success)', desc: 'Sincronización RSS de comunicados y noticias viales.', icon: '🟢' },
          { name: 'YouTube Data API v3', status: 'Conectado', color: 'var(--success)', desc: 'Conteo de visualizaciones de videos y Shorts.', icon: '🟢' },
          { name: 'WhatsApp Institucional', status: 'No habilitado', color: 'var(--text-muted)', desc: 'Sin canal oficial de WhatsApp activo.', icon: '⚪' },
        ].map(item => (
          <div key={item.name} className="card" style={{ padding: 18 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <span style={{ fontWeight: 800, fontSize: '0.85rem', color: 'var(--text-primary)' }}>{item.name}</span>
              <span style={{ fontSize: '0.7rem', color: item.color, fontWeight: 700 }}>{item.icon} {item.status}</span>
            </div>
            <p style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
