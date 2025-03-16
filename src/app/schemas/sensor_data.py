from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class SensorDataBase(BaseModel):
    temperature: float = Field(..., description="Temperature in Celsius")
    humidity: float = Field(..., description="Humidity percentage")
    ph: float = Field(..., description="pH level")
    irrigation: bool = Field(..., description="Irrigation status (on/off)")

class SensorDataCreate(SensorDataBase):
    pass

class SensorDataUpdate(BaseModel):
    temperature: Optional[float] = Field(None, description="Temperature in Celsius")
    humidity: Optional[float] = Field(None, description="Humidity percentage")
    ph: Optional[float] = Field(None, description="pH level")
    irrigation: Optional[bool] = Field(None, description="Irrigation status (on/off)")

class SensorDataResponse(SensorDataBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        orm_mode = True
        from_attributes = True 