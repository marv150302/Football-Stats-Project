/**
 * Function to send Axios requests.
 * @param {string} url The URL to send the request to.
 * @param {Object} params The parameters object to be sent with the request.
 */
function sendAxiosQuery(url, params = {}) {
    return axios.get(url, { params })
        .then(response => {
            return response.data; // Return the response data for further processing
        })
        .catch(error => {
            console.error('Axios request failed:', error);
            throw error; // Rethrow the error for handling in the calling function
        });
}