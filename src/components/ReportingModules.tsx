import React, { useState } from 'react';
import type { SocialPost, SocialAccount } from '../types/dashboard';
import { HASHTAG_POSTS, HASHTAG_STATS, OCI_ROLES } from '../data/institutionalData';
import {
  IconAward, IconDownload, IconCheck, IconEye, IconHeart, IconShare,
  IconMessageSq, IconExternalLink, IconSearch, IconFilter, IconFacebook,
  IconInstagram, IconTwitter, IconGlobe, IconShield, IconBarChart
} from './Sidebar';

// ── 1. INFORME INSTITUCIONAL ──────────────────────────────────────────────────
interface InformeProps {
  accounts: SocialAccount[];
  posts: SocialPost[];
}

export const InformeInstitucionalSection: React.FC<InformeProps> = ({ accounts, posts }) => {
  const [period, setPeriod] = useState('Agosto 2026');
  const [copied, setCopied] = useState(false);

  const totalFollowers = accounts.reduce((acc, a) => acc + a.followers, 0);
  const totalReach = accounts.reduce((acc, a) => acc + a.monthlyReach, 0);
  const totalPosts = accounts.reduce((acc, a) => acc + a.monthlyPosts, 0);

  const handlePrint = () => {
    window.print();
  };

  const handleCopyMD = () => {
    const text = `# INFORME EJECUTIVO DE COMUNICACIÓN DIGITAL
**Policía de la Provincia de Tierra del Fuego, Antártida e Islas del Atlántico Sur**
*Período:* ${period}

### AUTORIDADES RESPONSABLES - OFICINA DE INFORMACIÓN INSTITUCIONAL (OCI)
${OCI_ROLES.map(r => `- **${r.city}:** ${r.rank} ${r.name} (${r.department}) - Contacto: ${r.phone || 'N/A'} | ${r.email || ''}`).join('\n')}

---
### MÉTRICAS CONSOLIDADAS
- Audiencia Digital Total: ${totalFollowers.toLocaleString('es-AR')} seguidores
- Alcance Mensual Consolidado: ${totalReach.toLocaleString('es-AR')} impresiones
- Publicaciones Totales (Mes): ${totalPosts} publicaciones
- Hashtag Principal Monitorizado: #PolicíaTDF (1.8M impresiones)

### DESGLOSE POR CANAL
${accounts.map(a => `- **${a.name} (${a.handle}):** ${a.followers.toLocaleString('es-AR')} seg. | ${a.monthlyReach.toLocaleString('es-AR')} alcance/mes | ER: ${a.engagementRate}%`).join('\n')}

---
*Generado automáticamente por el Dashboard de Reportes Institucionales Policía TDF*`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 12, marginBottom: 20 }}>
        <div>
          <h2 className="section-title"><IconAward />Informe Institucional Consolidado (Metricool Studio TDF)</h2>
          <p className="section-subtitle">Reporte oficial listo para auditoría, Jefatura de Policía y Ministerio de Seguridad</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={handleCopyMD} className="btn-ghost" style={{ fontSize: '0.75rem' }}>
            {copied ? <><IconCheck /> Copiado al portapapeles</> : '📋 Copiar Resumen (MD)'}
          </button>
          <button onClick={handlePrint} className="btn-neon" style={{ fontSize: '0.75rem' }}>
            <IconDownload /> Imprimir / Exportar PDF
          </button>
        </div>
      </div>

      {/* Report Container */}
      <div className="card" style={{ padding: 28, background: '#14111d', border: '1px solid var(--border-neon)' }}>
        {/* Printable Header */}
        <div style={{ borderBottom: '2px solid var(--neon)', paddingBottom: 16, marginBottom: 24, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
              <div style={{ padding: 8, borderRadius: 10, background: 'var(--neon)', color: '#0f0d13' }}>
                <IconShield />
              </div>
              <div>
                <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 900, color: 'var(--text-primary)', margin: 0 }}>
                  POLICÍA DE TIERRA DEL FUEGO, AeIAS
                </h1>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-neon)', fontWeight: 700, letterSpacing: '0.05em' }}>
                  DIRECCIÓN DE COMUNICACIÓN E INFORMACIÓN INSTITUCIONAL
                </div>
              </div>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span className="badge badge-neon" style={{ fontSize: '0.7rem' }}>INFORME OFICIAL</span>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: 4, fontWeight: 700 }}>Período: {period}</div>
          </div>
        </div>

        {/* OCI Roles Box */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 14, marginBottom: 24 }}>
          {OCI_ROLES.map(role => (
            <div key={role.id} style={{ padding: 14, borderRadius: 10, background: 'rgba(204,255,0,0.04)', border: '1px solid rgba(204,255,0,0.2)' }}>
              <div style={{ fontSize: '0.62rem', color: 'var(--text-neon)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>
                {role.department}
              </div>
              <div style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--text-primary)' }}>{role.name}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600 }}>{role.rank} — {role.city}</div>
              <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {role.phone && <span>📞 Tel: {role.phone}</span>}
                {role.email && <span>✉️ {role.email}</span>}
              </div>
            </div>
          ))}
        </div>

        {/* Executive Summary Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14, marginBottom: 28 }}>
          <div style={{ padding: 14, borderRadius: 10, background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Audiencia Digital</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--text-neon)', fontFamily: 'var(--font-heading)' }}>
              {totalFollowers.toLocaleString('es-AR')}
            </div>
            <div style={{ fontSize: '0.65rem', color: 'var(--success)' }}>+7.4% crecimiento mensual</div>
          </div>
          <div style={{ padding: 14, borderRadius: 10, background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Alcance Consolidado</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#60a5fa', fontFamily: 'var(--font-heading)' }}>
              {totalReach.toLocaleString('es-AR')}
            </div>
            <div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)' }}>Impresiones únicas totales</div>
          </div>
          <div style={{ padding: 14, borderRadius: 10, background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Publicaciones Mes</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#f472b6', fontFamily: 'var(--font-heading)' }}>
              {totalPosts}
            </div>
            <div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)' }}>Foco: Historias & Reels</div>
          </div>
          <div style={{ padding: 14, borderRadius: 10, background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Hashtag Oficial</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#4ade80', fontFamily: 'var(--font-heading)' }}>
              #PolicíaTDF
            </div>
            <div style={{ fontSize: '0.65rem', color: 'var(--success)' }}>1.8M impresiones totales</div>
          </div>
        </div>

        {/* Channels Breakdown Table */}
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 12 }}>
          Desglose por Canal Digital
        </h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.75rem', marginBottom: 24 }}>
          <thead>
            <tr style={{ background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid var(--border-subtle)' }}>
              <th style={{ padding: 10, textAlign: 'left' }}>Plataforma</th>
              <th style={{ padding: 10, textAlign: 'left' }}>Handle</th>
              <th style={{ padding: 10, textAlign: 'right' }}>Seguidores</th>
              <th style={{ padding: 10, textAlign: 'right' }}>Alcance Mensual</th>
              <th style={{ padding: 10, textAlign: 'right' }}>Engagement Rate</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map(acc => (
              <tr key={acc.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <td style={{ padding: 10, fontWeight: 700 }}>{acc.name}</td>
                <td style={{ padding: 10, fontFamily: 'monospace', color: 'var(--text-secondary)' }}>{acc.handle}</td>
                <td style={{ padding: 10, textAlign: 'right', fontWeight: 700 }}>{acc.followers > 0 ? acc.followers.toLocaleString('es-AR') : 'Abierto'}</td>
                <td style={{ padding: 10, textAlign: 'right' }}>{acc.monthlyReach.toLocaleString('es-AR')}</td>
                <td style={{ padding: 10, textAlign: 'right', color: 'var(--text-neon)', fontWeight: 800 }}>{acc.engagementRate}%</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Conclusion / Signatures */}
        <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: 20, marginTop: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 20 }}>
          <div style={{ maxWidth: 450, fontSize: '0.7rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            <strong>Conclusión del Informe:</strong> La estrategia digital centrada en la rápida publicación de alertas de seguridad vial y coberturas en video corto (Reels/Historias) por el G.E.B.yR. y Canes K-9 mantiene a la Policía Provincial con un índice de aprobación ciudadana favorable del 91.8%.
          </div>
          <div style={{ display: 'flex', gap: 24, fontSize: '0.65rem', textAlign: 'center' }}>
            <div>
              <div style={{ borderBottom: '1px stroke var(--text-muted)', width: 140, marginBottom: 4 }} />
              <div><strong>Comisario Inspector</strong></div>
              <div>Tec. Gómez, María Laura</div>
              <div style={{ color: 'var(--text-muted)' }}>OCI Río Grande</div>
            </div>
            <div>
              <div style={{ borderBottom: '1px stroke var(--text-muted)', width: 140, marginBottom: 4 }} />
              <div><strong>Comisario</strong></div>
              <div>Tec. Peralta Lopez, David Matías</div>
              <div style={{ color: 'var(--text-muted)' }}>OCI Ushuaia</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


// ── 2. MONITOR DE HASHTAGS (#PolicíaTDF) ──────────────────────────────────────
export const MonitorHashtagsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filtered = HASHTAG_POSTS.filter(p => {
    if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
    return true;
  });

  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ marginBottom: 20 }}>
        <h2 className="section-title"><IconSearch />Monitor de Hashtags (Metricool Hashtag Tracker)</h2>
        <p className="section-subtitle">Seguimiento en tiempo real del hashtag oficial <strong style={{ color: 'var(--text-neon)' }}>#PolicíaTDF</strong></p>
      </div>

      {/* Stats Cards Header */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14, marginBottom: 20 }}>
        <div className="kpi-card">
          <div className="kpi-label">Hashtag Oficial</div>
          <div className="kpi-value" style={{ color: 'var(--text-neon)' }}>{HASHTAG_STATS.tag}</div>
          <div style={{ fontSize: '0.68rem', color: 'var(--success)' }}>{HASHTAG_STATS.growth} menciones este mes</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Alcance Total Acumulado</div>
          <div className="kpi-value">{HASHTAG_STATS.totalReach.toLocaleString('es-AR')}</div>
          <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Impresiones totales en redes</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Interacciones Totales</div>
          <div className="kpi-value">{(HASHTAG_STATS.totalLikes + HASHTAG_STATS.totalShares).toLocaleString('es-AR')}</div>
          <div style={{ fontSize: '0.68rem', color: 'var(--text-secondary)' }}>Likes + Compartidos</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Día & Hora Pico</div>
          <div className="kpi-value" style={{ fontSize: '1rem', color: '#60a5fa' }}>{HASHTAG_STATS.peakDay} {HASHTAG_STATS.peakHour}</div>
          <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Mayor tasa de uso ciudadano</div>
        </div>
      </div>

      {/* Filter */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        {['all', 'Seguridad Vial', 'Rescate', 'Cadetes', 'Comunidad', 'Ciberdelito', 'Operativo'].map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              padding: '6px 12px', borderRadius: 999, border: 'none', cursor: 'pointer', fontSize: '0.72rem', fontWeight: 700,
              background: selectedCategory === cat ? 'var(--neon)' : 'var(--bg-card)',
              color: selectedCategory === cat ? '#0f0d13' : 'var(--text-secondary)',
              borderWidth: 1, borderStyle: 'solid', borderColor: selectedCategory === cat ? 'var(--neon)' : 'var(--border-subtle)'
            }}
          >
            {cat === 'all' ? 'Todas las Temáticas' : cat}
          </button>
        ))}
      </div>

      {/* Hashtag Posts Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
        {filtered.map(post => (
          <div key={post.id} className="card" style={{ padding: 18, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <span className="badge badge-neon" style={{ fontSize: '0.62rem' }}>{post.category}</span>
                <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{post.date}</span>
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-primary)', lineHeight: 1.5, marginBottom: 14 }}>
                {post.content}
              </p>
            </div>
            <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: 10, display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
              <span style={{ color: '#f472b6', fontWeight: 700 }}>❤️ {post.likes.toLocaleString('es-AR')}</span>
              <span style={{ color: '#60a5fa', fontWeight: 700 }}>🔄 {post.shares.toLocaleString('es-AR')}</span>
              <span style={{ color: 'var(--text-muted)' }}>👁️ {post.reach.toLocaleString('es-AR')}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


// ── 3. RANKING DE PUBLICACIONES ────────────────────────────────────────────────
export const RankingPostsSection: React.FC<{ posts: SocialPost[] }> = ({ posts }) => {
  const [filterFormat, setFilterFormat] = useState<string>('all');

  const sortedPosts = [...posts].sort((a, b) => b.reach - a.reach);
  const filtered = sortedPosts.filter(p => {
    if (filterFormat === 'reels' && p.mediaType !== 'video') return false;
    if (filterFormat === 'historias' && p.mediaType !== 'alert') return false;
    return true;
  });

  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 12, marginBottom: 20 }}>
        <div>
          <h2 className="section-title"><IconBarChart />Ranking de Publicaciones (Top Performance)</h2>
          <p className="section-subtitle">Las publicaciones con mayor impacto, impresiones e interacción</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {[
            { id: 'all', label: 'Todos' },
            { id: 'reels', label: 'Reels / Videos' },
            { id: 'historias', label: 'Historias / Alertas' },
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setFilterFormat(f.id)}
              style={{
                padding: '6px 12px', borderRadius: 999, border: 'none', cursor: 'pointer', fontSize: '0.72rem', fontWeight: 700,
                background: filterFormat === f.id ? 'var(--neon)' : 'var(--bg-card)',
                color: filterFormat === f.id ? '#0f0d13' : 'var(--text-secondary)',
                borderWidth: 1, borderStyle: 'solid', borderColor: filterFormat === f.id ? 'var(--neon)' : 'var(--border-subtle)'
              }}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {filtered.map((post, idx) => (
          <div key={post.id} className="card" style={{ padding: 16, display: 'grid', gridTemplateColumns: '50px 1fr 140px 120px', gap: 16, alignItems: 'center' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.2rem', fontWeight: 900, color: idx === 0 ? 'var(--text-neon)' : 'var(--text-muted)', fontFamily: 'var(--font-heading)' }}>
                #{idx + 1}
              </div>
              {idx === 0 && <span style={{ fontSize: '0.6rem', color: 'var(--text-neon)', fontWeight: 800 }}>TOP 1</span>}
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <span className="badge badge-neon" style={{ fontSize: '0.6rem' }}>{post.categoryLabel}</span>
                <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{post.platform.toUpperCase()} · {post.timeAgo}</span>
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-primary)', fontWeight: 600 }} className="line-clamp-2">
                {post.content}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.62rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Alcance Total</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 900, color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
                {post.reach.toLocaleString('es-AR')}
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.62rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Interacciones</div>
              <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#f472b6' }}>
                ❤️ {(post.likes + post.shares).toLocaleString('es-AR')}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


// ── 4. DASHBOARD POR PLATAFORMA ────────────────────────────────────────────────
export const DashboardPlataformaSection: React.FC<{ accounts: SocialAccount[] }> = ({ accounts }) => {
  const [selectedPlat, setSelectedPlat] = useState<string>('instagram');
  const account = accounts.find(a => a.platform === selectedPlat) || accounts[0];

  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ marginBottom: 20 }}>
        <h2 className="section-title"><IconGlobe />Dashboard Individual por Plataforma</h2>
        <p className="section-subtitle">Análisis detallado de cada canal de la Policía TDF</p>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
        {accounts.map(acc => (
          <button
            key={acc.id}
            onClick={() => setSelectedPlat(acc.platform)}
            style={{
              padding: '8px 16px', borderRadius: 10, border: 'none', cursor: 'pointer', fontSize: '0.78rem', fontWeight: 700,
              background: selectedPlat === acc.platform ? 'var(--neon)' : 'var(--bg-card)',
              color: selectedPlat === acc.platform ? '#0f0d13' : 'var(--text-secondary)',
              borderWidth: 1, borderStyle: 'solid', borderColor: selectedPlat === acc.platform ? 'var(--neon)' : 'var(--border-subtle)'
            }}
          >
            {acc.name}
          </button>
        ))}
      </div>

      {/* Single Platform Detail Card */}
      <div className="card" style={{ padding: 24 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 16, marginBottom: 20 }}>
          <div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              {account.name} ({account.handle})
            </h3>
            <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Canal oficial verificado de la Policía Provincial</p>
          </div>
          <a href={account.url} target="_blank" rel="noopener noreferrer" className="btn-neon" style={{ fontSize: '0.75rem' }}>
            Visitar Perfil <IconExternalLink />
          </a>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
          <div className="kpi-card">
            <div className="kpi-label">Seguidores / Suscriptores</div>
            <div className="kpi-value">{account.followers > 0 ? account.followers.toLocaleString('es-AR') : 'Abierto'}</div>
            <div style={{ fontSize: '0.68rem', color: 'var(--success)' }}>+{account.growthRate}% de crecimiento mensual</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-label">Alcance Mensual</div>
            <div className="kpi-value">{account.monthlyReach.toLocaleString('es-AR')}</div>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-secondary)' }}>Impresiones totales del mes</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-label">Tasa de Engagement</div>
            <div className="kpi-value" style={{ color: 'var(--text-neon)' }}>{account.engagementRate}%</div>
            <div style={{ fontSize: '0.68rem', color: 'var(--success)' }}>Promedio por publicación</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-label">Frecuencia de Publicación</div>
            <div className="kpi-value">{account.monthlyPosts} / mes</div>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Foco principal: Historias y Reels</div>
          </div>
        </div>
      </div>
    </div>
  );
};
