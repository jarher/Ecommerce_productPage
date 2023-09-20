import productData from "../productData.js";
import {
  addClass,
  include_to_DOM,
  removeClass,
  selectElement,
  selectManyElement,
  selectMany_in_container,
} from "./utils.js";

let i = 0;
let initial_x_position = 100;
let current_x_position;

const imgs = (type) =>
  type === "section-slider"
    ? Array.from(selectManyElement(".img-lightbox"))
    : Array.from(
        selectManyElement(".modal-slider-content .slider-img-container img")
      );

const thumbnails_container = Array.from(
  selectManyElement(".slider-thumbnails")
);

const moveSlider = (index, value) =>
  (Array.from(selectManyElement(".slider-img-container"))[
    index
  ].style.transform = `translateX(-${value}%)`);

const imgContainer = (url) => `<img src="${url}" class="img-lightbox">`;

const render_imgs_mobile = () =>
  productData[0].images.map((elem) => imgContainer(elem.img)).join("");

const render_first_img = () => imgContainer(productData[0].images[0].img, 0);

function render_images() {
  const container = selectElement(".product .slider .slider-img-container");

  if (window.matchMedia("(max-width: 1024px)").matches) {
    include_to_DOM(container, render_imgs_mobile());
  } else {
    include_to_DOM(container, render_first_img());
    moveSlider(1, 0);
  }
}

function thumbnails_effect(thumbnails_container, thumbnail_index) {
  const thumbnails = selectMany_in_container(
    thumbnails_container,
    ".thumb-cont"
  );
  thumbnails.forEach((thumb) => {
    if (Number.parseInt(thumb.dataset.index) !== thumbnail_index) {
      removeClass({ element: thumb, class_name: "thumbnail-active" });
      removeClass({ element: thumb.children[0], class_name: "img-opaque" });
    } else {
      addClass({ element: thumb, class_name: "thumbnail-active" });
      addClass({ element: thumb.children[0], class_name: "img-opaque" });
    }
  });
}

function sliderMovePrev(type) {
  i -= 1;
  const array_index = type === "modal-slider" ? 0 : 1;

  if (current_x_position) {
    current_x_position = current_x_position - initial_x_position;
    moveSlider(array_index, current_x_position);
  } else {
    if (i < 0) {
      i = productData[0].images.length - 1;
      moveSlider(array_index, initial_x_position * i);
      current_x_position = initial_x_position * i;
    }
  }
  thumbnails_effect(thumbnails_container[0], i);
}

function sliderMoveNext(type) {
  const array_index = type === "modal-slider" ? 0 : 1;
  i += 1;
  if (i >= imgs(type).length) {
    i = 0;
  }
  moveSlider(array_index, initial_x_position * i);
  current_x_position = initial_x_position * i;
  thumbnails_effect(thumbnails_container[0], i);
}

function closeSliderModal() {
  const modal_slider = selectElement(".modal-slider");
  const modal_slider_content = selectElement(".modal-slider-content");

  removeClass({ element: modal_slider, class_name: "background-opaque" });
  addClass({ element: modal_slider_content, class_name: "opacity-0" });
  setTimeout(
    () => removeClass({ element: modal_slider, class_name: "show" }),
    300
  );
}

function pickup_img(thumbnail_index, type) {
  let container;

  if (type === "thumb-modal") {
    moveSlider(0, initial_x_position * thumbnail_index);
    current_x_position = initial_x_position * thumbnail_index;
    thumbnails_effect(thumbnails_container[0], thumbnail_index);
  } else {
    container = selectElement(".product .slider-img-container");
    include_to_DOM(
      container,
      imgContainer(productData[0].images[thumbnail_index].img, thumbnail_index)
    );
    thumbnails_effect(thumbnails_container[1], thumbnail_index);
  }
  i = thumbnail_index;
}

function img_lightbox_clicked() {
  if (window.matchMedia("(max-width: 1024px)").matches) {
    Array.from(selectManyElement(".slider-img-container img")).forEach((img) =>
      img.addEventListener("click", closeSliderModal())
    );
  } else {
    const modal_slider = selectElement(".modal-slider");
    const modal_slider_content = selectElement(
      ".modal-slider .modal-slider-content"
    );

    const modal_slider_display = {
      element: modal_slider,
      class_name: "show",
    };
    const modal_slider_background = {
      element: modal_slider,
      class_name: "background-opaque",
    };
    const modal_slider_content_opacity = {
      element: modal_slider_content,
      class_name: "opacity-0",
    };

    addClass(modal_slider_display);
    setTimeout(() => {
      addClass(modal_slider_background);
      removeClass(modal_slider_content_opacity);
    }, 300);
  }
}

window.addEventListener("resize", () => {
  render_images();
  if (window.matchMedia("(max-width: 1024px)").matches) {
    removeClass({
      element: selectElement(".modal-slider"),
      class_name: "show",
    });
  }
});

window.addEventListener("DOMContentLoaded", () => render_images());

export {
  sliderMoveNext,
  sliderMovePrev,
  closeSliderModal,
  pickup_img,
  img_lightbox_clicked,
};
