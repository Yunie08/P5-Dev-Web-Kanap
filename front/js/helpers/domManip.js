/**
 * Create a customized DOM element 
 * @param {String} type 
 * @param {String} className 
 * @param {String} innerText 
 * @param {String} attributeName 
 * @param {String} attributeValue 
 * @returns { DOMElement } element
 */
function createElt(type,className,innerText,attributeName,attributeValue) {
  let element = document.createElement(type);
  if ((className !== undefined) && (className !== "")) {
    element.classList.add(`${className}`);
  }
  if ((innerText !== undefined) && (innerText !== "")) {
    element.innerText = innerText;
  }
  if ((attributeName !== undefined) && (attributeName !== "")) {
    element.setAttribute(attributeName,attributeValue);
  }
  return element;
}

/**
 * Erase element text
 * @param { DOMElement } element 
 */
function clearMessage(element) {
  element.innerText = "";
}
