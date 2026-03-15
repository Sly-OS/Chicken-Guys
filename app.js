// Add future dishes by editing this data only; the UI renders from it automatically.
const menuData = [
  {
    id: "chicken-meals",
    label: "Menu",
    menuBadge: "Halal Chicken",
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
    id: "locations",
    label: "Locations",
    items: [],
    locations: [
      {
        name: "Helen Albert Certified Farmers' Market",
        day: "Monday",
        time: "9:00 AM - 2:00 PM",
        addressLine1: "Plummer Park, 1200 N Vista St",
        addressLine2: "West Hollywood, CA 90046",
      },
      {
        name: "Culver City Farmers Market",
        day: "Tuesday",
        time: "2:00 PM - 7:00 PM",
        addressLine1: "3843 Main St",
        addressLine2: "Culver City, CA 90232",
      },
      {
        name: "Manhattan Beach Farmers Market",
        day: "Tuesday",
        time: "11:00 AM - 3:00 PM",
        addressLine1: "326 13th St",
        addressLine2: "Manhattan Beach, CA 90266",
      },
      {
        name: "Larchmont Village Farmers' Market",
        day: "Wednesday",
        time: "1:00 PM - 5:00 PM",
        addressLine1: "209 N Larchmont Blvd",
        addressLine2: "Los Angeles, CA 90004",
      },
      {
        name: "Long Beach Farmers Market (Marine Stadium)",
        day: "Wednesday",
        time: "3:00 PM - 7:00 PM",
        addressLine1: "5255 Paoli Way",
        addressLine2: "Long Beach, CA 90803",
      },
      {
        name: "South Pasadena Farmers Market",
        day: "Thursday",
        time: "4:00 PM - 8:00 PM",
        addressLine1: "920 Meridian Ave",
        addressLine2: "South Pasadena, CA 91030",
      },
      {
        name: "El Segundo Certified Farmers Market",
        day: "Thursday",
        time: "3:00 PM - 7:00 PM",
        addressLine1: "350 Main St",
        addressLine2: "El Segundo, CA 90245",
      },
      {
        name: "Marina del Rey Farmers' Market",
        day: "Saturday",
        time: "9:00 AM - 2:00 PM",
        addressLine1: "14101 Panay Way",
        addressLine2: "Marina del Rey, CA 90292",
      },
      {
        name: "Laguna Beach Farmers Market",
        day: "Saturday",
        time: "8:00 AM - 12:00 PM",
        addressLine1: "521 Forest Ave",
        addressLine2: "Laguna Beach, CA 92651",
      },
      {
        name: "Hollywood Farmers' Market",
        day: "Sunday",
        time: "8:00 AM - 1:00 PM",
        addressLine1: "1600 Ivar Ave",
        addressLine2: "Los Angeles, CA 90028",
      },
      {
        name: "Mar Vista Certified Farmers Market",
        day: "Sunday",
        time: "9:00 AM - 2:00 PM",
        addressLine1: "12198 Venice Blvd",
        addressLine2: "Los Angeles, CA 90066",
      },
    ],
  },
  {
    id: "catering",
    label: "Catering",
    items: [],
    cateringDetails: {
      headline: "Catering for Every Occasion",
      description:
        "From casual office lunches to family celebrations, we prepare crowd-pleasing chicken meals with reliable service and clear communication from start to finish.",
      events: [
        "Office lunches",
        "Birthday parties",
        "Family gatherings",
        "School and team events",
        "Private celebrations",
      ],
      phoneDisplay: "(310) 555-0198",
      phoneHref: "tel:+13105550198",
      textHref: "sms:+13105550198",
      emailDisplay: "catering@thechickenguys.com",
      emailHref: "mailto:catering@thechickenguys.com",
      contactItems: [
        "Event date and preferred pickup or delivery time",
        "Estimated guest count",
        "Which menu items you are interested in",
        "Venue or delivery location",
        "Any dietary needs or special requests",
      ],
      advanceNotice:
        "Please reach out as early as possible for large catering orders so we can confirm availability and plan your order properly.",
    },
  },
];

const categoryList = document.querySelector("#category-list");
const productGrid = document.querySelector("#product-grid");
const locationCard = document.querySelector("#location-card");
const cateringCard = document.querySelector("#catering-card");
const cateringContent = document.querySelector("#catering-content");
const menuBadge = document.querySelector("#menu-badge");
const pageTitle = document.querySelector("#page-title");
const sectionTitle = document.querySelector("#section-title");
const menuDrawer = document.querySelector("#menu-drawer");
const menuOpenButton = document.querySelector("#menu-open");
const menuCloseButton = document.querySelector("#menu-close");
const productCardTemplate = document.querySelector("#product-card-template");

let activeCategoryId = menuData[0].id;
let isTransitioning = false;

const DRAWER_CLOSE_DURATION = 520;

function wait(duration) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, duration);
  });
}

