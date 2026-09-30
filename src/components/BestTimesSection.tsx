import React, { useState, useCallback } from 'react';
import type { BestTimesPlatform, BestTimesPlatformId } from '../types/dashboard';
import { BEST_TIMES_PLATFORMS } from '../data/bestTimesData';

// ── PLATFORM TAB BUTTON ───────────────────────────────────────────────────────
const PLATFORM_ICONS: Record<BestTimesPlatformId, string> = {
  instagram: '📸',
  facebook:  '📘',
  twitter:   '🐦',
  tiktok:    '🎵',
  youtube:   '📺',
  linkedin:  '💼',
};

// ── HEATMAP COLOR HELPERS ─────────────────────────────────────────────────────
function getHeatColor(value: number, scheme: BestTimesPlatform['colorScheme']): string {
  const intensity = Math.round((value / 100) * 255);
  if (value === 0) return 'rgba(255,255,255,0.02)';
  switch (scheme) {
    case 'pink':   return `rgba(225,48,108,${(value / 100) * 0.85})`;
    case 'blue':   return `rgba(24,119,242,${(value / 100) * 0.85})`;
    case 'gray':   return `rgba(148,163,184,${(value / 100) * 0.80})`;
    case 'purple': return `rgba(139,92,246,${(value / 100) * 0.85})`;
    case 'red':    return `rgba(239,68,68,${(value / 100) * 0.85})`;
    case 'teal':   return `rgba(14,165,233,${(value / 100) * 0.85})`;
    default:       return `rgba(204,255,0,${(value / 100) * 0.85})`;
  }
}

function getTextColor(value: number): string {
  return value > 55 ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.35)';
}

// ── HEATMAP GRID ─────────────────────────────────────────────────────────────
interface HeatmapProps {
  platform: BestTimesPlatform;
  hoveredHour: number | null;
  onHoverHour: (h: number | null) => void;
}

const Heatmap: React.FC<HeatmapProps> = ({ platform, hoveredHour, onHoverHour }) => {
  // Hours 0-23 → show only 6-23 for readability (18 columns)
  const HOURS = Array.from({ length: 24 }, (_, i) => i);
  const DISPLAY_HOURS = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];

  return (
    <div style={{ overflowX: 'auto' }}>
      <div style={{ minWidth: 640 }}>
        {/* Hour labels row */}
        <div style={{ display: 'grid', gridTemplateColumns: '52px repeat(24, 1fr)', gap: 3, marginBottom: 3 }}>
          <div />
          {DISPLAY_HOURS.map(h => (
            <div
              key={h}
              style={{
                textAlign: 'center', fontSize: '0.55rem', fontWeight: 700,
                color: hoveredHour === h ? platform.accentColor : 'var(--text-muted)',
                paddingBottom: 4, transition: 'color 0.15s',
                fontFamily: 'monospace'
              }}
            >
              {String(h).padStart(2,'0')}
            </div>
          ))}
        </div>

        {/* Day rows */}
        {platform.schedule.map(daySchedule => (
          <div
            key={daySchedule.day}
            style={{ display: 'grid', gridTemplateColumns: '52px repeat(24, 1fr)', gap: 3, marginBottom: 3 }}
          >
            {/* Day label */}
            <div style={{
              fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-secondary)',
              display: 'flex', alignItems: 'center', paddingRight: 6,
              fontFamily: 'var(--font-heading)'
            }}>
              {daySchedule.day}
            </div>

            {/* Hour cells */}
            {DISPLAY_HOURS.map(h => {
              const cell = daySchedule.cells[h];
              const isPeak = daySchedule.peakHours.includes(h);
              const isHovered = hoveredHour === h;
              return (
                <div
                  key={h}
                  onMouseEnter={() => onHoverHour(h)}
                  onMouseLeave={() => onHoverHour(null)}
                  title={`${daySchedule.day} ${String(h).padStart(2,'0')}:00 — ${cell.value}% actividad${isPeak ? ' ⭐ PICO' : ''}`}
                  style={{
                    height: 32,
                    borderRadius: 5,
                    background: getHeatColor(cell.value, platform.colorScheme),
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.52rem', fontWeight: 700,
                    color: getTextColor(cell.value),
                    cursor: 'pointer',
                    transition: 'transform 0.1s, box-shadow 0.1s',
                    transform: isHovered ? 'scaleY(1.15)' : 'scaleY(1)',
                    boxShadow: isPeak
                      ? `0 0 8px ${platform.accentColor}60`
                      : isHovered ? `0 0 6px ${platform.accentColor}40` : 'none',
                    outline: isPeak ? `1px solid ${platform.accentColor}80` : 'none',
                    fontFamily: 'monospace',
                  }}
                >
                  {cell.value > 25 ? `${cell.value}%` : ''}
                </div>
              );
            })}
          </div>
        ))}

        {/* Legend */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 12, paddingLeft: 55 }}>
          <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>Menos activo</span>
          {[5,20,40,60,80,100].map(v => (
            <div key={v} style={{
              width: 22, height: 14, borderRadius: 3,
              background: getHeatColor(v, platform.colorScheme)
            }} />
          ))}
          <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>Más activo</span>
          <div style={{ marginLeft: 16, display: 'flex', alignItems: 'center', gap: 5, fontSize: '0.6rem', color: platform.accentColor }}>
            <div style={{ width: 14, height: 14, borderRadius: 3, background: getHeatColor(95, platform.colorScheme), outline: `1px solid ${platform.accentColor}80` }} />
            Hora pico recomendada
          </div>
        </div>
      </div>
    </div>
  );
};

