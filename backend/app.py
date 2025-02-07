from flask import Flask, request, jsonify, send_from_directory
import os
import pandas as pd
import matplotlib
matplotlib.use('agg')  # Use a backend that does not require a GUI
import matplotlib.pyplot as plt
from io import BytesIO
import uuid
from werkzeug.utils import secure_filename
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Make sure these directories exist
UPLOAD_FOLDER = 'uploads'
GRAPH_FOLDER = 'static/graphs'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['GRAPH_FOLDER'] = GRAPH_FOLDER

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'message': 'No file part'}), 400
    
    file = request.files['file']
    
    print("Received file:", file.filename)
    
    if file.filename == '':
        return jsonify({'message': 'No selected file'}), 400
    
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        
        # Process the CSV file (cleaning)
        cleaned_file = process_csv(filepath)

        # Generate graph
        graph_url = generate_graph(cleaned_file)

        return jsonify({
            'message': 'File uploaded and processed successfully',
            'cleaned_csv_url': f'uploads/{filename}',
            'graph_url': graph_url
        })
    
    return jsonify({'message': 'Invalid file format'}), 400

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ['csv']

def process_csv(filepath):
    # Load and clean the CSV using pandas
    df = pd.read_csv(filepath)
    
    print("CSV loaded successfully for processing.")

    # Example: Remove rows with missing values (you can add more processing logic here)
    df = df.dropna()
    
    print("CSV cleaned successfully.")

    # Save cleaned CSV
    cleaned_filename = 'cleaned_' + os.path.basename(filepath)
    cleaned_filepath = os.path.join(app.config['UPLOAD_FOLDER'], cleaned_filename)
    df.to_csv(cleaned_filepath, index=False)
    
    print("Cleaned CSV saved successfully.")

    return cleaned_filepath

def generate_graph(cleaned_file):
    # Example: Generate a simple plot using Matplotlib
    df = pd.read_csv(cleaned_file)
    
    print("CSV read successfully for graph generation.")

    # Simple bar plot based on the first two columns
    plt.figure(figsize=(10, 6))
    
    # Lets do something simple for the data
    # Lets make a frequency bar graph using the string items in column 1
    
    df[df.columns[1]].value_counts().plot(kind='bar')
    
    # df.plot(kind='bar', x=df.columns[0], y=df.columns[1])
    
    print("Graph generated successfully.")

    # Save the graph
    graph_filename = str(uuid.uuid4()) + '.png'
    graph_filepath = os.path.join(app.config['GRAPH_FOLDER'], graph_filename)
    plt.savefig(graph_filepath)
    
    print("Graph saved successfully.")
    
    # Return the URL for the graph
    return f'static/graphs/{graph_filename}'

@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

if __name__ == '__main__':
    app.run(debug=True)