function getActiveCategory() {
  return menuData.find((category) => category.id === activeCategoryId) ?? menuData[0];
}

function closeDrawer() {
  menuDrawer.classList.remove("is-opening");
  menuDrawer.classList.add("is-closing");
  menuDrawer.classList.remove("is-open");
  menuDrawer.setAttribute("aria-hidden", "true");
  document.body.classList.remove("body-lock");

  window.setTimeout(() => {
    menuDrawer.classList.remove("is-closing");
  }, 520);
}

function openDrawer() {
  menuDrawer.classList.remove("is-closing");
  menuDrawer.classList.add("is-open");
  menuDrawer.classList.add("is-opening");
  menuDrawer.setAttribute("aria-hidden", "false");
  document.body.classList.add("body-lock");

  window.setTimeout(() => {
    menuDrawer.classList.remove("is-opening");
  }, 560);
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
    button.addEventListener("click", async () => {
      if (isTransitioning) {
        return;
      }

      if (category.id === activeCategoryId) {
        closeDrawer();
        return;
      }

      closeDrawer();
      isTransitioning = true;
      await wait(DRAWER_CLOSE_DURATION);
      activeCategoryId = category.id;
      render();
      isTransitioning = false;
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
  const locationList = activeCategory.locations ?? [];
  const cateringDetails = activeCategory.cateringDetails;
  const activeMenuBadge = activeCategory.menuBadge;

  sectionTitle.textContent = activeCategory.label;
  productGrid.innerHTML = "";
  locationCard.hidden = true;
  cateringCard.hidden = true;
  cateringContent.hidden = true;
  menuBadge.hidden = true;
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

  if (locationList.length > 0) {
    locationCard.hidden = false;
    const locationCardBody = locationCard.querySelector(".location-card__content");
    locationCardBody.innerHTML = "";

    locationList.forEach((location) => {
      const entry = document.createElement("section");
      entry.className = "location-entry";

      const name = document.createElement("p");
      name.className = "location-entry__name";
      name.textContent = location.name;

      const day = document.createElement("p");
      day.className = "location-entry__detail";
      day.textContent = location.day;

      const time = document.createElement("p");
      time.className = "location-entry__detail";
      time.textContent = location.time;

      entry.append(name, day, time);

      if (location.addressLine1) {
        const addressLine1 = document.createElement("p");
        addressLine1.className = "location-entry__detail";
        addressLine1.textContent = location.addressLine1;
        entry.append(addressLine1);
      }

      if (location.addressLine2) {
        const addressLine2 = document.createElement("p");
        addressLine2.className = "location-entry__detail";
        addressLine2.textContent = location.addressLine2;
        entry.append(addressLine2);
      }

      locationCardBody.append(entry);
    });
  }

  if (activeCategory.id === "chicken-meals" && activeMenuBadge) {
    menuBadge.hidden = false;
    menuBadge.textContent = activeMenuBadge;
  }

  if (cateringDetails) {
    cateringCard.hidden = false;
    cateringContent.hidden = false;

    cateringCard.querySelector(".catering-hero__title").textContent = cateringDetails.headline;
    cateringCard.querySelector(".catering-hero__text").textContent = cateringDetails.description;

    const eventList = cateringCard.querySelector(".catering-list");
    eventList.innerHTML = "";

    cateringDetails.events.forEach((eventName) => {
      const item = document.createElement("li");
      item.textContent = eventName;
      eventList.append(item);
    });

    const contactActions = cateringCard.querySelector(".catering-actions");
    contactActions.innerHTML = "";

    [
      { label: "Call Now", href: cateringDetails.phoneHref },
      { label: "Text Us", href: cateringDetails.textHref },
      { label: "Email Us", href: cateringDetails.emailHref },
    ].forEach((action) => {
      const link = document.createElement("a");
      link.className = "catering-action";
      link.href = action.href;
      link.textContent = action.label;
      contactActions.append(link);
    });

    const contactChannels = cateringCard.querySelector(".catering-contact__channels");
    contactChannels.innerHTML = "";

    [
      { label: "Call", display: cateringDetails.phoneDisplay, href: cateringDetails.phoneHref },
      { label: "Text", display: cateringDetails.phoneDisplay, href: cateringDetails.textHref },
      { label: "Email", display: cateringDetails.emailDisplay, href: cateringDetails.emailHref },
    ].forEach((channel) => {
      const item = document.createElement("a");
      item.className = "catering-contact__item";
      item.href = channel.href;
      item.innerHTML = `<span>${channel.label}</span><strong>${channel.display}</strong>`;
      contactChannels.append(item);
    });

    const contactItems = cateringCard.querySelector(".catering-contact__details");
    contactItems.innerHTML = "";

    cateringDetails.contactItems.forEach((detail) => {
      const item = document.createElement("li");
      item.textContent = detail;
      contactItems.append(item);
    });

    cateringCard.querySelector(".catering-note__text").textContent = cateringDetails.advanceNotice;
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
