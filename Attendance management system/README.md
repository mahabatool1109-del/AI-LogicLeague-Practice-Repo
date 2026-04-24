# Attendance Management System

A comprehensive web-based attendance management system that tracks staff, vendor, and visitor attendance with real-time location and timestamp recording.

## Features

### 🎯 **Multi-User Type Support**
- **Staff Attendance**: Track employee check-in/check-out with department information
- **Vendor Attendance**: Monitor vendor visits with purpose and service type tracking
- **Visitor Management**: Register visitors with host information and check-out tracking

### 📍 **Location & Time Tracking**
- **GPS Location**: Automatic location detection using browser geolocation API
- **Real-time Timestamps**: Precise check-in/check-out times
- **Address Resolution**: Location coordinates with readable addresses

### 📊 **Dashboard & Analytics**
- **Live Dashboard**: Real-time statistics and currently active users
- **Reports**: Filterable attendance records with export functionality
- **Statistics**: Daily attendance summaries by user type

### 🔐 **Data Management**
- **RESTful API**: Complete backend API for all operations
- **Data Persistence**: In-memory data storage (easily replaceable with database)
- **Validation**: Input validation and error handling

## Technology Stack

### Backend
- **Node.js** with Express.js
- **RESTful API** design
- **CORS** enabled for frontend integration
- **UUID** for unique record generation

### Frontend
- **React** with modern hooks
- **React Router** for navigation
- **Axios** for API communication
- **Lucide React** for icons
- **CSS3** with responsive design

## Project Structure

```
Attendance management system/
├── server.js                 # Backend server
├── package.json             # Backend dependencies
├── .env                     # Environment configuration
├── models/                  # Data models
│   ├── staffData.js        # Staff information
│   ├── vendorData.js       # Vendor information
│   ├── visitorData.js      # Visitor records
│   └── attendanceData.js   # Attendance records
├── controllers/             # Business logic
│   ├── staffController.js
│   ├── vendorController.js
│   ├── visitorController.js
│   └── attendanceController.js
├── routes/                  # API routes
│   ├── staffRoutes.js
│   ├── vendorRoutes.js
│   ├── visitorRoutes.js
│   └── attendanceRoutes.js
└── frontend/                # React frontend
    ├── package.json
    ├── public/
    │   └── index.html
    └── src/
        ├── App.jsx
        ├── index.jsx
        ├── components/
        │   └── Navigation.jsx
        ├── pages/
        │   ├── Dashboard.jsx
        │   ├── StaffAttendance.jsx
        │   ├── VendorAttendance.jsx
        │   ├── VisitorCheckIn.jsx
        │   └── Reports.jsx
        └── styles/
            ├── App.css
            ├── index.css
            ├── Navigation.css
            ├── Dashboard.css
            ├── StaffAttendance.css
            ├── VendorAttendance.css
            ├── VisitorCheckIn.css
            └── Reports.css
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Backend Setup
```bash
# Install dependencies
npm install

# Start the server
npm start
# Server runs on http://localhost:5001
```

### Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Start the React app
npm start
# App runs on http://localhost:3000
```

## API Endpoints

### Staff Management
- `GET /api/staff` - Get all staff
- `GET /api/staff/:id` - Get staff by ID
- `GET /api/staff/:id/attendance` - Get staff attendance history
- `POST /api/staff/checkin` - Check in staff
- `POST /api/staff/checkout` - Check out staff

### Vendor Management
- `GET /api/vendors` - Get all vendors
- `GET /api/vendors/:id` - Get vendor by ID
- `GET /api/vendors/:id/attendance` - Get vendor attendance history
- `POST /api/vendors/checkin` - Check in vendor
- `POST /api/vendors/checkout` - Check out vendor

### Visitor Management
- `GET /api/visitors` - Get all visitors
- `GET /api/visitors/checked-in` - Get currently checked-in visitors
- `GET /api/visitors/:id` - Get visitor by ID
- `POST /api/visitors/checkin` - Register and check in visitor
- `POST /api/visitors/checkout` - Check out visitor

### Attendance Reports
- `GET /api/attendance` - Get all attendance records
- `GET /api/attendance/stats` - Get attendance statistics
- `GET /api/attendance/active` - Get currently active attendance
- `GET /api/attendance/date-range` - Get attendance by date range

## Sample Data

### Staff Members (5)
- John Smith (IT Developer)
- Sarah Johnson (HR Manager)
- Mike Davis (Finance Accountant)
- Emily Chen (Marketing Specialist)
- David Wilson (Operations Manager)

### Vendors (4)
- Tech Solutions Inc (IT Services)
- Office Supplies Co (Office Supplies)
- CleanCorp Services (Cleaning)
- SecureTech Systems (Security)

### Features Demonstrated
- Real-time location tracking
- Automatic timestamp recording
- User type-specific workflows
- Live dashboard updates
- Comprehensive reporting
- Responsive web interface

## Browser Permissions

The application requires the following browser permissions:
- **Geolocation API**: For location tracking during check-in/check-out
- **Local Storage**: For storing temporary data (optional)

## Demo Usage

1. **Start Backend**: `npm start` in root directory
2. **Start Frontend**: `npm start` in frontend directory
3. **Open Dashboard**: View real-time statistics
4. **Staff Check-in**: Select staff member and check them in
5. **Vendor Check-in**: Select vendor and specify purpose
6. **Visitor Registration**: Fill visitor form and check them in
7. **Reports**: Filter and export attendance data

## Future Enhancements

- Database integration (MongoDB/PostgreSQL)
- User authentication and authorization
- Mobile app companion
- QR code check-in system
- Email notifications
- Advanced analytics and charts
- Multi-location support
- Time zone handling

## Contributing

This is a demonstration project showcasing attendance management capabilities. The codebase is structured for easy extension and database integration.

## License

This project is for educational and demonstration purposes.


Live link for demo.html
https://github.com/mahabatool1109-del/AI-LogicLeague-Practice-Repo/tree/RiderApp/Attendance%20management%20system