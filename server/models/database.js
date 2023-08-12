const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI1 + "recipeMadeEasy" + process.env.MONGODB_URI2);
// mongoose.connect(process.env.MONGODB_URI);

const db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error:'));
db.once('open',()=>{
    console.log('Connected')
});

require('./Category');
require('./Recipe');