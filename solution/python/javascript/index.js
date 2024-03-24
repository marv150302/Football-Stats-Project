
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'; // Allow requests from any origin
axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Content-Type'; // Allow Content-Type header
axios.get('http://127.0.0.1:5000/run_analysis', {
    headers: {
        'Content-Type': 'application/json', // Set the desired content type
        // Add other headers if needed
    }

})
    .then(response => {
        console.log(response)
        //response.json()
        //console.log(response.json())
        document.getElementById('analysisImage').src = response['data'];
    })
    .catch(error => {
        // Handle error
        console.error('Error:', error);
    });