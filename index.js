const express = require('express');
const app = express();
const port = 3000;
app.set('view engine', 'ejs');

app.use(express.static('public'));


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

const fs = require('fs');

app.get('/games', (req, res) => {
  fs.readFile('public/games.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
      return;
    }

    const gamesData = JSON.parse(data);

    res.render('games', { games: gamesData.games });
  });
});

app.get('/game/:id', (req, res) => {
  const gameId = parseInt(req.params.id);

  fs.readFile('public/games.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
      return;
    }

    const gamesData = JSON.parse(data);
    const game = gamesData.games.find(g => g.id === gameId);

    res.render('gamePage', { game });
  });
});