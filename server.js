const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const http = require("http");
const fs = require("fs");

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
  fs.readFile("./blog.json", "utf-8", (err, data) => {
    let blogEntries = JSON.parse(data);
    res.status(200).render("index", { entries: blogEntries.entries });
    console.log(JSON.parse(data))

  });
});

// Navigates to a page where users can comment on blog entries
<<<<<<< Updated upstream
server.get("/blogPage", (req, res) => {
  res.status(200).render("blogpage")
  });

server.post("/blogpage", (req, res) => {
  fs.readFile("./entries.json", "utf-8", (err, data) => {
  let blogEntries = JSON.parse(data);
  res.status(200).render("blogpage", { entries: blogEntries });
});})
=======

server.get("/blogPage/:id", (req, res) => {
  const id = req.params.id;
  fs.readFile("./blog.json", "utf-8", (err, data) => {
    let blogs = JSON.parse(data);
    let blogIds = Object.keys(blogs.entries);
    
  if (blogIds.includes(id) === true) {
    console.log("yeehaw");
    res.status(200).render("blogpage")
  } else {
    res.status(404).send(`Blog ${id} not found`)}
  }
  )})
  
>>>>>>> Stashed changes

// Navigates to a page where users can create blog entries
server.get("/postPage", (req, res) => res.status(200).render("addpost"));

//route for making an entry
server.post("/addPost", (req, res) => {
  //passing data from input into the json file
  fs.readFile("./blog.json", "utf-8", (err, data) => {
    if (err) throw err;
    let listOfEntries = JSON.parse(data);
    // We're adding the user's entry to the list of entries
    listOfEntries.entries[generateID()] = {title: req.body.title, author: req.body.user, entry: req.body.newEntry};
    // Storing the entry in the json file

    fs.writeFile("./blog.json", JSON.stringify(listOfEntries), "utf-8", err => {
        if (err) throw err;
        console.log("Done!");
      }
    );
  });
  //  Navigating back to the add-post page
  res.redirect("http://localhost:8080/postPage");
});

// Creates a 7-digit unique ID for blog entry
const generateID = () => {
  let ID = "";

  // Appends a single random character to ID
  for (let i = 1; i <= 7; i++) ID += String.fromCharCode(Math.floor(Math.random() * (90 - 48 + 1)) + 48);

  return ID;
}

// Listening to the server at port 8080
server.listen(8080, () => console.log("Listening to port 8080"));
