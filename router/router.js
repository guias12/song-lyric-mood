const express = require('express');
const router = express.Router();

const songController = require("../libs/songController");

router.get('/app/result', songController.getSongData);


module.exports = router;