const express = require('express');
const meetingsRouter = express.Router();
const db = require('../db');

//GET to get an array of all meetings
meetingsRouter.get('/', (req, res, next) => {
    const meetings = db.getAllFromDatabase('meetings');
    res.send(meetings);
});

//POST to create a new meeting and save it to the db
meetingsRouter.post('/', (req, res, next) => {
    const newMeeting = db.createMeeting();
    db.addToDatabase('meetings', newMeeting);
    res.status(201).send(newMeeting);
});

//DELETE to delete all meetings from the database
meetingsRouter.delete('/', (req, res, next) => {
    db.deleteAllFromDatabase('meetings');
    res.status(204).send();
});

module.exports = meetingsRouter;