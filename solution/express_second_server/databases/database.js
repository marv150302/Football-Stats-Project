const MONGOOSE = require('mongoose');

const MONGO_DB = 'mongodb://localhost:27017/Progetto_IUM_TWEB';
MONGOOSE.Promise = global.Promise;

connection = MONGOOSE.connect(MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('connection to mongodb successful!');
    })
    .catch((error) => {
        console.log('connection to mongodb unsuccessful ' + JSON.stringify(error));
    });
