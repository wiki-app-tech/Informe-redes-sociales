import React, { useState, useMemo } from 'react';
import type {
  PlatformKey,
  TimeframeKey,
  InteractionFilterKey,
  ContentTypeKey,
  DestacadoContentCard
} from '../data/estadisticasData';
import {
  PLATFORM_INFO,
  TIMEFRAMES,
  INTERACTION_FILTERS,
  REAL_USER_FEATURED_POSTS,
  getStatsForSelection
} from '../data/estadisticasData';
import { IconExternalLink, IconDownload, IconBarChart, IconSearch, IconClock, IconUsers } from './Sidebar';

export const EstadisticasResumen: React.FC = () => {
  // Navigation & Filter States
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformKey>('instagram');
  const [selectedTimeframe, setSelectedTimeframe] = useState<TimeframeKey>('30d');
  const [interactionFilter, setInteractionFilter] = useState<InteractionFilterKey>('todos');
  const [activeSubTab, setActiveSubTab] = useState<'resumen' | 'contenido' | 'audiencia'>('resumen');

  // Carousel State
  const [carouselIndex, setCarouselIndex] = useState<number>(0);
  const [carouselAutoPlay, setCarouselAutoPlay] = useState<boolean>(false);

  // Search in detailed content
  const [contentSearch, setContentSearch] = useState<string>('');

  // Dynamically computed stats for current platform + timeframe
  const stats = useMemo(() => {
    return getStatsForSelection(selectedPlatform, selectedTimeframe);
  }, [selectedPlatform, selectedTimeframe]);

  // Current platform metadata
  const currentPlatInfo = PLATFORM_INFO[selectedPlatform];

  // Featured contents sorted by views
  const featuredContents = useMemo(() => {
    // If not 'all', prioritize that platform or show relevant content
    if (selectedPlatform === 'all') {
      return [...REAL_USER_FEATURED_POSTS].sort((a, b) => b.views - a.views);
    }
    const filtered = REAL_USER_FEATURED_POSTS.filter(p => p.platform === selectedPlatform);
    if (filtered.length >= 2) {
      return filtered.sort((a, b) => b.views - a.views);
    }
    // Fallback: show all sorted
    return [...REAL_USER_FEATURED_POSTS].sort((a, b) => b.views - a.views);
  }, [selectedPlatform]);

  // Active card in carousel
  const currentFeaturedCard = featuredContents[carouselIndex % featuredContents.length] || featuredContents[0];

  const handleNextCarousel = () => {
    setCarouselIndex(prev => (prev + 1) % featuredContents.length);
  };

  const handlePrevCarousel = () => {
    setCarouselIndex(prev => (prev - 1 + featuredContents.length) % featuredContents.length);
  };

  // Helper to extract the metric value according to interactionFilter
  const getInteractionValue = (item: typeof stats.interactionsByType[0]) => {
    switch (interactionFilter) {
      case 'megusta':     return item.megusta;
      case 'comentarios': return item.comentarios;
      case 'reposteos':   return item.reposteos;
      case 'compartidos': return item.compartidos;
      case 'guardados':   return item.guardados;
      case 'respuestas':  return item.respuestas;
      case 'todos':
      default:
        return item.total;
    }
  };

  // Total interactions for selected filter across all formats
  const totalFilteredInteractions = useMemo(() => {
    return stats.interactionsByType.reduce((sum, item) => sum + getInteractionValue(item), 0);
  }, [stats, interactionFilter]);

  // Max value for progress bar scaling
  const maxInteractionValue = useMemo(() => {
    const values = stats.interactionsByType.map(item => getInteractionValue(item));
    return Math.max(...values, 1);
  }, [stats, interactionFilter]);

  return (
    <div style={{ marginBottom: 36 }}>

      {/* ── 1. HEADER & PLATFORM SWITCHER ── */}
      <div
        style={{
          background: 'linear-gradient(135deg, rgba(17, 75, 114, 0.45), rgba(8, 25, 38, 0.98))',
          border: '1px solid rgba(17, 75, 114, 0.55)',
          borderRadius: 20,
          padding: '24px 28px',
          marginBottom: 22,
          boxShadow: '0 12px 35px rgba(0, 0, 0, 0.5)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 16, marginBottom: 20 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
              <span style={{ fontSize: '1.4rem' }}>{currentPlatInfo.icon}</span>
              <h1
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.5rem',
                  fontWeight: 800,
                  color: '#ffffff',
                  margin: 0,
                  letterSpacing: '-0.01em'
                }}
              >
                Estadísticas de Redes Sociales
              </h1>
              <span
                style={{
                  background: 'rgba(27, 181, 0, 0.15)',
                  color: '#1bb500',
                  border: '1px solid rgba(27, 181, 0, 0.35)',
                  fontSize: '0.68rem',
                  fontWeight: 800,
                  padding: '3px 10px',
                  borderRadius: 999
                }}
              >
                EN VIVO
              </span>
            </div>
            <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: 0 }}>
              Panel analítico oficial de la Policía Provincial de Tierra del Fuego · {currentPlatInfo.name} ({currentPlatInfo.handle})
            </p>
          </div>

          {/* Sub-tabs: Resumen / Contenido / Audiencia */}
          <div
            style={{
              display: 'inline-flex',
              background: 'rgba(0, 0, 0, 0.5)',
              padding: 4,
              borderRadius: 12,
              border: '1px solid rgba(255, 255, 255, 0.07)'
            }}
          >
            {[
              { id: 'resumen',   label: '⭐ Resumen',               desc: 'Visión general' },
              { id: 'contenido', label: '📋 Contenido Detallado',   desc: 'Todas las piezas' },
              { id: 'audiencia', label: '👥 Audiencia & Ubicación', desc: 'Ushuaia · RG · Tolhuin' },
            ].map(tab => {
              const active = activeSubTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveSubTab(tab.id as any)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: 9,
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '0.78rem',
                    fontWeight: active ? 800 : 600,
                    background: active ? 'var(--neon)' : 'transparent',
                    color: active ? '#0f0d13' : '#94a3b8',
                    transition: 'all 0.15s ease',
                    boxShadow: active ? '0 4px 12px rgba(0, 229, 117, 0.3)' : 'none'
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Platform Selector Buttons */}
        <div>
          <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>
            Seleccionar Plataforma Oficial:
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {(Object.keys(PLATFORM_INFO) as PlatformKey[]).map(key => {
              const p = PLATFORM_INFO[key];
              const isSelected = selectedPlatform === key;
              return (
                <button
                  key={key}
                  onClick={() => {
                    setSelectedPlatform(key);
                    setCarouselIndex(0);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 7,
                    padding: '7px 15px',
                    borderRadius: 999,
                    cursor: 'pointer',
                    fontSize: '0.75rem',
                    fontWeight: isSelected ? 800 : 600,
                    transition: 'all 0.18s ease',
                    background: isSelected ? p.bgGradient : 'rgba(255, 255, 255, 0.04)',
                    color: isSelected ? '#ffffff' : '#cbd5e1',
                    border: isSelected ? '1px solid rgba(255, 255, 255, 0.35)' : '1px solid rgba(255, 255, 255, 0.08)',
                    boxShadow: isSelected ? '0 4px 14px rgba(0, 0, 0, 0.45)' : 'none',
                    transform: isSelected ? 'scale(1.03)' : 'scale(1)'
                  }}
                >
                  <span>{p.icon}</span>
                  <span>{p.name}</span>
                  {isSelected && <span style={{ fontSize: '0.7rem', marginLeft: 2 }}>✓</span>}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── 2. TIMEFRAME FILTER BAR (180d, 90d, 60d, 30d, 14d, 7d) ── */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 12,
          padding: '12px 18px',
          background: 'rgba(10, 34, 52, 0.85)',
          borderRadius: 14,
          border: '1px solid rgba(17, 75, 114, 0.35)',
          marginBottom: 22
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: '0.9rem' }}>⏱️</span>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#e2e8f0' }}>Período de Análisis:</span>
          <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
            (Calculando métricas para los últimos {TIMEFRAMES.find(t => t.key === selectedTimeframe)?.days} días)
          </span>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {TIMEFRAMES.map(tf => {
            const isSelected = selectedTimeframe === tf.key;
            return (
              <button
                key={tf.key}
                onClick={() => setSelectedTimeframe(tf.key)}
                style={{
                  padding: '6px 14px',
                  borderRadius: 8,
                  border: isSelected ? '1px solid #fcb900' : '1px solid rgba(255, 255, 255, 0.07)',
                  background: isSelected ? 'rgba(252, 185, 0, 0.18)' : 'rgba(255, 255, 255, 0.03)',
                  color: isSelected ? '#ffd700' : '#94a3b8',
                  fontSize: '0.73rem',
                  fontWeight: isSelected ? 800 : 600,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                {tf.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── 3. RESUMEN TAB CONTENT ── */}
      {activeSubTab === 'resumen' && (
        <>
          {/* Top 4 Key Metrics Cards: Todo el contenido, Visualizaciones, Seguidores netos, Interacciones */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: 16,
              marginBottom: 26
            }}
          >
            {/* Card 1: Todo el contenido */}
            <div
              className="card"
              style={{
                padding: '20px 22px',
                background: 'linear-gradient(145deg, #131720, #0c0f14)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: 16,
                position: 'relative'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Todo el contenido
                </span>
                <span style={{ fontSize: '1.2rem' }}>📁</span>
              </div>
              <div
                style={{
                  fontSize: '2rem',
                  fontWeight: 900,
                  fontFamily: 'var(--font-heading)',
                  color: '#ffffff',
                  marginBottom: 6
                }}
              >
                {stats.totalContent.toLocaleString('es-AR')}
              </div>
              <div style={{ fontSize: '0.7rem', color: '#64748b', display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                <span>⭕ Stories ({stats.viewsByType[0].piecesCount})</span> ·
                <span>🖼️ Posts ({stats.viewsByType[1].piecesCount})</span> ·
                <span>🎬 Reels ({stats.viewsByType[2].piecesCount})</span>
              </div>
            </div>

            {/* Card 2: Cantidad de visualizaciones */}
            <div
              className="card"
              style={{
                padding: '20px 22px',
                background: 'linear-gradient(145deg, #131720, #0c0f14)',
                border: '1px solid rgba(0, 229, 117, 0.25)',
                borderRadius: 16,
                position: 'relative'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Cantidad de visualizaciones
                </span>
                <span style={{ fontSize: '1.2rem' }}>👁️</span>
              </div>
              <div
                style={{
                  fontSize: '2rem',
                  fontWeight: 900,
                  fontFamily: 'var(--font-heading)',
                  color: '#00e575',
                  marginBottom: 6
                }}
              >
                {stats.totalViews.toLocaleString('es-AR')}
              </div>
              <div style={{ fontSize: '0.72rem', color: '#00e575', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4 }}>
                <span>↑ +{stats.viewsDeltaPct}%</span>
                <span style={{ color: '#64748b', fontWeight: 500 }}>vs período anterior</span>
              </div>
            </div>

            {/* Card 3: Seguidores netos */}
            <div
              className="card"
              style={{
                padding: '20px 22px',
                background: 'linear-gradient(145deg, #131720, #0c0f14)',
                border: '1px solid rgba(59, 130, 246, 0.25)',
                borderRadius: 16,
                position: 'relative'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Seguidores netos
                </span>
                <span style={{ fontSize: '1.2rem' }}>📈</span>
              </div>
              <div
                style={{
                  fontSize: '2rem',
                  fontWeight: 900,
                  fontFamily: 'var(--font-heading)',
                  color: '#60a5fa',
                  marginBottom: 6
                }}
              >
                {stats.netFollowers > 0 ? `+${stats.netFollowers.toLocaleString('es-AR')}` : stats.netFollowers.toLocaleString('es-AR')}
              </div>
              <div style={{ fontSize: '0.72rem', color: '#94a3b8', display: 'flex', gap: 8 }}>
                <span style={{ color: '#34d399', fontWeight: 700 }}>+{stats.followersGained.toLocaleString('es-AR')} ganados</span>
                <span style={{ color: '#f87171' }}>-{stats.followersLost.toLocaleString('es-AR')} bajas</span>
              </div>
            </div>

            {/* Card 4: Interacciones */}
            <div
              className="card"
              style={{
                padding: '20px 22px',
                background: 'linear-gradient(145deg, #131720, #0c0f14)',
                border: '1px solid rgba(244, 63, 94, 0.25)',
                borderRadius: 16,
                position: 'relative'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Interacciones Totales
                </span>
                <span style={{ fontSize: '1.2rem' }}>⚡</span>
              </div>
              <div
                style={{
                  fontSize: '2rem',
                  fontWeight: 900,
                  fontFamily: 'var(--font-heading)',
                  color: '#f43f5e',
                  marginBottom: 6
                }}
              >
                {stats.totalInteractions.toLocaleString('es-AR')}
              </div>
              <div style={{ fontSize: '0.72rem', color: '#f43f5e', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4 }}>
                <span>↑ +{stats.interactionsDeltaPct}%</span>
                <span style={{ color: '#64748b', fontWeight: 500 }}>Tasa ER: {stats.engagementRate}%</span>
              </div>
            </div>
          </div>

          {/* ── MAIN 2-COLUMN GRID: [LEFT: Views & Interactions by Content Type] & [RIGHT: Carrusel lateral con contenidos destacados] ── */}
          <div className="resumen-split-grid">
            {/* ── LEFT COLUMN: APARTADOS DE VISUALIZACIÓN E INTERACCIONES ── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24, minWidth: 0 }}>

              {/* ── SECCIÓN A: VISUALIZACIÓN POR TIPO DE CONTENIDO (SEGUIDORES vs NO SEGUIDORES) ── */}
              <div
                className="card"
                style={{
                  padding: 24,
                  background: '#092133',
                  border: '1px solid rgba(17, 75, 114, 0.5)',
                  borderRadius: 18,
                  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.4)'
                }}
              >
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 12, marginBottom: 18 }}>
                  <div>
                    <h3
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1.15rem',
                        fontWeight: 800,
                        color: '#ffffff',
                        margin: '0 0 4px 0',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8
                      }}
                    >
                      <span>📊</span>
                      <span>Visualización por tipo de contenido</span>
                    </h3>
                    <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: 0 }}>
                      Desglose de visualizaciones entre <strong>Seguidores</strong> y <strong>No seguidores</strong>
                    </p>
                  </div>

                  {/* Legend Indicator */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: '0.72rem', background: 'rgba(255,255,255,0.04)', padding: '6px 12px', borderRadius: 8 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 2, background: '#3b82f6' }} />
                      <span style={{ color: '#93c5fd', fontWeight: 700 }}>Seguidores</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 2, background: '#a855f7' }} />
                      <span style={{ color: '#d8b4fe', fontWeight: 700 }}>No seguidores</span>
                    </div>
                  </div>
                </div>

                {/* Content Type Bars: Historias, Publicaciones, Reels, Transmisiones en vivo */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {stats.viewsByType.map(item => {
                    return (
                      <div
                        key={item.type}
                        style={{
                          background: 'rgba(255, 255, 255, 0.02)',
                          border: '1px solid rgba(255, 255, 255, 0.05)',
                          borderRadius: 12,
                          padding: '14px 16px'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <span style={{ fontSize: '1.1rem' }}>{item.icon}</span>
                            <span style={{ fontWeight: 800, fontSize: '0.86rem', color: '#ffffff' }}>{item.label}</span>
                            <span style={{ fontSize: '0.68rem', color: '#64748b' }}>({item.piecesCount} publicaciones)</span>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <span style={{ fontWeight: 900, fontSize: '1rem', color: '#00e575', fontFamily: 'var(--font-heading)' }}>
                              {item.totalViews.toLocaleString('es-AR')}
                            </span>
                            <span style={{ fontSize: '0.68rem', color: '#94a3b8', marginLeft: 5 }}>vistas</span>
                          </div>
                        </div>

                        {/* Dual Stacked Progress Bar (Followers vs Non-Followers) */}
                        <div
                          style={{
                            height: 14,
                            width: '100%',
                            background: 'rgba(255, 255, 255, 0.06)',
                            borderRadius: 7,
                            overflow: 'hidden',
                            display: 'flex',
                            marginBottom: 8
                          }}
                        >
                          <div
                            style={{
                              width: `${item.followersPct}%`,
                              background: '#3b82f6',
                              height: '100%',
                              transition: 'width 0.4s ease'
                            }}
                            title={`Seguidores: ${item.followersViews.toLocaleString('es-AR')} (${item.followersPct}%)`}
                          />
                          <div
                            style={{
                              width: `${item.nonFollowersPct}%`,
                              background: '#a855f7',
                              height: '100%',
                              transition: 'width 0.4s ease'
                            }}
                            title={`No seguidores: ${item.nonFollowersViews.toLocaleString('es-AR')} (${item.nonFollowersPct}%)`}
                          />
                        </div>

                        {/* Text breakdown percentages and counts */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem' }}>
                          <span style={{ color: '#93c5fd', fontWeight: 600 }}>
                            Seguidores: <strong>{item.followersViews.toLocaleString('es-AR')}</strong> ({item.followersPct}%)
                          </span>
                          <span style={{ color: '#d8b4fe', fontWeight: 600 }}>
                            No seguidores: <strong>{item.nonFollowersViews.toLocaleString('es-AR')}</strong> ({item.nonFollowersPct}%)
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* ── SECCIÓN B: INTERACCIONES POR TIPO DE CONTENIDO CON FILTRO ── */}
              <div
                className="card"
                style={{
                  padding: 24,
                  background: '#092133',
                  border: '1px solid rgba(17, 75, 114, 0.5)',
                  borderRadius: 18,
                  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.4)'
                }}
              >
                <div style={{ marginBottom: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <h3
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1.15rem',
                        fontWeight: 800,
                        color: '#ffffff',
                        margin: 0,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8
                      }}
                    >
                      <span>💬</span>
                      <span>Interacciones por tipo de contenido</span>
                    </h3>
                    <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#f43f5e' }}>
                      {totalFilteredInteractions.toLocaleString('es-AR')} totales
                    </span>
                  </div>
                  <p style={{ fontSize: '0.74rem', color: '#94a3b8', margin: 0 }}>
                    Filtra por tipo de interacción para comparar el rendimiento de cada formato:
                  </p>
                </div>

                {/* Filter Buttons: Todos, Me gusta, Comentarios, Reposteos, Compartidos, Guardados, Respuestas */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }}>
                  {INTERACTION_FILTERS.map(f => {
                    const isSelected = interactionFilter === f.key;
                    return (
                      <button
                        key={f.key}
                        onClick={() => setInteractionFilter(f.key)}
                        style={{
                          padding: '6px 12px',
                          borderRadius: 8,
                          border: isSelected ? '1px solid #f43f5e' : '1px solid rgba(255, 255, 255, 0.08)',
                          background: isSelected ? 'rgba(244, 63, 94, 0.2)' : 'rgba(255, 255, 255, 0.03)',
                          color: isSelected ? '#ff4d6d' : '#94a3b8',
                          fontSize: '0.72rem',
                          fontWeight: isSelected ? 800 : 600,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 5,
                          transition: 'all 0.15s ease'
                        }}
                      >
                        <span>{f.icon}</span>
                        <span>{f.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Interactive Interaction Comparison Bars */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {stats.interactionsByType.map(item => {
                    const value = getInteractionValue(item);
                    const pctOfFiltered = totalFilteredInteractions > 0
                      ? Math.round((value / totalFilteredInteractions) * 100)
                      : 0;
                    const barWidth = Math.max(4, Math.round((value / maxInteractionValue) * 100));

                    return (
                      <div
                        key={item.type}
                        style={{
                          background: 'rgba(255, 255, 255, 0.02)',
                          border: '1px solid rgba(255, 255, 255, 0.05)',
                          borderRadius: 12,
                          padding: '12px 16px'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <span style={{ fontSize: '1.1rem' }}>{item.icon}</span>
                            <span style={{ fontWeight: 800, fontSize: '0.84rem', color: '#ffffff' }}>{item.label}</span>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <span style={{ fontWeight: 900, fontSize: '0.95rem', color: '#f43f5e', fontFamily: 'var(--font-heading)' }}>
                              {value.toLocaleString('es-AR')}
                            </span>
                            <span style={{ fontSize: '0.7rem', color: '#94a3b8', marginLeft: 6 }}>
                              ({pctOfFiltered}%)
                            </span>
                          </div>
                        </div>

                        {/* Bar */}
                        <div
                          style={{
                            height: 10,
                            width: '100%',
                            background: 'rgba(255, 255, 255, 0.06)',
                            borderRadius: 5,
                            overflow: 'hidden',
                            marginBottom: 8
                          }}
                        >
                          <div
                            style={{
                              width: `${barWidth}%`,
                              height: '100%',
                              background: 'linear-gradient(90deg, #f43f5e, #fb7185)',
                              borderRadius: 5,
                              transition: 'width 0.4s ease'
                            }}
                          />
                        </div>

                        {/* Detailed Mini Breakdown when 'Todos' or overall context */}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, fontSize: '0.68rem', color: '#64748b' }}>
                          <span>❤️ {item.megusta.toLocaleString('es-AR')} likes</span>
                          <span>💬 {item.comentarios.toLocaleString('es-AR')} com.</span>
                          <span>🔄 {item.reposteos.toLocaleString('es-AR')} reposts</span>
                          <span>↗️ {item.compartidos.toLocaleString('es-AR')} comp.</span>
                          <span>🔖 {item.guardados.toLocaleString('es-AR')} guard.</span>
                          <span>↩️ {item.respuestas.toLocaleString('es-AR')} resp.</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* ── RIGHT COLUMN: CARRUSEL LATERAL CON TARJETAS DE CONTENIDOS DESTACADOS (CONTENIDO REAL DEL USUARIO) ── */}
            <div className="resumen-carousel-col">
              <div
                className="card"
                style={{
                  padding: '22px 20px',
                  background: 'linear-gradient(160deg, #0d304b, #081d2c)',
                  border: '1px solid rgba(17, 75, 114, 0.55)',
                  borderRadius: 20,
                  boxShadow: '0 16px 40px rgba(0, 0, 0, 0.65)'
                }}
              >
                {/* Header with Navigation Controls */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ fontSize: '1rem' }}>🏆</span>
                      <h3
                        style={{
                          fontFamily: 'var(--font-heading)',
                          fontSize: '0.98rem',
                          fontWeight: 800,
                          color: '#ffffff',
                          margin: 0
                        }}
                      >
                        Contenidos Destacados
                      </h3>
                    </div>
                    <div style={{ fontSize: '0.68rem', color: '#94a3b8', marginTop: 2 }}>
                      Rankeados según visualización real
                    </div>
                  </div>

                  {/* Carousel Controls */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 700, marginRight: 2 }}>
                      {carouselIndex + 1} / {featuredContents.length}
                    </span>
                    <button
                      onClick={handlePrevCarousel}
                      title="Anterior"
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: 8,
                        background: 'rgba(255, 255, 255, 0.08)',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        color: '#ffffff',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.8rem',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      ◀
                    </button>
                    <button
                      onClick={handleNextCarousel}
                      title="Siguiente"
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: 8,
                        background: 'rgba(0, 229, 117, 0.18)',
                        border: '1px solid rgba(0, 229, 117, 0.4)',
                        color: '#00e575',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.8rem',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      ▶
                    </button>
                  </div>
                </div>

                {/* ── ACTIVE CARD IN CAROUSEL ── */}
                <div
                  style={{
                    background: '#090b10',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: 16,
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {/* Image Preview with Badges */}
                  <div style={{ position: 'relative', width: '100%', height: 180, overflow: 'hidden' }}>
                    <img
                      src={currentFeaturedCard.imageUrl}
                      alt={currentFeaturedCard.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block'
                      }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to top, rgba(9, 11, 16, 0.95) 0%, rgba(9, 11, 16, 0.2) 60%, transparent 100%)'
                      }}
                    />

                    {/* Top Badges */}
                    <div style={{ position: 'absolute', top: 12, left: 12, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                      <span
                        style={{
                          background: 'rgba(0, 0, 0, 0.75)',
                          backdropFilter: 'blur(6px)',
                          color: '#00e575',
                          fontSize: '0.62rem',
                          fontWeight: 800,
                          padding: '3px 8px',
                          borderRadius: 6,
                          border: '1px solid rgba(0, 229, 117, 0.4)'
                        }}
                      >
                        {currentFeaturedCard.badge}
                      </span>
                      <span
                        style={{
                          background: 'rgba(0, 0, 0, 0.75)',
                          backdropFilter: 'blur(6px)',
                          color: '#ffffff',
                          fontSize: '0.62rem',
                          fontWeight: 700,
                          padding: '3px 8px',
                          borderRadius: 6,
                          border: '1px solid rgba(255, 255, 255, 0.15)'
                        }}
                      >
                        {currentFeaturedCard.typeLabel.toUpperCase()}
                      </span>
                    </div>

                    <div style={{ position: 'absolute', top: 12, right: 12 }}>
                      <span
                        style={{
                          background: 'rgba(0, 0, 0, 0.8)',
                          color: '#94a3b8',
                          fontSize: '0.62rem',
                          padding: '3px 8px',
                          borderRadius: 6
                        }}
                      >
                        {currentFeaturedCard.timeAgo}
                      </span>
                    </div>

                    {/* Bottom overlay: Views Big Count */}
                    <div style={{ position: 'absolute', bottom: 10, left: 14, right: 14 }}>
                      <div style={{ fontSize: '0.65rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                        Visualizaciones Totales
                      </div>
                      <div
                        style={{
                          fontSize: '1.45rem',
                          fontWeight: 900,
                          color: '#00e575',
                          fontFamily: 'var(--font-heading)',
                          textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)'
                        }}
                      >
                        {currentFeaturedCard.views.toLocaleString('es-AR')}
                      </div>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div style={{ padding: '16px 16px 18px 16px' }}>
                    {/* Real Title & Extract */}
                    <h4
                      style={{
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        color: '#f8fafc',
                        lineHeight: 1.4,
                        margin: '0 0 14px 0'
                      }}
                    >
                      {currentFeaturedCard.title}
                    </h4>

                    {/* Distribution: Seguidores vs No Seguidores */}
                    <div style={{ marginBottom: 16, background: 'rgba(255, 255, 255, 0.03)', padding: 12, borderRadius: 10 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', marginBottom: 6 }}>
                        <span style={{ color: '#93c5fd', fontWeight: 700 }}>
                          Seguidores: {currentFeaturedCard.followersPct}%
                        </span>
                        <span style={{ color: '#d8b4fe', fontWeight: 700 }}>
                          No seguidores: {currentFeaturedCard.nonFollowersPct}%
                        </span>
                      </div>
                      <div
                        style={{
                          height: 7,
                          background: 'rgba(255, 255, 255, 0.08)',
                          borderRadius: 4,
                          display: 'flex',
                          overflow: 'hidden'
                        }}
                      >
                        <div style={{ width: `${currentFeaturedCard.followersPct}%`, background: '#3b82f6', height: '100%' }} />
                        <div style={{ width: `${currentFeaturedCard.nonFollowersPct}%`, background: '#a855f7', height: '100%' }} />
                      </div>
                    </div>

                    {/* Interactions Grid */}
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(4, 1fr)',
                        gap: 6,
                        textAlign: 'center',
                        marginBottom: 16
                      }}
                    >
                      <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '8px 4px', borderRadius: 8 }}>
                        <div style={{ fontSize: '0.62rem', color: '#94a3b8' }}>Me gusta</div>
                        <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#f43f5e' }}>
                          {currentFeaturedCard.likes.toLocaleString('es-AR')}
                        </div>
                      </div>
                      <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '8px 4px', borderRadius: 8 }}>
                        <div style={{ fontSize: '0.62rem', color: '#94a3b8' }}>Comentarios</div>
                        <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#60a5fa' }}>
                          {currentFeaturedCard.comments.toLocaleString('es-AR')}
                        </div>
                      </div>
                      <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '8px 4px', borderRadius: 8 }}>
                        <div style={{ fontSize: '0.62rem', color: '#94a3b8' }}>Compartidos</div>
                        <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#34d399' }}>
                          {currentFeaturedCard.shares.toLocaleString('es-AR')}
                        </div>
                      </div>
                      <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '8px 4px', borderRadius: 8 }}>
                        <div style={{ fontSize: '0.62rem', color: '#94a3b8' }}>Guardados</div>
                        <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#fbbf24' }}>
                          {currentFeaturedCard.saves.toLocaleString('es-AR')}
                        </div>
                      </div>
                    </div>

                    {/* External Link Button */}
                    <a
                      href={currentFeaturedCard.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-ghost"
                      style={{
                        width: '100%',
                        fontSize: '0.74rem',
                        justifyContent: 'center',
                        gap: 6,
                        borderColor: 'rgba(255, 255, 255, 0.15)',
                        color: '#f8fafc'
                      }}
                    >
                      <span>Ver contenido original</span>
                      <IconExternalLink />
                    </a>
                  </div>
                </div>

                {/* Carousel Pagination Dots */}
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 6, marginTop: 14 }}>
                  {featuredContents.map((c, idx) => (
                    <button
                      key={c.id}
                      onClick={() => setCarouselIndex(idx)}
                      style={{
                        width: carouselIndex === idx ? 20 : 6,
                        height: 6,
                        borderRadius: 3,
                        border: 'none',
                        cursor: 'pointer',
                        background: carouselIndex === idx ? '#00e575' : 'rgba(255, 255, 255, 0.2)',
                        transition: 'all 0.2s ease',
                        padding: 0
                      }}
                    />
                  ))}
                </div>

                {/* Mini thumbnails strip to click directly */}
                <div style={{ marginTop: 16, borderTop: '1px solid rgba(255, 255, 255, 0.07)', paddingTop: 14 }}>
                  <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: 8 }}>
                    Otros contenidos del ranking:
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {featuredContents.map((item, idx) => {
                      const isActive = carouselIndex === idx;
                      return (
                        <div
                          key={item.id}
                          onClick={() => setCarouselIndex(idx)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 10,
                            padding: '6px 10px',
                            borderRadius: 10,
                            cursor: 'pointer',
                            background: isActive ? 'rgba(0, 229, 117, 0.1)' : 'rgba(255, 255, 255, 0.02)',
                            border: isActive ? '1px solid rgba(0, 229, 117, 0.3)' : '1px solid transparent',
                            transition: 'all 0.15s ease'
                          }}
                        >
                          <img
                            src={item.imageUrl}
                            alt=""
                            style={{ width: 34, height: 34, borderRadius: 6, objectFit: 'cover' }}
                          />
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div
                              style={{
                                fontSize: '0.72rem',
                                color: isActive ? '#00e575' : '#cbd5e1',
                                fontWeight: 700,
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                              }}
                            >
                              #{idx + 1} {item.title}
                            </div>
                            <div style={{ fontSize: '0.64rem', color: '#64748b' }}>
                              {item.views.toLocaleString('es-AR')} views · {item.typeLabel}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            </div>
          </div>
        </>
      )}

      {/* ── 4. SUB-TAB: CONTENIDO DETALLADO ── */}
      {activeSubTab === 'contenido' && (
        <div
          className="card"
          style={{
            padding: 24,
            background: '#0e121a',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: 18
          }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 14, marginBottom: 20 }}>
            <div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
                Auditoría de Todo el Contenido ({currentPlatInfo.name})
              </h3>
              <p style={{ fontSize: '0.72rem', color: '#94a3b8', margin: 0 }}>
                Lista completa de publicaciones oficiales con métricas de descubrimiento
              </p>
            </div>
            <div style={{ position: 'relative', width: 280 }}>
              <input
                type="text"
                placeholder="Buscar por tema o rescate..."
                value={contentSearch}
                onChange={e => setContentSearch(e.target.value)}
                style={{
                  width: '100%',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: 10,
                  padding: '8px 12px 8px 34px',
                  color: '#ffffff',
                  fontSize: '0.75rem'
                }}
              />
              <span style={{ position: 'absolute', left: 10, top: 9, fontSize: '0.8rem', color: '#64748b' }}>🔍</span>
            </div>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.75rem' }}>
              <thead>
                <tr style={{ background: 'rgba(255, 255, 255, 0.04)', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
                  <th style={{ padding: '10px 12px', textAlign: 'left' }}>Publicación / Temática</th>
                  <th style={{ padding: '10px 12px', textAlign: 'center' }}>Formato</th>
                  <th style={{ padding: '10px 12px', textAlign: 'right' }}>Visualizaciones</th>
                  <th style={{ padding: '10px 12px', textAlign: 'center' }}>Seg. vs No Seg.</th>
                  <th style={{ padding: '10px 12px', textAlign: 'right' }}>Interacciones</th>
                  <th style={{ padding: '10px 12px', textAlign: 'center' }}>Enlace</th>
                </tr>
              </thead>
              <tbody>
                {REAL_USER_FEATURED_POSTS
                  .filter(p => !contentSearch || p.title.toLowerCase().includes(contentSearch.toLowerCase()))
                  .map(p => (
                    <tr key={p.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                      <td style={{ padding: '12px', maxWidth: 300 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <img src={p.imageUrl} alt="" style={{ width: 40, height: 40, borderRadius: 6, objectFit: 'cover' }} />
                          <div>
                            <div style={{ fontWeight: 700, color: '#f8fafc', lineHeight: 1.3 }}>{p.title}</div>
                            <div style={{ fontSize: '0.65rem', color: '#64748b' }}>{p.date} · {p.badge}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '12px', textAlign: 'center' }}>
                        <span className="badge badge-neon" style={{ fontSize: '0.62rem' }}>{p.typeLabel}</span>
                      </td>
                      <td style={{ padding: '12px', textAlign: 'right', fontWeight: 800, color: '#00e575' }}>
                        {p.views.toLocaleString('es-AR')}
                      </td>
                      <td style={{ padding: '12px', textAlign: 'center' }}>
                        <span style={{ color: '#93c5fd' }}>{p.followersPct}%</span> / <span style={{ color: '#d8b4fe' }}>{p.nonFollowersPct}%</span>
                      </td>
                      <td style={{ padding: '12px', textAlign: 'right', color: '#f43f5e', fontWeight: 800 }}>
                        {(p.likes + p.comments + p.shares).toLocaleString('es-AR')}
                      </td>
                      <td style={{ padding: '12px', textAlign: 'center' }}>
                        <a href={p.url} target="_blank" rel="noopener noreferrer" style={{ color: '#00e575', textDecoration: 'none' }}>
                          Abrir ↗
                        </a>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── 5. SUB-TAB: AUDIENCIA & DEMOGRAFÍA ── */}
      {activeSubTab === 'audiencia' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 18 }}>
          <div className="card" style={{ padding: 22, background: '#0e121a', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: 16 }}>
            <h4 style={{ fontFamily: 'var(--font-heading)', color: '#ffffff', margin: '0 0 12px 0' }}>
              📍 Concentración en Tierra del Fuego
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: '0.75rem' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span>Río Grande</span>
                  <strong style={{ color: '#00e575' }}>52.4% (Audiencia mayoritaria)</strong>
                </div>
                <div className="progress-track"><div className="progress-fill" style={{ width: '52.4%', background: '#00e575' }} /></div>
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span>Ushuaia</span>
                  <strong style={{ color: '#3b82f6' }}>38.8%</strong>
                </div>
                <div className="progress-track"><div className="progress-fill" style={{ width: '38.8%', background: '#3b82f6' }} /></div>
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span>Tolhuin</span>
                  <strong style={{ color: '#a855f7' }}>8.8%</strong>
                </div>
                <div className="progress-track"><div className="progress-fill" style={{ width: '8.8%', background: '#a855f7' }} /></div>
              </div>
            </div>
          </div>

          <div className="card" style={{ padding: 22, background: '#0e121a', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: 16 }}>
            <h4 style={{ fontFamily: 'var(--font-heading)', color: '#ffffff', margin: '0 0 12px 0' }}>
              👥 Grupos de Edad
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: '0.75rem' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span>25 - 34 años</span>
                  <strong style={{ color: '#f43f5e' }}>36.2%</strong>
                </div>
                <div className="progress-track"><div className="progress-fill" style={{ width: '36.2%', background: '#f43f5e' }} /></div>
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span>35 - 44 años</span>
                  <strong style={{ color: '#fb923c' }}>28.4%</strong>
                </div>
                <div className="progress-track"><div className="progress-fill" style={{ width: '28.4%', background: '#fb923c' }} /></div>
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span>18 - 24 años (Fuerte en TikTok y Reels)</span>
                  <strong style={{ color: '#00f2fe' }}>22.1%</strong>
                </div>
                <div className="progress-track"><div className="progress-fill" style={{ width: '22.1%', background: '#00f2fe' }} /></div>
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span>45+ años</span>
                  <strong style={{ color: '#94a3b8' }}>13.3%</strong>
                </div>
                <div className="progress-track"><div className="progress-fill" style={{ width: '13.3%', background: '#94a3b8' }} /></div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
