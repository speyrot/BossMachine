const express = require('express');
const minionsRouter = express.Router();
const db = require('../db');

//GET to get an array of all minions
minionsRouter.get('/', (req, res, next) => {
    const minions = db.getAllFromDatabase('minions');
    res.send(minions);
});

//POST to create a new minion and save to db
minionsRouter.post('/', (req, res, next) => {
    const newMinion = db.addToDatabase('minions', req.body);
    if(newMinion) {
        res.status(201).send(newMinion);
    } else {
        res.status(400).send();
    }
});

//GET to fetch a single minion by id
minionsRouter.get('/:minionId', (req, res, next) => {
    const minion = db.getFromDatabaseById('minions', req.params.minionId);
    if(minion) {
        res.send(minion);
    } else {
        res.status(400).send();
    }
});

//PUT to update a single minion by id
minionsRouter.put('/:minionId', (req, res, next) => {
    let updatedMinion = db.updateInstanceInDatabase('minions', req.body);
    if(updatedMinion) {
        res.send(updatedMinion);
    } else {
        res.status(404).send();
    }
});

//DELETE to delete single minion by id
minionsRouter.delete('/:minionId', (req, res, next) => {
    const isDeleted = db.deleteFromDatabasebyId('minions', req.params.minionId);
    if(isDeleted) {
        res.status(204).send();
    } else {
        res.status(404).send();
    }
})

module.exports = minionsRouter;