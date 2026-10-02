import React, { useState, useMemo } from 'react';
import {
  TOP_MONTHLY_REELS,
  TOP_MONTHLY_STORIES,
  MONTHLY_CALENDAR_DAYS,
  DAILY_VIEWS_DATA,
  HOURLY_ACTIVITY_COMPARISON,
  WEEKLY_ACTIVITY_HEATMAP,
  MONTHLY_SUMMARY_KPIS,
  type MonthlyReel,
  type MonthlyStory,
  type DayCalendarData
} from '../data/resumenMensualData';

export const ResumenMensualSection: React.FC = () => {
  // ── States ──
  const [contentTab, setContentTab] = useState<'todos' | 'reels' | 'historias'>('todos');
  const [selectedDayNumber, setSelectedDayNumber] = useState<number>(29); // Día con top historia por defecto
  const [chartViewMode, setChartViewMode] = useState<'total' | 'desglose' | 'comparativa'>('desglose');
  const [hoveredDataPoint, setHoveredDataPoint] = useState<typeof DAILY_VIEWS_DATA[0] | null>(null);
  const [activityTimeFilter, setActivityTimeFilter] = useState<'todos' | 'pico' | 'manana' | 'noche'>('todos');
  const [previewModalItem, setPreviewModalItem] = useState<{ type: 'reel' | 'story'; item: MonthlyReel | MonthlyStory } | null>(null);

  // Selected calendar day data
  const selectedDayData: DayCalendarData = useMemo(() => {
    return MONTHLY_CALENDAR_DAYS.find(d => d.dayNumber === selectedDayNumber) || MONTHLY_CALENDAR_DAYS[0];
  }, [selectedDayNumber]);

  // Filtered hourly activity
  const filteredHourlyActivity = useMemo(() => {
    if (activityTimeFilter === 'pico') {
      return HOURLY_ACTIVITY_COMPARISON.filter(h => h.activityLevel === 'pico' || h.activityLevel === 'alta');
    }
    if (activityTimeFilter === 'manana') {
      return HOURLY_ACTIVITY_COMPARISON.filter(h => h.hour >= 6 && h.hour <= 13);
    }
    if (activityTimeFilter === 'noche') {
      return HOURLY_ACTIVITY_COMPARISON.filter(h => h.hour >= 18 && h.hour <= 23);
    }
    return HOURLY_ACTIVITY_COMPARISON;
  }, [activityTimeFilter]);

  // Max views in daily data for SVG chart scaling
  const maxDailyViews = useMemo(() => {
    return Math.max(...DAILY_VIEWS_DATA.map(d => d.totalViews), 1);
  }, []);

  return (
    <div style={{ marginBottom: 40 }} className="anim-fadein">

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 1. HEADER INSTITUCIONAL & KPIs MENSUALES                            */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <div
        style={{
          background: 'linear-gradient(135deg, rgba(10, 40, 78, 0.95), rgba(7, 24, 43, 0.98))',
          border: '1px solid rgba(255, 208, 0, 0.25)',
          borderRadius: 20,
          padding: '28px 30px',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.35)',
          position: 'relative',
          overflow: 'hidden',
          marginBottom: 24
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: -40,
            right: -40,
            width: 240,
            height: 240,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255, 208, 0, 0.12) 0%, transparent 70%)',
            pointerEvents: 'none'
          }}
        />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16, marginBottom: 20 }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '4px 12px', borderRadius: 9999, background: 'rgba(255, 208, 0, 0.12)', border: '1px solid rgba(255, 208, 0, 0.3)', marginBottom: 10 }}>
              <span style={{ fontSize: '0.85rem' }}>🛡️</span>
              <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#ffd000', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Policía de Tierra del Fuego · OCI
              </span>
            </div>
            <h1 style={{ margin: 0, fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: 10 }}>
              <span>Resumen Mensual: Reels, Historias y Actividad</span>
              <span style={{ fontSize: '0.8rem', padding: '3px 10px', borderRadius: 6, background: '#0a4b78', color: '#8de8ff', fontWeight: 700 }}>
                {MONTHLY_SUMMARY_KPIS.monthName}
              </span>
            </h1>
            <p style={{ margin: '8px 0 0', fontSize: '0.88rem', color: '#a0aec0', maxWidth: 820, lineHeight: 1.5 }}>
              Auditoría mensual completa del contenido de mayor impacto: ranking de Reels e Historias más visualizados, desglose comparativo de <strong>Seguidores vs. No Seguidores</strong>, calendario editorial de historias compartidas, curva evolutiva y mapa de momentos con mayor concurrencia ciudadana comparados con el mes anterior ({MONTHLY_SUMMARY_KPIS.prevMonthName}).
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: '0.75rem', color: '#a0aec0', fontWeight: 600 }}>Periodo analizado:</span>
            <div style={{ display: 'inline-flex', padding: '6px 14px', borderRadius: 10, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.14)', color: '#ffd000', fontWeight: 800, fontSize: '0.82rem' }}>
              📅 01 al 30 de Septiembre 2026
            </div>
          </div>
        </div>

        {/* KPI Strip Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 14,
            marginTop: 10
          }}
        >
          {/* Card 1: Total Views */}
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: '16px 18px' }}>
            <div style={{ fontSize: '0.72rem', color: '#a0aec0', fontWeight: 700, textTransform: 'uppercase', marginBottom: 4 }}>
              Visualizaciones Totales
            </div>
            <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.03em' }}>
              {(MONTHLY_SUMMARY_KPIS.totalMonthlyViews).toLocaleString('es-AR')}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4, fontSize: '0.74rem', color: '#48bb78', fontWeight: 700 }}>
              <span>▲ +{MONTHLY_SUMMARY_KPIS.viewsGrowthPct}%</span>
              <span style={{ color: '#718096', fontWeight: 500 }}>vs. {MONTHLY_SUMMARY_KPIS.prevMonthName}</span>
            </div>
          </div>

          {/* Card 2: No Seguidores (Descubrimiento) */}
          <div style={{ background: 'rgba(255, 208, 0, 0.04)', border: '1px solid rgba(255, 208, 0, 0.22)', borderRadius: 14, padding: '16px 18px' }}>
            <div style={{ fontSize: '0.72rem', color: '#ffd000', fontWeight: 700, textTransform: 'uppercase', marginBottom: 4 }}>
              No Seguidores (Descubrimiento)
            </div>
            <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#ffd000', letterSpacing: '-0.03em' }}>
              {(MONTHLY_SUMMARY_KPIS.nonFollowersViewsTotal).toLocaleString('es-AR')}
            </div>
            <div style={{ fontSize: '0.74rem', color: '#f6e05e', fontWeight: 700, marginTop: 4 }}>
              {MONTHLY_SUMMARY_KPIS.nonFollowersPctTotal}% del total · Expansión institucional
            </div>
          </div>

          {/* Card 3: Seguidores (Comunidad Fiel) */}
          <div style={{ background: 'rgba(0, 194, 255, 0.04)', border: '1px solid rgba(0, 194, 255, 0.22)', borderRadius: 14, padding: '16px 18px' }}>
            <div style={{ fontSize: '0.72rem', color: '#00c2ff', fontWeight: 700, textTransform: 'uppercase', marginBottom: 4 }}>
              Seguidores (Comunidad Fiel)
            </div>
            <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#00c2ff', letterSpacing: '-0.03em' }}>
              {(MONTHLY_SUMMARY_KPIS.followersViewsTotal).toLocaleString('es-AR')}
            </div>
            <div style={{ fontSize: '0.74rem', color: '#63b3ed', fontWeight: 700, marginTop: 4 }}>
              {MONTHLY_SUMMARY_KPIS.followersPctTotal}% del total · Fidelización fueguina
            </div>
          </div>

          {/* Card 4: Historias Publicadas */}
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: '16px 18px' }}>
            <div style={{ fontSize: '0.72rem', color: '#a0aec0', fontWeight: 700, textTransform: 'uppercase', marginBottom: 4 }}>
              Historias Compartidas
            </div>
            <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.03em' }}>
              {MONTHLY_SUMMARY_KPIS.storiesCount} historias
            </div>
            <div style={{ fontSize: '0.74rem', color: '#81e6d9', fontWeight: 700, marginTop: 4 }}>
              {MONTHLY_SUMMARY_KPIS.storiesAvgPerDay} historias/día · {MONTHLY_SUMMARY_KPIS.avgStoryRetentionRate}% retención
            </div>
          </div>

          {/* Card 5: Momento Pico */}
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: '16px 18px' }}>
            <div style={{ fontSize: '0.72rem', color: '#a0aec0', fontWeight: 700, textTransform: 'uppercase', marginBottom: 4 }}>
              Pico de Audiencia Activa
            </div>
            <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#f687b3', letterSpacing: '-0.03em' }}>
              {MONTHLY_SUMMARY_KPIS.peakHour}
            </div>
            <div style={{ fontSize: '0.74rem', color: '#ed64a6', fontWeight: 700, marginTop: 4 }}>
              {MONTHLY_SUMMARY_KPIS.peakConcurrentFollowers.toLocaleString('es-AR')} activos (+{MONTHLY_SUMMARY_KPIS.peakAudienceGrowthPct}% vs ago)
            </div>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 2. TOP REELS & HISTORIAS CON MÁS VISUALIZACIONES                    */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <div
        style={{
          background: 'rgba(8, 25, 44, 0.88)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: 18,
          padding: '24px 26px',
          boxShadow: '0 12px 36px rgba(0, 0, 0, 0.25)',
          marginBottom: 26
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 14, marginBottom: 20 }}>
          <div>
            <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span>🏆 Top Reels e Historias con Mayor Cantidad de Visualizaciones</span>
            </h2>
            <p style={{ margin: '4px 0 0', fontSize: '0.82rem', color: '#a0aec0' }}>
              Contenidos con mayor rendimiento viral y servicio a la comunidad durante {MONTHLY_SUMMARY_KPIS.monthName}. Desglose exacto de audiencia nueva (no seguidores) vs. comunidad fidelizada.
            </p>
          </div>

          {/* Formats Filter Switch */}
          <div style={{ display: 'flex', gap: 6, background: 'rgba(255,255,255,0.05)', padding: 4, borderRadius: 10, border: '1px solid rgba(255,255,255,0.1)' }}>
            <button
              onClick={() => setContentTab('todos')}
              style={{
                background: contentTab === 'todos' ? '#ffd000' : 'transparent',
                color: contentTab === 'todos' ? '#0a2038' : '#cbd5e0',
                border: 'none',
                borderRadius: 8,
                padding: '6px 14px',
                fontSize: '0.78rem',
                fontWeight: 800,
                cursor: 'pointer',
                transition: 'all 0.18s'
              }}
            >
              Todos ({TOP_MONTHLY_REELS.length + TOP_MONTHLY_STORIES.length})
            </button>
            <button
              onClick={() => setContentTab('reels')}
              style={{
                background: contentTab === 'reels' ? '#ffd000' : 'transparent',
                color: contentTab === 'reels' ? '#0a2038' : '#cbd5e0',
                border: 'none',
                borderRadius: 8,
                padding: '6px 14px',
                fontSize: '0.78rem',
                fontWeight: 800,
                cursor: 'pointer',
                transition: 'all 0.18s'
              }}
            >
              🎬 Reels ({TOP_MONTHLY_REELS.length})
            </button>
            <button
              onClick={() => setContentTab('historias')}
              style={{
                background: contentTab === 'historias' ? '#ffd000' : 'transparent',
                color: contentTab === 'historias' ? '#0a2038' : '#cbd5e0',
                border: 'none',
                borderRadius: 8,
                padding: '6px 14px',
                fontSize: '0.78rem',
                fontWeight: 800,
                cursor: 'pointer',
                transition: 'all 0.18s'
              }}
            >
              📸 Historias ({TOP_MONTHLY_STORIES.length})
            </button>
          </div>
        </div>

        {/* Content Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: 20 }}>
          {/* REELS CARDS */}
          {(contentTab === 'todos' || contentTab === 'reels') &&
            TOP_MONTHLY_REELS.map((reel, idx) => (
              <div
                key={reel.id}
                style={{
                  background: 'linear-gradient(180deg, rgba(14, 38, 64, 0.85), rgba(9, 24, 42, 0.95))',
                  border: '1px solid rgba(255, 208, 0, 0.18)',
                  borderRadius: 16,
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.28)'
                }}
              >
                {/* Media Image & Badges */}
                <div style={{ position: 'relative', height: 180, overflow: 'hidden' }}>
                  <img
                    src={reel.thumbnail}
                    alt={reel.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(9, 24, 42, 0.9) 100%)'
                    }}
                  />
                  {/* Top Badges */}
                  <div style={{ position: 'absolute', top: 12, left: 12, display: 'flex', gap: 6 }}>
                    <span style={{ background: '#ffd000', color: '#0a2038', padding: '3px 8px', borderRadius: 6, fontSize: '0.7rem', fontWeight: 800 }}>
                      🎬 REEL
                    </span>
                    <span style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(4px)', color: '#fff', padding: '3px 8px', borderRadius: 6, fontSize: '0.68rem', fontWeight: 700 }}>
                      ⏱️ {reel.duration}
                    </span>
                  </div>
                  <div style={{ position: 'absolute', top: 12, right: 12 }}>
                    <span style={{ background: 'rgba(10, 75, 120, 0.85)', backdropFilter: 'blur(4px)', color: '#ffd000', border: '1px solid rgba(255,208,0,0.3)', padding: '3px 8px', borderRadius: 6, fontSize: '0.68rem', fontWeight: 800 }}>
                      {reel.badge}
                    </span>
                  </div>
                  {/* Rank in bottom left */}
                  <div style={{ position: 'absolute', bottom: 10, left: 14, display: 'flex', alignItems: 'baseline', gap: 6 }}>
                    <span style={{ fontSize: '1.4rem', fontWeight: 900, color: '#ffd000' }}>#{idx + 1}</span>
                    <span style={{ fontSize: '0.74rem', color: '#cbd5e0', fontWeight: 600 }}>{reel.date}</span>
                  </div>
                </div>

                {/* Card Body */}
                <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <h3 style={{ margin: '0 0 12px', fontSize: '0.94rem', fontWeight: 700, color: '#f7fafc', lineHeight: 1.4, minHeight: 40 }}>
                    {reel.title}
                  </h3>

                  {/* Visualizaciones Giant Callout */}
                  <div style={{ background: 'rgba(0,0,0,0.25)', borderRadius: 12, padding: '12px 14px', marginBottom: 14 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
                      <span style={{ fontSize: '0.74rem', color: '#a0aec0', fontWeight: 600 }}>Visualizaciones Totales</span>
                      <span style={{ fontSize: '1.28rem', fontWeight: 900, color: '#ffffff' }}>
                        {reel.totalViews.toLocaleString('es-AR')}
                      </span>
                    </div>

                    {/* Progress Bar (Followers vs Non-Followers) */}
                    <div style={{ height: 10, borderRadius: 9999, background: 'rgba(255,255,255,0.1)', overflow: 'hidden', display: 'flex', marginBottom: 8 }}>
                      <div
                        style={{
                          width: `${reel.nonFollowersPct}%`,
                          background: 'linear-gradient(90deg, #ffd000, #ff9f00)',
                          height: '100%',
                          transition: 'width 0.5s'
                        }}
                        title={`No Seguidores: ${reel.nonFollowersViews.toLocaleString('es-AR')} (${reel.nonFollowersPct}%)`}
                      />
                      <div
                        style={{
                          width: `${reel.followersPct}%`,
                          background: 'linear-gradient(90deg, #00c2ff, #0084ff)',
                          height: '100%',
                          transition: 'width 0.5s'
                        }}
                        title={`Seguidores: ${reel.followersViews.toLocaleString('es-AR')} (${reel.followersPct}%)`}
                      />
                    </div>

                    {/* Legend */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                        <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#ffd000', display: 'inline-block' }} />
                        <span style={{ color: '#ffd000', fontWeight: 700 }}>
                          No Seguidores: {reel.nonFollowersViews.toLocaleString('es-AR')} ({reel.nonFollowersPct}%)
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                        <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#00c2ff', display: 'inline-block' }} />
                        <span style={{ color: '#00c2ff', fontWeight: 700 }}>
                          Seguidores: {reel.followersViews.toLocaleString('es-AR')} ({reel.followersPct}%)
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Key Stats Row */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginBottom: 14, textAlign: 'center' }}>
                    <div style={{ background: 'rgba(255,255,255,0.03)', padding: '6px 4px', borderRadius: 8 }}>
                      <div style={{ fontSize: '0.68rem', color: '#a0aec0' }}>❤️ Me gusta</div>
                      <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#fff' }}>{reel.likes.toLocaleString('es-AR')}</div>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.03)', padding: '6px 4px', borderRadius: 8 }}>
                      <div style={{ fontSize: '0.68rem', color: '#a0aec0' }}>💬 Coment.</div>
                      <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#fff' }}>{reel.comments.toLocaleString('es-AR')}</div>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.03)', padding: '6px 4px', borderRadius: 8 }}>
                      <div style={{ fontSize: '0.68rem', color: '#a0aec0' }}>↗️ Compart.</div>
                      <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#ffd000' }}>{reel.shares.toLocaleString('es-AR')}</div>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.03)', padding: '6px 4px', borderRadius: 8 }}>
                      <div style={{ fontSize: '0.68rem', color: '#a0aec0' }}>👤 Nuevos</div>
                      <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#48bb78' }}>+{reel.newFollowersGained}</div>
                    </div>
                  </div>

                  {/* Footer button */}
                  <div style={{ marginTop: 'auto', display: 'flex', gap: 8 }}>
                    <button
                      onClick={() => setPreviewModalItem({ type: 'reel', item: reel })}
                      style={{
                        flex: 1,
                        background: 'rgba(255, 208, 0, 0.12)',
                        color: '#ffd000',
                        border: '1px solid rgba(255, 208, 0, 0.3)',
                        borderRadius: 8,
                        padding: '8px 12px',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 6
                      }}
                    >
                      <span>🔍 Ver Análisis Detallado</span>
                    </button>
                    <a
                      href={reel.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        background: 'rgba(255,255,255,0.06)',
                        color: '#fff',
                        border: '1px solid rgba(255,255,255,0.12)',
                        borderRadius: 8,
                        padding: '8px 12px',
                        fontSize: '0.78rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                      title="Abrir en Instagram"
                    >
                      ↗️
                    </a>
                  </div>
                </div>
              </div>
            ))}

          {/* HISTORIAS CARDS */}
          {(contentTab === 'todos' || contentTab === 'historias') &&
            TOP_MONTHLY_STORIES.map((story, idx) => (
              <div
                key={story.id}
                style={{
                  background: 'linear-gradient(180deg, rgba(14, 38, 64, 0.85), rgba(9, 24, 42, 0.95))',
                  border: '1px solid rgba(0, 194, 255, 0.22)',
                  borderRadius: 16,
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.28)'
                }}
              >
                {/* Media Image & Badges */}
                <div style={{ position: 'relative', height: 180, overflow: 'hidden' }}>
                  <img
                    src={story.thumbnail}
                    alt={story.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(9, 24, 42, 0.9) 100%)'
                    }}
                  />
                  {/* Top Badges */}
                  <div style={{ position: 'absolute', top: 12, left: 12, display: 'flex', gap: 6 }}>
                    <span style={{ background: '#00c2ff', color: '#041829', padding: '3px 8px', borderRadius: 6, fontSize: '0.7rem', fontWeight: 800 }}>
                      📸 HISTORIA
                    </span>
                    <span style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(4px)', color: '#fff', padding: '3px 8px', borderRadius: 6, fontSize: '0.68rem', fontWeight: 700 }}>
                      🕒 {story.time}
                    </span>
                  </div>
                  <div style={{ position: 'absolute', top: 12, right: 12 }}>
                    <span style={{ background: 'rgba(0, 75, 120, 0.85)', backdropFilter: 'blur(4px)', color: '#8de8ff', border: '1px solid rgba(0,194,255,0.4)', padding: '3px 8px', borderRadius: 6, fontSize: '0.68rem', fontWeight: 800 }}>
                      {story.badge}
                    </span>
                  </div>
                  {/* Rank in bottom left */}
                  <div style={{ position: 'absolute', bottom: 10, left: 14, display: 'flex', alignItems: 'baseline', gap: 6 }}>
                    <span style={{ fontSize: '1.4rem', fontWeight: 900, color: '#00c2ff' }}>#{idx + 1}</span>
                    <span style={{ fontSize: '0.74rem', color: '#cbd5e0', fontWeight: 600 }}>{story.date}</span>
                  </div>
                </div>

                {/* Card Body */}
                <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <h3 style={{ margin: '0 0 12px', fontSize: '0.94rem', fontWeight: 700, color: '#f7fafc', lineHeight: 1.4, minHeight: 40 }}>
                    {story.title}
                  </h3>

                  {/* Visualizaciones Giant Callout */}
                  <div style={{ background: 'rgba(0,0,0,0.25)', borderRadius: 12, padding: '12px 14px', marginBottom: 14 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
                      <span style={{ fontSize: '0.74rem', color: '#a0aec0', fontWeight: 600 }}>Visualizaciones Totales</span>
                      <span style={{ fontSize: '1.28rem', fontWeight: 900, color: '#ffffff' }}>
                        {story.totalViews.toLocaleString('es-AR')}
                      </span>
                    </div>

                    {/* Progress Bar (Followers vs Non-Followers) */}
                    <div style={{ height: 10, borderRadius: 9999, background: 'rgba(255,255,255,0.1)', overflow: 'hidden', display: 'flex', marginBottom: 8 }}>
                      <div
                        style={{
                          width: `${story.followersPct}%`,
                          background: 'linear-gradient(90deg, #00c2ff, #0084ff)',
                          height: '100%',
                          transition: 'width 0.5s'
                        }}
                        title={`Seguidores: ${story.followersViews.toLocaleString('es-AR')} (${story.followersPct}%)`}
                      />
                      <div
                        style={{
                          width: `${story.nonFollowersPct}%`,
                          background: 'linear-gradient(90deg, #ffd000, #ff9f00)',
                          height: '100%',
                          transition: 'width 0.5s'
                        }}
                        title={`No Seguidores: ${story.nonFollowersViews.toLocaleString('es-AR')} (${story.nonFollowersPct}%)`}
                      />
                    </div>

                    {/* Legend */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                        <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#00c2ff', display: 'inline-block' }} />
                        <span style={{ color: '#00c2ff', fontWeight: 700 }}>
                          Seguidores: {story.followersViews.toLocaleString('es-AR')} ({story.followersPct}%)
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                        <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#ffd000', display: 'inline-block' }} />
                        <span style={{ color: '#ffd000', fontWeight: 700 }}>
                          No Seguidores: {story.nonFollowersViews.toLocaleString('es-AR')} ({story.nonFollowersPct}%)
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Key Stats Row */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginBottom: 14, textAlign: 'center' }}>
                    <div style={{ background: 'rgba(255,255,255,0.03)', padding: '6px 4px', borderRadius: 8 }}>
                      <div style={{ fontSize: '0.68rem', color: '#a0aec0' }}>💬 Respuestas</div>
                      <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#fff' }}>{story.replies.toLocaleString('es-AR')}</div>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.03)', padding: '6px 4px', borderRadius: 8 }}>
                      <div style={{ fontSize: '0.68rem', color: '#a0aec0' }}>↗️ Compart.</div>
                      <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#00c2ff' }}>{story.shares.toLocaleString('es-AR')}</div>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.03)', padding: '6px 4px', borderRadius: 8 }}>
                      <div style={{ fontSize: '0.68rem', color: '#a0aec0' }}>⏮️ Retrocesos</div>
                      <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#ffd000' }}>{story.tapsBack.toLocaleString('es-AR')}</div>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.03)', padding: '6px 4px', borderRadius: 8 }}>
                      <div style={{ fontSize: '0.68rem', color: '#a0aec0' }}>🎯 Retención</div>
                      <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#48bb78' }}>{story.retentionRate}%</div>
                    </div>
                  </div>

                  {/* Footer button */}
                  <div style={{ marginTop: 'auto', display: 'flex', gap: 8 }}>
                    <button
                      onClick={() => setPreviewModalItem({ type: 'story', item: story })}
                      style={{
                        flex: 1,
                        background: 'rgba(0, 194, 255, 0.12)',
                        color: '#00c2ff',
                        border: '1px solid rgba(0, 194, 255, 0.3)',
                        borderRadius: 8,
                        padding: '8px 12px',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 6
                      }}
                    >
                      <span>🔍 Ver Detalle de Historia</span>
                    </button>
                    <button
                      onClick={() => setSelectedDayNumber(story.dayNumber)}
                      style={{
                        background: 'rgba(255,255,255,0.06)',
                        color: '#fff',
                        border: '1px solid rgba(255,255,255,0.12)',
                        borderRadius: 8,
                        padding: '8px 12px',
                        fontSize: '0.78rem',
                        cursor: 'pointer'
                      }}
                      title={`Ir al día ${story.dayNumber} en el calendario`}
                    >
                      📅 Ver Día
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 3. CALENDARIO MENSUAL DE HISTORIAS COMPARTIDAS                      */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <div
        style={{
          background: 'rgba(8, 25, 44, 0.88)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: 18,
          padding: '24px 26px',
          boxShadow: '0 12px 36px rgba(0, 0, 0, 0.25)',
          marginBottom: 26
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 14, marginBottom: 20 }}>
          <div>
            <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span>📅 Calendario Mensual de Historias Compartidas</span>
              <span style={{ fontSize: '0.75rem', padding: '3px 8px', borderRadius: 6, background: '#114b72', color: '#ffd000', fontWeight: 800 }}>
                Septiembre 2026
              </span>
            </h2>
            <p style={{ margin: '4px 0 0', fontSize: '0.82rem', color: '#a0aec0' }}>
              Mapa diario de publicaciones: haz clic en cualquier día para visualizar las historias compartidas, su horario, visualizaciones y respuestas ciudadanas.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: '0.74rem', color: '#cbd5e0' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ffd000', display: 'inline-block' }} />
              Día con Alerta / Hito Destacado
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#00c2ff', display: 'inline-block' }} />
              Historias Habituales
            </span>
          </div>
        </div>

        {/* 2-Column Layout: Calendar Grid on left, Selected Day Drawer on right */}
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 1fr)', gap: 24 }}>
          {/* Calendar Grid Container */}
          <div>
            {/* Days of Week Headers */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 6, marginBottom: 6, textAlign: 'center' }}>
              {['LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB', 'DOM'].map(d => (
                <div key={d} style={{ fontSize: '0.72rem', fontWeight: 800, color: '#718096', padding: '4px 0' }}>
                  {d}
                </div>
              ))}
            </div>

            {/* Calendar Cells (Septiembre 2026: Day 1 is Tuesday, so 1 empty cell on Monday) */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 6 }}>
              {/* Empty placeholder for Monday Aug 31 */}
              <div
                style={{
                  background: 'rgba(255,255,255,0.01)',
                  border: '1px dashed rgba(255,255,255,0.04)',
                  borderRadius: 10,
                  minHeight: 65,
                  padding: 6,
                  opacity: 0.3
                }}
              >
                <span style={{ fontSize: '0.72rem', color: '#4a5568' }}>31 Ago</span>
              </div>

              {MONTHLY_CALENDAR_DAYS.map(day => {
                const isSelected = day.dayNumber === selectedDayNumber;
                return (
                  <div
                    key={day.dayNumber}
                    onClick={() => setSelectedDayNumber(day.dayNumber)}
                    style={{
                      background: isSelected
                        ? 'linear-gradient(135deg, rgba(255, 208, 0, 0.22), rgba(11, 46, 77, 0.95))'
                        : day.hasHighlight
                        ? 'linear-gradient(135deg, rgba(17, 75, 114, 0.45), rgba(8, 25, 42, 0.8))'
                        : 'rgba(255, 255, 255, 0.03)',
                      border: isSelected
                        ? '2px solid #ffd000'
                        : day.hasHighlight
                        ? '1px solid rgba(255, 208, 0, 0.45)'
                        : '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: 10,
                      minHeight: 65,
                      padding: '7px 8px',
                      cursor: 'pointer',
                      transition: 'all 0.16s ease',
                      position: 'relative',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      boxShadow: isSelected ? '0 0 16px rgba(255, 208, 0, 0.35)' : 'none'
                    }}
                  >
                    {/* Header: Day number + Highlight dot */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span
                        style={{
                          fontSize: '0.82rem',
                          fontWeight: isSelected || day.hasHighlight ? 900 : 700,
                          color: isSelected ? '#ffd000' : day.hasHighlight ? '#ffd000' : '#e2e8f0'
                        }}
                      >
                        {day.dayNumber}
                      </span>
                      {day.hasHighlight && (
                        <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#ffd000', boxShadow: '0 0 8px #ffd000' }} />
                      )}
                    </div>

                    {/* Stories pill count */}
                    <div style={{ marginTop: 4 }}>
                      <div
                        style={{
                          fontSize: '0.64rem',
                          fontWeight: 700,
                          color: isSelected ? '#ffffff' : '#8de8ff',
                          background: isSelected ? '#0a4b78' : 'rgba(0, 194, 255, 0.12)',
                          borderRadius: 4,
                          padding: '2px 4px',
                          textAlign: 'center',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}
                      >
                        📸 {day.storiesCount} hist.
                      </div>
                      <div style={{ fontSize: '0.62rem', color: '#a0aec0', marginTop: 2, textAlign: 'center', fontWeight: 600 }}>
                        {(day.totalStoryViews / 1000).toFixed(1)}k v.
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{ marginTop: 12, fontSize: '0.74rem', color: '#718096', fontStyle: 'italic' }}>
              💡 Selecciona cualquier celda para ver el desglose minuto a minuto de historias emitidas ese día.
            </div>
          </div>

          {/* Selected Day Details Panel */}
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(10, 36, 62, 0.95), rgba(6, 20, 35, 0.98))',
              border: '1px solid rgba(255, 208, 0, 0.3)',
              borderRadius: 14,
              padding: '20px 22px',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <div style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: 14, marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.72rem', color: '#ffd000', fontWeight: 800, textTransform: 'uppercase' }}>
                  Detalle del Día Seleccionado
                </span>
                <span style={{ fontSize: '0.76rem', color: '#a0aec0' }}>
                  {selectedDayData.dayOfWeek} {selectedDayData.dayNumber} de Septiembre
                </span>
              </div>
              <h3 style={{ margin: '6px 0 0', fontSize: '1.15rem', color: '#fff', fontWeight: 800 }}>
                {selectedDayData.storiesCount} Historias Compartidas
              </h3>
              <div style={{ display: 'flex', gap: 12, marginTop: 8, fontSize: '0.76rem' }}>
                <span style={{ color: '#00c2ff', fontWeight: 700 }}>
                  👁️ {selectedDayData.totalStoryViews.toLocaleString('es-AR')} views totales
                </span>
                {selectedDayData.reelsCount > 0 && (
                  <span style={{ color: '#ffd000', fontWeight: 700 }}>
                    🎬 {selectedDayData.reelsCount} Reel publicado
                  </span>
                )}
              </div>
              {selectedDayData.highlightTitle && (
                <div style={{ marginTop: 8, padding: '6px 10px', borderRadius: 8, background: 'rgba(255,208,0,0.12)', border: '1px solid rgba(255,208,0,0.3)', color: '#ffd000', fontSize: '0.74rem', fontWeight: 700 }}>
                  ⭐ {selectedDayData.highlightTitle}
                </div>
              )}
            </div>

            {/* List of Stories of Selected Day */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, overflowY: 'auto', maxHeight: 380 }} className="scrollbar-hide">
              {selectedDayData.stories.map((s, idx) => (
                <div
                  key={s.id}
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 10,
                    padding: '12px 14px',
                    display: 'flex',
                    gap: 12
                  }}
                >
                  {/* Thumbnail */}
                  <img
                    src={s.thumbnail}
                    alt={s.title}
                    style={{ width: 55, height: 75, objectFit: 'cover', borderRadius: 6, flexShrink: 0 }}
                  />

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                      <span style={{ fontSize: '0.68rem', color: '#ffd000', fontWeight: 800 }}>
                        HISTORIA #{idx + 1} · {s.time}
                      </span>
                      <span style={{ fontSize: '0.66rem', padding: '2px 6px', borderRadius: 4, background: 'rgba(0,194,255,0.15)', color: '#8de8ff', fontWeight: 700 }}>
                        {s.retentionRate}% ret.
                      </span>
                    </div>

                    <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#f7fafc', lineHeight: 1.35, marginBottom: 8 }}>
                      {s.title}
                    </div>

                    {/* Views & Followers Breakdown */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: '#cbd5e0', marginBottom: 4 }}>
                      <span>👁️ <strong>{s.totalViews.toLocaleString('es-AR')}</strong> views</span>
                      <span>💬 {s.replies} resp.</span>
                      <span>↗️ {s.shares} comp.</span>
                    </div>

                    <div style={{ height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.1)', overflow: 'hidden', display: 'flex' }}>
                      <div style={{ width: `${s.followersPct}%`, background: '#00c2ff', height: '100%' }} />
                      <div style={{ width: `${s.nonFollowersPct}%`, background: '#ffd000', height: '100%' }} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.62rem', color: '#a0aec0', marginTop: 2 }}>
                      <span style={{ color: '#00c2ff' }}>Seguidores: {s.followersPct}%</span>
                      <span style={{ color: '#ffd000' }}>No Seguidores: {s.nonFollowersPct}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 4. GRÁFICO DEL NIVEL DE VISUALIZACIONES (30 DÍAS DE SEPTIEMBRE)     */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <div
        style={{
          background: 'rgba(8, 25, 44, 0.88)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: 18,
          padding: '24px 26px',
          boxShadow: '0 12px 36px rgba(0, 0, 0, 0.25)',
          marginBottom: 26
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 14, marginBottom: 20 }}>
          <div>
            <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span>📈 Gráfico del Nivel de las Visualizaciones (Evolución Diaria)</span>
            </h2>
            <p style={{ margin: '4px 0 0', fontSize: '0.82rem', color: '#a0aec0' }}>
              Seguimiento día por día de la tracción de visualizaciones en Septiembre. Picos impulsados por alertas de temporal y rescates de alta montaña.
            </p>
          </div>

          {/* Chart View Modes */}
          <div style={{ display: 'flex', gap: 6, background: 'rgba(255,255,255,0.05)', padding: 4, borderRadius: 10, border: '1px solid rgba(255,255,255,0.1)' }}>
            <button
              onClick={() => setChartViewMode('desglose')}
              style={{
                background: chartViewMode === 'desglose' ? '#ffd000' : 'transparent',
                color: chartViewMode === 'desglose' ? '#0a2038' : '#cbd5e0',
                border: 'none',
                borderRadius: 8,
                padding: '6px 14px',
                fontSize: '0.78rem',
                fontWeight: 800,
                cursor: 'pointer'
              }}
            >
              Seguidores vs. No Seguidores
            </button>
            <button
              onClick={() => setChartViewMode('total')}
              style={{
                background: chartViewMode === 'total' ? '#ffd000' : 'transparent',
                color: chartViewMode === 'total' ? '#0a2038' : '#cbd5e0',
                border: 'none',
                borderRadius: 8,
                padding: '6px 14px',
                fontSize: '0.78rem',
                fontWeight: 800,
                cursor: 'pointer'
              }}
            >
              Total Diario
            </button>
            <button
              onClick={() => setChartViewMode('comparativa')}
              style={{
                background: chartViewMode === 'comparativa' ? '#ffd000' : 'transparent',
                color: chartViewMode === 'comparativa' ? '#0a2038' : '#cbd5e0',
                border: 'none',
                borderRadius: 8,
                padding: '6px 14px',
                fontSize: '0.78rem',
                fontWeight: 800,
                cursor: 'pointer'
              }}
            >
              Vs. Mes Anterior (Agosto)
            </button>
          </div>
        </div>

        {/* Legend */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 16, fontSize: '0.76rem' }}>
          {chartViewMode === 'desglose' && (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 14, height: 14, borderRadius: 3, background: '#ffd000', display: 'inline-block' }} />
                <span style={{ color: '#ffd000', fontWeight: 700 }}>No Seguidores (Descubrimiento & Para Ti)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 14, height: 14, borderRadius: 3, background: '#00c2ff', display: 'inline-block' }} />
                <span style={{ color: '#00c2ff', fontWeight: 700 }}>Seguidores (Comunidad Fiel)</span>
              </div>
            </>
          )}
          {chartViewMode === 'total' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 14, height: 14, borderRadius: 3, background: '#ffd000', display: 'inline-block' }} />
              <span style={{ color: '#ffd000', fontWeight: 700 }}>Visualizaciones Diarias Totales (Reels + Historias)</span>
            </div>
          )}
          {chartViewMode === 'comparativa' && (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 14, height: 14, borderRadius: 3, background: '#ffd000', display: 'inline-block' }} />
                <span style={{ color: '#ffd000', fontWeight: 700 }}>Septiembre 2026 (Mes Actual)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 14, height: 14, borderRadius: 3, background: '#718096', display: 'inline-block' }} />
                <span style={{ color: '#a0aec0', fontWeight: 700 }}>Agosto 2026 (Mes Anterior)</span>
              </div>
            </>
          )}
        </div>

        {/* Responsive SVG Bar & Line Chart */}
        <div style={{ position: 'relative', width: '100%', height: 260, background: 'rgba(0,0,0,0.2)', borderRadius: 12, padding: '16px 12px 28px', boxSizing: 'border-box' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', height: '100%', gap: 4 }}>
            {DAILY_VIEWS_DATA.map(dp => {
              const totalPct = (dp.totalViews / maxDailyViews) * 100;
              const nonFollowersHeightPct = (dp.nonFollowersViews / maxDailyViews) * 100;
              const followersHeightPct = (dp.followersViews / maxDailyViews) * 100;
              const prevMonthHeightPct = (dp.prevMonthTotalViews / maxDailyViews) * 100;
              const isPeak = dp.day === 14 || dp.day === 8 || dp.day === 18 || dp.day === 29;

              return (
                <div
                  key={dp.day}
                  onMouseEnter={() => setHoveredDataPoint(dp)}
                  onMouseLeave={() => setHoveredDataPoint(null)}
                  onClick={() => setSelectedDayNumber(dp.day)}
                  style={{
                    flex: 1,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    cursor: 'pointer',
                    position: 'relative'
                  }}
                >
                  {/* Peak Marker Star */}
                  {isPeak && (
                    <span style={{ fontSize: '0.65rem', marginBottom: 2, color: '#ffd000' }}>⭐</span>
                  )}

                  {/* Mode: Desglose (Stacked Bar) */}
                  {chartViewMode === 'desglose' && (
                    <div style={{ width: '85%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', height: `${totalPct}%` }}>
                      <div
                        style={{
                          height: `${(dp.nonFollowersViews / dp.totalViews) * 100}%`,
                          background: isPeak ? 'linear-gradient(180deg, #ffe259, #ffa751)' : '#ffd000',
                          borderTopLeftRadius: 3,
                          borderTopRightRadius: 3
                        }}
                      />
                      <div
                        style={{
                          height: `${(dp.followersViews / dp.totalViews) * 100}%`,
                          background: '#00c2ff',
                          borderBottomLeftRadius: 3,
                          borderBottomRightRadius: 3
                        }}
                      />
                    </div>
                  )}

                  {/* Mode: Total */}
                  {chartViewMode === 'total' && (
                    <div
                      style={{
                        width: '85%',
                        height: `${totalPct}%`,
                        background: isPeak
                          ? 'linear-gradient(180deg, #ffd000, #ff8c00)'
                          : 'linear-gradient(180deg, #114b72, #0b2c45)',
                        borderTop: isPeak ? '2px solid #ffffff' : '1px solid #00c2ff',
                        borderRadius: '3px 3px 0 0'
                      }}
                    />
                  )}

                  {/* Mode: Comparativa */}
                  {chartViewMode === 'comparativa' && (
                    <div style={{ width: '85%', height: '100%', display: 'flex', alignItems: 'flex-end', gap: 2 }}>
                      <div
                        style={{
                          flex: 1,
                          height: `${totalPct}%`,
                          background: '#ffd000',
                          borderRadius: '2px 2px 0 0'
                        }}
                        title={`Septiembre: ${dp.totalViews.toLocaleString('es-AR')}`}
                      />
                      <div
                        style={{
                          flex: 1,
                          height: `${prevMonthHeightPct}%`,
                          background: '#4a5568',
                          borderRadius: '2px 2px 0 0'
                        }}
                        title={`Agosto: ${dp.prevMonthTotalViews.toLocaleString('es-AR')}`}
                      />
                    </div>
                  )}

                  {/* Day Label */}
                  <span
                    style={{
                      position: 'absolute',
                      bottom: -22,
                      fontSize: '0.62rem',
                      color: isPeak ? '#ffd000' : '#718096',
                      fontWeight: isPeak ? 900 : 600
                    }}
                  >
                    {dp.day}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Interactive Hover Tooltip */}
          {hoveredDataPoint && (
            <div
              style={{
                position: 'absolute',
                top: 16,
                right: 20,
                background: 'rgba(5, 18, 32, 0.95)',
                border: '1px solid #ffd000',
                borderRadius: 10,
                padding: '10px 14px',
                boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
                pointerEvents: 'none',
                zIndex: 10
              }}
            >
              <div style={{ fontSize: '0.74rem', color: '#ffd000', fontWeight: 800 }}>
                📅 {hoveredDataPoint.dateStr} ({hoveredDataPoint.dayName})
              </div>
              <div style={{ fontSize: '1.05rem', fontWeight: 900, color: '#fff', margin: '3px 0' }}>
                {hoveredDataPoint.totalViews.toLocaleString('es-AR')} visualizaciones
              </div>
              <div style={{ fontSize: '0.7rem', color: '#ffd000' }}>
                • No Seguidores: {hoveredDataPoint.nonFollowersViews.toLocaleString('es-AR')} ({((hoveredDataPoint.nonFollowersViews / hoveredDataPoint.totalViews) * 100).toFixed(1)}%)
              </div>
              <div style={{ fontSize: '0.7rem', color: '#00c2ff' }}>
                • Seguidores: {hoveredDataPoint.followersViews.toLocaleString('es-AR')} ({((hoveredDataPoint.followersViews / hoveredDataPoint.totalViews) * 100).toFixed(1)}%)
              </div>
              {hoveredDataPoint.highlightEvent && (
                <div style={{ marginTop: 4, fontSize: '0.68rem', color: '#68d391', fontWeight: 700 }}>
                  ⭐ {hoveredDataPoint.highlightEvent}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 5. REPORTE DE MAYORES MOMENTOS DE ACTIVIDAD VS MES ANTERIOR         */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <div
        style={{
          background: 'rgba(8, 25, 44, 0.88)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: 18,
          padding: '24px 26px',
          boxShadow: '0 12px 36px rgba(0, 0, 0, 0.25)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 14, marginBottom: 20 }}>
          <div>
            <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span>⏱️ Reporte de Mayores Momentos de Actividad (Comparativa vs. Mes Anterior)</span>
            </h2>
            <p style={{ margin: '4px 0 0', fontSize: '0.82rem', color: '#a0aec0' }}>
              Identificación de franjas horarias y días de mayor afluencia de seguidores en Tierra del Fuego. Comparación directa: Septiembre 2026 vs. Agosto 2026.
            </p>
          </div>

          {/* Time Filter Buttons */}
          <div style={{ display: 'flex', gap: 6, background: 'rgba(255,255,255,0.05)', padding: 4, borderRadius: 10, border: '1px solid rgba(255,255,255,0.1)' }}>
            <button
              onClick={() => setActivityTimeFilter('todos')}
              style={{
                background: activityTimeFilter === 'todos' ? '#ffd000' : 'transparent',
                color: activityTimeFilter === 'todos' ? '#0a2038' : '#cbd5e0',
                border: 'none',
                borderRadius: 8,
                padding: '6px 12px',
                fontSize: '0.76rem',
                fontWeight: 800,
                cursor: 'pointer'
              }}
            >
              24 Horas
            </button>
            <button
              onClick={() => setActivityTimeFilter('pico')}
              style={{
                background: activityTimeFilter === 'pico' ? '#ffd000' : 'transparent',
                color: activityTimeFilter === 'pico' ? '#0a2038' : '#cbd5e0',
                border: 'none',
                borderRadius: 8,
                padding: '6px 12px',
                fontSize: '0.76rem',
                fontWeight: 800,
                cursor: 'pointer'
              }}
            >
              🔥 Solo Horas Pico
            </button>
            <button
              onClick={() => setActivityTimeFilter('manana')}
              style={{
                background: activityTimeFilter === 'manana' ? '#ffd000' : 'transparent',
                color: activityTimeFilter === 'manana' ? '#0a2038' : '#cbd5e0',
                border: 'none',
                borderRadius: 8,
                padding: '6px 12px',
                fontSize: '0.76rem',
                fontWeight: 800,
                cursor: 'pointer'
              }}
            >
              🌅 Mañanas (Rutas)
            </button>
            <button
              onClick={() => setActivityTimeFilter('noche')}
              style={{
                background: activityTimeFilter === 'noche' ? '#ffd000' : 'transparent',
                color: activityTimeFilter === 'noche' ? '#0a2038' : '#cbd5e0',
                border: 'none',
                borderRadius: 8,
                padding: '6px 12px',
                fontSize: '0.76rem',
                fontWeight: 800,
                cursor: 'pointer'
              }}
            >
              🌙 Noches (Reels)
            </button>
          </div>
        </div>

        {/* Comparison Callout Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 14, marginBottom: 22 }}>
          <div style={{ background: 'linear-gradient(135deg, rgba(255, 208, 0, 0.12), rgba(11, 46, 77, 0.8))', border: '1px solid rgba(255, 208, 0, 0.35)', borderRadius: 12, padding: '16px 18px' }}>
            <div style={{ fontSize: '0.72rem', color: '#ffd000', fontWeight: 800, textTransform: 'uppercase' }}>
              Horario Central de Mayor Audiencia
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#fff', margin: '4px 0' }}>
              20:00 a 22:30 hs
            </div>
            <div style={{ fontSize: '0.76rem', color: '#8de8ff', lineHeight: 1.4 }}>
              Pico máximo: <strong>5.410 seguidores activos simultáneos</strong> (+18.1% vs Agosto que promedió 4.580).
            </div>
          </div>

          <div style={{ background: 'linear-gradient(135deg, rgba(0, 194, 255, 0.12), rgba(11, 46, 77, 0.8))', border: '1px solid rgba(0, 194, 255, 0.35)', borderRadius: 12, padding: '16px 18px' }}>
            <div style={{ fontSize: '0.72rem', color: '#00c2ff', fontWeight: 800, textTransform: 'uppercase' }}>
              Días de Máximo Alcance Semanal
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#fff', margin: '4px 0' }}>
              Miércoles y Viernes
            </div>
            <div style={{ fontSize: '0.76rem', color: '#8de8ff', lineHeight: 1.4 }}>
              Crecimiento de interacciones del <strong>+22.1% los miércoles</strong> gracias al lanzamiento de material audiovisual táctico.
            </div>
          </div>

          <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: 12, padding: '16px 18px' }}>
            <div style={{ fontSize: '0.72rem', color: '#68d391', fontWeight: 800, textTransform: 'uppercase' }}>
              Ventana Matutina de Alertas Viales
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#fff', margin: '4px 0' }}>
              07:15 a 08:45 hs
            </div>
            <div style={{ fontSize: '0.76rem', color: '#a0aec0', lineHeight: 1.4 }}>
              Incremento del <strong>+19.9% de interacción</strong> en historias con el estado de transitabilidad de la Ruta 3.
            </div>
          </div>
        </div>

        {/* Hourly Table Breakdown */}
        <div style={{ overflowX: 'auto', borderRadius: 12, border: '1px solid rgba(255,255,255,0.08)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.8rem' }}>
            <thead>
              <tr style={{ background: 'rgba(10, 36, 62, 0.95)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <th style={{ padding: '12px 16px', color: '#cbd5e0', fontWeight: 700 }}>Franja Horaria</th>
                <th style={{ padding: '12px 16px', color: '#ffd000', fontWeight: 800 }}>Seguidores Activos (Septiembre)</th>
                <th style={{ padding: '12px 16px', color: '#a0aec0', fontWeight: 700 }}>Mes Anterior (Agosto)</th>
                <th style={{ padding: '12px 16px', color: '#48bb78', fontWeight: 800 }}>Variación (%)</th>
                <th style={{ padding: '12px 16px', color: '#cbd5e0', fontWeight: 700 }}>Nivel de Actividad</th>
                <th style={{ padding: '12px 16px', color: '#cbd5e0', fontWeight: 700 }}>Formato Recomendado OCI</th>
              </tr>
            </thead>
            <tbody>
              {filteredHourlyActivity.map((h, i) => {
                const isPeak = h.activityLevel === 'pico';
                return (
                  <tr
                    key={h.hour}
                    style={{
                      background: isPeak ? 'rgba(255, 208, 0, 0.08)' : i % 2 === 0 ? 'rgba(255,255,255,0.015)' : 'transparent',
                      borderBottom: '1px solid rgba(255,255,255,0.04)'
                    }}
                  >
                    <td style={{ padding: '10px 16px', fontWeight: isPeak ? 900 : 700, color: isPeak ? '#ffd000' : '#fff' }}>
                      {h.hourLabel} hs
                    </td>
                    <td style={{ padding: '10px 16px', fontWeight: 800, color: '#ffffff' }}>
                      {h.currentMonthActiveFollowers.toLocaleString('es-AR')} usuarios
                    </td>
                    <td style={{ padding: '10px 16px', color: '#a0aec0' }}>
                      {h.prevMonthActiveFollowers.toLocaleString('es-AR')} usuarios
                    </td>
                    <td style={{ padding: '10px 16px', fontWeight: 800, color: '#48bb78' }}>
                      ▲ +{h.deltaPct}%
                    </td>
                    <td style={{ padding: '10px 16px' }}>
                      <span
                        style={{
                          padding: '3px 8px',
                          borderRadius: 4,
                          fontSize: '0.7rem',
                          fontWeight: 800,
                          background:
                            h.activityLevel === 'pico'
                              ? '#e53e3e'
                              : h.activityLevel === 'alta'
                              ? '#d69e2e'
                              : h.activityLevel === 'moderada'
                              ? '#3182ce'
                              : '#4a5568',
                          color: '#ffffff'
                        }}
                      >
                        {h.activityLevel.toUpperCase()}
                      </span>
                    </td>
                    <td style={{ padding: '10px 16px', color: isPeak ? '#ffd000' : '#cbd5e0', fontWeight: isPeak ? 700 : 500 }}>
                      {h.bestContentType}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Heatmap Matrix Overview */}
        <div style={{ marginTop: 24, padding: '16px 20px', background: 'rgba(0,0,0,0.2)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#fff', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
            <span>🗺️ Matriz Semanal de Calor de Actividad de Seguidores</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 8 }}>
            {WEEKLY_ACTIVITY_HEATMAP.map(d => (
              <div key={d.day} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#ffd000', marginBottom: 6 }}>
                  {d.dayShort}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  {d.hours.map(h => {
                    const opacity = Math.max(h.currentPct / 100, 0.15);
                    return (
                      <div
                        key={h.hour}
                        title={`${d.day} ${h.hour}:00 hs: ${h.currentPct}% actividad (+${(h.currentPct - h.prevPct).toFixed(1)}% vs agosto)`}
                        style={{
                          height: 18,
                          borderRadius: 3,
                          background: h.isPeak
                            ? `rgba(255, 208, 0, ${opacity})`
                            : `rgba(0, 194, 255, ${opacity})`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.58rem',
                          color: opacity > 0.5 ? '#000' : '#fff',
                          fontWeight: 700
                        }}
                      >
                        {h.hour}h
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12, fontSize: '0.7rem', color: '#718096' }}>
            <span>Escala: Menor Actividad (00-06h)</span>
            <span style={{ color: '#ffd000', fontWeight: 700 }}>Mayor Actividad Nocturna (19-22h)</span>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 6. MODAL DE DETALLE / PREVIEW                                       */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      {previewModalItem && (
        <div
          onClick={() => setPreviewModalItem(null)}
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
              border: '1px solid #ffd000',
              borderRadius: 18,
              maxWidth: 580,
              width: '100%',
              padding: 24,
              boxShadow: '0 25px 60px rgba(0,0,0,0.6)',
              position: 'relative'
            }}
          >
            <button
              onClick={() => setPreviewModalItem(null)}
              style={{
                position: 'absolute',
                top: 16,
                right: 16,
                background: 'rgba(255,255,255,0.1)',
                border: 'none',
                color: '#fff',
                borderRadius: '50%',
                width: 32,
                height: 32,
                cursor: 'pointer',
                fontWeight: 800
              }}
            >
              ✕
            </button>

            <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 12 }}>
              <span style={{ background: '#ffd000', color: '#0a2038', padding: '3px 8px', borderRadius: 4, fontSize: '0.72rem', fontWeight: 800 }}>
                {previewModalItem.type === 'reel' ? '🎬 REEL' : '📸 HISTORIA'}
              </span>
              <span style={{ color: '#a0aec0', fontSize: '0.76rem' }}>
                {previewModalItem.item.date}
              </span>
            </div>

            <h3 style={{ margin: '0 0 16px', fontSize: '1.1rem', color: '#fff', lineHeight: 1.4 }}>
              {previewModalItem.item.title}
            </h3>

            <div style={{ height: 220, borderRadius: 12, overflow: 'hidden', marginBottom: 16 }}>
              <img
                src={previewModalItem.item.thumbnail}
                alt={previewModalItem.item.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: 10, padding: 14, marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: '0.8rem', color: '#a0aec0' }}>Visualizaciones Totales:</span>
                <span style={{ fontSize: '1.2rem', fontWeight: 900, color: '#ffd000' }}>
                  {previewModalItem.item.totalViews.toLocaleString('es-AR')}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.76rem', color: '#fff' }}>
                <span style={{ color: '#ffd000' }}>
                  No Seguidores: {previewModalItem.item.nonFollowersViews.toLocaleString('es-AR')} ({previewModalItem.item.nonFollowersPct}%)
                </span>
                <span style={{ color: '#00c2ff' }}>
                  Seguidores: {previewModalItem.item.followersViews.toLocaleString('es-AR')} ({previewModalItem.item.followersPct}%)
                </span>
              </div>
            </div>

            <button
              onClick={() => setPreviewModalItem(null)}
              style={{
                width: '100%',
                background: '#ffd000',
                color: '#0a2038',
                border: 'none',
                borderRadius: 8,
                padding: '10px',
                fontWeight: 800,
                fontSize: '0.85rem',
                cursor: 'pointer'
              }}
            >
              Cerrar Vista Previa
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
