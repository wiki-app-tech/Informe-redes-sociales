import React, { useState, useEffect } from 'react';
import type { CityFilter, TabId } from './types/dashboard';
import {
  OFFICIAL_ACCOUNTS,
  KPI_SUMMARY,
  RECENT_POSTS,
  LOCATION_DISTRIBUTION,
  MONTHLY_TRENDS,
  CATEGORY_BREAKDOWN,
  STATIONS_DIRECTORY,
  STRATEGIC_RECOMMENDATIONS,
  BEACONS_PROFILE,
  BEACONS_LINKS
} from './data/policeData';

import { Sidebar } from './components/Sidebar';
import { TopBar, KpiCards } from './components/TopBarKpi';
import { PlatformCards, AnalyticsCharts } from './components/PlatformAnalytics';
import { SocialFeed } from './components/FeedSection';
import { BeaconsSection } from './components/BeaconsSection';
import { BestTimesSection } from './components/BestTimesSection';
import { DirectorySection } from './components/StationsDirectory';
import { ReportModal, RecommendationsSection } from './components/ReportAndRecommendations';

// New Metricool Modules
import {
  InformeInstitucionalSection,
  MonitorHashtagsSection,
  RankingPostsSection,
  DashboardPlataformaSection
} from './components/ReportingModules';

import {
  PlanificadorSection,
  SistemaAprobacionSection,
  AsistenteIASection,
  AlertasReelsSection
} from './components/PlanningModules';

import {
  ComparativaSection,
  IntegracionesSection
} from './components/GrowthModules';

// Suite de Analítica y Reportes Modules
import { InstagramProfileAnalyzer } from './components/InstagramProfileAnalyzer';
import { RealtimeDashboard } from './components/RealtimeDashboard';
import { MultiplatformAnalytics } from './components/MultiplatformAnalytics';
import { ReportGeneratorWizard } from './components/ReportGeneratorWizard';
import { BestTimeOptimizer } from './components/BestTimeOptimizer';
import { HashtagTracker } from './components/HashtagTracker';
import { InstagramLinkManager } from './components/InstagramLinkManager';
import { EstadisticasResumen } from './components/EstadisticasResumen';
import { ResumenMensualSection } from './components/ResumenMensualSection';
import { FacebookProfileAnalyzer } from './components/FacebookProfileAnalyzer';

