const express = require('express');
const router = express.Router();


// @Profile
// @access  Public

router.get('/', (req, res) => res.json({ msg: 'Posts Works' }));

module.exports = router;
