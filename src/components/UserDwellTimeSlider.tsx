import React, { useState, useRef } from 'react';

export interface DwellTimeFormatItem {
  id: string;
  format: 'reels' | 'stories' | 'video' | 'carousel' | 'article';
  title: string;
  icon: string;
  badge: string;
  color: string;
  avgTimeSpent: string;
  avgTimeSeconds: number;
  retentionRatePct: number;
  completionRatePct: number;
  reWatchRatePct: number;
  monthlyReach: string;
  trendDelta: string;
  isPositive: boolean;
  peakHours: string;
  bestContentType: string;
  sparklineCurve: number[]; // percentage retention curve e.g. [100, 92, 85, 78, 72, 68]
  insight: string;
}

export interface UserDwellTimeSliderProps {
  platformName: string;
  platformColor?: string;
  items?: DwellTimeFormatItem[];
}

const DEFAULT_INSTAGRAM_ITEMS: DwellTimeFormatItem[] = [
  {
    id: 'ig-reels',
    format: 'reels',
    title: 'Reels Institucionales',
    icon: '🎬',
    badge: 'MÁXIMA ATENCIÓN',
    color: '#00e575',
    avgTimeSpent: '46 segundos',
    avgTimeSeconds: 46,
    retentionRatePct: 76.4,
    completionRatePct: 62.8,
    reWatchRatePct: 31.2,
    monthlyReach: '142.000 reproducciones',
    trendDelta: '+18,4% vs mes anterior',
    isPositive: true,
    peakHours: '18:00 a 21:00 hs (Pico nocturno)',
    bestContentType: 'Operativos de Rescate en Montaña (G.E.B.yR.) y patrullajes en nieve',
    sparklineCurve: [100, 94, 88, 81, 76, 72, 63],
    insight: 'Los reels con audio institucional y tomas de cordillera logran que 6 de cada 10 vecinos fueguinos vean el video hasta el final.'
  },
  {
    id: 'ig-stories',
    format: 'stories',
    title: 'Historias (Stories)',
    icon: '⏱️',
    badge: 'CONSUMO RÁPIDO VIAL',
    color: '#ffd000',
    avgTimeSpent: '9,4 seg / historia',
    avgTimeSeconds: 9.4,
    retentionRatePct: 84.1,
    completionRatePct: 71.5,
    reWatchRatePct: 34.0,
    monthlyReach: '286.000 impresiones',
    trendDelta: '+12,0% vs mes anterior',
    isPositive: true,
    peakHours: '07:00 a 09:00 hs y 19:00 hs',
    bestContentType: 'Partes meteorológicos matutinos y estado del Paso Garibaldi',
    sparklineCurve: [100, 96, 91, 87, 84, 80, 72],
    insight: 'El 34% de los usuarios presiona hacia atrás (tap-back) para releer la información sobre cadenas obligatorias en Ruta 3.'
  },
  {
    id: 'ig-carousel',
    format: 'carousel',
    title: 'Carruseles de Fotos & Infografías',
    icon: '🖼️',
    badge: 'ALTO VALOR INFORMATIVO',
    color: '#60a5fa',
    avgTimeSpent: '1m 18s por usuario',
    avgTimeSeconds: 78,
    retentionRatePct: 79.5,
    completionRatePct: 68.0,
    reWatchRatePct: 22.5,
    monthlyReach: '64.000 usuarios',
    trendDelta: '+8,6% vs mes anterior',
    isPositive: true,
    peakHours: '12:00 a 14:00 hs y 20:00 hs',
    bestContentType: 'Guía de cubiertas con clavos, egresos de cadetes y prevención de estafas',
    sparklineCurve: [100, 92, 86, 81, 79, 74, 68],
    insight: 'Los vecinos deslizan un promedio de 4,8 diapositivas de cada carrusel de 6 imágenes, dedicando más de un minuto a la lectura.'
  },
  {
    id: 'ig-video',
    format: 'video',
    title: 'Videos Cargados en Feed',
    icon: '📹',
    badge: 'PROFUNDIDAD INSTITUCIONAL',
    color: '#a855f7',
    avgTimeSpent: '2m 24s por usuario',
    avgTimeSeconds: 144,
    retentionRatePct: 68.2,
    completionRatePct: 54.0,
    reWatchRatePct: 18.0,
    monthlyReach: '38.000 reproducciones',
    trendDelta: '+15,2% vs mes anterior',
    isPositive: true,
    peakHours: '20:00 a 22:30 hs',
    bestContentType: 'Entrenamiento de División Canes K9 y actos oficiales completos',
    sparklineCurve: [100, 89, 79, 72, 68, 62, 54],
    insight: 'Excelente tasa de escucha activa: el 74% de los usuarios reproduce los videos institucionales con sonido activado.'
  }
];

