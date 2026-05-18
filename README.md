# AI Clinic Management SaaS

A complete MERN stack clinic management system with AI-powered diagnosis suggestions.

## Project Structure

```
clinic-backend/     # Node.js Express API
clinic-frontend/    # Next.js React App
```

## Backend Setup

```bash
cd clinic-backend
npm install
# Configure .env file
npm run dev
```

## Frontend Setup

```bash
cd clinic-frontend
npm install
# Configure .env.local
npm run dev
```

## Environment Variables

### Backend (.env)
- PORT=5000
- MONGO_URI=your_mongodb_atlas_uri
- JWT_SECRET=your_jwt_secret
- CLOUDINARY_NAME, CLOUDINARY_KEY, CLOUDINARY_SECRET
- GEMINI_API_KEY

### Frontend (.env.local)
- NEXT_PUBLIC_API_URL=http://localhost:5000

## Features

- Multi-role authentication (Admin, Doctor, Receptionist, Patient)
- Patient management with image uploads
- Appointment scheduling
- Prescription system with PDF generation
- AI symptom checker (Gemini API)
- Analytics dashboard
- Pro/Free SaaS plan system

## Deployment

### Vercel Deployment

1. Import both projects to Vercel
2. Set environment variables in Vercel dashboard
3. Backend deploys as Node.js server
4. Frontend deploys as Next.js app

### Build Commands
- Backend: `npm start`
- Frontend: `npm run build && npm start`