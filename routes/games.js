var express = require('express');
var router = express.Router();

const ensureLoggedIn = require('../config/ensureLoggedIn');
const gamesCtrl = require('../controllers/games')

router.get('/new', ensureLoggedIn, gamesCtrl.new)
router.post('/', ensureLoggedIn, gamesCtrl.create)
router.get('/:id', gamesCtrl.show);
router.get('/:id/edit', ensureLoggedIn, gamesCtrl.edit)
router.get('/', gamesCtrl.index)
router.post('/gamesAPI', gamesCtrl.getGames)
router.put('/:id', gamesCtrl.update)

module.exports = router;