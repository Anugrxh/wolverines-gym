# Wolverines Fitness Studio - Backend API

A comprehensive Node.js backend API for the Wolverines Fitness Studio website with full content management capabilities.

## 🚀 Features

### **Complete Content Management System**
- **Hero Section**: Dynamic hero banners with images, titles, buttons, and stats
- **About Section**: Gym information, features, and images
- **Training Programs**: Full CRUD for training types with categories and features
- **Trainers**: Trainer profiles with photos, certifications, and availability
- **Gallery**: Image and video gallery with categories and filtering
- **Testimonials**: Customer reviews with ratings and before/after photos
- **Pricing Plans**: Membership plans with features and customization
- **Contact Info**: Business details, location, hours, and social media
- **Site Settings**: Theme colors, SEO, business info, and feature flags

### **Technical Features**
- **Authentication**: JWT-based admin authentication
- **File Upload**: Image and video upload with validation
- **Database**: MongoDB with Mongoose ODM
- **Security**: Helmet, CORS, rate limiting, input validation
- **API Documentation**: RESTful endpoints with proper responses
- **Error Handling**: Comprehensive error handling and logging
- **Seed Data**: Pre-populated sample data for quick setup

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Setup Steps

1. **Clone and Navigate**
   ```bash
   cd backend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your configuration:
   ```env
   MONGODB_URI=mongodb://localhost:27017/gym-website
   PORT=5000
   JWT_SECRET=your-super-secret-jwt-key
   ADMIN_EMAIL=admin@wolverinesfitness.com
   ADMIN_PASSWORD=admin123
   ```

4. **Start MongoDB**
   ```bash
   # If using local MongoDB
   mongod
   ```

5. **Seed Database (Optional)**
   ```bash
   npm run seed
   ```

6. **Start Development Server**
   ```bash
   npm run dev
   ```

## 🔗 API Endpoints

### **Authentication**
- `POST /api/auth/login` - Admin login
- `POST /api/auth/register` - Register new admin (admin only)
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile
- `PUT /api/auth/change-password` - Change password

### **Hero Section**
- `GET /api/hero` - Get all hero sections
- `GET /api/hero/:id` - Get single hero section
- `POST /api/hero` - Create hero section (auth required)
- `PUT /api/hero/:id` - Update hero section (auth required)
- `DELETE /api/hero/:id` - Delete hero section (auth required)

### **About Section**
- `GET /api/about` - Get about section
- `POST /api/about` - Create about section (auth required)
- `PUT /api/about/:id` - Update about section (auth required)
- `DELETE /api/about/:id` - Delete about section (auth required)

### **Training Programs**
- `GET /api/training` - Get all training programs
- `GET /api/training/:id` - Get single training program
- `POST /api/training` - Create training program (auth required)
- `PUT /api/training/:id` - Update training program (auth required)
- `DELETE /api/training/:id` - Delete training program (auth required)
- `GET /api/training/categories/list` - Get all categories

### **Trainers**
- `GET /api/trainers` - Get all trainers
- `GET /api/trainers/:id` - Get single trainer
- `POST /api/trainers` - Create trainer (auth required)
- `PUT /api/trainers/:id` - Update trainer (auth required)
- `DELETE /api/trainers/:id` - Delete trainer (auth required)

### **Gallery**
- `GET /api/gallery` - Get all gallery items
- `GET /api/gallery/:id` - Get single gallery item
- `POST /api/gallery` - Create gallery item (auth required)
- `PUT /api/gallery/:id` - Update gallery item (auth required)
- `DELETE /api/gallery/:id` - Delete gallery item (auth required)
- `GET /api/gallery/categories/list` - Get all categories

### **Testimonials**
- `GET /api/testimonials` - Get all testimonials
- `GET /api/testimonials/:id` - Get single testimonial
- `POST /api/testimonials` - Create testimonial (auth required)
- `PUT /api/testimonials/:id` - Update testimonial (auth required)
- `DELETE /api/testimonials/:id` - Delete testimonial (auth required)

### **Pricing Plans**
- `GET /api/pricing` - Get all pricing plans
- `GET /api/pricing/:id` - Get single pricing plan
- `POST /api/pricing` - Create pricing plan (auth required)
- `PUT /api/pricing/:id` - Update pricing plan (auth required)
- `DELETE /api/pricing/:id` - Delete pricing plan (auth required)

### **Contact Information**
- `GET /api/contact` - Get contact information
- `POST /api/contact` - Create contact info (auth required)
- `PUT /api/contact/:id` - Update contact info (auth required)
- `DELETE /api/contact/:id` - Delete contact info (auth required)

### **Settings**
- `GET /api/settings` - Get public settings
- `GET /api/settings/admin` - Get all settings (admin only)
- `PUT /api/settings` - Update settings (admin only)
- `PUT /api/settings/theme` - Update theme only (admin only)
- `PUT /api/settings/maintenance` - Toggle maintenance mode (admin only)

### **Utility**
- `GET /api/health` - Health check endpoint

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```javascript
headers: {
  'Authorization': 'Bearer YOUR_JWT_TOKEN'
}
```

### Default Admin Credentials
- **Email**: `admin@wolverinesfitness.com`
- **Password**: `admin123`

## 📁 File Upload

The API supports file uploads for images and videos:

### Supported Formats
- **Images**: JPEG, JPG, PNG, GIF, WebP
- **Videos**: MP4, MPEG, QuickTime, WebM
- **Max Size**: 5MB per file
- **Max Files**: 10 files per request

### Upload Fields
- `backgroundImage` - Hero background images
- `image` - General images (about, trainers, testimonials)
- `media` - Gallery media files
- `thumbnail` - Video thumbnails
- `beforeImage` / `afterImage` - Testimonial transformation photos
- `logo` - Site logos and branding

## 🗄️ Database Models

### Collections
- **users** - Admin users and authentication
- **heroes** - Hero section content
- **abouts** - About section content
- **trainings** - Training programs
- **trainers** - Trainer profiles
- **galleries** - Gallery items
- **testimonials** - Customer testimonials
- **pricings** - Membership pricing plans
- **contacts** - Contact information
- **settings** - Site-wide settings

## 🛠️ Development

### Available Scripts
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run seed` - Seed database with sample data

### Environment Variables
```env
# Database
MONGODB_URI=mongodb://localhost:27017/gym-website

# Server
PORT=5000
NODE_ENV=development

# JWT
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=30d

# Admin Credentials
ADMIN_EMAIL=admin@wolverinesfitness.com
ADMIN_PASSWORD=admin123

# File Upload
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./uploads

# Optional: Cloudinary (for cloud storage)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

## 🔒 Security Features

- **Helmet**: Security headers
- **CORS**: Cross-origin resource sharing
- **Rate Limiting**: API rate limiting
- **Input Validation**: Request validation with express-validator
- **File Validation**: File type and size validation
- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt password hashing

## 📊 API Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... },
  "count": 10
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "errors": [ ... ]
}
```

## 🚀 Deployment

### Production Setup
1. Set `NODE_ENV=production`
2. Use a production MongoDB instance
3. Configure proper CORS origins
4. Set up SSL/HTTPS
5. Use a process manager like PM2
6. Set up proper logging and monitoring

### Docker Support (Optional)
```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

## 📝 License

This project is developed by **Anugrah M V** for Wolverines Fitness Studio.

---

## 🆘 Support

For support and questions:
- Check the API health endpoint: `GET /api/health`
- Review the logs for error details
- Ensure MongoDB is running and accessible
- Verify environment variables are set correctly

**Ready to power your fitness studio website! 💪**