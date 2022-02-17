/*------------------------------ Cart display management ------------------------------*/

let cart = getCart();
let cartSection = document.getElementById("cart__items");

// Create DOM elements for each item in cart
function displayCart(cart) {
  let cartHtml = new DocumentFragment();

  for (let article of cart) {
    let articleElement = createElt(
      "article",
      "cart__item",
      "",
      "data-id",
      `${article.id}`
    );
    articleElement.setAttribute("data-color", `${article.color}`);

    let div1Element = createElt("div", "cart__item__img");
    articleElement.append(div1Element);

    let imgElement = createElt("img", "", "", "src", `${article.imageUrl}`);
    imgElement.setAttribute("alt", `${article.altTxt}`);
    div1Element.append(imgElement);

    let div2Element = createElt("div", "cart__item__content");
    articleElement.append(div2Element);

    let div3Element = createElt("div", "cart__item__content__description");
    div2Element.append(div3Element);

    let h2Element = createElt("h2", "", `${article.name}`);
    div3Element.append(h2Element);

    let p1Element = createElt("p", "", `${article.color}`);
    h2Element.after(p1Element);

    let p2Element = createElt("p", "", `${article.price} €`);
    p1Element.after(p2Element);

    let div4Element = createElt("div", "cart__item__content__settings");
    div2Element.append(div4Element);

    let div5Element = createElt(
      "div",
      "cart__item__content__settings__quantity"
    );
    div4Element.append(div5Element);

    let p3Element = createElt("p", "", "Qté : ");
    div5Element.append(p3Element);

    let inputElement = createElt("input", "itemQuantity");
    inputElement.setAttribute("type", "number");
    inputElement.setAttribute("name", "itemQuantity");
    inputElement.setAttribute("min", "1");
    inputElement.setAttribute("max", "100");
    inputElement.setAttribute("value", `${article.quantity}`);
    inputElement.setAttribute("oninput", "validity.valid||(value='');");
    div5Element.append(inputElement);

    let div6Element = createElt("div", "cart__item__content__settings__delete");
    div4Element.append(div6Element);

    let p4Element = createElt("p", "deleteItem", "Supprimer");
    div6Element.append(p4Element);

    cartHtml.append(articleElement);
  }

  cartSection.append(cartHtml);
}
displayCart(cart);

// Display the computed total quantity of items in the cart
function displayTotalQuantity() {
  document.getElementById(
    "totalQuantity"
  ).innerText = `${computeTotalQuantity()}`;
}
displayTotalQuantity();

// Display the computed total price of the items in the cart
function displayTotalPrice() {
  document.getElementById("totalPrice").innerText = `${computeTotalPrice()}`;
}
displayTotalPrice();

/*------------------------------ Cart modification management ------------------------------*/

// On delete button click event : remove related article from page and cart
function removeCartArticle() {
  let removeButtonsCollection = document.getElementsByClassName("deleteItem");
  let removeButtonsArray = Array.from(removeButtonsCollection);

  removeButtonsArray.forEach(function (button) {
    button.addEventListener("click", function (event) {
      event.stopPropagation();
      let closestArticle = button.closest("article");
      removeArticle(closestArticle.dataset.id, closestArticle.dataset.color);
      displayTotalQuantity();
      displayTotalPrice();
      cartSection.removeChild(closestArticle);
    });
  });
}
removeCartArticle();

// On item quantity change event: update article quantity in cart
function updateCartInfos() {
  let quantityInputsCollection =
    document.getElementsByClassName("itemQuantity");
  let quantityInputsArray = Array.from(quantityInputsCollection);

  quantityInputsArray.forEach(function (quantityInput) {
    quantityInput.addEventListener("change", function (event) {
      event.stopPropagation();
      let closestArticle = quantityInput.closest("article");
      setArticleQuantity(
        closestArticle.dataset.id,
        closestArticle.dataset.color,
        event.target.value
      );
      displayTotalQuantity();
      displayTotalPrice();
    });
  });
}
updateCartInfos();

/*------------------------------ Contact form management and validation ------------------------------*/

// Getting all contact input elements
const firstNameElt = document.getElementById("firstName");
const lastNameElt = document.getElementById("lastName");
const addressElt = document.getElementById("address");
const cityElt = document.getElementById("city");
const emailElt = document.getElementById("email");

