const express = require("express");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const authorRoutes = require("./routes/authorRoutes");
const quoteRoutes = require("./routes/quoteRoutes");
const { getQuotes } = require('./models/quoteModel');

const app = express();
const port = process.env.PORT || 4500;

// // Set the view engine to EJS
// app.set('view engine', 'ejs');

// // Static files
app.use(express.static(path.join(__dirname, 'public'))); // For serving static files like styles.css

// // Route to display quotes
// app.get('/', (req, res) => {
//     const quotes = getQuotes();
//     res.render('index', { quotes });
// });

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

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
