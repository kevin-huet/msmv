const express = require('express');
const router = express.Router();
const User = require('../models/user.model')

router.get('/all', async (req, res, next) => {
    const user = await User.find({}).select('-password')
    res.status(200).json({
        users: user
    })
})

module.exports = router;
