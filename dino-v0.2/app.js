/*
* Fetch data from json 
*/
function fetch(callback) {
  var xhr = new XMLHttpRequest();
  xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 300) {
      callback(JSON.parse(xhr.responseText).Dinos);
    }
  };
  xhr.open("GET", "./dino.json", false);
  xhr.send();
}





/*
* Dino constructor
*/
function Dino({ species, weight, height, diet, fact }) {
  this._species = species;
  this._weight = parseInt(weight);
  this._height = parseInt(height);
  this._diet = diet;
  // facts array contains the original fact
  this._facts = [fact];
};
Dino.prototype.constructTile = function () {
  const tile = document.createElement("div");
  const species = document.createElement("h3");
  const image = document.createElement("img");
  const fact = document.createElement("p");

  tile.classList.add("grid-item");
  species.textContent = this._species;
  image.src = "./images/" + this._species.toLowerCase() + ".png";
  if (this._species === "Pigeon"){
    // if species is a bird, always display the same fact
    fact.textContent = this._facts[0];
  }
  else {
    // otherwise, select random number between 0 and 4 from facts array
    let randomNumber = Math.floor(Math.random() * 4)
    fact.textContent = this._facts[randomNumber];
  }

  tile.appendChild(species);
  tile.appendChild(image);
  tile.appendChild(fact);
  document.getElementById("grid").appendChild(tile);
}





/*
*  Methods for comparing dinosaurs to Human data
*/
//  method#1
Dino.prototype.compareByHeight = function (height) {
  // const humanHeight = parseInt(this._feet) / 12 + parseInt(this._inches);
  if (height === this._height)
    this._facts.push(this._species + " and you, have the same height.");
  else if (height > this._height)
    this._facts.push(this._species + " is shorter than you by "+ (height - this._height) + " inches.");
  else
    this._facts.push(this._species + " is taller than you by " + (this._height - height) + " inches.");
}
//  method#2
Dino.prototype.compareByWeight = function (weight) {
  if (weight === this._weight)
    this._facts.push(this._species + " and you have the same weight.");
  else if (weight > this._weight)
    this._facts.push(this._species + " is lighter than you by " + (weight - this._weight) + " lbs.");
  else
    this._facts.push(this._species + " is heavier than you by " + (this._height - weight) + " lbs.");
}
//  method#3
Dino.prototype.compareByDiet = function (diet) {
  if (diet === this._diet)
    this._facts.push(this._species + " and you have the same diet.");
  else
    this._facts.push(this._species + " is " + this._diet + ".");
}





/*
* Create Human Object
*/
const Human = function () {
  this._name = document.getElementById("name").value;
  this._height = parseInt(document.getElementById("feet").value) * 12 
                    + parseInt(document.getElementById("inches").value) ;
  this._weight = parseInt(document.getElementById("weight").value);
  this._diet = document.getElementById("diet").value;
}
Human.prototype.constructTile = function () {
  const tile = document.createElement("div");
  const heading = document.createElement("h3");
  const image = document.createElement("img");
  
  tile.classList.add("grid-item");
  image.src = "./images/human.png";
  heading.textContent = this._name;
  tile.appendChild(heading);
  tile.appendChild(image);
  document.getElementById("grid").insertBefore(tile, grid.children[4]);
}





/*
* Patcher
*/
function patcher() {
  const human =  new Human();
  fetch(function (response) {
    for (const item of response){
      const dino = new Dino(item);
      dino.compareByHeight(human._height);
      dino.compareByWeight(human._weight);
      dino.compareByDiet(human._diet);
      dino.constructTile();
    }
  });
  human.constructTile();
}





/*
* when "compare me" button is clicked
*/
document.getElementById("btn").addEventListener("click", function () {
  patcher();
  // remove form from DOM
  document.getElementById("dino-compare").style.display = "none";
});