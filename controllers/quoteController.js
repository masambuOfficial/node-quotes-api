const { PrismaClient } = require("@prisma/client");
// const { name } = require("ejs");
const { StatusCodes } = require("http-status-codes"); // Ensure you have this import

const prisma = new PrismaClient();


// GET all quotes
exports.getAllQuotes = async (req, res) => {
    try {
      const quotes = await prisma.quote.findMany();
  
      if (quotes.length === 0) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ message: "No quotes found" });
      }
  
      res.status(StatusCodes.OK).json(quotes);
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error.message);
    }
  };

// GET a single quote by ID
exports.getQuoteById = async (req, res) => {
    try {
      const quote = await prisma.quote.findUnique({
        where: { id: parseInt(req.params.id) },
      });
  
      if (!quote) {
        return res.status(404).json({ message: "Quot not found" });
      }
  
      res.status(200).json(quote);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to retrieve author", error: error.message });
    }
  };

// POST a new quote
exports.createQuote = async (req, res) => {
  try {
    const { text, year, category, name, picture, authorId } = req.body;

    // Validate input
    if (!text || !year || (!name && !authorId)) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Ensure authorId is an integer
    const parsedAuthorId = authorId ? parseInt(authorId, 10) : undefined;

    // Define the data object based on whether we're connecting to an existing author or creating a new one
    const data = {
      text,
      year: parseInt(year, 10), // Ensure year is an integer
      category,
      Author: parsedAuthorId
        ? { connect: { id: parsedAuthorId } } // Connect to an existing author using an integer ID
        : { connectOrCreate: { where: { name }, create: { name, picture } } }, // Create a new author if not found
    };

    // Create a new quote using Prisma
    const newQuote = await prisma.quote.create({
      data,
      include: { Author: true }, // Include the Author relation in the response
    });

    // Return the newly created quote with a 201 status
    res.status(201).json(newQuote);
  } catch (error) {
    // Enhanced error logging
    console.error("Error during quote creation:", error);
    res.status(500).json({
      message: "Failed to create the new quote",
      error: error.message,
    });
  }
};


  
  

// PUT (update) an existing quote by ID
exports.updateQuote = async (req, res) => {
  try {
    const { id } = req.params;
    const { text, year, category, name, picture, authorId } = req.body;

    // Ensure id is parsed as an integer
    const quoteId = parseInt(id, 10);

    // Determine author update logic
    let authorUpdateData = {};
    if (authorId) {
      // If authorId is provided, connect to an existing author
      authorUpdateData = {
        connect: { id: parseInt(authorId, 10) },
      };
    } else if (name && picture) {
      // If name and picture are provided, create a new author or connect to an existing one
      authorUpdateData = {
        connectOrCreate: {
          where: { name },
          create: { name, picture },
        },
      };
    }

    // Find and update the quote by ID
    const updatedQuote = await prisma.quote.update({
      where: { id: quoteId },
      data: {
        text,
        year: parseInt(year, 10), // Ensure year is an integer
        category,
        Author: Object.keys(authorUpdateData).length > 0 ? authorUpdateData : undefined, // Update author only if there's data
      },
      include: {
        Author: true, // Include author details in the response
      },
    });

    // Return the updated quote with a 200 status
    res.status(200).json(updatedQuote);
  } catch (error) {
    console.error("Failed to update the quote:", error);
    res.status(500).json({
      message: "Failed to update the quote",
      error: error.message,
    });
  }
};

  

// DELETE a quote by ID
exports.deleteQuote = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Attempt to delete the quote by ID
      const deletedQuote = await prisma.quote.delete({
        where: { id: parseInt(id) },
      });
  
      // Return a success message with a 200 status
      res.status(200).json({ message: "Quote deleted successfully", deletedQuote });
    } catch (error) {
      // Handle errors, such as when the quote ID does not exist
      res.status(500).json({
        message: "Failed to delete the quote",
        error: error.message,
      });
    }
  };
  
