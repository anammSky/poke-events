import createEventCard from "./componets/createEventCards.js";
import getData from "./utils/api.js";
import { createEl, createImg } from "./utils/utils.js";
const cardContainer = document.getElementById("cards-container");

const data = getData("battles/info");

data
  .then((data) => data.events.map((event) => event))
  .then((result) => createCards(result))
  .catch((err) => console.error(err));

document.getElementById("filter-bar").addEventListener("keydown", (e) => {
  const searchWord = e.target.value.toLowerCase();
  const filterArr = pokemonEvents.filter((event) => {
    const location = event.location.toLowerCase();
    if (location.includes(searchWord)) return event;
  });

  //   const filterArr2 = pokemonEvents.filter((event) => {
  //     const badge = event.badge.toLowerCase();
  //     if (badge.includes(searchWord)) return event;
  //   });
  // const finallArr = [...new Set([...filterArr ,...filterArr2])]

  createCards(filterArr);
});

function resolveBuyTicket(name, price, date, location) {
  populateBuyForm(name, price, date, location);

  const buyPopUp = document.querySelector(".buy-container");
  buyPopUp.classList.remove("hidden");
  buyPopUp.classList.add("visible");

  const buyBtns = document.querySelectorAll(".btn-buyTicket");
  const btnCancel = document.querySelector(".btn-cancel");
  const btnBuy = document.querySelector(".btn-buy");

  btnCancel.addEventListener("click", () => {
    buyPopUp.classList.add("hidden");
    buyPopUp.classList.remove("visible");
    buyBtns.forEach((btn) => {
      btn.disabled = buyPopUp.className.includes("hidden") ? false : true;
    });
  });

  btnBuy.addEventListener("click", () => {
    buyPopUp.classList.add("hidden");
    buyPopUp.classList.remove("visible");
    buyBtns.forEach((btn) => {
      btn.disabled = buyPopUp.className.includes("hidden") ? false : true;
    });
  });

  buyBtns.forEach((btn) => {
    btn.disabled = buyPopUp.className.includes("visible") ? true : false;
  });
}

function populateBuyForm(name, price, date, location) {
  const eventTitle = document.getElementById("eventName");
  eventTitle.textContent = name;

  const eventLocation = document.getElementById("eventLocation");
  eventLocation.textContent = `${
    location === "Stadium" ? "Pokemon " : ""
  }${location} ${
    location === "Cinnabar" ? "Island" : location === "Stadium" ? "" : "City"
  }`;

  const eventDate = document.getElementById("eventDate");
  eventDate.textContent = new Date(date).toDateString();

  const eventPrice = document.getElementById("eventPrice");
  eventPrice.textContent = "$" + price.toFixed(2);

  const total = document.getElementById("total");
  total.textContent = "$" + price.toFixed(2);

  const quantity = document.getElementById("tickets-quantity");
  quantity.value = 1;
  quantity.addEventListener("input", (e) => {
    const newPrice = price * e.target.value;
    total.textContent = "$" + newPrice.toFixed(2);
  });
}

function createCards(arr) {
  cardContainer.replaceChildren();

  for (let i = 0; i < arr.length; i++) {
    cardContainer.append(createEventCard(arr[i]));
  }
}
