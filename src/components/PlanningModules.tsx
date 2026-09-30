import React, { useState } from 'react';
import { APPROVAL_ITEMS, PLANNER_ITEMS, OCI_ROLES } from '../data/institutionalData';
import type { ApprovalItem, ApprovalStatus } from '../types/dashboard';
import { IconCheck, IconSearch, IconSiren, IconCar, IconShield, IconAward, IconTrendUp } from './Sidebar';

// ── 1. PLANIFICADOR DE CONTENIDOS ──────────────────────────────────────────────
export const PlanificadorSection: React.FC = () => {
  const [selectedFormat, setSelectedFormat] = useState('all');

  const DAYS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

  const filteredItems = PLANNER_ITEMS.filter(item => {
    if (selectedFormat === 'reels' && item.format !== 'Reel') return false;
    if (selectedFormat === 'historias' && item.format !== 'Historia') return false;
    return true;
  });

  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 12, marginBottom: 20 }}>
        <div>
          <h2 className="section-title">📅 Planificador de Contenidos (Calendar OCI)</h2>
          <p className="section-subtitle">Programación semanal con foco prioritario en <strong style={{ color: 'var(--text-neon)' }}>Historias y Reels</strong></p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {[
            { id: 'all', label: 'Todos los formatos' },
            { id: 'reels', label: '🎬 Solo Reels' },
            { id: 'historias', label: '📲 Solo Historias' },
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setSelectedFormat(f.id)}
              style={{
                padding: '6px 12px', borderRadius: 999, border: 'none', cursor: 'pointer', fontSize: '0.72rem', fontWeight: 700,
                background: selectedFormat === f.id ? 'var(--neon)' : 'var(--bg-card)',
                color: selectedFormat === f.id ? '#0f0d13' : 'var(--text-secondary)',
                borderWidth: 1, borderStyle: 'solid', borderColor: selectedFormat === f.id ? 'var(--neon)' : 'var(--border-subtle)'
              }}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Calendar Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 10, overflowX: 'auto' }}>
        {DAYS.map((day, dayIdx) => {
          const itemsForDay = filteredItems.filter(i => i.day === dayIdx);
          return (
            <div key={day} style={{ background: 'var(--bg-card)', borderRadius: 12, border: '1px solid var(--border-subtle)', padding: 10, minHeight: 280 }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-primary)', borderBottom: '1px solid var(--border-subtle)', paddingBottom: 6, marginBottom: 8, textAlign: 'center', fontFamily: 'var(--font-heading)' }}>
                {day}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {itemsForDay.length === 0 ? (
                  <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textAlign: 'center', padding: '20px 0' }}>Libre</div>
                ) : (
                  itemsForDay.map(item => (
                    <div
                      key={item.id}
                      style={{
                        padding: 8, borderRadius: 8, background: 'rgba(255,255,255,0.03)',
                        borderLeft: `3px solid ${item.color}`, fontSize: '0.68rem'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                        <span style={{ fontWeight: 800, color: item.color }}>{item.hour}:00 hs</span>
                        <span className={`badge ${item.format === 'Reel' ? 'badge-neon' : 'badge-fb'}`} style={{ fontSize: '0.52rem', padding: '1px 4px' }}>{item.format}</span>
                      </div>
                      <div style={{ color: 'var(--text-secondary)', fontWeight: 600, lineHeight: 1.3 }}>
                        {item.content}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};


// ── 2. SISTEMA DE APROBACIÓN OCI ─────────────────────────────────────────────
export const SistemaAprobacionSection: React.FC = () => {
  const [items, setItems] = useState<ApprovalItem[]>(APPROVAL_ITEMS);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filtered = items.filter(i => {
    if (filterStatus !== 'all' && i.status !== filterStatus) return false;
    return true;
  });

  const handleApprove = (id: string) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, status: 'aprobado' as ApprovalStatus, notes: 'Aprobado por OCI.' } : item));
  };

  const handleReject = (id: string) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, status: 'rechazado' as ApprovalStatus, notes: 'Rechazado: solicitar corrección de contenido.' } : item));
  };

  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ marginBottom: 20 }}>
        <h2 className="section-title">🛡️ Sistema de Aprobación OCI</h2>
        <p className="section-subtitle">Flujo de revisión de la Oficina de Información Institucional (Río Grande & Ushuaia)</p>
      </div>

      {/* Responsible Officers Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 14, marginBottom: 20 }}>
        {OCI_ROLES.map(role => (
          <div key={role.id} className="card" style={{ padding: 14, borderLeft: '4px solid var(--neon)' }}>
            <div style={{ fontSize: '0.65rem', color: 'var(--text-neon)', fontWeight: 800, textTransform: 'uppercase' }}>Aprobador Oficial — {role.city}</div>
            <div style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--text-primary)', marginTop: 2 }}>{role.name}</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>{role.rank}</div>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: 4 }}>✉️ {role.email}</div>
          </div>
        ))}
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        {['all', 'revision', 'aprobado', 'borrador', 'publicado', 'rechazado'].map(st => (
          <button
            key={st}
            onClick={() => setFilterStatus(st)}
            style={{
              padding: '6px 12px', borderRadius: 999, border: 'none', cursor: 'pointer', fontSize: '0.72rem', fontWeight: 700,
              background: filterStatus === st ? 'var(--neon)' : 'var(--bg-card)',
              color: filterStatus === st ? '#0f0d13' : 'var(--text-secondary)',
              borderWidth: 1, borderStyle: 'solid', borderColor: filterStatus === st ? 'var(--neon)' : 'var(--border-subtle)'
            }}
          >
            {st === 'all' ? 'Todos los Estados' : st.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Workflow Items List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {filtered.map(item => (
          <div key={item.id} className="card" style={{ padding: 18 }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span className={`badge ${item.mediaType === 'reel' ? 'badge-neon' : 'badge-fb'}`}>{item.mediaType.toUpperCase()}</span>
                <span style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--text-primary)' }}>{item.title}</span>
              </div>
              <span className={`badge ${item.status === 'aprobado' ? 'badge-success' : item.status === 'revision' ? 'badge-warning' : item.status === 'rechazado' ? 'badge-danger' : 'badge-info'}`}>
                {item.status.toUpperCase()}
              </span>
            </div>

            <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: 12 }}>
              {item.content}
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 12, fontSize: '0.68rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border-subtle)', paddingTop: 10 }}>
              <div>
                <span>✍️ Autor: {item.author}</span> · <span>🗓 Programado: {item.scheduledAt}</span>
              </div>
              {item.status === 'revision' && (
                <div style={{ display: 'flex', gap: 8 }}>
                  <button onClick={() => handleReject(item.id)} className="btn-danger" style={{ padding: '4px 10px', fontSize: '0.65rem' }}>
                    ❌ Rechazar
                  </button>
                  <button onClick={() => handleApprove(item.id)} className="btn-neon" style={{ padding: '4px 10px', fontSize: '0.65rem' }}>
                    ✅ Aprobar Publicación
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


// ── 3. ASISTENTE IA PARA CONTENIDOS ────────────────────────────────────────────
export const AsistenteIASection: React.FC = () => {
  const [topic, setTopic] = useState('vial');
  const [city, setCity] = useState('Río Grande');
  const [generatedText, setGeneratedText] = useState('');
  const [copied, setCopied] = useState(false);

  const generateAlert = () => {
    let text = '';
    if (topic === 'vial') {
      text = `🚗❄️ ALERTA DE SEGURIDAD VIAL – POLICÍA DE TIERRA DEL FUEGO
Ubicación: ${city} y tramo Ruta Nacional N° 3.
Condición: Calzada con formación de escarcha/hielo.

⚠️ Uso de cubiertas con clavo o sílice OBLIGATORIO.
Mantenga distancia de frenado y reduzca la velocidad.
Emergencias Policiales: 📞 Call 101.

#PolicíaTDF #SeguridadVial #TierraDelFuego`;
    } else if (topic === 'rescate') {
      text = `🏔️ OPERATIVO DE BÚSQUEDA Y RESCATE – GEBYR POLICÍA TDF
Zona: ${city} / Sector agreste.

El Grupo de Especialistas en Búsqueda y Rescate (GEBYR) recuerda a la población:
1. Registrarse en la app/web antes de ingresar al sendero.
2. Portar indumentaria adecuada para bajas temperaturas.
3. No alejarse de las huellas señalizadas.

#PolicíaTDF #GEBYR #Rescate #Prevención`;
    } else {
      text = `⚠️ PREVENCIÓN CIBERDELITO – COMUNICADO OFICIAL OCI (${city})

Informamos a la comunidad que la Policía Provincial NUNCA solicitará claves, tokens ni transferencias bancarias por teléfono o WhatsApp.

Ante cualquier llamado sospechoso: CORTÁ Y LLAMÁ AL 101.

#PolicíaTDF #Ciberdelito #PrevencionDigital`;
    }
    setGeneratedText(text);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ marginBottom: 20 }}>
        <h2 className="section-title">🤖 Asistente de IA para Comunicados OCI</h2>
        <p className="section-subtitle">Generador automático de comunicados institucionales optimizados para Historias y Reels</p>
      </div>

      <div className="card" style={{ padding: 24 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14, marginBottom: 20 }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 6 }}>Categoría del Comunicado</label>
            <select value={topic} onChange={e => setTopic(e.target.value)} className="input-dark">
              <option value="vial">🚗 Alerta Seguridad Vial (RN3 / Hielo)</option>
              <option value="rescate">🏔️ Recomendación Búsqueda y Rescate GEBYR</option>
              <option value="ciberdelito">⚠️ Alerta Ciberestafas y Prevención Digital</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 6 }}>Jurisdicción / Ciudad</label>
            <select value={city} onChange={e => setCity(e.target.value)} className="input-dark">
              <option value="Río Grande">Río Grande</option>
              <option value="Ushuaia">Ushuaia</option>
              <option value="Tolhuin">Tolhuin</option>
              <option value="Toda la Provincia">Toda la Provincia</option>
            </select>
          </div>
        </div>

        <button onClick={generateAlert} className="btn-neon" style={{ width: '100%', justifyContent: 'center', marginBottom: 20 }}>
          ✨ Generar Texto del Comunicado con IA
        </button>

        {generatedText && (
          <div>
            <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-neon)', marginBottom: 6 }}>Resultado Generado (Listo para copiar):</label>
            <textarea value={generatedText} readOnly rows={7} className="input-dark" style={{ fontFamily: 'monospace', fontSize: '0.78rem', lineHeight: 1.5, marginBottom: 12 }} />
            <button onClick={handleCopy} className="btn-ghost">
              {copied ? <><IconCheck /> Copiado!</> : '📋 Copiar Texto'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};


// ── 4. WORKFLOW HISTORIAS Y REELS ──────────────────────────────────────────────
export const AlertasReelsSection: React.FC = () => {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ marginBottom: 20 }}>
        <h2 className="section-title">🎬 Formatos Prioritarios: Historias y Reels</h2>
        <p className="section-subtitle">Plantillas y estrategia de contenido micro-video de la Policía TDF</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
        <div className="card" style={{ padding: 20, borderLeft: '4px solid #f472b6' }}>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: 6 }}>
            📲 Historias en Vivo (FB + IG)
          </h3>
          <p style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: 12 }}>
            Ideal para alertas viales urgentes (Hielo en RN3, corte de ruta, rescate en marcha). Formato efímero de máxima visibilidad en las primeras 2 horas.
          </p>
          <div style={{ fontSize: '0.68rem', color: 'var(--text-neon)', fontWeight: 700 }}>
            ⚡ Frecuencia recomendada: 2 a 5 historias por día en temporada invernal.
          </div>
        </div>

        <div className="card" style={{ padding: 20, borderLeft: '4px solid var(--neon)' }}>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: 6 }}>
            🎥 Reels y Shorts Verticales (15s - 30s)
          </h3>
          <p style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: 12 }}>
            Utilizado para demostraciones del GEBYR en montaña, entrenamientos de la Sección Canes K-9 y convocatorias de Cadetes. Alcanza a público joven no seguidor.
          </p>
          <div style={{ fontSize: '0.68rem', color: 'var(--text-neon)', fontWeight: 700 }}>
            📈 Engagement promedio: 8.5% (El más alto de todos los formatos).
          </div>
        </div>
      </div>
    </div>
  );
};
