const router = require('express').Router();

// // Import our modular routers for /tips and /feedback
// const tipsRouter = require('./tips');
const noterouter = require('./notes.js');


// app.use('/tips', tipsRouter);
router.use('/notes', noterouter);

module.exports = router;
