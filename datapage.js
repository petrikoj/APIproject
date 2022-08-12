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
navbarContent1.innerHTML = "MTG API PROJECT";
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

/// ANOTHER WAY OF WRITING THE FETCH FUNCTION ///

// function getData() {
//   fetch(
//     "https://api.scryfall.com/cards/search?q=(artist%3ADrew+artist%3ATucker)"
//   )
//     .then((response) => {
//       return response.json();
//     })
//     .then((result) => {
//       console.log("data", result);
//       myController(result.data);
//     })
//     .catch((error) => {
//       console.log("error");
//     });
// }

/// DISPLAY THE RESULT WITH BOOTSTRAP 5 CARDS ///

function createBS5Cards(data) {
  const divContainer = document.getElementById("api-data");
  for (let i = 0; i < data.length; i++) {
    const divCard = document.createElement("div");
    divCard.classList.add("card");
    divCard.setAttribute("class", "col-xs-12 col-sm-6 col-md-4 col-lg-3");
    divCard.setAttribute("width", "18rem");

    const img = document.createElement("img");
    img.classList.add("card-img-top");
    img.classList.add("crop");
    img.setAttribute("src", data[i].image_uris.art_crop);
    img.setAttribute("alt", data[i].name);

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

/// CREATE TOGGLE FUNCTION FOR TWO DIFFERENT VIEW MODES (NOT WORKING YET!) ///

function cardViewToggler() {
  let images = document.getElementsByClassName("card-img-top");
  for (let i = 0; i < images.length; i++)
    if (images[i].classList.contains("crop")) {
      images[i].classList.remove("crop");
      images[i].classList.add("large");
      images[i].setAttribute("src", globalDataStore[i].image_uris.large);
    } else if (images[i].classList.contains("large")) {
      images[i].classList.remove("large");
      images[i].classList.add("crop");
      images[i].setAttribute("src", globalDataStore[i].image_uris.art_crop);
    }
  return images;
}

flexSwitchCheckDefault.addEventListener("change", cardViewToggler);

/// CHECKBOX FILTER FUNCTION (IN THE MAKING) ///

const filterByColor = () => {
  let checkboxes = document.querySelectorAll('input[name="color"]:checked');
  let colorsToFilterFor = [];
  checkboxes.forEach((checkbox) => {
    colorsToFilterFor.push(checkbox.value);
  });
  let filteredCards = globalDataStore.filter((card) => {
    let hasColorToFilterFor = false;
    card.color_identity.forEach((color) => {
      hasColorToFilterFor = colorsToFilterFor.includes(color);
    });
    return hasColorToFilterFor;
  });
  console.log("here are my nicely filtered cards!", filteredCards);
  document.getElementById("api-data").innerHTML = "";
  createBS5Cards(filteredCards);
};

document
  .getElementById("button-addon1")
  .addEventListener("click", filterByColor);

/// ADDING A CONTROLLER FUNCTION ///

function myController(data) {
  //cardViewToggler(data);
  createBS5Cards(data);
  //filterByColor(data);
  globalDataStore = data;
}

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
