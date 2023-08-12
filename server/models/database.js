const mongoose = require('mongoose');

const dbUrl = (process.env.NODE_ENV && process.env.NODE_ENV === 'production') ? process.env.MONGODB_URI1 + "recipeMadeEasy" + process.env.MONGODB_URI2 : process.env.MONGODB_URI;

// mongoose.connect(dbUrl);
// // mongoose.connect(process.env.MONGODB_URI);

// const db = mongoose.connection;
// db.on('error',console.error.bind(console,'connection error:'));
// db.once('open',()=>{
//     console.log('Connected')
// });

mongoose.set("strictQuery", true);

try {
  const conn = mongoose.connect(dbUrl);
  console.log("Database Connected!");
} catch (error) {
  console.log(`Database Connection Error! : ${error}`);
}

require('./Category');
require('./Recipe');