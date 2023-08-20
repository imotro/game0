const express = require('express');
const app = express();
const ip = require('ip');
const fs = require('fs');
const port = 3000;
const axios = require('axios');
const base32 = require('base32');

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

app.get('/cloak', (req, res)=>{
  console.log(ip.address()+' requesting /cloak...')
  res.render('cloak')
  console.log('served \'/cloak\'')
})

app.get('/flash', (req, res)=>{
  console.log(ip.address()+' requesting /flash...')
  res.render('flash')
  console.log('served \'/flash\'')
})

app.get('/chat', (req, res)=>{
  console.log(ip.address()+' requesting /chat...')
  res.render('chat')
  console.log('served \'/chat\'')
})

app.get('/main', (req, res)=>{
  console.log(ip.address()+' requesting /main...')
  res.render('freedom')
  console.log('served \'/main\'')
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

app.get('/settings', (req, res)=>{
  console.log(ip.address()+' requesting /settings...')
  res.render('opts')
  console.log('served \'/settings\'')
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
  })
console.log('served \'/games\'')
});


app.get('/game/:id', (req, res) => {
  try{
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
  })
    } catch(err){
      console.error(err);
      res.status(500).send('<p style="font-family:monospace;">Internal Server Error</p>');
      return;
    }
});

app.get('/void/:u', (req,res)=>{
  let url = req.params.u
  res.render('void', { url })
});

app.get('/launch/:RL', (req,res)=>{
  let location = encode(req.params.RL)
  res.render('void', { location })
});


app.use((req, res, next) => {
  res.status(404).render('404')
})