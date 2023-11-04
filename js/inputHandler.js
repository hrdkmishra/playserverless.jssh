const handleInput = (event) => {
  if (event.key === "Enter") {

    // input.style.width = "100px"; 

    const userInput = document.getElementById("userInput").value;
    document.getElementById("userInput").value = "";

    // this below history feature will add all the input 
    // if (userInput !== "") {
    //     commandHistory.push(userInput);
    //     historyIndex = commandHistory.length;
    // }


    const outputDiv = document.getElementById("output");
    outputDiv.innerHTML += `<div><span class="prompt">[superman@jssh]$</span> ${userInput}</div>`;
   
    
    const output = executeCommand(userInput);
    let outputDivhtml = outputDiv.innerHTML += `<div>${output}</div>`;
    
    // only adds right code to history
    if (!outputDivhtml.includes("jssh:") && userInput !== "") {
        commandHistory.push(userInput);
        historyIndex = commandHistory.length;
    }



    document.getElementById("userInput").value = "";
    document.getElementById("userInput").focus();

  }

  else if (event.key === "ArrowUp") {
    if (historyIndex > 0) {
        historyIndex--;
        userInput.value = commandHistory[historyIndex];
      }
  }

  else if (event.key === "ArrowDown") {
    if (historyIndex < commandHistory.length - 1) {
        historyIndex++;
        userInput.value = commandHistory[historyIndex];
      }
  }

};



// future features:

// } else if (event.key === 'Tab') {
    //   event.preventDefault(); // Prevent the default tab behavior
    //   const userInput = document.getElementById('userInput');
    //   const inputText = userInput.value;

    //   if (inputText) {
    //     if (currentMatches.length > 0) {
    //       userInput.value = currentMatches[currentSuggestion];
    //       currentSuggestion = (currentSuggestion + 1) % currentMatches.length;
    //     } else {
    //       // Call suggestCommands to get the matches
    //       currentMatches = suggestCommands(inputText);
    //       if (currentMatches.length > 0) {
    //         userInput.value = currentMatches[currentSuggestion];
    //         currentSuggestion = (currentSuggestion + 1) % currentMatches.length;
    //       }
    //     }
    //   }