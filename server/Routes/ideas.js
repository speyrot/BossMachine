const express = require('express');
const ideasRouter = express.Router();
const db = require('../db');
const checkMillionDollarIdea = require('../checkMillionDollarIdea');

//GET to get an array of all ideas
ideasRouter.get('/', (req, res, next) => {
    const ideas = db.getAllFromDatabase('ideas');
    res.send(ideas);
});

//POST to create a new idea and save it to the database
ideasRouter.post('/', checkMillionDollarIdea, (req, res, next) => {
    const newIdea = db.addToDatabase('ideas', req.body);
    if(newIdea) {
        res.status(201).send(newIdea);
    } else {
        res.status(400).send();
    }
});

//GET to get a single idea by id
ideasRouter.get('/:ideaId', (req, res, next) => {
    const idea = db.getFromDatabaseById('ideas', req.params.ideaId);
    if(idea) {
        res.send(idea);
    } else {
        res.status(404).send();
    }
});

//PUT to update a single idea by id
ideasRouter.put('/:ideaId', (req, res, next) => {
    let updatedIdea = db.updateInstanceInDatabase('ideas', req.body);
    if(updatedIdea) {
        res.send(updatedIdea);
    } else {
        res.status(404).send();
    }
});

//DELETE to delete a single idea by id
ideasRouter.delete('/:ideaId', (req, res, next) => {
    const isDeleted = db.deleteFromDatabasebyId('ideas', req.params.ideaId);
    if(isDeleted) {
        res.status(204).send();
    } else {
        res.status(404).send();
    }
});

module.exports = ideasRouter