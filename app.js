
const express = require('express');
const path = require('path'); //if we forgot the backslashes in path urls we use this
const morgan = require('morgan'); 
const app = express();
var bodyParser = require('body-parser');

//const methodOverride = require('method-override');

app.use(morgan('tiny'));

//either find in public or in node modules .
app.use(express.static(path.join(__dirname, '/public')));
app.use('/css',express.static(path.join(__dirname,'/node_modules/bootstrap/dist/css')));
app.use('/js',express.static(path.join(__dirname,'/node_modules/bootstrap/dist/js')));
app.use('/js',express.static(path.join(__dirname,'/node_modules/jquery/dist')));
app.set('views', './src/views')
app.set('view engine', 'ejs')


const productsRouter = require('./src/routes/productsRouter');


app.use('/',productsRouter);
app.use('/aboutus',productsRouter);
app.use('/bodycreams',productsRouter);
app.use('/:id',productsRouter);
app.use('/admin',productsRouter);
app.use('/add',productsRouter);

app.use(bodyParser.urlencoded({
    extended: true
  }));

app.use(bodyParser.json())





app.listen(4000);