export interface YoutubeProfileAuditData {
  channelName: string;
  handle: string;
  verified: boolean;
  avatarUrl: string;
  coverUrl: string;
  bio: string;
  category: string;
  url: string;
  subscribersCount: number;
  subscribersDisplay: string;
  videosCount: number;
  totalViewsCount: number;
  totalViewsDisplay: string;
  watchTimeHours: number;
  watchTimeDisplay: string;
  avgDuration: string;
  avgCtrPct: number;
  qualityScore: number;
  avgViewsVal: string;
  avgViewsDelta: string;
  avgLikesVal: string;
  avgLikesDelta: string;
  avgCommentsVal: string;
  avgCommentsDelta: string;
  retentionRateVal: string;

  audience: {
    activeFueguinos: { pct: number; count: number; description: string };
    familiesAndPolice: { pct: number; count: number; description: string };
    cadetApplicants: { pct: number; count: number; description: string };
    externalCasual: { pct: number; count: number; description: string };
  };

  demographics: {
    gender: { female: number; male: number };
    ageBrackets: { range: string; pct: number }[];
    cities: { city: string; province: string; pct: number; count: number }[];
    trafficSources: { source: string; pct: number; color: string }[];
    devices: { device: string; pct: number }[];
  };

  sentiment: {
    overall: { positive: number; neutral: number; negative: number };
    sentimentScore: number;
    topics: { topic: string; positive: number; neutral: number; negative: number; count: number; emoji: string }[];
    sampleComments: { id: string; user: string; text: string; sentiment: 'positive' | 'neutral' | 'negative'; date: string; videoTitle: string; likes: number }[];
  };

  growth: {
    currentSubscribers: number;
    monthlyGrowthRate: number;
    netMonthlyGain: number;
    avgMonthlyViews: number;
    avgMonthlyWatchTime: number;
    timeline: { month: string; subscribers: number; netGain: number; views: number; watchTime: number }[];
    milestones: { target: string; targetSubs: number; estimatedDays: number; projectedDate: string }[];
  };

  topVideos: {
    id: string;
    title: string;
    duration: string;
    views: number;
    viewsDisplay: string;
    likes: number;
    comments: number;
    watchTimeHours: number;
    publishDate: string;
    thumbnail: string;
    type: 'long' | 'short' | 'live';
    badge: string;
    ctrPct: number;
  }[];

  aiAudit: {
    seoScore: string;
    channelStatus: string;
    recommendations: {
      type: 'positive' | 'warning' | 'action';
      title: string;
      description: string;
      impact: string;
    }[];
  };
}

