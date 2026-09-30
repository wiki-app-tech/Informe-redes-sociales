import React, { useState } from 'react';
import { IconDownload, IconCheck, IconAward, IconTrendUp, IconGlobe } from './Sidebar';

export const ReportGeneratorWizard: React.FC = () => {
  const [step, setStep] = useState(1);
  const [selectedPlatforms, setSelectedPlatforms] = useState(['instagram', 'facebook', 'tiktok', 'ga4']);
  const [selectedMetrics, setSelectedMetrics] = useState(['reach', 'engagement', 'clicks', 'conversions']);
  const [format, setFormat] = useState<'pdf' | 'excel'>('pdf');
  const [period, setPeriod] = useState('Últimos 30 días');
  const [clientName, setClientName] = useState('Policía de Tierra del Fuego');
  const [accentColor, setAccentColor] = useState('#ccff00');
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [aiInsights, setAiInsights] = useState<string[]>([]);
  const [reportReady, setReportReady] = useState(false);

  const togglePlatform = (p: string) => {
    setSelectedPlatforms(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]);
  };

  const toggleMetric = (m: string) => {
    setSelectedMetrics(prev => prev.includes(m) ? prev.filter(x => x !== m) : [...prev, m]);
  };

  const handleGenerateAI = () => {
    setIsGeneratingAI(true);
    setTimeout(() => {
      setAiInsights([
        "📸 **Instagram Profile Audit (@policiaprovincialtdf)**: Quality Score 91.4/100 (Grado A), tasa de engagement del 8.52% (+305% vs media sector público) y solo 5.8% de bots.",
        "🚀 **Crecimiento Excepcional**: El alcance en Instagram Reels aumentó un +34.2% impulsado por contenidos del G.E.B.yR. y partes viales de Paso Garibaldi.",
        "📊 **Optimización de Presupuesto**: Las campañas en Meta Ads redujeron su costo por clic (CPC) a $0.04 USD.",
        "⚠️ **Recomendación Estratégica**: Implementar Historias Destacadas fijas para trámites del 101 y certificados.",
        "📍 **Geolocalización TDF**: Río Grande (44.2%) y Ushuaia (38.6%) concentran el 82.8% de la interacción total en Instagram."
      ]);
      setIsGeneratingAI(false);
    }, 1200);
  };

  const handleCreateReport = () => {
    setReportReady(true);
  };

  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ marginBottom: 20 }}>
        <h2 className="section-title">📄 Generador de Informes Automáticos (Wizard)</h2>
        <p className="section-subtitle">Construcción de reportes personalizados en PDF y Excel con Insights de IA de Antigravity Agent</p>
      </div>

      {/* Steps Indicator */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 24 }}>
        {[
          { num: 1, title: '1. Plataformas y Métricas' },
          { num: 2, title: '2. Período y Formato' },
          { num: 3, title: '3. Branding y Preview' },
        ].map(s => (
          <button
            key={s.num}
            onClick={() => setStep(s.num)}
            style={{
              padding: '12px 14px', borderRadius: 10, border: 'none', cursor: 'pointer', textAlign: 'left',
              background: step === s.num ? 'var(--neon-bg)' : 'var(--bg-card)',
              color: step === s.num ? 'var(--text-neon)' : 'var(--text-secondary)',
              borderWidth: 1, borderStyle: 'solid', borderColor: step === s.num ? 'var(--border-neon)' : 'var(--border-subtle)',
              fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '0.8rem'
            }}
          >
            {s.title}
          </button>
        ))}
      </div>

      {/* STEP 1 */}
      {step === 1 && (
        <div className="card" style={{ padding: 24 }}>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1rem', color: 'var(--text-primary)', marginBottom: 16 }}>
            Paso 1: Seleccionar Canales y Métricas Incluidas
          </h3>

          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 8 }}>Plataformas:</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {['instagram', 'facebook', 'tiktok', 'twitter', 'linkedin', 'youtube', 'ga4', 'meta_ads', 'google_ads'].map(p => (
                <button
                  key={p}
                  onClick={() => togglePlatform(p)}
                  className={selectedPlatforms.includes(p) ? 'btn-neon' : 'btn-ghost'}
                  style={{ fontSize: '0.72rem' }}
                >
                  {selectedPlatforms.includes(p) && '✓ '} {p.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 8 }}>Métricas Clave:</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {['reach', 'impressions', 'engagement', 'clicks', 'conversions', 'spend', 'top_posts', 'instagram_audit'].map(m => (
                <button
                  key={m}
                  onClick={() => toggleMetric(m)}
                  className={selectedMetrics.includes(m) ? 'btn-neon' : 'btn-ghost'}
                  style={{ fontSize: '0.72rem' }}
                >
                  {selectedMetrics.includes(m) && '✓ '} {m === 'instagram_audit' ? 'AUDITORÍA INSTAGRAM (FQS / SENTIMIENTO)' : m.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <button onClick={() => setStep(2)} className="btn-neon">Siguiente: Período y Formato →</button>
        </div>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <div className="card" style={{ padding: 24 }}>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1rem', color: 'var(--text-primary)', marginBottom: 16 }}>
            Paso 2: Período de Datos y Formato de Exportación
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 6 }}>Rango Temporal</label>
              <select value={period} onChange={e => setPeriod(e.target.value)} className="input-dark">
                <option value="Últimos 7 días">Últimos 7 días</option>
                <option value="Últimos 30 días">Últimos 30 días</option>
                <option value="Este Mes">Este Mes (Agosto 2026)</option>
                <option value="Trimestral">Último Trimestre</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 6 }}>Formato de Salida</label>
              <div style={{ display: 'flex', gap: 10 }}>
                <button
                  onClick={() => setFormat('pdf')}
                  className={format === 'pdf' ? 'btn-neon' : 'btn-ghost'}
                  style={{ flex: 1, justifyContent: 'center' }}
                >
                  📕 Documento PDF
                </button>
                <button
                  onClick={() => setFormat('excel')}
                  className={format === 'excel' ? 'btn-neon' : 'btn-ghost'}
                  style={{ flex: 1, justifyContent: 'center' }}
                >
                  📊 Planilla Excel (.xlsx)
                </button>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12 }}>
            <button onClick={() => setStep(1)} className="btn-ghost">← Volver</button>
            <button onClick={() => setStep(3)} className="btn-neon">Siguiente: Branding →</button>
          </div>
        </div>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <div className="card" style={{ padding: 24 }}>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1rem', color: 'var(--text-primary)', marginBottom: 16 }}>
            Paso 3: Personalizar Template, Branding e Insights de IA
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 6 }}>Nombre del Cliente / Institución</label>
              <input value={clientName} onChange={e => setClientName(e.target.value)} className="input-dark" />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 6 }}>Color de Acento</label>
              <input type="color" value={accentColor} onChange={e => setAccentColor(e.target.value)} style={{ width: '100%', height: 38, border: 'none', borderRadius: 8, cursor: 'pointer', background: 'transparent' }} />
            </div>
          </div>

          {/* AI Insights Engine Trigger */}
          <div style={{ padding: 16, borderRadius: 12, background: 'rgba(204,255,0,0.05)', border: '1px solid rgba(204,255,0,0.2)', marginBottom: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <div>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-neon)' }}>✨ Insights Automáticos con IA Agent (Gemini 2.5)</h4>
                <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Analiza patrones, detecta anomalías y añade recomendaciones estratégicas al informe</p>
              </div>
              <button onClick={handleGenerateAI} disabled={isGeneratingAI} className="btn-neon" style={{ fontSize: '0.75rem' }}>
                {isGeneratingAI ? 'Procesando...' : 'Generar Insights con IA'}
              </button>
            </div>

            {aiInsights.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 12, borderTop: '1px solid var(--border-subtle)', paddingTop: 12 }}>
                {aiInsights.map((ins, i) => (
                  <div key={i} style={{ fontSize: '0.75rem', color: 'var(--text-primary)', lineHeight: 1.5 }}>
                    {ins}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={{ display: 'flex', gap: 12 }}>
            <button onClick={() => setStep(2)} className="btn-ghost">← Volver</button>
            <button onClick={handleCreateReport} className="btn-neon">
              🚀 Generar y Descargar Informe ({format.toUpperCase()})
            </button>
          </div>

          {reportReady && (
            <div style={{ marginTop: 20, padding: 14, borderRadius: 10, background: 'var(--neon-bg)', border: '1px solid var(--border-neon)', color: 'var(--text-neon)', fontSize: '0.78rem', fontWeight: 700, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>✅ ¡Informe para "{clientName}" listo para descarga!</span>
              <a href="#" onClick={(e) => { e.preventDefault(); alert(`Descargando Informe_${clientName.replace(/ /g, '_')}.${format}`); }} className="btn-neon" style={{ padding: '4px 12px', fontSize: '0.7rem' }}>
                Descargar Archivo
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
