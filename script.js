const pokemonEvents = [
  {
    name: "Battle for the Boulder Badge",
    description:
      "Collect your Boulder Badge, watch the champions face eachother at the Pewter City Gym.",
    location: "Pewter",
    badge: "Boulder",
    date: new Date("2022/10/15"),
    price: 25.0,
  },
  {
    name: "Battle for the Cascade Badge",
    description:
      "Collect your Cascade Badge, watch the champions face eachother at the Cerulean City Gym.",
    location: "Cerulean",
    badge: "Cascade",
    date: new Date("2022/10/18"),
    price: 28.0,
  },
  {
    name: "Battle for the Thunder Badge",
    description:
      "Collect your Thunder Badge, watch the champions face eachother at the Vermilion City Gym.",
    location: "Vermilion",
    badge: "Thunder",
    date: new Date("2022/10/20"),
    price: 32.0,
  },
  {
    name: "Battle for the Rainbow Badge",
    description:
      "Collect your Rainbow Badge, watch the champions face eachother at the Celadon City Gym.",
    location: "Celadon",
    badge: "Rainbow",
    date: new Date("2022/10/22"),
    price: 35.0,
  },
  {
    name: "Battle for the Soul Badge",
    description:
      "Collect your Soul Badge, watch the champions face eachother at the Fuchsia City Gym.",
    location: "Fuchsia",
    badge: "Soul",
    date: new Date("2022/10/25"),
    price: 35.0,
  },
  {
    name: "Battle for the Marsh Badge",
    description:
      "Collect your Marsh Badge, watch the champions face eachother at the Saffron City Gym.",
    location: "Saffron",
    badge: "Marsh",
    date: new Date("2022/10/28"),
    price: 40.0,
  },
  {
    name: "Battle for the Volcano Badge",
    description:
      "Collect your Volcano Badge, watch the champions face eachother at the Cinnabar Island Gym.",
    location: "Cinnabar",
    badge: "Volcano",
    date: new Date("2022/10/30"),
    price: 40.0,
  },
  {
    name: "Battle the Elite Four: Lorelei!",
    description:
      "The champtions have collected every badge. It's time to take on the Elite Four over this two day event. Morning match against Lorelei.",
    location: "Stadium",
    badge: null,
    date: new Date("2022/11/03"),
    price: 50.0,
  },
  {
    name: "Battle the Elite Four: Bruno!",
    description:
      "The champtions have collected every badge. It's time to take on the Elite Four over this two day event. Afternoon match against Bruno.",
    location: "Stadium",
    badge: null,
    date: new Date("2022/11/03"),
    price: 75.0,
  },
  {
    name: "Battle the Elite Four: Agatha!",
    description:
      "With two Elite Battles under their belt, the last day of the two day tournament is here. Morning match against Agatha.",
    location: "Stadium",
    badge: null,
    date: new Date("2022/11/04"),
    price: 80.0,
  },
  {
    name: "Battle the Elite Four: Lance!",
    description:
      "The final match of our battle season. Get ready to see our champtions in the afternoon match against Lance.",
    location: "Stadium",
    badge: null,
    date: new Date("2022/11/05"),
    price: 100.0,
  },
];

const cardContainer = document.getElementById("cards-container");

createCards(pokemonEvents);

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
  eventDate.textContent = date.toDateString();

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

function createEventCard({ name, description, location, badge, date, price }) {
  const eventTitle = createEl("h2", "card-title");
  eventTitle.textContent = name;

  const imgWarpper = createEl("div", "img-wrapper");
  const imgContainer = createEl("div", "img-container");

  const imgUrl = `assets/city/${location}.png`;
  const eventCoverImg = createImg(imgUrl, "img-banner");
  imgWarpper.append(eventCoverImg);

  if (!badge) {
    imgContainer.append(imgWarpper);
  } else {
    const badgeUrl = `assets/badge/${badge}_Badge.png`;
    const eventBadgeImg = createImg(badgeUrl, "img-badge");
    imgContainer.append(imgWarpper, eventBadgeImg);
  }

  const eventDescription = createEl("p", "card-description");
  eventDescription.textContent = description;

  const eventPrice = createEl("p", "card-price");
  eventPrice.textContent = "$" + price.toFixed(2);

  const eventDate = createEl("p", "card-date");
  eventDate.textContent = date.toDateString();

  const infoWrapper = createEl("div", "card-info");
  infoWrapper.append(eventPrice, eventDate);

  const buyTicketBtn = createEl("button", "btn-buyTicket");
  buyTicketBtn.textContent = "Buy Tickets";
  buyTicketBtn.addEventListener("click", () =>
    resolveBuyTicket(name, price, date, location)
  );

  const cardWrapper = document.createElement("div");
  cardWrapper.classList.add("card-wrapper");
  cardWrapper.append(
    eventTitle,
    imgContainer,
    eventDescription,
    infoWrapper,
    buyTicketBtn
  );

  const card = createEl("article", "card");
  card.append(cardWrapper);

  return card;
}

function createCards(arr) {
  cardContainer.replaceChildren();

  for (let i = 0; i < arr.length; i++) {
    cardContainer.append(createEventCard(arr[i]));
  }
}

//helper functions
function createImg(src, cssClass) {
  const img = document.createElement("img");
  img.classList.add(cssClass);
  img.setAttribute("src", src);
  return img;
}
function createEl(elType, cssClass) {
  const el = document.createElement(elType);
  el.classList.add(cssClass);
  return el;
}
