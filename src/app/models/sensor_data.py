from sqlalchemy import Column, Integer, Float, Boolean, DateTime, func
from sqlalchemy.ext.declarative import declarative_base
from app.database import Base

class SensorData(Base):
    __tablename__ = "sensor_data"

    id = Column(Integer, primary_key=True, index=True)
    temperature = Column(Float, nullable=False)
    humidity = Column(Float, nullable=False)
    ph = Column(Float, nullable=False)
    irrigation = Column(Boolean, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now()) 