const mongoose = require('mongoose');
const app = require('./app')
// const dotenv = require("dotenv");

// dotenv.config();
// const { DB_HOST } = process.env;

const DB_HOST = 'mongodb+srv://Retyzza:XcL8KB9QgdCaosQ5@cluster0.dwcxue9.mongodb.net/db-contacts?retryWrites=true&w=majority'
mongoose.set('strictQuery', true)

mongoose.connect(DB_HOST)
  .then(() => {
    app.listen(3000, function () {
      console.log('Database connection successful');
    });
  })
  .catch(err => {
    console.log(`Server not running. Error message: ${err.message}`);
    process.exit(1)
  }
  );
