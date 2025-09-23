//
document.addEventListener('DOMContentLoaded', () => {
  const redBtn = document.getElementById('redBtn');
  const yellowBtn = document.getElementById('yellowBtn');
  const blueBtn = document.getElementById('blueBtn');
  const scoreSpan = document.getElementById('score');
  const dialogMessage = document.getElementById('dialog-message');
  const dialogOverlay = document.getElementById('dialog-overlay');
  const resetBtn = document.getElementById('dialog-reset-btn');

  let score = 0;
  let correctCount = 0;
  let roundsPlayed = 0;
  let consecutiveWins = 0;
  let scoreUnlocked = false;

  // Event listeners for color buttons
  redBtn.addEventListener('click', () => checkGuess('red'));
  yellowBtn.addEventListener('click', () => checkGuess('yellow'));
  blueBtn.addEventListener('click', () => checkGuess('blue'));

  // Event listener for the reset button
  resetBtn.addEventListener('click', resetGame);

  function generateRandomNumber() {
    return Math.floor(Math.random() * 10); // 0–9
  }

  function checkGuess(chosenColor) {
    if (roundsPlayed >= 3) {
      return; 
    }

    const randomNumber = generateRandomNumber();
    let correctColor;

    if (randomNumber <= 3) {
      correctColor = 'red';
    } else if (randomNumber <= 6) {
      correctColor = 'yellow';
    } else {
      correctColor = 'blue';
    }

    if (chosenColor === correctColor) {
      score++;
      correctCount++;
      consecutiveWins++;
      alert(`✅ Correct! The number was ${randomNumber}, which corresponds to ${correctColor}.`);
    } else {
      score--;
      consecutiveWins = 0;
      alert(`❌ Wrong! The number was ${randomNumber}, which corresponds to ${correctColor}. You chose ${chosenColor}.`);
    }

    roundsPlayed++;

    if (roundsPlayed >= 3) {
      endGame();
    }
    
    updateScoreDisplay();
  }

  function endGame() {
    scoreUnlocked = true;
    updateScoreDisplay(); 

    if (consecutiveWins >= 3) {
      dialogMessage.textContent = `🎉 Congratulations! 3 wins in a row!  ${correctCount} 🤝.`;
    } else {
      dialogMessage.textContent = `Whoops! You got ${correctCount} correct! Keep trying!.`;
      dialogMessage.style.fontFamily='Georgia, Times, serif';
      dialogMessage.style.fontSize='1.3rem';
      dialogMessage.style.marginBottom ='10px';

    }

    showDialog();
  }

  function updateScoreDisplay() {
      scoreSpan.textContent = scoreUnlocked ? score : '0/3';
  }

  
  function resetGame() {
    // Reset all game variables to their initial state
    score = 0;
    correctCount = 0;
    roundsPlayed = 0;
    consecutiveWins = 0;
    scoreUnlocked = false;
    
    // Clear the dialog message and hide the dialog
    dialogMessage.textContent = "";
    hideDialog();
    
    // Update the score display
    updateScoreDisplay();
  }
});