const TAB_TITLES: Record<TabId, { title: string; sub: string }> = {
  // Suite de Analítica y Reportes
  'instagram-analyzer':     { title: 'Analizador de Perfil de Instagram — @policiaprovincialtdf', sub: 'Análisis profundo de audiencia, demografía, seguidores falsos, sentimiento, crecimiento e interacción' },
  'facebook-analyzer':      { title: 'Analizador de Página y Perfil de Facebook — @policiaprovincialtdf', sub: 'Auditoría integral con 16 mil seguidores, 113 seguidos y 2.2 mil publicaciones — Métricas en vivo OCI' },
  'resumen-mensual':        { title: 'Resumen Mensual — Reels, Historias y Actividad', sub: 'Top de visualizaciones, desglose de seguidores vs. no seguidores, calendario de historias y comparativa mensual' },
  'realtime-ga4':           { title: 'Monitoreo en Tiempo Real (API GA4 Directa / MCP)', sub: 'Métricas activas en vivo, mapa de calor de páginas y registro de eventos' },
  'multiplatform-analytics': { title: 'Estadísticas Multiplataforma — Resumen', sub: 'Todo el contenido, visualizaciones, seguidores netos, interacciones y destacados' },
  'report-wizard':          { title: 'Generador de Informes Automáticos (Asistente IA)', sub: 'Asistente de 3 pasos para PDF/Excel con conclusiones automáticas por Agente IA' },
  'time-optimizer':         { title: 'Optimizador de Horarios de Publicación', sub: 'Mapa de calor 24/7 y recomendaciones automáticas de mejores momentos para publicar' },
  'hashtag-tracker':        { title: 'Seguimiento y Monitor de Etiquetas', sub: 'Seguimiento de volumen, alcance y alertas de tendencia en X e Instagram' },
  'instagram-link-manager':  { title: 'Imágenes con Enlace y Centro de Enlaces de Instagram', sub: 'Generador de páginas de destino para publicaciones de Instagram y análisis de clics' },

  // Principal
  overview:                { title: 'Vista General y Métricas', sub: 'Métricas clave de comunicación digital institucional' },
  feed:                    { title: 'Muro de Publicaciones', sub: 'Monitor en tiempo real — Facebook, Instagram y Portal Oficial' },
  directory:               { title: 'Comisarías y Emergencias 101', sub: 'Directorio institucional con contactos directos en Ushuaia, Río Grande y Tolhuin' },

  // Informes y Reportes
  'informe-institucional': { title: 'Informe Institucional Consolidado (PDF)', sub: 'Reporte oficial estilo Metricool Studio firmado por las OCI Río Grande y Ushuaia' },
  'dashboard-plataforma':  { title: 'Panel por Plataforma', sub: 'Desglose analítico individual para Facebook, Instagram, YouTube, X y Web' },
  'ranking-posts':         { title: 'Clasificación de Publicaciones', sub: 'Top de contenidos con mayor alcance, impresiones e interacción' },
  'monitor-hashtags':      { title: 'Monitor de Etiqueta (#PolicíaTDF)', sub: 'Seguimiento de la etiqueta oficial y temas de mayor rendimiento' },

  // Planificacion y Ejecucion
  planificador:            { title: 'Planificador de Contenidos', sub: 'Calendario editorial con foco estratégico en Historias y Reels' },
  aprobacion:              { title: 'Sistema de Aprobación OCI', sub: 'Flujo de revisión: Borrador → Revisión por Comisario Inspector Gómez / Comisario Peralta → Aprobado' },
  'asistente-ia':          { title: 'Asistente IA para Comunicados', sub: 'Generador de textos oficiales para Alertas Viales, Rescates y Prevención' },
  'alertas-reels':         { title: 'Gestión de Historias y Reels', sub: 'Estrategia y formatos de microvideo de mayor respuesta ciudadana' },

  // Analitica y Crecimiento
  analytics:               { title: 'Estadísticas de Redes Sociales — Resumen Oficial', sub: 'Todo el contenido, visualizaciones, seguidores netos, interacciones y destacados' },
  'best-times':            { title: 'Mejor Hora para Publicar', sub: 'Mapas de calor de audiencia por plataforma — Datos del estudio Metricool 2026' },
  comparativa:             { title: 'Comparativa Institucional (Benchmarking)', sub: 'Evaluación vs. Policía de Córdoba, Policía de la Ciudad (CABA) y Policía Nacional de España' },
  integraciones:           { title: 'Integraciones & APIs', sub: 'Estado de conexión con Meta API, Beacons.ai, Web RSS y servicios digitales' },

  // Centro de Enlaces y Recomendaciones
  beacons:                 { title: 'Beacons.ai — Centro de Enlaces', sub: 'Análisis de conversión y tráfico del directorio @policiatdf' },
  recommendations:         { title: 'Recomendaciones OCI', sub: 'Plan de optimización estratégica para la Oficina de Comunicación Institucional' },
};

