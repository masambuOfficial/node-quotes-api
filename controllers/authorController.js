const { PrismaClient } = require("@prisma/client");
const { StatusCodes } = require("http-status-codes"); // Ensure you have this import


const prisma = new PrismaClient();

// GET all authors
exports.getAllAuthors = async (req, res) => {
  try {
    const authors = await prisma.author.findMany();

    if (authors.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "No authors found" });
    }

    res.status(StatusCodes.OK).json(authors);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error.message);
  }
};

// GET a single author by ID
exports.getAuthorById = async (req, res) => {
  try {
    const author = await prisma.author.findUnique({
      where: { id: parseInt(req.params.id) },
    });

    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }

    res.status(200).json(author);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve author", error: error.message });
  }
};

// POST a new author
exports.createAuthor = async (req, res) => {
  try {
    // Create a new author in the database using Prisma
    const newAuthor = await prisma.author.create({
      data: {
        name: req.body.name,
        picture: req.body.picture,
      },
    });

    // Return the newly created author with a 201 status
    res.status(201).json(newAuthor);
  } catch (error) {
    // Handle any errors during the creation process
    res
      .status(500)
      .json({
        message: "Failed to create the new author",
        error: error.message,
      });
  }
};

// PUT (update) an existing author by ID
exports.updateAuthor = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Update the author in the database using Prisma
      const updatedAuthor = await prisma.author.update({
        where: { id: parseInt(id) },  // Ensure the ID is parsed as an integer
        data: {
          name: req.body.name,
          picture: req.body.picture,
        },
      });
  
      // Return the updated author with a 200 status
      res.status(200).json(updatedAuthor);
    } catch (error) {
      if (error.code === 'P2025') { // Prisma error code for "Record to update not found"
        return res.status(404).json({ message: "Author not found" });
      }
      // Handle any other errors during the update process
      res.status(500).json({ message: "Failed to update the author", error: error.message });
    }
  };
  

exports.deleteAuthor = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Attempt to delete the author from the database using Prisma
      await prisma.author.delete({
        where: { id: parseInt(id) }, // Ensure the ID is parsed as an integer
      });
  
      // If the deletion is successful, return a 204 No Content status
      res.status(204).send(); // 204 indicates the request was successful, but there's no content to send back
    } catch (error) {
      if (error.code === 'P2025') { // Prisma error code for "Record to delete not found"
        return res.status(404).json({ message: "Author not found" });
      }
      // Handle any other errors that occur during the deletion process
      res.status(500).json({ message: "Failed to delete the author", error: error.message });
    }
  };
  
