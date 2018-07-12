//Dependencies
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');


//Create express app
let app = express();
//Settings
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
//Set routes
routes(app);

const server = app.listen(3000,() =>{
    console.log('Server is running!');
});