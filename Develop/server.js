const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
var randomid = require("./helpers/fsUtils");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use("/api", api);
app.use(express.static("public"));

app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

app.get("/api/notes", (req, res) =>
  res.json(JSON.parse(readFromFile("./db/db.json")))
);

app.post("/api/notes", (req, res) => {
  let jsonFilePath = path.join(__dirname, "/db/db.json");
  let newNote = req.body;

  // This allows the test note to be the original note.
  let highestId = 99;
  // This loops through the array and finds the highest ID.
  for (let i = 0; i < database.length; i++) {
    let individualNote = database[i];

    if (individualNote.id > highestId) {
      // highestId will always be the highest numbered id in the notesArray.
      highestId = individualNote.id;
    }
  }
  // This assigns an ID to the newNote.
  newNote.id = highestId + 1;
  // We push it to db.json.
  database.push(newNote);

  // Write the db.json file again.
  fs.writeFile(jsonFilePath, JSON.stringify(database), function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("Your note was saved!");
  });
  // Gives back the response, which is the user's new note.
  res.json(newNote);
});

app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
