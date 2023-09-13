var express = require('express');
var router = express.Router();

const gamesCtrl = require('../controllers/games')

router.get('/new', gamesCtrl.new)
router.post('/', gamesCtrl.create)
router.get('/:id', gamesCtrl.show);
router.get('/:id/edit', gamesCtrl.edit)
router.get('/', gamesCtrl.index)

module.exports = router;