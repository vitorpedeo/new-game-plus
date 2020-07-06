const express = require('express');
const app = express();

const path = require('path');

const userRoutes = require('./routes/userRoutes');
const gameRoutes = require('./routes/gameRoutes');

const responseStandard = require('./middlewares/responseStandard');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(responseStandard);

app.use(
  '/uploads/users',
  express.static(path.resolve(__dirname, '..', 'uploads', 'users'))
);

app.use(
  '/uploads/games',
  express.static(path.resolve(__dirname, '..', 'uploads', 'games'))
);

app.use('/auth', userRoutes);
app.use('/game', gameRoutes);

module.exports = app;
