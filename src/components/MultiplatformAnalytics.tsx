import React, { useState } from 'react';
import { IconGlobe, IconFilter, IconBarChart, IconCheck } from './Sidebar';

type PlatformId = 'instagram' | 'tiktok' | 'facebook' | 'twitter' | 'linkedin' | 'youtube' | 'web' | 'meta_ads' | 'google_ads';

interface PlatformData {
  id: PlatformId;
  name: string;
  color: string;
  reach: number;
  impressions: number;
  engagement: number;
  clicks: number;
  spend?: number;
}

const ALL_PLATFORMS: PlatformData[] = [
  { id: 'instagram', name: 'Instagram', color: '#e1306c', reach: 189000, impressions: 340000, engagement: 7.8, clicks: 12400 },
  { id: 'facebook',  name: 'Facebook',  color: '#1877f2', reach: 245000, impressions: 480000, engagement: 6.2, clicks: 18900 },
  { id: 'tiktok',    name: 'TikTok',    color: '#8b5cf6', reach: 310000, impressions: 620000, engagement: 9.1, clicks: 21500 },
  { id: 'twitter',   name: 'Twitter / X', color: '#94a3b8', reach: 89000, impressions: 145000, engagement: 4.5, clicks: 4200 },
  { id: 'linkedin',  name: 'LinkedIn',  color: '#0ea5e9', reach: 45000,  impressions: 78000,  engagement: 5.4, clicks: 3100 },
  { id: 'youtube',   name: 'YouTube',   color: '#ef4444', reach: 128000, impressions: 290000, engagement: 8.4, clicks: 9400 },
  { id: 'web',       name: 'Web / Blog GA4', color: '#ccff00', reach: 165000, impressions: 380000, engagement: 12.1, clicks: 45200 },
  { id: 'meta_ads',  name: 'Meta Ads',  color: '#ec4899', reach: 420000, impressions: 890000, engagement: 3.8, clicks: 32000, spend: 450 },
  { id: 'google_ads', name: 'Google Ads', color: '#f59e0b', reach: 210000, impressions: 410000, engagement: 4.1, clicks: 19800, spend: 320 },
];

export const MultiplatformAnalytics: React.FC = () => {
  const [selectedIds, setSelectedIds] = useState<PlatformId[]>([
    'instagram', 'facebook', 'tiktok', 'youtube', 'web', 'meta_ads'
  ]);
  const [timeRange, setTimeRange] = useState('30d');

  const togglePlatform = (id: PlatformId) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const activePlatforms = ALL_PLATFORMS.filter(p => selectedIds.includes(p.id));

  const totalReach = activePlatforms.reduce((a, b) => a + b.reach, 0);
  const totalImpressions = activePlatforms.reduce((a, b) => a + b.impressions, 0);
  const totalClicks = activePlatforms.reduce((a, b) => a + b.clicks, 0);
  const totalSpend = activePlatforms.reduce((a, b) => a + (b.spend || 0), 0);
  const avgEngagement = activePlatforms.length
    ? (activePlatforms.reduce((a, b) => a + b.engagement, 0) / activePlatforms.length).toFixed(1)
    : '0.0';

  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ marginBottom: 20 }}>
        <h2 className="section-title">📊 Analytics Multi-Plataforma Unificado</h2>
        <p className="section-subtitle">Consolidado multi-canal: Redes sociales orgánicas, tráfico Web GA4 y Pauta Publicitaria</p>
      </div>

      {/* Platform Selector Checkboxes */}
      <div className="card" style={{ padding: 18, marginBottom: 20 }}>
        <div style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: 12 }}>
          Seleccionar Plataformas a Analizar:
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          {ALL_PLATFORMS.map(p => {
            const isChecked = selectedIds.includes(p.id);
            return (
              <button
                key={p.id}
                onClick={() => togglePlatform(p.id)}
                style={{
                  padding: '6px 14px', borderRadius: 999, border: 'none', cursor: 'pointer', fontSize: '0.72rem', fontWeight: 700,
                  display: 'flex', alignItems: 'center', gap: 6,
                  background: isChecked ? `${p.color}25` : 'var(--bg-card)',
                  color: isChecked ? p.color : 'var(--text-muted)',
                  borderWidth: 1, borderStyle: 'solid', borderColor: isChecked ? p.color : 'var(--border-subtle)'
                }}
              >
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: p.color }} />
                {p.name}
                {isChecked && <span>✓</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Unified Metrics Bar */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14, marginBottom: 24 }}>
        <div className="kpi-card">
          <div className="kpi-label">Alcance Total Consolidado</div>
          <div className="kpi-value" style={{ color: 'var(--text-neon)' }}>{totalReach.toLocaleString('es-AR')}</div>
          <div style={{ fontSize: '0.65rem', color: 'var(--success)' }}>En {selectedIds.length} canales activos</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Impresiones Totales</div>
          <div className="kpi-value" style={{ color: '#60a5fa' }}>{totalImpressions.toLocaleString('es-AR')}</div>
          <div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)' }}>Frecuencia prom: 2.1x</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Clicks & Conversiones</div>
          <div className="kpi-value" style={{ color: '#4ade80' }}>{totalClicks.toLocaleString('es-AR')}</div>
          <div style={{ fontSize: '0.65rem', color: 'var(--success)' }}>CTR prom: 4.8%</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Engagement Rate Promedio</div>
          <div className="kpi-value" style={{ color: '#f472b6' }}>{avgEngagement}%</div>
          <div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)' }}>Top: TikTok (9.1%)</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Inversión Publicitaria</div>
          <div className="kpi-value" style={{ color: '#f59e0b' }}>${totalSpend.toLocaleString('es-AR')} USD</div>
          <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Meta Ads + Google Ads</div>
        </div>
      </div>

      {/* Comparative Bar Chart Visualizer */}
      <div className="card" style={{ padding: 20 }}>
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 16 }}>
          📈 Comparativa de Alcance e Impresiones por Canal
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {activePlatforms.map(p => (
            <div key={p.id}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: 4 }}>
                <span style={{ fontWeight: 700, color: p.color }}>{p.name}</span>
                <span style={{ color: 'var(--text-secondary)' }}>
                  Alcance: <strong style={{ color: 'var(--text-primary)' }}>{p.reach.toLocaleString('es-AR')}</strong> · Engagement: <strong style={{ color: p.color }}>{p.engagement}%</strong>
                </span>
              </div>
              <div style={{ width: '100%', height: 12, borderRadius: 6, background: 'rgba(255,255,255,0.04)', overflow: 'hidden' }}>
                <div style={{ width: `${(p.reach / 420000) * 100}%`, height: '100%', borderRadius: 6, background: p.color }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
