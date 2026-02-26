# 🍕 Slice & Spice Pizzeria

A professional, full-stack food ordering platform built for a modern pizzeria, featuring a robust administrative dashboard and a seamless customer ordering experience.

## ✨ Key Features

- **🛍️ Seamless Ordering**: A dynamic shopping cart system where customers can customize their orders with different sizes, crust options, and extra toppings.
- **💳 Secure Payments**: Integrated with **Stripe** for reliable and secure transaction processing.
- **🚚 Order Tracking**: A multi-stage order management system (Pending → Preparing → Delivering → Delivered) for both customers and admins.
- **📍 Address Management**: Users can save multiple addresses, mark a default delivery location, and specify delivery details (e.g., apartment number, floor).
- **🛡️ Admin Dashboard**: A comprehensive management interface to:
  - Control the **Menu** (add/edit dishes, prices, and images).
  - Manage **Categories** for easy browsing.
  - Track and update **Order Statuses** in real-time.
  - Manage **User Accounts** and roles.
- **🔐 Secure Authentication**: Role-based access control (Admin vs. Customer) powered by **Next-Auth** and **Prisma**.
- **📸 Media Handling**: Effortless image uploads and management using **Cloudinary**.

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router) with [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [Radix UI](https://www.radix-ui.com/)
- **Database & ORM**: [MongoDB](https://www.mongodb.com/) via [Prisma](https://www.prisma.io/)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **Payments**: [Stripe](https://stripe.com/)
- **Forms**: [React Hook Form](https://react-hook-form.com/)

## 🚀 Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/musegit88/slice.git
   cd slice
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory and add the necessary keys for MongoDB, Next-Auth, Stripe, and Cloudinary.

4. **Run the development server:**

   ```bash
   npm run dev
   ```

5. **Build for production:**
   ```bash
   npm run build
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
