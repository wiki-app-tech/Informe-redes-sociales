import type { BestTimesPlatform } from '../types/dashboard';

// Helper: given a raw hourly pattern (0-23), return a DaySchedule
// peak hours are provided per day; base traffic varies by time of day
function buildDay(day: string, peakHours: number[], basePattern: number[]): import('../types/dashboard').DaySchedule {
  const cells = basePattern.map((val, hour) => ({
    hour,
    value: peakHours.includes(hour) ? Math.min(val + 30, 100) : val,
  }));
  return { day, cells, peakHours };
}

// Base traffic templates (0-23 hours)
const NIGHT_MORNING_SLUMP = [
  5, 4, 3, 3, 4, 6, 12, 22, 38, 55, 68, 72,
  70, 65, 62, 60, 63, 68, 72, 78, 82, 88, 85, 75
];

const AFTERNOON_EVENING_PEAK = [
  8, 6, 5, 5, 6, 10, 18, 28, 40, 48, 52, 55,
  58, 62, 66, 70, 76, 82, 88, 92, 88, 80, 72, 58
];

const INSTAGRAM_PATTERN = [
  6, 4, 3, 3, 5, 8, 14, 28, 45, 60, 72, 70,
  65, 60, 58, 55, 60, 65, 70, 72, 70, 66, 58, 45
];

const TIKTOK_PATTERN = [
  10, 8, 6, 5, 6, 8, 12, 20, 32, 42, 48, 50,
  52, 55, 60, 65, 72, 82, 90, 88, 82, 75, 68, 55
];

const YOUTUBE_LONG_PATTERN = [
  5, 4, 3, 3, 4, 6, 10, 18, 28, 38, 48, 55,
  60, 65, 70, 72, 68, 62, 58, 52, 48, 42, 35, 22
];

const LINKEDIN_PATTERN = [
  4, 3, 2, 2, 3, 8, 20, 42, 60, 72, 78, 75,
  65, 55, 48, 40, 32, 22, 16, 12, 8, 6, 5, 4
];

// ── INSTAGRAM DATA ─────────────────────────────────────────────────────────────
const INSTAGRAM: BestTimesPlatform = {
  id: 'instagram',
  name: 'Instagram',
  handle: '@policiaprovincialtdf',
  bestHour: '10:00',
  bestDays: ['Viernes', 'Miércoles'],
  colorScheme: 'pink',
  accentColor: '#e1306c',
  gradientFrom: 'rgba(225,48,108,0.08)',
  gradientTo: 'rgba(245,96,64,0.08)',
  topSlots: [
    { day: 'Lunes',    hours: ['10:00', '11:00', '12:00'] },
    { day: 'Martes',   hours: ['10:00', '18:00', '12:00'] },
    { day: 'Miércoles',hours: ['10:00', '11:00', '12:00'] },
    { day: 'Jueves',   hours: ['10:00', '12:00', '11:00'] },
    { day: 'Viernes',  hours: ['10:00', '11:00', '12:00'] },
    { day: 'Sábado',   hours: ['10:00', '12:00', '11:00'] },
    { day: 'Domingo',  hours: ['10:00', '12:00', '18:00'] },
  ],
  schedule: [
    buildDay('Lun', [10, 11, 12], INSTAGRAM_PATTERN),
    buildDay('Mar', [10, 18, 12], INSTAGRAM_PATTERN),
    buildDay('Mié', [10, 11, 12], INSTAGRAM_PATTERN.map((v, h) => h >= 9 && h <= 12 ? v + 8 : v)),
    buildDay('Jue', [10, 12, 11], INSTAGRAM_PATTERN),
    buildDay('Vie', [10, 11, 12], INSTAGRAM_PATTERN.map((v, h) => h >= 9 && h <= 12 ? v + 12 : v)),
    buildDay('Sáb', [10, 12, 11], INSTAGRAM_PATTERN.map((v) => Math.max(v - 8, 5))),
    buildDay('Dom', [10, 12, 18], INSTAGRAM_PATTERN.map((v) => Math.max(v - 12, 4))),
  ],
  insight: 'Las publicaciones a las 10:00 del viernes generan hasta un 40% más de alcance. La hora 10:00 es consistente toda la semana. Evitar publicar antes de las 07:00 y en domingos a la mañana.',
  source: 'Estudio Metricool 2026 — Análisis de 2M+ publicaciones en Instagram Argentina'
};

