import React, { useState } from 'react';
import type { StrategicRecommendation, SocialAccount } from '../types/dashboard';
import { IconAward, IconDownload, IconCheck, IconTrendUp } from './Sidebar';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  recommendations: StrategicRecommendation[];
  accounts?: SocialAccount[];
}

export const ReportModal: React.FC<ReportModalProps> = ({ isOpen, onClose, recommendations }) => {
  const [title, setTitle] = useState('Informe Trimestral de Comunicación Digital — Policía de Tierra del Fuego');
  const [author, setAuthor] = useState('Oficina de Comunicación Institucional (OCI)');
  const [notes, setNotes] = useState('Se destaca la excelente receptividad de las alertas preventivas viales en Ruta Nacional N° 3 y las intervenciones del G.E.B. y R. en zonas agrestes de la provincia.');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const generateContent = () => `# ${title}
**Policía de la Provincia de Tierra del Fuego, Antártida e Islas del Atlántico Sur**
*Web Oficial:* https://policia.tierradelfuego.gob.ar/
*Facebook:* https://www.facebook.com/policiaprovincialtdf
*Instagram:* https://www.instagram.com/policiaprovincialtdf/
*Beacons.ai Hub:* https://beacons.ai/policiatdf
*Preparado por:* ${author}
*Fecha:* ${new Date().toLocaleDateString('es-AR')}

---

## 1. RESUMEN EJECUTIVO — AUDIENCIA DIGITAL CONSOLIDADA
| Canal | Seguidores | Alcance/Mes | Engagement |
|---|---|---|---|
| Facebook (@policiaprovincialtdf) | 32.450 | 185.000 | 6.2% |
| Instagram (@policiaprovincialtdf) | 18.900 | 142.000 | 8.5% |
| Twitter / X (@policiatdf) | 5.200 | 28.000 | 3.4% |
| YouTube (PoliciaProvincialTDF) | 1.850 | 19.500 | 11.2% |
| Portal Web Oficial | Abierto | 62.000 visitas | — |
| Beacons.ai (Hub @policiatdf) | — | 3.200 clics | CTR Top: 38.7% |

## 2. MÉTRICAS CLAVE (KPIs)
- **Audiencia Digital Total:** 58.400+ seguidores (+7.4% mensual)
- **Alcance Ciudadano Mensual:** 389.000 impresiones únicas
- **Interacciones Totales:** 42.800 (Likes, Compartidos, Comentarios)
- **Índice de Sentimiento Favorable:** 91.8%
- **Clics en Beacons.ai:** 3.200 (+22.5%)

## 3. DISTRIBUCIÓN DEMOGRÁFICA
- Río Grande: 46% de la audiencia (~23.600 seguidores)
- Ushuaia: 42% (~21.500 seguidores)
- Tolhuin: 8% (~4.100 seguidores)
- Otras Provincias / Exterior: 4%

## 4. BEACONS.AI — ANÁLISIS DE CONVERSIÓN
Links más clickeados:
1. 🌐 Sitio Web Oficial: 1.240 clics (38.7% CTR)
2. 📘 Facebook Oficial: 820 clics (25.6% CTR)
3. 📸 Instagram Oficial: 640 clics (20.0% CTR)

## 5. OBSERVACIONES Y CONTEXTO
${notes}

## 6. RECOMENDACIONES ESTRATÉGICAS (OCI)
${recommendations.map(r => `### [${r.priority}] ${r.title}
- **Plataforma:** ${r.targetPlatform}
- **Impacto Esperado:** ${r.impact}
- **Descripción:** ${r.description}`).join('\n\n')}

---
*Policía de Tierra del Fuego, AeIAS — Emergencias: 101*`;

  const handleDownload = () => {
    const content = generateContent();
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Informe_Redes_Sociales_TDF_${new Date().toISOString().slice(0, 10)}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateContent());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        {/* Modal Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, paddingBottom: 16, borderBottom: '1px solid var(--border-subtle)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ padding: 10, borderRadius: 12, background: 'var(--neon-bg)', border: '1px solid var(--border-neon)', color: 'var(--text-neon)' }}>
              <IconAward />
            </div>
            <div>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1rem', color: 'var(--text-primary)' }}>
                Generador de Informe Ejecutivo
              </h2>
              <p style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Exportar diagnóstico estratégico de redes sociales</p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{ padding: 8, borderRadius: 8, border: 'none', background: 'rgba(255,255,255,0.05)', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '1rem' }}
          >✕</button>
        </div>

        {/* Form */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 20 }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 6 }}>Título del Informe</label>
            <input value={title} onChange={e => setTitle(e.target.value)} className="input-dark" />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 6 }}>Elaborado por</label>
              <input value={author} onChange={e => setAuthor(e.target.value)} className="input-dark" />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 6 }}>Período</label>
              <input value="Trimestre Invierno 2026" disabled className="input-dark" style={{ opacity: 0.5, cursor: 'not-allowed' }} />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 6 }}>Observaciones y Notas Estratégicas</label>
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              rows={3}
              className="input-dark"
              style={{ resize: 'vertical', lineHeight: 1.5 }}
            />
          </div>
        </div>

        {/* Recommendations Preview */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-neon)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
            <IconAward /> {recommendations.length} Recomendaciones OCI Incluidas
          </div>
          <div style={{ maxHeight: 180, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 6 }}>
            {recommendations.map(r => (
              <div key={r.id} style={{ padding: '8px 12px', borderRadius: 9, background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-primary)' }}>{r.title}</div>
                  <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{r.targetPlatform}</div>
                </div>
                <span className={`badge ${r.priority === 'Alta' ? 'badge-neon' : 'badge-warning'}`}>{r.priority}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', paddingTop: 16, borderTop: '1px solid var(--border-subtle)' }}>
          <button onClick={handleCopy} className="btn-ghost">
            {copied ? <><IconCheck /> Copiado!</> : <><IconTrendUp /> Copiar Markdown</>}
          </button>
          <button onClick={handleDownload} className="btn-neon">
            <IconDownload /> Descargar Informe (.md)
          </button>
        </div>
      </div>
    </div>
  );
};


// ── RECOMMENDATIONS SECTION ────────────────────────────────────────────────────
interface RecommendationsProps {
  recommendations: StrategicRecommendation[];
  onOpenReport: () => void;
}

export const RecommendationsSection: React.FC<RecommendationsProps> = ({ recommendations, onOpenReport }) => {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, marginBottom: 20 }}>
        <div>
          <h2 className="section-title"><IconAward />Plan de Optimización Estratégica — OCI</h2>
          <p className="section-subtitle">Recomendaciones para potenciar Facebook, Instagram, Beacons.ai y Portal Oficial</p>
        </div>
        <button onClick={onOpenReport} className="btn-neon">
          <IconDownload /> Exportar Informe Completo
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
        {recommendations.map(rec => (
          <div key={rec.id} className="card" style={{ padding: 20, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <span className={`badge ${rec.priority === 'Alta' ? 'badge-neon' : 'badge-warning'}`}>
                  Prioridad {rec.priority}
                </span>
                <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontFamily: 'monospace', textAlign: 'right', maxWidth: 130, lineHeight: 1.4 }}>
                  {rec.targetPlatform}
                </span>
              </div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.88rem', color: 'var(--text-primary)', marginBottom: 8 }}>{rec.title}</h3>
              <p style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 14 }}>{rec.description}</p>
            </div>
            <div style={{ padding: '8px 12px', borderRadius: 9, background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.7rem' }}>
              <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Impacto Esperado:</span>
              <span style={{ color: 'var(--success)', fontWeight: 800 }}>{rec.impact}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
