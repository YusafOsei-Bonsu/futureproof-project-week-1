const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const http = require('http');

// Making an express application
const server = express();

// Render HTML files (from 'views' directory) using the EJS views engine 
server.set('views', `${__dirname}/views`);
server.engine('html', require('ejs').renderFile);
server.set('view engine', 'html');

// Accessing CSS & JS files
server.use(cors());
server.use(express.static(`${__dirname}/public`));
server.use(express.urlencoded({extended: true}));

// Parses bodies from url
server.use(bodyParser.urlencoded({extended: true}));

// By entering localhost:8080 in the address bar, we navigate to another page
server.get('/', (req, res) => res.status(200).render('index'));

server.get('/addPost', (req, res) => {
    // let newEntry = res.body.newEntry;
    res.status(200).render('addpost');
    // console.log(newEntry);
});

server.post('/addpost', (req, res) => {
    let newEntry = req.body.newEntry;
    // res.status(200).render('addpost');
    console.log(newEntry);
    // added title and user input to the server
    let title = req.body.title;
    console.log(title)

    let user = req.body.user;
    console.log(user)

});


// Listening to the server at port 8080
server.listen(8080, () => console.log('Listening to port 8080'));