const express = require('express');
const {
    getAllQuotes,
    getQuoteById,
    createQuote,
    updateQuote,
    deleteQuote
} = require('../controllers/quoteController');
const router = express.Router();

// GET all quotes
router.get('/', getAllQuotes);

// GET a specific quote by ID
router.get('/:id', getQuoteById);

// POST a new quote
router.post('/', createQuote);

// PUT (update) a quote by ID
router.put('/:id', updateQuote);

// DELETE a quote by ID
router.delete('/:id', deleteQuote);

module.exports = router;
