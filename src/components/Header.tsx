import React from 'react';
import type { CityFilter } from '../types/dashboard';
import logoOficial from '../assets/logo-policia-oficial.jpg';
import {
  ShieldIcon,
  PhoneIcon,
  FacebookIcon,
  InstagramIcon,
  GlobeIcon,
  TwitterIcon,
  YoutubeIcon,
  DownloadIcon,
  SunIcon,
  MoonIcon,
  MapPinIcon,
  ExternalLinkIcon
} from './Icons';

interface HeaderProps {
  selectedCity: CityFilter;
  onCityChange: (city: CityFilter) => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onOpenReportModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  selectedCity,
  onCityChange,
  isDarkMode,
  onToggleTheme,
  onOpenReportModal
}) => {
  return (
    <header className="police-gradient-bg border-b border-blue-900/40 text-white pb-6 pt-5 px-4 md:px-8 mb-8 shadow-xl">
      <div className="max-w-7xl mx-auto">
        {/* Top Emergency & Institutional Bar */}
        <div className="flex flex-wrap justify-between items-center text-xs border-b border-white/10 pb-3 mb-4 gap-3">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 bg-red-600/90 text-white font-bold px-2.5 py-1 rounded-full animate-pulse shadow-md">
              <PhoneIcon className="w-3.5 h-3.5" /> EMERGENCIAS: 101
            </span>
            <span className="text-blue-200 hidden sm:inline-flex items-center gap-1">
              <ShieldIcon className="w-3.5 h-3.5 text-amber-400" /> Jefatura de Policía: Gob. Deloqui 492, Ushuaia
            </span>
          </div>

          <div className="flex items-center gap-4 text-blue-200">
            <span className="bg-blue-950/60 px-2.5 py-1 rounded border border-blue-800/50">
              Oficina de Comunicación Institucional (OCI)
            </span>
            <button
              onClick={onToggleTheme}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white flex items-center gap-1 text-xs"
              title="Cambiar Modo Claro/Oscuro"
            >
              {isDarkMode ? <SunIcon className="w-4 h-4 text-amber-400" /> : <MoonIcon className="w-4 h-4 text-blue-200" />}
              <span className="hidden md:inline">{isDarkMode ? 'Modo Claro' : 'Modo Oscuro'}</span>
            </button>
          </div>
        </div>

        {/* Main Title & Social Quick Links */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 my-2">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white border-2 border-amber-500/80 p-1 shadow-2xl flex items-center justify-center shrink-0 overflow-hidden">
              <img src={logoOficial} alt="Policía Provincial de Tierra del Fuego" className="w-full h-full object-cover rounded-xl" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="badge badge-gold">Informe Institucional Oficial</span>
                <span className="text-xs text-blue-300 font-medium hidden sm:inline">Tierra del Fuego, AeIAS</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white mt-1 tracking-tight">
                Policía Provincial de Tierra del Fuego
              </h1>
              <p className="text-sm text-blue-200/90 mt-1 max-w-2xl">
                Dashboard de Análisis de Redes Sociales, Impacto Ciudadano y Monitor de Comunicación Digital
              </p>
            </div>
          </div>

          {/* Action Buttons & Social Links */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
            <div className="flex items-center gap-2 bg-blue-950/70 p-1.5 rounded-xl border border-blue-800/40">
              <a
                href="https://www.facebook.com/policiaprovincialtdf"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-blue-600/30 hover:bg-blue-600 text-blue-200 hover:text-white transition-all flex items-center gap-1.5 text-xs font-semibold"
                title="Facebook Oficial @policiaprovincialtdf"
              >
                <FacebookIcon className="w-4 h-4 text-blue-400" />
                <span className="hidden sm:inline">Facebook</span>
                <ExternalLinkIcon className="w-3 h-3 opacity-60" />
              </a>

              <a
                href="https://www.instagram.com/policiaprovincialtdf/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-pink-600/30 hover:bg-pink-600 text-pink-200 hover:text-white transition-all flex items-center gap-1.5 text-xs font-semibold"
                title="Instagram Oficial @policiaprovincialtdf"
              >
                <InstagramIcon className="w-4 h-4 text-pink-400" />
                <span className="hidden sm:inline">Instagram</span>
                <ExternalLinkIcon className="w-3 h-3 opacity-60" />
              </a>

              <a
                href="https://policia.tierradelfuego.gob.ar/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-emerald-600/30 hover:bg-emerald-600 text-emerald-200 hover:text-white transition-all flex items-center gap-1.5 text-xs font-semibold"
                title="Sitio Web Oficial policia.tierradelfuego.gob.ar"
              >
                <GlobeIcon className="w-4 h-4 text-emerald-400" />
                <span className="hidden sm:inline">Web Oficial</span>
                <ExternalLinkIcon className="w-3 h-3 opacity-60" />
              </a>

              <a
                href="https://twitter.com/policiatdf"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg hover:bg-white/10 text-blue-300 transition-colors"
                title="Twitter / X @policiatdf"
              >
                <TwitterIcon className="w-4 h-4" />
              </a>

              <a
                href="https://www.youtube.com/channel/UCq8ibtLJAJWWcyX3FBuIESw"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg hover:bg-white/10 text-red-400 transition-colors"
                title="YouTube Oficial"
              >
                <YoutubeIcon className="w-4 h-4" />
              </a>
            </div>

            <button
              onClick={onOpenReportModal}
              className="btn-primary shadow-lg bg-amber-600 hover:bg-amber-500 text-white font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 text-sm"
            >
              <DownloadIcon className="w-4 h-4" />
              Generar Informe PDF
            </button>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-blue-200">
            <MapPinIcon className="w-4 h-4 text-amber-400" />
            <span className="font-semibold text-white">Filtrar por Jurisdicción:</span>
            <div className="flex items-center gap-1 bg-black/30 p-1 rounded-xl border border-white/10">
              {(['todas', 'ushuaia', 'rio_grande', 'tolhuin'] as CityFilter[]).map((city) => (
                <button
                  key={city}
                  onClick={() => onCityChange(city)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    selectedCity === city
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-blue-200 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {city === 'todas' && 'Toda la Provincia'}
                  {city === 'ushuaia' && 'Ushuaia'}
                  {city === 'rio_grande' && 'Río Grande'}
                  {city === 'tolhuin' && 'Tolhuin'}
                </button>
              ))}
            </div>
          </div>

          <div className="text-xs text-blue-300/80 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            Actualizado en vivo • Fuentes oficial verificadas: Web, Facebook e Instagram
          </div>
        </div>
      </div>
    </header>
  );
};
