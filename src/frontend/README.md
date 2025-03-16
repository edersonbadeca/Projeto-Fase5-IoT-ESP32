# Farm Tech Solutions Dashboard

This is the frontend dashboard for the Farm Tech Solutions IoT system. It provides a user-friendly interface to monitor and manage sensor data from your farm.

## Features

- Real-time dashboard with current sensor readings
- Historical data visualization with charts
- CRUD operations for sensor data
- Responsive design for desktop and mobile devices

## Technologies Used

- React.js
- Material-UI
- Chart.js
- Axios for API communication

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Navigate to the frontend directory:
   ```
   cd farm_tech_app/frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```
   or
   ```
   yarn install
   ```

### Running the Application

Start the development server:
```
npm start
```
or
```
yarn start
```

The application will be available at http://localhost:3000

## Project Structure

```
frontend/
├── public/                 # Public assets
├── src/
│   ├── assets/             # Images and other static assets
│   ├── components/         # Reusable UI components
│   ├── pages/              # Page components
│   ├── services/           # API services
│   ├── utils/              # Utility functions
│   ├── App.js              # Main application component
│   └── index.js            # Application entry point
└── package.json            # Project dependencies and scripts
```

## Connecting to the Backend

The frontend is configured to connect to the backend API running at http://localhost:8000. This is set up in the `package.json` file with the `proxy` field.

## Available Scripts

- `npm start` - Starts the development server
- `npm build` - Builds the app for production
- `npm test` - Runs tests
- `npm eject` - Ejects from Create React App 