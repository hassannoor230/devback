# Devcorex Backend

Node.js + Express + MongoDB backend with admin panel.

## Setup

1. Install dependencies:
   ```bash
   cd server
   npm install
   ```

2. Create a `.env` file in the `server` folder:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/devcorex
   JWT_SECRET=your_jwt_secret_key_here
   ADMIN_EMAIL=admin@devcorex.com
   ADMIN_PASSWORD=admin123

   # SMTP Configuration
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password
   SMTP_FROM=your-email@gmail.com
   SMTP_TO=hassannoor2309@gmail.com
   ```

3. Start MongoDB locally or use MongoDB Atlas.

4. Run the server:
   ```bash
   npm run dev
   ```

## Admin Panel

Visit `/admin` in your browser:
- Default email: `admin@devcorex.com`
- Default password: `admin123`

## API Endpoints

- `POST /api/auth/login` - Admin login
- `GET /api/auth/me` - Get current admin
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project
- `GET /api/contacts` - Get all contacts (protected)
- `POST /api/contacts` - Submit a contact form (public)
- `DELETE /api/contacts/:id` - Delete contact (protected)
- `GET /api/team` - Get all team members
- `POST /api/team` - Create team member
- `PUT /api/team/:id` - Update team member
- `DELETE /api/team/:id` - Delete team member
- `GET /api/settings` - Get all settings
- `PUT /api/settings` - Update settings
