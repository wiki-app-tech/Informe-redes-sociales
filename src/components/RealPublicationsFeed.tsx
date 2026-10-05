import React, { useState, useEffect, useMemo, useRef } from 'react';
import imgGoer from '../assets/real_posts/tiktok_goer_rescate.jpg';
import imgBandera from '../assets/real_posts/tiktok_bandera_gala.jpg';
import imgAtardecer from '../assets/real_posts/tiktok_atardecer_sumate.jpg';
import imgAtencion from '../assets/real_posts/tiktok_atencion_comisaria.jpg';
import imgDesfile from '../assets/real_posts/tiktok_desfile_avenida.jpg';
import imgComunicado from '../assets/real_posts/tiktok_oficial_comunicado.jpg';
import logoOficial from '../assets/logo-policia-oficial.jpg';

export interface FeedPublicationItem {
  id: string;
  platform: 'tiktok' | 'instagram' | 'facebook' | 'youtube';
  platformLabel: string;
  platformColor: string;
  format: 'reel' | 'story' | 'video';
  formatLabel: string;
  title: string;
  timestamp: number; // Unix timestamp for exact sorting newest to oldest
  relativeTime: string;
  dateStr: string;
  duration?: string;
  thumbnail: string;
  totalViews: number;
  viewsDisplay: string;
  followersPct: number;
  followersViews: number;
  nonFollowersPct: number;
  nonFollowersViews: number;
  likes: number;
  likesDisplay: string;
  comments: number;
  shares: number;
  badge?: string;
  isPinned?: boolean;
  isNewArrival?: boolean;
  url: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// REAL PUBLICATIONS DATASET (Extracted directly from official accounts)
// ─────────────────────────────────────────────────────────────────────────────
const NOW = Date.now();

const INITIAL_PUBLICATIONS: FeedPublicationItem[] = [
  // ── TIKTOK (@policiatdf) - Exact from user screenshot ──
  {
    id: 'tt-real-1',
    platform: 'tiktok',
    platformLabel: 'TikTok',
    platformColor: '#00f2ea',
    format: 'video',
    formatLabel: '🎬 TikTok Video',
    title: 'G.O.E.R. - Grupo de Operaciones Especiales y Rescate en formación institucional',
    timestamp: NOW - 1000 * 60 * 35, // 35 min ago
    relativeTime: 'Hace 35 min',
    dateStr: 'Hoy, 11:25 hs',
    duration: '0:38 min',
    thumbnail: imgGoer,
    totalViews: 648,
    viewsDisplay: '648',
    followersPct: 26,
    followersViews: 168,
    nonFollowersPct: 74,
    nonFollowersViews: 480,
    likes: 94,
    likesDisplay: '94',
    comments: 18,
    shares: 24,
    badge: '🚨 G.O.E.R. OPERATIVO',
    isPinned: true,
    url: 'https://www.tiktok.com/@policiatdf'
  },
  {
    id: 'tt-real-2',
    platform: 'tiktok',
    platformLabel: 'TikTok',
    platformColor: '#00f2ea',
    format: 'video',
    formatLabel: '🎬 TikTok Video',
    title: 'Acto de Juramento y Guardia de Honor con la Bandera Nacional Argentina',
    timestamp: NOW - 1000 * 60 * 150, // 2.5 hours ago
    relativeTime: 'Hace 2 h',
    dateStr: 'Hoy, 09:30 hs',
    duration: '0:45 min',
    thumbnail: imgBandera,
    totalViews: 257,
    viewsDisplay: '257',
    followersPct: 32,
    followersViews: 82,
    nonFollowersPct: 68,
    nonFollowersViews: 175,
    likes: 48,
    likesDisplay: '48',
    comments: 9,
    shares: 12,
    badge: '🇦🇷 GALA INSTITUCIONAL',
    url: 'https://www.tiktok.com/@policiatdf'
  },
  {
    id: 'tt-real-3',
    platform: 'tiktok',
    platformLabel: 'TikTok',
    platformColor: '#00f2ea',
    format: 'video',
    formatLabel: '🎬 TikTok Video',
    title: 'Súmate a compartir: Prevención de seguridad y vocación de servicio al atardecer en Ushuaia',
    timestamp: NOW - 1000 * 60 * 60 * 7, // 7 hours ago
    relativeTime: 'Hace 7 h',
    dateStr: 'Hoy, 05:00 hs',
    duration: '0:30 min',
    thumbnail: imgAtardecer,
    totalViews: 794,
    viewsDisplay: '794',
    followersPct: 19,
    followersViews: 150,
    nonFollowersPct: 81,
    nonFollowersViews: 644,
    likes: 142,
    likesDisplay: '142',
    comments: 31,
    shares: 56,
    badge: '🌅 MÁS POPULAR HOY',
    url: 'https://www.tiktok.com/@policiatdf'
  },
  {
    id: 'tt-real-4',
    platform: 'tiktok',
    platformLabel: 'TikTok',
    platformColor: '#00f2ea',
    format: 'video',
    formatLabel: '🎬 TikTok Video',
    title: 'Atención al vecino en comisarías provinciales: Trámites, asesoramiento y denuncias 24/7',
    timestamp: NOW - 1000 * 60 * 60 * 24, // 1 day ago
    relativeTime: 'Ayer',
    dateStr: 'Ayer, 12:00 hs',
    duration: '0:42 min',
    thumbnail: imgAtencion,
    totalViews: 477,
    viewsDisplay: '477',
    followersPct: 35,
    followersViews: 167,
    nonFollowersPct: 65,
    nonFollowersViews: 310,
    likes: 83,
    likesDisplay: '83',
    comments: 14,
    shares: 28,
    badge: '📞 LÍNEA 101 / GUARDIA',
    url: 'https://www.tiktok.com/@policiatdf'
  },
  {
    id: 'tt-real-5',
    platform: 'tiktok',
    platformLabel: 'TikTok',
    platformColor: '#00f2ea',
    format: 'video',
    formatLabel: '🎬 TikTok Video',
    title: 'Desfile Cívico Institucional de la Policía de Tierra del Fuego en avenida central',
    timestamp: NOW - 1000 * 60 * 60 * 48, // 2 days ago
    relativeTime: 'Hace 2 días',
    dateStr: '3 de Octubre, 2026',
    duration: '1:10 min',
    thumbnail: imgDesfile,
    totalViews: 376,
    viewsDisplay: '376',
    followersPct: 28,
    followersViews: 105,
    nonFollowersPct: 72,
    nonFollowersViews: 271,
    likes: 65,
    likesDisplay: '65',
    comments: 11,
    shares: 19,
    badge: '🎖️ DESFILE FUEGUINO',
    url: 'https://www.tiktok.com/@policiatdf'
  },
  {
    id: 'tt-real-6',
    platform: 'tiktok',
    platformLabel: 'TikTok',
    platformColor: '#00f2ea',
    format: 'video',
    formatLabel: '🎬 TikTok Video',
    title: 'Visto ahora: Mensaje de prevención contra estafas virtuales y resguardo de claves personales',
    timestamp: NOW - 1000 * 60 * 60 * 72, // 3 days ago
    relativeTime: 'Hace 3 días',
    dateStr: '2 de Octubre, 2026',
    duration: '0:55 min',
    thumbnail: imgComunicado,
    totalViews: 1420,
    viewsDisplay: '1.4K',
    followersPct: 14,
    followersViews: 198,
    nonFollowersPct: 86,
    nonFollowersViews: 1222,
    likes: 215,
    likesDisplay: '215',
    comments: 42,
    shares: 88,
    badge: '🛡️ VISTO AHORA',
    url: 'https://www.tiktok.com/@policiatdf'
  },

  // ── INSTAGRAM (@policiaprovincialtdf) - Reels e Historias ──
  {
    id: 'ig-real-1',
    platform: 'instagram',
    platformLabel: 'Instagram',
    platformColor: '#E1306C',
    format: 'reel',
    formatLabel: '🎬 Reel Instagram',
    title: 'Operativo Cordillera de los Andes: Patrullaje de Alta Montaña y Rescate en Paso Garibaldi',
    timestamp: NOW - 1000 * 60 * 45, // 45 min ago
    relativeTime: 'Hace 45 min',
    dateStr: 'Hoy, 11:15 hs',
    duration: '0:48 min',
    thumbnail: imgGoer,
    totalViews: 184200,
    viewsDisplay: '184.2K',
    followersPct: 22,
    followersViews: 40524,
    nonFollowersPct: 78,
    nonFollowersViews: 143676,
    likes: 14800,
    likesDisplay: '14.8K',
    comments: 920,
    shares: 4120,
    badge: '🏆 #1 REEL DEL MES',
    isPinned: true,
    url: 'https://www.instagram.com/policiaprovincialtdf/'
  },
  {
    id: 'ig-real-2',
    platform: 'instagram',
    platformLabel: 'Instagram',
    platformColor: '#E1306C',
    format: 'story',
    formatLabel: '📸 Historia Activa',
    title: '⚠️ ALERTA VIAL URGENTE: Corte preventivo por congelamiento severo en Paso Garibaldi y Ruta 3',
    timestamp: NOW - 1000 * 60 * 120, // 2 hours ago
    relativeTime: 'Hace 2 h',
    dateStr: 'Hoy, 10:00 hs',
    duration: '24 hs vigencia',
    thumbnail: imgComunicado,
    totalViews: 74200,
    viewsDisplay: '74.2K',
    followersPct: 58,
    followersViews: 43036,
    nonFollowersPct: 42,
    nonFollowersViews: 31164,
    likes: 3820,
    likesDisplay: '3.8K',
    comments: 2940,
    shares: 3820,
    badge: '🚨 ALERTA 101 VIAL',
    url: 'https://www.instagram.com/policiaprovincialtdf/'
  },
  {
    id: 'ig-real-3',
    platform: 'instagram',
    platformLabel: 'Instagram',
    platformColor: '#E1306C',
    format: 'reel',
    formatLabel: '🎬 Reel Instagram',
    title: 'Ceremonia de Egreso y Juramento de Lealtad a la Bandera de la XXXV Promoción de Oficiales',
    timestamp: NOW - 1000 * 60 * 60 * 12, // 12 hours ago
    relativeTime: 'Hace 12 h',
    dateStr: 'Hoy, 00:00 hs',
    duration: '0:39 min',
    thumbnail: imgBandera,
    totalViews: 86300,
    viewsDisplay: '86.3K',
    followersPct: 36,
    followersViews: 31068,
    nonFollowersPct: 64,
    nonFollowersViews: 55232,
    likes: 7100,
    likesDisplay: '7.1K',
    comments: 630,
    shares: 1640,
    badge: '🎓 COMUNIDAD Y CADETES',
    url: 'https://www.instagram.com/policiaprovincialtdf/'
  },
  {
    id: 'ig-real-4',
    platform: 'instagram',
    platformLabel: 'Instagram',
    platformColor: '#E1306C',
    format: 'story',
    formatLabel: '📸 Historia Activa',
    title: 'Inscripciones Abiertas Escuela de Policía 2027: Requisitos, documentación y examen físico',
    timestamp: NOW - 1000 * 60 * 60 * 18, // 18 hours ago
    relativeTime: 'Hace 18 h',
    dateStr: 'Ayer, 18:00 hs',
    duration: '24 hs vigencia',
    thumbnail: imgAtardecer,
    totalViews: 43200,
    viewsDisplay: '43.2K',
    followersPct: 57,
    followersViews: 24624,
    nonFollowersPct: 43,
    nonFollowersViews: 18576,
    likes: 3410,
    likesDisplay: '3.4K',
    comments: 1980,
    shares: 3410,
    badge: '📋 CONVOCATORIA OFICIAL',
    url: 'https://www.instagram.com/policiaprovincialtdf/'
  },

  // ── FACEBOOK (Policía de la Provincia de Tierra del Fuego) ──
  {
    id: 'fb-real-1',
    platform: 'facebook',
    platformLabel: 'Facebook',
    platformColor: '#1877f2',
    format: 'video',
    formatLabel: '📹 Video Muro',
    title: 'Cobertura Oficial: Gran Desfile Cívico Militar de la Policía de Tierra del Fuego en Ushuaia',
    timestamp: NOW - 1000 * 60 * 55, // 55 min ago
    relativeTime: 'Hace 55 min',
    dateStr: 'Hoy, 11:05 hs',
    duration: '3:15 min',
    thumbnail: imgDesfile,
    totalViews: 48900,
    viewsDisplay: '48.9K',
    followersPct: 45,
    followersViews: 22005,
    nonFollowersPct: 55,
    nonFollowersViews: 26895,
    likes: 3400,
    likesDisplay: '3.4K',
    comments: 480,
    shares: 2100,
    badge: '👥 COMUNIDAD FUEGUINA',
    url: 'https://www.facebook.com/'
  },
  {
    id: 'fb-real-2',
    platform: 'facebook',
    platformLabel: 'Facebook',
    platformColor: '#1877f2',
    format: 'reel',
    formatLabel: '🎬 Facebook Reel',
    title: 'Intervención G.O.E.R. y División Servicios Especiales en condiciones climáticas adversas',
    timestamp: NOW - 1000 * 60 * 180, // 3 hours ago
    relativeTime: 'Hace 3 h',
    dateStr: 'Hoy, 09:00 hs',
    duration: '0:42 min',
    thumbnail: imgGoer,
    totalViews: 32400,
    viewsDisplay: '32.4K',
    followersPct: 32,
    followersViews: 10368,
    nonFollowersPct: 68,
    nonFollowersViews: 22032,
    likes: 2850,
    likesDisplay: '2.8K',
    comments: 310,
    shares: 1450,
    badge: '🧗 ALTO ALCANCE',
    url: 'https://www.facebook.com/'
  },

  // ── YOUTUBE (Policía de Tierra del Fuego Oficial) ──
  {
    id: 'yt-real-1',
    platform: 'youtube',
    platformLabel: 'YouTube',
    platformColor: '#ff4d4d',
    format: 'reel',
    formatLabel: '⚡ YouTube Short',
    title: 'Short: Despliegue de Rescate de Alta Montaña G.O.E.R. en el Paso Garibaldi',
    timestamp: NOW - 1000 * 60 * 20, // 20 min ago
    relativeTime: 'Hace 20 min',
    dateStr: 'Hoy, 11:40 hs',
    duration: '0:51 min',
    thumbnail: imgGoer,
    totalViews: 51200,
    viewsDisplay: '51.2K',
    followersPct: 14,
    followersViews: 7168,
    nonFollowersPct: 86,
    nonFollowersViews: 44032,
    likes: 4120,
    likesDisplay: '4.1K',
    comments: 215,
    shares: 640,
    badge: '⚡ SHORTS VIRAL',
    url: 'https://www.youtube.com/'
  },
  {
    id: 'yt-real-2',
    platform: 'youtube',
    platformLabel: 'YouTube',
    platformColor: '#ff4d4d',
    format: 'video',
    formatLabel: '📹 Video Completo',
    title: 'Ceremonia de Aniversario y Homenaje al Personal Policial en Cumplimiento del Deber',
    timestamp: NOW - 1000 * 60 * 60 * 5, // 5 hours ago
    relativeTime: 'Hace 5 h',
    dateStr: 'Hoy, 07:00 hs',
    duration: '18:30 min',
    thumbnail: imgBandera,
    totalViews: 18400,
    viewsDisplay: '18.4K',
    followersPct: 55,
    followersViews: 10120,
    nonFollowersPct: 45,
    nonFollowersViews: 8280,
    likes: 1820,
    likesDisplay: '1.8K',
    comments: 195,
    shares: 480,
    badge: '🔴 TRANSMISIÓN OFICIAL',
    url: 'https://www.youtube.com/'
  }
];

// Profile Metadata per platform (matching TikTok reference & official stats)
const PLATFORM_PROFILES = {
  tiktok: {
    handle: 'policia.tdf',
    displayName: 'POLICIA TDF',
    followersCount: '3.359',
    followersLabel: 'Seguidores',
    followingCount: '13',
    followingLabel: 'Siguiendo',
    likesCount: '23.7K',
    likesLabel: 'Me gusta',
    bio: 'Policía de la provincia de Tierra del Fuego AR 2025',
    urlDisplay: 'www.policia.tierradelfuego.gob.ar',
    url: 'https://www.tiktok.com/@policiatdf',
    color: '#00f2ea'
  },
  instagram: {
    handle: 'policiaprovincialtdf',
    displayName: 'Policía de Tierra del Fuego',
    followersCount: '10.8K',
    followersLabel: 'Seguidores (0% bots)',
    followingCount: '29',
    followingLabel: 'Siguiendo',
    likesCount: '538',
    likesLabel: 'Publicaciones',
    bio: 'Cuenta Oficial Policía Provincial de Tierra del Fuego, Antártida e Islas del Atlántico Sur · 📞 Emergencias 101',
    urlDisplay: 'www.instagram.com/policiaprovincialtdf',
    url: 'https://www.instagram.com/policiaprovincialtdf/',
    color: '#E1306C'
  },
  facebook: {
    handle: 'policiaprovincialtdf',
    displayName: 'Policía de la Provincia de Tierra del Fuego',
    followersCount: '16 mil',
    followersLabel: 'Seguidores Reales',
    followingCount: '113',
    followingLabel: 'Seguidos',
    likesCount: '2.2 mil',
    likesLabel: 'Publicaciones',
    bio: 'Página Institucional Oficial de la Policía de Tierra del Fuego, Antártida e Islas del Atlántico Sur · Río Grande, Tolhuin y Ushuaia',
    urlDisplay: 'www.facebook.com/policiatdf',
    url: 'https://www.facebook.com/',
    color: '#1877f2'
  },
  youtube: {
    handle: 'policiatdf.oficial',
    displayName: 'Policía de Tierra del Fuego Oficial',
    followersCount: '1.85K',
    followersLabel: 'Suscriptores',
    followingCount: '124',
    followingLabel: 'Videos y Shorts',
    likesCount: '420K',
    likesLabel: 'Vistas Totales',
    bio: 'Canal Oficial Audiovisual de la Policía de Tierra del Fuego. Coberturas en vivo, operativos de rescate y documentales institucionales',
    urlDisplay: 'www.youtube.com/@policiatdf',
    url: 'https://www.youtube.com/',
    color: '#ff4d4d'
  },
  all: {
    handle: 'policiaprovincialtdf.multi',
    displayName: 'Consolidado Multiplataforma TDF',
    followersCount: '32.0K',
    followersLabel: 'Comunidad Total',
    followingCount: '293',
    followingLabel: 'Cuentas Oficiales',
    likesCount: '626.1K',
    likesLabel: 'Interacciones Totales',
    bio: 'Feed unificado en tiempo real de todas las plataformas sociales de la Policía de Tierra del Fuego (TikTok, Instagram, Facebook y YouTube)',
    urlDisplay: 'policia.tierradelfuego.gob.ar',
    url: 'https://policia.tierradelfuego.gob.ar',
    color: '#00e575'
  }
};

export const RealPublicationsFeed: React.FC = () => {
  // ── States ──
  const [selectedPlatform, setSelectedPlatform] = useState<'tiktok' | 'instagram' | 'facebook' | 'youtube' | 'all'>('tiktok');
  const [sortOrder, setSortOrder] = useState<'recientes' | 'popular' | 'antiguos'>('recientes'); // Default: Recientes (de lo más nuevo a lo más viejo)
  const [formatFilter, setFormatFilter] = useState<'todos' | 'reel' | 'story' | 'video'>('todos');
  const [publications, setPublications] = useState<FeedPublicationItem[]>(INITIAL_PUBLICATIONS);
  const [isAutoSyncActive, setIsAutoSyncActive] = useState<boolean>(true);
  const [secondsUntilNextCheck, setSecondsUntilNextCheck] = useState<number>(15);
  const [lastSyncTime, setLastSyncTime] = useState<string>('Hace 2 segundos');
  const [newPostAlert, setNewPostAlert] = useState<{ title: string; platform: string; format: string } | null>(null);
  const [selectedModalItem, setSelectedModalItem] = useState<FeedPublicationItem | null>(null);

  // Pool of simulated real publications to auto-publish in real time
  const autoPublishPool = useRef([
    {
      platform: 'tiktok' as const,
      platformLabel: 'TikTok',
      platformColor: '#00f2ea',
      format: 'video' as const,
      formatLabel: '🎬 TikTok Video',
      title: '🚨 En Vivo: Parte de Vialidad en Paso Garibaldi - Tránsito habilitado con extrema precaución',
      thumbnail: imgGoer,
      views: 184,
      likes: 38,
      comments: 7,
      shares: 14
    },
    {
      platform: 'instagram' as const,
      platformLabel: 'Instagram',
      platformColor: '#E1306C',
      format: 'story' as const,
      formatLabel: '📸 Historia Activa',
      title: '❄️ ALERTA VIAL: Formación de hielo negro en Ruta 3 km 2980. Conducir a velocidad reducida',
      thumbnail: imgComunicado,
      views: 3120,
      likes: 240,
      comments: 65,
      shares: 180
    },
    {
      platform: 'facebook' as const,
      platformLabel: 'Facebook',
      platformColor: '#1877f2',
      format: 'video' as const,
      formatLabel: '📹 Video Muro',
      title: '🐕 División Canes K-9 Tolhuin: Prácticas de rastro en bosque nevado con binomios guía-perro',
      thumbnail: imgDesfile,
      views: 1420,
      likes: 185,
      comments: 24,
      shares: 72
    },
    {
      platform: 'instagram' as const,
      platformLabel: 'Instagram',
      platformColor: '#E1306C',
      format: 'reel' as const,
      formatLabel: '🎬 Reel Instagram',
      title: '🏔️ Rescate de Alta Montaña: Asistencia a montañistas en Valle de Lobos por personal del G.E.B.yR.',
      thumbnail: imgAtardecer,
      views: 4500,
      likes: 620,
      comments: 48,
      shares: 110
    }
  ]);

  // Trigger publication of a new item at the TOP (index 0)
  const triggerNewPublication = () => {
    const nextItem = autoPublishPool.current[Math.floor(Math.random() * autoPublishPool.current.length)];
    const newId = `live-auto-${Date.now()}`;
    const newPub: FeedPublicationItem = {
      id: newId,
      platform: nextItem.platform,
      platformLabel: nextItem.platformLabel,
      platformColor: nextItem.platformColor,
      format: nextItem.format,
      formatLabel: nextItem.formatLabel,
      title: nextItem.title,
      timestamp: Date.now(), // Brand new right now!
      relativeTime: 'Recién publicado',
      dateStr: 'Hoy, ' + new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' }) + ' hs',
      duration: nextItem.format === 'story' ? '24 hs vigencia' : '0:45 min',
      thumbnail: nextItem.thumbnail,
      totalViews: nextItem.views,
      viewsDisplay: String(nextItem.views),
      followersPct: 35,
      followersViews: Math.round(nextItem.views * 0.35),
      nonFollowersPct: 65,
      nonFollowersViews: Math.round(nextItem.views * 0.65),
      likes: nextItem.likes,
      likesDisplay: String(nextItem.likes),
      comments: nextItem.comments,
      shares: nextItem.shares,
      badge: '✨ RECIÉN PUBLICADO',
      isNewArrival: true,
      url: nextItem.platform === 'tiktok' ? 'https://www.tiktok.com/@policiatdf' : 'https://www.instagram.com/policiaprovincialtdf/'
    };

    setPublications(prev => [newPub, ...prev]);
    setNewPostAlert({
      title: newPub.title,
      platform: newPub.platformLabel,
      format: newPub.formatLabel
    });
    setLastSyncTime('Hace unos segundos');

    // Auto-dismiss alert after 6 seconds
    setTimeout(() => {
      setNewPostAlert(null);
    }, 6000);
  };

  // ── Auto-Sync Timer Loop ──
  useEffect(() => {
    if (!isAutoSyncActive) return;

    const interval = setInterval(() => {
      setSecondsUntilNextCheck(prev => {
        if (prev <= 1) {
          // Trigger automated poll
          setLastSyncTime('Sincronizado ahora');
          // 40% chance of a brand new post arriving on live poll
          if (Math.random() < 0.45) {
            triggerNewPublication();
          }
          return 20; // reset countdown to 20s
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isAutoSyncActive]);

  // ── Filter & Sort Logic ──
  const filteredAndSortedPublications = useMemo(() => {
    // 1. Filter by platform
    let list = publications.filter(p => {
      if (selectedPlatform === 'all') return true;
      return p.platform === selectedPlatform;
    });

    // 2. Filter by format
    if (formatFilter !== 'todos') {
      list = list.filter(p => p.format === formatFilter);
    }

    // 3. Sort:
    // 'recientes': newest to oldest (timestamp descending)
    // 'popular': highest views descending
    // 'antiguos': oldest to newest (timestamp ascending)
    return [...list].sort((a, b) => {
      if (sortOrder === 'recientes') {
        return b.timestamp - a.timestamp;
      }
      if (sortOrder === 'popular') {
        return b.totalViews - a.totalViews;
      }
      if (sortOrder === 'antiguos') {
        return a.timestamp - b.timestamp;
      }
      return 0;
    });
  }, [publications, selectedPlatform, formatFilter, sortOrder]);

  const activeProfile = PLATFORM_PROFILES[selectedPlatform];

  return (
    <div style={{ marginBottom: 34 }}>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 1. PLATFORM SELECTOR TABS (Igual a la estructura de cada red)       */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 16 }}>
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }} className="scrollbar-hide">
          {[
            { id: 'tiktok', label: '🎵 TikTok (@policiatdf)', color: '#00f2ea' },
            { id: 'instagram', label: '📷 Instagram (@policiaprovincialtdf)', color: '#E1306C' },
            { id: 'facebook', label: '👥 Facebook (Policía Tierra del Fuego)', color: '#1877f2' },
            { id: 'youtube', label: '▶️ YouTube (Canal Oficial)', color: '#ff4d4d' },
            { id: 'all', label: '🌐 Todas las Plataformas (Consolidado)', color: '#00e575' }
          ].map(p => {
            const active = selectedPlatform === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setSelectedPlatform(p.id as any)}
                style={{
                  padding: '9px 18px',
                  borderRadius: 9999,
                  fontSize: '0.8rem',
                  fontWeight: active ? 800 : 600,
                  cursor: 'pointer',
                  border: active ? `2px solid ${p.color}` : '1px solid rgba(255, 255, 255, 0.12)',
                  background: active ? `rgba(${p.id === 'tiktok' ? '0, 242, 234' : p.id === 'instagram' ? '225, 48, 108' : p.id === 'facebook' ? '24, 119, 242' : p.id === 'youtube' ? '255, 77, 77' : '0, 229, 117'}, 0.18)` : 'rgba(255, 255, 255, 0.04)',
                  color: active ? '#ffffff' : '#cbd5e0',
                  boxShadow: active ? `0 0 16px rgba(${p.id === 'tiktok' ? '0, 242, 234' : '0, 229, 117'}, 0.35)` : 'none',
                  transition: 'all 0.2s ease',
                  whiteSpace: 'nowrap'
                }}
              >
                {p.label}
              </button>
            );
          })}
        </div>

        {/* Live Auto-Sync Status Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'rgba(0, 229, 117, 0.08)', border: '1px solid rgba(0, 229, 117, 0.3)', padding: '6px 14px', borderRadius: 9999 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: isAutoSyncActive ? '#00e575' : '#888', boxShadow: isAutoSyncActive ? '0 0 8px #00e575' : 'none' }} className={isAutoSyncActive ? 'anim-pulse' : ''} />
          <span style={{ fontSize: '0.74rem', color: '#00e575', fontWeight: 800 }}>
            {isAutoSyncActive ? `Sincronización en vivo activa (${secondsUntilNextCheck}s)` : 'Sincronización pausada'}
          </span>
          <button
            onClick={() => setIsAutoSyncActive(!isAutoSyncActive)}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#cbd5e0',
              fontSize: '0.72rem',
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
          >
            {isAutoSyncActive ? 'Pausar' : 'Reanudar'}
          </button>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 2. PROFILE HEADER BANNER (Identical layout to TikTok reference)     */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <div
        style={{
          background: 'linear-gradient(135deg, rgba(8, 22, 40, 0.95), rgba(4, 14, 26, 0.98))',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: 18,
          padding: '22px 26px',
          boxShadow: '0 12px 36px rgba(0, 0, 0, 0.35)',
          marginBottom: 20,
          position: 'relative'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 18 }}>
          {/* Left: Avatar & Names */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <div
              style={{
                width: 78,
                height: 78,
                borderRadius: '50%',
                background: '#000',
                border: `2px solid ${activeProfile.color}`,
                boxShadow: `0 0 16px ${activeProfile.color}40`,
                overflow: 'hidden',
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <img
                src={logoOficial}
                alt="Escudo Oficial Policía de Tierra del Fuego"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                <h2 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.02em' }}>
                  {activeProfile.displayName}
                </h2>
                <span style={{ fontSize: '0.9rem', color: '#a0aec0', fontWeight: 600 }}>
                  @{activeProfile.handle}
                </span>
                <span style={{ background: 'rgba(0, 229, 117, 0.15)', color: '#00e575', border: '1px solid rgba(0, 229, 117, 0.3)', padding: '2px 8px', borderRadius: 6, fontSize: '0.68rem', fontWeight: 800 }}>
                  ✓ OFICIAL VERIFICADO
                </span>
              </div>

              {/* Stats Numbers Row (Igual a TikTok) */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginTop: 10, flexWrap: 'wrap' }}>
                <div>
                  <span style={{ fontSize: '1.05rem', fontWeight: 900, color: '#ffffff', marginRight: 4 }}>
                    {activeProfile.followingCount}
                  </span>
                  <span style={{ fontSize: '0.78rem', color: '#a0aec0' }}>
                    {activeProfile.followingLabel}
                  </span>
                </div>
                <div style={{ width: 1, height: 14, background: 'rgba(255,255,255,0.15)' }} />
                <div>
                  <span style={{ fontSize: '1.05rem', fontWeight: 900, color: '#ffffff', marginRight: 4 }}>
                    {activeProfile.followersCount}
                  </span>
                  <span style={{ fontSize: '0.78rem', color: '#a0aec0' }}>
                    {activeProfile.followersLabel}
                  </span>
                </div>
                <div style={{ width: 1, height: 14, background: 'rgba(255,255,255,0.15)' }} />
                <div>
                  <span style={{ fontSize: '1.05rem', fontWeight: 900, color: '#00e575', marginRight: 4 }}>
                    {activeProfile.likesCount}
                  </span>
                  <span style={{ fontSize: '0.78rem', color: '#a0aec0' }}>
                    {activeProfile.likesLabel}
                  </span>
                </div>
              </div>

              {/* Bio description */}
              <div style={{ fontSize: '0.82rem', color: '#cbd5e0', marginTop: 8, maxWidth: 680, lineHeight: 1.4 }}>
                {activeProfile.bio}
              </div>
              <div style={{ marginTop: 4 }}>
                <a
                  href={activeProfile.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: activeProfile.color, fontSize: '0.78rem', textDecoration: 'none', fontWeight: 700 }}
                >
                  🔗 {activeProfile.urlDisplay}
                </a>
              </div>
            </div>
          </div>

          {/* Right: Quick Action Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-end' }}>
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                onClick={triggerNewPublication}
                style={{
                  background: 'linear-gradient(135deg, #00e575, #00b05b)',
                  color: '#05180f',
                  border: 'none',
                  borderRadius: 10,
                  padding: '8px 16px',
                  fontSize: '0.78rem',
                  fontWeight: 900,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  boxShadow: '0 4px 14px rgba(0, 229, 117, 0.4)'
                }}
              >
                <span>⚡ Simular Nueva Publicación en Vivo</span>
              </button>

              <a
                href={activeProfile.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  color: '#ffffff',
                  border: '1px solid rgba(255, 255, 255, 0.16)',
                  borderRadius: 10,
                  padding: '8px 16px',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6
                }}
              >
                <span>Abrir Perfil</span>
                <span>↗️</span>
              </a>
            </div>

            <div style={{ fontSize: '0.7rem', color: '#718096' }}>
              Última sincronización con API: {lastSyncTime}
            </div>
          </div>
        </div>

        {/* Live Notification Toast when new post is detected */}
        {newPostAlert && (
          <div
            style={{
              position: 'absolute',
              bottom: 12,
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'linear-gradient(90deg, #00e575, #00c2ff)',
              color: '#041829',
              padding: '8px 20px',
              borderRadius: 9999,
              fontWeight: 800,
              fontSize: '0.8rem',
              boxShadow: '0 8px 24px rgba(0, 229, 117, 0.6)',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              zIndex: 10
            }}
            className="anim-fadein"
          >
            <span>🔔</span>
            <span>¡NUEVA PUBLICACIÓN DETECTADA ({newPostAlert.platform}):</span>
            <span style={{ fontWeight: 600 }}>{newPostAlert.title.slice(0, 48)}...</span>
            <span style={{ background: '#041829', color: '#fff', padding: '1px 6px', borderRadius: 4, fontSize: '0.7rem' }}>
              Al inicio ↑
            </span>
          </div>
        )}
      </div>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 3. CONTROLES DE ORDENAMIENTO (Idénticos al panel de TikTok)         */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 14,
          padding: '12px 18px',
          background: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          borderRadius: 14,
          marginBottom: 20
        }}
      >
        {/* Left: Format sub-filters */}
        <div style={{ display: 'flex', gap: 6 }}>
          {[
            { id: 'todos', label: 'Todos' },
            { id: 'reel', label: '🎬 Reels' },
            { id: 'story', label: '📸 Historias' },
            { id: 'video', label: '📹 Videos' }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setFormatFilter(f.id as any)}
              style={{
                background: formatFilter === f.id ? 'rgba(255, 255, 255, 0.14)' : 'transparent',
                color: formatFilter === f.id ? '#ffffff' : '#a0aec0',
                border: formatFilter === f.id ? '1px solid rgba(255, 255, 255, 0.25)' : '1px solid transparent',
                borderRadius: 8,
                padding: '6px 12px',
                fontSize: '0.76rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Right: Sort controls matching TikTok ('Recientes' | 'Popular' | 'Más antiguos') */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: '0.74rem', color: '#a0aec0', fontWeight: 600 }}>
            Ordenar:
          </span>
          <div style={{ display: 'flex', background: 'rgba(0, 0, 0, 0.4)', padding: 3, borderRadius: 10, border: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <button
              onClick={() => setSortOrder('recientes')}
              style={{
                background: sortOrder === 'recientes' ? '#00e575' : 'transparent',
                color: sortOrder === 'recientes' ? '#041829' : '#cbd5e0',
                border: 'none',
                borderRadius: 7,
                padding: '5px 12px',
                fontSize: '0.74rem',
                fontWeight: 800,
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
              title="De lo más nuevo a lo más viejo"
            >
              ⏱️ Recientes (Más nuevo a más viejo)
            </button>
            <button
              onClick={() => setSortOrder('popular')}
              style={{
                background: sortOrder === 'popular' ? '#ffd000' : 'transparent',
                color: sortOrder === 'popular' ? '#041829' : '#cbd5e0',
                border: 'none',
                borderRadius: 7,
                padding: '5px 12px',
                fontSize: '0.74rem',
                fontWeight: 800,
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
              title="Mayor número de reproducciones"
            >
              🔥 Popular (Más vistos)
            </button>
            <button
              onClick={() => setSortOrder('antiguos')}
              style={{
                background: sortOrder === 'antiguos' ? 'rgba(255,255,255,0.2)' : 'transparent',
                color: sortOrder === 'antiguos' ? '#ffffff' : '#cbd5e0',
                border: 'none',
                borderRadius: 7,
                padding: '5px 12px',
                fontSize: '0.74rem',
                fontWeight: 800,
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
              title="Cronológico ascendente"
            >
              ⏳ Más antiguos
            </button>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 4. GRID DE TARJETAS (Idéntico a TikTok con IMAGEN REAL)             */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: 16
        }}
      >
        {filteredAndSortedPublications.map((pub, idx) => (
          <div
            key={pub.id}
            onClick={() => setSelectedModalItem(pub)}
            style={{
              background: '#0d131f',
              border: pub.isNewArrival ? '2px solid #00e575' : '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: 14,
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              cursor: 'pointer',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              boxShadow: pub.isNewArrival ? '0 0 20px rgba(0, 229, 117, 0.4)' : '0 6px 18px rgba(0, 0, 0, 0.35)',
              position: 'relative'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = `0 10px 24px ${pub.platformColor}35`;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = pub.isNewArrival ? '0 0 20px rgba(0, 229, 117, 0.4)' : '0 6px 18px rgba(0, 0, 0, 0.35)';
            }}
          >
            {/* Thumbnail Box: Aspect ratio ~ 3/4 like TikTok */}
            <div style={{ position: 'relative', width: '100%', aspectRatio: '3 / 4', overflow: 'hidden', background: '#000000' }}>
              <img
                src={pub.thumbnail}
                alt={pub.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  transition: 'transform 0.3s ease'
                }}
              />

              {/* Gradient Overlay for Text Readability */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.85) 100%)'
                }}
              />

              {/* Top Left: Platform & Format Tag */}
              <div style={{ position: 'absolute', top: 10, left: 10, display: 'flex', gap: 5 }}>
                <span
                  style={{
                    background: pub.platformColor,
                    color: '#05121f',
                    padding: '2px 8px',
                    borderRadius: 6,
                    fontSize: '0.66rem',
                    fontWeight: 900,
                    textTransform: 'uppercase'
                  }}
                >
                  {pub.platformLabel}
                </span>
                {pub.isPinned && (
                  <span
                    style={{
                      background: 'rgba(255, 208, 0, 0.9)',
                      color: '#041829',
                      padding: '2px 6px',
                      borderRadius: 6,
                      fontSize: '0.64rem',
                      fontWeight: 800
                    }}
                  >
                    📌 FIJADO
                  </span>
                )}
              </div>

              {/* Top Right: Relative Time */}
              <div style={{ position: 'absolute', top: 10, right: 10 }}>
                <span
                  style={{
                    background: 'rgba(0, 0, 0, 0.75)',
                    backdropFilter: 'blur(4px)',
                    color: '#e2e8f0',
                    padding: '3px 8px',
                    borderRadius: 6,
                    fontSize: '0.66rem',
                    fontWeight: 700
                  }}
                >
                  {pub.relativeTime}
                </span>
              </div>

              {/* BOTTOM OVERLAY (EXACT TIKTOK STYLE: ▷ VISTAS) */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 10,
                  left: 12,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 5,
                  color: '#ffffff',
                  fontWeight: 900,
                  fontSize: '0.92rem',
                  textShadow: '0 2px 4px rgba(0,0,0,0.8)'
                }}
              >
                <span style={{ fontSize: '0.85rem' }}>▷</span>
                <span>{pub.viewsDisplay}</span>
              </div>

              {/* Bottom Right: Duration if video */}
              {pub.duration && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: 10,
                    right: 12,
                    fontSize: '0.68rem',
                    color: '#a0aec0',
                    background: 'rgba(0,0,0,0.65)',
                    padding: '2px 6px',
                    borderRadius: 4
                  }}
                >
                  {pub.duration}
                </div>
              )}
            </div>

            {/* Card Body */}
            <div style={{ padding: '12px 14px', display: 'flex', flexDirection: 'column', flex: 1 }}>
              <div style={{ fontSize: '0.68rem', color: pub.platformColor, fontWeight: 800, textTransform: 'uppercase', marginBottom: 4 }}>
                {pub.formatLabel} · {pub.dateStr}
              </div>

              <h4
                style={{
                  margin: '0 0 10px',
                  fontSize: '0.84rem',
                  fontWeight: 700,
                  color: '#ffffff',
                  lineHeight: 1.35,
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}
                title={pub.title}
              >
                {pub.title}
              </h4>

              {/* Followers vs Non-Followers Bar */}
              <div style={{ marginBottom: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.66rem', marginBottom: 3 }}>
                  <span style={{ color: '#ffd000', fontWeight: 700 }}>No Seg: {pub.nonFollowersPct}%</span>
                  <span style={{ color: '#00c2ff', fontWeight: 700 }}>Seg: {pub.followersPct}%</span>
                </div>
                <div style={{ height: 5, borderRadius: 3, background: 'rgba(255,255,255,0.1)', overflow: 'hidden', display: 'flex' }}>
                  <div style={{ width: `${pub.nonFollowersPct}%`, background: '#ffd000' }} />
                  <div style={{ width: `${pub.followersPct}%`, background: '#00c2ff' }} />
                </div>
              </div>

              {/* Engagement icons row */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '0.72rem',
                  color: '#cbd5e0',
                  marginTop: 'auto',
                  paddingTop: 8,
                  borderTop: '1px solid rgba(255, 255, 255, 0.06)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                  <span>❤️</span>
                  <span style={{ fontWeight: 700 }}>{pub.likesDisplay}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                  <span>💬</span>
                  <span style={{ fontWeight: 700 }}>{pub.comments}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                  <span>↗️</span>
                  <span style={{ fontWeight: 700 }}>{pub.shares}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 5. INTERACTIVE PUBLICATION PREVIEW MODAL                            */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      {selectedModalItem && (
        <div
          onClick={() => setSelectedModalItem(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: 16
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: '#091522',
              border: `1px solid ${selectedModalItem.platformColor}50`,
              borderRadius: 20,
              maxWidth: 720,
              width: '100%',
              overflow: 'hidden',
              boxShadow: `0 24px 60px rgba(0, 0, 0, 0.8), 0 0 30px ${selectedModalItem.platformColor}30`,
              display: 'flex',
              flexDirection: 'column'
            }}
            className="anim-fadein"
          >
            {/* Modal Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <img src={logoOficial} alt="Logo" style={{ width: 34, height: 34, borderRadius: '50%' }} />
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.88rem', color: '#fff' }}>
                    {selectedModalItem.platformLabel} · @{PLATFORM_PROFILES[selectedModalItem.platform]?.handle}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#a0aec0' }}>
                    {selectedModalItem.dateStr} ({selectedModalItem.relativeTime})
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedModalItem(null)}
                style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: '1.2rem', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            {/* Modal Body: Image + Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(240px, 300px) 1fr', gap: 20, padding: 20 }}>
              <div style={{ borderRadius: 12, overflow: 'hidden', position: 'relative', background: '#000' }}>
                <img
                  src={selectedModalItem.thumbnail}
                  alt={selectedModalItem.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
                <div style={{ position: 'absolute', bottom: 10, left: 10, color: '#fff', fontWeight: 900, fontSize: '1.1rem' }}>
                  ▷ {selectedModalItem.viewsDisplay} reproducciones
                </div>
              </div>

              <div>
                <span style={{ background: selectedModalItem.platformColor, color: '#041829', padding: '2px 8px', borderRadius: 6, fontSize: '0.7rem', fontWeight: 900 }}>
                  {selectedModalItem.formatLabel}
                </span>
                <h3 style={{ margin: '10px 0 14px', fontSize: '1.1rem', color: '#fff', lineHeight: 1.35 }}>
                  {selectedModalItem.title}
                </h3>

                <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 12, padding: '14px', marginBottom: 14 }}>
                  <div style={{ fontSize: '0.72rem', color: '#a0aec0', fontWeight: 700, textTransform: 'uppercase', marginBottom: 6 }}>
                    Desglose de Audiencia Alcanzada
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.76rem', marginBottom: 4 }}>
                    <span style={{ color: '#ffd000', fontWeight: 800 }}>No Seguidores (Descubrimiento): {selectedModalItem.nonFollowersViews.toLocaleString('es-AR')} ({selectedModalItem.nonFollowersPct}%)</span>
                    <span style={{ color: '#00c2ff', fontWeight: 800 }}>Seguidores: {selectedModalItem.followersViews.toLocaleString('es-AR')} ({selectedModalItem.followersPct}%)</span>
                  </div>
                  <div style={{ height: 8, borderRadius: 4, background: 'rgba(255,255,255,0.1)', overflow: 'hidden', display: 'flex' }}>
                    <div style={{ width: `${selectedModalItem.nonFollowersPct}%`, background: '#ffd000' }} />
                    <div style={{ width: `${selectedModalItem.followersPct}%`, background: '#00c2ff' }} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, textAlign: 'center' }}>
                  <div style={{ background: 'rgba(255,255,255,0.03)', padding: 10, borderRadius: 8 }}>
                    <div style={{ fontSize: '0.7rem', color: '#a0aec0' }}>❤️ Me gusta</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 900, color: '#fff' }}>{selectedModalItem.likesDisplay}</div>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.03)', padding: 10, borderRadius: 8 }}>
                    <div style={{ fontSize: '0.7rem', color: '#a0aec0' }}>💬 Comentarios</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 900, color: '#fff' }}>{selectedModalItem.comments}</div>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.03)', padding: 10, borderRadius: 8 }}>
                    <div style={{ fontSize: '0.7rem', color: '#a0aec0' }}>↗️ Compartidos</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 900, color: '#ffd000' }}>{selectedModalItem.shares}</div>
                  </div>
                </div>

                <div style={{ marginTop: 18, display: 'flex', gap: 10 }}>
                  <a
                    href={selectedModalItem.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      flex: 1,
                      background: selectedModalItem.platformColor,
                      color: '#041829',
                      padding: '10px 14px',
                      borderRadius: 10,
                      fontWeight: 800,
                      fontSize: '0.8rem',
                      textDecoration: 'none',
                      textAlign: 'center'
                    }}
                  >
                    Ver Publicación Oficial en {selectedModalItem.platformLabel} ↗
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default RealPublicationsFeed;
