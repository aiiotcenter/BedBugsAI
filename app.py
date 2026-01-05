"""
FastAPI Backend for Bedbug Detection System

Endpoints:
- POST /predict: Upload image and get prediction
- POST /save: Save prediction to database
- GET /history: Get prediction history
- GET /health: Health check
"""

from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import img_to_array
from PIL import Image
import numpy as np
import io
import os
from typing import Optional
from pydantic import BaseModel
from Database import SessionLocal, Prediction
from testing import smart_predict

# Pydantic models
class SavePrediction(BaseModel):
    label: str
    confidence: float
    probability: Optional[float] = None
    image_name: str


class PredictionResponse(BaseModel):
    label: str
    probability: float
    confidence: float


# Initialize FastAPI app
app = FastAPI(
    title="Bedbug Detector API",
    description="AI-powered bedbug detection system",
    version="1.0.0"
)

# CORS middleware - allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify allowed origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Model configuration
MODEL_PATH = os.getenv("MODEL_PATH", r"C:\Users\taha\Desktop\Cimex project\websit bedbug_detector\backend\models\cimex_binary_RGB_V4.keras")
CLASS_NAMES = ["Non-Cimex", "Cimex"]

# Load model
model = None
try:
    model = load_model(MODEL_PATH)
    print(f"✅ Model loaded from {MODEL_PATH}")
except Exception as e:
    print(f"⚠️ Warning: Could not load model from {MODEL_PATH}")
    print(f"Error: {e}")


def preprocess_image(image: Image.Image):
    """Preprocess image for model input"""
    image = image.resize((300, 300))
    image = img_to_array(image) / 255.0
    return np.expand_dims(image, axis=0)


@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "model_loaded": model is not None,
        "api_version": "1.0.0"
    }


@app.post("/predict", response_model=PredictionResponse)
async def predict(image: UploadFile = File(...)):
    """
    Predict if image contains bedbug
    
    Args:
        image: Image file (JPG or PNG)
        
    Returns:
        PredictionResponse with label, probability, and confidence
    """
    # Validate file type
    if image.content_type not in ["image/jpeg", "image/png"]:
        raise HTTPException(400, "Only JPG or PNG images allowed")

    try:
        # Read and process image
        image_bytes = await image.read()
        img = Image.open(io.BytesIO(image_bytes)).convert("RGB")

        # Get prediction using smart_predict
        result = smart_predict(img)
        
        return PredictionResponse(
            label=result["label"],
            probability=result["probability"],
            confidence=result["confidence"]
        )
    except Exception as e:
        print(f"Error during prediction: {e}")
        raise HTTPException(500, f"Prediction failed: {str(e)}")


@app.post("/save")
async def save_prediction(data: SavePrediction):
    """
    Save prediction result to database
    
    Args:
        data: Prediction data to save
        
    Returns:
        Status message
    """
    db = SessionLocal()
    try:
        record = Prediction(
            label=data.label,
            confidence=data.confidence,
            probability=data.probability,
            image_name=data.image_name,
        )
        db.add(record)
        db.commit()
        db.refresh(record)
        return {"status": "saved", "id": record.id}
    except Exception as e:
        db.rollback()
        raise HTTPException(500, f"Failed to save prediction: {str(e)}")
    finally:
        db.close()


@app.get("/history")
async def get_history(limit: int = 100):
    """
    Get prediction history
    
    Args:
        limit: Maximum number of records to return
        
    Returns:
        List of prediction records
    """
    db = SessionLocal()
    try:
        records = db.query(Prediction).order_by(
            Prediction.created_at.desc()
        ).limit(limit).all()

        return [
            {
                "id": r.id,
                "label": r.label,
                "confidence": r.confidence,
                "probability": r.probability,
                "image_name": r.image_name,
                "created_at": r.created_at.isoformat(),
            }
            for r in records
        ]
    finally:
        db.close()


@app.get("/stats")
async def get_stats():
    """Get prediction statistics"""
    db = SessionLocal()
    try:
        total = db.query(Prediction).count()
        cimex_count = db.query(Prediction).filter(
            Prediction.label == "Cimex"
        ).count()
        non_cimex_count = db.query(Prediction).filter(
            Prediction.label == "Non-Cimex"
        ).count()
        uncertain_count = db.query(Prediction).filter(
            Prediction.label == "uncertain"
        ).count()

        return {
            "total_predictions": total,
            "cimex_detected": cimex_count,
            "non_cimex": non_cimex_count,
            "uncertain": uncertain_count,
        }
    finally:
        db.close()


@app.get("/")
async def root():
    """API root endpoint"""
    return {
        "name": "Bedbug Detector API",
        "version": "1.0.0",
        "status": "running",
        "endpoints": {
            "health": "/health",
            "predict": "/predict",
            "save": "/save",
            "history": "/history",
            "stats": "/stats"
        }
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
