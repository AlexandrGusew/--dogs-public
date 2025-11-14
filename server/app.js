const express = require('express');
const cors = require('cors');
const favoritesRouter = require('./routes/favorites.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/favorites', favoritesRouter);

module.exports = app;
