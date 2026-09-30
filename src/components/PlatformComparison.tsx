import React from 'react';
import type { SocialAccount } from '../types/dashboard';
import {
  FacebookIcon,
  InstagramIcon,
  GlobeIcon,
  TwitterIcon,
  YoutubeIcon,
  ExternalLinkIcon,
  UsersIcon,
  EyeIcon,
  ActivityIcon,
  CheckCircleIcon
} from './Icons';

interface PlatformComparisonProps {
  accounts: SocialAccount[];
}

export const PlatformComparison: React.FC<PlatformComparisonProps> = ({ accounts }) => {
  const getAccountIcon = (platform: string) => {
    switch (platform) {
      case 'facebook': return <FacebookIcon className="w-6 h-6 text-blue-500" />;
      case 'instagram': return <InstagramIcon className="w-6 h-6 text-pink-500" />;
      case 'website': return <GlobeIcon className="w-6 h-6 text-emerald-500" />;
      case 'twitter': return <TwitterIcon className="w-6 h-6 text-sky-400" />;
      case 'youtube': return <YoutubeIcon className="w-6 h-6 text-red-500" />;
      default: return <GlobeIcon className="w-6 h-6 text-blue-400" />;
    }
  };

  const getBadgeClass = (platform: string) => {
    switch (platform) {
      case 'facebook': return 'badge-facebook';
      case 'instagram': return 'badge-instagram';
      case 'website': return 'badge-website';
      default: return 'badge-gold';
    }
  };

  return (
    <section className="mb-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-2">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-primary flex items-center gap-2">
            <GlobeIcon className="w-5 h-5 text-blue-500" />
            Canales Oficiales & Análisis Comparativo de Plataformas
          </h2>
          <p className="text-xs text-muted">Desglose de presencia digital en los puntos de contacto oficiales de la Policía TDF</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {accounts.map((acc) => (
          <div
            key={acc.id}
            className="glass-panel p-6 rounded-2xl border border-white/10 hover:border-blue-500/50 flex flex-col justify-between group"
          >
            <div>
              {/* Account Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-slate-900 border border-white/10 p-2 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform">
                    {getAccountIcon(acc.platform)}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-bold text-base text-white">{acc.name}</h3>
                      {acc.verified && <CheckCircleIcon className="w-4 h-4 text-blue-400" />}
                    </div>
                    <span className="text-xs text-blue-300 font-mono">{acc.handle}</span>
                  </div>
                </div>
                <span className={`badge ${getBadgeClass(acc.platform)}`}>
                  {acc.platform.toUpperCase()}
                </span>
              </div>

              {/* Account Metrics Grid */}
              <div className="grid grid-cols-2 gap-3 mb-5 p-3 rounded-xl bg-black/20 border border-white/5">
                <div>
                  <span className="text-xs text-muted flex items-center gap-1 mb-0.5">
                    <UsersIcon className="w-3.5 h-3.5 text-blue-400" /> Audiencia
                  </span>
                  <span className="text-lg font-bold text-white font-heading">
                    {acc.followers > 0 ? acc.followers.toLocaleString('es-AR') : 'Portal Abierto'}
                  </span>
                  <div className="text-[10px] text-emerald-400 font-semibold">
                    +{acc.growthRate}% mensual
                  </div>
                </div>

                <div>
                  <span className="text-xs text-muted flex items-center gap-1 mb-0.5">
                    <EyeIcon className="w-3.5 h-3.5 text-emerald-400" /> Alcance Mensual
                  </span>
                  <span className="text-lg font-bold text-white font-heading">
                    {acc.monthlyReach.toLocaleString('es-AR')}
                  </span>
                  <div className="text-[10px] text-blue-300 font-medium">
                    {acc.monthlyPosts} publicaciones/mes
                  </div>
                </div>
              </div>

              {/* Progress / Engagement Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-secondary flex items-center gap-1">
                    <ActivityIcon className="w-3.5 h-3.5 text-amber-400" /> Tasa de Engagement
                  </span>
                  <span className="font-bold text-amber-400">{acc.engagementRate}%</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-amber-500 rounded-full transition-all duration-1000"
                    style={{ width: `${Math.min(acc.engagementRate * 8, 100)}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Link Footer */}
            <a
              href={acc.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 w-full py-2.5 px-4 rounded-xl bg-blue-950/60 hover:bg-blue-900/80 text-blue-200 hover:text-white font-semibold text-xs transition-all border border-blue-800/40 flex items-center justify-center gap-2 group-hover:border-blue-500/60"
            >
              Visitar Perfil Oficial
              <ExternalLinkIcon className="w-3.5 h-3.5" />
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};
