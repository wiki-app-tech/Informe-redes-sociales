import type { InstagramProfileAuditData } from '../types/dashboard';

export const INSTAGRAM_PROFILE_AUDIT: InstagramProfileAuditData = {
  handle: '@policiaprovincialtdf',
  displayName: 'Policía Tierra del Fuego',
  url: 'https://www.instagram.com/policiaprovincialtdf/',
  verified: true,
  avatarUrl: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=250&q=80',
  bio: 'Policía de la Provincia de Tierra del Fuego, Antártida e Islas del Atlántico Sur. Seguridad, prevención y vocación de servicio. 📞 Emergencias: 101 | 📍 Ushuaia · Río Grande · Tolhuin',
  postsCount: 648,
  followersCount: 19250,
  followingCount: 142,
  ratio: 135.5,
  qualityScore: 91.4,
  qualityGrade: 'A',
  engagementRate: 8.52,
  benchmarkEr: 2.10,

  // 🛡️ 1. AUDIENCE & FAKE FOLLOWERS AUDIT
  audience: {
    realPeople: {
      pct: 82.4,
      count: 15862,
      description: 'Usuarios activos reales con actividad regular, seguidores locales y consumo orgánico.'
    },
    influencers: {
      pct: 2.3,
      count: 443,
      description: 'Cuentas verificadas, periodistas fueguinos, autoridades provinciales y medios de comunicación.'
    },
    massFollowers: {
      pct: 9.5,
      count: 1828,
      description: 'Cuentas que siguen a más de 1.500 perfiles. Suelen tener menor tasa de visualización en el feed.'
    },
    suspiciousBots: {
      pct: 5.8,
      count: 1117,
      description: 'Cuentas inactivas, fantasmas o posibles bots. Excelente umbral: muy por debajo del promedio de riesgo (15-20%).'
    }
  },

  // 👥 2. DEMOGRAPHICS
  demographics: {
    gender: {
      female: 53.0,
      male: 47.0
    },
    ageBrackets: [
      { range: '13-17', pct: 3.2 },
      { range: '18-24', pct: 24.8 },
      { range: '25-34', pct: 38.5 },
      { range: '35-44', pct: 21.2 },
      { range: '45-54', pct: 8.6 },
      { range: '55+', pct: 3.7 }
    ],
    cities: [
      { city: 'Río Grande', province: 'Tierra del Fuego', pct: 44.2, count: 8508 },
      { city: 'Ushuaia', province: 'Tierra del Fuego', pct: 38.6, count: 7430 },
      { city: 'Tolhuin', province: 'Tierra del Fuego', pct: 8.4, count: 1617 },
      { city: 'CABA / Buenos Aires', province: 'Buenos Aires', pct: 4.8, count: 924 },
      { city: 'Río Gallegos', province: 'Santa Cruz', pct: 2.2, count: 423 },
      { city: 'Otras localidades', province: 'Patagonia / Resto', pct: 1.8, count: 348 }
    ],
    countries: [
      { country: 'Argentina', flag: '🇦🇷', pct: 96.4 },
      { country: 'Chile (Región de Magallanes)', flag: '🇨🇱', pct: 2.1 },
      { country: 'Estados Unidos / Otros', flag: '🌎', pct: 1.5 }
    ],
    languages: [
      { lang: 'Español (Argentina / Regional)', pct: 98.6 },
      { lang: 'Inglés', pct: 1.1 },
      { lang: 'Otros', pct: 0.3 }
    ]
  },

  // ❤️ 3. SENTIMENT ANALYSIS & COMMUNITY PERCEPTION
  sentiment: {
    overall: {
      positive: 73.8,
      neutral: 21.4,
      negative: 4.8
    },
    sentimentScore: 84.5,
    topics: [
      {
        topic: 'Operativo Invierno & Paso Garibaldi (Ruta 3)',
        positive: 89.2,
        neutral: 9.3,
        negative: 1.5,
        count: 940,
        emoji: '❄️'
      },
      {
        topic: 'Búsqueda y Rescate en Montaña (G.E.B.yR.)',
        positive: 94.6,
        neutral: 4.8,
        negative: 0.6,
        count: 1280,
        emoji: '🏔️'
      },
      {
        topic: 'Convocatoria & Escuela Superior de Policía',
        positive: 82.0,
        neutral: 15.5,
        negative: 2.5,
        count: 860,
        emoji: '🎓'
      },
      {
        topic: 'Seguridad Preventiva & Controles Nocturnos',
        positive: 62.4,
        neutral: 29.8,
        negative: 7.8,
        count: 530,
        emoji: '🚨'
      },
      {
        topic: 'Trámites, Antecedentes & Línea 101',
        positive: 58.1,
        neutral: 34.2,
        negative: 7.7,
        count: 520,
        emoji: '📋'
      }
    ],
    keywords: [
      { word: 'gracias', count: 1420, sentiment: 'positive', weight: 1.0 },
      { word: 'precaución', count: 1180, sentiment: 'positive', weight: 0.95 },
      { word: 'ruta 3', count: 990, sentiment: 'neutral', weight: 0.9 },
      { word: 'felicitaciones', count: 870, sentiment: 'positive', weight: 0.85 },
      { word: 'paso garibaldi', count: 760, sentiment: 'neutral', weight: 0.8 },
      { word: 'cadetes', count: 690, sentiment: 'positive', weight: 0.75 },
      { word: 'orgullo fueguino', count: 580, sentiment: 'positive', weight: 0.7 },
      { word: 'nevada', count: 510, sentiment: 'neutral', weight: 0.65 },
      { word: 'héroes', count: 430, sentiment: 'positive', weight: 0.6 },
      { word: 'requisitos', count: 380, sentiment: 'neutral', weight: 0.55 },
      { word: 'horarios', count: 310, sentiment: 'neutral', weight: 0.5 },
      { word: 'demoras en fila', count: 95, sentiment: 'negative', weight: 0.35 },
      { word: 'no atienden 101', count: 72, sentiment: 'negative', weight: 0.3 }
    ],
    sampleComments: [
      {
        id: 'c-1',
        user: 'valeria.ushuaia',
        text: 'Excelente el aviso del estado del Paso Garibaldi a primera hora, nos salvó de salir sin cadenas! Gran servicio para todos los fueguinos 👏❄️',
        sentiment: 'positive',
        date: 'Hace 3 horas',
        postTitle: 'Parte de Transitabilidad Ruta 3',
        likes: 38
      },
      {
        id: 'c-2',
        user: 'marcos_rg_tdf',
        text: 'Orgullo de nuestros rescatistas del GEByR arriesgando su vida en plena noche fría en Laguna Esmeralda. Gracias infinitas por cuidarnos! 🏔️🛡️',
        sentiment: 'positive',
        date: 'Ayer',
        postTitle: 'Rescate nocturno en sendero',
        likes: 74
      },
      {
        id: 'c-3',
        user: 'sofia.tolhuin',
        text: 'Buenas tardes, ¿hasta qué fecha están abiertas las inscripciones para la Escuela Superior de Policía para el ciclo lectivo?',
        sentiment: 'neutral',
        date: 'Hace 2 días',
        postTitle: 'Convocatoria Cadetes 2026',
        likes: 9
      },
      {
        id: 'c-4',
        user: 'esteban_patagonia',
        text: 'Felicitaciones a los nuevos Oficiales egresados, mucha vocación y entrega por Tierra del Fuego 🇦🇷🙌',
        sentiment: 'positive',
        date: 'Hace 3 días',
        postTitle: 'Acto de Colación de Oficiales',
        likes: 45
      },
      {
        id: 'c-5',
        user: 'claudia_rio_grande',
        text: '¿Para el certificado de antecedentes se saca turno previo por la web o se va directo a la Comisaría Primera?',
        sentiment: 'neutral',
        date: 'Hace 4 días',
        postTitle: 'Servicios Ciudadanos Digitales',
        likes: 4
      },
      {
        id: 'c-6',
        user: 'vecino_ush_sur',
        text: 'Llamé al 101 anoche por ruidos y tardaron en contestar, entiendo que están con emergencias pero favor de reforzar la guardia en fin de semana.',
        sentiment: 'negative',
        date: 'Hace 5 días',
        postTitle: 'Operativos de Prevención Nocturna',
        likes: 7
      }
    ]
  },

  // 📈 4. GROWTH & PROJECTIONS
  growth: {
    currentFollowers: 19250,
    monthlyGrowthRate: 8.9,
    netMonthlyGain: 1570,
    avgWeeklyGained: 420,
    avgWeeklyLost: 35,
    timeline: [
      { month: 'Oct 2025', followers: 12400, netGain: 980, reach: 78000 },
      { month: 'Nov 2025', followers: 13450, netGain: 1050, reach: 84000 },
      { month: 'Dic 2025', followers: 14600, netGain: 1150, reach: 96000 },
      { month: 'Ene 2026', followers: 15800, netGain: 1200, reach: 110000 },
      { month: 'Feb 2026', followers: 16900, netGain: 1100, reach: 104000 },
      { month: 'Mar 2026', followers: 17850, netGain: 950, reach: 115000 },
      { month: 'Abr 2026', followers: 18400, netGain: 550, reach: 121000 },
      { month: 'May 2026', followers: 18900, netGain: 500, reach: 128000 },
      { month: 'Jun 2026', followers: 19600, netGain: 700, reach: 135000 },
      { month: 'Jul 2026', followers: 20450, netGain: 850, reach: 142000 },
      { month: 'Ago 2026', followers: 18450, netGain: 1120, reach: 138000 },
      { month: 'Sep 2026', followers: 19250, netGain: 1570, reach: 142000 }
    ],
    milestones: [
      { target: '20,000 Seguidores', targetFollowers: 20000, estimatedDays: 18, projectedDate: '18 de Octubre 2026' },
      { target: '25,000 Seguidores', targetFollowers: 25000, estimatedDays: 112, projectedDate: 'Enero 2027 (Operativo Verano)' },
      { target: '30,000 Seguidores', targetFollowers: 30000, estimatedDays: 215, projectedDate: 'Mayo 2027' }
    ]
  },

  // ⚡ 5. FORMATS & ENGAGEMENT
  formats: [
    {
      format: 'reels',
      label: 'Reels (Micro-video)',
      er: 11.8,
      avgLikes: 1640,
      avgComments: 112,
      avgShares: 590,
      avgSaves: 480,
      avgReach: 24500,
      multiplier: '3.2x más alcance',
      icon: '🎥',
      color: '#e1306c'
    },
    {
      format: 'carruseles',
      label: 'Carruseles (Multi-imagen)',
      er: 9.4,
      avgLikes: 1220,
      avgComments: 84,
      avgShares: 430,
      avgSaves: 620,
      avgReach: 12800,
      multiplier: '2.8x más guardados',
      icon: '🖼️',
      color: '#f56040'
    },
    {
      format: 'historias',
      label: 'Historias (24 horas)',
      er: 14.2,
      avgLikes: 340,
      avgComments: 58,
      avgShares: 120,
      avgSaves: 45,
      avgReach: 4800,
      multiplier: '88% retención',
      icon: '⏱️',
      color: '#ffd000'
    },
    {
      format: 'fotos',
      label: 'Fotos Simples',
      er: 5.2,
      avgLikes: 780,
      avgComments: 46,
      avgShares: 190,
      avgSaves: 140,
      avgReach: 7600,
      multiplier: 'Base 1.0x',
      icon: '📷',
      color: '#00c8ce'
    }
  ],

  // 🌟 TOP PERFORMING POSTS
  topPosts: [
    {
      id: 'ig-top-1',
      title: 'Rescate nocturno en Sendero Laguna Esmeralda — G.E.B.yR.',
      format: 'Reel',
      date: '24 Sep 2026',
      thumbnail: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=400&q=80',
      likes: 2840,
      comments: 192,
      shares: 780,
      saves: 520,
      viewsOrReach: 38400,
      er: 12.9,
      sentiment: { pos: 98, neu: 2, neg: 0 },
      tags: ['#GEByR', '#RescateFueguino', '#Ushuaia', '#PoliciaTDF'],
      url: 'https://www.instagram.com/policiaprovincialtdf/'
    },
    {
      id: 'ig-top-2',
      title: 'Alerta Vial Paso Garibaldi: Nieve y Escarcha — Uso obligatorio de cadenas en Ruta 3',
      format: 'Carrusel',
      date: '20 Sep 2026',
      thumbnail: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=400&q=80',
      likes: 1890,
      comments: 142,
      shares: 920,
      saves: 840,
      viewsOrReach: 21500,
      er: 11.4,
      sentiment: { pos: 92, neu: 7, neg: 1 },
      tags: ['#Ruta3', '#PasoGaribaldi', '#SeguridadVial', '#AlertaInvierno'],
      url: 'https://www.instagram.com/policiaprovincialtdf/'
    },
    {
      id: 'ig-top-3',
      title: 'Egresaron 120 nuevos Oficiales de la Escuela Superior de Policía',
      format: 'Reel',
      date: '15 Sep 2026',
      thumbnail: 'https://images.unsplash.com/photo-1579208575657-c595a05383b7?auto=format&fit=crop&w=400&q=80',
      likes: 2150,
      comments: 145,
      shares: 510,
      saves: 380,
      viewsOrReach: 26100,
      er: 10.8,
      sentiment: { pos: 96, neu: 4, neg: 0 },
      tags: ['#CadetesTDF', '#EscuelaSuperior', '#VocacionPolicial'],
      url: 'https://www.instagram.com/policiaprovincialtdf/'
    },
    {
      id: 'ig-top-4',
      title: 'Apertura de Convocatoria 2026: Carrera de Oficial de Policía',
      format: 'Foto',
      date: '08 Sep 2026',
      thumbnail: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=400&q=80',
      likes: 1420,
      comments: 210,
      shares: 640,
      saves: 780,
      viewsOrReach: 18200,
      er: 9.7,
      sentiment: { pos: 88, neu: 11, neg: 1 },
      tags: ['#Inscripciones2026', '#SeguridadPublica', '#FuturoFueguino'],
      url: 'https://www.instagram.com/policiaprovincialtdf/'
    }
  ],

  // 💡 6. STRATEGIC RECOMMENDATIONS OCI
  recommendations: [
    {
      title: 'Priorizar Reels verticales (9:16) en primera persona para Alertas de Rutas',
      desc: 'El algoritmo de Instagram otorga 3.2x más distribución a los microvideos de estado de calzada grabados en terreno que a las placas estáticas. Publicar entre las 07:00 y 07:30 hs.',
      impact: '+35% de alcance orgánico provincial',
      priority: 'Alta'
    },
    {
      title: 'Organizar Historias Destacadas por Servicios Ciudadanos',
      desc: 'Crear 4 carpetas fijas en el perfil: "🚨 Paso Garibaldi", "📋 Trámites 101", "🎓 Escuela Cadetes", "🏔️ G.E.B.yR.". Reducirá un 40% las consultas repetitivas en comentarios.',
      impact: 'Reducción de consultas directas y mejor retención',
      priority: 'Alta'
    },
    {
      title: 'Vincular el enlace de la Bio con Beacons.ai para trámites y comisarías',
      desc: 'El perfil actual tiene 19.2K seguidores pero el tráfico hacia certificados digitales puede triplicarse integrando el botón directo de WhatsApp de guardia y mapa de comisarías.',
      impact: '+55% de derivación efectiva a canales 101',
      priority: 'Alta'
    },
    {
      title: 'Carruseles infográficos sobre prevención de ciberdelito para público 45+',
      desc: 'El segmento mayor a 45 años tiene el ratio de guardado más alto en publicaciones sobre estafas bancarias y compras por redes sociales.',
      impact: '+28% de interacción en Río Grande y Ushuaia',
      priority: 'Media'
    }
  ]
};
