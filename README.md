Villa Booking Management System

A full-stack villa management and reservation system built using Next.js (App Router), TypeScript, Prisma ORM, and PostgreSQL.
This project focuses on clean architecture, server actions, and robust booking validation to prevent overlapping reservations.

Features
Villa Management (CRUD)
Create, update, delete villa data
Fields:
Name
Location
Price
Capacity
Inline editing support in table view
Auto UI refresh using revalidatePath

Booking System
Create reservations per villa
Select check-in & check-out dates
Prevent overlapping bookings (core business logic)
Validate invalid date ranges

Business Logic
Server-side validation using Zod
Booking conflict detection (date range overlap)
Strong type safety using TypeScript

Architecture Overview

This project follows a layered architecture approach to separate concerns:

app/
  actions/        → Server Actions (mutation layer)
services/         → Business logic + Prisma queries
lib/              → Prisma client instance
components/       → UI components (forms, tables)
🔹 Key Design Principles
Separation of Concerns
UI (components)
Business Logic (services)
Data Access (Prisma)
Server Actions instead of REST API
Reusable service layer for database operations

Installation & Setup
1. Clone Repository
git clone https://github.com/your-username/villa-booking.git
cd villa-booking
2. Install Dependencies
npm install
3. Setup Environment Variables

Create .env file:

DATABASE_URL="postgresql://user:password@localhost:5432/villa_db"

Prisma Migration Setup
1. Generate Prisma Client
npx prisma generate
2. Run Migration
npx prisma migrate dev
3. (Optional) Seed Database
npx prisma db seed

Running the Application
Development Mode
npm run dev

Application will run at:

http://localhost:3000

Folder Structure
app/
  dashboard/
    villa/        → Villa management page
    booking/      → Booking management page

  actions/        → Server Actions (create/update/delete)

services/
  villa.service.ts
  booking.service.ts

lib/
  prisma.ts

components/
  villa/
  booking/

Booking Validation Logic

The system ensures no overlapping bookings using this rule:

A booking is rejected if:

Existing check-in < new check-out
AND existing check-out > new check-in

This guarantees:

No double booking
Data consistency
Reliable reservation system

Commit Convention (Important)

Commit history follows descriptive patterns:

feat: add villa CRUD functionality
fix: resolve booking overlap validation bug
refactor: extract prisma logic to service layer
ui: improve villa table layout

Notes
Built with production-level structure mindset
Scalable for multi-villa booking system
Ready for future features:
Authentication
Payment integration
Role-based access (admin/user)

Author

Developed as a technical assessment project demonstrating:

Full-stack Next.js architecture
Booking system design
Clean code practices
Server-side validation strategy