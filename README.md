# Resin Store

A premium, open-source e-commerce web application for Resin Art supplies and Preservation Services.

## Tech Stack
- **Frontend**: Next.js 14+ (App Router), Tailwind CSS
- **Backend**: Next.js API Routes, Node.js
- **Database**: MongoDB (Atlas Free Tier) with Mongoose
- **Auth**: Custom Admin Authentication (JWT/Cookie based)
- **Email**: Nodemailer (SMTP)

## Features
- **Split User Journey**: Separate flows for Raw Materials and Preservation Services
- **Product Management**: Admin can create, edit, delete products
- **Order Management**: Admin can view orders
- **Cart System**: LocalStorage based cart with context API
- **Checkout**: Simulated payment flow (Razorpay integration ready)

## Getting Started

1. **Clone the repository** (if applicable) or use the files provided.

2. **Install Dependencies**
   ```bash
   npm install
   ```
   *Note: Ensure `jose`, `bcryptjs`, `mongoose`, `nodemailer`, `razorpay`, `lucide-react` are installed.*

3. **Environment Setup**
   Rename `.env.example` to `.env.local` and fill in your credentials:
   - `MONGODB_URI`: Your MongoDB connection string
   - `JWT_SECRET`: Random string for auth
   - `ADMIN_EMAIL` / `ADMIN_PASSWORD`: For seeding the initial admin account

4. **Seed Database**
   Run the seed endpoint to create the admin user and initial products:
   - Start the server: `npm run dev`
   - Visit: `http://localhost:3000/api/seed` in your browser.
   - You should see `{"success":true,"message":"Database seeded successfully"}`.

5. **Run Development Server**
   ```bash
   npm run dev
   ```
   Visit `http://localhost:3000`.

## Admin Access
- URL: `/admin/login`
- Default Credentials (after seeding):
  - Email: `admin@resinstore.com`
  - Password: `admin123`

## Project Structure
- `src/app`: App Router pages and API routes
- `src/components`: Reusable UI components
- `src/models`: Mongoose database schemas
- `src/lib`: Utilities (DB connection)
- `src/context`: React Context (Cart)

## Deployment
Deploy to Vercel:
1. Push to GitHub.
2. Import project in Vercel.
3. Add Environment Variables in Vercel.
4. Deploy.

---
