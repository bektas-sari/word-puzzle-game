import React, { useState, useEffect, useRef } from "react";
import "./WordGame.css"; // Import CSS file

// Word list (Replace with 1000 English words)
const words = [
  // 🍏 Fruits
  "apple", "banana", "cherry", "grape", "orange", "pear", "peach", "plum",
  "mango", "melon", "lemon", "lime", "kiwi", "strawberry", "blueberry",
  "raspberry", "pineapple", "pomegranate", "apricot", "coconut",

  // 🥦 Vegetables
  "carrot", "tomato", "cucumber", "lettuce", "onion", "pepper", "potato",
  "pumpkin", "spinach", "broccoli", "garlic", "ginger", "cabbage", "corn",
  "eggplant", "peas", "radish", "zucchini", "celery", "beetroot",

  // 🐾 Animals
  "dog", "cat", "lion", "tiger", "elephant", "giraffe", "zebra", "monkey",
  "bear", "wolf", "fox", "deer", "rabbit", "kangaroo", "panda", "dolphin",
  "shark", "whale", "turtle", "octopus",

  // 🏠 Household Items
  "chair", "table", "bed", "sofa", "lamp", "mirror", "clock", "pillow",
  "blanket", "carpet", "curtain", "drawer", "shelf", "fridge", "oven",
  "microwave", "toaster", "wardrobe", "sink", "bathtub",

  // 📦 Objects
  "bottle", "box", "cup", "glass", "spoon", "fork", "knife", "plate",
  "wallet", "phone", "laptop", "charger", "headphones", "camera", "watch",
  "key", "pen", "pencil", "notebook", "umbrella"
];

function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

function hideRandomLetters(word) {
  const wordArray = word.split("");
  const indexesToHide = new Set();

  // Randomly hide 2 letters (or less if the word is short)
  while (indexesToHide.size < Math.min(2, word.length)) {
    indexesToHide.add(Math.floor(Math.random() * word.length));
  }

  return wordArray.map((letter, index) => (indexesToHide.has(index) ? "_" : letter)).join("");
}

function WordGame() {
  const [originalWord, setOriginalWord] = useState("");
  const [maskedWord, setMaskedWord] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [message, setMessage] = useState("");
  const [isShaking, setIsShaking] = useState(false);
  const inputRef = useRef(null);
  const checkButtonRef = useRef(null); // Reference for the "Check" button

  useEffect(() => {
    loadNewWord();
  }, []);

  useEffect(() => {
    // Detect Enter key press
    const handleKeyPress = (event) => {
      if (event.key === "Enter") {
        if (document.activeElement !== inputRef.current) {
          inputRef.current.focus(); // Focus input if it's not active
        } else {
          checkButtonRef.current.click(); // Simulate clicking the "Check" button
        }
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const loadNewWord = () => {
    const newWord = getRandomWord();
    setOriginalWord(newWord);
    setMaskedWord(hideRandomLetters(newWord));
    setInputValue("");
    setMessage("");
  };

  const checkAnswer = () => {
    if (inputValue.toLowerCase() === originalWord.toLowerCase()) {
      setMessage("✅ Correct!");
      setMaskedWord(originalWord); // Reveal the full word when correct
    } else {
      setMessage("❌ Wrong! Try again.");
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 300);
    }
  };

  return (
    <div className="word-game-wrapper">
      
      <div className="word-game-container">
        <h1 className="word-game-title">Guess the Word</h1>
        <h3 className="word-mask">{maskedWord}</h3>
        <input
          type="text"
          className="word-input"
          ref={inputRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type your guess..."
        />
        <button
          ref={checkButtonRef}
          className={`check-button ${isShaking ? "wrong" : ""}`}
          onClick={checkAnswer}
        >
          Check
        </button>
        <button className="check-button" onClick={loadNewWord} style={{ marginTop: "10px" }}>
          New Word
        </button>
        <p className={`message ${message.includes("✅") ? "success" : "error"}`}>{message}</p>
        <footer>2025 - Bektas</footer>
      </div>
      
    </div>
  );
}

export default WordGame;
