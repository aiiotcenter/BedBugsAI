"""
Database configuration for Bedbug Detector
Supports SQLite with cross-platform compatibility
"""

from sqlalchemy import Column, Integer, String, Float, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from datetime import datetime
import os

# Use environment variable or default to SQLite
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./predictions.db")

# Create engine with proper configuration
engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False} if "sqlite" in DATABASE_URL else {}
)

SessionLocal = sessionmaker(bind=engine)
Base = declarative_base()


class Prediction(Base):
    """Model for storing prediction results"""
    __tablename__ = "predictions"

    id = Column(Integer, primary_key=True, index=True)
    label = Column(String, index=True)
    confidence = Column(Float)
    probability = Column(Float, nullable=True)
    image_name = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow, index=True)


# Create tables
Base.metadata.create_all(bind=engine)