export const PLATFORM_DWELL_DATA: Record<string, DwellTimeFormatItem[]> = {
  instagram: DEFAULT_INSTAGRAM_ITEMS,
  facebook: [
    {
      id: 'fb-video',
      format: 'video',
      title: 'Videos Cargados en Muro',
      icon: '📹',
      badge: 'MAYOR TIEMPO TOTAL',
      color: '#1877f2',
      avgTimeSpent: '3m 12s por usuario',
      avgTimeSeconds: 192,
      retentionRatePct: 69.8,
      completionRatePct: 58.2,
      reWatchRatePct: 24.6,
      monthlyReach: '124.000 reproducciones',
      trendDelta: '+16,4% vs mes pasado',
      isPositive: true,
      peakHours: '13:00 a 15:00 hs y 20:30 hs',
      bestContentType: 'Informes de tránsito en vivo, desfiles y partes del Comisario General',
      sparklineCurve: [100, 90, 82, 75, 70, 65, 58],
      insight: 'La comunidad de Facebook en Río Grande y Ushuaia prefiere los videos largos de rendición de cuentas y anuncios viales directos.'
    },
    {
      id: 'fb-reels',
      format: 'reels',
      title: 'Facebook Reels',
      icon: '🎬',
      badge: 'VIRALIDAD VECINAL',
      color: '#00f2ea',
      avgTimeSpent: '38 segundos',
      avgTimeSeconds: 38,
      retentionRatePct: 71.5,
      completionRatePct: 64.0,
      reWatchRatePct: 29.0,
      monthlyReach: '88.000 reproducciones',
      trendDelta: '+24,8% vs mes pasado',
      isPositive: true,
      peakHours: '18:00 a 21:00 hs',
      bestContentType: 'Patrullajes preventivos nocturnos y rescates en Glaciar Martial',
      sparklineCurve: [100, 93, 86, 79, 72, 68, 64],
      insight: 'Formato de crecimiento más acelerado en Facebook, con alta tasa de compartidos por familias fueguinas (+45%).'
    },
    {
      id: 'fb-carousel',
      format: 'carousel',
      title: 'Álbumes y Carruseles de Fotos',
      icon: '🖼️',
      badge: 'PARTICIPACIÓN CIUDADANA',
      color: '#ffd000',
      avgTimeSpent: '1m 35s por usuario',
      avgTimeSeconds: 95,
      retentionRatePct: 82.0,
      completionRatePct: 72.4,
      reWatchRatePct: 35.8,
      monthlyReach: '95.000 personas',
      trendDelta: '+9,2% vs mes pasado',
      isPositive: true,
      peakHours: '11:00 a 14:00 hs',
      bestContentType: 'Fotogalerías de egresos de cadetes y operativos conjuntos de seguridad',
      sparklineCurve: [100, 94, 89, 85, 82, 78, 72],
      insight: 'Los álbumes de egresos y distinciones policiales generan el mayor tiempo de contemplación y felicitaciones comunitarias.'
    },
    {
      id: 'fb-stories',
      format: 'stories',
      title: 'Historias de Facebook',
      icon: '⏱️',
      badge: 'ALERTAS INMEDIATAS',
      color: '#48bb78',
      avgTimeSpent: '8,2 seg / historia',
      avgTimeSeconds: 8.2,
      retentionRatePct: 78.4,
      completionRatePct: 69.0,
      reWatchRatePct: 21.0,
      monthlyReach: '110.000 impresiones',
      trendDelta: '+11,5% vs mes pasado',
      isPositive: true,
      peakHours: '06:30 a 08:30 hs',
      bestContentType: 'Alertas urgentes de Ruta 3 y teléfonos de emergencia de guardia 101',
      sparklineCurve: [100, 95, 88, 83, 78, 74, 69],
      insight: 'Consumo crítico a primera hora de la mañana para conductores que se desplazan entre Ushuaia, Tolhuin y Río Grande.'
    }
  ],
  tiktok: [
    {
      id: 'tt-short',
      format: 'reels',
      title: 'TikToks Cortos (15s a 30s)',
      icon: '🎬',
      badge: 'RETENCIÓN MÁXIMA',
      color: '#ff0050',
      avgTimeSpent: '26 segundos',
      avgTimeSeconds: 26,
      retentionRatePct: 88.4,
      completionRatePct: 74.2,
      reWatchRatePct: 42.0,
      monthlyReach: '310.000 vistas',
      trendDelta: '+34,2% vs mes anterior',
      isPositive: true,
      peakHours: '17:00 a 20:00 hs',
      bestContentType: 'Entrenamiento Canes K9 en nieve y rescates bajo ventisca',
      sparklineCurve: [100, 97, 94, 91, 88, 84, 74],
      insight: 'Un 42% de los usuarios reproduce el video 2 o más veces consecutivas gracias a la acción inmersiva y paisajes fueguinos.'
    },
    {
      id: 'tt-explainer',
      format: 'video',
      title: 'TikToks Explicativos (60s+)',
      icon: '📹',
      badge: 'PREVENCIÓN JOVEN',
      color: '#00f2ea',
      avgTimeSpent: '54 segundos',
      avgTimeSeconds: 54,
      retentionRatePct: 74.2,
      completionRatePct: 61.0,
      reWatchRatePct: 26.5,
      monthlyReach: '98.000 vistas',
      trendDelta: '+21,0% vs mes anterior',
      isPositive: true,
      peakHours: '19:00 a 22:00 hs',
      bestContentType: 'Cómo detectar estafas en WhatsApp y requisitos de admisión a cadetes',
      sparklineCurve: [100, 91, 84, 78, 74, 68, 61],
      insight: 'Alta tasa de guardado (+180% vs promedio): los jóvenes guardan los videos de consejos y requisitos en sus favoritos.'
    },
    {
      id: 'tt-carousel',
      format: 'carousel',
      title: 'Modo Foto / Carruseles TikTok',
      icon: '🖼️',
      badge: 'DESLIZAMIENTO ACTIVO',
      color: '#ffd000',
      avgTimeSpent: '42 segundos',
      avgTimeSeconds: 42,
      retentionRatePct: 81.0,
      completionRatePct: 69.5,
      reWatchRatePct: 32.0,
      monthlyReach: '65.000 vistas',
      trendDelta: '+19,5% vs mes anterior',
      isPositive: true,
      peakHours: '14:00 a 18:00 hs',
      bestContentType: 'Secuencias de rescate en montaña paso a paso y paisajes nevados',
      sparklineCurve: [100, 93, 87, 83, 81, 76, 70],
      insight: 'Los carruseles con música ambiental permiten una lectura detenida de los partes fotográficos del G.E.B.yR.'
    },
    {
      id: 'tt-stories',
      format: 'stories',
      title: 'Historias de TikTok',
      icon: '⏱️',
      badge: 'DETRÁS DE ESCENA',
      color: '#a855f7',
      avgTimeSpent: '11 segundos',
      avgTimeSeconds: 11,
      retentionRatePct: 82.5,
      completionRatePct: 73.0,
      reWatchRatePct: 24.0,
      monthlyReach: '45.000 impresiones',
      trendDelta: '+14,0% vs mes anterior',
      isPositive: true,
      peakHours: '16:00 a 19:00 hs',
      bestContentType: 'Guardias de comisarías y preparativos de patrullas rurales',
      sparklineCurve: [100, 95, 89, 85, 83, 79, 73],
      insight: 'Humaniza la fuerza policial mostrando el esfuerzo cotidiano de los efectivos en temperaturas bajo cero.'
    }
  ],
  youtube: [
    {
      id: 'yt-long',
      format: 'video',
      title: 'Videos Largos & Documentales',
      icon: '📹',
      badge: 'MÁXIMA INMERSIÓN',
      color: '#ff0000',
      avgTimeSpent: '5m 48s por espectador',
      avgTimeSeconds: 348,
      retentionRatePct: 61.4,
      completionRatePct: 48.0,
      reWatchRatePct: 19.5,
      monthlyReach: '19.500 visualizaciones',
      trendDelta: '+18,6% vs mes anterior',
      isPositive: true,
      peakHours: '20:00 a 23:00 hs (Smart TV)',
      bestContentType: 'Documentales del G.E.B.yR., historia policial y actos oficiales en HD',
      sparklineCurve: [100, 85, 74, 68, 61, 56, 48],
      insight: 'El 18.2% de las reproducciones se realiza en pantallas de televisor del hogar, registrando sesiones familiares de más de 12 minutos.'
    },
    {
      id: 'yt-shorts',
      format: 'reels',
      title: 'YouTube Shorts',
      icon: '⚡',
      badge: 'ALCANCE RÁPIDO',
      color: '#ff4d4d',
      avgTimeSpent: '51 segundos',
      avgTimeSeconds: 51,
      retentionRatePct: 86.8,
      completionRatePct: 79.0,
      reWatchRatePct: 38.0,
      monthlyReach: '88.000 vistas Shorts',
      trendDelta: '+32,0% vs mes anterior',
      isPositive: true,
      peakHours: '13:00 a 16:00 hs y 21:00 hs',
      bestContentType: 'Maniobras de rescate vertical y cruce del Garibaldi con hielo',
      sparklineCurve: [100, 96, 92, 88, 87, 82, 79],
      insight: 'Principal fuente de captación de nuevos suscriptores jóvenes para el canal institucional (+45 subs/semana).'
    },
    {
      id: 'yt-live',
      format: 'video',
      title: 'Transmisiones en Vivo (Live)',
      icon: '🔴',
      badge: 'TIEMPO RÉCORD EN VIVO',
      color: '#ffd000',
      avgTimeSpent: '18m 30s por espectador',
      avgTimeSeconds: 1110,
      retentionRatePct: 78.2,
      completionRatePct: 64.0,
      reWatchRatePct: 45.0,
      monthlyReach: '68.400 vistas en vivo',
      trendDelta: '+25,4% vs mes anterior',
      isPositive: true,
      peakHours: 'Horarios de actos matutinos (10:00 a 12:30 hs)',
      bestContentType: 'Ceremonia de Aniversario Institucional y Egresos de Cadetes',
      sparklineCurve: [100, 94, 88, 82, 78, 74, 64],
      insight: 'Las familias de cadetes y personal policial permanecen conectadas en directo durante casi toda la duración del acto oficial.'
    },
    {
      id: 'yt-community',
      format: 'carousel',
      title: 'Pestaña de Comunidad & Avisos',
      icon: '📋',
      badge: 'COMUNICACIÓN DIRECTA',
      color: '#60a5fa',
      avgTimeSpent: '45 segundos',
      avgTimeSeconds: 45,
      retentionRatePct: 84.5,
      completionRatePct: 76.0,
      reWatchRatePct: 15.0,
      monthlyReach: '14.000 impresiones',
      trendDelta: '+8,0% vs mes anterior',
      isPositive: true,
      peakHours: '09:00 a 13:00 hs',
      bestContentType: 'Encuestas comunitarias, recordatorios viales y fechas de inscripción',
      sparklineCurve: [100, 95, 90, 86, 84, 80, 76],
      insight: 'Excelente canal para medir opinión de la comunidad sobre operativos de seguridad con un 88% de respuestas positivas.'
    }
  ],
  website: [
    {
      id: 'web-rutas',
      format: 'article',
      title: 'Estado de Rutas TDF en Vivo (Ruta 3)',
      icon: '❄️',
      badge: 'MÁS CONSULTADA DE LA ISLA',
      color: '#00f2ea',
      avgTimeSpent: '1m 45s por ciudadano',
      avgTimeSeconds: 105,
      retentionRatePct: 91.2,
      completionRatePct: 84.0,
      reWatchRatePct: 68.0,
      monthlyReach: '72.400 usuarios únicos',
      trendDelta: '+48,5% en temporada invernal',
      isPositive: true,
      peakHours: '06:00 a 09:00 hs y 18:00 a 21:00 hs',
      bestContentType: 'Cámaras en vivo del Garibaldi, estado de calzada y puestos de control',
      sparklineCurve: [100, 98, 95, 93, 91, 88, 84],
      insight: 'El 68% de los conductores fueguinos consulta esta sección de forma recurrente varias veces por semana antes de salir a la ruta.'
    },
    {
      id: 'web-residencia',
      format: 'article',
      title: 'Certificado de Residencia Online',
      icon: '📄',
      badge: 'TRÁMITE CIUDADANO CLAVE',
      color: '#00e575',
      avgTimeSpent: '4m 12s por sesión',
      avgTimeSeconds: 252,
      retentionRatePct: 88.5,
      completionRatePct: 86.0,
      reWatchRatePct: 18.0,
      monthlyReach: '38.200 solicitudes',
      trendDelta: '+22,0% vs mes anterior',
      isPositive: true,
      peakHours: '09:00 a 16:00 hs (Horario laboral)',
      bestContentType: 'Formulario web con validación automática y descarga de PDF con código QR',
      sparklineCurve: [100, 96, 92, 90, 88, 87, 86],
      insight: 'Tasa de finalización exitosa del 86%: el ciudadano completa el trámite en menos de 5 minutos sin necesidad de ir a la comisaría.'
    },
    {
      id: 'web-conducta',
      format: 'article',
      title: 'Certificado de Buena Conducta',
      icon: '🛡️',
      badge: 'REQUISITO LABORAL',
      color: '#60a5fa',
      avgTimeSpent: '3m 50s por sesión',
      avgTimeSeconds: 230,
      retentionRatePct: 84.2,
      completionRatePct: 81.5,
      reWatchRatePct: 14.0,
      monthlyReach: '28.400 solicitudes',
      trendDelta: '+14,2% vs mes anterior',
      isPositive: true,
      peakHours: '10:00 a 15:00 hs',
      bestContentType: 'Validación de identidad digital y antecedentes provinciales',
      sparklineCurve: [100, 94, 89, 86, 84, 83, 81],
      insight: 'Ahorro estimado de más de 1.800 horas de atención presencial al mes en comisarías de Río Grande y Ushuaia.'
    },
    {
      id: 'web-directorio',
      format: 'article',
      title: 'Directorio Comisarías y Línea 101',
      icon: '📞',
      badge: 'CONTACTO DE EMERGENCIA',
      color: '#ffd000',
      avgTimeSpent: '1m 20s por consulta',
      avgTimeSeconds: 80,
      retentionRatePct: 94.0,
      completionRatePct: 91.0,
      reWatchRatePct: 42.0,
      monthlyReach: '21.500 ciudadanos',
      trendDelta: '+7,5% vs mes anterior',
      isPositive: true,
      peakHours: 'Disponible 24/7 (Guardias nocturnas)',
      bestContentType: 'Teléfonos directos, WhatsApp de guardia y ubicación en mapa de dependencias',
      sparklineCurve: [100, 98, 96, 95, 94, 93, 91],
      insight: 'Tiempo medio de búsqueda de número de comisaría menor a 30 segundos gracias al directorio filtrable por ciudad.'
    }
  ]
};

