import productData from "./productData.js";
import { renderProductData } from "./render_content.js";
import { cart_product, checkoutButton } from "./templates.js";
import {
  addClass,
  include_to_DOM,
  removeClass,
  selectElement,
} from "./utils.js";

let initial_value = 0;
let userProducts = [];

const getFromLocalstorage = () => localStorage.getItem("userProducts");

const getLastIndexLocalStorage = () =>
  getFromLocalstorage() === null
    ? 1
    : JSON.parse(getFromLocalstorage()).length + 1;
//show number of products to add
const productQuantity = (value) =>
  include_to_DOM(selectElement(".quantity-value"), value);

function renderCartProducts() {
  if (getFromLocalstorage() === null) {
    include_to_DOM(selectElement(".cart-body"), "Your cart is empty");
  } else {
    const products = JSON.parse(getFromLocalstorage());
    let content = products.map((product) => cart_product(product)).join("");
    include_to_DOM(
      selectElement(".cart-body"),
      content.concat(checkoutButton())
    );
  }
}

const filterUserProduct = (id) => productData.filter((product) => product.id === id)[0];


const saveInLocalStorage = (data) =>
  localStorage.setItem("userProducts", JSON.stringify(data));

function showShoppingCartBadge(value) {
  const shoppingCartBadge = selectElement(".shopping-cart-badge");
  if (value) {
    include_to_DOM(shoppingCartBadge, value);
    addClass({ element: shoppingCartBadge, class_name: "show" });
  } else {
    include_to_DOM(shoppingCartBadge, "");
    removeClass({ element: shoppingCartBadge, class_name: "show" });
  }
}

function incrementProduct() {
  initial_value += 1;
  productQuantity(initial_value);
  selectElement(".buy-product-btn").removeAttribute("disabled");
}

function decrementProduct() {
  initial_value -= 1;
  if (initial_value < 1) {
    initial_value = 0;
    selectElement(".buy-product-btn").disabled = true;
  } else {
    selectElement(".buy-product-btn").removeAttribute("disabled");
  }
  productQuantity(initial_value);
}

const getUserProductsLocalStorage = () =>
  getFromLocalstorage() === null
    ? 0
    : JSON.parse(getFromLocalstorage())
        .map((product) => product.quantity)
        .reduce((acc, currVal) => acc + currVal, 0);

function createNewUserProduct(id, initial_value) {
  const product = filterUserProduct(id);
  const newId = getLastIndexLocalStorage();
  return {
    id: newId,
    imgUrlThumb: product.images[0].thumbnail,
    product_title: product.product_title,
    price_discount: product.price_discount,
    quantity: initial_value,
  };
}

function addProduct(id) {
  getFromLocalstorage() === null
    ? userProducts.push(createNewUserProduct(id, initial_value))
    : userProducts.push(
        ...JSON.parse(getFromLocalstorage()),
        createNewUserProduct(id, initial_value)
      );

  let content = userProducts.map((product) => cart_product(product)).join("");
  include_to_DOM(selectElement(".cart-body"), content.concat(checkoutButton()));
  showShoppingCartBadge(initial_value + getUserProductsLocalStorage());
  saveInLocalStorage(userProducts);
  productQuantity(0);
  selectElement(".buy-product-btn").disabled = true;
  initial_value = 0;
  userProducts = [];
}

function deleteProduct(e) {
  let userProducts = JSON.parse(getFromLocalstorage());
  userProducts.forEach((product, index) => {
    if (product.id === Number.parseInt(e.target.dataset.id)) {
      userProducts.splice(index, 1);
    }
  });
  userProducts.length === 0
    ? localStorage.removeItem("userProducts")
    : saveInLocalStorage(userProducts);

  showShoppingCartBadge(getUserProductsLocalStorage());
  renderCartProducts();
}

export {
  getFromLocalstorage,
  getUserProductsLocalStorage,
  incrementProduct,
  decrementProduct,
  showShoppingCartBadge,
  renderCartProducts,
  addProduct,
  deleteProduct,
};
