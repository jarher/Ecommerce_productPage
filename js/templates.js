const product_template = ({
  company_title,
  product_title,
  product_description,
  price_discount,
  discount_value,
  initial_price,
}, quantity) =>
  `
<div class="product-info">
          <span class="company-title">${company_title}</span>
          <h2 class="product-title">${product_title}</h2>
          <p class="product-description">${product_description}</p>
        </div>
        <div class="purchase-details">
          <div class="price-details">
<div class="left">
              <div class="price-discount">$${price_discount}</div>
              <span class="discount-value">${discount_value}%</span>
            </div>
            <div class="right">
              <span class="initial-price">$${initial_price}</span>
            </div>
          </div>
          <div class="quantity">
            <div class="quantity-content">
              <span class="quantity-minus"></span>
              <span class="quantity-value">${quantity}</span>
              <span class="quantity-plus"></span>
            </div>

            <button class="buy-product-btn" disabled>
              <svg width="22" height="20" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M20.925 3.641H3.863L3.61.816A.896.896 0 0 0 2.717 0H.897a.896.896 0 1 0 0 1.792h1l1.031 11.483c.073.828.52 1.726 1.291 2.336C2.83 17.385 4.099 20 6.359 20c1.875 0 3.197-1.87 2.554-3.642h4.905c-.642 1.77.677 3.642 2.555 3.642a2.72 2.72 0 0 0 2.717-2.717 2.72 2.72 0 0 0-2.717-2.717H6.365c-.681 0-1.274-.41-1.53-1.009l14.321-.842a.896.896 0 0 0 .817-.677l1.821-7.283a.897.897 0 0 0-.87-1.114ZM6.358 18.208a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm10.015 0a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm2.021-7.243-13.8.81-.57-6.341h15.753l-1.383 5.53Z"
                  fill="white" fill-rule="nonzero" />
              </svg>
              <span>Add to cart</span>
            </button>
          </div>
        </div>
`;

const slider_thumbnails = (images, data_type) => images.map((element, index) => img_thumbnail(index, element.thumbnail, data_type)).join("");

const slider_imgs = (images) => images.map(element => img(element.img)).join("");

const img_thumbnail = (index, imgUrl, data_type) => `
<div class="thumb-cont" data-index="${index}" id="thumb-img-${index + 1}" data-type="${data_type}">
  ${img(imgUrl)}
</div>
`;

const img = (imgUrl) => `<img src="${imgUrl}">`;

const total = (price_discount, price_quantity) => price_discount * price_quantity;

const cart_product = ({
  id,
  imgUrlThumb,
  product_title,
  price_discount,
  quantity,
}) => `
<div class="cart-product">
  <img src="${imgUrlThumb}" alt="" class="cart-img-product">
  <div class="cart-product-description">
    ${product_title} $${price_discount} x ${quantity}
  <span class="cart-total">$${total(price_discount, quantity)}</span>
  </div>
  <span class="cart-delete" data-id="${id}"></span>
</div>
`;

const checkoutButton = () =>
  `<button class="cart-checkout-btn">Checkout</button>`;


export {
  product_template,
  slider_thumbnails,
  cart_product,
  checkoutButton,
  slider_imgs
}