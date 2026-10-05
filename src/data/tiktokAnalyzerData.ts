export interface TikTokProfileAuditData {
  username: string;
  displayName: string;
  verified: boolean;
  avatarUrl: string;
  coverUrl: string;
  bio: string;
  category: string;
  url: string;
  followersCount: number;
  followersDisplay: string;
  followingCount: number;
  likesCount: number;
  likesDisplay: string;
  videosCount: number;
  engagementRate: number;
  qualityScore: number;
  avgViewsVal: string;
  avgViewsDelta: string;
  avgLikesVal: string;
  avgLikesDelta: string;
  avgCommentsVal: string;
  avgCommentsDelta: string;
  avgSharesVal: string;
  avgSharesDelta: string;

  audience: {
    realPeople: { pct: number; count: number; description: string };
    youthFueguina: { pct: number; count: number; description: string };
    regionalPatagonia: { pct: number; count: number; description: string };
    inactiveOrSpam: { pct: number; count: number; description: string };
  };

  demographics: {
    gender: { female: number; male: number };
    ageBrackets: { range: string; pct: number }[];
    cities: { city: string; province: string; pct: number; count: number }[];
    countries: { country: string; flag: string; pct: number }[];
  };

  sentiment: {
    overall: { positive: number; neutral: number; negative: number };
    sentimentScore: number;
    topics: { topic: string; positive: number; neutral: number; negative: number; count: number; emoji: string }[];
    keywords: { word: string; count: number; sentiment: 'positive' | 'neutral' | 'negative' }[];
    sampleComments: { id: string; user: string; text: string; sentiment: 'positive' | 'neutral' | 'negative'; date: string; videoTitle: string; likes: number }[];
  };

  growth: {
    currentFollowers: number;
    monthlyGrowthRate: number;
    netMonthlyGain: number;
    avgWeeklyGained: number;
    avgWeeklyLost: number;
    timeline: { month: string; followers: number; netGain: number; views: number }[];
    milestones: { target: string; targetFollowers: number; estimatedDays: number; projectedDate: string }[];
  };

  topVideos: {
    id: string;
    title: string;
    duration: string;
    views: number;
    viewsDisplay: string;
    likes: number;
    comments: number;
    shares: number;
    publishDate: string;
    thumbnail: string;
    badge: string;
    retentionRate: number;
  }[];

  aiAudit: {
    accountHealth: string;
    algorithmReachRatio: string;
    recommendations: {
      type: 'positive' | 'warning' | 'action';
      title: string;
      description: string;
      impact: string;
    }[];
  };
}

