let express = require('express');
let router = express.Router();
let passport = require('passport')

router.post('/profile', passport.authenticate('jwt',{session: false}),
    async function (req, res, next) {
  res.status(200).json({ })
});

router.post('/bob',
    async function (req, res, next) {
      res.status(200).json({ })
    });

module.exports = router;
