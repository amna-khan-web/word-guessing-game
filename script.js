// List of words categorized by topics
const categories = {
  "Programming": ["code", "javascript", "html", "css", "developer"],
  "Science": ["atom", "energy", "gravity", "photosynthesis", "molecule"],
  "Animals": ["lion", "elephant", "tiger", "giraffe", "zebra"]
};

let selectedCategory = "Programming"; 
let selectedWord = "";
let attempts = 5;
let guessedWord = [];
let score = 0;
let hintsUsed = 0;

// Start Game
function startGame() {
  selectedWord = categories[selectedCategory][Math.floor(Math.random() * categories[selectedCategory].length)];
  guessedWord = Array(selectedWord.length).fill("_");
  document.getElementById("hidden-word").textContent = guessedWord.join(" ");
  document.getElementById("attempts").textContent = attempts;
  document.getElementById("score").textContent = "Score: " + score;
  document.getElementById("category-name").textContent = selectedCategory;
  document.getElementById("hint-message").textContent = "";
  hintsUsed = 0; // Reset hint counter
}

// Handle Category Change
function updateCategory() {
  selectedCategory = document.getElementById("category-select").value;
  resetGame(); // Restart the game when the category changes
}

// Check User Guess
function checkGuess() {
  const input = document.getElementById("guess-input").value.toLowerCase();
  if (!input || input.length !== 1) {
      document.getElementById("message").textContent = "Please enter a single letter!";
      return;
  }

  let correct = false;
  for (let i = 0; i < selectedWord.length; i++) {
      if (selectedWord[i] === input && guessedWord[i] === "_") {
          guessedWord[i] = input;
          correct = true;
      }
  }

  if (!correct) {
      attempts--;
      document.getElementById("message").textContent = "Wrong guess!😕";
  } else {
      document.getElementById("message").textContent = "Good guess!👍🏻";
  }

  document.getElementById("hidden-word").textContent = guessedWord.join(" ");
  document.getElementById("attempts").textContent = attempts;

  if (guessedWord.join("") === selectedWord) {
      document.getElementById("message").textContent = "Congratulations!🎉 You guessed the word!👌🏻";
      score += 10; // Increase score when player wins
  }

  if (attempts === 0 && guessedWord.join("") !== selectedWord) {
      document.getElementById("message").textContent = "Game Over🏳! The word was: 👉🏻" + selectedWord;
        // Add a span to highlight the selected word with red color
        const messageElement = document.getElementById("message");
        messageElement.innerHTML = "Game Over🏳! The word was: 👉🏻<span style='color: brown;'>" + selectedWord + "</span>";
   
    
      // Change the color of the selected word when the game is over
      document.getElementById("hidden-word").style.color = "red"; 
  }

  document.getElementById("score").textContent = "Score: " + score;
  document.getElementById("guess-input").value = "";
}

// Provide Hint
function giveHint() {
  if (hintsUsed >= 1) {
      document.getElementById("hint-message").textContent = "No more hints available!";
      return;
  }

  let hint = selectedWord.charAt(Math.floor(Math.random() * selectedWord.length));
  document.getElementById("hint-message").textContent = "Hint: One of the letters is '" + hint + "'.";

  hintsUsed++; // Increase the hint usage count
}

// Restart Game
function resetGame() {
  attempts = 5;
  score = 0;
  startGame(); // Start the game from the beginning
}

// Initialize Game
startGame();
