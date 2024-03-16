const Appearance = require('../models/appearance');

function query(body) {

    return new Promise((resolve, reject) => {
        Appearance.find(body)
            .then(results => {
                console.log(results);
                resolve(results);
            })
            .catch(error => {
                reject(error);
            });
    });
}
module.exports.query = query;