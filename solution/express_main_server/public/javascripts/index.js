
test()
function test() {

    axios.get('/api/club-games')
        .then(response => {
            // Handle successful response
            console.log('Clubs:', response.data);
            // Here you can do whatever you want with the received data, such as updating your UI
        })
        .catch(error => {
            // Handle error
            console.error('Error:', error);
        });
}

function sendAxiosQuery(url, data) {

}