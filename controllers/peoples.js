// Require Dependencies
const express = require('express');

// Create a Route Object
const peoplesRouter = express.Router();
const People = require('../models/people.js');


// localhost 3001
peoplesRouter.get("/", (req,res) => {
    res.send('hello world')
});

// Index
peoplesRouter.get("/people", async (req,res) => {
    try {
        res.json(await People.find({}))
    } catch (error) {
        res.status(400).json(error)
    }
});

// New

// Delete
peoplesRouter.delete("/people/:id", async (req,res) => {
    try {
        res.json(await People.findByIdAndDelete(req.params.id))
    } catch (error) {
        res.status(400).json(error)
    }
});

// Update
peoplesRouter.put("/people/:id", async (req,res) => {
    try {
        res.json(await People.findByIdAndUpdate(req.params.id, req.body, {new:true}))
    } catch (error) {
        res.status(400).json(error)
    }
});


// Create
peoplesRouter.post("/people", async(req,res) => {
    try {
        res.json(await People.create(req.body))
    } catch (error) {
        res.status(400).json(error)
    }
})

// Edit

// Show 
peoplesRouter.get("/people/:id", async (req,res) => {
    People.findById(req.params.id, (error, foundPerson) => {
        res.json(foundPerson);
    });
});

// Export the Router/Controller Object
module.exports = peoplesRouter;