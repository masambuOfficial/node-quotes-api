const express = require('express');
const {
    getAllAuthors,
    getAuthorById,
    createAuthor,
    updateAuthor,
    deleteAuthor
} = require('../controllers/authorController');

const router = express.Router();

// GET all authors
router.get('/', getAllAuthors);

// GET a specific author by ID
router.get('/:id', getAuthorById);

// POST a new author
router.post('/', createAuthor);

// PUT (update) an author by ID
router.put('/:id', updateAuthor);

// DELETE an author by ID
router.delete('/:id', deleteAuthor);

module.exports = router;
