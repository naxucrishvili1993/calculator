const outputText = document.querySelector("input");
const buttons = document.querySelectorAll("button");
const darkModeButton = document.querySelector("#dark-mode-btn");
let outputValue = "";
let enteredValues = [];
let dotCounter = 0;
let equalButtonCounter = 0;
// Dark mode toggler
darkModeButton.addEventListener("click", function() {
   let elem = document.body;
   elem.classList.toggle("dark-mode");
});
// Calculator For Mouse Click
for(let item of buttons) {
   item.addEventListener("click", function (event) {
      // Pressed Animation Section
      item.classList.add("pressed");
      setTimeout(function() {
          item.classList.remove("pressed")}, 100);
      let text = event.target.innerText;
      enteredValues.push(text);
      // Dot and Equal Button Counter Section
      if(text == ".") dotCounter++;
      if(equalButtonCounter === 1) {
         equalButtonCounter = 0;
         if(text == "." || text == "0" || text == "1" || text == "2" || text == "3" || text == "4" || text == "5" || text == "6" || text == "7" || text == "8" || text == "9") {
            outputValue = "";
            outputText.value = outputValue;
         }
         
      }
      // Clear Button Section
      if(text == "C") {
         outputValue = "";
         outputText.value = outputValue;
         enteredValues = [];
         dotCounter = 0;
         playClearAudio();
      } else if(text === "=") { // Equal Button Section
         equalButtonCounter= 0;
         if(outputValue.length === 0) {
            outputText.value = "Invalid";
         }
         if(outputValue.length !== 0 && enteredValues[enteredValues.length - 2] !== "=") {
            outputValue = outputValue.replace(/x/gi, "*");
            let calculatedAnswer = eval(outputValue);
            outputValue = Math.round(calculatedAnswer * 100) / 100;
            outputText.value = outputValue;
            dotCounter = 0;
            equalButtonCounter = 1;
         }
         playEqualButtonAudio();
      } else { // Clearing array to start creating new number
         if(text == "+" || text == "-" || text == "%" || text == "/" || text == "x" || text == "(" || text == ")") {
            enteredValues = [];
            dotCounter = 0;
         }
         if(text == "%" || text == "/" || text == "x" || text == "+" || text == "-") {
            if(enteredValues[enteredValues.length - 2] !== text) {
               outputValue += text;
               outputText.value = outputValue;
            }
         } else {
            outputValue += text;
            outputText.value = outputValue;
         }
         // Avoiding Operation Buttons on irrelevant places
         if(text == "%" || text == "/" || text == "x" || text == "+" || text == "-") {
            if(outputValue.slice(outputValue.length - 2, outputValue.length - 1) == "%" || outputValue.slice(outputValue.length - 2, outputValue.length - 1) == "/" || outputValue.slice(outputValue.length - 2, outputValue.length - 1) == "x" || outputValue.slice(outputValue.length - 2, outputValue.length - 1) == "-" || outputValue.slice(outputValue.length - 2, outputValue.length - 1) == "+") {
               outputValue = outputValue.slice(0, outputValue.length - 2);
               outputValue += text;
               outputText.value = outputValue;
            }
         }
         // Avoiding ) on irrelevant places
         if(text == ")") {
            if(outputValue.slice(outputValue.length - 2, outputValue.length - 1) == "%" || outputValue.slice(outputValue.length - 2, outputValue.length - 1) == "/" || outputValue.slice(outputValue.length - 2, outputValue.length - 1) == "x" || outputValue.slice(outputValue.length - 2, outputValue.length - 1) == "-" || outputValue.slice(outputValue.length - 2, outputValue.length - 1) == "+") {
               outputValue = "";
               enteredValues = [];
               outputText.value = "Invalid";
            }
         }
         // Ouputs Invalid if operation starts with irrelevant operation buttons
         if(outputValue.length === 1) {
            switch(text) {
               case "%":
                  outputText.value = "Invalid";
                  outputValue = "";
                  enteredValues = [];
                  break;
               case "+":
                  outputText.value = "Invalid";
                  outputValue = "";
                  enteredValues = [];
                  break;
               case "/":
                  outputText.value = "Invalid";
                  outputValue = "";
                  enteredValues = [];
                  break;
               case "x":
                  outputText.value = "Invalid";
                  outputValue = "";
                  enteredValues = [];
                  break;
               case ")":
                  outputText.value = "Invalid";
                  outputValue = "";
                  enteredValues = [];
                  break;
            }
         }
         
         playButtonAudio();
      }
      // Avoiding 2x or more dots in 1 number.
      if(dotCounter > 1) {
         if(text == ".") {
            outputValue = outputValue.slice(0, outputValue.length - 1);
            outputText.value = outputValue;
         }
      }
      // Backspace Button Section
      if(event.target.innerHTML === '<i class="fa-solid fa-delete-left"></i>' || event.target.innerHTML === '') {
         outputValue = outputText.value.slice(0, -1);
         outputText.value = outputValue;
      }
   });
}

// Audio Section 

function playButtonAudio() {
   let audio = new Audio("audios/button-sound.mp3");
   audio.play();
}
function playEqualButtonAudio() {
   let audio = new Audio("audios/equal-button.mp3");
   audio.play();
}
function playClearAudio() {
   let audio = new Audio("audios/clear.mp3");
   audio.play();
}
