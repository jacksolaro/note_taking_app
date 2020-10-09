// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.port || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "../../index.html"));
});

app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "../../notes.html"));
});

// Displays all notes
app.get("/api/notes", function(req, res) {
    // TODO: Connect Notes
    return res.json(notes);
});

// TODO: Delete a single note given an ID
// app.delete("/api/notes/:id", function(req, res) {
//   var noteId = req.params.id;

//   console.log(note);

//   for (var i = 0; i < NOTESARR.length; i++) {
//     if (noteId === NOTESARR[i].id) {
//       return res.json(NOTESARR[i]);
//     }
//   }

//   return res.json(true);
// });

// TODO: POST
// // Create New Characters - takes in JSON input
// app.post("/api/characters", function(req, res) {
//   // req.body hosts is equal to the JSON post sent from the user
//   // This works because of our body parsing middleware
//   var newCharacter = req.body;

//   // Using a RegEx Pattern to remove spaces from newCharacter
//   // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
//   newCharacter.routeName = newCharacter.name.replace(/\s+/g, "").toLowerCase();

//   console.log(newCharacter);

//   characters.push(newCharacter);

//   res.json(newCharacter);
// });

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
