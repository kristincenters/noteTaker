
var path = require("path");
var fs = require("fs");

var notesData = require("../db/db.json");

module.exports = function (app) {

    //reads db file and returns notes
    app.get("/api/notes", function (req, res) {
        return res.json(notesData);
    })
    //takes user input, adds it with id to db and renders new note on page
    app.get("/api/notes", function (req, res) {
        const noteID = req.params.id;
        console.log(noteID);
        for (let i = 0; i < notesData.length; i++) {
            if (noteID === notesData[i].route) {
                return res.json(notesData[i]);
            };
        };
        return res.json(false);
    });
    //save new note with id value (keeping console.logs for reference)
    app.post("/api/notes", function (req, res) {
        const newNote = req.body;
        console.log(notesData[notesData.length - 1]);

        //if id doesn't exist, create id key, set value to 1 and save note to db
        //repeat logic inside if/else to increment id value 

        if (notesData[notesData.length - 1]) {
            //increment id value by 1 and save note to db and page
            if (notesData[notesData.length - 1].id) {
                newNote.id = notesData[notesData.length - 1].id + 1
                newNote.route = newNote.title.replace(/\s+/g, "").toLowerCase();
                console.log(newNote);
                notesData.push(newNote);

                fs.writeFileSync("./db/db.json", JSON.stringify(notesData), err => {
                    if (err) throw err;
                });
                res.json(newNote);
            }
            else {
                newNote.id = 1
                newNote.route = newNote.title.replace(/\s+/g, "").toLowerCase();
                console.log(newNote);
                notesData.push(newNote);

                fs.writeFileSync("./db/db.json", JSON.stringify(notesData), err => {
                    if (err) throw err;
                });
                res.json(newNote);
            }
        }
        else {
            newNote.id = 1
            newNote.route = newNote.title.replace(/\s+/g, "").toLowerCase();
            console.log(newNote);
            notesData.push(newNote);

            fs.writeFileSync("./db/db.json", JSON.stringify(notesData), err => {
                if (err) throw err;
            });
            res.json(newNote)
        }
    })
    //delete note based on unique id 
    app.delete("/api/notes/:id", function (req, res) {
        console.log(req.params);
        for (let i = 0; i < notesData.length; i++) {
            if (notesData[i].id === parseInt(req.params.id, 10)) {
                console.log(notesData[i]);
                notesData.splice(i, 1);
            }
        }
        console.log(notesData);
        fs.writeFileSync("./db/db.json", JSON.stringify(notesData), err => {
            if (err) throw err;
            console.log("Saved Note")
        });
        res.json(notesData)
    })
}
