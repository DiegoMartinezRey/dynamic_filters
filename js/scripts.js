const listItemsElement = document.getElementById("list-items");

const filterElement = document.getElementById("filter");
const sugarlessFilterElement = document.getElementById("sugarless-filter");
const orderOptionElement = document.getElementById("order-option");

const products = [
  {
    id: "id-waffle",
    name: "Waffle with Berries",
    price: 6.5,
    quantity: 0,
    img: "/assets/images/image-waffle.jpg",
    sugarless: true,
  },
  {
    id: "id-creme",
    name: "Vanilla Bean Crème Brûlée",
    price: 7.0,
    quantity: 0,
    img: "/assets/images/image-creme-brulee.jpg",
    sugarless: false,
  },
  {
    id: "id-macaron",
    name: "Macaron Mix of Five",
    price: 8.0,
    quantity: 0,
    img: "/assets/images/image-macaron.jpg",
    sugarless: false,
  },
  {
    id: "id-tiramisu",
    name: "Classic Tiramisu",
    price: 5.5,
    quantity: 0,
    img: "/assets/images/image-tiramisu.jpg",
    sugarless: false,
  },
  {
    id: "id-baklava",
    name: "Pistachio Baklava",
    price: 4.0,
    quantity: 0,
    img: "/assets/images/image-baklava.jpg",
    sugarless: false,
  },
  {
    id: "id-pie",
    name: "Lemon Meringue Pie",
    price: 5,
    quantity: 0,
    img: "/assets/images/image-meringue.jpg",
    sugarless: false,
  },
  {
    id: "id-cake",
    name: "Red Velvet Cake",
    price: 4.5,
    quantity: 0,
    img: "/assets/images/image-cake.jpg",
    sugarless: false,
  },
  {
    id: "id-brownie",
    name: "Salted Caramel Brownie",
    price: 5.5,
    quantity: 0,
    img: "/assets/images/image-brownie.jpg",
    sugarless: false,
  },
  {
    id: "id-cotta",
    name: "Vanilla Panna Cotta",
    price: 6.5,
    quantity: 0,
    img: "/assets/images/image-panna-cotta.jpg",
    sugarless: false,
  },
];

const createItems = (products) => {
  const fragment = document.createDocumentFragment();
  products.forEach((product) => {
    const newItem = document.createElement("li");
    newItem.classList.add("item");

    const imgElement = document.createElement("img");
    imgElement.classList.add("image");
    imgElement.src = product.img;
    imgElement.alt = product.name;

    const textDiv = document.createElement("div");
    textDiv.classList.add("text-product");

    const nameElement = document.createElement("h2");
    nameElement.textContent = product.name;

    const sugarlessElement = document.createElement("p");
    sugarlessElement.textContent = product.sugarless ? "sugarless" : "";

    const priceElement = document.createElement("p");
    priceElement.textContent = `$${product.price.toFixed(2)}`;

    textDiv.appendChild(nameElement);
    textDiv.appendChild(sugarlessElement);
    newItem.appendChild(imgElement);
    newItem.appendChild(textDiv);
    newItem.appendChild(priceElement);

    listItemsElement.textContent = "";

    fragment.appendChild(newItem);
  });

  listItemsElement.append(fragment);
};

createItems(products);

const getFilterItems = (e) => {
  const nameFilter = e.target.value.toLowerCase();
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(nameFilter)
  );

  sugarlessFilterElement.checked = false;
  orderOptionElement.value = "default";
  createItems(filteredProducts);
};

const sugarlessFilter = (e) => {
  const sugarFilter = e.target.checked;
  const filteredProducts = products.filter((product) => {
    if (sugarFilter) {
      return product.sugarless === true;
    }
    return product;
  });

  filterElement.value = "";
  orderOptionElement.value = "default";
  createItems(filteredProducts);
};

const orderProducts = (e) => {
  const option = e.target.value;
  let orderItems = [...products];
  if (option === "name" || option === "price") {
    orderItems = orderItems.sort((a, b) => {
      if (option === "name") {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      } else {
        return a[option] - b[option];
      }
    });
  }

  filterElement.value = "";
  sugarlessFilterElement.checked = false;
  createItems(orderItems);
};

filterElement.addEventListener("input", getFilterItems);
sugarlessFilterElement.addEventListener("change", sugarlessFilter);
orderOptionElement.addEventListener("change", orderProducts);
