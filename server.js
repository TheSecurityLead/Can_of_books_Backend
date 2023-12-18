const express = require('express');
const cors = require("cors")
const mongoose = require('mongoose');
const Book = require('./models/book');
const config = require('./config/config'); // Import the Book model

const app = express();
const port = 3000;

mongoose.connect('mongodb+srv://sgrie10:password1234@cluster0.ryy2uov.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const seedDatabase = async () => {
    await Book.create([
      { title: 'Book 1', description: 'Description 1', status: 'Available' },
      { title: 'Book 2', description: 'Description 2', status: 'Checked Out' },
      { title: 'Book 3', description: 'Description 3', status: 'Available' },
    ]);
  
    console.log('Database seeded!');
  };
  
  seedDatabase();

  app.get('/books', async (req, res) => {
    try {
      const books = await Book.find();
      res.json(books);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });