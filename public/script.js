const search = document.getElementById('searchInput');
const gameCards = Array.from(document.getElementsByClassName('game-card'));

search.addEventListener('input', () => {
  const searchQuery = search.value.toLowerCase();

  gameCards.forEach(card => {
    const titleElement = card.querySelector('.game-card-title');
    const title = titleElement.innerText.toLowerCase();

    if (title.includes(searchQuery)) {
      card.style.display = 'flex';
    } else {
      card.style.display = 'none';
    }
  });
});
