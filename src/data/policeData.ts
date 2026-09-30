import type {
  SocialAccount,
  MetricCard,
  SocialPost,
  LocationDistribution,
  MonthlyTrend,
  CategoryBreakdown,
  StationContact,
  StrategicRecommendation,
  BeaconsLink,
  BeaconsProfile
} from '../types/dashboard';

export const OFFICIAL_ACCOUNTS: SocialAccount[] = [
  {
    id: 'fb-official',
    name: 'Policia Provincial TDF',
    platform: 'facebook',
    handle: '@policiaprovincialtdf',
    url: 'https://www.facebook.com/policiaprovincialtdf',
    followers: 32450,
    growthRate: 4.8,
    engagementRate: 6.2,
    monthlyPosts: 68,
    monthlyReach: 185000,
    verified: true,
    avatarUrl: ''
  },
  {
    id: 'ig-official',
    name: 'Policía Tierra del Fuego',
    platform: 'instagram',
    handle: '@policiaprovincialtdf',
    url: 'https://www.instagram.com/policiaprovincialtdf/',
    followers: 18900,
    growthRate: 8.9,
    engagementRate: 8.5,
    monthlyPosts: 54,
    monthlyReach: 142000,
    verified: true,
    avatarUrl: ''
  },
  {
    id: 'web-official',
    name: 'Portal Web Oficial',
    platform: 'website',
    handle: 'policia.tierradelfuego.gob.ar',
    url: 'https://policia.tierradelfuego.gob.ar/',
    followers: 0,
    growthRate: 12.1,
    engagementRate: 0,
    monthlyPosts: 24,
    monthlyReach: 62000,
    verified: true,
    avatarUrl: ''
  },
  {
    id: 'tw-official',
    name: 'Policía TDF — X',
    platform: 'twitter',
    handle: '@policiatdf',
    url: 'https://twitter.com/policiatdf',
    followers: 5200,
    growthRate: 2.1,
    engagementRate: 3.4,
    monthlyPosts: 30,
    monthlyReach: 28000,
    verified: true,
    avatarUrl: ''
  },
  {
    id: 'yt-official',
    name: 'YouTube Oficial',
    platform: 'youtube',
    handle: 'PoliciaProvincialTDF',
    url: 'https://www.youtube.com/channel/UCq8ibtLJAJWWcyX3FBuIESw',
    followers: 1850,
    growthRate: 15.3,
    engagementRate: 11.2,
    monthlyPosts: 6,
    monthlyReach: 19500,
    verified: true,
    avatarUrl: ''
  },
  {
    id: 'bc-official',
    name: 'Beacons.ai / PolicíaTDF',
    platform: 'beacons',
    handle: '@policiatdf',
    url: 'https://beacons.ai/policiatdf',
    followers: 0,
    growthRate: 0,
    engagementRate: 0,
    monthlyPosts: 0,
    monthlyReach: 3200,
    verified: true,
    avatarUrl: ''
  }
];

export const KPI_SUMMARY: MetricCard[] = [
  {
    id: 'total-audience',
    title: 'Audiencia Digital Total',
    value: '58.400+',
    change: '+7.4%',
    isPositive: true,
    period: 'Último mes',
    description: 'Seguidores consolidados en Facebook, Instagram y X',
    icon: 'Users'
  },
  {
    id: 'monthly-reach',
    title: 'Alcance Ciudadano Mensual',
    value: '389.000',
    change: '+14.2%',
    isPositive: true,
    period: 'Impresiones en TDF',
    description: 'Personas únicas alcanzadas en Ushuaia, Río Grande y Tolhuin',
    icon: 'Eye'
  },
  {
    id: 'total-engagement',
    title: 'Interacciones Totales',
    value: '42.800',
    change: '+11.8%',
    isPositive: true,
    period: 'Likes + Comentarios + Compartidos',
    description: 'Elevado nivel de respuesta a avisos preventivos y noticias',
    icon: 'Activity'
  },
  {
    id: 'positive-sentiment',
    title: 'Sentimiento Favorable',
    value: '91.8%',
    change: '+2.3%',
    isPositive: true,
    period: 'Índice de Aceptación',
    description: 'Valoración positiva por respuesta e información vial',
    icon: 'ThumbsUp'
  },
  {
    id: 'beacons-clicks',
    title: 'Clics en Beacons.ai',
    value: '3.200',
    change: '+22.5%',
    isPositive: true,
    period: 'Último mes',
    description: 'Tráfico derivado desde la bio de Instagram y X',
    icon: 'Link'
  }
];

