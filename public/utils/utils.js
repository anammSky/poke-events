export function createEl(elType, cssClass) {
  const el = document.createElement(elType);
  el.classList.add(cssClass);
  return el;
}

export function createImg(src, cssClass) {
  const img = document.createElement("img");
  img.classList.add(cssClass);
  img.setAttribute("src", src);
  return img;
}
