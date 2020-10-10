// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
const fs = require("fs");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// Variables
const dbObj = JSON.parse(fs.readFileSync(path.join(__dirname,"/db/db.json")));
const notesDataArr = dbObj.notesDataArr;
let lastId = dbObj.lastId;

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// Route to return a JSON file with all note data
app.get("/api/notes", function(req, res) {
  return res.json(notesDataArr);
});

// Routes to the homepage for any links other than those above
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});


// Create New Note - takes in JSON input
app.post("/api/notes", function(req, res) {

  // create a new note object with data from the new note
  const newNoteObj = {
    title:req.body.title,
    text:req.body.text,
    id:lastId+1
  }

  // push the new note into the notesDataArray
  notesDataArr.push(newNoteObj);

  // Increment the last ID
  lastId++;

  // Create a new Database object with the updated notes array
  const newDbObj = {
    notesDataArr:notesDataArr,
    lastId:lastId
  }

  // Write the new database object to our database file
  fs.writeFileSync(path.join(__dirname+"/db/db.json"),JSON.stringify(newDbObj,null,2));

  // return the new note
  res.json(newNoteObj);
});

// TODO: Delete a single note given an ID
app.delete("/api/notes/:id", function(req, res) {

  // assign the ID of the note to delete
  const noteId = parseInt(req.params.id);

  // loop through the list of current notes and if the noteID matches one in our array, delete it
  for (var i = 0; i < notesDataArr.length; i++) {
    if (noteId === notesDataArr[i].id) {
      notesDataArr.splice(i,1);
    }
  }

  // create a new database object to save to file
  const newDbObj = {
    notesDataArr:notesDataArr,
    lastId:lastId
  }

  // Save the new Database object to file
  fs.writeFileSync(path.join(__dirname+"/db/db.json"),JSON.stringify(newDbObj,null,2));

  // return true
  return res.json(true);
});


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
