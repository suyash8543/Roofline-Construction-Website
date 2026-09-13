# Roofline Premium Roofing Website

React + Vite + Tailwind CSS + Framer Motion + Lucide React frontend, with an ASP.NET Core 8 Web API for the estimate/contact form.

## Frontend
```bash
npm install
npm run dev
```
Create `.env` from `.env.example` and set `VITE_API_BASE_URL` to the API URL.

## Backend
See `backend/README.md`.

The backend accepts the estimate form and optional roof photos, then sends the request to the company's receiving email through SMTP. No SMTP password belongs in the React frontend.

