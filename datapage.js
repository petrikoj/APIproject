// var globalDataStore;

/// FETCH THE DATA ///
let artistFirstName = "Amy";
let artistLastName = "Weber";
let artistToSearchFor = artistFirstName + artistLastName || artistFirstName;

const fetchDataAsync = async () => {
  try {
    const response = await fetch(
      `https://api.scryfall.com/cards/search?q=(artist:${artistToSearchFor})`
    );
    // "https://api.scryfall.com/cards/search?q=(artist%3ADrew+artist%3ATucker)"
    const result = await response.json();
    console.log("result :>> ", result);
    myController(result.data);
  } catch (error) {
    console.log("error :>> ", error);
  }
};

/// CREATING A BOOTSTRAP 5 NAVBAR WITH DOM FOR PRACTICE ///

const navbarContainer = document.getElementById("navbar");
navbarContainer.style.marginBottom = "15vh";
const navbarOutside = document.createElement("nav");
navbarOutside.classList.add("navbar");
navbarOutside.setAttribute("class", "fixed-top navbar-dark bg-secondary");
const navbarInside = document.createElement("div");
navbarInside.style.height = "8vh";
navbarInside.classList.add("container-fluid");
navbarInside.setAttribute(
  "class",
  "d-flex justify-content-center align-items-center"
);
const navbarContent1 = document.createElement("a");
navbarContent1.classList.add("navbar-brand");
navbarContent1.setAttribute("href", "./index.html");
navbarContent1.innerHTML = "API PROJECT";
const navbarContent2 = document.createElement("a");
navbarContent2.classList.add("nav-link");
navbarContent2.setAttribute("aria-current", "page");
navbarContent2.setAttribute("href", "./data.html");
navbarContent2.innerHTML = "CARDS";
navbarContent2.style.color = "ghostwhite";

const myDropdown = document.createElement("div");
myDropdown.classList.add("dropdown");
const myDropdownButton = document.createElement("button");
myDropdownButton.setAttribute("class", "btn btn-secondary dropdown-toggle");
myDropdownButton.setAttribute("type", "button");
myDropdownButton.setAttribute("id", "dropdownMenu2");
myDropdownButton.setAttribute("data-bs-toggle", "dropdown");
myDropdownButton.setAttribute("aria-expanded", "false");
myDropdownButton.innerHTML = "MORE ARTISTS";
const myDropdownMenu = document.createElement("ul");
myDropdownMenu.classList.add("dropdown-menu");
myDropdownMenu.setAttribute("aria-labelledby", "dropdownMenu2");
const myDropdownItem1 = document.createElement("li");
const myDropdownButton1 = document.createElement("button");
myDropdownButton1.classList.add("dropdown-item");
myDropdownButton1.setAttribute("type", "button");
myDropdownButton1.innerHTML = "Rebecca Guay";
const myDropdownItem2 = document.createElement("li");
const myDropdownButton2 = document.createElement("button");
myDropdownButton2.classList.add("dropdown-item");
myDropdownButton2.setAttribute("type", "button");
myDropdownButton2.innerHTML = "Tom Wänerstrand";
const myDropdownItem3 = document.createElement("li");
const myDropdownButton3 = document.createElement("button");
myDropdownButton3.classList.add("dropdown-item");
myDropdownButton3.setAttribute("type", "button");
myDropdownButton3.innerHTML = "Amy Weber";

navbarContainer.appendChild(navbarOutside);
navbarOutside.appendChild(navbarInside);
navbarInside.appendChild(navbarContent1);
navbarInside.appendChild(navbarContent2);
navbarInside.appendChild(myDropdown);
myDropdown.appendChild(myDropdownButton);
myDropdown.appendChild(myDropdownMenu);
myDropdownMenu.appendChild(myDropdownItem1);
myDropdownItem1.appendChild(myDropdownButton1);
myDropdownMenu.appendChild(myDropdownItem2);
myDropdownItem2.appendChild(myDropdownButton2);
myDropdownMenu.appendChild(myDropdownItem3);
myDropdownItem3.appendChild(myDropdownButton3);

