const express = require('express');
const router = express.Router();
const { asyncHandler } = require('../helpers/asyncHandler');
const { authentication } = require('../middlewares/authen.middleware');

router.use(authentication);

router.get('/', (req, res) => {
    res.json({ message: 'Hello World' });
})

module.exports = router;