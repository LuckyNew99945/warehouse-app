const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express(); //use express;
const port = process.env.PORT || 5000;

app.use(cors()); //cors enabled
app.use(express.json()); //transfer data with json

mongoose
  .connect('mongodb://localhost/warehouseapp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .catch((err) => console.log(err));

const connect = mongoose.connection;
connect.once('open', () => {
  console.log('mongodb connected');
});

const productsRouter = require('./routes/products');
const usersRouter = require('./routes/users');

app.use('/products', productsRouter);

app.use('/users', usersRouter);

app.listen(port, () => {
  console.log(`Server is run on port : ${port}`);
});
