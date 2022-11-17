export default function addTicketsPopUp(id, name, price, date, location) {
  populateTicketsPopUp(name, price, date, location);

  const buyPopUp = document.querySelector(".buy-container");
  buyPopUp.classList.remove("hidden");
  buyPopUp.classList.add("visible");

  const buyBtns = document.querySelectorAll(".btn-buyTicket");
  const btnCancel = document.querySelector(".btn-cancel");
  const btnAdd = document.querySelector(".btn-buy");

  btnCancel.addEventListener("click", (e) => {
    e.preventDefault();
    buyPopUp.classList.add("hidden");
    buyPopUp.classList.remove("visible");
    buyBtns.forEach((btn) => {
      btn.disabled = buyPopUp.className.includes("hidden") ? false : true;
    });
  });

  btnAdd.addEventListener("click", () => {
    buyPopUp.classList.add("hidden");
    buyPopUp.classList.remove("visible");
    buyBtns.forEach((btn) => {
      btn.disabled = buyPopUp.className.includes("hidden") ? false : true;
    });
  });
  const total = document.getElementById("total");
  const quantity = document.getElementById("tickets-quantity");
  quantity.value = 1;

  const eventId = document.getElementById("event-id");
  eventId.value = id;

  quantity.addEventListener("input", (e) => {
    const newPrice = price * e.target.value;
    total.textContent = "$" + newPrice.toFixed(2);
  });

  buyBtns.forEach((btn) => {
    btn.disabled = buyPopUp.className.includes("visible") ? true : false;
  });
}

function populateTicketsPopUp(name, price, date, location) {
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
}
