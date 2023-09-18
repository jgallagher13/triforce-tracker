const Game = require('../models/game')

async function update(req, res) {
    const game = await Game.findById(req.params.id)
    if (!game.user.equals(req.user._id)) {
        return res.status(403).json({ error: 'Unauthorized' });
    }
    console.log(game)
    game.updateOne(req.body)
    // Game.findByIdAndUpdate({_id: req.params.id, user: req.user._id}, req.body, {new: true});
    // const game= await Game.findByIdAndUpdate({_id: req.params.id, user: req.user._id}, req.body, {new: true});
    // if (!game.user.equals(req.user._id)) {
    //     return res.status(403).json({ error: 'Unauthorized' });
    // }
    // console.log("this is update game console log", game)
    // console.log(game.user)
    res.redirect(`/games/${game._id}`)
}

async function edit(req, res) {
    const game = await Game.findById(req.params.id, req.user._id)
    res.render('games/edit', {title: 'Edit Game', game})
}

function newGame(req, res) {
    res.render('games/new', { title: 'Add Game', errorMsg: '' });
}

async function create(req, res) {
    try {
        req.body.user = req.user._id
        await Game.create(req.body)
        res.redirect('/games')
    } catch (err) {
        console.log(err)
        res.render('games/new', { errorMsg: err.message })
    }
}

const getToken = async()=> {
    const baseURL = 'https://id.twitch.tv/oauth2/token?client_id='
    const fetchURL = baseURL + process.env.API_CLIENT_ID + '&client_secret=' + process.env.API_SECRET + '&grant_type=client_credentials'
    let token 
    const res = await fetch(fetchURL, {
        method: 'POST'
    })
    const resolvedJson = await res.json()
   console.log(resolvedJson.access_token)
   return resolvedJson.access_token
}

async function index(req, res) {
    try {
        const games = await Game.find({});
        const token = await getToken();

        const imageIds = [];

        for (const game of games) {
            const getImage = await fetch('https://api.igdb.com/v4/covers', {
                method: 'POST',
                headers: {
                    'Client-ID': process.env.API_CLIENT_ID,
                    'Authorization': `Bearer ${token}`,
                },
                body: `fields image_id;
                        where game = ${game.id};`
            });
            const imageIdData = await getImage.json();
            const imageId = imageIdData[0]?.image_id;
            imageIds.push(imageId)
        }
        res.render('games/index', { title: 'All Games', games, imageIds });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

async function show(req, res) {
    const game = await Game.findById(req.params.id)
    const token = await getToken()
    const result = await fetch('https://api.igdb.com/v4/games', {
        method: 'POST',
        headers: {
        'Client-ID': process.env.API_CLIENT_ID,
        'Authorization': `Bearer ${token}`,},
        body: `fields summary;
        search "${game.title.toLowerCase()}";`
    })
    const resolvedJson = await result.json()
   
    res.render('games/show', {title: 'Game Details', game, resolvedJson: resolvedJson[0]})
      }
module.exports = {
        new: newGame,
        create,
        index,
        show,
        edit,
        update
    }