# Rappi Lockers Challenge

This repository contains the solution for the Rappi Lockers Frontend & Architecture Challenge.

## Project Structure

This is a monorepo setup with two main applications:

- `backend/`: A Node.js (Express) API with TypeScript and TypeORM for managing lockers and orders.
- `frontend/`: A Next.js application with TypeScript for both Admin CMS and Client-side experiences.

## High-Level Architecture

The architecture consists of a Next.js frontend communicating with a Node.js/Express backend API. Both are built with TypeScript. Data is persisted in a PostgreSQL database. Docker and Docker Compose are used to manage the backend API and database, while the frontend runs locally for development.

**Key Decisions:**

1.  **Monorepo Structure:** Simplifies development, shared types, and overall project management.
2.  **TypeScript End-to-End:** Enhances code quality, type safety, and developer experience across the stack.
3.  **Layered Backend Architecture:** Clear separation of concerns (controllers, services, repositories) for maintainability and scalability.
4.  **RESTful API:** Standardized communication between frontend and backend.
5.  **Dockerized Backend:** Docker and Docker Compose manage database and API for consistent environments.
6.  **Local Frontend Development:** Next.js runs locally with hot-reload for better developer experience.
7.  **TypeORM:** An ORM for PostgreSQL to simplify database interactions and entity management.

## How to Run

### Prerequisites

- Docker Desktop installed and running
- Node.js (v18+) and npm installed

### Setup Instructions

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Carlosarturo28/rappi-lockers-challenge
   cd rappi-lockers-challenge
   ```

2. **Start the Backend and Database with Docker:**
   From the root of the project, run:

   ```bash
   docker-compose up --build
   ```

   This will:
   - Build the backend Docker image
   - Start the PostgreSQL database service (`db` on port 5432)
   - Start the backend API service (`backend` on port 5000)
   - Automatically create database tables via TypeORM synchronization

   You'll see logs indicating when services are ready.

3. **Start the Frontend (in a new terminal):**
   Navigate to the frontend directory and run:

   ```bash
   cd frontend
   npm install  # If dependencies aren't installed yet
   npm run dev
   ```

   The frontend will start on `http://localhost:3000`

4. **Verify Everything is Running:**
   - **Backend API:** `http://localhost:5000` - Should display "Rappi Lockers Backend API is running!"
   - **Frontend App:** `http://localhost:3000` - Should display the Rappi Lockers application

### Stopping the Services

- **Backend/Database:** Press `Ctrl+C` in the docker-compose terminal
- **Frontend:** Press `Ctrl+C` in the npm dev terminal

## Implementation Highlights

### Architecture & Structure

I structured the application as a monorepo with clear separation between frontend and backend to keep concerns isolated while allowing code reuse.

**Frontend Organization:**
I organized the Next.js app into `admin/` and `client/` subdirectories to separate business logics. Within each, I created dedicated folders for pages, components, and custom hooks. For example, in the client section:

- Pages handle routing and layout (e.g., `create-order/page.tsx`, `my-orders/page.tsx`)
- Components are granular and reusable (e.g., `LockerCard`, `OrderCard`, `StatusBadge`) to avoid duplication
- Custom hooks encapsulate API calls and state management (e.g., `useLockers`, `useOrderCreation`, `useOrderDetails`)

**Backend Organization:**
I implemented a layered architecture where:

- **Controllers** handle HTTP requests and responses (`locker.controller.ts`, `order.controller.ts`)
- **Entities** define TypeORM models that map directly to the database (`Locker.ts`, `Order.ts`)
- **Routes** organize endpoints in separate files for maintainability (`locker.routes.ts`, `order.routes.ts`)
- **Utils** contain business logic like location calculations (`location.ts`)

### Domain Modeling

I designed the domain model to represent real-world concepts:

- **Locker:** Represents a physical locker with location tracking, capacity constraints, and availability status
- **Order:** Represents customer orders with state transitions (pending → confirmed → delivered → collected)
- **Locker Slots:** Modeled as properties within the Locker entity to manage individual compartments
- **Order States:** Explicitly tracked through status fields to ensure valid state transitions
- **Geolocation:** Integrated across frontend and backend to enable nearby locker discovery based on user location

### Code Quality

I prioritized type safety and readability throughout:

- **TypeScript:** Used strict typing end-to-end to catch errors at compile time and improve IDE support
- **Shared Types:** Created dedicated type files (`types/locker.ts`, `types/order.ts`) that both frontend and backend can import
- **Naming:** Applied consistent, descriptive naming conventions (e.g., `useOrderDetails`, `LockerCard`, `calculateDistance`)
- **Separation of Concerns:** Kept business logic in hooks/services separate from UI rendering logic
- **Reusable Components:** Designed components like `StatusBadge` to be used across multiple pages to stay DRY
- **Configuration:** Centralized database and server setup in `data-source.ts` for easy maintenance

### Developer Experience

I made the project easy to set up and work with:

- **Containerized Backend:** Docker handles database and API setup, ensuring consistency across environments
- **Local Frontend Development:** Frontend runs with `npm run dev` for fast hot-reload during development
- **Automatic Database Creation:** TypeORM synchronization with `synchronize: true` auto-creates tables on startup
- **Clear Documentation:** Step-by-step instructions for running both backend and frontend
- **Consistent Structure:** Organized files predictably so developers can find what they need quickly
- **TypeScript Everywhere:** Strict tsconfig settings help catch issues early in development

### User Experience

I implemented the core user flows:

**Admin Flow:**

- Dashboard to view all available lockers
- Create locker form with validation for location and capacity
- List view showing locker details and status
- Action tracking for courier deliveries

**Client Flow:**

- User authentication and login
- Locker browsing during order creation with geolocation-based filtering
- Locker detail view showing location, available slots, and pricing
- Order summary with confirmation before checkout
- Order history page showing past and current orders
- Order detail page with locker information and pickup code
- Collect order action to complete the delivery flow

## Next Steps

The backend API and database are containerized and ready to use. The frontend is fully functional and connects to the API via `npm run dev`. Future improvements could include

- Advanced locker management features
- API authentication
- Production deployment strategies
- Add Jest-based tests for frontend components/hooks and backend routes to catch regressions early
- Add Storybook to document and visually validate UI components for faster review and design feedback.
