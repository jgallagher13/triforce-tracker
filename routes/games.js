var express = require('express');
var router = express.Router();

const ensureLoggedIn = require('../config/ensureLoggedIn');
const gamesCtrl = require('../controllers/games')

router.get('/new', ensureLoggedIn, gamesCtrl.new)
router.post('/', ensureLoggedIn, gamesCtrl.create)
router.get('/:id', gamesCtrl.show);
router.get('/:id/edit', ensureLoggedIn, gamesCtrl.edit)
router.get('/', gamesCtrl.index)

module.exports = router;