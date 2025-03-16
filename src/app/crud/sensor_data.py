from sqlalchemy.orm import Session
from typing import List, Optional
from app.models.sensor_data import SensorData
from app.schemas.sensor_data import SensorDataCreate, SensorDataUpdate

def get_sensor_data(db: Session, skip: int = 0, limit: int = 100) -> List[SensorData]:
    """Get all sensor data entries with pagination"""
    return db.query(SensorData).order_by(SensorData.created_at.desc()).offset(skip).limit(limit).all()

def get_sensor_data_by_id(db: Session, sensor_data_id: int) -> Optional[SensorData]:
    """Get a specific sensor data entry by ID"""
    return db.query(SensorData).filter(SensorData.id == sensor_data_id).first()

def create_sensor_data(db: Session, sensor_data: SensorDataCreate) -> SensorData:
    """Create a new sensor data entry"""
    db_sensor_data = SensorData(**sensor_data.dict())
    db.add(db_sensor_data)
    db.commit()
    db.refresh(db_sensor_data)
    return db_sensor_data

def update_sensor_data(db: Session, sensor_data_id: int, sensor_data: SensorDataUpdate) -> Optional[SensorData]:
    """Update an existing sensor data entry"""
    db_sensor_data = get_sensor_data_by_id(db, sensor_data_id)
    if db_sensor_data:
        update_data = sensor_data.dict(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_sensor_data, key, value)
        db.commit()
        db.refresh(db_sensor_data)
    return db_sensor_data

def delete_sensor_data(db: Session, sensor_data_id: int) -> bool:
    """Delete a sensor data entry"""
    db_sensor_data = get_sensor_data_by_id(db, sensor_data_id)
    if db_sensor_data:
        db.delete(db_sensor_data)
        db.commit()
        return True
    return False 