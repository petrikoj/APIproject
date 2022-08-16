/// CREATING A BOOTSTRAP 5 NAVBAR ///

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
navbarContent2.setAttribute("href", "./data.html");
navbarContent2.innerHTML = "ARTISTS";
navbarContent2.style.color = "ghostwhite";

navbarContainer.appendChild(navbarOutside);
navbarOutside.appendChild(navbarInside);
navbarInside.appendChild(navbarContent1);
navbarInside.appendChild(navbarContent2);

/// STYLING THE PAGE HEADLINE ///

const pageHeadline = document.querySelector("h1");
pageHeadline.classList.add("text-center");

/// CREATING AN IMAGE FOR THE START PAGE ///

const bannerContainer = document.getElementById("banner-container");
bannerContainer.classList.add("text-center");
bannerContainer.style.marginBottom = "10vh";
bannerContainer.style.marginTop = "10vh";
const bannerImage = document.createElement("img");
bannerImage.classList.add("img-fluid");
bannerImage.classList.add("rounded");
bannerImage.setAttribute(
  "src",
  "http://drewtuckerillustration.com/wp-content/uploads/2016/06/Magic-the-Gathering-High-Tide-Fallen-Empires-6-x-7.5-Watercolor-1994-Drew-Tucker-Illustration.jpg"
);
bannerImage.setAttribute("alt", "drawing of the mtg card high tide");
const imageCaption = document.createElement("p");
imageCaption.innerHTML = "Drew Tucker: High Tide (Fallen Empires, 1994)";
imageCaption.style.fontSize = "Smaller";

bannerContainer.appendChild(bannerImage);
bannerContainer.appendChild(imageCaption);

/// CREATING DOM TEXT ///

const textContainer = document.getElementById("text-container");
textContainer.style.fontSize = "larger";
textContainer.style.marginLeft = "10vw";
textContainer.style.marginRight = "10vw";
textContainer.style.marginBottom = "10vh";
const textBlock1 = document.createElement("p");
textBlock1.innerHTML =
  "&quot;Drew Tucker is one of the original 25 Magic: The Gathering artists. He started college at Southern Illinois University at Carbondale studying Graphic Design. After making it through the program, he moved in with his parents in Tennessee and attended a Baptist College to explore more of the visual arts. After a year or two he moved back to Carbondale, got married, and moved up to Seattle, where he finally graduated with a BA at Cornish College of the Arts.";
const dots = document.createElement("span");
dots.innerHTML = "...";
const myBtn = document.createElement("button");
myBtn.setAttribute("class", "btn btn-outline-secondary");
myBtn.innerHTML = "Read more";
const textBlock2 = document.createElement("p");
textBlock2.innerHTML =
  "<br><br>He spent about five years there, moved back to Carbondale for a few, then moved over to New York City, where he received his Masters degree under Marshall Arisman at the school of visual arts. He finally moved to Olney, where he is currently illustrating and teaching at Olney Central College. He did a lot of logo work and brochure design with the occasional illustration. But it wasn't until the early 90s that he got his first real Illustration job – from Wizards of the Coast.<br><br>Between the printing of Unlimited and Revised, the computer file of the Drew Tucker art for Plateau became corrupted and the original painting was lost, leaving the production team with no reasonable way to create a high-quality image. Luckily, art for dual-lands had been commissioned for the then-upcoming Ice Age set. So the Cornelius Brudi Plateau painting was then used as a stand-in for the original in the base set, and was actually misattributed to Tucker. Drew Tucker's art was featured in The Duelist #3 (fall 1994). Some of Tucker's art was referenced in Matt Cavotta's Zombie Fanboy (Unhinged).&quot;<br><br><i>(Source: mtg.fandom)</i><br><br>";
textBlock2.style.display = "none";

textContainer.appendChild(textBlock1);
textBlock1.appendChild(dots);
textContainer.appendChild(myBtn);
textBlock1.appendChild(textBlock2);

/// TOGGLE FUNCTION: DISPLAY MORE OR LESS TEXT ///

function showMore() {
  if (dots.style.display === "none") {
    dots.style.display = "inline";
    myBtn.innerHTML = "Read more";
    textBlock2.style.display = "none";
  } else {
    dots.style.display = "none";
    myBtn.innerHTML = "Show less";
    textBlock2.style.display = "inline";
  }
}

myBtn.addEventListener("click", showMore);
