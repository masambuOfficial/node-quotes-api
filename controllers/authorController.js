const Author = require('../models/authorModel');
const { v4: uuidv4 } = require('uuid');

// GET all authors
exports.getAllAuthors = (req, res) => {
    const authors = Author.getAuthors();

    if (!authors) {
        return res.status(500).json({ message: 'Failed to retrieve authors' });
    }

    res.status(200).json(authors);
};

// GET a single author by ID
exports.getAuthorById = (req, res) => {
    const authors = Author.getAuthors();

    if (!authors) {
        return res.status(500).json({ message: 'Failed to retrieve authors' });
    }

    const author = authors.find(a => a.id === req.params.id);

    if (!author) {
        return res.status(404).json({ message: 'Author not found' });
    }

    res.status(200).json(author);
};

// POST a new author
exports.createAuthor = (req, res) => {
    const authors = Author.getAuthors();

    if (!authors) {
        return res.status(500).json({ message: 'Failed to retrieve authors' });
    }

    const newAuthor = {
        id: uuidv4(),
        name: req.body.name,
        bio: req.body.bio,
    };

    authors.push(newAuthor);

    const success = Author.saveAuthors(authors);

    if (!success) {
        return res.status(500).json({ message: 'Failed to save the new author' });
    }

    res.status(201).json(newAuthor);
};

// PUT (update) an existing author by ID
exports.updateAuthor = (req, res) => {
    const authors = Author.getAuthors();

    if (!authors) {
        return res.status(500).json({ message: 'Failed to retrieve authors' });
    }

    const index = authors.findIndex(a => a.id === req.params.id);

    if (index === -1) {
        return res.status(404).json({ message: 'Author not found' });
    }

    authors[index] = {
        ...authors[index],
        name: req.body.name || authors[index].name,
        bio: req.body.bio || authors[index].bio,
    };

    const success = Author.saveAuthors(authors);

    if (!success) {
        return res.status(500).json({ message: 'Failed to update the author' });
    }

    res.status(200).json(authors[index]);
};

// DELETE an author by ID
exports.deleteAuthor = (req, res) => {
    const authors = Author.getAuthors();

    if (!authors) {
        return res.status(500).json({ message: 'Failed to retrieve authors' });
    }

    const index = authors.findIndex(a => a.id === req.params.id);

    if (index === -1) {
        return res.status(404).json({ message: 'Author not found' });
    }

    authors.splice(index, 1);

    const success = Author.saveAuthors(authors);

    if (!success) {
        return res.status(500).json({ message: 'Failed to delete the author' });
    }

    res.status(204).send();
};