// Fill Input object with DOM element, value and clean label
function getInputInfo(inputElt) {
  const inputValue = inputElt.value;
  const inputLabelRaw = inputElt.previousElementSibling.innerText;
  const inputLabel = inputLabelRaw.split(':')[0].toLowerCase();

  let input = new Input(inputElt, inputValue, inputLabel, '');
  return input;
}

/**
 * Apply regex validation
 * @param { string } data
 * @param { reg } regex
 * @returns { boolean }
 */
function regexValidation(data, regex) {
  return regex.test(data);
}

/**
 * Display error message depending on which input is incorrect
 * @param { Element } inputElt
 * @param { String } inputLabel 
 */
function printErrorMessage(inputElt, inputLabel) {
  const inputErrorMsg = inputElt.nextElementSibling;
  inputErrorMsg.innerText = `Veuillez renseigner un(e) ${inputLabel} valide`;
}

let submitErrorMsg = document.getElementById("submitErrorMsg");

// Erase error when user change or click on input
function eraseErrors() {
  const formInputs = document.querySelectorAll(
    ".cart__order__form__question > input"
  );

  formInputs.forEach((input) => {
    input.addEventListener("click", function () {
      clearMessage(input.nextElementSibling);
      clearMessage(submitErrorMsg);
    });
    input.addEventListener("input", function () {
      clearMessage(input.nextElementSibling);
      clearMessage(submitErrorMsg);
    });
  });
}
eraseErrors();

// Check all contact form inputs and display error message if not valid
function validateContactData() {
  let namePattern = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
  let addressPattern = /^[^_!¡?÷?¿\/\+=@#$%ˆ^&*(){}|~<>;:[\]]{5,}$/;
  let emailPattern = /^[\w\.-]+@[\w\.-]+\.\w{2,4}$/;

  const firstName = getInputInfo(firstNameElt);
  const lastName = getInputInfo(lastNameElt);
  const address = getInputInfo(addressElt);
  const city = getInputInfo(cityElt);
  const email = getInputInfo(emailElt);

  firstName.pattern = namePattern;
  lastName.pattern = namePattern;
  city.pattern = namePattern;
  address.pattern = addressPattern;
  email.pattern = emailPattern;
  
  const inputs = [firstName, lastName, address, city, email];

  let contactValid = true;

  for (let input of inputs) {
    let inputIsValid = regexValidation(input.value, input.pattern);
    if (!inputIsValid) {
      printErrorMessage(input.element, input.label);
      contactValid = false;
    }
  }
  return contactValid;
}

// Validate cart if not empty
function validateCart(cart) {
  if (cart.products.length == 0) {
    return false;
  }
  return true;
}

/*------------------------------ Cart submission ------------------------------*/

// Fill order object from input and cart
function fillOrderData() {
  let orderInfo = new Order();
  let contact = new Contact();

  contact.firstName = firstNameElt.value;
  contact.lastName = lastNameElt.value;
  contact.address = addressElt.value;
  contact.city = cityElt.value;
  contact.email = emailElt.value;

  orderInfo.contact = contact;
  orderInfo.products = getIds();

  return orderInfo;
}

/**
 * Return order ID from API object
 * @param { object } value
 * @returns { string } order ID
 */
function getOrderId(value) {
  return value.orderId;
}

/**
 * Open confirmation page corresponding to given order ID
 * @param { string } orderId
 */
function redirect(orderId) {
  document.location = `./confirmation.html?orderId=${orderId}`;
}

/**
 * Send POST request to API and retrieve data to open confirmation page
 * @param { Order } order
 */
function sendOrder(order) {
  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  })
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (data) {
      let id = getOrderId(data);
      return id;
    })
    .then(function (id) {
      redirect(id);
    })
    .catch(function (err) {
      console.log(err);
    });
}

/*
  On click event check order validity
  If the order is valid, it is sent
  If the order is not valid, display error message
*/
function submitOnClick() {
  let submit = document.getElementById("order");
  submit.addEventListener("click", function (e) {
    e.preventDefault();
    let order = fillOrderData();
    let contactIsValid = validateContactData();
    let cartIsValid = validateCart(order);
    if (contactIsValid && cartIsValid) {
      sendOrder(order);
    } else if (cartIsValid == false) {
      submitErrorMsg.innerText = "Votre panier est vide";
    }
  });
}
submitOnClick();
