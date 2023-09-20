const addClass = ({ element, class_name }) => element.classList.add(class_name);

const removeClass = ({ element, class_name }) =>
  element.classList.remove(class_name);

const toggleClass = ({ element, class_name }) =>
  element.classList.toggle(class_name);

const selectElement = (element) => document.querySelector(element);

const selectManyElement = (element) => document.querySelectorAll(element);

const include_to_DOM = (container, content) => (container.innerHTML = content);

const selectMany_in_container = (container, element) =>
  container.querySelectorAll(element);

export {
  addClass,
  removeClass,
  toggleClass,
  selectElement,
  selectManyElement,
  include_to_DOM,
  selectMany_in_container,
};
