const Game = require('../models/game')

module.exports = {
    create
}

async function create(req, res) {
    const game = await Game.findById(req.params.id);
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;
    game.reviews.push(req.body);
    try {
      await game.save();
    } catch (err) {
      console.log(err);
    }
    res.redirect(`/games/${game._id}`);
  }