// ── BEST SLOTS GRID ────────────────────────────────────────────────────────────
const BestSlotsGrid: React.FC<{ platform: BestTimesPlatform }> = ({ platform }) => (
  <div>
    <h4 style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12, fontFamily: 'var(--font-heading)' }}>
      📅 Mejores Horarios por Día de la Semana
    </h4>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: 10 }}>
      {platform.topSlots.map(slot => (
        <div key={slot.day} style={{
          padding: '10px 12px', borderRadius: 10,
          background: 'rgba(255,255,255,0.03)', border: `1px solid ${platform.accentColor}25`,
          transition: 'border-color 0.2s',
        }}>
          <div style={{ fontSize: '0.68rem', fontWeight: 800, color: platform.accentColor, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            {slot.day}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {slot.hours.map((hr, i) => (
              <span key={hr} style={{
                display: 'inline-block', padding: '2px 8px', borderRadius: 999,
                fontSize: '0.7rem', fontFamily: 'monospace', fontWeight: 700,
                background: i === 0 ? `${platform.accentColor}22` : 'rgba(255,255,255,0.04)',
                color: i === 0 ? platform.accentColor : 'var(--text-secondary)',
                border: i === 0 ? `1px solid ${platform.accentColor}40` : '1px solid transparent',
              }}>
                {i === 0 && '⭐ '}{hr}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

// ── MAIN BEST TIMES SECTION ───────────────────────────────────────────────────
export const BestTimesSection: React.FC = () => {
  const [activePlatform, setActivePlatform] = useState<BestTimesPlatformId>('instagram');
  const [hoveredHour, setHoveredHour] = useState<number | null>(null);

  const platform = BEST_TIMES_PLATFORMS.find(p => p.id === activePlatform)!;

  const handleHover = useCallback((h: number | null) => setHoveredHour(h), []);

  return (
    <div style={{ marginBottom: 28 }}>
      {/* Section Header */}
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.1rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          ⏰ Mejores Horas para Publicar — Análisis Avanzado
        </h2>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', maxWidth: 680 }}>
          Mapa de calor interactivo basado en el análisis de más de 2 millones de publicaciones por Metricool. Identificá las franjas horarias de mayor audiencia para maximizar el alcance de cada publicación institucional.
        </p>
      </div>

      {/* Summary KPIs Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12, marginBottom: 20 }}>
        {BEST_TIMES_PLATFORMS.map(p => (
          <button
            key={p.id}
            onClick={() => setActivePlatform(p.id)}
            style={{
              padding: '14px 16px', borderRadius: 12, cursor: 'pointer', textAlign: 'left',
              border: activePlatform === p.id ? `2px solid ${p.accentColor}` : '1px solid var(--border-subtle)',
              background: activePlatform === p.id ? `${p.accentColor}12` : 'var(--bg-card)',
              transition: 'all 0.2s', fontFamily: 'var(--font-body)',
              boxShadow: activePlatform === p.id ? `0 0 16px ${p.accentColor}25` : 'none',
            }}
          >
            <div style={{ fontSize: '1.3rem', marginBottom: 4 }}>{PLATFORM_ICONS[p.id]}</div>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: activePlatform === p.id ? p.accentColor : 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
              {p.name}
            </div>
            <div style={{ fontSize: '0.62rem', color: 'var(--text-muted)', marginTop: 2 }}>Mejor: {p.bestHour}</div>
            <div style={{ fontSize: '0.6rem', color: p.accentColor, marginTop: 4, fontWeight: 700 }}>
              📅 {p.bestDays.join(' & ')}
            </div>
          </button>
        ))}
      </div>

      {/* Main Panel */}
      <div style={{
        background: 'var(--bg-card)', border: `1px solid ${platform.accentColor}30`,
        borderRadius: 16, overflow: 'hidden',
        boxShadow: `0 0 30px ${platform.accentColor}10`,
      }}>
        {/* Panel Header */}
        <div style={{
          padding: '18px 24px',
          background: `linear-gradient(135deg, ${platform.gradientFrom}, ${platform.gradientTo})`,
          borderBottom: `1px solid ${platform.accentColor}20`,
          display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 12,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              fontSize: '1.8rem', width: 48, height: 48, borderRadius: 14,
              background: `${platform.accentColor}20`, display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: `1px solid ${platform.accentColor}40`,
            }}>
              {PLATFORM_ICONS[platform.id]}
            </div>
            <div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1rem', color: 'var(--text-primary)' }}>
                {platform.name} — Mapa de Calor de Audiencia
              </h3>
              <p style={{ fontSize: '0.68rem', color: 'var(--text-secondary)', marginTop: 2 }}>
                {platform.handle} · Horario Recomendado ART (UTC−3) · Tierra del Fuego
              </p>
            </div>
          </div>

          {/* Best time badge */}
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>
              MEJOR HORA GENERAL
            </div>
            <div style={{
              padding: '6px 16px', borderRadius: 999, fontFamily: 'var(--font-heading)',
              fontWeight: 900, fontSize: '1.1rem', color: platform.accentColor,
              background: `${platform.accentColor}15`, border: `1px solid ${platform.accentColor}40`,
            }}>
              {platform.bestHour}
            </div>
            <div style={{ fontSize: '0.62rem', color: 'var(--text-muted)', marginTop: 4 }}>
              {platform.bestDays.join(' · ')} → días recomendados
            </div>
          </div>
        </div>

        {/* Heatmap */}
        <div style={{ padding: '20px 24px 8px' }}>
          <Heatmap platform={platform} hoveredHour={hoveredHour} onHoverHour={handleHover} />
        </div>

        {/* Best slots per day */}
        <div style={{ padding: '16px 24px', borderTop: '1px solid var(--border-subtle)' }}>
          <BestSlotsGrid platform={platform} />
        </div>

        {/* Insight box */}
        <div style={{ padding: '0 24px 20px' }}>
          <div style={{
            padding: '12px 16px', borderRadius: 12, marginTop: 14,
            background: `${platform.accentColor}08`, border: `1px solid ${platform.accentColor}25`,
            display: 'flex', gap: 12, alignItems: 'flex-start',
          }}>
            <span style={{ fontSize: '1rem', flexShrink: 0 }}>💡</span>
            <div>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, color: platform.accentColor, marginBottom: 4 }}>
                Análisis Estratégico para la OCI
              </div>
              <p style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {platform.insight}
              </p>
              <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)', marginTop: 6, fontStyle: 'italic' }}>
                Fuente: {platform.source}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Comparative Summary Table */}
      <div style={{ marginTop: 20, background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 14, padding: '20px 24px' }}>
        <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)', marginBottom: 16 }}>
          📊 Resumen Comparativo — Mejores Horarios por Plataforma
        </h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.73rem' }}>
            <thead>
              <tr>
                {['Plataforma', 'Mejor Hora', 'Mejores Días', 'Peor Momento', 'Formato Recomendado'].map(h => (
                  <th key={h} style={{ padding: '8px 12px', textAlign: 'left', color: 'var(--text-muted)', fontWeight: 700, fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid var(--border-subtle)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { name: '📸 Instagram', icon: 'pink', best: '10:00', days: 'Mié · Vie', worst: 'Dom madrugada', format: 'Reels + Carruseles', color: '#e1306c' },
                { name: '📘 Facebook', icon: 'blue', best: '00:00–05:00 / 22:00', days: 'Lun · Mar', worst: 'Dom tarde', format: 'Videos + Fotos + Alertas', color: '#1877f2' },
                { name: '🐦 Twitter/X', icon: 'gray', best: '21:00', days: 'Mar · Mié', worst: '00:00–08:00', format: 'Tweets cortos + Hilos', color: '#94a3b8' },
                { name: '🎵 TikTok', icon: 'purple', best: '18:00', days: 'Lun · Mar', worst: 'Dom tarde', format: 'Videos verticales 30s', color: '#8b5cf6' },
                { name: '📺 YouTube', icon: 'red', best: '21:00 Lun / 10–16hs', days: 'Lun · Mar · Jue', worst: 'Dom tarde', format: 'Videos largos + Shorts', color: '#ef4444' },
                { name: '💼 LinkedIn', icon: 'teal', best: '09:00–12:00', days: 'Mié · Jue', worst: 'Sáb · Dom', format: 'Texto + Documentos PDF', color: '#0ea5e9' },
              ].map((row, i) => (
                <tr key={row.name} style={{ background: i % 2 === 0 ? 'rgba(255,255,255,0.015)' : 'transparent', transition: 'background 0.15s' }}>
                  <td style={{ padding: '10px 12px', fontWeight: 700, color: row.color }}>{row.name}</td>
                  <td style={{ padding: '10px 12px', fontFamily: 'monospace', fontWeight: 700, color: 'var(--text-primary)' }}>{row.best}</td>
                  <td style={{ padding: '10px 12px', color: 'var(--text-secondary)' }}>{row.days}</td>
                  <td style={{ padding: '10px 12px', color: 'var(--text-muted)', fontSize: '0.68rem' }}>{row.worst}</td>
                  <td style={{ padding: '10px 12px' }}>
                    <span style={{ padding: '3px 10px', borderRadius: 999, background: `${row.color}15`, color: row.color, border: `1px solid ${row.color}30`, fontSize: '0.65rem', fontWeight: 700 }}>
                      {row.format}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ marginTop: 14, padding: '10px 14px', borderRadius: 10, background: 'var(--neon-bg)', border: '1px solid var(--border-neon)', fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
          <strong style={{ color: 'var(--text-neon)' }}>⭐ Recomendación OCI:</strong> Programar las alertas viales de Ruta 3 a las <strong style={{ color: 'var(--text-primary)' }}>00:00 del lunes en Facebook</strong> y a las <strong style={{ color: 'var(--text-primary)' }}>10:00 del viernes en Instagram</strong> para maximizar el alcance ciudadano antes del inicio de semana laboral. Publicar videos del G.E.B.yR. a las <strong style={{ color: 'var(--text-primary)' }}>18:00 del lunes en TikTok</strong>.
        </div>
      </div>
    </div>
  );
};
