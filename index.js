const cache = [];

const gameStartChecker = setInterval(function () {
  const gameFieldCards = document.querySelectorAll('.game-field-card, .game-selection-card-image');
  const gameField = document.querySelector('#game-field-player-hand');
  if (gameField) {
    gameFieldCards.forEach((item) => {
      item.addEventListener('mouseover', function () {
        const cardName = document.querySelector('#card-name').textContent;
        cardInCache = false;
        cache.forEach((card) => {
          if (card.name === cardName) {
            document.querySelector('#card-description').innerHTML = card.text;
            cardInCache = true;
          }
        });
        if (!cardInCache) {
          fetch('https://yugipedia.com/wiki/'+ cardName.replace(' ', '_'))
          .then((response) => response.text())
          .then((data) => {
            const text = data.split(`<th scope="row">French</th>`)[1].split('<span lang="fr">')[1].split(`</span>`)[0].trim();
            const card = {
              name: cardName,
              text: text
            }
            cache.push(card);
            document.querySelector('#card-description').innerHTML = card.text;
          })
          .catch((err) => console.error(err));
        }
      });
    });
    clearInterval(gameStartChecker);
  }
}, 1000);
