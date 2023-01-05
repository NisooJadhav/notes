// CONFIGURING FOR .ENV 
require("dotenv").config();

const PORT = process.env.PORT;

// IMPORTING PACKAGES
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// CONNECT TO MONGODB
mongoose.connect(process.env.MONGO_URI).then(()=>console.log('connected to MongoDB...')).catch((e)=>console.log(`error: ${e}`));

// DEFINING NOTE SCHEMA
const noteSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Note = mongoose.model("Note", noteSchema);

// CREATE EXPRESS APP
const app = express();

// FORCING APP SETTINGS
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
  origin: ["http://localhost:3001", "https://notes-oesc.onrender.com/"],
})
);

// ROUTES
// ROOT ROUTE 
app.get("/", (req, res) => {
  res.send("express is here!");
});

// CREATE ROUTE
// ROUTE HANDLING axios.post("/create")
app.post("/create", (req, res) => {
  Note
  .create({
    // parsing response and assigning to Note schema from /create route
    title: req.body.title,
    content: req.body.content 
  })
  .then(doc=>console.log(doc))
  .catch((e)=>console.log(e));
})

// ALL NOTES ROUTE
app.get("/notes", (req,res) => {
  Note.find()
  .then(items => res.json(items))
  .catch((e)=>console.log(e));
})

// DELETE NOTE ROUTE
app.delete("/delete/:id", (req, res) => {
    Note.findByIdAndDelete({_id: req.params.id})
    .then(doc => console.log(doc))
    .catch(e => console.log(e));
})

// UPDATE NOTE ROUTE
app.put("/update/:id", (req, res) => {
    Note.findByIdAndUpdate({_id: req.params.id}, {
      title: req.body.title,
      content: req.body.content,
      updatedAt: Date.now()
    })
    .then(doc=>console.log(doc))
    .catch((e)=>console.log(e))
})

// RUNNING APP ON PORT 3001
app.listen(3001, () => console.log(`notes server running on ${PORT}`));