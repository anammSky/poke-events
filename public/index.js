import createEventCard from "./componets/createEventCard.js";
import { getData, postData } from "./utils/api.js";

getData("battles/info")
  .then((data) => data.events.map((event) => event))
  .then((result) => createCards(result))
  .catch((err) => console.error(err));

// const price = getData("battles/1");
// price.then((data) => console.log(data));

function createCards(arr) {
  const cardContainer = document.getElementById("events-container");
  cardContainer.replaceChildren();

  for (let event of arr) {
    cardContainer.appendChild(createEventCard(event));
  }
}

// const buyPopUp = document.querySelector(".buy-container");
// const buyBtns = document.querySelectorAll(".btn-buyTicket");

const form = document.getElementById("add-ticket-form");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const quantity = formData.get("tickets-quantity");
  const id = formData.get("id");
  form.reset();
  await postData("battles/add/event", { id: id, quantity: quantity });

  //update notification bubble
  const notificationBubble = document.getElementById("cart-num");
  const currentTickets = Number(notificationBubble.textContent);
  notificationBubble.textContent = currentTickets + Number(quantity);
  if (notificationBubble.textContent !== "")
    notificationBubble.classList.add("header-cart-notification");
});

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