export const RECENT_POSTS: SocialPost[] = [
  {
    id: 'post-ig-1',
    platform: 'instagram',
    author: 'Policía Tierra del Fuego',
    authorHandle: '@policiaprovincialtdf',
    date: '2026-09-28',
    timeAgo: 'Hace 2 días',
    category: 'busqueda_rescate',
    categoryLabel: 'Búsqueda y Rescate',
    city: 'ushuaia',
    cityLabel: 'Ushuaia',
    content: '🚨 Rescate exitoso del G.E.B.yR. en sendero a Laguna Esmeralda. Personal policial asistió a dos senderistas desorientados en horario nocturno con bajas temperaturas. Se encuentran a salvo y en buen estado de salud.',
    mediaType: 'video',
    mediaUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80',
    likes: 2840,
    shares: 780,
    comments: 192,
    reach: 38400,
    sentiment: 'positivo',
    url: 'https://www.instagram.com/policiaprovincialtdf/',
    isFeatured: true
  },
  {
    id: 'post-ig-2',
    platform: 'instagram',
    author: 'Policía Tierra del Fuego',
    authorHandle: '@policiaprovincialtdf',
    date: '2026-09-26',
    timeAgo: 'Hace 4 días',
    category: 'prevencion_vial',
    categoryLabel: 'Prevención Vial',
    city: 'tolhuin',
    cityLabel: 'Tolhuin / Garibaldi',
    content: '❄️ ALERTA VIAL PASO GARIBALDI - RUTA NACIONAL N° 3. Calzada con presencia de escarcha y nieve compactada. Personal de la Comisaría Tolhuin y Destacamento Lago Escondido exige portación y uso de cadenas o cubiertas con clavos.',
    mediaType: 'gallery',
    mediaUrl: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=600&q=80',
    likes: 1890,
    shares: 920,
    comments: 142,
    reach: 21500,
    sentiment: 'alerta',
    url: 'https://www.instagram.com/policiaprovincialtdf/',
    isFeatured: true
  },
  {
    id: 'post-ig-3',
    platform: 'instagram',
    author: 'Policía Tierra del Fuego',
    authorHandle: '@policiaprovincialtdf',
    date: '2026-09-22',
    timeAgo: 'Hace 1 semana',
    category: 'cadetes_capacitacion',
    categoryLabel: 'Escuela de Cadetes',
    city: 'rio_grande',
    cityLabel: 'Río Grande',
    content: '🎓 Egresaron 120 nuevos Oficiales de la Escuela Superior de Policía en Río Grande. Jóvenes fueguinos con vocación de servicio juraron defender a la comunidad provincial. ¡Felicitaciones a la nueva promoción!',
    mediaType: 'video',
    mediaUrl: 'https://images.unsplash.com/photo-1579208575657-c595a05383b7?auto=format&fit=crop&w=600&q=80',
    likes: 2150,
    shares: 510,
    comments: 145,
    reach: 26100,
    sentiment: 'positivo',
    url: 'https://www.instagram.com/policiaprovincialtdf/'
  },
  {
    id: 'post-fb-1',
    platform: 'facebook',
    author: 'Policia Provincial TDF',
    authorHandle: '@policiaprovincialtdf',
    date: '2026-09-20',
    timeAgo: 'Hace 10 días',
    category: 'alertas_seguridad',
    categoryLabel: 'Seguridad Digital',
    city: 'todas',
    cityLabel: 'Provincial',
    content: '🛡️ Prevención de ciberestafas bancarias: Recuerde que ninguna entidad crediticia ni la Policía le solicitará transferencias de prueba ni claves token por WhatsApp o llamada. Ante dudas, radique la denuncia en su comisaría de barrio o llame al 101.',
    mediaType: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80',
    likes: 950,
    shares: 640,
    comments: 88,
    reach: 18400,
    sentiment: 'positivo',
    url: 'https://www.facebook.com/policiaprovincialtdf'
  }
];

export const LOCATION_DISTRIBUTION: LocationDistribution[] = [
  { city: 'Río Grande', percentage: 46, followersCount: 23600, color: '#6495ff' },
  { city: 'Ushuaia', percentage: 42, followersCount: 21500, color: '#ccff00' },
  { city: 'Tolhuin', percentage: 8, followersCount: 4100, color: '#f59e0b' },
  { city: 'Otras / Exterior', percentage: 4, followersCount: 2000, color: '#5e5879' }
];

