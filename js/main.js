import {
  addProduct,
  decrementProduct,
  deleteProduct,
  incrementProduct,
} from "./addProduct.js";
import { hideMenu, showMenu } from "./menu.js";
import {
  sliderMoveNext,
  sliderMovePrev,
  closeSliderModal,
  pickup_img,
  img_lightbox_clicked,
} from "./slider.js";
import { removeClass, selectElement, toggleClass } from "./utils.js";
import { renderContent } from "./render_content.js";

document.addEventListener("click", (e) => {
  if (e.target.className === "menu-btn") {
    showMenu();
  }
  if (e.target.className === "close-menu") {
    hideMenu();
  }
  if (e.target.className === "next-icon" || e.target.className === "next-img") {
    sliderMoveNext(e.target.dataset.type);
  }
  if (
    e.target.className === "previous-icon" ||
    e.target.className === "previous-img"
  ) {
    sliderMovePrev(e.target.dataset.type);
  }
  if (
    e.target.id === "close-slider-modal" ||
    e.target.id === "cls-slider-modal" ||
    e.target.className === "close-modal-slider"
  ) {
    closeSliderModal();
  }
  if (
    e.target.parentNode.id === "thumb-img-1" ||
    e.target.parentNode.id === "thumb-img-2" ||
    e.target.parentNode.id === "thumb-img-3" ||
    e.target.parentNode.id === "thumb-img-4"
  ) {
    pickup_img(
      Number.parseInt(e.target.parentNode.dataset.index),
      e.target.parentNode.dataset.type
    );
  }
  if (e.target.className === "img-lightbox") {
    img_lightbox_clicked();
  }
  if (e.target.className === "quantity-minus") {
    decrementProduct();
  }
  if (e.target.className === "quantity-plus") {
    incrementProduct();
  }
  if (e.target.className === "shopping-cart") {
    toggleClass({ element: selectElement(".cart-basket"), class_name: "show" });
  } else {
    removeClass({ element: selectElement(".cart-basket"), class_name: "show" });
  }
  if (
    e.target.className === "buy-product-btn" ||
    e.target.parentNode.className === "buy-product-btn"
  ) {
    addProduct(1);
  }
  if (e.target.className === "cart-delete") {
    deleteProduct(e);
  }
});
renderContent();
