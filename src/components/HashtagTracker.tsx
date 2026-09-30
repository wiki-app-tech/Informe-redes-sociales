import React, { useState } from 'react';
import { IconSearch, IconFilter, IconCheck, IconTrendUp } from './Sidebar';

interface HashtagItem {
  id: string;
  tag: string;
  platform: 'X/Twitter' | 'Instagram' | 'Ambas';
  postsCount: number;
  reach: number;
  engagement: number;
  alertThreshold: number;
  isAlertActive: boolean;
}

export const HashtagTracker: React.FC = () => {
  const [hashtags, setHashtags] = useState<HashtagItem[]>([
    { id: '1', tag: '#PolicíaTDF', platform: 'Ambas', postsCount: 1420, reach: 1850000, engagement: 8.4, alertThreshold: 50, isAlertActive: true },
    { id: '2', tag: '#SeguridadVialTDF', platform: 'Instagram', postsCount: 680, reach: 920000, engagement: 7.2, alertThreshold: 30, isAlertActive: true },
    { id: '3', tag: '#TierraDelFuego', platform: 'X/Twitter', postsCount: 3200, reach: 4100000, engagement: 5.1, alertThreshold: 100, isAlertActive: false },
    { id: '4', tag: '#GEBYRRescate', platform: 'Instagram', postsCount: 290, reach: 480000, engagement: 9.8, alertThreshold: 15, isAlertActive: true },
  ]);

  const [newTag, setNewTag] = useState('');
  const [newPlatform, setNewPlatform] = useState<'X/Twitter' | 'Instagram' | 'Ambas'>('Ambas');

  const handleAddHashtag = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTag.trim()) return;
    const formatted = newTag.startsWith('#') ? newTag.trim() : `#${newTag.trim()}`;
    setHashtags(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        tag: formatted,
        platform: newPlatform,
        postsCount: Math.floor(Math.random() * 300) + 50,
        reach: Math.floor(Math.random() * 200000) + 10000,
        engagement: Number((Math.random() * 5 + 4).toFixed(1)),
        alertThreshold: 40,
        isAlertActive: true
      }
    ]);
    setNewTag('');
  };

  const toggleAlert = (id: string) => {
    setHashtags(prev => prev.map(h => h.id === id ? { ...h, isAlertActive: !h.isAlertActive } : h));
  };

  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ marginBottom: 20 }}>
        <h2 className="section-title">🏷️ Monitor y Tracking de Hashtags</h2>
        <p className="section-subtitle">Seguimiento de volumen, alcance y alertas en tiempo real en X/Twitter e Instagram</p>
      </div>

      {/* Add Hashtag Form */}
      <form onSubmit={handleAddHashtag} className="card" style={{ padding: 18, marginBottom: 20, display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ flex: 1, minWidth: 200 }}>
          <input
            type="text"
            placeholder="Ingrese hashtag (ej: #OperativoInvierno)..."
            value={newTag}
            onChange={e => setNewTag(e.target.value)}
            className="input-dark"
          />
        </div>
        <div>
          <select value={newPlatform} onChange={e => setNewPlatform(e.target.value as any)} className="input-dark" style={{ width: 140 }}>
            <option value="Ambas">Ambas redes</option>
            <option value="Instagram">Instagram</option>
            <option value="X/Twitter">X / Twitter</option>
          </select>
        </div>
        <button type="submit" className="btn-neon">
          ➕ Agregar Hashtag a Monitorear
        </button>
      </form>

      {/* Hashtags Data Table */}
      <div className="card" style={{ padding: 20 }}>
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 14 }}>
          📊 Hashtags Monitoreados
        </h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.75rem' }}>
            <thead>
              <tr style={{ background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid var(--border-subtle)' }}>
                <th style={{ padding: 10, textAlign: 'left' }}>Hashtag</th>
                <th style={{ padding: 10, textAlign: 'left' }}>Plataforma</th>
                <th style={{ padding: 10, textAlign: 'right' }}>Posts Registrados</th>
                <th style={{ padding: 10, textAlign: 'right' }}>Alcance Estimado</th>
                <th style={{ padding: 10, textAlign: 'right' }}>Engagement Rate</th>
                <th style={{ padding: 10, textAlign: 'center' }}>Alerta Volumétrica</th>
              </tr>
            </thead>
            <tbody>
              {hashtags.map(h => (
                <tr key={h.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <td style={{ padding: 10, fontWeight: 800, color: 'var(--text-neon)' }}>{h.tag}</td>
                  <td style={{ padding: 10 }}>{h.platform}</td>
                  <td style={{ padding: 10, textAlign: 'right', fontWeight: 700 }}>{h.postsCount.toLocaleString('es-AR')}</td>
                  <td style={{ padding: 10, textAlign: 'right' }}>{h.reach.toLocaleString('es-AR')}</td>
                  <td style={{ padding: 10, textAlign: 'right', fontWeight: 800, color: '#4ade80' }}>{h.engagement}%</td>
                  <td style={{ padding: 10, textAlign: 'center' }}>
                    <button
                      onClick={() => toggleAlert(h.id)}
                      className={h.isAlertActive ? 'btn-neon' : 'btn-ghost'}
                      style={{ padding: '2px 8px', fontSize: '0.62rem' }}
                    >
                      {h.isAlertActive ? `🔔 > ${h.alertThreshold}/h (Activo)` : '🔕 Inactivo'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
