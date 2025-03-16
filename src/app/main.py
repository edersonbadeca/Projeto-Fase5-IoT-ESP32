from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import sensor_data
from app.database import engine, Base

# Create database tables
Base.metadata.create_all(bind=engine)

# Initialize FastAPI app
app = FastAPI(
    title="Farm Tech Solutions API",
    description="API for managing sensor data from Farm Tech Solutions IoT devices",
    version="1.0.0",
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(sensor_data.router)

@app.get("/")
def read_root():
    return {
        "message": "Welcome to Farm Tech Solutions API",
        "docs": "/docs",
    } 