export const MONTHLY_TRENDS: MonthlyTrend[] = [
  { month: 'Mar', facebookReach: 140000, instagramReach: 95000, engagement: 29000, posts: 110 },
  { month: 'Abr', facebookReach: 152000, instagramReach: 104000, engagement: 32500, posts: 115 },
  { month: 'May', facebookReach: 168000, instagramReach: 118000, engagement: 36000, posts: 128 },
  { month: 'Jun', facebookReach: 175000, instagramReach: 126000, engagement: 38200, posts: 132 },
  { month: 'Jul', facebookReach: 189000, instagramReach: 138000, engagement: 41000, posts: 140 },
  { month: 'Ago', facebookReach: 185000, instagramReach: 142000, engagement: 42800, posts: 142 }
];

export const CATEGORY_BREAKDOWN: CategoryBreakdown[] = [
  { category: 'prevencion_vial', label: 'Seguridad Vial & Rutas', postCount: 38, avgEngagement: 1850, percentage: 28, color: '#6495ff' },
  { category: 'alertas_seguridad', label: 'Alertas & Ciberdelito', postCount: 32, avgEngagement: 2100, percentage: 24, color: '#ef4444' },
  { category: 'institucional', label: 'Institucional & Comunidad', postCount: 30, avgEngagement: 1420, percentage: 21, color: '#22c55e' },
  { category: 'busqueda_rescate', label: 'Búsqueda y Rescate (GEBYR)', postCount: 22, avgEngagement: 2450, percentage: 15, color: '#f59e0b' },
  { category: 'cadetes_capacitacion', label: 'Convocatorias & Cadetes', postCount: 20, avgEngagement: 1280, percentage: 12, color: '#ccff00' }
];



export const STRATEGIC_RECOMMENDATIONS: StrategicRecommendation[] = [
  {
    id: 'rec-1',
    title: 'Producción de Reels Preventivos (30 seg.)',
    description: 'Los Reels sobre alertas viales en Paso Garibaldi y rescates del GEBYR generan un 3.5x más de compartidos que las imágenes estáticas. Meta: 2 videos semanales de 30 segundos.',
    priority: 'Alta',
    impact: '+45% en alcance (18-30 años)',
    targetPlatform: 'Instagram & Facebook Reels'
  },
  {
    id: 'rec-2',
    title: 'Reporte Diario de Estado de Rutas (07:00 hs)',
    description: 'Publicar el informe meteorológico de la RN3 a las 07:00 hs AM fideliza a conductores antes del tránsito laboral y posiciona la cuenta como fuente de referencia vial provincial.',
    priority: 'Alta',
    impact: 'Fidelización diaria + reducción incidentes viales',
    targetPlatform: 'Facebook & X (@policiatdf)'
  },
  {
    id: 'rec-3',
    title: 'Chatbot de Respuestas Automáticas para Trámites',
    description: 'El 65% de los DMs corresponden a requisitos de certificados de domicilio y antecedentes. Implementar un menú interactivo en Messenger e Instagram Direct reduciría la carga del equipo OCI.',
    priority: 'Media',
    impact: 'Ahorro del 40% en tiempo de respuesta OCI',
    targetPlatform: 'Messenger & Instagram Direct'
  },
  {
    id: 'rec-4',
    title: 'Campaña Infográfica: Prevención de Ciberestafas',
    description: 'Diseñar placas infográficas accesibles en lenguaje simple, orientadas a adultos mayores, para el ciclo "Seguridad Digital" difundido en todas las plataformas simultaneamente.',
    priority: 'Alta',
    impact: 'Prevención directa de delitos complejos',
    targetPlatform: 'Todas las plataformas'
  },
  {
    id: 'rec-5',
    title: 'Optimizar Beacons.ai como Hub de Links Centralizado',
    description: 'Actualizar @policiatdf en Beacons.ai con los 8 links de trámites más consultados y habilitarlo como enlace único en la bio de Instagram y X para maximizar conversión de clics.',
    priority: 'Media',
    impact: '+60% en clics desde bio de Instagram',
    targetPlatform: 'Beacons.ai → Instagram Bio & X Bio'
  }
];

// ── BEACONS.AI PROFILE DATA ──────────────────────────────────────────────────
export const BEACONS_PROFILE: BeaconsProfile = {
  handle: 'policiatdf',
  displayName: 'Policía de Tierra del Fuego',
  bio: 'Canal institucional de la Policía Provincial de Tierra del Fuego, Antártida e Islas del Atlántico Sur. Emergencias: 101',
  url: 'https://beacons.ai/policiatdf',
  totalClicks: 3200,
  monthlyClicks: 3200,
  clickGrowth: 22.5,
  topLinkClicks: 1240,
  uniqueVisitors: 2850,
  avgTimeOnPage: '0:47',
  theme: 'dark',
  verifiedAt: 'Oficina de Comunicación Institucional'
};

