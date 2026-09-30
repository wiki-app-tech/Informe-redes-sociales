# Social Analytics 360 & Dashboard OCI Policía TDF

Plataforma unificada de inteligencia digital, analítica multi-canal, monitoreo en tiempo real e informes automatizados con Inteligencia Artificial para la **Oficina de Comunicación Institucional (OCI)** de la **Policía de Tierra del Fuego, Antártida e Islas del Atlántico Sur**.

---

## 🚀 Módulos Principales (Enterprise Suite)

1. **⚡ Monitoreo en Tiempo Real (GA4 API Direct / MCP)**
   - Usuarios activos en tiempo real con contador en vivo y refresco automático cada 30 segundos.
   - Gráficos de tráfico minuto a minuto, mapa de calor de páginas más visitadas y log de eventos en vivo.

2. **📊 Analytics Multi-Plataforma Unificado**
   - Consolidación de métricas orgánicas y pauta publicitaria: Instagram, TikTok, Facebook, X/Twitter, LinkedIn, YouTube, Web GA4, Meta Ads y Google Ads.
   - Matriz unificada de Alcance, Impresiones, Clicks, Engagement Rate e Inversión.

3. **📄 Generador de Informes Automáticos (Wizard)**
   - Wizard en 3 pasos: selección de canales/métricas, formato (PDF/Excel) y personalización de branding.
   - Botón **"Generar insights con IA"** impulsado por Antigravity Agents para detección de patrones y anomalías.

4. **⏱️ Optimizador de Horarios de Publicación**
   - Mapa de calor de actividad semanal (00:00 a 23:00 hs) para 6 plataformas.
   - Top 5 mejores momentos de publicación y recomendación del próximo slot ideal.

5. **🏷️ Tracker y Monitor de Hashtags**
   - Seguimiento del hashtag `#PolicíaTDF` y nuevos términos.
   - Alertas volumétricas automáticas cuando el alcance o los posteos superan umbrales por hora.

6. **📲 Instagram Linkable Images & Landing Hub**
   - Generación de landing pages interactivas estilo Beacons/Linkin.bio para posts de Instagram.
   - Métricas de conversión y clicks por post.

---

## 🛠️ Stack Tecnológico & Arquitectura

- **Frontend**: Next.js 15 / React 19 + TypeScript + Tailwind CSS + Lucide Icons
- **Backend & AI Agents**: Python (FastAPI) + Google Antigravity Agent SDK (`gemini-2.5-pro`)
- **Base de Datos & Caché**: PostgreSQL (Supabase / Neon) + Redis
- **Protocolo de Integración**: Model Context Protocol (MCP) vía `mcp_config.json`

---

## 🏁 Inicio Rápido

```bash
# 1. Configurar variables de entorno
cp .env.example .env.local

# 2. Instalar dependencias y ejecutar entorno de desarrollo
./setup.sh

# 3. Iniciar desarrollo frontend
npm run dev

# 4. Iniciar servicio backend de procesamiento e IA (opcional)
uvicorn backend.main:app --reload --port 8000
```

---

## 🐋 Despliegue con Docker

```bash
docker-compose up --build -d
```
