
var path = require("path");
var fs = require("fs");

var notesData = require("../db/db.json");



module.exports = function (app) {
    //renders all notes
    app.get("/api/notes", function (req, res) {
        return res.json(notesData);
    })
    //view specific note
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
    //save note to json 
    app.post("/api/notes", function (req, res) {
        const newNote = req.body;
        console.log(notesData[notesData.length - 1]);
        if (notesData[notesData.length - 1]) {
            if (notesData[notesData.length - 1].id) {
                newNote.id = notesData[notesData.length - 1].id + 1
                newNote.route = newNote.title.replace(/\s+/g, "").toLowerCase();
                console.log(newNote);
                notesData.push(newNote);

                fs.writeFileSync("./db/db.json", JSON.stringify(notesData), err => {
                    if (err) throw err;
                    console.log("Saved Note")
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
                    console.log("Saved Note")
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
                console.log("Saved Note")
            });

            res.json(newNote);

        }

    })
    app.delete("/api/notes/:id", function (req, res) {
        console.log("working??")
        console.log(req.params);
        for (let i = 0; i < notesData.length; i++) {
            if (notesData[i].id === parseInt(req.params.id, 10)) {
                console.log(notesData[i]);
                notesData.splice(i, 1);
                //write file to json
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
