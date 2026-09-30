# GUIDE.md - Guía Completa de Configuración de APIs

Esta guía detalla los pasos requeridos para obtener las credenciales e integrar cada una de las APIs soportadas en **Social Analytics 360**.

---

## 1. Google Analytics 4 (GA4 Reporting API)
1. Inicia sesión en la **Google Cloud Console**.
2. Habilita la API **Google Analytics Data API v1**.
3. Crea una **Service Account** y descarga el archivo JSON de credenciales.
4. En tu propiedad de GA4 (Admin > Gestión de accesos), agrega el email de la Service Account con rol de *Lector*.
5. Copia el **Property ID** en `.env.local` como `GA4_PROPERTY_ID`.

---

## 2. Meta Graph API (Instagram & Facebook)
1. Ve a **Meta for Developers** (`developers.facebook.com`).
2. Crea una App de tipo *Business*.
3. Agrega los productos **Facebook Login for Business** e **Instagram Graph API**.
4. Solicita los permisos: `instagram_basic`, `instagram_manage_insights`, `pages_read_engagement`, `ads_read`.
5. Obtén el **User Access Token de larga duración** (60 días) o configura la rotación automática mediante el Refresh Token flow.
6. Asigna `META_APP_ID`, `META_APP_SECRET`, `INSTAGRAM_BUSINESS_ACCOUNT_ID` y `FACEBOOK_PAGE_ID` en `.env.local`.

---

## 3. TikTok Content Posting API & Research API
1. Registra una aplicación en el **TikTok Developer Portal** (`developers.tiktok.com`).
2. Habilita las APIs **TikTok Content Posting API** y **Research API**.
3. Solicita los scopes: `user.info.stats`, `video.list`, `video.insights`.
4. Copia `TIKTOK_CLIENT_KEY` y `TIKTOK_CLIENT_SECRET` a tu archivo `.env.local`.

---

## 4. X / Twitter API v2
1. Accede a **X Developer Portal** (`developer.twitter.com`).
2. Crea un Proyecto y una App dentro del plan *Basic* o *Pro*.
3. Genera tu **Bearer Token**, **API Key** y **API Key Secret**.
4. Asigna los permisos de lectura de tweets y métricas (`tweet.read`, `users.read`).
5. Configura `TWITTER_BEARER_TOKEN` en `.env.local`.

---

## 5. LinkedIn API
1. Ingresa a **LinkedIn Developers** (`developer.linkedin.com`).
2. Crea un App y vincúlala con la página de empresa oficial.
3. Habilita el producto **Community Management API** y **Share on LinkedIn**.
4. Obtén el `LINKEDIN_CLIENT_ID` y `LINKEDIN_CLIENT_SECRET`.

---

## 6. YouTube Data API v3
1. En Google Cloud Console, habilita **YouTube Data API v3**.
2. Genera una **API Key** pública o usa OAuth 2.0.
3. Configura `YOUTUBE_API_KEY` y `YOUTUBE_CHANNEL_ID` en `.env.local`.

---

## 7. Meta Ads & Google Ads APIs
- **Meta Ads API**: Requiere el scope `ads_read` en Meta for Developers y el ID de cuenta de anuncios `act_XXXXXXXXX`.
- **Google Ads API**: Requiere un **Developer Token** aprobado en Google Ads Manager y un OAuth Client de Google Cloud.
