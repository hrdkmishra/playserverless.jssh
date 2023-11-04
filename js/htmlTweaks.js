// index.html tweaks

const input = document.getElementById("userInput");
input.addEventListener("input", function () {
  if (input.scrollWidth > input.clientWidth) {
    input.style.width = input.scrollWidth + "px";
  }
});

// const focusInput = () => {
//   document.getElementById("userInput").focus();
// };


//  arrow key functionality for history of commands 
const commandHistory = [];
let historyIndex = 0;