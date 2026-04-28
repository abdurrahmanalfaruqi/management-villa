Villa Booking Management System

A full-stack villa management and reservation system built using Next.js (App Router), TypeScript, Prisma ORM, and PostgreSQL.
This project focuses on clean architecture, server actions, and robust booking validation to prevent overlapping reservations.

Features
Villa Management (CRUD)
Create, update, and delete villa data
Fields:
Name
Location
Price
Capacity
Inline editing support in table view
Automatic UI refresh using revalidatePath
Booking System
Create reservations per villa
Select check-in and check-out dates
Prevent overlapping bookings (core business logic)
Validate invalid date ranges (check-out must be after check-in)
Business Logic
Server-side validation using Zod
Booking conflict detection using date range overlap
Strong type safety using TypeScript
Architecture Overview

This project follows a layered architecture to ensure clear separation of concerns:

app/
  actions/        → Server Actions (mutation layer)

services/         → Business logic + Prisma queries

lib/              → Prisma client instance

components/       → UI components (forms, tables)
Key Design Principles
Separation of concerns:
UI → Components
Business Logic → Services
Data Access → Prisma layer
Server Actions instead of REST APIs
Reusable service layer for database operations
Installation & Setup
1. Clone Repository
git clone https://github.com/your-username/villa-booking.git
cd villa-booking
2. Install Dependencies
npm install
3. Setup Environment Variables

Create a .env file:

DATABASE_URL="postgresql://user:password@localhost:5432/villa_db"
Prisma Setup
Generate Prisma Client
npx prisma generate
Run Database Migration
npx prisma migrate dev
Optional: Seed Database
npx prisma db seed
Running the Application
Development Mode
npm run dev

The application will run at:

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

The system prevents overlapping bookings using the following rule:

A booking is rejected if:

Existing check-in < New check-out
AND Existing check-out > New check-in

This ensures:

No double booking
Data consistency
Reliable reservation system
Commit Convention

Commit messages follow a simple and consistent pattern:

feat: add villa CRUD functionality
feat: implement booking system with overlap validation
fix: prevent overlapping booking dates
refactor: improve service layer structure
ui: enhance table layout and pagination
Notes
Built with production-level architecture mindset
Scalable for multi-villa booking systems
Ready for extension:
Authentication
Payment integration
Role-based access (admin/user)
Author

Developed as a technical assessment project demonstrating:

Full-stack Next.js architecture
Real-world booking system design
Clean code principles
Server-side validation strategy
