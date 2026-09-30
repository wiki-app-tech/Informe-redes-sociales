import React, { useState } from 'react';
import type { StrategicRecommendation } from '../types/dashboard';
import {
  DownloadIcon,
  ShieldIcon,
  CheckCircleIcon,
  AwardIcon,
  TrendingUpIcon
} from './Icons';

interface ReportGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  recommendations: StrategicRecommendation[];
}

export const ReportGeneratorModal: React.FC<ReportGeneratorModalProps> = ({
  isOpen,
  onClose,
  recommendations
}) => {
  const [reportTitle, setReportTitle] = useState('Informe Trimestral de Comunicación Digital - Policía de Tierra del Fuego');
  const [preparedBy, setPreparedBy] = useState('Oficina de Comunicación Institucional (OCI)');
  const [notes, setNotes] = useState('Se destaca la excelente receptividad de las alertas preventivas viales en Ruta Nacional N° 3 y las intervenciones del G.E.B. y R.');
  const [isCopied, setIsCopied] = useState(false);

  if (!isOpen) return null;

  const generateMarkdownReport = () => {
    return `# ${reportTitle}
**Policía de la Provincia de Tierra del Fuego, Antártida e Islas del Atlántico Sur**
*Sitio Web Oficial:* https://policia.tierradelfuego.gob.ar/
*Facebook Oficial:* https://www.facebook.com/policiaprovincialtdf
*Instagram Oficial:* https://www.instagram.com/policiaprovincialtdf/
*Preparado por:* ${preparedBy}
*Fecha de Emisión:* ${new Date().toLocaleDateString('es-AR')}

---

## 1. RESUMEN EJECUTIVO Y AUDIENCIA CONSOLIDADA
- **Audiencia Total Digital:** 58.400+ seguidores (Facebook, Instagram, X)
- **Alcance Ciudadano Mensual:** 389.000 impresiones únicas
- **Interacciones Totales (Likes, Shares, Comments):** 42.800
- **Índice de Sentimiento Favorable:** 91.8%
- **Consultas Ciudadanas Atendidas:** 1.450 mensajes orientados a trámites y prevención

## 2. DESGLOSE POR CANAL DIGITAL
- **Facebook (@policiaprovincialtdf):** 32.450 seguidores | Alcance 185.000/mes | Engagement 6.2%
- **Instagram (@policiaprovincialtdf):** 18.900 seguidores | Alcance 142.000/mes | Engagement 8.5%
- **Portal Web Oficial (policia.tierradelfuego.gob.ar):** 62.000 visitas/mes
- **Twitter / X (@policiatdf):** 5.200 seguidores
- **YouTube (PoliciaProvincialTDF):** 1.850 suscriptores

## 3. NOTAS DE COMUNICACIÓN E IMPACTO
${notes}

## 4. RECOMENDACIONES ESTRATÉGICAS COMUNICACIONALES
${recommendations.map(r => `### [Prioridad ${r.priority}] ${r.title}\n- **Canal Objetivo:** ${r.targetPlatform}\n- **Impacto Esperado:** ${r.impact}\n- **Detalle:** ${r.description}`).join('\n\n')}

---
*Policía de Tierra del Fuego, Antártida e Islas del Atlántico Sur - Emergencias 101*
`;
  };

  const handleDownload = () => {
    const content = generateMarkdownReport();
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Informe_Redes_Sociales_Policia_TDF_${new Date().toISOString().slice(0,10)}.md`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopy = () => {
    const content = generateMarkdownReport();
    navigator.clipboard.writeText(content);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="glass-panel w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 md:p-8 rounded-3xl border border-amber-500/30 shadow-2xl relative">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400">
              <ShieldIcon className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Generador de Informe Ejecutivo de Redes Sociales
              </h2>
              <p className="text-xs text-muted">Exporte el diagnóstico estratégico en formato estructurado</p>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Form Inputs */}
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Título del Informe</label>
            <input
              type="text"
              value={reportTitle}
              onChange={(e) => setReportTitle(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white text-xs focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Elaborado por</label>
              <input
                type="text"
                value={preparedBy}
                onChange={(e) => setPreparedBy(e.target.value)}
                className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-white/10 text-white text-xs focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Período de Análisis</label>
              <input
                type="text"
                value="Trimestre Invierno 2026"
                disabled
                className="w-full px-4 py-2 rounded-xl bg-slate-900 border border-white/5 text-slate-400 text-xs cursor-not-allowed"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Observaciones & Notas Estratégicas</label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white text-xs focus:outline-none focus:border-amber-500"
            ></textarea>
          </div>
        </div>

        {/* Strategic Recommendations Preview */}
        <div className="mb-6">
          <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <AwardIcon className="w-4 h-4" /> Recomendaciones Estratégicas Incluidas ({recommendations.length})
          </h3>
          
          <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
            {recommendations.map((rec) => (
              <div key={rec.id} className="p-3 rounded-xl bg-slate-950/80 border border-white/5 text-xs flex justify-between items-start gap-3">
                <div>
                  <div className="font-bold text-white mb-0.5">{rec.title}</div>
                  <div className="text-slate-300 line-clamp-1">{rec.description}</div>
                </div>
                <span className="badge badge-gold shrink-0">{rec.priority}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-white/10">
          <button
            onClick={handleCopy}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-all flex items-center justify-center gap-2"
          >
            {isCopied ? <CheckCircleIcon className="w-4 h-4 text-emerald-400" /> : <TrendingUpIcon className="w-4 h-4" />}
            {isCopied ? '¡Copiado al Portapapeles!' : 'Copiar Texto Markdown'}
          </button>

          <button
            onClick={handleDownload}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-extrabold transition-all shadow-lg flex items-center justify-center gap-2"
          >
            <DownloadIcon className="w-4 h-4" />
            Descargar Archivo del Informe (.md)
          </button>
        </div>
      </div>
    </div>
  );
};
