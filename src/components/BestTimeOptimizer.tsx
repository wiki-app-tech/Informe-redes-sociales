import React, { useState } from 'react';
import { IconClock, IconCheck, IconTrendUp } from './Sidebar';

export const BestTimeOptimizer: React.FC = () => {
  const [platform, setPlatform] = useState<'instagram' | 'tiktok' | 'facebook' | 'twitter' | 'linkedin' | 'youtube'>('instagram');

  const DAYS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

  // Top 5 peak times per platform
  const TOP_TIMES: Record<string, { day: string; time: string; engagement: string }[]> = {
    instagram: [
      { day: 'Miércoles', time: '18:00 hs', engagement: '9.4%' },
      { day: 'Viernes', time: '20:00 hs', engagement: '9.1%' },
      { day: 'Jueves', time: '19:00 hs', engagement: '8.8%' },
      { day: 'Sábado', time: '14:00 hs', engagement: '8.5%' },
      { day: 'Lunes', time: '21:00 hs', engagement: '8.2%' },
    ],
    tiktok: [
      { day: 'Jueves', time: '19:00 hs', engagement: '11.2%' },
      { day: 'Viernes', time: '22:00 hs', engagement: '10.8%' },
      { day: 'Sábado', time: '21:00 hs', engagement: '10.4%' },
      { day: 'Martes', time: '18:00 hs', engagement: '9.9%' },
      { day: 'Domingo', time: '15:00 hs', engagement: '9.5%' },
    ],
    facebook: [
      { day: 'Martes', time: '11:00 hs', engagement: '7.8%' },
      { day: 'Miércoles', time: '13:00 hs', engagement: '7.5%' },
      { day: 'Jueves', time: '12:00 hs', engagement: '7.2%' },
      { day: 'Viernes', time: '10:00 hs', engagement: '6.9%' },
      { day: 'Lunes', time: '14:00 hs', engagement: '6.7%' },
    ],
    twitter: [
      { day: 'Lunes', time: '09:00 hs', engagement: '5.8%' },
      { day: 'Miércoles', time: '12:00 hs', engagement: '5.5%' },
      { day: 'Viernes', time: '17:00 hs', engagement: '5.2%' },
      { day: 'Martes', time: '08:00 hs', engagement: '4.9%' },
      { day: 'Jueves', time: '13:00 hs', engagement: '4.7%' },
    ],
    linkedin: [
      { day: 'Martes', time: '10:00 hs', engagement: '6.4%' },
      { day: 'Miércoles', time: '09:00 hs', engagement: '6.1%' },
      { day: 'Jueves', time: '11:00 hs', engagement: '5.9%' },
      { day: 'Viernes', time: '08:30 hs', engagement: '5.4%' },
      { day: 'Lunes', time: '10:30 hs', engagement: '5.1%' },
    ],
    youtube: [
      { day: 'Viernes', time: '17:00 hs', engagement: '9.8%' },
      { day: 'Sábado', time: '15:00 hs', engagement: '9.4%' },
      { day: 'Domingo', time: '14:00 hs', engagement: '9.0%' },
      { day: 'Jueves', time: '18:00 hs', engagement: '8.7%' },
      { day: 'Miércoles', time: '19:00 hs', engagement: '8.3%' },
    ],
  };

  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ marginBottom: 20 }}>
        <h2 className="section-title">⏱️ Optimizador de Horarios de Publicación</h2>
        <p className="section-subtitle">Mapa de calor de actividad de audiencia por plataforma para maximizar el alcance e interacción</p>
      </div>

      {/* Platform Switcher */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
        {[
          { id: 'instagram', label: 'Instagram' },
          { id: 'tiktok', label: 'TikTok' },
          { id: 'facebook', label: 'Facebook' },
          { id: 'twitter', label: 'X / Twitter' },
          { id: 'linkedin', label: 'LinkedIn' },
          { id: 'youtube', label: 'YouTube' },
        ].map(p => (
          <button
            key={p.id}
            onClick={() => setPlatform(p.id as any)}
            className={platform === p.id ? 'btn-neon' : 'btn-ghost'}
            style={{ fontSize: '0.75rem' }}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Next Best Slot Banner */}
      <div className="card" style={{ padding: 18, marginBottom: 20, borderLeft: '4px solid var(--neon)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <div style={{ fontSize: '0.68rem', color: 'var(--text-neon)', fontWeight: 800, textTransform: 'uppercase' }}>Próximo Mejor Momento Recomendado:</div>
          <div style={{ fontSize: '1.1rem', fontWeight: 900, color: 'var(--text-primary)', marginTop: 2 }}>
            📅 {TOP_TIMES[platform][0].day} a las {TOP_TIMES[platform][0].time}
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Engagement estimado: <strong style={{ color: 'var(--text-neon)' }}>{TOP_TIMES[platform][0].engagement}</strong> (+38% superior al promedio)</div>
        </div>

        <button onClick={() => alert(`Publicación programada para ${TOP_TIMES[platform][0].day} ${TOP_TIMES[platform][0].time}`)} className="btn-neon">
          📅 Programar Post en este Horario
        </button>
      </div>

      {/* 24h Heatmap Matrix Grid */}
      <div className="card" style={{ padding: 20, marginBottom: 20 }}>
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 14 }}>
          🔥 Mapa de Calor Semanal (00:00 - 23:00 hs)
        </h3>

        <div style={{ overflowX: 'auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '50px repeat(24, 1fr)', gap: 4, minWidth: 700 }}>
            <div />
            {Array.from({ length: 24 }, (_, i) => (
              <div key={i} style={{ fontSize: '0.55rem', color: 'var(--text-muted)', textAlign: 'center', fontFamily: 'monospace' }}>
                {i.toString().padStart(2, '0')}h
              </div>
            ))}

            {DAYS.map((day, dIdx) => (
              <React.Fragment key={day}>
                <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center' }}>
                  {day}
                </div>
                {Array.from({ length: 24 }, (_, hIdx) => {
                  // Heuristic intensity calculation for demo
                  const isPeak = (dIdx === 2 && hIdx === 18) || (dIdx === 4 && hIdx === 20) || (dIdx === 3 && hIdx === 19);
                  const intensity = isPeak ? 0.95 : Math.sin((hIdx / 24) * Math.PI) * 0.7;
                  return (
                    <div
                      key={hIdx}
                      title={`${day} ${hIdx}:00 hs - Actividad: ${Math.round(intensity * 100)}%`}
                      style={{
                        height: 24,
                        borderRadius: 3,
                        background: `rgba(204, 255, 0, ${Math.max(0.05, intensity)})`,
                        border: isPeak ? '1px solid var(--neon)' : 'none'
                      }}
                    />
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Top 5 Slots Table */}
      <div className="card" style={{ padding: 20 }}>
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 14 }}>
          🏆 Top 5 Mejores Horarios en {platform.toUpperCase()}
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 10 }}>
          {TOP_TIMES[platform].map((item, idx) => (
            <div key={idx} style={{ padding: 12, borderRadius: 10, background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '0.65rem', color: 'var(--text-neon)', fontWeight: 800 }}>Puesto #{idx + 1}</div>
              <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: 2 }}>{item.day} {item.time}</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Engagement: {item.engagement}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
