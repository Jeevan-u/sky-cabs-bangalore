# Cloudflare Production Deployment Guide
**Sri Sadhguru Tours & Travels — Hyderabad, Telangana**
*Proprietor: Sri Rathan Kanna (+91 81061 17704)*

This document provides step-by-step instructions for deploying Sri Sadhguru Tours & Travels to Cloudflare Pages with Cloudflare D1 SQL database and custom domain configuration.

---

## Architecture Overview

* **Framework:** Next.js (App Router)
* **Styling:** Tailwind CSS (ChisFis Luxury Chauffeur & Travel design system)
* **Database:** Native Cloudflare D1 (SQLite at the edge) with local JSON fallback (`.data/sadhguru_db.json`)
* **SEO / AEO:** Full Schema.org JSON-LD (`TaxiService`, `AutoRental`, `FAQPage`, `BreadcrumbList`), dynamic sitemap (`/sitemap.xml`), and crawler directives (`/robots.txt`)
* **Operational Portals:**
  * Client Website: `https://srisadgurutoursandtravels.com`
  * Operations Command Center: `/admin` (Owner: `8106117704`)
  * Chauffeur Duty Portal: `/driver` (Driver: `9398522128`)
  * Live Touchscreen Trip Sheet: `/trip-sheet`
  * Booking Tracker: `/track-booking`

---

## 1. Cloudflare D1 Database Setup

1. Log into your [Cloudflare Dashboard](https://dash.cloudflare.com/).
2. In the left navigation, go to **Workers & Pages** ➔ **D1 SQL Database**.
3. Click **Create Database**, name it `sadhguru-db`, and choose the **APAC / India (Mumbai / Hyderabad)** location for lowest latency.
4. Note your **Database ID** and **Account ID**.
5. Execute the database schema using Wrangler CLI or the Cloudflare D1 Console:
   ```bash
   npx wrangler d1 execute sadhguru-db --file=./src/lib/db/schema.sql
   ```
   *This initializes the 5 tables: `bookings`, `duty_slips`, `reviews`, `users`, and `rate_cards`.*

---

## 2. Cloudflare Pages Deployment

### Option A: Git Integration (Recommended)
1. Push this repository to GitHub or GitLab.
2. In Cloudflare Dashboard, navigate to **Workers & Pages** ➔ **Create application** ➔ **Pages** ➔ **Connect to Git**.
3. Select the repository and configure build settings:
   * **Framework preset:** `Next.js`
   * **Build command:** `npm run build`
   * **Build output directory:** `.next`
   * **Node.js Version:** `18.x` or higher (Set environment variable `NODE_VERSION = 18.17.0`)
4. In **Environment Variables**, add:
   | Variable | Value |
   |---|---|
   | `NEXTAUTH_URL` | `https://srisadgurutoursandtravels.com` |
   | `NEXTAUTH_SECRET` | `production-sadhguru-travels-secret-key-2026` |
   | `CLOUDFLARE_ACCOUNT_ID` | `Your Cloudflare Account ID` |
   | `CLOUDFLARE_DATABASE_ID` | `Your D1 Database ID` |
   | `CLOUDFLARE_D1_TOKEN` | `Your Cloudflare API Token with D1 Edit access` |
5. Click **Save and Deploy**.

### Option B: Direct CLI Deployment
```bash
# 1. Build the production application
npm run build

# 2. Deploy via Wrangler Pages
npx wrangler pages deploy .next --project-name=sri-sadhguru-travels
```

---

## 3. Custom Domain & SSL Setup

1. In the Cloudflare Pages project, click **Custom domains** ➔ **Set up a domain**.
2. Enter `srisadgurutoursandtravels.com` (and optionally `www.srisadgurutoursandtravels.com`).
3. Cloudflare will automatically provision:
   * **Universal SSL/TLS** certificate (Full / Strict mode recommended).
   * **HTTP/3 & 0-RTT** for instant mobile loading.
   * **Global Edge CDN caching** with Hyderabad and Mumbai PoPs (Point of Presence).

---

## 4. Search Engine Optimization (SEO & AEO) Activation

Once deployed, the following automatic endpoints are ready for Google Search Console, Bing Webmaster, and AI Answer Engines (Perplexity, ChatGPT, Gemini):
* **Sitemap:** `https://srisadgurutoursandtravels.com/sitemap.xml`
* **Robots:** `https://srisadgurutoursandtravels.com/robots.txt`
* **Structured Data:** Embedded `TaxiService`, `AutoRental`, `FAQPage`, and `BreadcrumbList` schemas are live on all location and booking routes.

Submit `https://srisadgurutoursandtravels.com/sitemap.xml` in **Google Search Console** under your domain property for rapid indexation.

---

## 5. Default Staff & Admin Credentials

| Portal | Mobile Identifier | Default Password | Role |
|---|---|---|---|
| **Owner Command Center** (`/admin`) | `8106117704` | `Sadhguru@2026` | Proprietor & Administrator |
| **Chauffeur Duty Desk** (`/driver`) | `9398522128` | `Driver@2026` | Commercial Fleet Chauffeur |
| **Second Chauffeur** (`/driver`) | `9848012345` | `Driver@2026` | Commercial Fleet Chauffeur |

*(Password can be updated anytime inside `src/backend/db/d1Client.ts` or via the Admin users table)*
