import React, { useState } from 'react';
import { IconInstagram, IconExternalLink, IconLink, IconCheck } from './Sidebar';

interface LinkablePost {
  id: string;
  thumbnailUrl: string;
  caption: string;
  targetUrl: string;
  slug: string;
  clicks: number;
}

export const InstagramLinkManager: React.FC = () => {
  const [posts, setPosts] = useState<LinkablePost[]>([
    {
      id: 'ig-104',
      thumbnailUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=300&h=300&fit=crop',
      caption: '🚗❄️ Reporte de transitabilidad de la Ruta Nacional N° 3.',
      targetUrl: 'https://policia.tierradelfuego.gob.ar/reporte-vial-rn3',
      slug: 'post-104',
      clicks: 1420
    },
    {
      id: 'ig-103',
      thumbnailUrl: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=300&h=300&fit=crop',
      caption: '🏔️ Grupo GEBYR efectúa rescate en la Laguna del Caminante.',
      targetUrl: 'https://policia.tierradelfuego.gob.ar/gebyr-operativo-caminante',
      slug: 'post-103',
      clicks: 890
    },
    {
      id: 'ig-102',
      thumbnailUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=300&h=300&fit=crop',
      caption: '👮‍♀️ Convocatoria de inscripción a la Escuela de Cadetes 2026.',
      targetUrl: 'https://policia.tierradelfuego.gob.ar/inscripciones-cadetes',
      slug: 'post-102',
      clicks: 2150
    }
  ]);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [tempUrl, setTempUrl] = useState('');

  const startEdit = (post: LinkablePost) => {
    setEditingId(post.id);
    setTempUrl(post.targetUrl);
  };

  const saveUrl = (id: string) => {
    setPosts(prev => prev.map(p => p.id === id ? { ...p, targetUrl: tempUrl } : p));
    setEditingId(null);
  };

  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ marginBottom: 20 }}>
        <h2 className="section-title">📲 Instagram Linkable Images & Landing Page Generator</h2>
        <p className="section-subtitle">Convierte el feed de Instagram en una landing page interactiva con seguimiento de clicks por imagen</p>
      </div>

      {/* Landing Page Link Header */}
      <div className="card" style={{ padding: 18, marginBottom: 20, borderLeft: '4px solid #e1306c', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <div style={{ fontSize: '0.68rem', color: '#e1306c', fontWeight: 800, textTransform: 'uppercase' }}>Tu Landing Page de Bio Generada:</div>
          <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'monospace', marginTop: 2 }}>
            https://policiatdf.gob.ar/ig
          </div>
        </div>
        <a href="https://beacons.ai/policiatdf" target="_blank" rel="noopener noreferrer" className="btn-neon" style={{ fontSize: '0.72rem' }}>
          🌐 Ver Landing Page Pública <IconExternalLink />
        </a>
      </div>

      {/* Grid of Linkable Posts */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
        {posts.map(post => (
          <div key={post.id} className="card" style={{ padding: 16 }}>
            <div style={{ position: 'relative', height: 180, borderRadius: 10, overflow: 'hidden', marginBottom: 12 }}>
              <img src={post.thumbnailUrl} alt={post.caption} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', top: 8, right: 8, background: 'rgba(15,13,19,0.85)', padding: '4px 8px', borderRadius: 999, fontSize: '0.62rem', fontWeight: 800, color: 'var(--text-neon)' }}>
                👆 {post.clicks.toLocaleString('es-AR')} Clicks
              </div>
            </div>

            <p style={{ fontSize: '0.75rem', color: 'var(--text-primary)', fontWeight: 600, lineHeight: 1.4, marginBottom: 10, height: 36, overflow: 'hidden' }}>
              {post.caption}
            </p>

            <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: 10 }}>
              <label style={{ display: 'block', fontSize: '0.62rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: 4 }}>URL de Destino al Hacer Click:</label>

              {editingId === post.id ? (
                <div style={{ display: 'flex', gap: 6 }}>
                  <input
                    type="text"
                    value={tempUrl}
                    onChange={e => setTempUrl(e.target.value)}
                    className="input-dark"
                    style={{ fontSize: '0.7rem' }}
                  />
                  <button onClick={() => saveUrl(post.id)} className="btn-neon" style={{ padding: '4px 8px', fontSize: '0.65rem' }}>
                    Guardar
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.68rem', fontFamily: 'monospace', color: 'var(--text-neon)', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', maxWidth: 180 }}>
                    {post.targetUrl}
                  </span>
                  <button onClick={() => startEdit(post)} className="btn-ghost" style={{ padding: '2px 6px', fontSize: '0.62rem' }}>
                    ✏️ Editar Link
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