// ── FACEBOOK DATA ──────────────────────────────────────────────────────────────
const FACEBOOK: BestTimesPlatform = {
  id: 'facebook',
  name: 'Facebook',
  handle: '@policiaprovincialtdf',
  bestHour: '00:00–05:00 y 22:00+',
  bestDays: ['Lunes', 'Martes'],
  colorScheme: 'blue',
  accentColor: '#1877f2',
  gradientFrom: 'rgba(24,119,242,0.08)',
  gradientTo: 'rgba(24,119,242,0.03)',
  topSlots: [
    { day: 'Lunes',    hours: ['00:00–05:00', '22:00'] },
    { day: 'Martes',   hours: ['00:00–05:00', '22:00–23:00'] },
    { day: 'Miércoles',hours: ['01:00', '22:00'] },
    { day: 'Jueves',   hours: ['00:00', '22:00'] },
    { day: 'Viernes',  hours: ['00:00', '22:00'] },
    { day: 'Sábado',   hours: ['01:00', '22:00'] },
    { day: 'Domingo',  hours: ['21:00', '22:00'] },
  ],
  schedule: [
    buildDay('Lun', [0, 1, 2, 22, 23], NIGHT_MORNING_SLUMP.map((v, h) => h <= 4 || h >= 21 ? Math.min(v + 50, 100) : v)),
    buildDay('Mar', [0, 1, 22, 23],    NIGHT_MORNING_SLUMP.map((v, h) => h <= 4 || h >= 21 ? Math.min(v + 55, 100) : v)),
    buildDay('Mié', [1, 22],           NIGHT_MORNING_SLUMP.map((v, h) => h <= 3 || h >= 21 ? Math.min(v + 45, 100) : v)),
    buildDay('Jue', [0, 22],           NIGHT_MORNING_SLUMP.map((v, h) => h <= 3 || h >= 21 ? Math.min(v + 42, 100) : v)),
    buildDay('Vie', [0, 22],           NIGHT_MORNING_SLUMP.map((v, h) => h <= 3 || h >= 21 ? Math.min(v + 40, 100) : v)),
    buildDay('Sáb', [1, 22],           NIGHT_MORNING_SLUMP.map((v, h) => h <= 3 || h >= 21 ? Math.min(v + 38, 100) : v)),
    buildDay('Dom', [21, 22],          NIGHT_MORNING_SLUMP.map((v, h) => h >= 20 ? Math.min(v + 55, 100) : Math.max(v - 10, 4))),
  ],
  insight: 'Facebook tiene un patrón opuesto al resto: la madrugada (00:00-05:00) y la noche tardía (22:00+) concentran más visualizaciones. Publicar alertas viales a las 00:00 del lunes maximiza el alcance antes de la jornada laboral.',
  source: 'Visualizaciones en Facebook en función de la hora de publicación — Metricool 2026'
};

// ── TWITTER / X DATA ──────────────────────────────────────────────────────────
const TWITTER: BestTimesPlatform = {
  id: 'twitter',
  name: 'Twitter / X',
  handle: '@policiatdf',
  bestHour: '21:00',
  bestDays: ['Martes', 'Miércoles'],
  colorScheme: 'gray',
  accentColor: '#94a3b8',
  gradientFrom: 'rgba(148,163,184,0.10)',
  gradientTo: 'rgba(100,116,139,0.05)',
  topSlots: [
    { day: 'Lunes',    hours: ['21:00', '20:00', '19:00'] },
    { day: 'Martes',   hours: ['21:00', '20:00', '18:00'] },
    { day: 'Miércoles',hours: ['21:00', '20:00', '19:00'] },
    { day: 'Jueves',   hours: ['21:00', '18:00', '15:00'] },
    { day: 'Viernes',  hours: ['21:00', '18:00', '19:00'] },
    { day: 'Sábado',   hours: ['21:00', '17:00', '15:00'] },
    { day: 'Domingo',  hours: ['17:00', '15:00', '21:00'] },
  ],
  schedule: [
    buildDay('Lun', [21, 20, 19], AFTERNOON_EVENING_PEAK.map((v, h) => h >= 18 ? Math.min(v + 15, 100) : Math.max(v - 15, 4))),
    buildDay('Mar', [21, 20, 18], AFTERNOON_EVENING_PEAK.map((v, h) => h >= 18 ? Math.min(v + 20, 100) : Math.max(v - 15, 4))),
    buildDay('Mié', [21, 20, 19], AFTERNOON_EVENING_PEAK.map((v, h) => h >= 18 ? Math.min(v + 18, 100) : Math.max(v - 12, 4))),
    buildDay('Jue', [21, 18, 15], AFTERNOON_EVENING_PEAK.map((v, h) => h >= 17 ? Math.min(v + 12, 100) : Math.max(v - 10, 4))),
    buildDay('Vie', [21, 18, 19], AFTERNOON_EVENING_PEAK.map((v, h) => h >= 17 ? Math.min(v + 10, 100) : Math.max(v - 8, 4))),
    buildDay('Sáb', [21, 17, 15], AFTERNOON_EVENING_PEAK.map((v, h) => h >= 14 ? Math.min(v + 8, 100) : Math.max(v - 15, 3))),
    buildDay('Dom', [17, 15, 21], AFTERNOON_EVENING_PEAK.map((v, h) => h >= 13 && h <= 22 ? Math.min(v + 5, 100) : Math.max(v - 20, 3))),
  ],
  insight: 'Los usuarios de X están más activos durante la tarde-noche. Publicar avisos de seguridad ciudadana a las 21:00 los martes o miércoles maximiza visibilidad. Evitar publicar entre 00:00-08:00, la audiencia es mínima.',
  source: 'Estudio Twitter/X Metricool 2026 — Análisis de 2M+ publicaciones'
};

