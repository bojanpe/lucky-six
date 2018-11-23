
let niz = [];
let colorOn = false;

// button onclick function
function luckySix(){
  generateArray(6);
  appendToDom();
  showOtherButtons();
}

// sort
function sortiraj(){
  niz.sort(function(x, y){return x-y}); 
  appendToDom();
}

// generate random number (0-48)
function getNumber(){
  return (1 + Math.floor(48 * Math.random()));
}

// generate Array of random numbers
function generateArray(number){
  niz = [];
  for (let i = 0; i < number; i++){
    addNewNumber();
  }
}


// append to DOM
function appendToDom(){ 
  let li;
  let span;
  let ul = document.createElement('ul');
  ul.classList.add('niz');
  let display = document.getElementById('display');  
  // if there is something , clear it 
  while (display.firstChild) {
    display.removeChild(display.firstChild);
  }   
  // create ul with niz elements and add classes 'niz-element' for all and 'index of element' for each
  niz.forEach(function(elementNiza,indexOf){
    li = document.createElement('li');
    li.classList.add('niz-element');
    li.classList.add(indexOf); 
    span = document.createElement('span');
    span.textContent = elementNiza;
    li.appendChild(span);
    ul.appendChild(li);
  });
  display.appendChild(ul);
  
  //check for colors
  if(colorOn === true){
    colorOn = false;
    toogleColor();
  }
  else{
    colorOn = true;
    toogleColor();
  }
  
  // call function that listens for changes, ul must be created first
  changeElement();
};


// change single element on click
function changeElement(){
  let ul = document.querySelector('ul');
  let elementForChange;
  let newNumber;
  let spanInsideLi;
    
  ul.addEventListener('click',function(e){
      // get list of li classes.First is niz-element and second is index of li element
      let klaseListe = e.target.parentElement.classList;
      let indexOfElement = klaseListe[1];
      if(klaseListe.contains('niz-element')){       
        newNumber = generateNewNumber();
        elementForChange = ul.childNodes[indexOfElement];
        spanInsideLi = elementForChange.firstChild;
        spanInsideLi.textContent = newNumber;
        
        //check for color
        if(colorOn === true){
          // get index of color class: .color-currentColorIndex and remove that class
          let currentColorIndex = niz[indexOfElement] % 8;
          spanInsideLi.classList.remove(`color-${currentColorIndex}`);
          //add new color class
          let newColorIndex = newNumber % 8;
          spanInsideLi.classList.add(`color-${newColorIndex}`);
        };
        
        //change in niz
        niz[indexOfElement] = newNumber;
      }
  });
}
               
//generate new number
function generateNewNumber(){
  let newNum;
  //check if new number is in the niz 
  (function generate(){
  newNum = getNumber();
    niz.forEach(function(elementNiza){
      if(newNum === elementNiza){
        generate();
      }
    });
  })();
  return newNum;
}

// show buttons 
function showOtherButtons(){
  let hiddenButtons = document.getElementsByClassName('hidden');
  // show each
  for(let i = 0,n = hiddenButtons.length; i < n; i++){
    hiddenButtons[i].classList.add('visible'); 
  }
}


// toogle color
function toogleColor(){
  let nizElements = document.querySelectorAll('li');
  let remaining;
  let span;
  let button = document.getElementById('btn-color'); //just to color button
  if(colorOn === false){
    colorOn = true;
    nizElements.forEach(function(elementNiza){
    span = elementNiza.firstChild;
    remaining = span.innerHTML % 8;
    span.classList.add(`color-${remaining}`);
    });
    // add class color to button
    button.classList.add('btn-color-colored');
    }
  else{
    colorOn = false;     nizElements.forEach(function(elementNiza){
    span = elementNiza.firstChild;
    remaining = span.innerHTML % 8;
    span.classList.remove(`color-${remaining}`);
    }); 
    // remove class color form btton
    button.classList.remove('btn-color-colored');
  }
}

// add number
function addNewNumber(){
  let newNumber = generateNewNumber();
  niz.push(newNumber);
  appendToDom();
}

// remove number
function removeNumber(){
  niz.pop();
  appendToDom();
}