/// CREATING THE PAGE HEADLINE ///

const pageHeadline = document.querySelector("h1");
pageHeadline.classList.add("text-center");
pageHeadline.style.marginBottom = "10vh";
pageHeadline.innerHTML = `Every Single Magic: The Gathering Card Illustrated by ${artistFirstName} ${artistLastName}`;

/// GET MY DATA WITH LIVE FETCH (TO BE CREATED) ///

// let artistFirstName = "Magali";
// let artistSecondName = "Tucker";
// let searchTerm = "artist:" + artistFirstName + "artist:" + artistSecondName;
// let searchTerm = "artist:" + artistFirstName;
// console.log("searchTerm :>> ", searchTerm);

/// DISPLAY THE RESULT WITH BOOTSTRAP 5 CARDS ///

function createBS5Cards(data) {
  const divContainer = document.getElementById("api-data");
  const mySwitch = document.getElementById("flexSwitchCheckDefault");
  divContainer.innerHTML = "";
  for (let i = 0; i < data.length; i++) {
    const divCard = document.createElement("div");
    divCard.classList.add("card");
    divCard.setAttribute("class", "col-xs-12 col-sm-6 col-md-4 col-lg-3");
    divCard.setAttribute("width", "18rem");

    const img = document.createElement("img");
    img.classList.add("card-img-top");
    img.setAttribute("alt", data[i].name);
    if ((mySwitch.checked = false)) {
      console.log("1", mySwitch.checked);
      img.classList.add("crop");
      img.setAttribute("src", data[i].image_uris.art_crop);
    } else {
      console.log("2", mySwitch.checked);

      img.classList.remove("crop");
      img.classList.add("large");
      img.setAttribute("src", data[i].image_uris.large);
      mySwitch.checked = true;
    }

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    const h5 = document.createElement("h5");
    h5.classList.add("card-title");
    h5.innerHTML = data[i].name;
    h5.style.textAlign = "center";

    divContainer.appendChild(divCard);
    divCard.appendChild(img);
    cardBody.appendChild(h5);
    divCard.appendChild(cardBody);
  }
}

/// CREATE TOGGLE FUNCTION FOR TWO DIFFERENT VIEW MODES ///

function cardViewToggler(data) {
  console.log("cardViewToggler :>> ", data);
  let images = document.getElementsByClassName("card-img-top");
  const mySwitch = document.getElementById("flexSwitchCheckDefault");
  for (let i = 0; i < images.length; i++)
    if (images[i].classList.contains("crop")) {
      images[i].classList.remove("crop");
      images[i].classList.add("large");
      images[i].setAttribute("src", data[i].image_uris.large);
      mySwitch.checked = true;
    } else if (images[i].classList.contains("large")) {
      images[i].classList.remove("large");
      images[i].classList.add("crop");
      images[i].setAttribute("src", data[i].image_uris.art_crop);
      mySwitch.checked = false;
    }
}

const filtersCombined = (data) => {
  let checkboxes = document.querySelectorAll('input[name="color"]:checked');
  let colorsToFilterFor = [];
  checkboxes.forEach((checkbox) => {
    colorsToFilterFor.push(checkbox.value);

    let filteredCards = data.filter((card) => {
      let hasColorToFilterFor = false;
      card.colors.forEach((color) => {
        hasColorToFilterFor = colorsToFilterFor.includes(color);
      });
      /// TO DO: ADDING CONDITIONS FOR EMPTY ARRAYS + ARRAYS > 1
      // if (card.colors === undefined)
      // if (card.colors.length > 1)
      ///
      return hasColorToFilterFor;
    });

    console.log("cardViewToggler :>> ", data);
    let images = document.getElementsByClassName("card-img-top");
    const mySwitch = document.getElementById("flexSwitchCheckDefault");
    for (let i = 0; i < images.length; i++)
      if (images[i].classList.contains("crop")) {
        images[i].classList.remove("crop");
        images[i].classList.add("large");
        images[i].setAttribute("src", data[i].image_uris.large);
        mySwitch.checked = true;
      } else if (images[i].classList.contains("large")) {
        images[i].classList.remove("large");
        images[i].classList.add("crop");
        images[i].setAttribute("src", data[i].image_uris.art_crop);
        mySwitch.checked = false;
      }

    console.log("Here are my nicely filtered cards:", filteredCards);
    createBS5Cards(filteredCards);
  });
};
// function cardViewToggler() {
//   let images = document.getElementsByClassName("card-img-top");
//   const mySwitch = document.getElementById("flexSwitchCheckDefault");
//   for (let i = 0; i < images.length; i++)
//     if ((mySwitch.checked = true)) {
//       images[i].setAttribute("src", globalDataStore[i].image_uris.large);
//     } else {
//       images[i].removeAttribute("src", globalDataStore[i].image_uris.large);
//       images[i].setAttribute("src", globalDataStore[i].image_uris.large);
//       mySwitch.checked = false;
//     }
// }

