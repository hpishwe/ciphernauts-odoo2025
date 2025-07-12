# ReWear - Sustainable Fashion Swap Platform

A modern web application for sustainable fashion swapping with integrated messaging system.

## Features

### 🛍️ Core Features
- **Browse Items**: Discover sustainable fashion items
- **Product Details**: View detailed item information with seller location
- **Swap System**: Direct item swaps and points-based swaps
- **Transaction Tracking**: Complete swap request flow with transaction summaries

### 💬 Messaging System
- **Floating Messages Button**: Always accessible messaging interface
- **Real-time Notifications**: Unread message count with live updates
- **Conversation Management**: View all conversations and message history
- **Location Integration**: See seller locations and arrange meetups
- **MongoDB Integration**: Persistent message storage with conversation grouping

## Tech Stack

### Frontend
- **React 19** with Vite
- **React Router** for navigation
- **Lucide React** for icons
- **CSS-in-JS** for styling

### Backend
- **Node.js** with Express
- **MongoDB** with Mongoose
- **CORS** enabled for cross-origin requests

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ciphernauts-odoo2025
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up MongoDB**
   - Install MongoDB locally or use MongoDB Atlas
   - Create a database named `rewear`
   - The application will automatically create collections

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Start the backend server** (in a new terminal)
   ```bash
   npm run server
   ```

### Production Build
```bash
npm run build
npm start
```

## Messaging System Architecture

### Database Schema
```javascript
Message Schema:
- sender: ObjectId (ref: User)
- receiver: ObjectId (ref: User)
- content: String
- relatedItem: ObjectId (ref: Item) - optional
- swapRequest: ObjectId (ref: Swap) - optional
- isRead: Boolean
- messageType: String (general, swap_inquiry, swap_related, meetup_arrangement)
- createdAt: Date
- updatedAt: Date
```

### API Endpoints
- `GET /api/messages/conversations` - Get all conversations
- `GET /api/messages/conversation/:otherUserId` - Get conversation messages
- `POST /api/messages/send` - Send a new message
- `PUT /api/messages/read/:conversationId` - Mark messages as read
- `GET /api/messages/unread-count` - Get unread message count

### Frontend Components
- **MessagesButton**: Floating action button with unread count
- **MessagesModal**: Full-screen messaging interface
- **Conversation List**: Shows all conversations with last message
- **Message Thread**: Real-time messaging interface

## Key Features

### Location Integration
- Seller location displayed on product detail pages
- Location information in messaging interface
- Easy meetup arrangement through messaging

### Message Types
- **General**: Regular messages
- **Swap Inquiry**: Messages about specific items
- **Swap Related**: Messages about ongoing swaps
- **Meetup Arrangement**: Location-based meetup planning

### Real-time Updates
- Unread count updates every 30 seconds
- Live conversation updates
- Message status tracking

## Usage Flow

1. **Browse Items**: Users can browse available items
2. **View Details**: Click on items to see seller information and location
3. **Message Seller**: Use the "Message Seller" button on product pages
4. **Access Messages**: Use the floating messages button (bottom-right)
5. **Manage Conversations**: View all conversations and message history
6. **Arrange Swaps**: Use messaging to discuss swap details and meetup locations

## Development Notes

### Demo Mode
The application includes demo data and endpoints for testing:
- Demo conversations with sample messages
- Mock authentication (any token is valid)
- Sample user data and items

### Production Considerations
- Implement proper JWT authentication
- Add real-time WebSocket connections
- Implement message encryption
- Add file/image sharing capabilities
- Add push notifications

## File Structure
```
src/
├── components/
│   ├── common/
│   │   ├── MessagesButton.jsx
│   │   └── MessagesModal.jsx
│   └── pages/
│       ├── ProductDetailPage.jsx
│       └── TransactionPage.jsx
├── models/
│   └── Message.js
├── controllers/
│   └── messageController.js
├── routes/
│   └── messages.js
└── App.jsx
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
