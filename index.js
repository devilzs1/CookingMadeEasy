const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const fileUpload = require('express-fileupload');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('express-flash');

const app = express();
const port = process.env.PORT || 3000;

require('dotenv').config();

app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.use(expressLayouts);


app.use(cookieParser('CookingMadeEasySecure'));
app.use(session({
    secret: 'CookingMadeEasySecretSession',
    resave: true,
    saveUninitialized: true
}));
app.use(flash());
app.use(fileUpload());


app.set('layout','./layouts/main');
app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));

const routes = require('./server/routes/recipeRoutes.js')
app.use('/',routes);

app.listen(port,()=>console.log(`Listening to port ${port}`));

