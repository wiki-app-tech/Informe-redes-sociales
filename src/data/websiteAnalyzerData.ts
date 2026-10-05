export interface WebsiteProfileAuditData {
  domain: string;
  portalName: string;
  verified: boolean;
  sslSecure: boolean;
  url: string;
  monthlyUsersCount: number;
  monthlyUsersDisplay: string;
  pageViewsCount: number;
  pageViewsDisplay: string;
  avgSessionDuration: string;
  bounceRatePct: number;
  digitalProceduresCount: number;
  digitalProceduresDisplay: string;
  uptimeSla: string;
  qualityScore: number;
  usersGrowthDelta: string;
  pageViewsDelta: string;
  mobilePct: number;
  desktopPct: number;

  channels: {
    organicSearch: { pct: number; count: number; description: string };
    directTraffic: { pct: number; count: number; description: string };
    socialReferrals: { pct: number; count: number; description: string };
    govReferrals: { pct: number; count: number; description: string };
  };

  demographics: {
    cities: { city: string; province: string; pct: number; count: number }[];
    devices: { device: string; pct: number; icon: string }[];
    browsers: { browser: string; pct: number }[];
  };

  topSections: {
    id: string;
    title: string;
    path: string;
    monthlyViews: number;
    monthlyViewsDisplay: string;
    avgTime: string;
    category: string;
    badge: string;
    bounceRate: number;
  }[];

  growth: {
    currentUsers: number;
    currentPageViews: number;
    monthlyGrowthRate: number;
    timeline: { month: string; users: number; pageViews: number; procedures: number }[];
  };

  coreWebVitals: {
    lcp: { value: string; status: 'good' | 'needs-improvement' | 'poor'; label: string };
    fid: { value: string; status: 'good' | 'needs-improvement' | 'poor'; label: string };
    cls: { value: string; status: 'good' | 'needs-improvement' | 'poor'; label: string };
    fcp: { value: string; status: 'good' | 'needs-improvement' | 'poor'; label: string };
    serverLocation: string;
    securityProtocol: string;
  };

  aiAudit: {
    performanceScore: string;
    accessibilityScore: string;
    recommendations: {
      type: 'positive' | 'warning' | 'action';
      title: string;
      description: string;
      impact: string;
    }[];
  };
}

