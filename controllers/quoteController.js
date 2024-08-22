const { PrismaClient } = require("@prisma/client");
const { name } = require("ejs");
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
        return res.status(404).json({ message: "Author not found" });
      }
  
      res.status(200).json(quote);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to retrieve author", error: error.message });
    }
  };

// POST a new quote
// exports.createQuote = async (req, res) => {
//     try {
//       // Create a new author in the database using Prisma
//       const newQuote = await prisma.quote.create({
//         data: {
//           text: req.body.text,
//           year: req.body.year,
//           category: req.body.category,
//         },
//       });
  
//       // Return the newly created author with a 201 status
//       res.status(201).json(newQuote);
//     } catch (error) {
//       // Handle any errors during the creation process
//       res
//         .status(500)
//         .json({
//           message: "Failed to create the new quote",
//           error: error.message,
//         });
//     }
//   };

exports.createQuote = async (req, res) => {
    try {
      const { text, year, category, name, picture } = req.body;
  
      // Create a new quote along with author details using Prisma
      const newQuote = await prisma.quote.create({
        data: {
          text,
          year,
          category,
          Author: {  // Use the correct capitalization based on your schema
            connectOrCreate: {
              where: {
                name: name, // Make sure this matches the field in the database
              },
              create: {
                name: name,
                picture: picture,
              },
            },
          },
        },
        include: {
          Author: true, // Include the Author relation in the response
        },
      });
  
      // Return the newly created quote with a 201 status
      res.status(201).json(newQuote);
    } catch (error) {
      // Handle any errors during the creation process
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
      const { text, year, category, name, picture } = req.body;
  
      // Find and update the quote by ID
      const updatedQuote = await prisma.quote.update({
        where: { id: parseInt(id) },
        data: {
          text,
          year,
          category,
          Author: {
            connectOrCreate: {
              where: { name: name },
              create: {
                name: name,
                picture: picture,
              },
            },
          },
        },
        include: {
          Author: true, // Include author details in the response
        },
      });
  
      // Return the updated quote with a 200 status
      res.status(200).json(updatedQuote);
    } catch (error) {
      // Handle any errors during the update process
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
  
