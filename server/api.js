const express = require('express');
const minionsRouter = require('./Routes/minions');
const ideasRouter = require('./Routes/ideas');
const meetingsRouter = require('./Routes/meetings');
const workRouter = require('./Routes/work');

const apiRouter = express.Router();

apiRouter.use('/minions', minionsRouter);
apiRouter.use('/ideas', ideasRouter);
apiRouter.use('/meetings', meetingsRouter);
apiRouter.use('/work', workRouter);

module.exports = apiRouter;

