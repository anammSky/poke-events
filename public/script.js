async function getEventsData() {
  try {
    const response = await fetch("./api/battles/info");
    const data = await response.json();
    const sortedData = data.events.map((event) => event);
    return sortedData;
  } catch (error) {
    throw error;
  }
}

const cardContainer = document.getElementById("cards-container");

const data = getEventsData();

data.then((result) => createCards(result));

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
  eventDate.textContent = new Date(date).toDateString();

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
