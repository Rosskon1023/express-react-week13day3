// Require Dependencies
const express = require('express');

const admin = require('firebase-admin');
const serviceAccount = require('../service-account-credentials.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

async function isAuthenticated(req, res, next) {
    try {
        const token = req.get("Authorization");
        if(!token) throw new Error('you must be logged in first')
        const user = await admin.auth().verifyIdToken(token.replace('Bearer ', ''));
        if(!user) throw new Error('something went wrong');

        req.user = user;

        next();
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

// Create a Route Object
const peoplesRouter = express.Router();
const People = require('../models/people.js');


// localhost 3001
peoplesRouter.get("/", (req,res) => {
    res.send('hello world')
});

async function index (req,res) {
    try {
        res.json(await People.find({uId: req.user.uid}))
    } catch (error) {
        res.status(400).json(error)
    }
};

// Index
peoplesRouter.get("/people", isAuthenticated, index);

// New

// Delete
peoplesRouter.delete("/people/:id", isAuthenticated, async (req,res) => {
    try {
        await People.findByIdAndDelete(req.params.id)
        index(req,res);
    } catch (error) {
        res.status(400).json(error)
    }
});

// Update
peoplesRouter.put("/people/:id", isAuthenticated, async (req,res) => {
    try {
        await People.findByIdAndUpdate(req.params.id, req.body, {new:true})
        index(req,res);
    } catch (error) {
        res.status(400).json(error)
    }
});


// Create
peoplesRouter.post("/people", isAuthenticated, async(req,res) => {
    try {
        req.body.uId = req.user.uid;
        await People.create(req.body)
        index(req,res);
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