import {
  getFromLocalstorage,
  getUserProductsLocalStorage,
  renderCartProducts,
  showShoppingCartBadge,
} from "./addProduct.js";
import productData from "./productData.js";
import {
  product_template,
  slider_imgs,
  slider_thumbnails,
} from "./templates.js";
import { include_to_DOM, selectElement } from "./utils.js";

const renderModalThumbnails = () =>
  include_to_DOM(
    selectElement(".modal-slider-content .slider .slider-thumbnails"),
    slider_thumbnails(productData[0].images, "thumb-modal")
  );

const renderModalImg = () =>
  include_to_DOM(
    selectElement(
      ".modal-slider-content .slider .slider-wrapper .slider-img-container"
    ),
    slider_imgs(productData[0].images)
  );

const renderSliderImgProduct = () =>
  include_to_DOM(
    selectElement(".product .slider .slider-wrapper .slider-img-container"),
    slider_imgs(productData[0].images)
  );

const renderSliderThumbnailsProduct = () =>
  include_to_DOM(
    selectElement(".product .slider .slider-thumbnails"),
    slider_thumbnails(productData[0].images, "thumb-section")
  );

function renderProductData(id) {
  const product = productData.filter((product) => product.id === id)[0];

  include_to_DOM(
    selectElement(".product-container"),
    product_template(product, 0)
  );
  if (getFromLocalstorage()) {
    showShoppingCartBadge(getUserProductsLocalStorage());
  }
}
function renderContent() {
  document.addEventListener("DOMContentLoaded", () => {
    renderModalImg();
    renderModalThumbnails();
    renderSliderImgProduct();
    renderSliderThumbnailsProduct();
    renderProductData(1);
    renderCartProducts();
  });
}
export { renderContent, renderProductData };