/// CHECKBOX FILTER FUNCTION (NOT FULLY WORKING) //

// const filterByColor = (data) => {
//   let checkboxes = document.querySelectorAll('input[name="color"]:checked');
//   let colorsToFilterFor = [];
//   checkboxes.forEach((checkbox) => {
//     colorsToFilterFor.push(checkbox.value);
//   });
//   let filteredCards = data.filter((card) => {
//     let hasColorToFilterFor = false;
//     card.colors.forEach((color) => {
//       hasColorToFilterFor = colorsToFilterFor.includes(color);
//     });
//     /// TO DO: ADDING CONDITIONS FOR EMPTY ARRAYS + ARRAYS > 1
//     // if (card.colors === undefined)
//     // if (card.colors.length > 1)
//     ///
//     return hasColorToFilterFor;
//   });
//   console.log("Here are my nicely filtered cards:", filteredCards);
//   createBS5Cards(filteredCards);
//   cardViewToggler(filteredCards);
// };

/// COMBINE FILTERS

// const filtersCombined = (card) => {
//   let images = document.getElementsByClassName("card-img-top");
//   const mySwitch = document.getElementById("flexSwitchCheckDefault");

//   const checkedCheckboxes = document.querySelectorAll(
//     'input[name="color"]:checked'
//   );
//   const checkedCheckboxesArray = Array.from(checkedCheckboxes);
//   const checkboxValues = checkedCheckboxesArray.map((checkbox) => {
//     return checkbox.value;
//   });
// };

/// HELPER FUNCTIONS

// const isColorless = () => {
//   const colorlessCheckbox = document.getElementById("inlineCheckbox6");
//   const myCards = globalDataStore;
//   myCards.forEach((card) => {
//     if (
//       (colorlessCheckbox.checked = true && card.colors === undefined) ||
//       (colorlessCheckbox.checked = true && card.colors == null)
//     ) {
//       return true;
//     } else {
//       return false;
//     }
//   });
// };

/// SET EVENT LISTENERS ///

function setEventListeners(data) {
  console.log("data :>> ", data);
  document.getElementById("button-addon1").addEventListener("click", () => {
    // filterByColor(data);
    filtersCombined(data);
  });

  document
    .getElementById("flexSwitchCheckDefault")
    .addEventListener("change", function () {
      cardViewToggler(data);
    });
}

/// ADDING A CONTROLLER FUNCTION ///

async function myController(data) {
  createBS5Cards(data);
  // globalDataStore = data;
  setEventListeners(data);
}

/// INITIAL FUNCTION CALL -> FETCH ///

fetchDataAsync();

//////////// RANDOM STUFF FOR LATER USE ////////

/// REMOVING DUPLICATE EDITIONS ///

//   const removeDuplicate = (result.cards) => {
//     const appeared = {};
//     for (let i = 0; i < cards.length; ) {
//       if (!appeared.hasOwnProperty(cards[i].name)) {
//         appeared[cards[i].name] = 1;
//         i++;
//         continue;
//       }
//       cards.splice(i, 1);
//     }
//   };
//   removeDuplicate(cards);
//   console.log("cards without duplicates", cards);
