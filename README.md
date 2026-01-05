# Bedbug Detector Backend

FastAPI-based backend for the Bedbug Detection System with AI-powered image analysis.

## Features

- **Image Upload & Prediction**: Upload images for real-time bedbug detection
- **Smart Prediction**: Handles image rotation for uncertain predictions
- **Database Storage**: SQLite database for prediction history
- **RESTful API**: Complete API with health checks and statistics
- **CORS Support**: Ready for frontend integration

## Setup

### Prerequisites

- Python 3.8+
- TensorFlow model file: `model/cimex_binary_RGB_V4.keras`

### Installation

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Place your trained model in the `model/` directory:
```
backend/
├── model/
│   └── cimex_binary_RGB_V4.keras
├── app.py
├── Database.py
├── testing.py
└── requirements.txt
```

3. Set environment variables (optional):
```bash
export MODEL_PATH="model/cimex_binary_RGB_V4.keras"
export DATABASE_URL="sqlite:///./predictions.db"
```

### Running the Server

```bash
python app.py
```

Or with uvicorn directly:
```bash
uvicorn app:app --host 0.0.0.0 --port 8000 --reload
```

The API will be available at `http://localhost:8000`

## API Endpoints

### Health Check
```
GET /health
```
Returns server status and model availability.

### Predict
```
POST /predict
Content-Type: multipart/form-data

Body:
- image: (file) JPG or PNG image
```

Response:
```json
{
  "label": "Cimex",
  "probability": 0.85,
  "confidence": 0.92
}
```

### Save Prediction
```
POST /save
Content-Type: application/json

Body:
{
  "label": "Cimex",
  "confidence": 0.92,
  "probability": 0.85,
  "image_name": "sample.jpg"
}
```

### Get History
```
GET /history?limit=100
```

Returns list of recent predictions.

### Get Statistics
```
GET /stats
```

Returns prediction statistics.

## Deployment

### Docker

Create a `Dockerfile`:
```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]
```

Build and run:
```bash
docker build -t bedbug-detector-backend .
docker run -p 8000:8000 -v $(pwd)/model:/app/model bedbug-detector-backend
```

### Environment Variables

- `MODEL_PATH`: Path to the trained model (default: `model/cimex_binary_RGB_V4.keras`)
- `DATABASE_URL`: Database connection string (default: `sqlite:///./predictions.db`)

## Frontend Integration

The frontend expects the backend to be running at `http://localhost:8000` (or configure via `VITE_API_URL`).

### CORS Configuration

The backend allows all origins by default. For production, update the CORS settings in `app.py`:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://yourdomain.com"],  # Specify allowed origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## Database

The system uses SQLite by default. The database file `predictions.db` is created automatically.

### Schema

**predictions table:**
- `id`: Integer (primary key)
- `label`: String (Cimex, Non-Cimex, or uncertain)
- `confidence`: Float (0-1)
- `probability`: Float (0-1)
- `image_name`: String
- `created_at`: DateTime

## Model Information

The system uses a binary classification model trained to distinguish between:
- **Cimex**: Bedbug detected
- **Non-Cimex**: No bedbug detected

The model accepts 300x300 RGB images and outputs probability scores.

## Troubleshooting

### Model Not Found
Ensure the model file is in the correct location and the `MODEL_PATH` environment variable is set correctly.

### CORS Errors
Check that the backend is running and CORS is properly configured.

### Database Errors
Ensure the database directory is writable and the database file is not locked.

## Performance Tips

- Use GPU acceleration if available (install `tensorflow-gpu`)
- Implement image caching for frequently analyzed images
- Consider adding request rate limiting for production
- Monitor database size and implement cleanup policies

## License

This backend is part of the Bedbug Detector system.
