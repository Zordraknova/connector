const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');


// @Auth
// @access  Public

router.get('/', auth, (req,res) => res.send( 'Auth router'));
module.exports = router;