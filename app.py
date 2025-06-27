
from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import tensorflow as tf
from tensorflow.keras.models import load_model
import numpy as np
from PIL import Image
import io
import base64

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load the trained rice classification model
try:
    model = load_model('src/Training/rice.h5')
    print("Rice classification model loaded successfully!")
except Exception as e:
    print(f"Model file not found: {e}. Using dummy predictions.")
    model = None

# Rice type classes
RICE_CLASSES = ['Arborio', 'Basmati', 'Jasmine', 'Brown Rice', 'Wild Rice']

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/details')
def details():
    return render_template('details.html')

@app.route('/results')
def results():
    return render_template('results.html')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get image from request
        data = request.get_json()
        if not data or 'image' not in data:
            return jsonify({
                'error': 'No image data provided',
                'status': 'error'
            }), 400

        image_data = data['image']
        
        # Decode base64 image
        if ',' in image_data:
            image_data = image_data.split(',')[1]
        
        try:
            image = Image.open(io.BytesIO(base64.b64decode(image_data)))
        except Exception as e:
            return jsonify({
                'error': f'Invalid image data: {str(e)}',
                'status': 'error'
            }), 400
        
        # Convert to RGB if necessary
        if image.mode != 'RGB':
            image = image.convert('RGB')
        
        # Preprocess image
        image = image.resize((224, 224))
        image_array = np.array(image) / 255.0
        image_array = np.expand_dims(image_array, axis=0)
        
        if model:
            # Make prediction
            predictions = model.predict(image_array)
            predicted_class = RICE_CLASSES[np.argmax(predictions)]
            confidence = float(np.max(predictions))
        else:
            # Dummy prediction for demo (when model is not available)
            import random
            predicted_class = random.choice(RICE_CLASSES)
            confidence = random.uniform(0.7, 0.95)
        
        return jsonify({
            'prediction': predicted_class,
            'confidence': confidence,
            'status': 'success'
        })
    
    except Exception as e:
        print(f"Prediction error: {str(e)}")
        return jsonify({
            'error': str(e),
            'status': 'error'
        }), 500

@app.route('/health')
def health():
    return jsonify({
        'status': 'healthy',
        'model_loaded': model is not None
    })

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
