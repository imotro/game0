const searchInput = document.getElementById('searchInput');
const gameCards = Array.from(document.getElementsByClassName('game-card'));

gameCards.forEach(card => {
  card.addEventListener('click', () => {
    const gameId = card.dataset.gameId;
    window.location.href = `/game/${gameId}`;
  });
});

searchInput.addEventListener('input', () => {
  const searchQuery = searchInput.value.toLowerCase();

  gameCards.forEach(card => {
    const titleElement = card.querySelector('.game-card-title');
    const title = titleElement.innerText.toLowerCase();

    if (title.includes(searchQuery)) {
      card.style.display = 'flex';  // Show the card
    } else {
      card.style.display = 'none';  // Hide the card
    }
  });
});
