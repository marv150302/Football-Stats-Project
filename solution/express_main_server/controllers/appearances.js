const APPEARANCES = require('../models/appearances');

// Controller function to retrieve all data from the "APPEARANCES" collection

async function getAllAppearances(req, res) {
    try {
        // Retrieve all documents from the collection
        const data = await APPEARANCES.find().limit(10);
        res.json(data);
    } catch (error) {
        console.error('Error retrieving data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    getAllAppearances
};
