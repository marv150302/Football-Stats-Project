const Appearances = require('../models/appearances');

// Controller function to retrieve all data from the "Appearances" collection
async function getAllAppearances(req, res) {
    try {
        // Retrieve all documents from the collection
        const data = await Appearances.find();
        res.json(data);
    } catch (error) {
        console.error('Error retrieving data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    getAllAppearances
};
