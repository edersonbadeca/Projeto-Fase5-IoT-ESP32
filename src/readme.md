# Farm Tech Solutions - Sensor Data API

This application provides a CRUD API for managing sensor data from the Farm Tech Solutions IoT system.

## Features

- Store and retrieve sensor data (temperature, humidity, pH, irrigation status)
- RESTful API built with FastAPI
- SQLAlchemy ORM for database operations

## Installation

1. Clone this repository
2. Create a virtual environment:
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```
   pip install -r requirements.txt
   ```
4. Set up environment variables in a `.env` file:
   ```
   DATABASE_URL=postgresql://username:password@localhost/farm_tech_db
   ```
5. Run database migrations:
   ```
   alembic upgrade head
   ```

## Running the Application

```
uvicorn app.main:app --reload
```

The API will be available at http://localhost:8000

## API Documentation

Once the application is running, you can access the interactive API documentation at:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc 