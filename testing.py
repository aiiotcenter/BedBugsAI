"""
Smart prediction function for Bedbug Detection
Handles image rotation and confidence thresholding
"""

import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications.efficientnet import preprocess_input
import os

# Configuration
IMAGE_SIZE = (300, 300)
THRESHOLD = 0.7
UNCERTAIN_LOW = 0.35
UNCERTAIN_HIGH = 0.65

# Model path - supports environment variable or default
MODEL_PATH = os.getenv("MODEL_PATH", r"C:\Users\taha\Desktop\Cimex project\websit bedbug_detector\backend\models\cimex_binary_RGB_V4.keras")

# Load model with error handling
try:
    model = load_model(MODEL_PATH)
    print("✅ Model loaded successfully")
except Exception as e:
    print(f"⚠️ Warning: Could not load model from {MODEL_PATH}")
    print(f"Error: {e}")
    model = None


def predict_from_pil(pil_img):
    """
    Make prediction from PIL image
    
    Args:
        pil_img: PIL Image object
        
    Returns:
        float: Probability score (0-1)
    """
    if model is None:
        raise RuntimeError("Model not loaded. Please provide a valid model path.")
    
    img = pil_img.resize(IMAGE_SIZE)
    img_array = image.img_to_array(img)
    img_array = preprocess_input(img_array)
    img_array = np.expand_dims(img_array, axis=0)

    prob = float(model.predict(img_array, verbose=0)[0][0])
    return prob


def smart_predict(pil_img):
    """
    Smart prediction with rotation handling
    
    Performs prediction on original image and rotated versions if uncertain.
    Returns label, probability, and confidence score.
    
    Args:
        pil_img: PIL Image object
        
    Returns:
        dict: {
            "label": str (Cimex, Non-Cimex, or uncertain),
            "probability": float (0-1),
            "confidence": float (0-1)
        }
    """
    if model is None:
        raise RuntimeError("Model not loaded. Please provide a valid model path.")
    
    probs = []
    prob = predict_from_pil(pil_img)
    probs.append(prob)

    # Rotation logic if uncertain
    if UNCERTAIN_LOW <= prob <= UNCERTAIN_HIGH:
        img_rot = pil_img.copy()
        for _ in range(3):
            img_rot = img_rot.rotate(90, expand=True)
            probs.append(predict_from_pil(img_rot))

    avg_prob = float(np.mean(probs))

    if avg_prob >= THRESHOLD:
        return {
            "label": "Non-Cimex",
            "probability": avg_prob,
            "confidence": avg_prob
        }
    elif avg_prob <= (1 - THRESHOLD):
        return {
            "label": "Cimex",
            "probability": avg_prob,
            "confidence": 1 - avg_prob
        }
    else:
        return {
            "label": "uncertain",
            "probability": avg_prob,
            "confidence": 1 - abs(avg_prob - 0.5) * 2
        }


print("✅ Prediction function ready")