export const YOUTUBE_PROFILE_AUDIT: YoutubeProfileAuditData = {
  channelName: 'Policía de Tierra del Fuego Oficial',
  handle: '@PoliciaProvincialTDF',
  verified: true,
  avatarUrl: '',
  coverUrl: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80',
  bio: 'Canal Oficial de la Policía de la Provincia de Tierra del Fuego, Antártida e Islas del Atlántico Sur. Actos de egreso, operativos especiales de rescate en cordillera, spots de seguridad ciudadana e informes institucionales OCI. Ushuaia · Río Grande · Tolhuin.',
  category: 'Seguridad Pública y Capacitación Institucional',
  url: 'https://www.youtube.com/channel/UCq8ibtLJAJWWcyX3FBuIESw',
  subscribersCount: 1850,
  subscribersDisplay: '1.85k',
  videosCount: 124,
  totalViewsCount: 485000,
  totalViewsDisplay: '485k',
  watchTimeHours: 18200,
  watchTimeDisplay: '18.2k hs',
  avgDuration: '3m 42s',
  avgCtrPct: 7.4,
  qualityScore: 9.3,
  avgViewsVal: '3.910',
  avgViewsDelta: '+18,6% respecto al mes pasado',
  avgLikesVal: '142',
  avgLikesDelta: '+14,2% respecto al mes pasado',
  avgCommentsVal: '18,5',
  avgCommentsDelta: '+11,0% respecto al mes pasado',
  retentionRateVal: '58,4%',

  // 1. AUDIENCIA
  audience: {
    activeFueguinos: {
      pct: 74.2,
      count: 1373,
      description: 'Vecinos de TDF que siguen las transmisiones de actos, desfiles y partes institucionales.'
    },
    familiesAndPolice: {
      pct: 16.8,
      count: 311,
      description: 'Familias de efectivos policiales, retirados y personal de fuerzas hermanas de seguridad.'
    },
    cadetApplicants: {
      pct: 7.2,
      count: 133,
      description: 'Jóvenes interesados en ingresar a la Escuela Superior de Policía y Cursos de Cadetes.'
    },
    externalCasual: {
      pct: 1.8,
      count: 33,
      description: 'Investigadores, medios nacionales y público general de otras provincias argentinas.'
    }
  },

  // 2. DEMOGRAFÍA & FUENTES DE TRÁFICO
  demographics: {
    gender: { female: 46.0, male: 54.0 },
    ageBrackets: [
      { range: '18-24', pct: 28.4 },
      { range: '25-34', pct: 38.2 },
      { range: '35-44', pct: 19.1 },
      { range: '45-54', pct: 9.8 },
      { range: '55+',   pct: 4.5 }
    ],
    cities: [
      { city: 'Río Grande', province: 'Tierra del Fuego', pct: 47.2, count: 873 },
      { city: 'Ushuaia', province: 'Tierra del Fuego', pct: 43.5, count: 805 },
      { city: 'Tolhuin', province: 'Tierra del Fuego', pct: 6.1, count: 113 },
      { city: 'CABA / La Plata', province: 'Buenos Aires', pct: 2.1, count: 39 },
      { city: 'Río Gallegos', province: 'Santa Cruz', pct: 1.1, count: 20 }
    ],
    trafficSources: [
      { source: 'Búsqueda en YouTube', pct: 38.5, color: '#ff0000' },
      { source: 'Videos Sugeridos', pct: 29.2, color: '#3b82f6' },
      { source: 'Enlaces Externos (Portal Web/Facebook)', pct: 21.4, color: '#10b981' },
      { source: 'Feed de Shorts', pct: 10.9, color: '#f59e0b' }
    ],
    devices: [
      { device: 'Dispositivos Móviles', pct: 68.4 },
      { device: 'Smart TV / Pantallas Grandes', pct: 18.2 },
      { device: 'Computadoras de Escritorio', pct: 12.1 },
      { device: 'Tablets', pct: 1.3 }
    ]
  },

  // 3. SENTIMIENTO & COMUNIDAD
  sentiment: {
    overall: { positive: 91.5, neutral: 7.0, negative: 1.5 },
    sentimentScore: 95,
    topics: [
      { topic: 'Egresos de Oficiales y Cadetes', positive: 98, neutral: 2, negative: 0, count: 410, emoji: '🎓' },
      { topic: 'Documentales de Rescate G.E.B.yR.', positive: 97, neutral: 3, negative: 0, count: 380, emoji: '🏔️' },
      { topic: 'Consejos de Conducción Invernal', positive: 94, neutral: 6, negative: 0, count: 290, emoji: '🚗' },
      { topic: 'Convocatorias de Ingreso', positive: 88, neutral: 10, negative: 2, count: 180, emoji: '📋' },
      { topic: 'Desfiles y Aniversario Institucional', positive: 96, neutral: 4, negative: 0, count: 160, emoji: '🇦🇷' }
    ],
    sampleComments: [
      {
        id: 'yt-c1',
        user: 'Familia Morales Ushuaia',
        text: 'Emocionante transmisión en vivo del egreso! Pudimos ver jurar a nuestro hijo en HD desde la casa.',
        sentiment: 'positive',
        date: 'Hace 3 semanas',
        videoTitle: 'Acto de Egreso XXXV Promoción de Oficiales',
        likes: 84
      },
      {
        id: 'yt-c2',
        user: 'Patagonia Outdoor TV',
        text: 'Excelente material documental del grupo especial de rescate. El entrenamiento con cuerdas en invierno es de nivel internacional.',
        sentiment: 'positive',
        date: 'Hace 1 mes',
        videoTitle: 'Guardianes de la Cordillera Fueguina - G.E.B.yR.',
        likes: 62
      },
      {
        id: 'yt-c3',
        user: 'Roberto V.',
        text: 'Muy claras las recomendaciones sobre el uso de cubiertas con clavos vs sílice para transitar por el Garibaldi.',
        sentiment: 'positive',
        date: 'Hace 2 meses',
        videoTitle: 'Spot Vial: Conducción Segura en Nieve',
        likes: 45
      }
    ]
  },

  // 4. CRECIMIENTO
  growth: {
    currentSubscribers: 1850,
    monthlyGrowthRate: 15.3,
    netMonthlyGain: 145,
    avgMonthlyViews: 19500,
    avgMonthlyWatchTime: 820,
    timeline: [
      { month: 'Oct 2025', subscribers: 850,  netGain: 65,  views: 8400,  watchTime: 340 },
      { month: 'Nov 2025', subscribers: 930,  netGain: 80,  views: 9800,  watchTime: 410 },
      { month: 'Dic 2025', subscribers: 1040, netGain: 110, views: 13500, watchTime: 580 },
      { month: 'Ene 2026', subscribers: 1150, netGain: 110, views: 14200, watchTime: 610 },
      { month: 'Feb 2026', subscribers: 1260, netGain: 110, views: 14900, watchTime: 630 },
      { month: 'Mar 2026', subscribers: 1380, netGain: 120, views: 16200, watchTime: 690 },
      { month: 'Abr 2026', subscribers: 1490, netGain: 110, views: 16800, watchTime: 720 },
      { month: 'May 2026', subscribers: 1590, netGain: 100, views: 17400, watchTime: 740 },
      { month: 'Jun 2026', subscribers: 1670, netGain: 80,  views: 18100, watchTime: 770 },
      { month: 'Jul 2026', subscribers: 1720, netGain: 50,  views: 18500, watchTime: 790 },
      { month: 'Ago 2026', subscribers: 1780, netGain: 60,  views: 18900, watchTime: 800 },
      { month: 'Sep 2026', subscribers: 1850, netGain: 70,  views: 19500, watchTime: 820 }
    ],
    milestones: [
      { target: '2,500 Suscriptores', targetSubs: 2500, estimatedDays: 85, projectedDate: 'Diciembre 2026 (Acto Aniversario TDF)' },
      { target: '5,000 Suscriptores', targetSubs: 5000, estimatedDays: 220, projectedDate: 'Mayo 2027 (Campaña Admisión Cadetes)' },
      { target: '10,000 Suscriptores', targetSubs: 10000, estimatedDays: 450, projectedDate: 'Enero 2028 (Placa Creador YouTube)' }
    ]
  },

  // 5. TOP VIDEOS
  topVideos: [
    {
      id: 'yt-v1',
      title: '🏛️ Ceremonia Central del 141° Aniversario de la Policía de Tierra del Fuego en Ushuaia',
      duration: '42:15',
      views: 68400,
      viewsDisplay: '68.4k',
      likes: 1840,
      comments: 92,
      watchTimeHours: 2420,
      publishDate: '28 Ago 2026',
      thumbnail: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=600&q=80',
      type: 'live',
      badge: '🔴 TRANSMISIÓN OFICIAL',
      ctrPct: 8.6
    },
    {
      id: 'yt-v2',
      title: '🏔️ Guardianes de la Cordillera Fueguina — Documental Exclusivo del G.E.B.yR.',
      duration: '14:20',
      views: 54200,
      viewsDisplay: '54.2k',
      likes: 2210,
      comments: 114,
      watchTimeHours: 3100,
      publishDate: '15 Jul 2026',
      thumbnail: 'https://images.unsplash.com/photo-1544717302-de2939b7ef71?auto=format&fit=crop&w=600&q=80',
      type: 'long',
      badge: '⭐ DOCUMENTAL OCI',
      ctrPct: 9.4
    },
    {
      id: 'yt-v3',
      title: '❄️ Conducción Segura en Invierno: Uso Obligatorio de Cubiertas con Clavos y Sílice en Ruta 3',
      duration: '3:10',
      views: 42000,
      viewsDisplay: '42.0k',
      likes: 1420,
      comments: 65,
      watchTimeHours: 1250,
      publishDate: '01 Jun 2026',
      thumbnail: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=600&q=80',
      type: 'long',
      badge: '⚠️ SEGURIDAD VIAL',
      ctrPct: 7.9
    },
    {
      id: 'yt-v4',
      title: '📋 Convocatoria e Ingreso a la Escuela Superior de Policía — Requisitos y Fechas 2026/2027',
      duration: '8:45',
      views: 38600,
      viewsDisplay: '38.6k',
      likes: 1150,
      comments: 78,
      watchTimeHours: 1820,
      publishDate: '10 May 2026',
      thumbnail: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80',
      type: 'long',
      badge: '🎓 ADMISIÓN',
      ctrPct: 8.2
    },
    {
      id: 'yt-v5',
      title: '⚡ Shorts: Rescate en alta montaña bajo temporal de nieve extrema',
      duration: '0:58',
      views: 88000,
      viewsDisplay: '88.0k',
      likes: 7400,
      comments: 135,
      watchTimeHours: 920,
      publishDate: '24 Sep 2026',
      thumbnail: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=600&q=80',
      type: 'short',
      badge: '🔥 VIRAL SHORTS',
      ctrPct: 11.2
    }
  ],

  // 6. AUDITORÍA IA
  aiAudit: {
    seoScore: '92/100 (Excelente Optimización de Metadatos y Transcripciones)',
    channelStatus: 'Canal en Expansión Activa — Fuerte Consumo en Pantallas de Hogar',
    recommendations: [
      {
        type: 'action',
        title: 'Incorporar marcas de tiempo (timestamps) en transmisiones largas',
        description: 'En actos de más de 30 minutos, dividir por juramento, discursos y desfile aumenta un 35% la retención promedio de la transmisión grabada.',
        impact: '+35% retención en actos'
      },
      {
        type: 'positive',
        title: 'Alto consumo en Smart TVs (18.2%)',
        description: 'La comunidad fueguina sintoniza los actos y documentales en familia a través del televisor, lo que indica un fuerte lazo comunitario y credibilidad.',
        impact: 'Audiencia de alto valor'
      },
      {
        type: 'action',
        title: 'Producir 2 YouTube Shorts semanales',
        description: 'El feed de Shorts es la principal palanca de captación de suscriptores menores de 25 años para el canal institucional.',
        impact: '+45 suscriptores/semana'
      }
    ]
  }
};
