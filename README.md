# MERN Stack Hackathon Registration App

A complete MERN (MongoDB, Express.js, React, Node.js) stack application for VIT Hackathon 2024 team registration with beautiful neumorphic design.

## Features

### Authentication
- User registration with name, email, mobile number
- Secure login with email and password
- JWT token-based authentication
- Password strength validation

### Team Registration
- Team size: 2-3 members including leader
- Team leader must have @vitapstudent.ac.in email
- Collect full details for all team members (name, email, mobile, registration number)
- Unique team ID generation (team reg + leader mobile last 3 digits)
- PDF certificate generation and download

### Design
- Beautiful neumorphic design with soft shadows
- Dark/light mode toggle
- Responsive design for all devices
- Smooth animations and hover effects
- Clean typography and layout

### Database
- MongoDB with separate collections for users and teams
- Proper data validation and error handling
- Secure password hashing

## Tech Stack

### Backend
- Node.js with Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing
- CORS for cross-origin requests

### Frontend
- React 18 with hooks
- Axios for API calls
- jsPDF for PDF generation
- Lucide React for icons
- Pure CSS with neumorphic design

## Local Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB account (Atlas)
- Git

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment variables:**
   The `.env` file is already configured with your MongoDB connection. If you need to change the JWT secret:
   ```
   JWT_SECRET=your_new_jwt_secret_here
   ```

4. **Start the backend server:**
   ```bash
   npm run dev
   ```
   The backend will run on `http://localhost:5000`

### Frontend Setup

1. **Open a new terminal and navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the frontend development server:**
   ```bash
   npm run dev
   ```
   The frontend will run on `http://localhost:3000`

### Running the Complete Application

1. **Start Backend (Terminal 1):**
   ```bash
   cd backend
   npm run dev
   ```

2. **Start Frontend (Terminal 2):**
   ```bash
   cd frontend
   npm run dev
   ```

3. **Access the application:**
   - Open your browser and go to `http://localhost:3000`
   - The frontend automatically proxies API calls to the backend

## API Endpoints

### Authentication
- `POST /api/users/register` - User registration
- `POST /api/users/login` - User login

### Teams
- `POST /api/teams/register` - Team registration (requires authentication)
- `GET /api/teams/my-team` - Get team details (requires authentication)

## Database Collections

### Users Collection
```javascript
{
  name: String,
  email: String (unique),
  mobile: String (unique),
  password: String (hashed),
  isTeamLead: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Teams Collection
```javascript
{
  teamId: String (unique),
  teamName: String,
  leaderId: ObjectId (ref: User),
  leader: {
    name: String,
    email: String,
    mobile: String,
    registrationNumber: String
  },
  members: [{
    name: String,
    email: String,
    mobile: String,
    registrationNumber: String
  }],
  totalMembers: Number (2-3),
  registrationDate: Date,
  createdAt: Date,
  updatedAt: Date
}
```

## Features in Detail

### User Registration
- Full name, email, mobile number required
- Password must be at least 8 characters
- Visual password strength indicator
- Automatic JWT token generation

### Team Registration
- Only authenticated users can register teams
- Team leader must have VIT student email (@vitapstudent.ac.in)
- Team size validation (2-3 members)
- Unique team ID generation
- Complete member details collection

### PDF Certificate
- Auto-generated team registration certificate
- Contains all team and member details
- Professional formatting
- Download functionality

### Security Features
- Password hashing with bcrypt
- JWT token authentication
- Input validation and sanitization
- Protected API routes
- CORS configuration

## Deployment Notes

### Backend Deployment
- Ensure MongoDB connection string is correct
- Set proper environment variables
- Configure CORS for production domain

### Frontend Deployment
- Update API base URL for production
- Build the project: `npm run build`
- Deploy the `dist` folder

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error:**
   - Verify the connection string in `.env`
   - Check if your IP is whitelisted in MongoDB Atlas
   - Ensure the database user has proper permissions

2. **CORS Error:**
   - Make sure backend is running on port 5000
   - Check if frontend proxy configuration is correct

3. **JWT Token Issues:**
   - Clear localStorage in browser
   - Check if JWT_SECRET is properly set

4. **Module Not Found:**
   - Run `npm install` in the respective directory
   - Check if all dependencies are installed

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.