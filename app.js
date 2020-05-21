SPECDT = [
  {
    group: "General",
    items: [
      { name: "Model", value: "DC11" },
      { name: "Delivery time", value: "2-3 weeks" },
    ],
  },
  {
    group: "Engine",
    items: [{ name: "bhp", value: "404" }],
  },
  {
    group: "Specials",
    text: "convertible, leather seats",
  },
];

function init() {
  createInfoTable();
  createPriceList(19.95);
  eventListenerHandler();
  lastTab();
}

function createInfoTable() {
  document.querySelector("#general").innerHTML = SPECDT[0].group;
  document.querySelector("#engine").innerHTML = SPECDT[1].group;
  document.querySelector("#specials").innerHTML = SPECDT[2].group;

  document.querySelector(".general-tab").innerHTML = SPECDT[0].items
    .map(
      (el) =>
        `<div class="general-content">
  <div>${el.name}</div>
  <div>${el.value}</div>
  </div>`
    )
    .join("");

  document.querySelector(".engine-tab").innerHTML = SPECDT[1].items
    .map(
      (el) =>
        `<div class="engine-content">
  <div>${el.name}</div>
  <div>${el.value}</div>
  </div>`
    )
    .join("");

  document.querySelector(
    ".specials-tab"
  ).innerHTML = `<div class="specials-content">
  <div>${SPECDT[2].text}</div>
  </div>`;
}

function discount(numberOfCars, price) {
  let discount = 10;
  if(numberOfCars >= 3) {
    discount = 20;
  } 
  if (numberOfCars >=5) {
    discount = 30;
  } 
  let newPrice = (price - price * discount / 100).toFixed(2);
  
  return [newPrice, discount];
}

function createPriceList(price) {
  let numberOfCars = [1, 2, 3, 5, 8, 10];

  document.querySelector(".price-tab").innerHTML = numberOfCars
    .map(
      (el) =>
        `<div class="price-general-content">
          <div>${el}</div>
          <div>${discount(el,price)[1]}%</div>
          <div>€ ${discount(el,price)[0]}</div>
          </div>`).join("");
}


function eventListenerHandler() {
  document.querySelector(".headers").addEventListener("click", toggleView);
}

function toggleView(evt) {
  let target = evt.target;

  localStorage.setItem("lastTab", target.id);

  if (!target.classList.contains("active")) {
    target.classList.toggle("active");
    document.querySelector(`.${target.id}-tab`).classList.toggle("show");
  }

  if (target.id === "general") {
    document.querySelector("#engine").classList.remove("active");
    document.querySelector("#specials").classList.remove("active");

    document.querySelector(".engine-tab").classList.remove("show");
    document.querySelector(".specials-tab").classList.remove("show");
  }

  if (target.id === "engine") {
    document.querySelector("#general").classList.remove("active");
    document.querySelector("#specials").classList.remove("active");

    document.querySelector(".general-tab").classList.remove("show");
    document.querySelector(".specials-tab").classList.remove("show");
  }

  if (target.id === "specials") {
    document.querySelector("#engine").classList.remove("active");
    document.querySelector("#general").classList.remove("active");

    document.querySelector(".engine-tab").classList.remove("show");
    document.querySelector(".general-tab").classList.remove("show");
  }
}

function lastTab() {
  if (localStorage.lastTab) {
    document.querySelector(`#${localStorage.lastTab}`).classList.add("active");
    document
      .querySelector(`.${localStorage.lastTab}-tab`)
      .classList.add("show");
  } else {
    initTab();
  }
}

function initTab() {
  document.querySelector("#general").classList.add("active");
  document.querySelector(".general-tab").classList.add("show");
}

init();
