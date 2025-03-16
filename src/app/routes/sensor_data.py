from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.schemas.sensor_data import SensorDataCreate, SensorDataResponse, SensorDataUpdate
from app.crud import sensor_data as sensor_data_crud

router = APIRouter(
    prefix="/sensor-data",
    tags=["sensor-data"],
)

@router.get("/", response_model=List[SensorDataResponse])
def read_sensor_data(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=100),
    db: Session = Depends(get_db)
):
    """
    Retrieve all sensor data entries with pagination.
    """
    sensor_data = sensor_data_crud.get_sensor_data(db, skip=skip, limit=limit)
    return sensor_data

@router.get("/{sensor_data_id}", response_model=SensorDataResponse)
def read_sensor_data_by_id(sensor_data_id: int, db: Session = Depends(get_db)):
    """
    Retrieve a specific sensor data entry by ID.
    """
    db_sensor_data = sensor_data_crud.get_sensor_data_by_id(db, sensor_data_id=sensor_data_id)
    if db_sensor_data is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Sensor data not found")
    return db_sensor_data

@router.post("/", response_model=SensorDataResponse, status_code=status.HTTP_201_CREATED)
def create_sensor_data(sensor_data: SensorDataCreate, db: Session = Depends(get_db)):
    """
    Create a new sensor data entry.
    """
    return sensor_data_crud.create_sensor_data(db=db, sensor_data=sensor_data)

@router.patch("/{sensor_data_id}", response_model=SensorDataResponse)
def update_sensor_data(
    sensor_data_id: int, 
    sensor_data: SensorDataUpdate, 
    db: Session = Depends(get_db)
):
    """
    Update a sensor data entry.
    """
    db_sensor_data = sensor_data_crud.update_sensor_data(db, sensor_data_id=sensor_data_id, sensor_data=sensor_data)
    if db_sensor_data is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Sensor data not found")
    return db_sensor_data

@router.delete("/{sensor_data_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_sensor_data(sensor_data_id: int, db: Session = Depends(get_db)):
    """
    Delete a sensor data entry.
    """
    success = sensor_data_crud.delete_sensor_data(db, sensor_data_id=sensor_data_id)
    if not success:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Sensor data not found")
    return None 