export const BEACONS_LINKS: BeaconsLink[] = [
  {
    id: 'bc-1',
    title: '🌐 Sitio Web Oficial',
    description: 'Trámites, comisarías, noticias e información institucional completa',
    url: 'https://policia.tierradelfuego.gob.ar/',
    category: 'website',
    clicks: 1240,
    clickRate: 38.7,
    isActive: true,
    platform: 'website',
    emoji: '🌐'
  },
  {
    id: 'bc-2',
    title: '📘 Facebook Oficial',
    description: 'Noticias, alertas y operativos en tiempo real',
    url: 'https://www.facebook.com/policiaprovincialtdf',
    category: 'social',
    clicks: 820,
    clickRate: 25.6,
    isActive: true,
    platform: 'facebook',
    emoji: '📘'
  },
  {
    id: 'bc-3',
    title: '📸 Instagram Oficial',
    description: 'Galería, reels y comunicación visual institucional',
    url: 'https://www.instagram.com/policiaprovincialtdf/',
    category: 'social',
    clicks: 640,
    clickRate: 20.0,
    isActive: true,
    platform: 'instagram',
    emoji: '📸'
  },
  {
    id: 'bc-4',
    title: '🎓 Escuela de Cadetes — Inscripción',
    description: 'Carrera de Oficial de Policía · Técnico Superior en Seguridad Pública',
    url: 'https://policia.tierradelfuego.gob.ar/inst-poli/',
    category: 'tramites',
    clicks: 310,
    clickRate: 9.7,
    isActive: true,
    platform: 'website',
    emoji: '🎓'
  },
  {
    id: 'bc-5',
    title: '📋 Trámites y Servicios en Línea',
    description: 'Certificados de reincidencia, domicilio y constancias',
    url: 'https://policia.tierradelfuego.gob.ar/tra-serv/',
    category: 'tramites',
    clicks: 280,
    clickRate: 8.7,
    isActive: true,
    platform: 'website',
    emoji: '📋'
  },
  {
    id: 'bc-6',
    title: '📺 YouTube — Canal Oficial',
    description: 'Videos institucionales, capacitaciones y operativos filmados',
    url: 'https://www.youtube.com/channel/UCq8ibtLJAJWWcyX3FBuIESw',
    category: 'social',
    clicks: 190,
    clickRate: 5.9,
    isActive: true,
    platform: 'youtube',
    emoji: '📺'
  },
  {
    id: 'bc-7',
    title: '🐦 Twitter / X Oficial',
    description: 'Avisos rápidos, alertas viales y novedades institucionales',
    url: 'https://twitter.com/policiatdf',
    category: 'social',
    clicks: 120,
    clickRate: 3.7,
    isActive: true,
    platform: 'twitter',
    emoji: '🐦'
  },
  {
    id: 'bc-8',
    title: '📍 Encontrá tu Comisaría Más Cercana',
    description: 'Directorio de comisarías de Ushuaia, Río Grande y Tolhuin',
    url: 'https://policia.tierradelfuego.gob.ar/mi-comisaria/',
    category: 'tramites',
    clicks: 185,
    clickRate: 5.8,
    isActive: true,
    platform: 'website',
    emoji: '📍'
  },
  {
    id: 'bc-9',
    title: '💬 WhatsApp Institucional',
    description: 'Consultas no urgentes y orientación ciudadana digital',
    url: 'https://policia.tierradelfuego.gob.ar/wa-me/',
    category: 'contact',
    clicks: 155,
    clickRate: 4.8,
    isActive: true,
    platform: 'whatsapp',
    emoji: '💬'
  }
];

