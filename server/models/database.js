const mongoose = require('mongoose');

const dbUrl = process.env.MONGODB_URI1 + "recipeMadeEasy" + process.env.MONGODB_URI2;

// const dbUrl = (process.env.NODE_ENV && process.env.NODE_ENV === 'production')
//   ? process.env.MONGODB_URI1 + "recipeMadeEasy" + process.env.MONGODB_URI2
//   : process.env.MONGODB_URI;

// const db = mongoose.connection;
// db.on('error',console.error.bind(console,'connection error:'));
// db.once('open',()=>{
//     console.log('Connected')
// });
// console.log(dbUrl);
mongoose.set("strictQuery", true);

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Database Connected!");
  })
  .catch(error => {
    console.error(`Database Connection Error: ${error}`);
  });

require('./Category');
require('./Recipe');
