let cart = getCart();
let cartHtml = new DocumentFragment();
let cartSection = document.getElementById("cart__items");

/**
 * Create DOM elements for each item in cart
 */
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

  let div5Element = createElt("div", "cart__item__content__settings__quantity");
  div4Element.append(div5Element);

  let p3Element = createElt("p", "", "Qté : ");
  div5Element.append(p3Element);

  let inputElement = createElt("input", "itemQuantity");
  inputElement.setAttribute("type", "number");
  inputElement.setAttribute("name", "itemQuantity");
  inputElement.setAttribute("min", "1");
  inputElement.setAttribute("max", "100");
  inputElement.setAttribute("value", `${article.quantity}`);
  div5Element.append(inputElement);

  let div6Element = createElt("div", "cart__item__content__settings__delete");
  div4Element.append(div6Element);

  let p4Element = createElt("p", "deleteItem", "Supprimer");
  div6Element.append(p4Element);

  cartHtml.append(articleElement);
}

/**
 * Insert created articles in HTML
 */
cartSection.append(cartHtml);

function setTotalQuantity() {
  document.getElementById(
    "totalQuantity"
  ).innerText = `${computeTotalQuantity()}`;
}

function setTotalPrice() {
  document.getElementById("totalPrice").innerText = `${computeTotalPrice()}`;
}

setTotalQuantity();
setTotalPrice();

/**
 * Listen to click event on any ".deleteItem" button
 * On click : remove related article from page and cart
 */
let removeButtonsCollection = document.getElementsByClassName("deleteItem");
let removeButtonsArray = Array.from(removeButtonsCollection);

removeButtonsArray.forEach(function (button) {
  button.addEventListener("click", function (event) {
    event.stopPropagation();
    let closestArticle = button.closest("article");
    removeArticle(closestArticle.dataset.id, closestArticle.dataset.color);
    setTotalQuantity();
    setTotalPrice();
    cartSection.removeChild(closestArticle);
  });
});

/**
 * Listen to change event on any "itemQuantity" input
 * On change: update article quantity in cart
 */
let quantityInputsCollection = document.getElementsByClassName("itemQuantity");
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
    setTotalQuantity();
    setTotalPrice();
  });
});

/*************** Contact Form Management ***************/
// Getting all contact input elements
const firstname = document.getElementById("firstName");
const lastname = document.getElementById("lastName");
const address = document.getElementById("address");
const city = document.getElementById("city");
const email = document.getElementById("email");

// Getting all error message elements
const firstnameErrorMsg = document.getElementById("firstNameErrorMsg");
const lastnameErrorMsg = document.getElementById("lastNameErrorMsg");
const addressErrorMsg = document.getElementById("addressErrorMsg");
const cityErrorMsg = document.getElementById("cityErrorMsg");
const emailErrorMsg = document.getElementById("emailErrorMsg");

/**
 * Apply REGEX validation
 */
function regexValidation(data, regex) {
  return regex.test(data);
}

/**
 * Display error message depending on which input not correct
 * @param { string } input name in french
 */
function printErrorMessage(dataLabel) {
  let errorMessageM = `Veuillez renseigner un ${dataLabel} valide`;
  let errorMessageF = `Veuillez renseigner une ${dataLabel} valide`;

  if (dataLabel == "prénom") {
    firstnameErrorMsg.innerText = errorMessageM;
    return;
  } else if (dataLabel == "nom") {
    lastnameErrorMsg.innerText = errorMessageM;
    return;
  } else if (dataLabel == "adresse") {
    addressErrorMsg.innerText = errorMessageF;
    return;
  } else if (dataLabel == "ville") {
    cityErrorMsg.innerText = errorMessageF;
    return;
  } else if (dataLabel == "adresse email") {
    emailErrorMsg.innerText = errorMessageF;
    return;
  }
}

/**
 * Check all contact form inputs
 * If any input is incorrect : display error message and return false
 * Else return true
 */
function validateContactData() {
  let namePattern = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
  let addressPattern = /^[^_!¡?÷?¿\/\+=@#$%ˆ^&*(){}|~<>;:[\]]{5,}$/;
  let emailPattern = /^[\w\.-]+@[\w\.-]+\.\w{2,4}$/;

  let contactValid = true;

  let firstnameIsValid = regexValidation(firstname.value, namePattern);
  if (firstnameIsValid == false) {
    printErrorMessage("prénom");
    contactValid = false;
  }
  let lastnameIsValid = regexValidation(lastname.value, namePattern);
  if (lastnameIsValid == false) {
    printErrorMessage("nom");
    contactValid = false;
  }
  let addressIsValid = regexValidation(address.value, addressPattern);
  if (addressIsValid == false) {
    printErrorMessage("adresse");
    contactValid = false;
  }
  let cityIsValid = regexValidation(city.value, namePattern);
  if (cityIsValid == false) {
    printErrorMessage("ville");
    contactValid = false;
  }
  let emailIsValid = regexValidation(email.value, emailPattern);
  if (emailIsValid == false) {
    printErrorMessage("adresse email");
    contactValid = false;
  }
  return contactValid;
}

function validateCart(cart) {
  if (cart.products.length == 0) {
    return false;
  }
  return true;
}

let submit = document.getElementById("order");

function fillOrderData() {
  let orderInfo = new Order();
  let contact = new Contact();

  contact.firstName = firstname.value;
  contact.lastName = lastname.value;
  contact.address = address.value;
  contact.city = city.value;
  contact.email = email.value;

  orderInfo.contact = contact;
  orderInfo.products = getIds();

  return orderInfo;
}

function getOrderId(value) {
  return value.orderId;
}

function redirect(id) {
  document.location = `./confirmation.html?orderId=${id}`;
}

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

let submitErrorMsg = document.getElementById("submitErrorMsg");

submit.addEventListener("click", function (e) {
  e.preventDefault();
  let order = fillOrderData();
  console.log(order);
  let contactIsValid = validateContactData();
  let cartIsValid = validateCart(order);
  if (contactIsValid && cartIsValid) {
    sendOrder(order);
  } else if (cartIsValid == false) {
    submitErrorMsg.innerText = "Votre panier est vide";
  }
});

/*************** Erasing error messages ***************/
function clearMessage(element) {
  element.innerText = "";
}

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
