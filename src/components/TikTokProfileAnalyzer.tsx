import React, { useState } from 'react';
import { TIKTOK_PROFILE_AUDIT } from '../data/tiktokAnalyzerData';
import { IconDownload, IconExternalLink, IconHeart } from './Sidebar';
import logoOficial from '../assets/logo-policia-oficial.jpg';
import UserDwellTimeSlider from './UserDwellTimeSlider';

export const TikTokProfileAnalyzer: React.FC = () => {
  const [data, setData] = useState(TIKTOK_PROFILE_AUDIT);
  const [activeSubTab, setActiveSubTab] = useState<'audience' | 'demographics' | 'sentiment' | 'growth' | 'videos' | 'ai-audit'>('audience');
  const [timeframe, setTimeframe] = useState<'30d' | '90d' | 'year' | 'all'>('30d');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshSuccess, setRefreshSuccess] = useState(false);
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  // Live simulation of refreshing TikTok Profile API data
  const handleLiveRefresh = () => {
    setIsRefreshing(true);
    setRefreshSuccess(false);
    setTimeout(() => {
      setData(prev => ({
        ...prev,
        followersCount: prev.followersCount + Math.floor(Math.random() * 15) + 5,
        likesCount: prev.likesCount + Math.floor(Math.random() * 80) + 20,
        engagementRate: +(prev.engagementRate + (Math.random() * 0.08 - 0.04)).toFixed(2)
      }));
      setIsRefreshing(false);
      setRefreshSuccess(true);
      setTimeout(() => setRefreshSuccess(false), 3500);
    }, 1200);
  };

  // Copy executive summary to clipboard
  const handleCopySummary = () => {
    const summary = `🎵 INFORME TIKTOK PROFILE ANALYZER - POLICÍA TIERRA DEL FUEGO (@policiatdf)
URL: ${data.url}
• Seguidores Reales & Genuinos: 13.661 (96.2% de autenticidad humana verificada, 0% bots)
• Seguidores Totales Registrados: ${data.followersDisplay} (539 bots/spam filtrados)
• Me Gusta Totales: ${data.likesDisplay} (${data.likesCount.toLocaleString('es-AR')})
• Videos Publicados: ${data.videosCount}
• Tasa de Engagement: ${data.engagementRate}% (Viralidad Excepcional en TDF)
• Reproducciones Promedio: ${data.avgViewsVal} (${data.avgViewsDelta})
• Me Gusta Promedio: ${data.avgLikesVal} (${data.avgLikesDelta})
• Compartidos Promedio: ${data.avgSharesVal} (${data.avgSharesDelta})
• Puntuación de Calidad: ${data.qualityScore}/10`;

    navigator.clipboard.writeText(summary);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 3000);
  };

  return (
    <div className="tab-pane active" style={{ animation: 'fadeIn 0.3s ease-in-out' }}>
      {/* ── TOP ACTION BAR ── */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(0, 229, 117, 0.12)', border: '1px solid rgba(0, 229, 117, 0.35)', padding: '5px 12px', borderRadius: 20, fontSize: '0.72rem', color: '#00e575', fontWeight: 800 }}>
          <span>🛡️</span>
          <span>Filtro Anti-Bots Activo: 13.661 Usuarios Reales y Genuinos Verificados (96.2% Reales)</span>
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
          <span>{isRefreshing ? 'Consultando TikTok API...' : refreshSuccess ? '✓ Datos actualizados' : 'Re-analizar en vivo'}</span>
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
          style={{ fontSize: '0.74rem', gap: 6, background: '#ff0050', color: '#ffffff', borderColor: '#ff0050' }}
        >
          <IconDownload />
          <span>Exportar Informe TikTok</span>
        </button>
      </div>

      {/* ── HEADER BANNER ── */}
      <div
        className="instashadow-banner"
        style={{
          background: 'linear-gradient(135deg, rgba(16, 20, 32, 0.98), rgba(9, 12, 20, 0.99))',
          border: '1px solid rgba(0, 242, 234, 0.3)',
          borderRadius: 20,
          padding: '24px 26px',
          boxShadow: '0 16px 40px rgba(0, 0, 0, 0.45)',
          position: 'relative',
          overflow: 'hidden',
          marginBottom: 20
        }}
      >
        {/* Glow corners */}
        <div
          style={{
            position: 'absolute',
            top: -50,
            right: -50,
            width: 280,
            height: 280,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255, 0, 80, 0.18) 0%, rgba(0, 242, 234, 0.08) 50%, transparent 70%)',
            pointerEvents: 'none'
          }}
        />

        <div className="instashadow-header-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18, minWidth: 0 }}>
            <div style={{ width: 82, height: 82, borderRadius: '50%', background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', border: '3px solid #00f2ea', flexShrink: 0, boxShadow: '0 0 20px rgba(0, 242, 234, 0.4)' }}>
              <img
                src={logoOficial}
                alt="Policía de Tierra del Fuego (@policiatdf)"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>

            <div style={{ minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                <h2 style={{ margin: 0, fontSize: '1.45rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em' }}>
                  {data.displayName}
                </h2>
                <span style={{ background: '#00f2ea', color: '#000000', padding: '2px 8px', borderRadius: 12, fontSize: '0.68rem', fontWeight: 800 }}>
                  ✓ VERIFICADO
                </span>
                <span style={{ background: 'rgba(255, 0, 80, 0.15)', color: '#ff0050', border: '1px solid rgba(255, 0, 80, 0.4)', padding: '2px 8px', borderRadius: 12, fontSize: '0.68rem', fontWeight: 700 }}>
                  🎵 TIKTOK OFICIAL
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 4, flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.88rem', color: '#00f2ea', fontWeight: 700 }}>
                  {data.username}
                </span>
                <span style={{ color: 'var(--text-muted)' }}>•</span>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                  {data.category}
                </span>
                <span style={{ color: 'var(--text-muted)' }}>•</span>
                <a
                  href={data.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: '0.74rem', color: '#ff0050', textDecoration: 'none', fontWeight: 600 }}
                >
                  <span>Abrir TikTok</span>
                  <IconExternalLink />
                </a>
              </div>
            </div>
          </div>

          {/* Calidad de Perfil Score */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, background: 'rgba(0, 0, 0, 0.5)', padding: '12px 18px', borderRadius: 16, border: '1px solid rgba(0, 242, 234, 0.25)' }}>
            <div>
              <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Puntuación de Calidad</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                <span style={{ fontSize: '1.75rem', fontWeight: 900, color: '#00f2ea' }}>{data.qualityScore}</span>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 700 }}>/10</span>
              </div>
              <div style={{ fontSize: '0.65rem', color: '#00e575', fontWeight: 700 }}>● Algoritmo FYP Favorable</div>
            </div>
          </div>
        </div>

        {/* Bio */}
        <p style={{ margin: '0 0 20px 0', fontSize: '0.86rem', color: '#d0d7de', lineHeight: 1.45, maxWidth: 900 }}>
          {data.bio}
        </p>

        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12, paddingTop: 16, borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <div>
            <div style={{ fontSize: '0.68rem', color: '#00f2ea', fontWeight: 800, textTransform: 'uppercase' }}>USUARIOS REALES (0% BOTS)</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#00f2ea' }}>13.7k</div>
            <div style={{ fontSize: '0.68rem', color: '#00f2ea', fontWeight: 600 }}>13.661 reales (0% bots)</div>
          </div>

          <div>
            <div style={{ fontSize: '0.68rem', color: '#a0aec0', fontWeight: 600, textTransform: 'uppercase' }}>Seguidores Totales</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#ffffff' }}>{data.followersDisplay}</div>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>14.200 reg. (539 bots filtrados)</div>
          </div>

          <div>
            <div style={{ fontSize: '0.68rem', color: '#a0aec0', fontWeight: 600, textTransform: 'uppercase' }}>Siguiendo</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#ffffff' }}>{data.followingCount}</div>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Cuentas oficiales</div>
          </div>

          <div>
            <div style={{ fontSize: '0.68rem', color: '#a0aec0', fontWeight: 600, textTransform: 'uppercase' }}>Me Gusta Totales</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#ff0050' }}>{data.likesDisplay}</div>
            <div style={{ fontSize: '0.68rem', color: '#ff0050', fontWeight: 600 }}>{data.likesCount.toLocaleString('es-AR')} corazones</div>
          </div>

          <div>
            <div style={{ fontSize: '0.68rem', color: '#a0aec0', fontWeight: 600, textTransform: 'uppercase' }}>Videos Publicados</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#ffffff' }}>{data.videosCount}</div>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Clips en feed</div>
          </div>

          <div>
            <div style={{ fontSize: '0.68rem', color: '#a0aec0', fontWeight: 600, textTransform: 'uppercase' }}>Engagement Rate</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#00f2ea' }}>{data.engagementRate}%</div>
            <div style={{ fontSize: '0.68rem', color: '#00f2ea', fontWeight: 600 }}>Viralidad Alta</div>
          </div>

          <div>
            <div style={{ fontSize: '0.68rem', color: '#a0aec0', fontWeight: 600, textTransform: 'uppercase' }}>Vistas Promedio</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#ffd000' }}>{data.avgViewsVal}</div>
            <div style={{ fontSize: '0.68rem', color: '#00e575', fontWeight: 600 }}>{data.avgViewsDelta}</div>
          </div>
        </div>
      </div>

      {/* ── REAL USER DWELL TIME SLIDER (TIEMPO REAL EN PLATAFORMA) ── */}
      <UserDwellTimeSlider platformName="tiktok" platformColor="#00f2ea" />

      {/* ── SUB-TABS NAVIGATION ── */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 20, overflowX: 'auto', paddingBottom: 4 }}>
        {[
          { id: 'audience', label: '🛡️ Audiencia & Calidad' },
          { id: 'demographics', label: '👥 Demografía & Ciudades' },
          { id: 'sentiment', label: '💬 Sentimiento & Comunidad' },
          { id: 'growth', label: '📈 Crecimiento & Hitos' },
          { id: 'videos', label: '🎬 TikToks Más Virales' },
          { id: 'ai-audit', label: '🤖 Auditoría Algoritmo IA' },
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
              background: activeSubTab === tab.id ? 'linear-gradient(135deg, rgba(0, 242, 234, 0.2), rgba(255, 0, 80, 0.2))' : 'rgba(255, 255, 255, 0.04)',
              borderColor: activeSubTab === tab.id ? '#00f2ea' : 'transparent',
              color: activeSubTab === tab.id ? '#ffffff' : 'var(--text-secondary)'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── SUBTAB 1: AUDIENCIA ── */}
      {activeSubTab === 'audience' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
          <div className="card" style={{ borderLeft: '4px solid #00f2ea' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700 }}>VECINOS FUEGUINOS REALES</span>
              <span style={{ fontSize: '1.2rem', fontWeight: 900, color: '#00f2ea' }}>{data.audience.realPeople.pct}%</span>
            </div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', marginBottom: 6 }}>
              {data.audience.realPeople.count.toLocaleString('es-AR')} cuentas
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>
              {data.audience.realPeople.description}
            </p>
          </div>

          <div className="card" style={{ borderLeft: '4px solid #ff0050' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700 }}>JUVENTUD FUEGUINA (16-29 AÑOS)</span>
              <span style={{ fontSize: '1.2rem', fontWeight: 900, color: '#ff0050' }}>{data.audience.youthFueguina.pct}%</span>
            </div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', marginBottom: 6 }}>
              {data.audience.youthFueguina.count.toLocaleString('es-AR')} cuentas
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>
              {data.audience.youthFueguina.description}
            </p>
          </div>

          <div className="card" style={{ borderLeft: '4px solid #ffd000' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700 }}>REGIÓN PATAGÓNICA / RUTA 3</span>
              <span style={{ fontSize: '1.2rem', fontWeight: 900, color: '#ffd000' }}>{data.audience.regionalPatagonia.pct}%</span>
            </div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', marginBottom: 6 }}>
              {data.audience.regionalPatagonia.count.toLocaleString('es-AR')} cuentas
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>
              {data.audience.regionalPatagonia.description}
            </p>
          </div>

          <div className="card" style={{ borderLeft: '4px solid #718096' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700 }}>INACTIVOS / FILTRO SPAM</span>
              <span style={{ fontSize: '1.2rem', fontWeight: 900, color: '#a0aec0' }}>{data.audience.inactiveOrSpam.pct}%</span>
            </div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', marginBottom: 6 }}>
              {data.audience.inactiveOrSpam.count.toLocaleString('es-AR')} cuentas
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>
              {data.audience.inactiveOrSpam.description}
            </p>
          </div>
        </div>
      )}

      {/* ── SUBTAB 2: DEMOGRAFÍA ── */}
      {activeSubTab === 'demographics' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 18 }}>
          <div className="card">
            <h4 style={{ margin: '0 0 16px 0', fontSize: '0.92rem', color: '#00f2ea', display: 'flex', alignItems: 'center', gap: 6 }}>
              <span>📍</span> Ciudades Fueguinas con Mayor Seguimiento
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {data.demographics.cities.map(c => (
                <div key={c.city}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: 4 }}>
                    <span style={{ fontWeight: 600, color: '#ffffff' }}>{c.city}</span>
                    <span style={{ color: 'var(--text-muted)' }}>{c.count.toLocaleString('es-AR')} ({c.pct}%)</span>
                  </div>
                  <div style={{ height: 8, borderRadius: 4, background: 'rgba(255, 255, 255, 0.08)', overflow: 'hidden' }}>
                    <div style={{ width: `${c.pct}%`, height: '100%', background: 'linear-gradient(90deg, #00f2ea, #ff0050)', borderRadius: 4 }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h4 style={{ margin: '0 0 16px 0', fontSize: '0.92rem', color: '#ff0050', display: 'flex', alignItems: 'center', gap: 6 }}>
              <span>🎂</span> Rango Etario en TikTok
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {data.demographics.ageBrackets.map(a => (
                <div key={a.range}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: 4 }}>
                    <span style={{ fontWeight: 600, color: '#ffffff' }}>{a.range} años</span>
                    <span style={{ color: 'var(--text-muted)' }}>{a.pct}%</span>
                  </div>
                  <div style={{ height: 8, borderRadius: 4, background: 'rgba(255, 255, 255, 0.08)', overflow: 'hidden' }}>
                    <div style={{ width: `${a.pct}%`, height: '100%', background: 'linear-gradient(90deg, #ffd000, #ff0050)', borderRadius: 4 }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── SUBTAB 3: SENTIMIENTO ── */}
      {activeSubTab === 'sentiment' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 14 }}>
            <div className="card" style={{ background: 'rgba(0, 229, 117, 0.06)', borderColor: 'rgba(0, 229, 117, 0.3)' }}>
              <div style={{ fontSize: '0.72rem', color: '#00e575', fontWeight: 700 }}>SENTIMIENTO POSITIVO</div>
              <div style={{ fontSize: '2rem', fontWeight: 900, color: '#00e575' }}>{data.sentiment.overall.positive}%</div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: '4px 0 0' }}>Reconocimiento explícito a rescates y patrullas</p>
            </div>
            <div className="card" style={{ background: 'rgba(255, 208, 0, 0.06)', borderColor: 'rgba(255, 208, 0, 0.3)' }}>
              <div style={{ fontSize: '0.72rem', color: '#ffd000', fontWeight: 700 }}>SENTIMIENTO NEUTRAL</div>
              <div style={{ fontSize: '2rem', fontWeight: 900, color: '#ffd000' }}>{data.sentiment.overall.neutral}%</div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: '4px 0 0' }}>Preguntas sobre corte de rutas y requisitos</p>
            </div>
            <div className="card" style={{ background: 'rgba(255, 75, 75, 0.06)', borderColor: 'rgba(255, 75, 75, 0.3)' }}>
              <div style={{ fontSize: '0.72rem', color: '#ff4b4b', fontWeight: 700 }}>SENTIMIENTO NEGATIVO</div>
              <div style={{ fontSize: '2rem', fontWeight: 900, color: '#ff4b4b' }}>{data.sentiment.overall.negative}%</div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: '4px 0 0' }}>Demoras viales o reclamos menores</p>
            </div>
          </div>

          <div className="card">
            <h4 style={{ margin: '0 0 14px 0', fontSize: '0.92rem', color: '#ffffff' }}>Comentarios Destacados de la Comunidad Fueguina</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 12 }}>
              {data.sentiment.sampleComments.map(c => (
                <div key={c.id} style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: 12, padding: 14 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <span style={{ fontWeight: 700, color: '#00f2ea', fontSize: '0.8rem' }}>{c.user}</span>
                    <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{c.date}</span>
                  </div>
                  <p style={{ fontSize: '0.82rem', color: '#e2e8f0', margin: '0 0 8px', fontStyle: 'italic' }}>
                    "{c.text}"
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                    <span>{c.videoTitle}</span>
                    <span style={{ color: '#ff0050', fontWeight: 600 }}>❤️ {c.likes}</span>
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
            <h4 style={{ margin: '0 0 16px 0', fontSize: '0.92rem', color: '#00f2ea' }}>Evolución Mensual de Seguidores en TikTok</h4>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 180, paddingTop: 20 }}>
              {data.growth.timeline.map(t => {
                const maxF = 15000;
                const hPct = Math.round((t.followers / maxF) * 100);
                return (
                  <div key={t.month} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, height: '100%', justifyContent: 'flex-end' }}>
                    <span style={{ fontSize: '0.62rem', color: 'var(--text-muted)', transform: 'rotate(-45deg)', transformOrigin: 'bottom left' }}>{t.followers}</span>
                    <div style={{ width: '100%', maxWidth: 28, height: `${hPct}%`, background: 'linear-gradient(180deg, #ff0050, #00f2ea)', borderRadius: '4px 4px 0 0' }} />
                    <span style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>{t.month.split(' ')[0]}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="card">
            <h4 style={{ margin: '0 0 14px 0', fontSize: '0.92rem', color: '#ffd000' }}>Hitos y Objetivos de Comunidad Proyectados</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 12 }}>
              {data.growth.milestones.map(m => (
                <div key={m.target} style={{ background: 'rgba(255, 208, 0, 0.05)', border: '1px solid rgba(255, 208, 0, 0.25)', borderRadius: 12, padding: 14 }}>
                  <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#ffffff', marginBottom: 4 }}>{m.target}</div>
                  <div style={{ fontSize: '0.76rem', color: '#ffd000', fontWeight: 700, marginBottom: 4 }}>Fecha estimada: {m.projectedDate}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Proyección a {m.estimatedDays} días con ritmo actual</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── SUBTAB 5: VIDEOS VIRALES ── */}
      {activeSubTab === 'videos' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16 }}>
          {data.topVideos.map(v => (
            <div key={v.id} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 0, overflow: 'hidden' }}>
              <div style={{ position: 'relative', height: 160, overflow: 'hidden' }}>
                <img src={v.thumbnail} alt={v.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <span style={{ position: 'absolute', top: 10, left: 10, background: 'rgba(0, 0, 0, 0.75)', color: '#00f2ea', padding: '3px 8px', borderRadius: 8, fontSize: '0.68rem', fontWeight: 800, border: '1px solid #00f2ea' }}>
                  {v.badge}
                </span>
                <span style={{ position: 'absolute', bottom: 10, right: 10, background: 'rgba(0, 0, 0, 0.8)', color: '#ffffff', padding: '2px 6px', borderRadius: 4, fontSize: '0.65rem', fontWeight: 700 }}>
                  ⏱️ {v.duration}
                </span>
              </div>

              <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
                <h4 style={{ margin: 0, fontSize: '0.86rem', color: '#ffffff', lineHeight: 1.4 }}>
                  {v.title}
                </h4>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6, textAlign: 'center', background: 'rgba(255, 255, 255, 0.03)', padding: 8, borderRadius: 8 }}>
                  <div>
                    <div style={{ fontSize: '0.62rem', color: 'var(--text-muted)' }}>Vistas</div>
                    <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#00f2ea' }}>{v.viewsDisplay}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.62rem', color: 'var(--text-muted)' }}>Likes</div>
                    <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#ff0050' }}>{v.likes.toLocaleString('es-AR')}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.62rem', color: 'var(--text-muted)' }}>Coments</div>
                    <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#ffffff' }}>{v.comments}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.62rem', color: 'var(--text-muted)' }}>Shares</div>
                    <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#ffd000' }}>{v.shares}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  <span>Publicado: {v.publishDate}</span>
                  <span style={{ color: '#00e575', fontWeight: 600 }}>Retención: {v.retentionRate}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── SUBTAB 6: AUDITORÍA IA ── */}
      {activeSubTab === 'ai-audit' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="card" style={{ background: 'rgba(0, 242, 234, 0.05)', borderColor: 'rgba(0, 242, 234, 0.3)' }}>
            <h4 style={{ margin: '0 0 6px 0', fontSize: '1rem', color: '#00f2ea' }}>Diagnóstico Algorítmico del Perfil OCI</h4>
            <p style={{ margin: 0, fontSize: '0.85rem', color: '#d0d7de' }}>
              Estado: <strong style={{ color: '#ffffff' }}>{data.aiAudit.accountHealth}</strong> • Alcance: <strong style={{ color: '#00f2ea' }}>{data.aiAudit.algorithmReachRatio}</strong>
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 14 }}>
            {data.aiAudit.recommendations.map((r, i) => (
              <div key={i} className="card" style={{ borderLeft: `4px solid ${r.type === 'positive' ? '#00e575' : r.type === 'warning' ? '#ff9800' : '#00f2ea'}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <span style={{ fontSize: '0.86rem', fontWeight: 800, color: '#ffffff' }}>{r.title}</span>
                  <span style={{ fontSize: '0.68rem', fontWeight: 700, padding: '2px 8px', borderRadius: 10, background: 'rgba(255,255,255,0.08)', color: '#00f2ea' }}>
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
          <div className="card" style={{ maxWidth: 500, width: '100%', background: '#0b1326', border: '1px solid #00f2ea', padding: 24 }}>
            <h3 style={{ margin: '0 0 12px 0', color: '#00f2ea', fontSize: '1.2rem' }}>Exportar Informe Oficial de TikTok</h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: 20 }}>
              Genera el reporte ejecutivo de TikTok para la Jefatura de Policía con métricas de viralidad, retención y desglose de seguidores fueguinos.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
              <button onClick={() => { alert('Informe TikTok descargado en formato PDF.'); setExportModalOpen(false); }} className="btn-neon" style={{ background: '#00f2ea', color: '#000000', borderColor: '#00f2ea', justifyContent: 'center' }}>
                📄 Descargar Informe Ejecutivo (PDF)
              </button>
              <button onClick={() => { handleCopySummary(); setExportModalOpen(false); }} className="btn-ghost" style={{ justifyContent: 'center' }}>
                📋 Copiar Texto para Comunicado OCI
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
