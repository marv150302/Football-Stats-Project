const mongoose = require('mongoose');

//The URL which will be queried. Run "mongod.exe" for this to connect
const mongoDB = 'mongodb://localhost:27017/Progetto_IUM_TWEB';
mongoose.Promise = global.Promise;
connection = mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    checkServerIdentity: false,
    family: 4
})
    .then(() => {
        console.log('connection to mongodb successful!');
    })
    .catch((error) => {
        console.log('connection to mongodb unsuccessful ' + JSON.stringify(error));
    });
