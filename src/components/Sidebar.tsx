import React from 'react';
import type { TabId, CityFilter } from '../types/dashboard';

// Inline SVG icon primitives
const I = (path: React.ReactNode, extra?: string) => (
  <svg className={`nav-icon ${extra || ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    {path}
  </svg>
);

export const IconDashboard    = () => I(<><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></>);
export const IconFeed         = () => I(<><path d="M4 6h16M4 10h16M4 14h8"/></>);
export const IconChart        = () => I(<><polyline points="22 12 18 12 14 21 10 3 6 12 2 12"/></>);
export const IconBeacons      = () => I(<><circle cx="12" cy="12" r="3"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></>);
export const IconDirectory    = () => I(<><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.9 14.51a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.8 3.8h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 10.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 17.92z"/></>);
export const IconRecommend    = () => I(<><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></>);
export const IconShield       = () => I(<><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></>);
export const IconUsers        = () => I(<><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></>);
export const IconEye          = () => I(<><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>);
export const IconActivity     = () => I(<><polyline points="22 12 18 12 14 21 10 3 6 12 2 12"/></>);
export const IconThumbUp      = () => I(<><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></>);
export const IconLink         = () => I(<><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></>);
export const IconExternalLink = () => I(<><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></>);
export const IconDownload     = () => I(<><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></>);
export const IconTrendUp      = () => I(<><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></>);
export const IconFilter       = () => I(<><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></>);
export const IconSearch       = () => I(<><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>);
export const IconPhone        = () => I(<><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 3.9 14.59a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 2.8 3.8h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L6.09 10.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 20.9 18z"/></>);
export const IconMapPin       = () => I(<><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></>);
export const IconHeart        = () => I(<><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></>);
export const IconShare        = () => I(<><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></>);
export const IconMessageSq    = () => I(<><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></>);
export const IconSun          = () => I(<><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></>);
export const IconMoon         = () => I(<><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></>);
export const IconCheck        = () => I(<><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></>);
export const IconMenu         = () => I(<><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>);
export const IconX            = () => I(<><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>);
export const IconChevronUp    = () => I(<><polyline points="18 15 12 9 6 15"/></>);
export const IconChevronDown  = () => I(<><polyline points="6 9 12 15 18 9"/></>);
export const IconSiren        = () => I(<><path d="M12 2v4M5 8a7 7 0 0 1 14 0v6a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V8z"/><path d="M6 20h12"/></>);
export const IconClock        = () => I(<><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>);
export const IconCar          = () => I(<><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.5 2.8C1.4 11.2 1 12.1 1 13v3c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></>);
export const IconAward        = () => I(<><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></>);
export const IconBarChart     = () => I(<><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></>);
export const IconFacebook     = () => I(<><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></>);
export const IconInstagram    = () => I(<><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></>);
export const IconYoutube      = () => I(<><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></>);
export const IconGlobe        = () => I(<><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></>);
export const IconTwitter      = () => I(<><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></>);
export const IconWhatsapp     = () => (
  <svg className="nav-icon" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
  </svg>
);

// ── SIDEBAR ──────────────────────────────────────────────────────────────────
interface SidebarProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  selectedCity: CityFilter;
  onCityChange: (city: CityFilter) => void;
  isMobileOpen: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab, onTabChange, isDarkMode, onToggleTheme, selectedCity, onCityChange, isMobileOpen
}) => {
  const groups: {
    title: string;
    items: { id: TabId; label: string; icon: React.ReactNode }[];
  }[] = [
    {
      title: '⚡ SUITE AVANZADA 360',
      items: [
        { id: 'instagram-analyzer', label: 'Analizador de Perfil de Instagram', icon: <IconInstagram /> },
        { id: 'realtime-ga4', label: 'Monitoreo en Tiempo Real', icon: <IconActivity /> },
        { id: 'multiplatform-analytics', label: 'Estadísticas Multiplataforma', icon: <IconBarChart /> },
        { id: 'report-wizard', label: 'Generador de Informes (IA)', icon: <IconAward /> },
        { id: 'time-optimizer', label: 'Optimizador de Horarios', icon: <IconClock /> },
        { id: 'hashtag-tracker', label: 'Seguimiento de Etiquetas', icon: <IconSearch /> },
        { id: 'instagram-link-manager', label: 'Imágenes con Enlace (Instagram)', icon: <IconInstagram /> },
      ]
    },
    {
      title: 'PRINCIPAL',
      items: [
        { id: 'overview', label: 'Vista General y Métricas', icon: <IconDashboard /> },
        { id: 'feed', label: 'Muro de Publicaciones', icon: <IconFeed /> },
        { id: 'directory', label: 'Comisarías y Línea 101', icon: <IconDirectory /> },
      ]
    },
    {
      title: '📊 INFORMES Y REPORTES',
      items: [
        { id: 'informe-institucional', label: 'Informe Institucional (PDF)', icon: <IconAward /> },
        { id: 'dashboard-plataforma', label: 'Panel por Plataforma', icon: <IconGlobe /> },
        { id: 'ranking-posts', label: 'Clasificación de Publicaciones', icon: <IconBarChart /> },
        { id: 'monitor-hashtags', label: 'Monitor de Etiqueta #PolicíaTDF', icon: <IconSearch /> },
      ]
    },
    {
      title: '📅 PLANIFICACIÓN Y EJECUCIÓN',
      items: [
        { id: 'planificador', label: 'Planificador de Contenidos', icon: <IconClock /> },
        { id: 'aprobacion', label: 'Sistema de Aprobación OCI', icon: <IconShield /> },
        { id: 'asistente-ia', label: 'Asistente IA para Comunicados', icon: <IconTrendUp /> },
        { id: 'alertas-reels', label: 'Gestión de Historias y Reels', icon: <IconFeed /> },
      ]
    },
    {
      title: '📈 ANALÍTICA Y CRECIMIENTO',
      items: [
        { id: 'analytics', label: 'Estadísticas (Resumen)', icon: <IconBarChart /> },
        { id: 'best-times', label: 'Mejor Hora para Publicar', icon: <IconClock /> },
        { id: 'comparativa', label: 'Comparativa Institucional', icon: <IconUsers /> },
        { id: 'integraciones', label: 'Integraciones de Datos', icon: <IconGlobe /> },
      ]
    },
    {
      title: 'CENTRO DE ENLACES Y RECOMENDACIONES',
      items: [
        { id: 'beacons', label: 'Beacons.ai — Centro de Enlaces', icon: <IconBeacons /> },
        { id: 'recommendations', label: 'Recomendaciones OCI', icon: <IconRecommend /> },
      ]
    }
  ];

  return (
    <aside className={`sidebar ${isMobileOpen ? 'open' : ''}`}>
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="currentColor"/>
          </svg>
        </div>
        <div className="sidebar-logo-text">
          Policía TDF<br />
          <span style={{ fontSize: '0.62rem', fontWeight: 500, color: 'var(--text-muted)' }}>Plataforma OCI</span>
        </div>
      </div>

      {/* Nav Groups */}
      <div style={{ overflowY: 'auto', flex: 1, paddingRight: 4 }}>
        {groups.map((grp, gIdx) => (
          <div key={grp.title} style={{ marginBottom: 12 }}>
            <p className="sidebar-section-label" style={{ marginTop: gIdx === 0 ? 4 : 8 }}>{grp.title}</p>
            <nav className="sidebar-nav" style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {grp.items.map(item => (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`sidebar-nav-item ${activeTab === item.id ? 'active' : ''}`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
        ))}
      </div>

      {/* Bottom actions */}
      <div className="sidebar-bottom" style={{ display: 'flex', flexDirection: 'column', gap: 6, paddingTop: 10, borderTop: '1px solid var(--border-subtle)' }}>
        <button
          onClick={onToggleTheme}
          className="sidebar-nav-item"
          style={{ fontSize: '0.75rem', gap: 8 }}
        >
          {isDarkMode
            ? <><IconSun /><span>Modo Claro</span></>
            : <><IconMoon /><span>Modo Oscuro</span></>
          }
        </button>

        <a
          href="https://policia.tierradelfuego.gob.ar/"
          target="_blank"
          rel="noopener noreferrer"
          className="sidebar-nav-item"
          style={{ fontSize: '0.75rem', gap: 8 }}
        >
          <IconGlobe /><span>Sitio Web Oficial</span>
        </a>
      </div>
    </aside>
  );
};
