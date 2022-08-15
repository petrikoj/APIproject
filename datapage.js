var globalDataStore;

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

navbarContainer.appendChild(navbarOutside);
navbarOutside.appendChild(navbarInside);
navbarInside.appendChild(navbarContent1);
navbarInside.appendChild(navbarContent2);

/// STYLING THE PAGE HEADLINE ///

const pageHeadline = document.querySelector("h1");
pageHeadline.classList.add("text-center");
pageHeadline.style.marginBottom = "10vh";

/// GET MY DATA WITH LIVE FETCH (TO BE CREATED) ///

// let artistFirstName = "Magali";
// let artistSecondName = "Tucker";
// let searchTerm = "artist:" + artistFirstName + "artist:" + artistSecondName;
// let searchTerm = "artist:" + artistFirstName;
// console.log("searchTerm :>> ", searchTerm);

/// FETCH THE DATA ///

const fetchDataAsync = async () => {
  try {
    const response = await fetch(
      "https://api.scryfall.com/cards/search?q=(artist%3ADrew+artist%3ATucker)"
    );
    const result = await response.json();
    console.log("result :>> ", result);
    myController(result.data);
  } catch (error) {
    console.log("error :>> ", error);
  }
};

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
      img.classList.add("crop");
      img.setAttribute("src", data[i].image_uris.art_crop);
    } else if ((mySwitch.checked = true)) {
      img.classList.remove("crop");
      img.classList.add("large");
      img.setAttribute("src", data[i].image_uris.large);
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

function cardViewToggler() {
  let images = document.getElementsByClassName("card-img-top");
  const mySwitch = document.getElementById("flexSwitchCheckDefault");
  for (let i = 0; i < images.length; i++)
    if (images[i].classList.contains("crop")) {
      images[i].classList.remove("crop");
      images[i].classList.add("large");
      images[i].setAttribute("src", globalDataStore[i].image_uris.large);
      mySwitch.checked = true;
    } else if (images[i].classList.contains("large")) {
      images[i].classList.remove("large");
      images[i].classList.add("crop");
      images[i].setAttribute("src", globalDataStore[i].image_uris.art_crop);
      mySwitch.checked = false;
    }
}

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

const filterByColor = () => {
  let checkboxes = document.querySelectorAll('input[name="color"]:checked');
  let colorsToFilterFor = [];
  checkboxes.forEach((checkbox) => {
    colorsToFilterFor.push(checkbox.value);
  });
  let filteredCards = globalDataStore.filter((card) => {
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
  console.log("Here are my nicely filtered cards:", filteredCards);
  createBS5Cards(filteredCards);
};

/// COMBINE FILTERS

/// HELPER FUNCTIONS

/// SET EVENT LISTENERS ///

function setEventListeners() {
  document
    .getElementById("button-addon1")
    .addEventListener("click", filterByColor);
  document
    .getElementById("flexSwitchCheckDefault")
    .addEventListener("change", cardViewToggler);
}

/// ADDING A CONTROLLER FUNCTION ///

async function myController(data) {
  createBS5Cards(data);
  globalDataStore = data;
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
