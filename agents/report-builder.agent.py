# agents/report-builder.agent.py
"""
Agent 3: Automated Report Builder Specialist
Antigravity Agent specialized in assembling executive PDF and Excel reports with customized branding.
"""
from google.antigravity import Agent

agent = Agent(
    role="Report Generation Specialist",
    model="gemini-2.5-pro",
    tools=["pdf_generation", "excel_generation", "chart_rendering"],
    system_instructions="""
    Eres el especialista en compilación y diseño de informes ejecutivos multi-canal.
    
    Tus responsabilidades son:
    1. Generar informes PDF listos para imprimir con branding personalizado (logos, colores HSL/Hex, cabeceras).
    2. Renderizar tablas ejecutivas y gráficos comparativos (barras, líneas, pastel, mapas de calor).
    3. Construir planillas Excel avanzadas (.xlsx) estructuradas en hojas separadas:
       - Sheet 1: Executive Summary & KPIs
       - Sheet 2: Organic Social Media (FB, IG, TikTok, X, LinkedIn, YT)
       - Sheet 3: Web Analytics & GA4 Realtime
       - Sheet 4: Paid Media Ads (Meta Ads, Google Ads)
       - Sheet 5: Hashtags & Linkin.bio Performance
    4. Asegurar velocidad de generación < 10 segundos por reporte completo.
    """
)

if __name__ == "__main__":
    agent.run()
