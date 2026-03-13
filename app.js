// Add future dishes by editing this data only; the UI renders from it automatically.
const menuData = [
  {
    id: "chicken-meals",
    label: "Menu",
    items: [
      {
        name: "Full Chicken with Potatoes",
        priceText: "$24",
        image: {
          src: "./images/ChatGPT Image Mar 11, 2026 at 12_12_02 PM.png",
          fit: "contain",
        },
      },
      {
        name: "Combo Half Chicken with Potatoes",
        priceText: "$16",
        image: {
          src: "./images/ChatGPT Image Mar 11, 2026 at 12_13_41 PM.png",
          fit: "contain",
        },
      },
      {
        name: "Full Chicken",
        priceText: "$20",
        image: {
          src: "./images/ChatGPT Image Mar 11, 2026 at 11_39_59 AM.png",
          fit: "contain",
        },
      },
      {
        name: "Half Chicken",
        priceText: "$14",
        image: {
          src: "./images/ChatGPT Image Mar 11, 2026 at 11_35_10 AM.png",
          fit: "contain",
        },
      },
    ],
  },
  {
    id: "location",
    label: "Location",
    items: [],
    locationName: "Culver City Farmers Market",
  },
  {
    id: "catering",
    label: "Catering",
    items: [],
    cateringText: "Catering available for events and group orders.",
  },
];

const categoryList = document.querySelector("#category-list");
const productGrid = document.querySelector("#product-grid");
const locationCard = document.querySelector("#location-card");
const cateringCard = document.querySelector("#catering-card");
const pageTitle = document.querySelector("#page-title");
const sectionTitle = document.querySelector("#section-title");
const menuDrawer = document.querySelector("#menu-drawer");
const menuOpenButton = document.querySelector("#menu-open");
const menuCloseButton = document.querySelector("#menu-close");
const productCardTemplate = document.querySelector("#product-card-template");

let activeCategoryId = menuData[0].id;

function getActiveCategory() {
  return menuData.find((category) => category.id === activeCategoryId) ?? menuData[0];
}

function closeDrawer() {
  menuDrawer.classList.remove("is-open");
  menuDrawer.setAttribute("aria-hidden", "true");
  document.body.classList.remove("body-lock");
}

function openDrawer() {
  menuDrawer.classList.add("is-open");
  menuDrawer.setAttribute("aria-hidden", "false");
  document.body.classList.add("body-lock");
}

function renderCategories() {
  categoryList.innerHTML = "";

  menuData.forEach((category) => {
    const listItem = document.createElement("li");
    const button = document.createElement("button");

    button.type = "button";
    button.textContent = category.label;
    button.className = category.id === activeCategoryId ? "is-active" : "";
    button.setAttribute("aria-pressed", String(category.id === activeCategoryId));
    button.addEventListener("click", () => {
      activeCategoryId = category.id;
      render();
      closeDrawer();
    });

    listItem.append(button);
    categoryList.append(listItem);
  });
}

function setCardImageStyles(imageElement, imageData) {
  imageElement.style.backgroundImage = `url('${imageData.src}')`;
  imageElement.style.backgroundSize = imageData.fit === "contain" ? "86% auto" : "cover";
  imageElement.style.backgroundPosition = "center 56%";
}

function renderProducts() {
  const activeCategory = getActiveCategory();
  const items = activeCategory.items ?? [];

  sectionTitle.textContent = activeCategory.label;
  productGrid.innerHTML = "";
  locationCard.hidden = true;
  cateringCard.hidden = true;
  pageTitle.hidden = activeCategory.id !== "chicken-meals";

  items.forEach((item) => {
    const fragment = productCardTemplate.content.cloneNode(true);
    const image = fragment.querySelector(".product-card__image");
    const name = fragment.querySelector(".product-card__name");
    const meta = fragment.querySelector(".product-card__meta");

    setCardImageStyles(image, item.image);
    name.textContent = item.name;
    meta.textContent = item.priceText;
    productGrid.append(fragment);
  });

  if (activeCategory.locationName) {
    locationCard.hidden = false;
    locationCard.querySelector(".location-card__name").textContent = activeCategory.locationName;
  }

  if (activeCategory.cateringText) {
    cateringCard.hidden = false;
    cateringCard.querySelector(".location-card__name").textContent = activeCategory.cateringText;
  }
}

function render() {
  renderCategories();
  renderProducts();
}

menuOpenButton.addEventListener("click", openDrawer);
menuCloseButton.addEventListener("click", closeDrawer);
menuDrawer.addEventListener("click", (event) => {
  if (event.target === menuDrawer) {
    closeDrawer();
  }
});

render();
