const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const http = require('http');
const fs = require('fs');

// Making an express application
const server = express();

// Render HTML files (from 'views' directory) using the EJS views engine
server.set("views", `${__dirname}/views`);

// Using the EJS template engine to view EJS files on browser
server.set("view engine", "ejs");

// Accessing CSS & JS files
server.use(cors());
server.use(express.static(`${__dirname}/public`));
server.use(express.urlencoded({ extended: true }));

// Parses bodies from url
server.use(bodyParser.urlencoded({ extended: true }));

// By entering localhost:8080 in the address bar, we navigate to homepage
server.get("/", (req, res) => {
    fs.readFile('./entries.json', 'utf-8', (err, data) => {
        let blogEntries = JSON.parse(data);
        res.status(200).render("index", {entries: blogEntries});
    });
});

// Navigates to a page where users can create blog entries
server.get("/postPage", (req, res) => res.status(200).render("addpost"));

//route for making an entry
server.post('/addPost', (req, res) => {
    //passing data from input into the json file
    fs.readFile('./entries.json', 'utf-8', (err, data) => {
        if (err) throw err;
        // JSON string into JS object
        let listOfEntries = JSON.parse(data);
        // We're adding the user's entry to the list of entries
        listOfEntries.push(req.body);
        // Storing the entry in the json file
        fs.writeFile('./entries.json', JSON.stringify(listOfEntries), 'utf-8', err => {
            if (err) throw err;
            console.log('Done!');
        });
    });
    //  Navigating back to the add-post page
    res.redirect("http://localhost:8080/postPage");
});




// Listening to the server at port 8080
server.listen(8080, () => console.log("Listening to port 8080"));
