import { createEl, createImg } from "../utils/utils.js";
import addTicketsPopUp from "./addTicketsPopUp.js";

function createEventCard({
  id,
  name,
  description,
  location,
  badge,
  date,
  price,
}) {
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

  const btnAddToCart = createEl("button", "btn-addToCart");
  btnAddToCart.classList.add("btn");
  btnAddToCart.textContent = "Add to Cart";

  btnAddToCart.addEventListener("click", () => {
    addTicketsPopUp(id, name, price, date, location);
  });

  const cardWrapper = document.createElement("div");
  cardWrapper.classList.add("card-wrapper");
  cardWrapper.append(
    eventTitle,
    imgContainer,
    eventDescription,
    infoWrapper,
    btnAddToCart
  );

  const card = createEl("article", "card");
  card.append(cardWrapper);

  return card;
}

export default createEventCard;
