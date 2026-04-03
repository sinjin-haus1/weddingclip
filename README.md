# WeddingClip

> Faceless AI video generator for wedding vendors. Pull Google Reviews → generate elegant TikTok/Shorts clips → post to social.

## Stack
- **Backend:** NestJS + MongoDB + GraphQL
- **Video:** FFmpeg + TTS
- **Frontend:** Next.js + Material UI (coming soon)
- **Auth:** Google OAuth (Places API)

## Quick Start

```bash
# Install
npm install

# Environment
cp .env.example .env
# Fill in: MONGODB_URI, GOOGLE_PLACES_API_KEY, TIKTOK_*, INSTAGRAM_*, GOOGLE_*

# Run
npm run start:dev
```

Open http://localhost:4000/graphql for GraphQL playground.

## Key Modules
- **VendorsModule** — Wedding vendor profiles (photographers, DJs, venues, etc.)
- **ReviewsModule** — Google Places review fetching + storage
- **VideosModule** — FFmpeg clip generation with 5 wedding template styles
- **SocialModule** — TikTok, Instagram Reels, YouTube Shorts OAuth + posting

## Template Styles
- `elegant` — Soft dark blue, rose gold accents (default)
- `rustic` — Kraft paper aesthetic, warm tones
- `modern_minimal` — Clean white, sans-serif
- `romantic` — Soft pink, floral accents
- `classic` — Black/gold, timeless feel

## Deploy
```bash
npm run build
npm run start:prod
```
