const express = require('express');
const router = express.Router();


// @Posts
// @access  Public

router.get('/',(req,res) => res.send( 'posts router'));

module.exports = router;
