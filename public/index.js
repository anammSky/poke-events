import createEventCard from "./componets/createEventCards.js";
import getData from "./utils/api.js";
import { createEl, createImg } from "./utils/utils.js";
const cardContainer = document.getElementById("cards-container");

const data = getData("battles/info");

data
  .then((data) => data.events.map((event) => event))
  .then((result) => createCards(result))
  .catch((err) => console.error(err));

const price = getData("battles/1");

price.then((data) => console.log(data));

function createCards(arr) {
  cardContainer.replaceChildren();

  for (let i = 0; i < arr.length; i++) {
    cardContainer.append(createEventCard(arr[i]));
  }
}

//FILTER BAR CODE
// document.getElementById("filter-bar").addEventListener("keydown", (e) => {
//   const searchWord = e.target.value.toLowerCase();
//   const filterArr = pokemonEvents.filter((event) => {
//     const location = event.location.toLowerCase();
//     if (location.includes(searchWord)) return event;
//   });

//   //   const filterArr2 = pokemonEvents.filter((event) => {
//   //     const badge = event.badge.toLowerCase();
//   //     if (badge.includes(searchWord)) return event;
//   //   });
//   // const finallArr = [...new Set([...filterArr ,...filterArr2])]

//   createCards(filterArr);
// });