const App: React.FC = () => {
  const [activeTab, setActiveTab]       = useState<TabId>('instagram-analyzer');
  const [selectedCity, setSelectedCity] = useState<CityFilter>('todas');
  const [isDarkMode, setIsDarkMode]     = useState<boolean>(true);
  const [reportOpen, setReportOpen]     = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [toastMsg, setToastMsg]         = useState<string | null>(null);

  useEffect(() => {
    document.body.classList.toggle('light-mode', !isDarkMode);
  }, [isDarkMode]);

  // Close mobile menu when tab changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [activeTab]);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => {
      setToastMsg(prev => (prev === msg ? null : prev));
    }, 3200);
  };

  const tab = TAB_TITLES[activeTab] || TAB_TITLES['instagram-analyzer'];

  // Quick sub-navigation tabs for Overview page (MSN Weather Horizontal Strip style)
  const overviewQuickTabs: { id: TabId; label: string; icon: string }[] = [
    { id: 'instagram-analyzer', label: 'Analizador de Instagram', icon: '📸' },
    { id: 'facebook-analyzer', label: 'Analizador de Facebook', icon: '👥' },
    { id: 'resumen-mensual', label: 'Resumen Mensual', icon: '📅' },
    { id: 'analytics', label: 'Estadísticas (Resumen)', icon: '📊' },
    { id: 'overview', label: 'Información General', icon: '⭐' },
    { id: 'realtime-ga4', label: 'GA4 en Tiempo Real', icon: '⚡' },
    { id: 'feed', label: 'Muro Social', icon: '📰' },
    { id: 'directory', label: 'Comisarías 101', icon: '🏢' },
    { id: 'report-wizard', label: 'Informes IA', icon: '📄' },
    { id: 'planificador', label: 'Planificador', icon: '📅' },
  ];

  return (
    <div className="app-shell">
      {/* ── SIDEBAR ── */}
      <Sidebar
        activeTab={activeTab}
        onTabChange={t => {
          setActiveTab(t);
          showToast(`🚀 Módulo activo: ${TAB_TITLES[t]?.title || t}`);
        }}
        isDarkMode={isDarkMode}
        onToggleTheme={() => {
          setIsDarkMode(p => !p);
          showToast(isDarkMode ? '☀️ Modo Claro activado' : '🌙 Modo Oscuro activado');
        }}
        selectedCity={selectedCity}
        onCityChange={c => {
          setSelectedCity(c);
          showToast(`📍 Ubicación seleccionada: ${c.toUpperCase()}`);
        }}
        isMobileOpen={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
      />

      {/* ── MAIN AREA ── */}
      <div className="main-content">
        {/* Top Bar with Search & Location Switcher */}
        <TopBar
          title={tab.title}
          subtitle={tab.sub}
          selectedCity={selectedCity}
          onCityChange={setSelectedCity}
          onOpenReport={() => setReportOpen(true)}
          onMobileMenuToggle={() => setMobileMenuOpen(p => !p)}
          onSelectTab={setActiveTab}
          allTabs={TAB_TITLES}
          showToast={showToast}
        />

        {/* Mobile overlay to close sidebar */}
        {mobileMenuOpen && (
          <div
            onClick={() => setMobileMenuOpen(false)}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', zIndex: 39 }}
          />
        )}

        {/* Page Content */}
        <main className="main-body anim-fadein" key={activeTab}>

          {/* MSN WEATHER-STYLE HORIZONTAL SUB-NAV PILL STRIP (UX Improvement) */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              overflowX: 'auto',
              paddingBottom: 10,
              marginBottom: 20,
              WebkitOverflowScrolling: 'touch',
              width: '100%',
              maxWidth: '100%',
              boxSizing: 'border-box'
            }}
            className="scrollbar-hide"
          >
            {overviewQuickTabs.map(qt => {
              const active = activeTab === qt.id;
              return (
                <button
                  key={qt.id}
                  onClick={() => {
                    setActiveTab(qt.id);
                    showToast(`Visualizando: ${qt.label}`);
                  }}
                  style={{
                    background: active ? 'var(--neon)' : 'rgba(255,255,255,0.06)',
                    color: active ? 'var(--text-on-neon)' : 'var(--text-secondary)',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: active ? 800 : 600,
                    fontSize: '0.76rem',
                    padding: '7px 16px',
                    borderRadius: 9999,
                    border: active ? '1px solid var(--neon)' : '1px solid var(--border-subtle)',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    flexShrink: 0,
                    transition: 'all 0.18s ease',
                    boxShadow: active ? '0 4px 15px rgba(252,185,0,0.25)' : 'none'
                  }}
                >
                  <span>{qt.icon}</span>
                  <span>{qt.label}</span>
                </button>
              );
            })}
          </div>

          {/* ── CORE TABS ── */}
          {activeTab === 'overview' && (
            <>
              <KpiCards metrics={KPI_SUMMARY} />
              <PlatformCards accounts={OFFICIAL_ACCOUNTS} />

              <div style={{ marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                  <div>
                    <h2 className="section-title" style={{ fontSize: '0.95rem' }}>Últimas Publicaciones Destacadas</h2>
                    <p className="section-subtitle">Extracto del monitor de redes — Ver todo en «Feed de Publicaciones»</p>
                  </div>
                  <button onClick={() => setActiveTab('feed')} className="btn-ghost" style={{ fontSize: '0.7rem' }}>
                    Ver todo →
                  </button>
                </div>
                <SocialFeed posts={RECENT_POSTS.slice(0, 3)} selectedCity={selectedCity} />
              </div>
            </>
          )}

          {activeTab === 'feed' && (
            <SocialFeed posts={RECENT_POSTS} selectedCity={selectedCity} />
          )}

          {activeTab === 'directory' && (
            <DirectorySection stations={STATIONS_DIRECTORY} selectedCity={selectedCity} />
          )}

          {/* ── SUITE DE ANALÍTICA Y REPORTES TABS ── */}
          {activeTab === 'instagram-analyzer' && (
            <InstagramProfileAnalyzer />
          )}

          {activeTab === 'facebook-analyzer' && (
            <FacebookProfileAnalyzer />
          )}

          {activeTab === 'resumen-mensual' && (
            <ResumenMensualSection />
          )}

          {activeTab === 'realtime-ga4' && (
            <RealtimeDashboard />
          )}

          {activeTab === 'multiplatform-analytics' && (
            <EstadisticasResumen />
          )}

          {activeTab === 'report-wizard' && (
            <ReportGeneratorWizard />
          )}

          {activeTab === 'time-optimizer' && (
            <BestTimeOptimizer />
          )}

          {activeTab === 'hashtag-tracker' && (
            <HashtagTracker />
          )}

          {activeTab === 'instagram-link-manager' && (
            <InstagramLinkManager />
          )}

          {/* ── CATEGORÍA 1: REPORTING ── */}
          {activeTab === 'informe-institucional' && (
            <InformeInstitucionalSection accounts={OFFICIAL_ACCOUNTS} posts={RECENT_POSTS} />
          )}

          {activeTab === 'dashboard-plataforma' && (
            <DashboardPlataformaSection accounts={OFFICIAL_ACCOUNTS} />
          )}

          {activeTab === 'ranking-posts' && (
            <RankingPostsSection posts={RECENT_POSTS} />
          )}

          {activeTab === 'monitor-hashtags' && (
            <MonitorHashtagsSection />
          )}

          {/* ── CATEGORÍA 2: PLANIFICACIÓN Y EJECUCIÓN ── */}
          {activeTab === 'planificador' && (
            <PlanificadorSection />
          )}

          {activeTab === 'aprobacion' && (
            <SistemaAprobacionSection />
          )}

          {activeTab === 'asistente-ia' && (
            <AsistenteIASection />
          )}

          {activeTab === 'alertas-reels' && (
            <AlertasReelsSection />
          )}

          {/* ── CATEGORÍA 3: ANALÍTICA Y CRECIMIENTO ── */}
          {activeTab === 'analytics' && (
            <EstadisticasResumen />
          )}

          {activeTab === 'best-times' && (
            <BestTimesSection />
          )}

          {activeTab === 'comparativa' && (
            <ComparativaSection />
          )}

          {activeTab === 'integraciones' && (
            <IntegracionesSection />
          )}

          {/* ── HUB & RECOMENDACIONES ── */}
          {activeTab === 'beacons' && (
            <BeaconsSection profile={BEACONS_PROFILE} links={BEACONS_LINKS} />
          )}

          {activeTab === 'recommendations' && (
            <RecommendationsSection
              recommendations={STRATEGIC_RECOMMENDATIONS}
              onOpenReport={() => setReportOpen(true)}
            />
          )}

        </main>

        {/* ── FOOTER ── */}
        <footer style={{
          borderTop: '1px solid var(--border-subtle)',
          padding: '14px 28px',
          display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 10,
          fontSize: '0.68rem', color: 'var(--text-muted)'
        }}>
          <span style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>
            🛡️ Policía de Tierra del Fuego, Antártida e Islas del Atlántico Sur — OCI 2026
          </span>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            {[
              ['policia.tierradelfuego.gob.ar', 'https://policia.tierradelfuego.gob.ar/'],
              ['Facebook', 'https://www.facebook.com/policiaprovincialtdf'],
              ['Instagram', 'https://www.instagram.com/policiaprovincialtdf/'],
              ['Beacons.ai', 'https://beacons.ai/policiatdf'],
            ].map(([label, href]) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                style={{ color: 'var(--text-muted)', transition: 'color 0.15s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-neon)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
              >
                {label}
              </a>
            ))}
          </div>
        </footer>
      </div>

      {/* ── REPORT MODAL ── */}
      <ReportModal
        isOpen={reportOpen}
        onClose={() => setReportOpen(false)}
        accounts={OFFICIAL_ACCOUNTS}
        recommendations={STRATEGIC_RECOMMENDATIONS}
      />

      {/* ── FLOATING TOAST NOTIFICATION (UX Improvement) ── */}
      {toastMsg && (
        <div
          className="anim-fadein"
          style={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            zIndex: 120,
            background: 'var(--bg-card)',
            border: '1px solid var(--neon)',
            borderRadius: 9999,
            padding: '10px 20px',
            color: 'var(--text-primary)',
            fontSize: '0.78rem',
            fontWeight: 700,
            boxShadow: '0 10px 30px rgba(0,0,0,0.5), 0 0 20px rgba(255,208,0,0.25)',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            backdropFilter: 'blur(10px)'
          }}
        >
          <span>✨</span>
          <span>{toastMsg}</span>
        </div>
      )}
    </div>
  );
};

export default App;
