var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

var NoteSchema = new Schema({
      // `title` is of type String
    title: String,
    body: String
});