const offers = [
  {
    id: 1,
    units: "1 Unit",
    discount: "10% Off",
    discountClass: "red",
    description: "Standard Price",
    price: "$10.00 USD",
    strike: "$24.00 USD",
    popular: false,
  },
  {
    id: 2,
    units: "2 Units",
    discount: "20% Off",
    discountClass: "pink",
    price: "$18.00 USD",
    strike: "$24.00 USD",
    popular: true,
  },
  {
    id: 3,
    units: "3 Units",
    discount: "30% Off",
    discountClass: "orange",
    price: "$24.00 USD",
    strike: "$24.00 USD",
    popular: false,
  },
];

const offerContainer = document.getElementById("offer-container");
const totalDisplay = document.getElementById("total");

const sizeOptions = ["S", "M", "L"];
const colorOptions = ["Black", "Blue", "Red"];

// Utility function to create a dropdown
function createSelect(options) {
  const select = document.createElement("select");
  options.forEach((opt) => {
    const option = document.createElement("option");
    option.textContent = opt;
    select.appendChild(option);
  });
  return select;
}

// Main render function
function renderOffers() {
  offers.forEach((offer, index) => {
    const offerBox = document.createElement("label");
    offerBox.classList.add("offer-box");
    if (offer.popular) offerBox.classList.add("popular");

    // Radio Input
    const input = document.createElement("input");
    input.type = "radio";
    input.name = "unit";
    input.dataset.price = offer.price;
    if (index === 0) input.checked = true;

    // Offer Content Wrapper
    const contentDiv = document.createElement("div");
    contentDiv.classList.add("offer-content");

    // Left Section
    const leftDiv = document.createElement("div");
    leftDiv.classList.add("left");

    const inputWrapper = document.createElement("div");
    inputWrapper.appendChild(input);

    const textWrapper = document.createElement("div");
    const unitSpan = document.createElement("span");
    unitSpan.classList.add("unit");
    unitSpan.textContent = offer.units;

    const discountTag = document.createElement("span");
    discountTag.classList.add("tag", offer.discountClass);
    discountTag.textContent = offer.discount;

    textWrapper.appendChild(unitSpan);
    textWrapper.appendChild(discountTag);

    if (offer.description) {
      const desc = document.createElement("p");
      desc.classList.add("content-description");
      desc.textContent = offer.description;
      textWrapper.appendChild(desc);
    }

    leftDiv.appendChild(inputWrapper);
    leftDiv.appendChild(textWrapper);

    // Right Section
    const rightDiv = document.createElement("div");
    rightDiv.classList.add("right");

    const price = document.createElement("span");
    price.classList.add("price");
    price.textContent = offer.price;

    const strike = document.createElement("span");
    strike.classList.add("strike");
    strike.textContent = offer.strike;

    rightDiv.appendChild(price);
    rightDiv.appendChild(strike);

    // Combine Left & Right
    contentDiv.appendChild(leftDiv);
    contentDiv.appendChild(rightDiv);
    offerBox.appendChild(contentDiv);

    // Size/Color Section
    const sizesDiv = document.createElement("div");
    sizesDiv.classList.add("sizes");

    const labelRow = document.createElement("div");
    labelRow.classList.add("lable-row");

    const sizeLabel = document.createElement("span");
    sizeLabel.classList.add("size-label");
    sizeLabel.textContent = "Size";

    const colorLabel = document.createElement("span");
    colorLabel.classList.add("size-label");
    colorLabel.textContent = "Color";

    labelRow.appendChild(sizeLabel);
    labelRow.appendChild(colorLabel);
    sizesDiv.appendChild(labelRow);

    // Two rows for item options
    for (let i = 1; i <= 2; i++) {
      const row = document.createElement("div");
      row.classList.add("row");

      const indexLabel = document.createElement("span");
      indexLabel.textContent = `#${i}`;

      row.appendChild(indexLabel);
      row.appendChild(createSelect(sizeOptions));
      row.appendChild(createSelect(colorOptions));

      sizesDiv.appendChild(row);
    }

    offerBox.appendChild(sizesDiv);

    // Most Popular Badge
    if (offer.popular) {
      const badge = document.createElement("span");
      badge.classList.add("popular-badge");
      badge.textContent = "MOST POPULAR";
      offerBox.appendChild(badge);
    }

    offerContainer.appendChild(offerBox);
  });
}

// Initialize
renderOffers();

// Event: handle offer selection
offerContainer.addEventListener("change", (e) => {
  if (e.target.type === "radio") {
    totalDisplay.textContent = e.target.dataset.price;

    document
      .querySelectorAll(".offer-box")
      .forEach((box) => box.classList.remove("expanded"));

    const parentBox = e.target.closest(".offer-box");
    parentBox.classList.add("expanded");
  }
});

// Expand first card by default
document.querySelector(".offer-box")?.classList.add("expanded");
