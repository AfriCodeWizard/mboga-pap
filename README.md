# 🥬 Mboga Pap! - Fresh And Fast 🏍️

A modern, full-stack e-commerce platform connecting local vegetable vendors with customers through efficient delivery services. Built with Next.js, TypeScript, and Tailwind CSS.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [User Roles](#user-roles)
- [Key Components](#key-components)
- [API Integration](#api-integration)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

Mboga Pap! is a comprehensive e-commerce platform designed to bridge the gap between local vegetable vendors and customers in Kenya. The platform features three distinct user roles: **Customers**, **Vendors**, and **Riders**, each with tailored dashboards and functionalities.

### Core Mission
- **Empower Local Vendors**: Provide digital tools for small-scale vegetable vendors
- **Enhance Customer Experience**: Offer convenient, fresh produce delivery
- **Create Employment**: Generate opportunities for delivery riders
- **Support Local Economy**: Strengthen community-based commerce

## ✨ Features

### 🌐 Multi-Role Platform
- **Customer Dashboard**: Order management, tracking, and vendor discovery
- **Vendor Dashboard**: Inventory management, order processing, and analytics
- **Rider Dashboard**: Delivery management, earnings tracking, and route optimization

### 🛒 Customer Features
- **Smart Vendor Discovery**: Browse vendors by location and category
- **Real-time Order Tracking**: Live delivery updates with rider location
- **Quick Actions Panel**: Call rider, WhatsApp integration, view map
- **Order History**: Complete transaction records and reorder functionality
- **Vendor Shop Pages**: Detailed product catalogs with filtering and sorting

### 🏪 Vendor Features
- **Inventory Management**: Add, edit, and track product stock
- **Order Processing**: Accept, prepare, and mark orders as ready
- **Payment Management**: Request payouts and track earnings
- **Analytics Dashboard**: Sales metrics and performance insights
- **Shop Customization**: Profile and settings management

### 🏍️ Rider Features
- **Delivery Management**: Accept and track active deliveries
- **Earnings Dashboard**: Real-time earnings and payment requests
- **Achievement System**: Gamified rewards and performance tracking
- **Route Optimization**: Navigation integration and delivery planning
- **Performance Analytics**: Delivery time tracking and ratings

### 🎨 UI/UX Features
- **Responsive Design**: Mobile-first approach with tablet and desktop optimization
- **Modern UI Components**: Built with shadcn/ui and Tailwind CSS
- **Smooth Animations**: Framer Motion integration for enhanced interactions
- **Theme Consistency**: Branded color scheme with CSS custom properties
- **Accessibility**: WCAG compliant components and navigation

## 🛠️ Tech Stack

### Frontend
- **Next.js 15.2.4**: React framework with App Router
- **TypeScript 5**: Type-safe development
- **Tailwind CSS 3.4.17**: Utility-first CSS framework
- **shadcn/ui**: Modern component library
- **Framer Motion 12.23.5**: Animation library
- **Lucide React 0.454.0**: Icon library

### UI Components
- **Radix UI**: Accessible component primitives
- **React Hook Form 7.54.1**: Form management
- **Zod 3.24.1**: Schema validation
- **Sonner 1.7.1**: Toast notifications
- **Recharts 2.15.0**: Data visualization

### Development Tools
- **ESLint**: Code linting
- **Jest 29.0.0**: Testing framework
- **Testing Library**: Component testing utilities
- **PostCSS & Autoprefixer**: CSS processing

## 📁 Project Structure

```
mboga-pap/
├── app/                          # Next.js App Router
│   ├── about/                    # About page
│   ├── admin/                    # Admin dashboard
│   ├── blog/                     # Blog section
│   ├── careers/                  # Career opportunities
│   ├── community/                # Community features
│   ├── contact/                  # Contact information
│   ├── cookies/                  # Cookie policy
│   ├── dashboard/                # Customer dashboard
│   │   ├── order-history/        # Order history page
│   │   └── page.tsx             # Main dashboard
│   ├── help/                     # Help and support
│   ├── login/                    # Authentication
│   ├── partner-support/          # Partner resources
│   ├── press/                    # Press releases
│   ├── privacy/                  # Privacy policy
│   ├── rider-dashboard/          # Rider dashboard
│   │   ├── earnings/             # Earnings page
│   │   └── vehicle-info/         # Vehicle management
│   ├── rider-resources/          # Rider resources
│   ├── safety/                   # Safety guidelines
│   ├── signup/                   # User registration
│   ├── story/                    # Company story
│   ├── terms/                    # Terms of service
│   ├── track/                    # Order tracking
│   ├── vendor-dashboard/         # Vendor dashboard
│   ├── vendor-resources/         # Vendor resources
│   ├── vendors/                  # Vendor shop pages
│   │   └── [id]/                # Dynamic vendor pages
│   ├── globals.css               # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Homepage
├── components/                   # Reusable components
│   ├── ui/                      # shadcn/ui components
│   ├── CartContext.tsx          # Shopping cart context
│   ├── CartDrawer.tsx           # Cart drawer component
│   ├── CustomerNavbar.tsx       # Customer navigation
│   ├── Navbar.tsx               # Main navigation
│   ├── VendorList.tsx           # Vendor listing
│   └── wavy-separator.tsx       # Decorative component
├── hooks/                       # Custom React hooks
├── lib/                         # Utility functions
├── public/                      # Static assets
├── styles/                      # Additional styles
├── __tests__/                   # Test files
├── n8n-backend/                 # Backend integration
├── package.json                 # Dependencies
├── tailwind.config.ts           # Tailwind configuration
├── tsconfig.json                # TypeScript configuration
└── jest.config.js               # Jest configuration
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/mboga-pap.git
   cd mboga-pap
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` with your configuration:
   ```env
   NEXT_PUBLIC_API_URL=your_api_url
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run test         # Run Jest tests
```

## 👥 User Roles

### 🛒 Customer
- **Browse Vendors**: Discover local vegetable vendors
- **Place Orders**: Add items to cart and checkout
- **Track Deliveries**: Real-time order tracking
- **Manage Profile**: Update personal information
- **View History**: Access past orders and reorder

### 🏪 Vendor
- **Manage Inventory**: Add, edit, and track products
- **Process Orders**: Accept and fulfill customer orders
- **Track Earnings**: Monitor sales and request payouts
- **Customize Shop**: Update shop information and settings
- **View Analytics**: Performance metrics and insights

### 🏍️ Rider
- **Accept Deliveries**: Browse and accept available deliveries
- **Track Earnings**: Monitor daily and weekly earnings
- **Manage Profile**: Update personal and vehicle information
- **View Achievements**: Complete challenges for bonuses
- **Navigate Routes**: Integrated mapping and navigation

## 🔧 Key Components

### Dashboard Components
- **Stats Cards**: Performance metrics with gradients and animations
- **Order Management**: Real-time order processing and tracking
- **Payment Systems**: Integrated payout requests and tracking
- **Inventory Management**: Product catalog with stock tracking
- **Achievement System**: Gamified rewards and progress tracking

### Navigation & UI
- **Responsive Navbar**: Role-based navigation with dropdown menus
- **Cart System**: Shopping cart with drawer interface
- **Modal Dialogs**: Form handling and information display
- **Toast Notifications**: User feedback and status updates
- **Loading States**: Skeleton components and progress indicators

### Data Visualization
- **Charts**: Sales analytics and performance metrics
- **Progress Bars**: Achievement tracking and delivery progress
- **Status Badges**: Order status and priority indicators
- **Timeline Components**: Order history and delivery tracking

## 🔌 API Integration

### External Services
- **Google Maps API**: Location services and navigation
- **M-Pesa Integration**: Mobile money payments
- **WhatsApp Business API**: Customer communication
- **SMS Gateway**: Order notifications and updates

### Backend Architecture
- **n8n Workflows**: Automated business processes
- **Database**: Order management and user data
- **File Storage**: Product images and documents
- **Real-time Updates**: WebSocket connections for live tracking

## 🧪 Testing

### Test Structure
```bash
npm run test                    # Run all tests
npm run test:watch             # Run tests in watch mode
npm run test:coverage          # Generate coverage report
```

### Testing Tools
- **Jest**: Test runner and framework
- **React Testing Library**: Component testing
- **User Event**: User interaction simulation
- **Jest DOM**: DOM testing utilities

### Test Categories
- **Unit Tests**: Individual component testing
- **Integration Tests**: Component interaction testing
- **E2E Tests**: End-to-end user workflows
- **Accessibility Tests**: WCAG compliance verification

## 🚀 Deployment

### Production Build
```bash
npm run build
npm run start
```

### Deployment Options
- **Vercel**: Recommended for Next.js applications
- **Netlify**: Static site deployment
- **AWS Amplify**: Full-stack deployment
- **Docker**: Containerized deployment

### Environment Configuration
```env
# Production Environment Variables
NEXT_PUBLIC_API_URL=https://api.mbongapap.co.ke
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_production_key
NEXT_PUBLIC_MPESA_API_KEY=your_mpesa_key
```

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Standards
- **TypeScript**: Strict type checking enabled
- **ESLint**: Code quality and consistency
- **Prettier**: Code formatting
- **Conventional Commits**: Standardized commit messages

### Testing Requirements
- All new features must include tests
- Maintain minimum 80% code coverage
- Ensure accessibility compliance
- Test across multiple devices and browsers

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Local Vendors**: For inspiring this platform
- **Delivery Riders**: For their essential role in the ecosystem
- **Open Source Community**: For the amazing tools and libraries
- **Design System**: Built with shadcn/ui and Tailwind CSS

## 📞 Support

- **Email**: support@mbongapap.co.ke
- **Documentation**: [docs.mbongapap.co.ke](https://docs.mbongapap.co.ke)
- **Issues**: [GitHub Issues](https://github.com/your-username/mboga-pap/issues)

---

**Made with ❤️ for the Kenyan community**

*Fresh And Fast 🏍️* 