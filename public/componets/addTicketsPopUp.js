export default function addTicketsPopUp(id, name, price, date, location) {
  populateTicketsPopUp(name, price, date, location);

  const buyPopUp = document.querySelector(".buy-container");
  const buyBtns = document.querySelectorAll(".btn-buyTicket");
  const btnsPopUp = document.querySelectorAll(".btn-pop-up");

  const total = document.getElementById("total");
  const quantity = document.getElementById("tickets-quantity");
  const eventId = document.getElementById("event-id");

  buyPopUp.classList.remove("hidden");
  buyPopUp.classList.add("visible");

  btnsPopUp.forEach((btn) => {
    btn.addEventListener("click", () => {
      buyPopUp.classList.add("hidden");
      buyPopUp.classList.remove("visible");
      buyBtns.forEach((btn) => {
        btn.disabled = buyPopUp.className.includes("hidden") ? false : true;
      });
    });
  });

  eventId.value = id;
  quantity.value = 1;

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
