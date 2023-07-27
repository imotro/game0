const express = require('express');
const app = express();
const ip = require('ip');
const fs = require('fs');
const port = 3000;

app.set('view engine', 'ejs');

app.use(express.static('public'));


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

app.get('/', (req, res)=>{
  console.log(ip.address()+' requesting /...')
  res.render('home')
  console.log('served \'/\'')
})

app.get('/chat', (req, res)=>{
  console.log(ip.address()+' requesting /chat...')
  res.render('chat')
  console.log('served \'/chat\'')
})

app.get('/apps', (req, res)=>{
  console.log(ip.address()+' requesting /apps...')
  res.render('apps')
  console.log('served \'/apps\'')
})

app.get('/emulator', (req, res)=>{
  console.log(ip.address()+' requesting /emulator...')
  res.render('emu')
  console.log('served \'/emulator\'')
})

app.get('/search', (req, res)=>{
  console.log(ip.address()+' requesting /search...')
  res.render('search')
  console.log('served \'/search\'')
})

app.get('/games', (req, res) => {
    console.log(ip.address()+' requesting /games...')
  fs.readFile('public/games.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
      return;
    }
    const gamesData = JSON.parse(data);

    res.render('games', { games: gamesData.games });
  })});

app.get('/game/:id', (req, res) => {
  const gameId = req.params.id

  fs.readFile('public/games.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('<p style="font-family:monospace;">Internal Server Error</p>');
      return;
      
    }

    const gamesData = JSON.parse(data);
    const game = gamesData.games.find(g => g.id === gameId);

    res.render('player', { game });
  });
});

app.use((req, res, next) => {
  res.status(404).render('404')
})