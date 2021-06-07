const cache = [];

// Loop until the game has started
const gameStartChecker = setInterval(function () {
  const gameFieldCards = document.querySelectorAll('.game-field-card, .game-selection-card-image');
  const gameField = document.querySelector('#game-field-player-hand');
  
  // If the game field is present
  if (gameField) {
    
    // Add mouse hover listener on cards
    gameFieldCards.forEach((item) => {
      item.addEventListener('mouseover', function () {
        const cardName = document.querySelector('#card-name').textContent;
        
        // Check if the card is in the cache
        cardInCache = false;
        cache.forEach((card) => {
          if (card.name === cardName) {
            
            // Display the french text in the description area
            document.querySelector('#card-description').innerHTML = card.text;
            cardInCache = true;
          }
        });
        
        // If the card is not in the cache, fetch it and add it to the cache 
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
            
            // Display the french text in the description area
            document.querySelector('#card-description').innerHTML = card.text;
          })
          .catch((err) => console.error(err));
        }
      });
    });
    
    // Stop the loop
    clearInterval(gameStartChecker);
  }
}, 1000);
