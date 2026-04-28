# Villa Booking Management System

This project is a full-stack villa management and reservation system built using Next.js (App Router), TypeScript, Prisma ORM, and PostgreSQL. It focuses on clean architecture, server actions, and robust booking validation to prevent overlapping reservations.

---

## Features

- Villa management (Create, Update, Delete)
- Inline editing for villa data
- Booking system with check-in and check-out dates
- Booking conflict prevention (overlapping validation)
- Server-side validation using Zod
- Automatic UI refresh using `revalidatePath`
- Pagination for booking table (10 rows per page)
- Error handling for invalid input and booking conflicts

---

## Project Structure


app/
actions/
villa.ts # Server Actions for Villa CRUD
booking.ts # Server Actions for Booking logic

services/
villa.service.ts # Prisma logic for Villa
booking.service.ts # Booking business logic (overlap validation)

lib/
prisma.ts # Prisma client instance

components/
villa/
villa-table.tsx
create-villa-form.tsx

booking/
booking-form.tsx
booking-table.tsx


---

## Architecture Overview

This project follows a layered architecture approach:

- UI Layer → React Components  
- Action Layer → Server Actions (Next.js)  
- Service Layer → Business Logic  
- Data Layer → Prisma ORM  

Key principles:
- Separation of concerns
- Server Actions instead of REST API
- Reusable service layer
- Strong TypeScript typing

---

## Installation

### Clone Repository

git clone https://github.com/your-username/villa-booking-system.git

cd villa-booking-system


---

### Install Dependencies

npm install


---

### Setup Environment Variables

DATABASE_URL="postgresql://user:password@localhost:5432/villa_db"


---

## Prisma Setup

### Generate Prisma Client

npx prisma generate


### Run Migration

npx prisma migrate dev


### Optional Seed

npx prisma db seed


---

## Running the App


npm run dev


App will run at:

http://localhost:3000


---

## Booking Validation Logic

A booking is rejected if:

- Existing check-in < new check-out  
- AND existing check-out > new check-in  

This ensures:
- No overlapping bookings
- Data consistency
- Reliable reservation system

---

## Technologies Used

- Next.js (App Router)
- TypeScript
- Prisma ORM
- PostgreSQL
- Zod
- Tailwind CSS

---

## Notes

- Built with production-level architecture mindset
- Scalable for multi-villa systems
- Ready for authentication and payment integration
- Focus on real-world booking logic

---

## Author

Developed as a technical assessment project demonstrating:
- Full-stack Next.js architecture
- Booking system design
- Clean code and separation of concerns
- Server-side validation strategy
