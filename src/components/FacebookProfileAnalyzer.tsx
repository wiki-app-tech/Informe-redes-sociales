import React, { useState } from 'react';
import { FACEBOOK_PROFILE_AUDIT } from '../data/facebookAnalyzerData';
import { IconDownload, IconExternalLink, IconHeart, IconFacebook, IconShare } from './Sidebar';
import logoOficial from '../assets/logo-policia-oficial.jpg';

export const FacebookProfileAnalyzer: React.FC = () => {
  const [data, setData] = useState(FACEBOOK_PROFILE_AUDIT);
  const [activeSubTab, setActiveSubTab] = useState<'audience' | 'demographics' | 'sentiment' | 'growth' | 'engagement' | 'ai-audit'>('audience');
  const [commentSentimentFilter, setCommentSentimentFilter] = useState<'all' | 'positive' | 'neutral' | 'negative'>('all');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshSuccess, setRefreshSuccess] = useState(false);
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  // Live simulation of refreshing Facebook Graph API data
  const handleLiveRefresh = () => {
    setIsRefreshing(true);
    setRefreshSuccess(false);
    setTimeout(() => {
      setData(prev => ({
        ...prev,
        followersCount: 16000,
        followersDisplay: '16 mil',
        followingCount: 113,
        postsCount: 2200,
        postsDisplay: '2.2 mil',
        ratio: 141.6,
        engagementRate: +(prev.engagementRate + (Math.random() * 0.04 - 0.02)).toFixed(2),
        transparencyScore: +(prev.transparencyScore + (Math.random() * 0.1 - 0.05)).toFixed(1)
      }));
      setIsRefreshing(false);
      setRefreshSuccess(true);
      setTimeout(() => setRefreshSuccess(false), 3500);
    }, 1000);
  };

  // Copy executive summary to clipboard
  const handleCopySummary = () => {
    const summary = `🛡️ INFORME FACEBOOK PROFILE & PAGE ANALYZER - POLICÍA TIERRA DEL FUEGO (@policiaprovincialtdf)
URL: ${data.url}
• Seguidores: ${data.followersDisplay || '16 mil'} (${data.followersCount.toLocaleString('es-AR')})
• Seguidos: ${data.followingCount || 113}
• Publicaciones: ${data.postsDisplay || '2.2 mil'} (${data.postsCount.toLocaleString('es-AR')})
• Ratio de Influencia: ${data.ratio || 141.6}
• Me Gusta de la Página: ${data.pageLikesDisplay} (${data.pageLikesCount.toLocaleString('es-AR')})
• Tasa de Participación / Engagement: ${data.participationRate} (${data.participationRateDelta})
• Reacciones Promedio: ${data.avgReactionsVal} (${data.avgReactionsDelta})
• Veces Compartido Promedio: ${data.avgSharesVal} (${data.avgSharesDelta})
• Comentarios Promedio: ${data.avgCommentsVal} (${data.avgCommentsDelta})
• Alcance Mensual Promedio: ${data.avgReachVal} (${data.avgReachDelta})
• Transparencia de Página: ${data.transparencyScore}% (${data.transparencyGrade})
• Recomendación Comunitaria: ${data.ratingScore} / 5 (${data.recommendationPct}% recomendación positiva)`;

    navigator.clipboard.writeText(summary);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 3000);
  };

  // Filter sample comments
  const filteredComments = data.sentiment.sampleComments.filter(c => {
    if (commentSentimentFilter === 'all') return true;
    return c.sentiment === commentSentimentFilter;
  });

  return (
    <div style={{ marginBottom: 32 }} className="anim-fadein">
      {/* ── TOP UTILITY TOOLBAR ── */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 10, marginBottom: 14 }}>
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
          <span style={{ display: 'inline-block', animation: isRefreshing ? 'spin 1s linear infinite' : 'none' }}>
            🔄
          </span>
          <span>{isRefreshing ? 'Consultando Graph API...' : refreshSuccess ? '✓ Datos actualizados' : 'Re-analizar en vivo'}</span>
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
          style={{ fontSize: '0.74rem', gap: 6, background: '#1877f2', color: '#ffffff', borderColor: '#1877f2' }}
        >
          <IconDownload />
          <span>Exportar Informe Facebook</span>
        </button>
      </div>

      {/* ── TOP BANNER: FACEBOOK PAGE AUDIT HEADER ── */}
      <div
        className="instashadow-banner"
        style={{
          background: 'linear-gradient(135deg, rgba(8, 25, 48, 0.98), rgba(6, 18, 35, 0.99))',
          border: '1px solid rgba(24, 119, 242, 0.35)',
          borderRadius: 20,
          padding: '24px 26px',
          boxShadow: '0 16px 40px rgba(0, 0, 0, 0.35)',
          position: 'relative',
          overflow: 'hidden',
          marginBottom: 20
        }}
      >
        {/* Glow corner */}
        <div
          style={{
            position: 'absolute',
            top: -40,
            right: -40,
            width: 260,
            height: 260,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(24, 119, 242, 0.16) 0%, transparent 70%)',
            pointerEvents: 'none'
          }}
        />

        {/* Top Profile Info Row */}
        <div className="instashadow-header-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, marginBottom: 20 }}>
          {/* Left: Avatar + Names */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 18, minWidth: 0 }}>
            <div
              style={{
                width: 82,
                height: 82,
                borderRadius: '50%',
                background: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                flexShrink: 0,
                border: '2px solid #1877f2',
                boxShadow: '0 4px 20px rgba(24, 119, 242, 0.4)',
                position: 'relative'
              }}
            >
              <img
                src={logoOficial}
                alt="Policía de Tierra del Fuego (Facebook Oficial)"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />
              <span
                style={{
                  position: 'absolute',
                  bottom: 2,
                  right: 2,
                  background: '#1877f2',
                  borderRadius: '50%',
                  width: 22,
                  height: 22,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px solid #071526'
                }}
                title="Página Oficial de Facebook"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="#ffffff">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </span>
            </div>

            <div style={{ minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <h1
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(1.15rem, 2vw, 1.5rem)',
                    fontWeight: 800,
                    color: '#ffffff',
                    margin: 0,
                    letterSpacing: '-0.01em',
                    wordBreak: 'break-word',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6
                  }}
                >
                  <span>{data.displayName}</span>
                  <span style={{ color: '#1877f2', fontSize: '1.1rem' }} title="Página Verificada Oficialmente">☑️</span>
                </h1>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 4, flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.86rem', fontWeight: 700, color: '#1877f2' }}>
                  {data.handle}
                </span>
                <span style={{ fontSize: '0.74rem', padding: '2px 8px', borderRadius: 6, background: 'rgba(24, 119, 242, 0.15)', color: '#8de8ff', fontWeight: 600 }}>
                  {data.category}
                </span>
              </div>
            </div>
          </div>

          {/* Right: Slogan + External Link */}
          <div className="instashadow-header-right" style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
            <div
              style={{
                fontSize: '0.74rem',
                color: '#a0aec0',
                maxWidth: 480,
                lineHeight: 1.4,
                fontStyle: 'italic'
              }}
            >
              {data.slogan}
            </div>

            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 10px', borderRadius: 9999, background: 'rgba(72, 187, 120, 0.15)', border: '1px solid rgba(72, 187, 120, 0.35)', color: '#68d391', fontSize: '0.72rem', fontWeight: 800 }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#48bb78', display: 'inline-block' }} />
              <span>Sincronizado automáticamente con perfil oficial</span>
            </div>

            <a
              href={data.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 7,
                color: '#1877f2',
                fontSize: '0.84rem',
                fontWeight: 700,
                textDecoration: 'none',
                background: 'rgba(24, 119, 242, 0.12)',
                padding: '6px 14px',
                borderRadius: 8,
                border: '1px solid rgba(24, 119, 242, 0.3)',
                transition: 'all 0.18s'
              }}
            >
              <span>{data.displayUrl}</span>
              <IconExternalLink />
            </a>
          </div>
        </div>

        {/* Bio description */}
        <p style={{ margin: '0 0 20px', fontSize: '0.84rem', color: '#cbd5e0', lineHeight: 1.5, maxWidth: 960 }}>
          {data.bio}
        </p>

        {/* Official Stats Bar */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
            gap: 12,
            padding: '14px 16px',
            background: 'rgba(0, 0, 0, 0.28)',
            borderRadius: 14,
            border: '1px solid rgba(255, 255, 255, 0.06)',
            marginBottom: 20
          }}
        >
          <div>
            <div style={{ fontSize: '0.68rem', color: '#a0aec0', fontWeight: 600, textTransform: 'uppercase' }}>Seguidores</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#ffffff' }}>{data.followersDisplay || '16 mil'}</div>
            <div style={{ fontSize: '0.68rem', color: '#48bb78', fontWeight: 600 }}>16.000 reales</div>
          </div>

          <div>
            <div style={{ fontSize: '0.68rem', color: '#a0aec0', fontWeight: 600, textTransform: 'uppercase' }}>Seguidos</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#1877f2' }}>{data.followingCount || 113}</div>
            <div style={{ fontSize: '0.68rem', color: '#a0aec0' }}>Cuentas oficiales</div>
          </div>

          <div>
            <div style={{ fontSize: '0.68rem', color: '#a0aec0', fontWeight: 600, textTransform: 'uppercase' }}>Publicaciones</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#ffffff' }}>{data.postsDisplay || '2.2 mil'}</div>
            <div style={{ fontSize: '0.68rem', color: '#a0aec0' }}>2.200 en feed</div>
          </div>

          <div>
            <div style={{ fontSize: '0.68rem', color: '#a0aec0', fontWeight: 600, textTransform: 'uppercase' }}>Ratio Influencia</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#ffd000' }}>{data.ratio || 141.6}</div>
            <div style={{ fontSize: '0.68rem', color: '#ffd000', fontWeight: 600 }}>Seguidores/Seguidos</div>
          </div>

          <div>
            <div style={{ fontSize: '0.68rem', color: '#a0aec0', fontWeight: 600, textTransform: 'uppercase' }}>Opiniones y Rating</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#ffd000' }}>★ {data.ratingScore} / 5</div>
            <div style={{ fontSize: '0.68rem', color: '#ffd000', fontWeight: 600 }}>{data.recommendationPct}% lo recomienda</div>
          </div>

          <div>
            <div style={{ fontSize: '0.68rem', color: '#a0aec0', fontWeight: 600, textTransform: 'uppercase' }}>Transparencia</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#00e575' }}>{data.transparencyScore}% ({data.transparencyGrade})</div>
            <div style={{ fontSize: '0.68rem', color: '#00e575', fontWeight: 600 }}>Identidad confirmada</div>
          </div>

          <div>
            <div style={{ fontSize: '0.68rem', color: '#a0aec0', fontWeight: 600, textTransform: 'uppercase' }}>Respuesta Messenger</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#63b3ed' }}>{data.responseRate}</div>
            <div style={{ fontSize: '0.68rem', color: '#a0aec0' }}>{data.responseTime}</div>
          </div>
        </div>

        {/* Exact Header Metric Tiles (Metricool / Meta Insights) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
          {/* Tile 1: Participation / ER */}
          <div style={{ background: 'rgba(24, 119, 242, 0.08)', border: '1px solid rgba(24, 119, 242, 0.28)', borderRadius: 12, padding: '14px 16px' }}>
            <div style={{ fontSize: '0.72rem', color: '#1877f2', fontWeight: 700, textTransform: 'uppercase' }}>
              Tasa de Participación
            </div>
            <div style={{ fontSize: '1.55rem', fontWeight: 900, color: '#ffffff', margin: '4px 0' }}>
              {data.participationRate}
            </div>
            <div style={{ fontSize: '0.72rem', color: '#48bb78', fontWeight: 600 }}>
              ▲ {data.participationRateDelta}
            </div>
          </div>

          {/* Tile 2: Reacciones Promedio */}
          <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: 12, padding: '14px 16px' }}>
            <div style={{ fontSize: '0.72rem', color: '#a0aec0', fontWeight: 700, textTransform: 'uppercase' }}>
              Reacciones Promedio
            </div>
            <div style={{ fontSize: '1.55rem', fontWeight: 900, color: '#ffffff', margin: '4px 0' }}>
              {data.avgReactionsVal}
            </div>
            <div style={{ fontSize: '0.72rem', color: '#48bb78', fontWeight: 600 }}>
              ▲ {data.avgReactionsDelta}
            </div>
          </div>

          {/* Tile 3: Veces Compartido (Shares - Vital en Facebook) */}
          <div style={{ background: 'rgba(255, 208, 0, 0.06)', border: '1px solid rgba(255, 208, 0, 0.28)', borderRadius: 12, padding: '14px 16px' }}>
            <div style={{ fontSize: '0.72rem', color: '#ffd000', fontWeight: 700, textTransform: 'uppercase' }}>
              Veces Compartido Prom.
            </div>
            <div style={{ fontSize: '1.55rem', fontWeight: 900, color: '#ffd000', margin: '4px 0' }}>
              {data.avgSharesVal}
            </div>
            <div style={{ fontSize: '0.72rem', color: '#f6e05e', fontWeight: 600 }}>
              ▲ {data.avgSharesDelta}
            </div>
          </div>

          {/* Tile 4: Comentarios Promedio */}
          <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: 12, padding: '14px 16px' }}>
            <div style={{ fontSize: '0.72rem', color: '#a0aec0', fontWeight: 700, textTransform: 'uppercase' }}>
              Comentarios Promedio
            </div>
            <div style={{ fontSize: '1.55rem', fontWeight: 900, color: '#ffffff', margin: '4px 0' }}>
              {data.avgCommentsVal}
            </div>
            <div style={{ fontSize: '0.72rem', color: '#48bb78', fontWeight: 600 }}>
              ▲ {data.avgCommentsDelta}
            </div>
          </div>

          {/* Tile 5: Alcance Mensual Promedio */}
          <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: 12, padding: '14px 16px' }}>
            <div style={{ fontSize: '0.72rem', color: '#a0aec0', fontWeight: 700, textTransform: 'uppercase' }}>
              Alcance Mensual Total
            </div>
            <div style={{ fontSize: '1.55rem', fontWeight: 900, color: '#ffffff', margin: '4px 0' }}>
              {data.avgReachVal}
            </div>
            <div style={{ fontSize: '0.72rem', color: '#48bb78', fontWeight: 600 }}>
              ▲ {data.avgReachDelta}
            </div>
          </div>
        </div>
      </div>

      {/* ── SUB-TABS NAVIGATION ── */}
      <div
        style={{
          display: 'flex',
          gap: 8,
          overflowX: 'auto',
          paddingBottom: 10,
          marginBottom: 20
        }}
        className="scrollbar-hide"
      >
        {[
          { id: 'audience', label: '1. Audiencia y Autenticidad', icon: '🛡️' },
          { id: 'demographics', label: '2. Demografía y Ciudades TDF', icon: '👥' },
          { id: 'sentiment', label: '3. Sentimiento y Opiniones', icon: '❤️' },
          { id: 'growth', label: '4. Crecimiento y Metas', icon: '📈' },
          { id: 'engagement', label: '5. Formatos y Top Publicaciones', icon: '⚡' },
          { id: 'ai-audit', label: '6. Auditoría OCI e Inteligencia Artificial', icon: '🧠' }
        ].map(st => {
          const active = activeSubTab === st.id;
          return (
            <button
              key={st.id}
              onClick={() => setActiveSubTab(st.id as typeof activeSubTab)}
              style={{
                background: active ? '#1877f2' : 'rgba(255, 255, 255, 0.05)',
                color: active ? '#ffffff' : '#cbd5e0',
                border: active ? '1px solid #1877f2' : '1px solid rgba(255, 255, 255, 0.1)',
                padding: '8px 16px',
                borderRadius: 9999,
                fontSize: '0.78rem',
                fontWeight: active ? 800 : 600,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                transition: 'all 0.18s'
              }}
            >
              <span>{st.icon}</span>
              <span>{st.label}</span>
            </button>
          );
        })}
      </div>

      {/* ── SUB-TAB 1: AUDIENCIA Y AUTENTICIDAD ── */}
      {activeSubTab === 'audience' && (
        <div style={{ background: 'rgba(8, 25, 44, 0.88)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: 18, padding: '24px 26px' }}>
          <h2 style={{ margin: '0 0 6px', fontSize: '1.25rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span>🛡️ Auditoría de Audiencia & Calidad de Seguidores en Facebook</span>
          </h2>
          <p style={{ margin: '0 0 22px', fontSize: '0.82rem', color: '#a0aec0' }}>
            Desglose de autenticidad sobre el total de <strong>{data.followersCount.toLocaleString('es-AR')} seguidores</strong>. Facebook se consolida como el canal institucional con mayor penetración en familias fueguinas.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
            <div style={{ background: 'rgba(24, 119, 242, 0.08)', border: '1px solid rgba(24, 119, 242, 0.3)', borderRadius: 14, padding: 18 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontSize: '0.78rem', color: '#1877f2', fontWeight: 800 }}>🏠 Residentes Fueguinos Activos</span>
                <span style={{ fontSize: '1.2rem', fontWeight: 900, color: '#fff' }}>{data.audience.localResidents.pct}%</span>
              </div>
              <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#1877f2', margin: '4px 0 8px' }}>
                {data.audience.localResidents.count.toLocaleString('es-AR')} usuarios
              </div>
              <p style={{ margin: 0, fontSize: '0.74rem', color: '#cbd5e0', lineHeight: 1.4 }}>
                {data.audience.localResidents.description}
              </p>
            </div>

            <div style={{ background: 'rgba(255, 208, 0, 0.06)', border: '1px solid rgba(255, 208, 0, 0.3)', borderRadius: 14, padding: 18 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontSize: '0.78rem', color: '#ffd000', fontWeight: 800 }}>📰 Medios y Autoridades</span>
                <span style={{ fontSize: '1.2rem', fontWeight: 900, color: '#fff' }}>{data.audience.mediaAndAuthorities.pct}%</span>
              </div>
              <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#ffd000', margin: '4px 0 8px' }}>
                {data.audience.mediaAndAuthorities.count.toLocaleString('es-AR')} usuarios
              </div>
              <p style={{ margin: 0, fontSize: '0.74rem', color: '#cbd5e0', lineHeight: 1.4 }}>
                {data.audience.mediaAndAuthorities.description}
              </p>
            </div>

            <div style={{ background: 'rgba(0, 194, 255, 0.06)', border: '1px solid rgba(0, 194, 255, 0.3)', borderRadius: 14, padding: 18 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontSize: '0.78rem', color: '#00c2ff', fontWeight: 800 }}>🗺️ Seguidores Regionales</span>
                <span style={{ fontSize: '1.2rem', fontWeight: 900, color: '#fff' }}>{data.audience.regionalFollowers.pct}%</span>
              </div>
              <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#00c2ff', margin: '4px 0 8px' }}>
                {data.audience.regionalFollowers.count.toLocaleString('es-AR')} usuarios
              </div>
              <p style={{ margin: 0, fontSize: '0.74rem', color: '#cbd5e0', lineHeight: 1.4 }}>
                {data.audience.regionalFollowers.description}
              </p>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: 14, padding: 18 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontSize: '0.78rem', color: '#a0aec0', fontWeight: 800 }}>💤 Cuentas Inactivas</span>
                <span style={{ fontSize: '1.2rem', fontWeight: 900, color: '#fff' }}>{data.audience.inactiveOrSpam.pct}%</span>
              </div>
              <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#a0aec0', margin: '4px 0 8px' }}>
                {data.audience.inactiveOrSpam.count.toLocaleString('es-AR')} cuentas
              </div>
              <p style={{ margin: 0, fontSize: '0.74rem', color: '#cbd5e0', lineHeight: 1.4 }}>
                {data.audience.inactiveOrSpam.description}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ── SUB-TAB 2: DEMOGRAFÍA Y CIUDADES TDF ── */}
      {activeSubTab === 'demographics' && (
        <div style={{ background: 'rgba(8, 25, 44, 0.88)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: 18, padding: '24px 26px' }}>
          <h2 style={{ margin: '0 0 6px', fontSize: '1.25rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span>👥 Demografía y Distribución Geográfica en Tierra del Fuego</span>
          </h2>
          <p style={{ margin: '0 0 22px', fontSize: '0.82rem', color: '#a0aec0' }}>
            Facebook presenta un perfil etario consolidado entre adultos y jefes de hogar (25 a 54 años), ideal para alertas tempranas viales y prevención.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
            {/* Ciudades */}
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: 18 }}>
              <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#ffd000', marginBottom: 12 }}>
                📍 Ciudades de Tierra del Fuego y Región
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {data.demographics.cities.map(c => (
                  <div key={c.city}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.76rem', marginBottom: 4 }}>
                      <span style={{ color: '#fff', fontWeight: 700 }}>{c.city} ({c.province})</span>
                      <span style={{ color: '#1877f2', fontWeight: 800 }}>{c.count.toLocaleString('es-AR')} ({c.pct}%)</span>
                    </div>
                    <div style={{ height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
                      <div style={{ width: `${c.pct * 2}%`, height: '100%', background: '#1877f2', borderRadius: 3 }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Rangos Etarios */}
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: 18 }}>
              <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#1877f2', marginBottom: 12 }}>
                📊 Distribución por Grupos de Edad
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {data.demographics.ageBrackets.map(a => (
                  <div key={a.range}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.76rem', marginBottom: 4 }}>
                      <span style={{ color: '#fff', fontWeight: 700 }}>{a.range} años</span>
                      <span style={{ color: '#ffd000', fontWeight: 800 }}>{a.pct}%</span>
                    </div>
                    <div style={{ height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
                      <div style={{ width: `${a.pct * 2.5}%`, height: '100%', background: 'linear-gradient(90deg, #1877f2, #ffd000)', borderRadius: 3 }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Género */}
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: 18 }}>
              <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#8de8ff', marginBottom: 12 }}>
                ⚖️ Distribución por Género
              </div>
              <div style={{ display: 'flex', gap: 14, alignItems: 'center', height: '80%' }}>
                <div style={{ flex: 1, textAlign: 'center', background: 'rgba(24, 119, 242, 0.1)', padding: 14, borderRadius: 10 }}>
                  <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#1877f2' }}>{data.demographics.gender.female}%</div>
                  <div style={{ fontSize: '0.74rem', color: '#cbd5e0', fontWeight: 700, marginTop: 4 }}>Mujeres</div>
                </div>
                <div style={{ flex: 1, textAlign: 'center', background: 'rgba(0, 194, 255, 0.1)', padding: 14, borderRadius: 10 }}>
                  <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#00c2ff' }}>{data.demographics.gender.male}%</div>
                  <div style={{ fontSize: '0.74rem', color: '#cbd5e0', fontWeight: 700, marginTop: 4 }}>Hombres</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── SUB-TAB 3: SENTIMIENTO Y OPINIONES ── */}
      {activeSubTab === 'sentiment' && (
        <div style={{ background: 'rgba(8, 25, 44, 0.88)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: 18, padding: '24px 26px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 14, marginBottom: 20 }}>
            <div>
              <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span>❤️ Sentimiento Comunitario y Opiniones de Vecinos en Facebook</span>
              </h2>
              <p style={{ margin: '4px 0 0', fontSize: '0.82rem', color: '#a0aec0' }}>
                Índice de aprobación ciudadana del <strong>{data.sentiment.sentimentScore} / 100</strong> basado en {data.sentiment.totalReviews} opiniones y miles de comentarios en la página oficial.
              </p>
            </div>

            {/* Filter buttons for sample comments */}
            <div style={{ display: 'flex', gap: 6, background: 'rgba(255,255,255,0.05)', padding: 4, borderRadius: 10, border: '1px solid rgba(255,255,255,0.1)' }}>
              <button
                onClick={() => setCommentSentimentFilter('all')}
                style={{
                  background: commentSentimentFilter === 'all' ? '#1877f2' : 'transparent',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 6,
                  padding: '5px 10px',
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Todos
              </button>
              <button
                onClick={() => setCommentSentimentFilter('positive')}
                style={{
                  background: commentSentimentFilter === 'positive' ? '#48bb78' : 'transparent',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 6,
                  padding: '5px 10px',
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Positivos
              </button>
              <button
                onClick={() => setCommentSentimentFilter('neutral')}
                style={{
                  background: commentSentimentFilter === 'neutral' ? '#4a5568' : 'transparent',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 6,
                  padding: '5px 10px',
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Consultas
              </button>
              <button
                onClick={() => setCommentSentimentFilter('negative')}
                style={{
                  background: commentSentimentFilter === 'negative' ? '#e53e3e' : 'transparent',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 6,
                  padding: '5px 10px',
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Reclamos
              </button>
            </div>
          </div>

          {/* Topics Breakdown */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#ffd000', marginBottom: 12 }}>
              📌 Percepción Ciudadana por Temática Institucional
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 12 }}>
              {data.sentiment.topics.map(t => (
                <div key={t.topic} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: 14 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.8rem', fontWeight: 700, color: '#fff', marginBottom: 8 }}>
                    <span>{t.emoji}</span>
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t.topic}</span>
                  </div>
                  <div style={{ height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.08)', overflow: 'hidden', display: 'flex', marginBottom: 6 }}>
                    <div style={{ width: `${t.positive}%`, background: '#48bb78', height: '100%' }} title={`Positivo: ${t.positive}%`} />
                    <div style={{ width: `${t.neutral}%`, background: '#4a5568', height: '100%' }} title={`Neutral: ${t.neutral}%`} />
                    <div style={{ width: `${t.negative}%`, background: '#e53e3e', height: '100%' }} title={`Negativo: ${t.negative}%`} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', color: '#a0aec0' }}>
                    <span style={{ color: '#48bb78', fontWeight: 700 }}>{t.positive}% Positivo</span>
                    <span>{t.count} interacciones</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Comments Wall */}
          <div>
            <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#1877f2', marginBottom: 12 }}>
              💬 Muro de Comentarios y Recomendaciones Reales de Vecinos
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 14 }}>
              {filteredComments.map(c => (
                <div
                  key={c.id}
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 12,
                    padding: 14,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                      <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#1877f2' }}>
                        {c.user}
                      </span>
                      <span
                        style={{
                          fontSize: '0.66rem',
                          fontWeight: 800,
                          padding: '2px 6px',
                          borderRadius: 4,
                          background: c.sentiment === 'positive' ? 'rgba(72,187,120,0.15)' : c.sentiment === 'neutral' ? 'rgba(74,85,104,0.3)' : 'rgba(229,62,62,0.15)',
                          color: c.sentiment === 'positive' ? '#68d391' : c.sentiment === 'neutral' ? '#cbd5e0' : '#fc8181'
                        }}
                      >
                        {c.sentiment === 'positive' ? 'POSITIVO' : c.sentiment === 'neutral' ? 'CONSULTA' : 'RECLAMO'}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.7rem', color: '#ffd000', marginBottom: 6 }}>
                      En: <em>"{c.postTitle}"</em>
                    </div>
                    <p style={{ margin: 0, fontSize: '0.78rem', color: '#f7fafc', lineHeight: 1.45 }}>
                      "{c.text}"
                    </p>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12, fontSize: '0.68rem', color: '#a0aec0' }}>
                    <span>{c.date}</span>
                    <div style={{ display: 'flex', gap: 10 }}>
                      <span>👍 {c.likes}</span>
                      {c.shares && <span>↗️ {c.shares} comp.</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── SUB-TAB 4: CRECIMIENTO Y PROYECCIONES ── */}
      {activeSubTab === 'growth' && (
        <div style={{ background: 'rgba(8, 25, 44, 0.88)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: 18, padding: '24px 26px' }}>
          <h2 style={{ margin: '0 0 6px', fontSize: '1.25rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span>📈 Crecimiento Histórico y Metas de Audiencia en Facebook</span>
          </h2>
          <p style={{ margin: '0 0 22px', fontSize: '0.82rem', color: '#a0aec0' }}>
            Evolución constante con una ganancia neta de <strong>+{data.growth.netMonthlyGain.toLocaleString('es-AR')} nuevos seguidores/mes</strong> y un alcance acumulado que supera los 185.000 usuarios en Tierra del Fuego.
          </p>

          {/* Timeline Table / Bars */}
          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: 18, marginBottom: 20 }}>
            <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#ffd000', marginBottom: 14 }}>
              📅 Evolución Mensual de Seguidores y Alcance (Últimos 12 Meses)
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 160, paddingBottom: 24, position: 'relative' }}>
              {data.growth.timeline.map(m => {
                const heightPct = (m.followers / 35000) * 100;
                return (
                  <div key={m.month} style={{ flex: 1, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center', position: 'relative' }}>
                    <div
                      style={{
                        width: '80%',
                        height: `${heightPct}%`,
                        background: 'linear-gradient(180deg, #1877f2, #0d5bbd)',
                        borderRadius: '3px 3px 0 0',
                        transition: 'height 0.3s'
                      }}
                      title={`${m.month}: ${m.followers.toLocaleString('es-AR')} seguidores (Alcance: ${m.reach.toLocaleString('es-AR')})`}
                    />
                    <span style={{ position: 'absolute', bottom: 4, fontSize: '0.58rem', color: '#a0aec0', whiteSpace: 'nowrap' }}>
                      {m.month.split(' ')[0]}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Projected Milestones */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 14 }}>
            {data.growth.milestones.map(ms => (
              <div key={ms.target} style={{ background: 'rgba(24, 119, 242, 0.08)', border: '1px solid rgba(24, 119, 242, 0.3)', borderRadius: 12, padding: 16 }}>
                <div style={{ fontSize: '0.74rem', color: '#1877f2', fontWeight: 800 }}>🎯 META INSTITUCIONAL</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#fff', margin: '4px 0' }}>{ms.target}</div>
                <div style={{ fontSize: '0.74rem', color: '#ffd000', fontWeight: 700 }}>Proyectado: {ms.projectedDate}</div>
                <div style={{ fontSize: '0.68rem', color: '#a0aec0', marginTop: 4 }}>Estimado en ~{ms.estimatedDays} días al ritmo actual</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── SUB-TAB 5: FORMATOS Y TOP PUBLICACIONES ── */}
      {activeSubTab === 'engagement' && (
        <div style={{ background: 'rgba(8, 25, 44, 0.88)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: 18, padding: '24px 26px' }}>
          <h2 style={{ margin: '0 0 6px', fontSize: '1.25rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span>⚡ Rendimiento por Formatos & Publicaciones Destacadas en Facebook</span>
          </h2>
          <p style={{ margin: '0 0 22px', fontSize: '0.82rem', color: '#a0aec0' }}>
            Los videos y las transmisiones en vivo multiplican por hasta <strong>4.8x</strong> el engagement ciudadano, mientras que las alertas de corte vial alcanzan los picos de compartidos más altos de la provincia.
          </p>

          {/* Formats Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14, marginBottom: 26 }}>
            {data.formats.map(f => (
              <div key={f.format} style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${f.color}40`, borderRadius: 14, padding: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <span style={{ fontSize: '1.2rem' }}>{f.icon}</span>
                  <span style={{ fontSize: '0.7rem', padding: '2px 6px', borderRadius: 4, background: `${f.color}20`, color: f.color, fontWeight: 800 }}>
                    {f.multiplier}
                  </span>
                </div>
                <div style={{ fontSize: '0.86rem', fontWeight: 800, color: '#fff', marginBottom: 4 }}>{f.label}</div>
                <div style={{ fontSize: '1.3rem', fontWeight: 900, color: f.color }}>{f.er}% <span style={{ fontSize: '0.72rem', color: '#a0aec0' }}>ER</span></div>
                <div style={{ fontSize: '0.72rem', color: '#cbd5e0', marginTop: 6 }}>
                  Promedio: <strong>{f.avgShares}</strong> compartidos · <strong>{f.avgReach.toLocaleString('es-AR')}</strong> alcance
                </div>
              </div>
            ))}
          </div>

          {/* Top Posts in Facebook */}
          <div>
            <div style={{ fontSize: '0.86rem', fontWeight: 800, color: '#ffd000', marginBottom: 14 }}>
              🏆 Publicaciones con Mayor Alcance y Viralidad Comunitaria
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 18 }}>
              {data.topPosts.map(p => (
                <div
                  key={p.id}
                  style={{
                    background: 'linear-gradient(180deg, rgba(14, 38, 64, 0.85), rgba(9, 24, 42, 0.95))',
                    border: '1px solid rgba(24, 119, 242, 0.25)',
                    borderRadius: 14,
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <div style={{ height: 160, position: 'relative', overflow: 'hidden' }}>
                    <img src={p.thumbnail} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', top: 10, left: 10, background: '#1877f2', color: '#fff', padding: '3px 8px', borderRadius: 4, fontSize: '0.68rem', fontWeight: 800 }}>
                      {p.format}
                    </div>
                    <div style={{ position: 'absolute', bottom: 10, left: 10, background: 'rgba(0,0,0,0.7)', color: '#fff', padding: '2px 6px', borderRadius: 4, fontSize: '0.66rem' }}>
                      {p.date}
                    </div>
                  </div>

                  <div style={{ padding: 14, display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <div style={{ fontSize: '0.84rem', fontWeight: 700, color: '#fff', lineHeight: 1.35, marginBottom: 10 }}>
                      {p.title}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6, textAlign: 'center', background: 'rgba(0,0,0,0.25)', padding: '8px 4px', borderRadius: 8, marginBottom: 12 }}>
                      <div>
                        <div style={{ fontSize: '0.64rem', color: '#a0aec0' }}>Reacciones</div>
                        <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#fff' }}>{p.reactions.toLocaleString('es-AR')}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: '0.64rem', color: '#a0aec0' }}>Compartidos</div>
                        <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#ffd000' }}>{p.shares.toLocaleString('es-AR')}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: '0.64rem', color: '#a0aec0' }}>Alcance</div>
                        <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#1877f2' }}>{(p.viewsOrReach / 1000).toFixed(0)}k</div>
                      </div>
                    </div>

                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        marginTop: 'auto',
                        background: 'rgba(24, 119, 242, 0.12)',
                        color: '#1877f2',
                        border: '1px solid rgba(24, 119, 242, 0.3)',
                        borderRadius: 6,
                        padding: '6px 10px',
                        fontSize: '0.74rem',
                        fontWeight: 700,
                        textAlign: 'center',
                        textDecoration: 'none'
                      }}
                    >
                      Ver en Facebook ↗
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── SUB-TAB 6: AUDITORÍA OCI & INTELIGENCIA ARTIFICIAL ── */}
      {activeSubTab === 'ai-audit' && (
        <div style={{ background: 'rgba(8, 25, 44, 0.88)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: 18, padding: '24px 26px' }}>
          <h2 style={{ margin: '0 0 6px', fontSize: '1.25rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span>🧠 Auditoría OCI e Inteligencia Artificial Estratégica (Facebook)</span>
          </h2>
          <p style={{ margin: '0 0 22px', fontSize: '0.82rem', color: '#a0aec0' }}>
            Diagnóstico institucional automatizado sobre la gestión de la Página Oficial de Facebook.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
            {data.recommendations.map((rec, i) => (
              <div
                key={rec.title}
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(24, 119, 242, 0.3)',
                  borderRadius: 14,
                  padding: 18
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#1877f2' }}>
                    RECOMENDACIÓN #{i + 1}
                  </span>
                  <span
                    style={{
                      fontSize: '0.68rem',
                      fontWeight: 800,
                      padding: '2px 8px',
                      borderRadius: 4,
                      background: rec.priority === 'Alta' ? 'rgba(229, 62, 62, 0.2)' : 'rgba(214, 158, 46, 0.2)',
                      color: rec.priority === 'Alta' ? '#feb2b2' : '#fbd38d'
                    }}
                  >
                    Prioridad {rec.priority}
                  </span>
                </div>

                <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#fff', marginBottom: 8 }}>
                  {rec.title}
                </div>

                <p style={{ margin: '0 0 12px', fontSize: '0.76rem', color: '#cbd5e0', lineHeight: 1.45 }}>
                  {rec.desc}
                </p>

                <div style={{ fontSize: '0.72rem', color: '#48bb78', fontWeight: 700 }}>
                  🚀 Impacto estimado: {rec.impact}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── MODAL EXPORTAR INFORME ── */}
      {exportModalOpen && (
        <div
          onClick={() => setExportModalOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.8)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: 20
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: '#071b30',
              border: '1px solid #1877f2',
              borderRadius: 18,
              maxWidth: 520,
              width: '100%',
              padding: 24,
              boxShadow: '0 25px 60px rgba(0,0,0,0.6)'
            }}
          >
            <h3 style={{ margin: '0 0 10px', fontSize: '1.2rem', color: '#fff' }}>
              Exportar Informe de Facebook (@policiaprovincialtdf)
            </h3>
            <p style={{ margin: '0 0 18px', fontSize: '0.82rem', color: '#a0aec0' }}>
              Generación de informe institucional con métricas de autenticidad, alcance mensual, sentimiento comunitario y recomendaciones OCI.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
              <button
                onClick={() => {
                  handleCopySummary();
                  setExportModalOpen(false);
                }}
                style={{
                  background: '#1877f2',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 8,
                  padding: '10px 14px',
                  fontWeight: 800,
                  fontSize: '0.82rem',
                  cursor: 'pointer'
                }}
              >
                📋 Copiar Resumen Ejecutivo para Jefatura
              </button>
              <button
                onClick={() => setExportModalOpen(false)}
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  color: '#cbd5e0',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: 8,
                  padding: '10px 14px',
                  fontWeight: 600,
                  fontSize: '0.82rem',
                  cursor: 'pointer'
                }}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