// ── TIKTOK DATA ────────────────────────────────────────────────────────────────
const TIKTOK: BestTimesPlatform = {
  id: 'tiktok',
  name: 'TikTok',
  handle: '@policiatdf (recomendado)',
  bestHour: '18:00',
  bestDays: ['Lunes', 'Martes'],
  colorScheme: 'purple',
  accentColor: '#8b5cf6',
  gradientFrom: 'rgba(139,92,246,0.10)',
  gradientTo: 'rgba(99,102,241,0.05)',
  topSlots: [
    { day: 'Lunes',    hours: ['18:00', '19:00', '17:00'] },
    { day: 'Martes',   hours: ['18:00', '19:00', '17:00'] },
    { day: 'Miércoles',hours: ['18:00', '19:00', '17:00'] },
    { day: 'Jueves',   hours: ['18:00', '19:00', '17:00'] },
    { day: 'Viernes',  hours: ['18:00', '19:00', '17:00'] },
    { day: 'Sábado',   hours: ['18:00', '19:00', '17:00'] },
    { day: 'Domingo',  hours: ['18:00', '19:00', '17:00'] },
  ],
  schedule: [
    buildDay('Lun', [18, 19, 17], TIKTOK_PATTERN.map((v, h) => h >= 15 && h <= 21 ? Math.min(v + 20, 100) : v)),
    buildDay('Mar', [18, 19, 17], TIKTOK_PATTERN.map((v, h) => h >= 15 && h <= 21 ? Math.min(v + 18, 100) : v)),
    buildDay('Mié', [18, 19, 17], TIKTOK_PATTERN.map((v, h) => h >= 15 && h <= 21 ? Math.min(v + 15, 100) : v)),
    buildDay('Jue', [18, 19, 17], TIKTOK_PATTERN.map((v, h) => h >= 15 && h <= 21 ? Math.min(v + 12, 100) : v)),
    buildDay('Vie', [18, 19, 17], TIKTOK_PATTERN.map((v, h) => h >= 15 && h <= 21 ? Math.min(v + 14, 100) : v)),
    buildDay('Sáb', [18, 19, 17], TIKTOK_PATTERN.map((v, h) => h >= 15 && h <= 21 ? Math.min(v + 10, 100) : v)),
    buildDay('Dom', [18, 19, 17], TIKTOK_PATTERN.map((v, h) => h >= 15 && h <= 21 ? Math.min(v + 8, 100) : v)),
  ],
  insight: 'TikTok tiene el patrón más consistente de todas las plataformas: la franja 17:00-19:00 es pico todos los días. El lunes es el mejor día para videos de rescate y prevención. Ideal para el G.E.B.yR.',
  source: 'TikTok Analytics & Estudio de Microvídeos Metricool 2026'
};

