
# Rice Classification Backend Setup

## Prerequisites
- Python 3.8+
- pip (Python package manager)

## Installation

1. Install required Python packages:
```bash
pip install flask flask-cors tensorflow pillow numpy
```

2. Run the Flask backend:
```bash
python app.py
```

The backend will start on `http://localhost:5000`

## API Endpoints

- `POST /predict` - Submit image for classification
- `GET /health` - Check backend health status

## Usage

1. Start the Flask backend: `python app.py`
2. The React frontend will automatically connect to the backend
3. Upload rice images and get real AI predictions!

## Notes

- The backend uses the `rice.h5` model file for predictions
- If the model file is not found, it will use dummy predictions for demo purposes
- CORS is enabled to allow requests from the React frontend
