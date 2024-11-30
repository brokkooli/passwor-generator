const characters = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "~",
  "`",
  "!",
  "@",
  "#",
  "$",
  "%",
  "^",
  "&",
  "*",
  "(",
  ")",
  "_",
  "-",
  "+",
  "=",
  "{",
  "[",
  "}",
  "]",
  ",",
  "|",
  ":",
  ";",
  "<",
  ">",
  ".",
  "?",
  "/",
];

let password1El = document.getElementById("password-1-el");
let password2El = document.getElementById("password-2-el");

let setLengthEl = document.getElementById("set-length-el");

let passwordsGenerated = false; // Track whether passwords have been generated

function preventLengthManipulation() {
  // Prevent manual typing but allow spinner functionality
  setLengthEl.addEventListener("keypress", (event) => {
    event.preventDefault(); // Block manual input
  });

  // Prevent pasting into the input
  setLengthEl.addEventListener("paste", (event) => {
    event.preventDefault();
  });

  // Block deletion keys
  setLengthEl.addEventListener("keydown", (event) => {
    const forbiddenKeys = ["Backspace", "Delete"]; // Keys that modify input
    if (forbiddenKeys.includes(event.key)) {
      event.preventDefault(); // Block deleting the value
    }
  });
}

preventLengthManipulation();

function generatePasswords() {
  password1El.innerText = "";
  password2El.innerText = "";

  let setLength = parseInt(setLengthEl.value);

  for (let i = 0; i < setLength; ++i) {
    let randomNumber1 = Math.floor(Math.random() * characters.length);
    let randomNumber2 = Math.floor(Math.random() * characters.length);
    password1El.innerText += characters[randomNumber1];
    password2El.innerText += characters[randomNumber2];
  }

  passwordsGenerated = true; // Set flag to true after passwords are generated

  // Enable tooltips only after passwords are generated
  enableTooltips();
}

// Function to handle copying text and updating tooltip
function handleCopy(spanElement) {
  spanElement.addEventListener("click", function () {
    // Only allow copying and tooltip update if passwords have been generated
    if (passwordsGenerated && spanElement.innerText) {
      navigator.clipboard.writeText(spanElement.textContent).then(() => {
        // Set tooltip to "Copied!" after copy
        spanElement.setAttribute("data-tooltip", "Copied!");

        // Reset tooltip after 2 seconds
        setTimeout(() => {
          spanElement.setAttribute("data-tooltip", "Click to copy");
        }, 2000);
      });
    }
  });
}

// Function to enable tooltips after passwords are generated
function enableTooltips() {
  if (password1El.innerText && password2El.innerText) {
    // Add tooltips to both elements only if passwords are generated
    password1El.setAttribute("data-tooltip", "Click to copy");
    password2El.setAttribute("data-tooltip", "Click to copy");

    // Apply the handleCopy function to both elements
    handleCopy(password1El);
    handleCopy(password2El);
  }
}
