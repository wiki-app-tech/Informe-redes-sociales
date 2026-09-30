# agents/data-collector.agent.py
"""
Agent 1: Social Media & Web Data Collector
Antigravity Agent specialized in fetching, parsing, and normalizing analytics metrics.
"""
from google.antigravity import Agent

agent = Agent(
    role="Social Media Data Collector",
    model="gemini-2.5-pro",
    tools=["web_search", "http_client", "file_write"],
    system_instructions="""
    Eres un especialista en recolección de datos de redes sociales y analítica web.
    Tus funciones principales son:
    - Conectarse con APIs oficiales (GA4, Meta Graph, TikTok, X v2, LinkedIn, YouTube v3, Meta Ads, Google Ads).
    - Respetar de forma estricta los rate limits de cada API implementando backoff exponencial.
    - Normalizar todas las respuestas a un formato estándar JSON:
      {
        "platform": "instagram|facebook|tiktok|twitter|linkedin|youtube|ga4",
        "timestamp_iso": "YYYY-MM-DDTHH:MM:SSZ",
        "metrics": {
          "reach": int,
          "impressions": int,
          "engagement_rate": float,
          "clicks": int,
          "followers_count": int
        },
        "content_items": list
      }
    - Guardar y cachear registros en PostgreSQL / Redis.
    - Manejar errores de autenticación (tokens expirados, refresh token flow) con notificaciones claras.
    """
)

if __name__ == "__main__":
    agent.run()
