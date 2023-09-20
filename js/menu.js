import { addClass, removeClass, selectElement } from "./utils.js";

const menu_mobile = selectElement(".menu-mobile");

const mobile = {
  element: menu_mobile,
  class_name: "show",
};

const mobile_bckColor = {
  element: menu_mobile,
  class_name: "background-opaque",
};

const mobile_container = {
  element: selectElement(".menu-mobile .container"),
  class_name: "menu-container-move",
};

function showMenu() {
  addClass(mobile);
  setTimeout(() => addClass(mobile_bckColor), 100);
  setTimeout(() => addClass(mobile_container), 400);
}

function hideMenu() {
  removeClass(mobile_container);
  setTimeout(() => removeClass(mobile_bckColor), 200);
  setTimeout(() => removeClass(mobile), 400);
}

export { showMenu, hideMenu };