export const UserDwellTimeSlider: React.FC<UserDwellTimeSliderProps> = ({
  platformName,
  platformColor = '#00e575',
  items
}) => {
  const formatItems = items || PLATFORM_DWELL_DATA[platformName.toLowerCase()] || DEFAULT_INSTAGRAM_ITEMS;
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  const activeItem = formatItems[activeIndex] || formatItems[0];

  const handleNext = () => {
    setActiveIndex(prev => {
      const next = (prev + 1) % formatItems.length;
      scrollToCard(next);
      return next;
    });
  };

  const handlePrev = () => {
    setActiveIndex(prev => {
      const next = (prev - 1 + formatItems.length) % formatItems.length;
      scrollToCard(next);
      return next;
    });
  };

  const scrollToCard = (idx: number) => {
    if (sliderRef.current) {
      const cards = sliderRef.current.children;
      if (cards[idx]) {
        (cards[idx] as HTMLElement).scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    }
  };

  return (
    <div
      className="card"
      style={{
        background: 'linear-gradient(135deg, rgba(14, 23, 42, 0.95), rgba(8, 14, 28, 0.98))',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: 18,
        padding: '22px 24px',
        boxShadow: '0 12px 36px rgba(0, 0, 0, 0.4)',
        marginBottom: 22,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background ambient glow */}
      <div
        style={{
          position: 'absolute',
          top: -40,
          right: -40,
          width: 260,
          height: 260,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${activeItem.color}18 0%, transparent 70%)`,
          pointerEvents: 'none',
          transition: 'background 0.4s ease'
        }}
      />

      {/* ── HEADER DE LA TARJETA ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 14, marginBottom: 18 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 4 }}>
            <span style={{ fontSize: '1.25rem' }}>⏱️</span>
            <h3 style={{ margin: 0, fontSize: '1.12rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.01em' }}>
              Tiempo Real que Pasa Cada Usuario en la Plataforma
            </h3>
            <span style={{ background: 'rgba(0, 229, 117, 0.15)', color: '#00e575', border: '1px solid rgba(0, 229, 117, 0.35)', padding: '2px 8px', borderRadius: 12, fontSize: '0.68rem', fontWeight: 800 }}>
              DWELL TIME & RETENCIÓN
            </span>
          </div>
          <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-secondary)', maxWidth: 780, lineHeight: 1.45 }}>
            Medición segundo a segundo del tiempo de permanencia activa y porcentaje de atención que dedica la comunidad fueguina al contenido institucional: <strong>Historias, Videos cargados, Reels y Carruseles</strong>.
          </p>
        </div>

        {/* ── SLIDER CONTROLS ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: 700 }}>
            {activeIndex + 1} de {formatItems.length}
          </span>
          <button
            onClick={handlePrev}
            className="btn-ghost"
            aria-label="Formato anterior"
            style={{
              padding: '6px 12px',
              borderRadius: 8,
              fontSize: '0.8rem',
              fontWeight: 800,
              background: 'rgba(255, 255, 255, 0.06)'
            }}
          >
            ← Anterior
          </button>
          <button
            onClick={handleNext}
            className="btn-ghost"
            aria-label="Siguiente formato"
            style={{
              padding: '6px 12px',
              borderRadius: 8,
              fontSize: '0.8rem',
              fontWeight: 800,
              background: 'rgba(255, 255, 255, 0.06)',
              borderColor: activeItem.color,
              color: '#ffffff'
            }}
          >
            Siguiente →
          </button>
        </div>
      </div>

      {/* ── FORMAT QUICK TABS / SELECTOR ── */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 18, overflowX: 'auto', paddingBottom: 4 }}>
        {formatItems.map((item, idx) => {
          const isActive = idx === activeIndex;
          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveIndex(idx);
                scrollToCard(idx);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '7px 14px',
                borderRadius: 14,
                fontSize: '0.75rem',
                fontWeight: isActive ? 800 : 600,
                cursor: 'pointer',
                border: isActive ? `1px solid ${item.color}` : '1px solid rgba(255, 255, 255, 0.08)',
                background: isActive ? `${item.color}20` : 'rgba(255, 255, 255, 0.03)',
                color: isActive ? '#ffffff' : 'var(--text-secondary)',
                transition: 'all 0.18s ease',
                whiteSpace: 'nowrap'
              }}
            >
              <span>{item.icon}</span>
              <span>{item.title}</span>
              <span style={{ fontSize: '0.66rem', opacity: 0.8, color: item.color, fontWeight: 700 }}>
                {item.avgTimeSpent}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── LATERAL SLIDER CONTAINER ── */}
      <div
        ref={sliderRef}
        style={{
          display: 'flex',
          gap: 16,
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          paddingBottom: 8,
          scrollbarWidth: 'thin'
        }}
      >
        {formatItems.map((item, idx) => {
          const isSelected = idx === activeIndex;
          return (
            <div
              key={item.id}
              onClick={() => setActiveIndex(idx)}
              style={{
                minWidth: 'clamp(290px, 78vw, 420px)',
                flex: '0 0 auto',
                scrollSnapAlign: 'center',
                background: isSelected ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.02)',
                border: isSelected ? `2px solid ${item.color}` : '1px solid rgba(255, 255, 255, 0.07)',
                borderRadius: 16,
                padding: '20px 22px',
                cursor: 'pointer',
                transition: 'all 0.22s ease',
                boxShadow: isSelected ? `0 8px 24px ${item.color}25` : 'none',
                position: 'relative'
              }}
            >
              {/* Badge format */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: '1.4rem' }}>{item.icon}</span>
                  <div>
                    <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#ffffff' }}>
                      {item.title}
                    </div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                      Alcance: {item.monthlyReach}
                    </div>
                  </div>
                </div>

                <span
                  style={{
                    fontSize: '0.65rem',
                    fontWeight: 800,
                    padding: '3px 8px',
                    borderRadius: 8,
                    background: `${item.color}22`,
                    color: item.color,
                    border: `1px solid ${item.color}44`
                  }}
                >
                  {item.badge}
                </span>
              </div>

              {/* Big Hero Number: Tiempo Real Dedicado */}
              <div style={{ background: 'rgba(0, 0, 0, 0.35)', padding: '14px 16px', borderRadius: 12, marginBottom: 16, border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <div style={{ fontSize: '0.65rem', color: '#a0aec0', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>
                  Tiempo Medio de Permanencia por Usuario
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginTop: 4 }}>
                  <span style={{ fontSize: '1.8rem', fontWeight: 900, color: item.color, fontFamily: 'var(--font-heading)' }}>
                    {item.avgTimeSpent}
                  </span>
                  <span style={{ fontSize: '0.72rem', color: '#00e575', fontWeight: 700 }}>
                    {item.trendDelta}
                  </span>
                </div>
              </div>

              {/* 4 Metrics Mini Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10, marginBottom: 16 }}>
                <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: 10, borderRadius: 10 }}>
                  <div style={{ fontSize: '0.62rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Retención Media</div>
                  <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#ffffff', marginTop: 2 }}>{item.retentionRatePct}%</div>
                  <div style={{ fontSize: '0.62rem', color: '#00e575' }}>Atención sostenida</div>
                </div>

                <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: 10, borderRadius: 10 }}>
                  <div style={{ fontSize: '0.62rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Finalización (100%)</div>
                  <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#ffd000', marginTop: 2 }}>{item.completionRatePct}%</div>
                  <div style={{ fontSize: '0.62rem', color: 'var(--text-muted)' }}>Ven todo el contenido</div>
                </div>

                <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: 10, borderRadius: 10 }}>
                  <div style={{ fontSize: '0.62rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Re-visualizaciones</div>
                  <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#00f2ea', marginTop: 2 }}>{item.reWatchRatePct}%</div>
                  <div style={{ fontSize: '0.62rem', color: 'var(--text-muted)' }}>Vuelven a mirarlo</div>
                </div>

                <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: 10, borderRadius: 10 }}>
                  <div style={{ fontSize: '0.62rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Pico de Horario</div>
                  <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#ffffff', marginTop: 4, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {item.peakHours.split(' ')[0]}
                  </div>
                  <div style={{ fontSize: '0.62rem', color: 'var(--text-muted)' }}>Mayor permanencia</div>
                </div>
              </div>

              {/* Curva de Retención Segundo a Segundo (Mini SVG Visual) */}
              <div style={{ marginBottom: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem', color: 'var(--text-muted)', marginBottom: 6 }}>
                  <span>Curva de Retención de Audiencia:</span>
                  <span style={{ color: item.color, fontWeight: 700 }}>Inicio 100% → Final {item.sparklineCurve[item.sparklineCurve.length - 1]}%</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 32, background: 'rgba(0, 0, 0, 0.3)', padding: '4px 6px', borderRadius: 6 }}>
                  {item.sparklineCurve.map((val, cIdx) => (
                    <div
                      key={cIdx}
                      style={{
                        flex: 1,
                        height: `${val}%`,
                        background: `linear-gradient(180deg, ${item.color}, ${item.color}55)`,
                        borderRadius: '2px 2px 0 0'
                      }}
                      title={`Punto ${cIdx + 1}: ${val}% de retención`}
                    />
                  ))}
                </div>
              </div>

              {/* Insight OCI */}
              <div style={{ fontSize: '0.74rem', color: '#d0d7de', lineHeight: 1.4, borderLeft: `3px solid ${item.color}`, paddingLeft: 10, fontStyle: 'italic' }}>
                "{item.insight}"
              </div>
            </div>
          );
        })}
      </div>

      {/* Slider Pagination Indicators */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 6, marginTop: 14 }}>
        {formatItems.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setActiveIndex(idx);
              scrollToCard(idx);
            }}
            aria-label={`Ir al formato ${idx + 1}`}
            style={{
              width: activeIndex === idx ? 24 : 8,
              height: 6,
              borderRadius: 3,
              background: activeIndex === idx ? activeItem.color : 'rgba(255, 255, 255, 0.2)',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              padding: 0
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default UserDwellTimeSlider;
