import subprocess
import sys


# Function to install missing packages
def install(package):
    subprocess.check_call([sys.executable, "-m", "pip", "install", package])


# List of required packages
required_packages = ['flask-restful', 'flasgger','flask', 'matplotlib', 'flask-cors']  # Add other required packages here

# Check if each package is installed, and install it if not
for package in required_packages:
    try:
        __import__(package)
    except ImportError:
        print(f"Package '{package}' is not installed. Installing...")
        install(package)
        print(f"Package '{package}' has been successfully installed.")

# Now that Flask, Matplotlib, and Flask-CORS are installed, import them
from flask import Flask, request, jsonify
from flask_cors import CORS
from flasgger import Swagger


app = Flask(__name__)
# initializes Swagger documentation for our application
swagger = Swagger(app)
CORS(app)  # Enable CORS for all routes

import matplotlib.pyplot as plt
import io
import base64


@app.route('/run_analysis', methods=['POST'])
def run_analysis():
    """
        This function processes a POST request containing JSON data.
        It extracts the query parameter from the JSON data
        It performs some analysis using the provided query (not shown in the provided code).
        It generates a sample plot using Matplotlib.
        It encodes the plot as a base64 string and creates a data URL (data:image/png;base64,...) containing the encoded image data.
        Finally, it returns a JSON response with the image_url containing the data URL of the generated plot.

        ---
        responses:
          200:
            description: Base64-encoded image URL of the generated plot.
            schema:
              type: object
              properties:
                image_url:
                  type: string
        """
    data = request.json
    query = data['query']

    # Perform analysis using the provided query
    # Execute the analysis steps using the query

    # Generate a sample plot (replace this with your actual plot)
    plt.plot([1, 2, 3, 4], [10, 20, 25, 30])
    plt.xlabel('X-axis Label')
    plt.ylabel('Y-axis Label')
    plt.title('Sample Plot')

    # Encode the plot as base64
    img_bytes = io.BytesIO()
    plt.savefig(img_bytes, format='png')
    img_bytes.seek(0)
    base64_img = base64.b64encode(img_bytes.read()).decode('utf-8')

    # Create data URL containing the base64-encoded image data
    data_url = f'data:image/png;base64,{base64_img}'

    # Return the data URL
    return jsonify({'image_url': data_url})


if __name__ == '__main__':
    app.run(debug=True)
