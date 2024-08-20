const Quote = require('../models/quoteModel');
const { v4: uuidv4 } = require('uuid');

// GET all quotes
exports.getAllQuotes = (req, res, next) => {
    try {
        const quotes = Quote.getQuotes();
        res.status(200).json(quotes);
    } catch (error) {
        next(error);
    }
};

// GET a single quote by ID
exports.getQuoteById = (req, res, next) => {
    try {
        const quotes = Quote.getQuotes();
        const quote = quotes.find(q => q.id === req.params.id);

        if (!quote) {
            return res.status(404).json({ message: 'Quote not found' });
        }

        res.status(200).json(quote);
    } catch (error) {
        next(error);
    }
};

// POST a new quote
exports.createQuote = (req, res, next) => {
    try {
        const quotes = Quote.getQuotes();
        const newQuote = {
            id: uuidv4(),
            author: req.body.author,
            text: req.body.text,
            year: req.body.year
        };

        quotes.push(newQuote);
        Quote.saveQuotes(quotes);

        res.status(201).json(newQuote);
    } catch (error) {
        next(error);
    }
};

// PUT (update) an existing quote by ID
exports.updateQuote = (req, res, next) => {
    try {
        const quotes = Quote.getQuotes();
        const index = quotes.findIndex(q => q.id === req.params.id);

        if (index === -1) {
            return res.status(404).json({ message: 'Quote not found' });
        }
        quotes[index] = {
            ...quotes[index],
            author: req.body.author || quotes[index].author,
            text: req.body.text || quotes[index].text,
            year: req.body.year || quotes[index].year,
        };

        Quote.saveQuotes(quotes);

        res.status(200).json(quotes[index]);
    } catch (error) {
        next(error);
    }
};

// DELETE a quote by ID
exports.deleteQuote = (req, res, next) => {
    try {
        const quotes = Quote.getQuotes();
        const index = quotes.findIndex(q => q.id === req.params.id);

        if (index === -1) {
            return res.status(404).json({ message: 'Quote not found' });
        }

        quotes.splice(index, 1);
        Quote.saveQuotes(quotes);

        res.status(204).send();
    } catch (error) {
        next(error);
    }
};
