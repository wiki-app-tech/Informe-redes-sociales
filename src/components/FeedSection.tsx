import React, { useState } from 'react';
import type { SocialPost, CityFilter } from '../types/dashboard';
import {
  IconFacebook, IconInstagram, IconGlobe, IconSearch, IconFilter,
  IconHeart, IconShare, IconMessageSq, IconEye, IconExternalLink, IconShield, IconMapPin, IconSiren, IconCar, IconAward
} from './Sidebar';

interface FeedProps {
  posts: SocialPost[];
  selectedCity: CityFilter;
}

export const SocialFeed: React.FC<FeedProps> = ({ posts, selectedCity }) => {
  const [platform, setPlatform] = useState<string>('all');
  const [category, setCategory] = useState<string>('all');
  const [search, setSearch] = useState('');

  const filtered = posts.filter(p => {
    if (selectedCity !== 'todas' && p.city !== 'todas' && p.city !== selectedCity) return false;
    if (platform !== 'all' && p.platform !== platform) return false;
    if (category !== 'all' && p.category !== category) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return p.content.toLowerCase().includes(q) || p.categoryLabel.toLowerCase().includes(q) || p.cityLabel.toLowerCase().includes(q);
    }
    return true;
  });

  const platformIcon = (plat: string) => {
    if (plat === 'facebook') return <IconFacebook />;
    if (plat === 'instagram') return <IconInstagram />;
    return <IconGlobe />;
  };
  const platformColor = (plat: string) => plat === 'facebook' ? '#60a5fa' : plat === 'instagram' ? '#f472b6' : '#4ade80';
  const platformBadge = (plat: string) => plat === 'facebook' ? 'badge-fb' : plat === 'instagram' ? 'badge-ig' : 'badge-success';

  const catIcon = (cat: string) => {
    if (cat === 'prevencion_vial') return <IconCar />;
    if (cat === 'busqueda_rescate' || cat === 'alertas_seguridad') return <IconSiren />;
    if (cat === 'cadetes_capacitacion') return <IconAward />;
    return <IconShield />;
  };

  return (
    <div style={{ marginBottom: 28 }}>
      {/* Header + Search */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, marginBottom: 16 }}>
        <div>
          <h2 className="section-title"><IconFilter />Feed Oficial de Publicaciones</h2>
          <p className="section-subtitle">Monitor de comunicados en tiempo real — Facebook, Instagram y Portal Web</p>
        </div>

        <div style={{ position: 'relative', width: 280 }}>
          <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
            <IconSearch />
          </span>
          <input
            type="text"
            placeholder="Buscar publicación..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="input-dark"
            style={{ paddingLeft: 34, fontSize: '0.75rem' }}
          />
        </div>
      </div>

      {/* Filter Pills */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8, marginBottom: 20, padding: '10px 14px', background: 'var(--bg-card)', borderRadius: 12, border: '1px solid var(--border-subtle)' }}>
        {/* Platform */}
        {[
          { val: 'all', label: 'Todas' },
          { val: 'facebook', label: 'Facebook' },
          { val: 'instagram', label: 'Instagram' },
          { val: 'website', label: 'Portal Web' },
        ].map(p => (
          <button
            key={p.val}
            onClick={() => setPlatform(p.val)}
            style={{
              padding: '5px 12px', borderRadius: 999, border: 'none', cursor: 'pointer', fontSize: '0.72rem', fontWeight: 700,
              background: platform === p.val ? 'var(--neon)' : 'rgba(255,255,255,0.05)',
              color: platform === p.val ? '#0f0d13' : 'var(--text-secondary)',
              transition: 'all 0.15s', fontFamily: 'var(--font-body)',
            }}
          >
            {p.label}
          </button>
        ))}

        <div style={{ width: 1, height: 18, background: 'var(--border-subtle)', margin: '0 4px' }} />

        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="input-dark"
          style={{ width: 'auto', padding: '5px 10px', fontSize: '0.72rem', cursor: 'pointer' }}
        >
          <option value="all">Todas las Categorías</option>
          <option value="prevencion_vial">Seguridad Vial</option>
          <option value="busqueda_rescate">Búsqueda y Rescate</option>
          <option value="alertas_seguridad">Prevención Ciberdelito</option>
          <option value="cadetes_capacitacion">Institutos & Cadetes</option>
          <option value="institucional">Institucional & Comunidad</option>
          <option value="comunidad_tramites">Trámites y Servicios</option>
        </select>

        <span style={{ marginLeft: 'auto', fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: 600 }}>
          {filtered.length} resultado{filtered.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Feed Grid */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '48px 24px', background: 'var(--bg-card)', borderRadius: 14, border: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }}>
          <div style={{ marginBottom: 10 }}><IconSearch /></div>
          <h3 style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)', marginBottom: 6 }}>Sin resultados</h3>
          <p style={{ fontSize: '0.75rem' }}>Modifica los filtros o la búsqueda para encontrar publicaciones.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))', gap: 16 }}>
          {filtered.map((post, idx) => (
            <article
              key={post.id}
              className="card anim-fadein"
              style={{
                animationDelay: `${idx * 50}ms`,
                display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                borderColor: post.isFeatured ? 'rgba(204,255,0,0.25)' : 'var(--border-subtle)',
              }}
            >
              {/* Image */}
              {post.mediaUrl && (
                <div style={{ position: 'relative', height: 180, overflow: 'hidden', borderRadius: '13px 13px 0 0', background: '#1a1624' }}>
                  <img src={post.mediaUrl} alt={post.categoryLabel} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} loading="lazy" />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,8,18,0.85) 0%, transparent 60%)' }} />
                  
                  <div style={{ position: 'absolute', top: 10, left: 10 }}>
                    <span className="badge badge-neon" style={{ fontSize: '0.6rem' }}>
                      {catIcon(post.category)} {post.categoryLabel}
                    </span>
                  </div>

                  <div style={{ position: 'absolute', top: 10, right: 10, padding: 7, borderRadius: 9, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(6px)', color: platformColor(post.platform) }}>
                    {platformIcon(post.platform)}
                  </div>

                  <div style={{ position: 'absolute', bottom: 10, left: 10, display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.65rem', color: 'rgba(255,255,255,0.8)', background: 'rgba(0,0,0,0.5)', padding: '3px 8px', borderRadius: 999, backdropFilter: 'blur(4px)' }}>
                    <IconMapPin /> {post.cityLabel}
                  </div>
                </div>
              )}

              {/* Content */}
              <div style={{ padding: '14px 16px', flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    <IconShield /> {post.author}
                  </span>
                  <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{post.timeAgo}</span>
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.6 }} className="line-clamp-3">
                  {post.content}
                </p>
              </div>

              {/* Stats + Link */}
              <div style={{ padding: '10px 16px 14px', borderTop: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                  <div style={{ display: 'flex', gap: 14 }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.7rem', fontWeight: 700, color: '#f472b6' }}><IconHeart />{post.likes.toLocaleString('es-AR')}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.7rem', fontWeight: 700, color: '#60a5fa' }}><IconShare />{post.shares.toLocaleString('es-AR')}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.7rem', color: 'var(--text-muted)' }}><IconMessageSq />{post.comments}</span>
                  </div>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.65rem', color: 'var(--success)', fontFamily: 'monospace' }}><IconEye />{post.reach.toLocaleString('es-AR')}</span>
                </div>

                <a
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
                    padding: '7px 12px', borderRadius: 9, border: '1px solid var(--border-subtle)',
                    background: 'rgba(255,255,255,0.04)', color: 'var(--text-secondary)',
                    fontSize: '0.7rem', fontWeight: 700, textDecoration: 'none', transition: 'all 0.15s', width: '100%'
                  }}
                >
                  Ver Publicación Original <IconExternalLink />
                </a>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};
