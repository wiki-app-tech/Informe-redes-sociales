import React from 'react';
import type {
  LocationDistribution,
  MonthlyTrend,
  CategoryBreakdown
} from '../types/dashboard';
import {
  BarChart3Icon,
  TrendingUpIcon,
  ShieldIcon,
  MapPinIcon,
  ActivityIcon,
  ThumbsUpIcon
} from './Icons';

interface AnalyticsChartsProps {
  trends: MonthlyTrend[];
  categories: CategoryBreakdown[];
  locations: LocationDistribution[];
}

export const AnalyticsCharts: React.FC<AnalyticsChartsProps> = ({
  trends,
  categories,
  locations
}) => {
  const maxReach = Math.max(...trends.map((t) => Math.max(t.facebookReach, t.instagramReach)));

  return (
    <section className="mb-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-2">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-primary flex items-center gap-2">
            <BarChart3Icon className="w-5 h-5 text-amber-500" />
            Análisis Gráfico de Tendencias & Impacto Poblacional
          </h2>
          <p className="text-xs text-muted">Evolución semestral, hábitos de consumo comunicacional y demografía fueguina</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Chart 1: Monthly Reach Evolution (2 cols) */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-2xl border border-white/10 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-base text-white flex items-center gap-2">
                  <TrendingUpIcon className="w-4 h-4 text-blue-400" />
                  Evolución del Alcance Mensual (Impresiones)
                </h3>
                <p className="text-xs text-muted">Comparativa Facebook vs Instagram (Marzo - Agosto 2026)</p>
              </div>
              
              <div className="flex items-center gap-4 text-xs">
                <span className="flex items-center gap-1 text-blue-400 font-semibold">
                  <span className="w-3 h-3 rounded-full bg-blue-500"></span> Facebook
                </span>
                <span className="flex items-center gap-1 text-pink-400 font-semibold">
                  <span className="w-3 h-3 rounded-full bg-pink-500"></span> Instagram
                </span>
              </div>
            </div>

            {/* SVG Chart */}
            <div className="h-64 w-full relative mt-4">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 500 200">
                {/* Horizontal Grid lines */}
                <line x1="40" y1="20" x2="480" y2="20" stroke="rgba(255,255,255,0.06)" strokeDasharray="4" />
                <line x1="40" y1="70" x2="480" y2="70" stroke="rgba(255,255,255,0.06)" strokeDasharray="4" />
                <line x1="40" y1="120" x2="480" y2="120" stroke="rgba(255,255,255,0.06)" strokeDasharray="4" />
                <line x1="40" y1="170" x2="480" y2="170" stroke="rgba(255,255,255,0.1)" />

                {/* Draw Facebook Line */}
                <path
                  d={trends
                    .map((item, index) => {
                      const x = 40 + (index * (440 / (trends.length - 1)));
                      const y = 170 - (item.facebookReach / maxReach) * 140;
                      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
                    })
                    .join(' ')}
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />

                {/* Draw Instagram Line */}
                <path
                  d={trends
                    .map((item, index) => {
                      const x = 40 + (index * (440 / (trends.length - 1)));
                      const y = 170 - (item.instagramReach / maxReach) * 140;
                      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
                    })
                    .join(' ')}
                  fill="none"
                  stroke="#ec4899"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />

                {/* Nodes & Labels */}
                {trends.map((item, index) => {
                  const x = 40 + (index * (440 / (trends.length - 1)));
                  const yFb = 170 - (item.facebookReach / maxReach) * 140;
                  const yIg = 170 - (item.instagramReach / maxReach) * 140;
                  return (
                    <g key={item.month}>
                      {/* FB Point */}
                      <circle cx={x} cy={yFb} r="5" fill="#3b82f6" className="hover:r-7 transition-all cursor-pointer" />
                      {/* IG Point */}
                      <circle cx={x} cy={yIg} r="5" fill="#ec4899" className="hover:r-7 transition-all cursor-pointer" />
                      {/* Month Label */}
                      <text x={x} y="192" fill="#94a3b8" fontSize="11" textAnchor="middle">
                        {item.month}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          <div className="mt-4 p-3 rounded-xl bg-blue-950/40 border border-blue-800/30 text-xs text-blue-200 flex items-center justify-between">
            <span className="flex items-center gap-1.5 font-semibold">
              <ShieldIcon className="w-4 h-4 text-amber-400" />
              Tendencia Sostenida:
            </span>
            <span>El alcance total creció un +14.2% impulsado por alertas meteorológicas e informes en video.</span>
          </div>
        </div>

        {/* Chart 2: Category Breakdown Donut / Progress List */}
        <div className="glass-panel p-6 rounded-2xl border border-white/10 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-base text-white mb-1 flex items-center gap-2">
              <ActivityIcon className="w-4 h-4 text-amber-400" />
              Distribución por Temática
            </h3>
            <p className="text-xs text-muted mb-4">Proporción de contenido publicado por la OCI</p>

            <div className="space-y-3">
              {categories.map((cat) => (
                <div key={cat.category} className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-200">{cat.label}</span>
                    <span className="text-amber-400">{cat.percentage}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000"
                      style={{
                        width: `${cat.percentage}%`,
                        backgroundColor: cat.color
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 text-xs text-muted flex items-center justify-between">
            <span>Promedio de Interacciones/Post:</span>
            <span className="font-bold text-emerald-400">1.820 interacciones</span>
          </div>
        </div>
      </div>

      {/* Row 2: Location Breakdown & Sentiment Meter */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* City Distribution */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-2xl border border-white/10">
          <h3 className="font-bold text-base text-white mb-1 flex items-center gap-2">
            <MapPinIcon className="w-4 h-4 text-amber-400" />
            Distribución Demográfica de la Audiencia Digital por Localidad
          </h3>
          <p className="text-xs text-muted mb-6">Proporción de seguidores residentes en Tierra del Fuego</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {locations.map((loc) => (
              <div key={loc.city} className="p-4 rounded-xl bg-slate-900/80 border border-white/5 flex flex-col justify-between">
                <div>
                  <span className="text-xs text-muted font-medium">{loc.city}</span>
                  <div className="text-2xl font-extrabold text-white my-1 font-heading">
                    {loc.percentage}%
                  </div>
                </div>
                <div className="text-xs text-blue-300 font-semibold border-t border-white/5 pt-2 mt-2">
                  ~{loc.followersCount.toLocaleString('es-AR')} seguidores
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sentiment Gauge */}
        <div className="glass-panel p-6 rounded-2xl border border-white/10 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-base text-white mb-1 flex items-center gap-2">
              <ThumbsUpIcon className="w-4 h-4 text-emerald-400" />
              Índice de Aceptación Institucional
            </h3>
            <p className="text-xs text-muted mb-4">Análisis de sentimiento en comentarios y mensajes</p>

            <div className="flex flex-col items-center justify-center my-3">
              <div className="relative w-36 h-36 rounded-full border-8 border-slate-800 flex items-center justify-center bg-slate-950 shadow-inner">
                <div className="text-center">
                  <span className="text-3xl font-extrabold text-emerald-400 font-heading">91.8%</span>
                  <span className="block text-[10px] text-muted uppercase font-bold">Favorable</span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-xs text-slate-300 bg-emerald-950/40 p-3 rounded-xl border border-emerald-800/40">
            Valorado prioritariamente por: Informes preventivos viales en tiempo real y asistencia directa ante inclemencias invernales.
          </div>
        </div>
      </div>
    </section>
  );
};