// ── YOUTUBE DATA ───────────────────────────────────────────────────────────────
const YOUTUBE: BestTimesPlatform = {
  id: 'youtube',
  name: 'YouTube',
  handle: 'PoliciaProvincialTDF',
  bestHour: '21:00 (Lunes) | 10:00–16:00 (Videos largos)',
  bestDays: ['Lunes', 'Martes', 'Jueves'],
  colorScheme: 'red',
  accentColor: '#ef4444',
  gradientFrom: 'rgba(239,68,68,0.10)',
  gradientTo: 'rgba(239,68,68,0.04)',
  topSlots: [
    { day: 'Lunes',    hours: ['21:00', '10:00–16:00', '14:00'] },
    { day: 'Martes',   hours: ['09:00', '10:00', '13:00'] },
    { day: 'Miércoles',hours: ['10:00', '11:00', '13:00'] },
    { day: 'Jueves',   hours: ['10:00', '13:00', '14:00'] },
    { day: 'Viernes',  hours: ['10:00', '11:00', '12:00'] },
    { day: 'Sábado',   hours: ['09:00', '10:00', '13:00'] },
    { day: 'Domingo',  hours: ['09:00', '10:00', '11:00'] },
  ],
  schedule: [
    buildDay('Lun', [21, 10, 11, 12, 13, 14], YOUTUBE_LONG_PATTERN.map((v, h) => h === 21 ? 95 : v)),
    buildDay('Mar', [9, 10, 13],               YOUTUBE_LONG_PATTERN.map((v, h) => h >= 8 && h <= 16 ? Math.min(v + 15, 100) : v)),
    buildDay('Mié', [10, 11, 13],              YOUTUBE_LONG_PATTERN.map((v, h) => h >= 9 && h <= 15 ? Math.min(v + 12, 100) : v)),
    buildDay('Jue', [10, 13, 14],              YOUTUBE_LONG_PATTERN.map((v, h) => h >= 9 && h <= 16 ? Math.min(v + 14, 100) : v)),
    buildDay('Vie', [10, 11, 12],              YOUTUBE_LONG_PATTERN),
    buildDay('Sáb', [9, 10, 13],               YOUTUBE_LONG_PATTERN.map((v, h) => h >= 8 && h <= 14 ? Math.min(v + 8, 100) : Math.max(v - 5, 4))),
    buildDay('Dom', [9, 10, 11],               YOUTUBE_LONG_PATTERN.map((v) => Math.max(v - 8, 4))),
  ],
  insight: 'Los videos largos rinden mejor entre las 10:00 y las 16:00. El lunes a las 21:00 es el pico máximo. Los YouTube Shorts (14:00-18:00) tienen su propio patrón. Evitar publicar el domingo por la tarde.',
  source: 'Estudio YouTube Metricool 2026 — Análisis de 799.000+ videos'
};

// ── LINKEDIN DATA ──────────────────────────────────────────────────────────────
const LINKEDIN: BestTimesPlatform = {
  id: 'linkedin',
  name: 'LinkedIn',
  handle: 'Policía TDF Institucional',
  bestHour: '09:00–12:00',
  bestDays: ['Miércoles', 'Jueves'],
  colorScheme: 'teal',
  accentColor: '#0ea5e9',
  gradientFrom: 'rgba(14,165,233,0.10)',
  gradientTo: 'rgba(14,165,233,0.04)',
  topSlots: [
    { day: 'Lunes',    hours: ['09:00', '10:00', '11:00'] },
    { day: 'Martes',   hours: ['09:00', '10:00', '12:00'] },
    { day: 'Miércoles',hours: ['09:00', '10:00', '11:00'] },
    { day: 'Jueves',   hours: ['09:00', '10:00', '12:00'] },
    { day: 'Viernes',  hours: ['09:00', '10:00', '11:00'] },
    { day: 'Sábado',   hours: ['09:00', '10:00'] },
    { day: 'Domingo',  hours: ['10:00'] },
  ],
  schedule: [
    buildDay('Lun', [9, 10, 11],  LINKEDIN_PATTERN.map((v, h) => h >= 8 && h <= 13 ? Math.min(v + 12, 100) : v)),
    buildDay('Mar', [9, 10, 12],  LINKEDIN_PATTERN.map((v, h) => h >= 8 && h <= 13 ? Math.min(v + 14, 100) : v)),
    buildDay('Mié', [9, 10, 11],  LINKEDIN_PATTERN.map((v, h) => h >= 8 && h <= 13 ? Math.min(v + 18, 100) : v)),
    buildDay('Jue', [9, 10, 12],  LINKEDIN_PATTERN.map((v, h) => h >= 8 && h <= 13 ? Math.min(v + 16, 100) : v)),
    buildDay('Vie', [9, 10, 11],  LINKEDIN_PATTERN.map((v, h) => h >= 8 && h <= 13 ? Math.min(v + 10, 100) : v)),
    buildDay('Sáb', [9, 10],      LINKEDIN_PATTERN.map((v) => Math.max(v - 25, 3))),
    buildDay('Dom', [10],         LINKEDIN_PATTERN.map((v) => Math.max(v - 35, 2))),
  ],
  insight: 'LinkedIn sigue el horario laboral: la franja 09:00-12:00 concentra el mayor movimiento. Miércoles y jueves son ideales para contenido institucional de convocatorias, cadetes y concursos. El fin de semana tiene actividad mínima.',
  source: 'Estudio LinkedIn Metricool 2026 — Análisis de publicaciones profesionales'
};

export const BEST_TIMES_PLATFORMS: BestTimesPlatform[] = [
  INSTAGRAM,
  FACEBOOK,
  TWITTER,
  TIKTOK,
  YOUTUBE,
  LINKEDIN,
];