export const STATIONS_DIRECTORY: StationContact[] = [
  // JEFATURA DE POLICÍA
  {
    id: 'jefatura',
    name: 'Jefatura de Policía de Tierra del Fuego',
    city: 'ushuaia',
    cityLabel: 'Ushuaia',
    address: 'Gobernador E. Deloqui 492',
    phone: '2901 421-773',
    whatsapp: undefined,
    email: 'policia.jefatura@tierradelfuego.gob.ar',
    facebook: 'https://www.facebook.com/policiaprovincialtdf',
    instagram: 'https://www.instagram.com/policiaprovincialtdf/',
    isEmergency101: true
  },

  // RÍO GRANDE
  {
    id: 'rg-1',
    name: 'Comisaría Primera Río Grande',
    city: 'rio_grande',
    cityLabel: 'Río Grande',
    address: 'Av. Belgrano N° 750',
    phone: '2964-433103 (Int. 3101 / 3105)',
    whatsapp: '+5492964578186',
    email: 'policia.cominst@tierradelfuego.gob.ar',
    isEmergency101: true
  },
  {
    id: 'rg-2',
    name: 'Comisaría Segunda Río Grande',
    city: 'rio_grande',
    cityLabel: 'Río Grande',
    address: '25 de Mayo N° 1894 esq. Roldán',
    phone: '2964-433109 (Int. 3109 / 3114)',
    whatsapp: '+5492964453873',
    isEmergency101: true
  },
  {
    id: 'rg-3',
    name: 'Comisaría Tercera Río Grande',
    city: 'rio_grande',
    cityLabel: 'Río Grande',
    address: 'Av. Prefectura Naval Arg. N° 481',
    phone: '2964-570938',
    whatsapp: '+5492964655322',
    isEmergency101: true
  },
  {
    id: 'rg-4',
    name: 'Comisaría Cuarta Río Grande',
    city: 'rio_grande',
    cityLabel: 'Río Grande',
    address: 'Uani N° 293 esq. Yaghán',
    phone: '2964-452217',
    whatsapp: '+5492964452217',
    isEmergency101: true
  },
  {
    id: 'rg-5',
    name: 'Comisaría Quinta Río Grande',
    city: 'rio_grande',
    cityLabel: 'Río Grande',
    address: 'Hna. María N. Ruiz N° 390',
    phone: '2964-570864',
    whatsapp: '+5492964558219',
    isEmergency101: true
  },
  {
    id: 'rg-genero',
    name: 'Comisaría de Género y Familia Río Grande',
    city: 'rio_grande',
    cityLabel: 'Río Grande',
    address: 'J. B. Thorne N° 2140 / Av. Perito Moreno N° 750',
    phone: '2964-421871 / 2964-433110 (Int. 3110)',
    whatsapp: '+5492964622292',
    isEmergency101: true
  },

  // TOLHUIN
  {
    id: 'tl-1',
    name: 'Comisaría Tolhuin',
    city: 'tolhuin',
    cityLabel: 'Tolhuin',
    address: 'Lucas Bridges N° 618',
    phone: '2901-492193',
    whatsapp: '+5492964465281',
    isEmergency101: true
  },
  {
    id: 'tl-genero',
    name: 'Comisaría de Género y Familia Tolhuin',
    city: 'tolhuin',
    cityLabel: 'Tolhuin',
    address: 'Ernesto Julio Löffler N° 142',
    phone: '2901-492193',
    whatsapp: '+5492964359417',
    isEmergency101: true
  },

  // USHUAIA
  {
    id: 'ush-1',
    name: 'Comisaría Primera Ushuaia',
    city: 'ushuaia',
    cityLabel: 'Ushuaia',
    address: 'Antonio Romero N° 577',
    phone: '2901-421773',
    whatsapp: '+5492901641359',
    isEmergency101: true
  },
  {
    id: 'ush-2',
    name: 'Comisaría Segunda Ushuaia',
    city: 'ushuaia',
    cityLabel: 'Ushuaia',
    address: 'Concejal Rubinos del Río N° 255',
    phone: '2901-577317',
    whatsapp: '+5492901652523',
    isEmergency101: true
  },
  {
    id: 'ush-3',
    name: 'Comisaría Tercera Ushuaia',
    city: 'ushuaia',
    cityLabel: 'Ushuaia',
    address: 'Com. Gral. Celestino Dalmazzo S/N',
    phone: '2901-421146',
    whatsapp: '+5492901466819',
    isEmergency101: true
  },
  {
    id: 'ush-4',
    name: 'Comisaría Cuarta Ushuaia',
    city: 'ushuaia',
    cityLabel: 'Ushuaia',
    address: 'De los Ñires N° 2265',
    phone: '2901-616079',
    whatsapp: '+5492901616079',
    isEmergency101: true
  },
  {
    id: 'ush-5',
    name: 'Comisaría Quinta Ushuaia',
    city: 'ushuaia',
    cityLabel: 'Ushuaia',
    address: 'Cristina Alkan N° 2250',
    phone: '2901-463389',
    whatsapp: '+5492901615392',
    isEmergency101: true
  },
  {
    id: 'ush-genero',
    name: 'Comisaría de Género y Familia San Vicente Ushuaia',
    city: 'ushuaia',
    cityLabel: 'Ushuaia',
    address: 'Cipriano Reyes N° 2749 / Gdor. Deloqui N° 488',
    phone: '2901-433895 / 2901-436888',
    whatsapp: '+5492901464757',
    isEmergency101: true
  }
];
