const mongoose = require('mongoose');
const app = require('./app')
const dotenv = require("dotenv");

dotenv.config();
// На сайті Render ніяк не вдається запустити цей бекенд - build failed
const { DB_HOST } = process.env;

mongoose.set('strictQuery', true)

mongoose.connect(`${DB_HOST}`)
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
