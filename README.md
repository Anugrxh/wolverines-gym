# Wolverines Fitness Studio - Production-Grade React App

A modern, responsive fitness studio website built with React, Vite, and Tailwind CSS using mock data for development.

## 🚀 Features

### **Frontend (React + Vite + Tailwind)**
- **Modern Tech Stack**: Built with Vite for fast development and optimized builds
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Responsive Design**: Mobile-first approach ensuring great experience on all devices
- **Component-Based**: Modular React components with reusable UI elements
- **Performance Optimized**: Fast loading times and smooth animations
- **Production-Grade Structure**: Organized codebase following best practices
- **Mock Data**: Comprehensive mock data for all sections without backend dependency

## 📁 Project Structure

```
├── src/
│   ├── components/          # React components
│   │   ├── ui/             # Reusable UI components
│   │   ├── forms/          # Form components
│   │   ├── common/         # Common components
│   │   └── index.js        # Component exports
│   ├── hooks/              # Custom React hooks
│   ├── utils/              # Utility functions
│   ├── config/             # Configuration files
│   ├── data/               # Mock data for all sections
│   └── App.jsx             # Main App component
├── public/assests/         # Static assets
└── docs/                   # Documentation
```

## 🛠️ Development

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Setup & Run
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎨 Design & Styling

### **Color Scheme**
- **Primary**: Harvest Gold (#EAA620)
- **Secondary**: Naples Yellow (#F3CE4D)
- **Dark**: Black variants (#000000, #030402)
- **Background**: Snow (#FCF8F8)

### **Typography**
- **Headings**: Oswald (Bold, Uppercase)
- **Body**: Open Sans (Regular)

### **Components**
- Reusable UI components in `src/components/ui/`
- Consistent styling with Tailwind utilities
- Responsive design patterns
- Smooth animations and transitions

## 🔧 Key Improvements Made

### **1. Production-Grade Structure**
- ✅ Organized component hierarchy
- ✅ Reusable UI components
- ✅ Custom hooks for common functionality
- ✅ Utility functions and helpers
- ✅ Configuration management
- ✅ Environment variable setup

### **2. Fixed Issues**
- ✅ **Logo Path Fixed**: Corrected navbar logo path to `/assests/logo/gym logo-1.png`
- ✅ **Import Organization**: Clean barrel exports for components
- ✅ **Code Structure**: Separated concerns properly
- ✅ **Performance**: Optimized with custom hooks

### **3. Enhanced Components**
- ✅ **Button Component**: Reusable with variants and sizes
- ✅ **Card Component**: Flexible card layouts
- ✅ **Section Component**: Consistent section wrapper
- ✅ **SectionTitle Component**: Standardized titles

### **4. Developer Experience**
- ✅ **Custom Hooks**: `useScrollPosition`, `useLocalStorage`
- ✅ **Helper Functions**: Scroll, validation, formatting utilities
- ✅ **Constants**: Centralized configuration
- ✅ **Mock Data**: Structured development data

## 🚀 Backend API Features

### **Complete Content Management**
- Hero sections with images and stats
- About section with features
- Training programs with categories
- Trainer profiles with certifications
- Gallery with image/video upload
- Customer testimonials with ratings
- Pricing plans with customization
- Contact information and settings

### **API Endpoints**
- `GET/POST/PUT/DELETE /api/hero` - Hero management
- `GET/POST/PUT/DELETE /api/training` - Training programs
- `GET/POST/PUT/DELETE /api/trainers` - Trainer profiles
- `GET/POST/PUT/DELETE /api/gallery` - Gallery management
- `GET/POST/PUT/DELETE /api/testimonials` - Testimonials
- `GET/POST/PUT/DELETE /api/pricing` - Pricing plans
- `GET/PUT /api/settings` - Site settings

## 📱 Responsive Features

- Mobile-first design approach
- Hamburger menu for mobile navigation
- Responsive grid layouts
- Touch-friendly interactive elements
- Optimized images for different screen sizes

## 🔒 Security & Performance

### **Frontend**
- Environment variable management
- Optimized bundle sizes
- Code splitting and lazy loading
- Image optimization
- Smooth animations with CSS transitions

### **Backend**
- JWT authentication
- Input validation and sanitization
- File upload security
- Rate limiting and CORS
- Helmet security headers

## 📄 Documentation

- `PROJECT_STRUCTURE.md` - Detailed project structure
- `backend/README.md` - Backend API documentation
- Component documentation in code
- Environment setup guides

## 🚀 Deployment Ready

### **Frontend Deployment**
- Optimized Vite build
- Static file serving
- Environment configuration
- CDN-ready assets

### **Backend Deployment**
- Production MongoDB setup
- Environment variables
- Process management (PM2)
- SSL/HTTPS configuration

## 📞 Support

**Default Admin Credentials:**
- Email: `admin@wolverinesfitness.com`
- Password: `admin123`

**API Health Check:** `GET /api/health`

---

## 🎯 What's New

✅ **Fixed navbar logo path issue**  
✅ **Reorganized into production-grade structure**  
✅ **Added reusable UI components**  
✅ **Implemented custom hooks**  
✅ **Created utility functions**  
✅ **Centralized configuration**  
✅ **Enhanced developer experience**  
✅ **Complete backend integration ready**  

**Ready to build amazing fitness experiences! 💪**