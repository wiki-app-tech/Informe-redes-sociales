import React, { useState } from 'react';
import type { SocialPost, CategoryType, CityFilter, PlatformType } from '../types/dashboard';
import {
  FacebookIcon,
  InstagramIcon,
  GlobeIcon,
  SearchIcon,
  FilterIcon,
  HeartIcon,
  ShareIcon,
  MessageSquareIcon,
  EyeIcon,
  ExternalLinkIcon,
  SirenIcon,
  CarIcon,
  AwardIcon,
  ShieldIcon,
  MapPinIcon
} from './Icons';

interface SocialFeedProps {
  posts: SocialPost[];
  selectedCity: CityFilter;
}

export const SocialFeed: React.FC<SocialFeedProps> = ({ posts, selectedCity }) => {
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformType>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredPosts = posts.filter((post) => {
    // City filter
    if (selectedCity !== 'todas' && post.city !== 'todas' && post.city !== selectedCity) {
      return false;
    }
    // Platform filter
    if (selectedPlatform !== 'all' && post.platform !== selectedPlatform) {
      return false;
    }
    // Category filter
    if (selectedCategory !== 'all' && post.category !== selectedCategory) {
      return false;
    }
    // Search query
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchContent = post.content.toLowerCase().includes(q);
      const matchCategory = post.categoryLabel.toLowerCase().includes(q);
      const matchCity = post.cityLabel.toLowerCase().includes(q);
      return matchContent || matchCategory || matchCity;
    }
    return true;
  });

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'facebook': return <FacebookIcon className="w-4 h-4 text-blue-500" />;
      case 'instagram': return <InstagramIcon className="w-4 h-4 text-pink-500" />;
      case 'website': return <GlobeIcon className="w-4 h-4 text-emerald-500" />;
      default: return <GlobeIcon className="w-4 h-4" />;
    }
  };

  const getCategoryIcon = (category: CategoryType) => {
    switch (category) {
      case 'prevencion_vial': return <CarIcon className="w-4 h-4 text-blue-400" />;
      case 'busqueda_rescate': return <SirenIcon className="w-4 h-4 text-amber-400" />;
      case 'alertas_seguridad': return <SirenIcon className="w-4 h-4 text-red-400" />;
      case 'cadetes_capacitacion': return <AwardIcon className="w-4 h-4 text-purple-400" />;
      default: return <ShieldIcon className="w-4 h-4 text-emerald-400" />;
    }
  };

  return (
    <section className="mb-8">
      {/* Section Header & Filters */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-primary flex items-center gap-2">
            <FilterIcon className="w-5 h-5 text-amber-500" />
            Monitor de Publicaciones & Feed Oficial en Tiempo Real
          </h2>
          <p className="text-xs text-muted">Avisos, comunicados viales, operativos y actividades institucionales</p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full lg:w-80">
          <SearchIcon className="w-4 h-4 text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por palabra (ej: Garibaldi, Canes, Estafas)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900/80 border border-white/10 text-white placeholder-slate-400 text-xs focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-3 mb-6 p-3 rounded-2xl bg-slate-950/60 border border-white/10">
        <span className="text-xs font-semibold text-muted flex items-center gap-1">
          <FilterIcon className="w-3.5 h-3.5" /> Plataforma:
        </span>
        <button
          onClick={() => setSelectedPlatform('all')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            selectedPlatform === 'all' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          Todas
        </button>
        <button
          onClick={() => setSelectedPlatform('facebook')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
            selectedPlatform === 'facebook' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <FacebookIcon className="w-3.5 h-3.5 text-blue-400" /> Facebook
        </button>
        <button
          onClick={() => setSelectedPlatform('instagram')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
            selectedPlatform === 'instagram' ? 'bg-pink-600 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <InstagramIcon className="w-3.5 h-3.5 text-pink-400" /> Instagram
        </button>
        <button
          onClick={() => setSelectedPlatform('website')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
            selectedPlatform === 'website' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <GlobeIcon className="w-3.5 h-3.5 text-emerald-400" /> Portal Web
        </button>

        <div className="h-4 w-[1px] bg-white/10 hidden sm:block"></div>

        <span className="text-xs font-semibold text-muted ml-0 sm:ml-2">Categoría:</span>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="bg-slate-900 border border-white/10 text-white text-xs rounded-lg px-3 py-1.5 focus:outline-none focus:border-blue-500"
        >
          <option value="all">Todas las Categorías</option>
          <option value="prevencion_vial">Seguridad Vial</option>
          <option value="busqueda_rescate">Búsqueda y Rescate (GEBYR)</option>
          <option value="alertas_seguridad">Prevención Ciberdelito</option>
          <option value="cadetes_capacitacion">Institutos & Cadetes</option>
          <option value="institucional">Institucional & Comunidad</option>
          <option value="comunidad_tramites">Trámites y Servicios</option>
        </select>
      </div>

      {/* Feed Cards Grid */}
      {filteredPosts.length === 0 ? (
        <div className="glass-panel p-12 text-center text-muted rounded-2xl border border-white/10">
          <SearchIcon className="w-10 h-10 mx-auto text-slate-500 mb-3 opacity-60" />
          <h3 className="text-lg font-bold text-white mb-1">No se encontraron publicaciones</h3>
          <p className="text-xs">Intenta cambiando los filtros o la búsqueda por palabras clave.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className={`glass-panel rounded-2xl overflow-hidden border flex flex-col justify-between group transition-all ${
                post.isFeatured
                  ? 'border-amber-500/40 bg-gradient-to-b from-blue-950/40 to-slate-950/80 shadow-lg'
                  : 'border-white/10'
              }`}
            >
              <div>
                {/* Post Image / Media Header */}
                {post.mediaUrl && (
                  <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                    <img
                      src={post.mediaUrl}
                      alt={post.categoryLabel}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/40"></div>
                    
                    {/* Category & City Pills over Media */}
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="badge badge-gold bg-black/70 backdrop-blur-md border border-amber-500/50 text-amber-300">
                        {getCategoryIcon(post.category)}
                        {post.categoryLabel}
                      </span>
                    </div>

                    <div className="absolute top-3 right-3">
                      <span className="p-2 rounded-xl bg-black/70 backdrop-blur-md border border-white/10">
                        {getPlatformIcon(post.platform)}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 text-xs text-blue-200 flex items-center gap-1 font-medium bg-black/60 px-2.5 py-1 rounded-full backdrop-blur-sm border border-white/10">
                      <MapPinIcon className="w-3.5 h-3.5 text-amber-400" />
                      {post.cityLabel}
                    </div>
                  </div>
                )}

                {/* Author & Time Info */}
                <div className="p-5 pb-2">
                  <div className="flex items-center justify-between mb-3 text-xs text-muted">
                    <span className="font-bold text-white flex items-center gap-1.5">
                      <ShieldIcon className="w-4 h-4 text-blue-400" />
                      {post.author}
                    </span>
                    <span>{post.timeAgo}</span>
                  </div>

                  {/* Main Post Text */}
                  <p className="text-xs sm:text-sm text-slate-200 line-clamp-4 leading-relaxed mb-4">
                    {post.content}
                  </p>
                </div>
              </div>

              {/* Engagement Stats & External Action */}
              <div className="p-5 pt-3 border-t border-white/10 bg-slate-950/40">
                <div className="flex items-center justify-between text-xs text-muted mb-3">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-pink-400 font-semibold">
                      <HeartIcon className="w-3.5 h-3.5" />
                      {post.likes.toLocaleString('es-AR')}
                    </span>
                    <span className="flex items-center gap-1 text-blue-400 font-semibold">
                      <ShareIcon className="w-3.5 h-3.5" />
                      {post.shares.toLocaleString('es-AR')}
                    </span>
                    <span className="flex items-center gap-1 text-slate-300 font-semibold">
                      <MessageSquareIcon className="w-3.5 h-3.5" />
                      {post.comments}
                    </span>
                  </div>

                  <span className="flex items-center gap-1 text-emerald-400 font-mono text-[11px]">
                    <EyeIcon className="w-3.5 h-3.5" />
                    {post.reach.toLocaleString('es-AR')}
                  </span>
                </div>

                <a
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-3 rounded-lg bg-blue-950/60 hover:bg-blue-900/80 text-blue-200 hover:text-white font-semibold text-xs transition-colors border border-blue-800/40 flex items-center justify-center gap-1.5"
                >
                  Ver Publicación Original
                  <ExternalLinkIcon className="w-3 h-3" />
                </a>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};
