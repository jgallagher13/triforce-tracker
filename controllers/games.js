const Game = require('../models/game')

module.exports = {
    new: newGame,
    create,
    index,
    show,
    edit
}

async function edit(req, res) {
    const game = await Game.findById(req.params.id)
    res.render('games/edit', {title: 'Edit Game', game})
}

function newGame(req, res) {
    res.render('games/new', { title: 'Add Game', errorMsg: '' });
}

async function create(req, res) {
    try {
        await Game.create(req.body)
        res.redirect('/games')
    } catch (err) {
        console.log(err)
        res.render('games/new', { errorMsg: err.message })
    }
}

async function index(req, res) {
    const games = await Game.find({});
    res.render('games/index', { title: 'All Games', games });
    }

async function show(req, res) {
    const game = await Game.findById(req.params.id)
    res.render('games/show', {title: 'Game Details', game})
      }