export const WEBSITE_PROFILE_AUDIT: WebsiteProfileAuditData = {
  domain: 'policia.tierradelfuego.gob.ar',
  portalName: 'Portal Web Oficial — Policía de Tierra del Fuego',
  verified: true,
  sslSecure: true,
  url: 'https://policia.tierradelfuego.gob.ar/',
  monthlyUsersCount: 62400,
  monthlyUsersDisplay: '62.4k',
  pageViewsCount: 184200,
  pageViewsDisplay: '184.2k',
  avgSessionDuration: '2m 48s',
  bounceRatePct: 34.2,
  digitalProceduresCount: 18650,
  digitalProceduresDisplay: '18.6k',
  uptimeSla: '99.98%',
  qualityScore: 9.6,
  usersGrowthDelta: '+12,4% respecto al mes pasado',
  pageViewsDelta: '+16,8% respecto al mes pasado',
  mobilePct: 78.6,
  desktopPct: 19.4,

  // 1. CANALES DE TRÁFICO
  channels: {
    organicSearch: {
      pct: 58.2,
      count: 36316,
      description: 'Búsquedas en Google: "estado de rutas tdf", "policia ushuaia", "certificado residencia policia fueguina".'
    },
    directTraffic: {
      pct: 22.4,
      count: 13977,
      description: 'Accesos directos por marcadores guardados y accesos desde navegadores móviles habituales.'
    },
    socialReferrals: {
      pct: 14.8,
      count: 9235,
      description: 'Derivaciones desde publicaciones de Facebook, enlaces en biografía de Instagram y Beacons.ai.'
    },
    govReferrals: {
      pct: 4.6,
      count: 2872,
      description: 'Enlaces directos desde el portal central de la Provincia (tierradelfuego.gob.ar) y Boletín Oficial.'
    }
  },

  // 2. DEMOGRAFÍA Y DISPOSITIVOS
  demographics: {
    cities: [
      { city: 'Río Grande', province: 'Tierra del Fuego', pct: 49.1, count: 30638 },
      { city: 'Ushuaia', province: 'Tierra del Fuego', pct: 42.4, count: 26457 },
      { city: 'Tolhuin', province: 'Tierra del Fuego', pct: 6.8, count: 4243 },
      { city: 'Resto de la Patagonia / Nacional', province: 'Patagonia / CABA', pct: 1.7, count: 1062 }
    ],
    devices: [
      { device: 'Teléfonos Inteligentes (Mobile)', pct: 78.6, icon: '📱' },
      { device: 'Computadoras de Escritorio / Laptops', pct: 19.4, icon: '💻' },
      { device: 'Tablets y Dispositivos Táctiles', pct: 2.0, icon: '📟' }
    ],
    browsers: [
      { browser: 'Chrome Mobile / Android', pct: 54.2 },
      { browser: 'Safari Mobile / iOS', pct: 24.4 },
      { browser: 'Chrome Desktop', pct: 14.8 },
      { browser: 'Edge / Firefox Desktop', pct: 6.6 }
    ]
  },

  // 3. SECCIONES MÁS VISITADAS & TRÁMITES ONLINE
  topSections: [
    {
      id: 'web-s1',
      title: '❄️ Estado de Rutas TDF en Vivo (Ruta 3, Paso Garibaldi, Complementarias)',
      path: '/estado-rutas-vial',
      monthlyViews: 72400,
      monthlyViewsDisplay: '72.4k',
      avgTime: '1m 24s',
      category: 'Seguridad Vial y Alertas',
      badge: '🚗 MÁS VISITADA',
      bounceRate: 26.4
    },
    {
      id: 'web-s2',
      title: '📄 Certificado de Residencia Fueguina Online con Firma Digital QR',
      path: '/tramites/certificado-residencia',
      monthlyViews: 38200,
      monthlyViewsDisplay: '38.2k',
      avgTime: '4m 12s',
      category: 'Trámites Ciudadanos',
      badge: '📝 TRÁMITE ONLINE',
      bounceRate: 18.2
    },
    {
      id: 'web-s3',
      title: '🛡️ Certificado de Buena Conducta y Antecedentes Penales Provinciales',
      path: '/tramites/buena-conducta',
      monthlyViews: 28400,
      monthlyViewsDisplay: '28.4k',
      avgTime: '3m 50s',
      category: 'Trámites Ciudadanos',
      badge: '💼 LABORAL',
      bounceRate: 22.1
    },
    {
      id: 'web-s4',
      title: '📞 Directorio Institucional de Comisarías y Teléfonos de Emergencias 101',
      path: '/directorio-comisarias',
      monthlyViews: 21500,
      monthlyViewsDisplay: '21.5k',
      avgTime: '2m 10s',
      category: 'Atención Comunitaria',
      badge: '🚨 EMERGENCIAS',
      bounceRate: 31.8
    },
    {
      id: 'web-s5',
      title: '🎓 Convocatoria e Inscripción a la Escuela Superior de Policía 2026/2027',
      path: '/incorporaciones-cadetes',
      monthlyViews: 14800,
      monthlyViewsDisplay: '14.8k',
      avgTime: '5m 05s',
      category: 'Capacitación y Empleo',
      badge: '🎓 CONVOCATORIA',
      bounceRate: 29.5
    },
    {
      id: 'web-s6',
      title: '💻 Formulario de Denuncia Online por Ciberestafas y Extravío de Documentos',
      path: '/denuncias-online',
      monthlyViews: 8900,
      monthlyViewsDisplay: '8.9k',
      avgTime: '6m 30s',
      category: 'Investigaciones OCI',
      badge: '⚖️ LEGAL',
      bounceRate: 19.8
    }
  ],

  // 4. EVOLUCIÓN HISTÓRICA DE TRÁFICO
  growth: {
    currentUsers: 62400,
    currentPageViews: 184200,
    monthlyGrowthRate: 12.4,
    timeline: [
      { month: 'Oct 2025', users: 38200, pageViews: 112000, procedures: 9800 },
      { month: 'Nov 2025', users: 41500, pageViews: 124000, procedures: 11200 },
      { month: 'Dic 2025', users: 49800, pageViews: 148000, procedures: 14500 },
      { month: 'Ene 2026', users: 56400, pageViews: 168000, procedures: 16800 },
      { month: 'Feb 2026', users: 51200, pageViews: 154000, procedures: 13900 },
      { month: 'Mar 2026', users: 48900, pageViews: 145000, procedures: 14200 },
      { month: 'Abr 2026', users: 52100, pageViews: 152000, procedures: 15100 },
      { month: 'May 2026', users: 58600, pageViews: 172000, procedures: 17200 },
      { month: 'Jun 2026', users: 68400, pageViews: 202000, procedures: 18400 },
      { month: 'Jul 2026', users: 74200, pageViews: 218000, procedures: 19800 },
      { month: 'Ago 2026', users: 65100, pageViews: 192000, procedures: 18100 },
      { month: 'Sep 2026', users: 62400, pageViews: 184200, procedures: 18650 }
    ]
  },

  // 5. CORE WEB VITALS & INFRAESTRUCTURA
  coreWebVitals: {
    lcp: { value: '1.2s', status: 'good', label: 'Carga de Contenido Principal (LCP)' },
    fid: { value: '18ms', status: 'good', label: 'Interactividad y Respuesta (FID)' },
    cls: { value: '0.02', status: 'good', label: 'Estabilidad Visual de Página (CLS)' },
    fcp: { value: '0.8s', status: 'good', label: 'Primer Despliegue de Contenido (FCP)' },
    serverLocation: 'Datacenter Gubernamental Ushuaia / Red de Fibra Provincial',
    securityProtocol: 'HTTPS Activo · TLS 1.3 · Cabeceras HSTS y WAF Activo'
  },

  // 6. AUDITORÍA IA
  aiAudit: {
    performanceScore: '98/100 (Google PageSpeed Insights Móvil)',
    accessibilityScore: '96/100 (Cumplimiento WCAG 2.1 AA)',
    recommendations: [
      {
        type: 'positive',
        title: 'Excelente adaptación para móviles (78.6% del tráfico)',
        description: 'La navegación en smartphones funciona de manera instantánea, fundamental para conductores en ruta.',
        impact: 'Alta satisfacción ciudadana'
      },
      {
        type: 'action',
        title: 'Notificaciones Web Push para alertas viales de Ruta 3',
        description: 'Permitir a los vecinos suscribirse a alertas automáticas en su navegador reduce consultas telefónicas al 101 durante temporales.',
        impact: '-28% llamadas saturadas'
      },
      {
        type: 'action',
        title: 'Verificador QR de validez de certificados en portada',
        description: 'Facilitar a empleadores y dependencias públicas escanear el QR del certificado de buena conducta en un solo clic.',
        impact: '+40% celeridad en trámites'
      }
    ]
  }
};
