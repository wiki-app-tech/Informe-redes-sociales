import React from 'react';
import type { MetricCard } from '../types/dashboard';
import {
  UsersIcon,
  EyeIcon,
  ActivityIcon,
  ThumbsUpIcon,
  MessageSquareIcon,
  TrendingUpIcon
} from './Icons';

interface KpiCardsProps {
  metrics: MetricCard[];
}

export const KpiCards: React.FC<KpiCardsProps> = ({ metrics }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Users': return <UsersIcon className="w-6 h-6 text-blue-400" />;
      case 'Eye': return <EyeIcon className="w-6 h-6 text-emerald-400" />;
      case 'Activity': return <ActivityIcon className="w-6 h-6 text-amber-400" />;
      case 'ThumbsUp': return <ThumbsUpIcon className="w-6 h-6 text-indigo-400" />;
      case 'MessageSquare': return <MessageSquareIcon className="w-6 h-6 text-cyan-400" />;
      default: return <TrendingUpIcon className="w-6 h-6 text-blue-400" />;
    }
  };

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-primary flex items-center gap-2">
            <TrendingUpIcon className="w-5 h-5 text-amber-500" />
            Métricas Clave de Desempeño Institucional (KPIs)
          </h2>
          <p className="text-xs text-muted">Resumen consolidado de comunicación estratégica digital y alcance poblacional</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {metrics.map((item) => (
          <div
            key={item.id}
            className="glass-panel p-5 rounded-2xl border border-white/10 hover:border-blue-500/40 relative overflow-hidden group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="p-3 rounded-xl bg-blue-950/60 border border-blue-800/40 group-hover:scale-110 transition-transform">
                {getIcon(item.icon)}
              </div>
              <span className={`text-xs font-extrabold px-2.5 py-1 rounded-full flex items-center gap-1 ${
                item.isPositive ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-red-500/10 text-red-400 border border-red-500/30'
              }`}>
                {item.change}
              </span>
            </div>

            <h3 className="text-xs font-semibold text-muted uppercase tracking-wider mb-1">
              {item.title}
            </h3>
            
            <div className="text-2xl lg:text-3xl font-extrabold tracking-tight text-white mb-2 font-heading">
              {item.value}
            </div>

            <p className="text-xs text-secondary line-clamp-2">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
