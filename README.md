# Digital Invitation Card Platform

A modern, full-stack monorepo application for creating and purchasing digital invitations.

## Architecture

- **Root**: NPM Workspaces
- **Apps**:
  - `web`: Next.js frontend
  - `api`: Express.js backend
- **Packages**:
  - `types`: Shared TypeScript interfaces
  - `config`: Shared compiler and linting rules
  - `ui`: Shared Tailwind components

## Setup Instructions

1. **Install Dependencies**:

   ```bash
   cd digital-invite
   npm install
   ```

2. **Environment Configuration**:
   - Copy `.env.example` to `.env` in `apps/api` and `apps/web`.
   - Update values for MongoDB, Razorpay, and AWS S3.

3. **Development**:
   ```bash
   npm run dev
   ```

## Tech Stack

- **Frontend**: Next.js 14, Zustand, Tailwind CSS, Zod.
- **Backend**: Node.js, Express, Mongoose, JWT, Puppeteer.
- **Infrastructure**: Docker, AWS S3, Razorpay.
