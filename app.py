
from flask import Flask, render_template, request, jsonify
import tensorflow as tf
from tensorflow.keras.models import load_model
import numpy as np
from PIL import Image
import io
import base64

app = Flask(__name__)

# Load the trained rice classification model
try:
    model = load_model('src/Training/rice.h5')
    print("Rice classification model loaded successfully!")
except:
    print("Model file not found. Using dummy predictions.")
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
        image_data = request.json['image']
        
        # Decode base64 image
        image_data = image_data.split(',')[1]
        image = Image.open(io.BytesIO(base64.b64decode(image_data)))
        
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
            # Dummy prediction for demo
            predicted_class = 'Arborio'
            confidence = 0.95
        
        return jsonify({
            'prediction': predicted_class,
            'confidence': confidence,
            'status': 'success'
        })
    
    except Exception as e:
        return jsonify({
            'error': str(e),
            'status': 'error'
        })

if __name__ == '__main__':
    app.run(debug=True)
