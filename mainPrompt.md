You are a senior full stack MERN architect and hackathon assistant.

Build a production style AI Clinic Management SaaS project.

IMPORTANT:
Frontend and backend MUST be completely separate projects.

Frontend:

* Next.js App Router
* JavaScript only
* Tailwind CSS
* Axios
* React Hook Form
* Recharts

Backend:

* Node.js
* Express.js
* MongoDB Atlas
* JWT Authentication
* bcryptjs
* Cloudinary
* Multer
* Gemini AI API
* MVC Architecture

DO NOT use TypeScript.
DO NOT use Prisma.
DO NOT use Firebase.
DO NOT use Redux.
DO NOT use complicated architecture.
DO NOT use Docker.
DO NOT use microservices.

This is a hackathon project.
Priority:

1. Working features
2. Clean architecture
3. Fast development
4. Responsive UI
5. Proper APIs

==================================================
PROJECT IDEA
============

Build a complete AI Clinic Management SaaS platform.

The system should help:

* Admin
* Doctor
* Receptionist
* Patient

The AI part is NOT real machine learning.

AI should simply:

* take symptoms
* send them to Gemini API
* return suggestions

If AI fails:

* system must still work normally

==================================================
MAIN MODULES
============

1. Authentication
2. Role Based Authorization
3. Dashboard System
4. Patient Management
5. Appointment Management
6. Prescription System
7. AI Suggestion System
8. Analytics Dashboard
9. SaaS Plan Logic
10. PDF Prescription Download

==================================================
FRONTEND REQUIREMENTS
=====================

Create a fully responsive modern medical dashboard UI.

Use:

* sidebar layout
* dashboard cards
* charts
* forms
* tables
* loading states
* toast messages

Theme:

* white
* blue
* light cyan
* modern clinic feel

Frontend Routes:

Public:

* /
* /login

Admin:

* /admin
* /admin/doctors
* /admin/receptionists
* /admin/analytics

Doctor:

* /doctor
* /doctor/patients
* /doctor/appointments
* /doctor/prescriptions

Receptionist:

* /receptionist
* /receptionist/patients
* /receptionist/book

Patient:

* /patient
* /patient/history
* /patient/prescriptions

==================================================
ROLES
=====

Roles:

* admin
* doctor
* receptionist
* patient

Implement:

* JWT auth
* protected routes
* role middleware
* token verification
* logout

==================================================
BACKEND STRUCTURE
=================

Use clean MVC structure:

src/
config/
controllers/
middleware/
models/
routes/
services/
utils/
app.js
server.js

==================================================
DATABASE MODELS
===============

User Model:

* name
* email
* password
* role
* plan
* createdAt

Patient Model:

* name
* age
* gender
* phone
* address
* image
* medicalHistory
* createdBy
* createdAt

Appointment Model:

* patient
* doctor
* date
* status
* notes

Prescription Model:

* patient
* doctor
* medicines
* instructions
* pdfUrl
* createdAt

DiagnosisLog Model:

* patient
* symptoms
* aiResponse
* riskLevel
* createdAt

==================================================
AUTHENTICATION
==============

Implement:

* register
* login
* JWT token generation
* bcrypt password hashing
* auth middleware
* role middleware

==================================================
PATIENT MANAGEMENT
==================

Features:

* add patient
* edit patient
* delete patient
* upload patient image
* view patient details
* medical history timeline

==================================================
APPOINTMENT MANAGEMENT
======================

Features:

* create appointment
* update appointment
* cancel appointment
* status:

  * pending
  * confirmed
  * completed

==================================================
PRESCRIPTION SYSTEM
===================

Doctor should:

* add medicines
* add dosage
* add instructions
* generate PDF

Patient should:

* download prescription PDF

==================================================
AI SYSTEM
=========

Use Google Gemini API.

Create backend route:

POST /api/ai/check

Request:

* symptoms
* age
* gender

Prompt example:

Symptoms: fever, cough
Age: 30
Gender: male

Return:

1. Possible condition
2. Risk level
3. Suggested tests
4. Lifestyle advice

IMPORTANT:
If Gemini API fails:

* return fallback response
* app must not crash

==================================================
SAAS PLAN LOGIC
===============

Admin manually assigns plans to doctors.

Plans:

* free
* pro

Free:

* limited patients
* no AI access

Pro:

* unlimited patients
* AI enabled

Implement middleware for feature access control.

==================================================
ANALYTICS
=========

Admin Dashboard:

* total patients
* total doctors
* total appointments
* AI usage count

Doctor Dashboard:

* today appointments
* prescription count
* patient count

Use Recharts.

==================================================
FILE UPLOADS
============

Use:

* multer
* cloudinary

Patient image upload required.

==================================================
PDF SYSTEM
==========

Generate downloadable prescription PDF.

Use:

* pdfkit OR jspdf

==================================================
API STRUCTURE
=============

Create clean REST APIs.

Examples:

POST /api/auth/login
POST /api/auth/register

GET /api/patients
POST /api/patients
PUT /api/patients/:id
DELETE /api/patients/:id

GET /api/appointments
POST /api/appointments

POST /api/prescriptions

POST /api/ai/check

==================================================
IMPORTANT DEVELOPMENT RULES
===========================

1. Write clean readable code.
2. Use reusable components.
3. Use async/await everywhere.
4. Add proper try/catch.
5. Add validation.
6. Add loading states.
7. Add proper error handling.
8. Use environment variables.
9. Keep code beginner friendly.
10. Avoid unnecessary complexity.

==================================================
ENV VARIABLES
=============

Backend .env:

PORT=
MONGO_URI=
JWT_SECRET=
CLOUDINARY_NAME=
CLOUDINARY_KEY=
CLOUDINARY_SECRET=
GEMINI_API_KEY=

Frontend .env.local:

NEXT_PUBLIC_API_URL=

==================================================
DELIVERABLES
============

Generate:

1. Complete frontend code
2. Complete backend code
3. All folder structures
4. All models
5. All controllers
6. All routes
7. Middleware
8. AI integration
9. Charts
10. Authentication
11. Responsive dashboard UI
12. API integration
13. PDF generation
14. Deployment instructions
15. README

==================================================
IMPORTANT
=========

DO NOT give theory.
DO NOT explain concepts too much.

Instead:

* generate production style code
* generate working components
* generate clean APIs
* generate complete implementation

Generate step by step in proper order.

Start with:

1. Backend setup
2. Backend structure
3. Models
4. Controllers
5. Routes
6. Middleware
7. AI integration
8. Frontend setup
9. Dashboard UI
10. API integration
11. Charts
12. Deployment

Everything must be hackathon ready and deployment ready.
