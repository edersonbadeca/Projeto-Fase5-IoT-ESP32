import sys
import os
import random
from datetime import datetime, timedelta

# Add the parent directory to the path so we can import the app
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.database import SessionLocal
from app.models.sensor_data import SensorData

def seed_data():
    db = SessionLocal()
    
    # Clear existing data
    db.query(SensorData).delete()
    db.commit()
    
    # Create sample data for the last 7 days
    now = datetime.now()
    for i in range(7):
        timestamp = now - timedelta(days=i)
        
        # Create 4 readings per day (every 6 hours)
        for j in range(4):
            reading_time = timestamp - timedelta(hours=j*6)
            
            # Generate random but realistic sensor values
            temperature = round(random.uniform(18.0, 30.0), 1)
            humidity = round(random.uniform(30.0, 70.0), 1)
            ph = round(random.uniform(5.5, 8.0), 1)
            irrigation = humidity < 40.0  # Irrigation is on if humidity is below 40%
            
            # Create sensor data entry
            sensor_data = SensorData(
                temperature=temperature,
                humidity=humidity,
                ph=ph,
                irrigation=irrigation,
                created_at=reading_time
            )
            
            db.add(sensor_data)
    
    db.commit()
    db.close()
    
    print("Sample data has been added to the database.")

if __name__ == "__main__":
    seed_data() 