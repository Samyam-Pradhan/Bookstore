const express = require('express');
const router = express.Router();
const { getNYTBooks } = require('../controllers/bookController');

router.get('/nyt-bestsellers', getNYTBooks);

module.exports = router;
