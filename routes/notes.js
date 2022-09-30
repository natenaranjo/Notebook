const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const {
    readFromFile,
    readAndAppend,
    writeToFile,
} = require('../helpers/fsUtils');

// Get Route for retrieving all notes
notes.get('/', (req, res) => {
    readFromFile('./db/notes.json').then((data) => res.json(JSON.parse(data)));
});

// Get Route for a specific note
notes.get('/:note_id', (req, res) => {
    const noteId = req.params.note_id;
    readFromFile('./db/notes.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            const result = json.filter((note) => note.note_id === noteId);
            return result.length > 0
                ? res.json(result)
                : res.json('No note with that ID');
        });
});

// POST Route for new note
notes.post('/', (req, res) => {
    console.log(req.body);
  
    const { title, text } = req.body;
  
    if (req.body) {
      const newNote = {
        title,
        text,
        note_id: uuidv4(),
      };
  
      readAndAppend(newNote, './db/notes.json');
      res.json(`Note added successfully 🚀`);
    } else {
      res.error('Error in adding a note');
    }
  });

// DELETE Route for removing a note
notes.delete('/:note_id', (req, res) => {
    const noteId = req.params.note_id;
    readFromFile('./db/notes.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            // Make a new array of all notes except he one with the ID provided in the URL
            const result = json.filter((note) => note.note_id !== noteId);
            // Save taht array
            writeToFile('./db/notes.json', result);
            // Respon to the Delete requrest
            res.json(`Item ${noteId} has been deleted`);
        });
});

module.exports = notes;