export const TIKTOK_PROFILE_AUDIT: TikTokProfileAuditData = {
  username: '@policiatdf',
  displayName: 'Policía de Tierra del Fuego',
  verified: true,
  avatarUrl: '',
  coverUrl: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=1200&q=80',
  bio: 'Cuenta Oficial de la Policía de la Provincia de Tierra del Fuego, Antártida e Islas del Atlántico Sur 🇦🇷 Rescate en Montaña (G.E.B.yR.), Alertas de Ruta 3 y Prevención. 📞 Emergencias 101.',
  category: 'Seguridad Ciudadana · Emergencias y Rescate',
  url: 'https://www.tiktok.com/@policiatdf',
  followersCount: 14200,
  followersDisplay: '14.2k',
  followingCount: 38,
  likesCount: 182400,
  likesDisplay: '182.4k',
  videosCount: 148,
  engagementRate: 9.1,
  qualityScore: 9.4,
  avgViewsVal: '28.400',
  avgViewsDelta: '+34,2% respecto al mes pasado',
  avgLikesVal: '1.240',
  avgLikesDelta: '+28,5% respecto al mes pasado',
  avgCommentsVal: '48,6',
  avgCommentsDelta: '+19,4% respecto al mes pasado',
  avgSharesVal: '142,0',
  avgSharesDelta: '+45,0% respecto al mes pasado',

  // 1. AUDIENCIA & CALIDAD
  audience: {
    realPeople: {
      pct: 88.4,
      count: 12553,
      description: 'Vecinos de Ushuaia, Río Grande y Tolhuin con consumo regular del formato video vertical.'
    },
    youthFueguina: {
      pct: 54.0,
      count: 7668,
      description: 'Jóvenes de 16 a 29 años, segmento clave para la concientización vial y vocación policial.'
    },
    regionalPatagonia: {
      pct: 7.8,
      count: 1108,
      description: 'Usuarios de Santa Cruz, Chubut y Chile que transitan las rutas australes en temporada.'
    },
    inactiveOrSpam: {
      pct: 3.8,
      count: 539,
      description: 'Perfiles bots o sin actividad. Nivel de autenticidad sobresaliente superior al 96%.'
    }
  },

  // 2. DEMOGRAFÍA
  demographics: {
    gender: { female: 52.0, male: 48.0 },
    ageBrackets: [
      { range: '13-17', pct: 9.2 },
      { range: '18-24', pct: 45.8 },
      { range: '25-34', pct: 28.5 },
      { range: '35-44', pct: 11.2 },
      { range: '45+',   pct: 5.3 }
    ],
    cities: [
      { city: 'Río Grande', province: 'Tierra del Fuego', pct: 52.4, count: 7441 },
      { city: 'Ushuaia', province: 'Tierra del Fuego', pct: 38.6, count: 5481 },
      { city: 'Tolhuin', province: 'Tierra del Fuego', pct: 6.2, count: 880 },
      { city: 'Río Gallegos', province: 'Santa Cruz', pct: 1.8, count: 256 },
      { city: 'Punta Arenas', province: 'Magallanes (CL)', pct: 1.0, count: 142 }
    ],
    countries: [
      { country: 'Argentina', flag: '🇦🇷', pct: 97.4 },
      { country: 'Chile', flag: '🇨🇱', pct: 1.9 },
      { country: 'Otros', flag: '🌐', pct: 0.7 }
    ]
  },

  // 3. SENTIMIENTO & COMUNIDAD
  sentiment: {
    overall: { positive: 88.5, neutral: 8.5, negative: 3.0 },
    sentimentScore: 94,
    topics: [
      { topic: 'Rescates de Montaña (G.E.B.yR.)', positive: 96, neutral: 3, negative: 1, count: 680, emoji: '🏔️' },
      { topic: 'División Canes K9 en Nieve', positive: 98, neutral: 2, negative: 0, count: 540, emoji: '🐕' },
      { topic: 'Alertas Paso Garibaldi / Ruta 3', positive: 89, neutral: 9, negative: 2, count: 490, emoji: '❄️' },
      { topic: 'Egresos e Incorporaciones', positive: 92, neutral: 6, negative: 2, count: 320, emoji: '🎓' },
      { topic: 'Ciberdelito y Prevención Estafas', positive: 82, neutral: 14, negative: 4, count: 210, emoji: '🛡️' }
    ],
    keywords: [
      { word: 'Orgullo Fueguino', count: 340, sentiment: 'positive' },
      { word: 'Excelente Trabajo', count: 295, sentiment: 'positive' },
      { word: 'Gracias por Cuidarnos', count: 230, sentiment: 'positive' },
      { word: 'Héroes del Rescate', count: 185, sentiment: 'positive' },
      { word: 'Mucho Cuidado con el Hielo', count: 145, sentiment: 'neutral' },
      { word: 'Más Controles Nocturnos', count: 68, sentiment: 'negative' }
    ],
    sampleComments: [
      {
        id: 'tt-c1',
        user: '@mateo_tdf_ush',
        text: 'Tremendo el laburo del GEByR bajando a la familia del Martial con semejante temporal. Admirable vocación!',
        sentiment: 'positive',
        date: 'Hace 2 días',
        videoTitle: 'Rescate en Glaciar Martial con ventisca',
        likes: 312
      },
      {
        id: 'tt-c2',
        user: '@caro.riogrande',
        text: 'Los perritos de la división canes son unos genios totales! Muestren más de su entrenamiento por favor.',
        sentiment: 'positive',
        date: 'Hace 4 días',
        videoTitle: 'Entrenamiento K9 en nieve profunda',
        likes: 198
      },
      {
        id: 'tt-c3',
        user: '@transportista_sur',
        text: 'Gracias por avisar a tiempo lo del Garibaldi con hielo negro, me salvé de quedar cruzado en la subida.',
        sentiment: 'positive',
        date: 'Hace 5 días',
        videoTitle: 'Estado extremo de Ruta 3 km 3014',
        likes: 144
      },
      {
        id: 'tt-c4',
        user: '@lucas_tolhuin',
        text: 'Hacen falta más puestos fijos en la salida de Tolhuin para controlar las luces bajas obligatorias.',
        sentiment: 'neutral',
        date: 'Hace 1 semana',
        videoTitle: 'Operativo Prevención Vial',
        likes: 54
      }
    ]
  },

  // 4. CRECIMIENTO
  growth: {
    currentFollowers: 14200,
    monthlyGrowthRate: 14.2,
    netMonthlyGain: 1780,
    avgWeeklyGained: 460,
    avgWeeklyLost: 15,
    timeline: [
      { month: 'Oct 2025', followers: 4200,  netGain: 480,  views: 82000 },
      { month: 'Nov 2025', followers: 4850,  netGain: 650,  views: 96000 },
      { month: 'Dic 2025', followers: 5700,  netGain: 850,  views: 125000 },
      { month: 'Ene 2026', followers: 6900,  netGain: 1200, views: 180000 },
      { month: 'Feb 2026', followers: 8200,  netGain: 1300, views: 210000 },
      { month: 'Mar 2026', followers: 9400,  netGain: 1200, views: 195000 },
      { month: 'Abr 2026', followers: 10500, netGain: 1100, views: 220000 },
      { month: 'May 2026', followers: 11600, netGain: 1100, views: 240000 },
      { month: 'Jun 2026', followers: 12500, netGain: 900,  views: 260000 },
      { month: 'Jul 2026', followers: 13100, netGain: 600,  views: 275000 },
      { month: 'Ago 2026', followers: 13600, netGain: 500,  views: 290000 },
      { month: 'Sep 2026', followers: 14200, netGain: 600,  views: 310000 }
    ],
    milestones: [
      { target: '16,000 Seguidores', targetFollowers: 16000, estimatedDays: 38, projectedDate: 'Noviembre 2026 (Campaña Verano Seguro)' },
      { target: '20,000 Seguidores', targetFollowers: 20000, estimatedDays: 115, projectedDate: 'Enero 2027 (Operativo Vacaciones)' },
      { target: '30,000 Seguidores', targetFollowers: 30000, estimatedDays: 290, projectedDate: 'Julio 2027 (Invierno Fueguino)' }
    ]
  },

  // 5. TOP VIDEOS VIRALES
  topVideos: [
    {
      id: 'tt-v1',
      title: '🏔️ Rescate Nocturno en Glaciar Martial: G.E.B.yR. evacua a senderistas extraviados con ráfagas de 90 km/h',
      duration: '0:48',
      views: 342000,
      viewsDisplay: '342k',
      likes: 42100,
      comments: 820,
      shares: 2450,
      publishDate: '12 Sep 2026',
      thumbnail: 'https://images.unsplash.com/photo-1544717302-de2939b7ef71?auto=format&fit=crop&w=600&q=80',
      badge: '🔥 VIRAL REGIONAL',
      retentionRate: 72.4
    },
    {
      id: 'tt-v2',
      title: '❄️ Paso Garibaldi en vivo: Cadenas obligatorias y patrullajes preventivos continuos Ruta 3',
      duration: '0:35',
      views: 215000,
      viewsDisplay: '215k',
      likes: 28400,
      comments: 512,
      shares: 1940,
      publishDate: '18 Ago 2026',
      thumbnail: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=600&q=80',
      badge: '⚠️ ALERTA VIAL',
      retentionRate: 81.2
    },
    {
      id: 'tt-v3',
      title: '🐕 Entrenamiento de Detección de la División Canes K9 en nieve profunda de Tolhuin',
      duration: '0:52',
      views: 164000,
      viewsDisplay: '164k',
      likes: 19800,
      comments: 380,
      shares: 1120,
      publishDate: '02 Jul 2026',
      thumbnail: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=600&q=80',
      badge: '🐾 K9 POLICÍA TDF',
      retentionRate: 69.8
    },
    {
      id: 'tt-v4',
      title: '🎓 Ceremonia de Juramento y Egreso de la XXXV Promoción de Oficiales Subayudantes',
      duration: '1:12',
      views: 98000,
      viewsDisplay: '98k',
      likes: 11200,
      comments: 240,
      shares: 450,
      publishDate: '15 Jun 2026',
      thumbnail: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=600&q=80',
      badge: '🏛️ INSTITUCIONAL',
      retentionRate: 58.5
    },
    {
      id: 'tt-v5',
      title: '📱 ¡No compartas tu token! Consejos OCI contra estafas virtuales por WhatsApp y Marketplace',
      duration: '0:42',
      views: 76000,
      viewsDisplay: '76k',
      likes: 8900,
      comments: 195,
      shares: 880,
      publishDate: '24 May 2026',
      thumbnail: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80',
      badge: '💡 PREVENCIÓN OCI',
      retentionRate: 64.1
    }
  ],

  // 6. AUDITORÍA IA
  aiAudit: {
    accountHealth: 'Óptima (94/100) — Viralidad Orgánica Excepcional',
    algorithmReachRatio: '84% de vistas provienen de la pestaña Para Ti (FYP)',
    recommendations: [
      {
        type: 'action',
        title: 'Explotar la ventana dorada de 17:00 a 19:00 hs',
        description: 'La tasa de reproducción completa en TDF alcanza su pico entre las 17 y las 19 hs, especialmente lunes y viernes.',
        impact: '+22% alcance potencial'
      },
      {
        type: 'positive',
        title: 'Retención récord en videos de rescate del G.E.B.yR.',
        description: 'Los clips con acción real y sonido ambiental de ventisca logran un 72.4% de retención promedio, duplicando la media de TikTok gubernamental.',
        impact: 'Algoritmo FYP prioritario'
      },
      {
        type: 'warning',
        title: 'Subtítulos grandes en los primeros 3 segundos',
        description: 'El 68% de los usuarios de TikTok reproduce videos sin sonido en horario laboral o escolar. Incorporar subtítulos institucionales de alto contraste.',
        impact: '+15% tiempo de visualización'
      }
    ]
  }
};
