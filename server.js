const mongoose = require('mongoose');
const app = require('./app')
const DB_HOST = require('./config')

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
