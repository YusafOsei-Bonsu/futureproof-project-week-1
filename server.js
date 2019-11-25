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
server.engine("html", require("ejs").renderFile);
server.set("view engine", "html");

// Accessing CSS & JS files
server.use(cors());
server.use(express.static(`${__dirname}/public`));
server.use(express.urlencoded({ extended: true }));

// Parses bodies from url
server.use(bodyParser.urlencoded({ extended: true }));

// By entering localhost:8080 in the address bar, we navigate to another page

server.get("/", (req, res) => res.status(200).render("index.html"));

server.get("/addPost", (req, res) => {
  res.status(200).render("addpost");
});

//route for making an entry
server.post('/addpost', (req, res) => {
    //passing data from input into the json file
    fs.readFile('./entries.json', 'utf-8', (err, data) => {
        if (err) throw err;
        // Object into string
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
    res.redirect("http://localhost:8080/addpost");
});

// Listening to the server at port 8080
server.listen(8080, () => console.log("Listening to port 8080"));
