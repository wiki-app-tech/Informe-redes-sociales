import React, { useState } from 'react';
import type { StationContact } from '../types/dashboard';
import {
  PhoneIcon,
  MapPinIcon,
  SearchIcon,
  ShieldIcon,
  SirenIcon
} from './Icons';

interface DirectorySectionProps {
  stations: StationContact[];
}

export const DirectorySection: React.FC<DirectorySectionProps> = ({ stations }) => {
  const [selectedCity, setSelectedCity] = useState<string>('todas');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredStations = stations.filter((station) => {
    if (selectedCity !== 'todas' && station.city !== selectedCity) {
      return false;
    }
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      return (
        station.name.toLowerCase().includes(q) ||
        station.address.toLowerCase().includes(q) ||
        (station.jurisdiction || '').toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <section className="mb-8">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-primary flex items-center gap-2">
            <PhoneIcon className="w-5 h-5 text-amber-500" />
            Directorio Oficial de Comisarías & Unidades Especiales
          </h2>
          <p className="text-xs text-muted">Canales de atención al ciudadano las 24hs en Ushuaia, Río Grande y Tolhuin</p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-white/10 text-xs font-semibold">
            {['todas', 'Ushuaia', 'Río Grande', 'Tolhuin'].map((city) => (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  selectedCity === city
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {city === 'todas' ? 'Todas' : city}
              </button>
            ))}
          </div>

          <div className="relative flex-1 sm:w-64">
            <SearchIcon className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar comisaría o dirección..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-900/80 border border-white/10 text-white placeholder-slate-400 text-xs focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Emergency Banner */}
      <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-red-950/80 via-red-900/40 to-slate-950 border border-red-800/50 text-white flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-full bg-red-600 animate-pulse text-white shadow-lg">
            <SirenIcon className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-extrabold text-base tracking-tight text-white">
              ¿Tenés una Emergencia o Situación de Riesgo Inminente?
            </h3>
            <p className="text-xs text-red-200">
              Comunícate inmediatamente con el centro de atención telefónica de la Policía Provincial.
            </p>
          </div>
        </div>

        <a
          href="tel:101"
          className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black text-base transition-all shadow-xl flex items-center gap-2 shrink-0"
        >
          <PhoneIcon className="w-5 h-5" />
          LLAMAR AL 101
        </a>
      </div>

      {/* Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStations.map((st) => (
          <div
            key={st.id}
            className="glass-panel p-5 rounded-2xl border border-white/10 hover:border-blue-500/50 flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="badge badge-gold">{st.city}</span>
                <ShieldIcon className="w-5 h-5 text-blue-400 opacity-60 group-hover:opacity-100 transition-opacity" />
              </div>

              <h3 className="font-bold text-base text-white mb-2">{st.name}</h3>

              <div className="space-y-2 text-xs text-slate-300 mb-4">
                <div className="flex items-start gap-2">
                  <MapPinIcon className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>{st.address}</span>
                </div>
                <div className="flex items-center gap-2 font-mono text-blue-300">
                  <PhoneIcon className="w-4 h-4 text-emerald-400 shrink-0" />
                  <a href={`tel:${st.phone.replace(/[^0-9+]/g, '')}`} className="hover:underline">
                    {st.phone}
                  </a>
                </div>
              </div>

              <div className="text-[11px] text-muted p-2 rounded-lg bg-black/20 border border-white/5">
                <span className="font-semibold text-slate-300">Jurisdicción:</span> {st.jurisdiction}
              </div>
            </div>

            <a
              href={`tel:${st.phone.replace(/[^0-9+]/g, '')}`}
              className="mt-4 w-full py-2 px-3 rounded-xl bg-blue-950/60 hover:bg-blue-900 text-blue-200 hover:text-white font-semibold text-xs transition-colors border border-blue-800/40 flex items-center justify-center gap-2"
            >
              <PhoneIcon className="w-3.5 h-3.5" />
              Llamar a Dependencia
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};
