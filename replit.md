# Aeonark Labs Website

## Overview

This is a modern, responsive multi-page website for Aeonark Labs, an Indian digital solutions company. The website showcases their services in web development, app development, and AI solutions. Built with React, TypeScript, and modern web technologies, it features a clean, professional design with neon accent colors and smooth animations.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS with custom design system
- **Component Library**: Radix UI components with shadcn/ui integration
- **Animations**: Framer Motion for smooth scroll reveals and transitions
- **State Management**: React Query for server state management

### Backend Architecture
- **Server**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **API Structure**: RESTful endpoints for health checks and contact form
- **File Processing**: Archiver for project downloads

## Key Components

### Pages
- **Home**: Hero section with key offerings showcase
- **Services**: Detailed service cards with descriptions
- **Pricing**: Three-tier pricing structure (Starter, Growth, Scale)
- **About**: Company story and founder information
- **Collaborations**: Client testimonials and case studies
- **Contact**: Contact form with company information

### UI Components
- **Navbar**: Responsive navigation with mobile menu
- **Footer**: Company links and social media
- **ScrollReveal**: Animated component reveals on scroll
- **Theme Provider**: Dark/light theme support
- **Button**: Gradient button variants with hover effects
- **Card**: Reusable card components with hover animations

### Database Schema
- **Users Table**: Basic user authentication structure
- Extensible schema for future features like contact submissions or client data

## Data Flow

1. **Static Content**: Most content is hardcoded in components for fast loading
2. **Contact Form**: Collects user data and returns success response (no actual storage implemented)
3. **API Endpoints**: Health check and contact form processing
4. **Theme Management**: Client-side theme persistence using localStorage
5. **Responsive Design**: Mobile-first approach with breakpoint-based layouts

## External Dependencies

### Production Dependencies
- **React Ecosystem**: react, react-dom, react-router via wouter
- **UI Components**: @radix-ui/* components, lucide-react icons
- **Styling**: tailwindcss, class-variance-authority, clsx
- **Database**: @neondatabase/serverless, drizzle-orm
- **Server**: express, archiver for file processing
- **Animations**: framer-motion
- **Forms**: react-hook-form, @hookform/resolvers

### Development Dependencies
- **Build Tools**: vite, typescript, esbuild
- **Development**: tsx for TypeScript execution
- **Database Tools**: drizzle-kit for migrations
- **Replit Integration**: @replit/vite-plugin-* for development environment

## Deployment Strategy

### Build Process
1. **Frontend Build**: Vite builds React application to `dist/public`
2. **Backend Build**: esbuild bundles Express server to `dist/index.js`
3. **Database**: Drizzle handles schema migrations and seeding

### Environment Variables
- **DATABASE_URL**: PostgreSQL connection string (required)
- **NODE_ENV**: Environment setting (development/production)
- **PROJECT_FILES_DIR**: Directory for file downloads (optional)

### Scripts
- `dev`: Development server with hot reload
- `build`: Production build for both frontend and backend
- `start`: Production server startup
- `db:push`: Push database schema changes
- `db:seed`: Seed database with initial data

### Hosting Considerations
- **Static Assets**: Served from `/Aeonark/` base path
- **API Routes**: Express server handles `/api/*` endpoints
- **Database**: Serverless PostgreSQL via Neon
- **File Storage**: Local file system for project downloads

## Changelog

```
Changelog:
- July 05, 2025. Initial setup
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```