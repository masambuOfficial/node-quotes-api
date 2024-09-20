const express = require("express");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const cors = require('cors');
const authorRoutes = require("./routes/authorRoutes");
const quoteRoutes = require("./routes/quoteRoutes");
const usersRouter = require("./routes/usersRouter");

const app = express();
const port = process.env.PORT || 4500;

// Configure CORS options
const corsOptions = {
  origin: ['http://localhost:5174', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// Use CORS middleware
app.use(cors(corsOptions));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Serve the documentation file without the .html extension
app.get('/docs/quotes-api-docs', (req, res) => {
  res.sendFile(path.join(__dirname, 'docs', 'quotes-api-docs.html'));
});

// Middleware setup
app.use(express.json());
app.use(
  morgan("combined", {
    stream: fs.createWriteStream(
      path.join(__dirname, "logs", "request_logs.txt"),
      { flags: "a" }
    ),
  })
);

// Routes
app.use("/authors", authorRoutes);
app.use("/quotes", quoteRoutes);
app.use("/users", usersRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message });
});

// Start the server only if the script is run directly
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

module.exports = app; // Export the app for testing
