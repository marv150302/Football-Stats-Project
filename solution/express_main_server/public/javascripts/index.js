const mongoose = require('mongoose');

const mongoDB = 'mongodb://localhost:27017/Progetto_IUM_TWEB';
mongoose.Promise = global.Promise;
connection = mongoose.connect(mongoDB, {
    checkServerIdentity: false,
})
    .then(() => {
        console.log('connection to mongodb worked!');
    })
    .catch((error) => {
        console.log('connection to mongodb did not work! '
            + JSON.stringify(error));
    });