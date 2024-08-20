const fs = require('fs');

authorsRouter.delete('/:id', (req, res) => {
    fs.readFile('./Modules/authors.json', 'utf8', (err, data) => {
        if (err) return res.status(500).send('Failed to get Author Data');

        const authors = JSON.parse(data);
        const updatedAuthors = authors.filter(a => a.id !== parseInt(req.params.id));

        if (authors.length === updatedAuthors.length) {
            return res.status(404).send('No author for that ID found');
        }

        fs.writeFile('./Modules/authors.json', JSON.stringify(updatedAuthors, null, 2), err => {
            if (err) return res.status(500).send('Failed to save Author Data');
            res.send('Author deleted');
        });
    });
});
