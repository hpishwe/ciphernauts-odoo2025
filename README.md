# ciphernauts-odoo2025

## Problem statement 
- Develop **`ReWear`**, a web-based platform that enables users to exchange unused clothing
through direct swaps or a point-based redemption system. The goal is to promote sustainable
fashion and reduce textile waste by encouraging users to reuse wearable garments instead of
discarding them.

## Team
 1. Harshita Pishwe - **`Team Leader`** `harshita12.pishwe@gmail.com`
   
 2. Mithlesh Saini `Mithleshmithlesh555@gmail.com`
 3. Rishabh Sharma  `rishiisharma0411@gmail.com`
 4. Kanishk Gargava `kanishkgargava@gmail.com`

## ReWear Platform

ReWear is a sustainable fashion platform built with React and Vite that enables users to exchange unused clothing through direct swaps or a point-based redemption system.

### Features
- **Dark Gaming UI Theme** - Modern, sleek interface with gaming-inspired design
- **Landing Page** - Hero section with mission statement and call-to-action
- **Browse Page** - Item cards with filtering and search functionality
- **Login Page** - Form validation and user authentication
- **Responsive Design** - Mobile-friendly interface
- **Notification System** - Real-time user feedback
- **Component Architecture** - Modular, maintainable code structure

### Technology Stack
- **Frontend**: React 19, Vite 7
- **Styling**: CSS with custom properties and responsive design
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **Real-time**: Socket.io Client
- **Forms**: React Hook Form

### Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser** and navigate to `http://localhost:3000`

### Environment Variables

Create a `.env` file in the root directory:
```
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
VITE_APP_NAME=ReWear
```

### Build for Production

```bash
npm run build
```

The application will be built to the `dist` directory with sourcemaps enabled.
