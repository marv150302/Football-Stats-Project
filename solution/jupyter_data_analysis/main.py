import subprocess
import sys


# Function to install missing packages
def install(package):
    subprocess.check_call([sys.executable, "-m", "pip", "install", package])


# List of required packages
required_packages = ['flask-restful', 'flasgger', 'flask', 'matplotlib',
                     'flask-cors']  # Add other required packages here

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
import requests

app = Flask(__name__)
# initializes Swagger documentation for our application
swagger = Swagger(app)
CORS(app)


def send_http_request(method, url, data=None, headers=None):
    """
    Function to make HTTP requests using the requests library.

    Args:
    - method (str): HTTP method (e.g., 'GET', 'POST', 'PUT', 'DELETE')
    - url (str): URL of the endpoint to send the request to
    - data (dict): Data to send with the request (default: None)
    - headers (dict): Headers to include in the request (default: None)

    Returns:
    - dict: Response data if the request is successful, None otherwise
    """

    try:
        # Make the request
        if method == 'GET':
            response = requests.get(url, params=data, headers=headers)
        elif method == 'POST':
            response = requests.post(url, json=data, headers=headers)
        elif method == 'PUT':
            response = requests.put(url, json=data, headers=headers)
        elif method == 'DELETE':
            response = requests.delete(url, json=data, headers=headers)
        else:
            raise ValueError("Unsupported HTTP method")

        # Check if the request was successful (status code 200)
        if response.status_code == 200:
            # Return the response data

            return response.json()
        else:
            # Print an error message if the request failed
            print('Error:', response.status_code)
            return None
    except Exception as e:
        # Print an error message if an exception occurred
        print('Error:', e)
        return None


@app.route('/run_analysis', methods=['GET'])
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

    # Make a GET request to the Jupyter Flask endpoint to fetch the compressed base64 image
    jupyter_endpoint_url = 'http://localhost:8887/get-graph'  # Update with the actual URL
    jupyter_response = requests.get(jupyter_endpoint_url)
    jupyter_data = jupyter_response.json()

    # Extract the compressed base64 image URL from the Jupyter Flask response
    compressed_base64_image_url = jupyter_data.get('compressed_base64_image_url')
    return compressed_base64_image_url;


if __name__ == '__main__':
    app.run(debug=True)
