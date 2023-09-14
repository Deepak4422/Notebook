const express = require("express");
const router = express.Router();
const Notes = require("../models/Notes");
const fetchUser = require("../middleware/fetchUser");
const { body, validationResult } = require("express-validator");

router.get(
  "/fetchnotes",
  fetchUser,

  async (req, res) => {
    try {
      const notes = await Notes.find({ user: req.user.id });
      res.json(notes);
    } catch (error) {
      console.error({ error: error.message });
      res.status(500).send("Internal Server errror");
    }
  }
);

router.post(
  "/addnotes",
  fetchUser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characters").isLength({
      min: 5
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }
    try {
      const { title, description, tag } = req.body;
      const note = new Notes({ title, description, tag, user: req.user.id });
      const notesave = await note.save();
      res.json(notesave);
    } catch (error) { 
      console.error({ error: error.message });
      res.status(500).send("Internal server error");
    }
  }
);

// update an existing Notes

router.put(
  "/updatenotes/:id",
  fetchUser,
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const updatenote = {};
      if(title)
      {
        updatenote.title=title;
      }
      if(description)
      {
        updatenote.description=description;
      }
      if(tag)
      {
        updatenote.tag=tag;
      }
      //finding the node to be updated 
      let note= await Notes.findById(req.params.id);
      if(!note)
      {
        return res.status(404).send("Not found");
      }
      if(req.user.id!=note.user.toString())
      {
        return res.status(401).send("Not allowed");
      }
     note=  await Notes.findByIdAndUpdate(req.params.id, {$set :updatenote}, {new: true});
     res.json(note);

    } catch (error) { 
      console.error({ error: error.message });
      res.status(500).send("Internal server error");
    }
  }
);
  

//delete notes
router.delete(
  "/deletenotes/:id",
  fetchUser,
  async (req, res) => {
    try {
     
      //finding the node to be deleted
      let note= await Notes.findById(req.params.id);
      if(!note)
      {
        return res.status(404).send("Not found");
      }
      //allow deletion only if notes belong to the owner 
      if(req.user.id!=note.user.toString())
      {
        return res.status(401).send("Not allowed");
      }
     note= await  Notes.findByIdAndDelete(req.params.id);
     res.json({status:"Note have been deleted", note:notes});

    } catch (error) { 
      console.error({ error: error.message });
      res.status(500).send("Internal server error");
    }
  }
);

module.exports = router;
