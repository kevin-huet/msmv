let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/code/promo/all', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

module.exports = router;