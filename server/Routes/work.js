const express = require('express');
const workRouter = express.Router();
const db = require('../db');

//GET to get an array of all work for a specific minion
workRouter.get('/:minionId/work', (req, res, next) => {
    const minionWork = db.getAllFromDatabase('work').filter(workItem => workItem.minionId === req.params.minionId);
    res.send(minionWork);
});

//POST to create new work and save it to the database
workRouter.post('/:minionId/work', (req, res, next) => {
    const newWork = req.body;
    newWork.minionId = req.params.minionId;
    const createdWork = db.addToDatabase('work', newWork);
    if(createdWork) {
        res.status(201).send(createdWork);
    } else {
        res.status(400).send();
    }
});

// PUT to update a single work by id
workRouter.put('/:minionId/work/:workId', (req, res, next) => {
    const workToUpdate = req.body;
    workToUpdate.id = req.params.workId;
    workToUpdate.minionId = req.params.minionId;
    
    const updatedWork = db.updateInstanceInDatabase('work', workToUpdate);
    if (updatedWork) {
        res.send(updatedWork);
    } else {
        res.status(404).send();
    }
});

// DELETE to delete a single work by id
workRouter.delete('/:minionId/work/:workId', (req, res, next) => {
    const isDeleted = db.deleteFromDatabasebyId('work', req.params.workId);
    if (isDeleted) {
        res.status(204).send();
    } else {
        res.status(404).send();
    }
});

module.exports = workRouter;
