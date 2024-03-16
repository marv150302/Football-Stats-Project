// Fetch analysis results (image URL) from backend
    fetch('http://127.0.0.1:5000/run_analysis', {
        method: 'POST',
        body: JSON.stringify({ query: 'your_query_here' }), // Replace 'your_query_here' with actual query
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        // Set the image source to the received data URL
        //console.log(data.image_url)
        document.getElementById('analysisImage').src = data.image_url;
    })
    .catch(error => {
        console.error('Error:', error);
    });