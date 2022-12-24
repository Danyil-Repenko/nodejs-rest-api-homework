const mongoose = require('mongoose');
const app = require('./app')

const adress = 'mongodb+srv://Retyzza:XcL8KB9QgdCaosQ5@cluster0.dwcxue9.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(adress, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  promiseLibrary: global.Promise,
})
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
