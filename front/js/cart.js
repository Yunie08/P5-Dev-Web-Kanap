
let cart = getCart();
let cartHtml = new DocumentFragment;
let cartSection = document.getElementById("cart__items");

/**
 * Create DOM elements for each item in cart
 */
for (let article of cart) {

  let articleElement = document.createElement("article");
  articleElement.classList.add("cart__item");
  articleElement.setAttribute("data-id", `${article.id}`);
  articleElement.setAttribute("data-color", `${article.color}`);
  
  let div1Element = document.createElement("div");
  div1Element.classList.add("cart__item__img");
  articleElement.append(div1Element);

  let imgElement = document.createElement("img");
  imgElement.setAttribute("src", `${article.imageUrl}`);
  imgElement.setAttribute("alt", `${article.altTxt}`);
  div1Element.append(imgElement);

  let div2Element = document.createElement("div");
  div2Element.classList.add("cart__item__content");
  articleElement.append(div2Element);

  let div3Element = document.createElement("div");
  div3Element.classList.add("cart__item__content__description");
  div2Element.append(div3Element);

  let h2Element = document.createElement("h2");
  h2Element.innerText = `${article.name}`;
  div3Element.append(h2Element);

  let p1Element = document.createElement("p");
  p1Element.innerText = `${article.color}`;
  h2Element.after(p1Element);

  let p2Element = document.createElement("p");
  p2Element.innerText = `${article.price} €`;
  p1Element.after(p2Element);

  let div4Element = document.createElement("div");
  div4Element.classList.add("cart__item__content__settings");
  div2Element.append(div4Element);

  let div5Element = document.createElement("div");
  div5Element.classList.add("cart__item__content__settings__quantity");
  div4Element.append(div5Element);

  let p3Element = document.createElement("p");
  p3Element.innerText = "Qté : ";
  div5Element.append(p3Element);

  let inputElement = document.createElement("input");
  inputElement.classList.add("itemQuantity");
  inputElement.setAttribute("type", "number");
  inputElement.setAttribute("name", "itemQuantity");
  inputElement.setAttribute("min", "1");
  inputElement.setAttribute("max", "100");
  inputElement.setAttribute("value", `${article.quantity}`);
  div5Element.append(inputElement);

  let div6Element = document.createElement("div");
  div6Element.classList.add("cart__item__content__settings__delete");
  div4Element.append(div6Element);
  
  let p4Element = document.createElement("p");
  p4Element.classList.add("deleteItem");
  p4Element.innerText = "Supprimer";
  div6Element.append(p4Element);

  cartHtml.append(articleElement);
}

/**
 * Insert created articles in HTML
 */
cartSection.append(cartHtml);

function setTotalQuantity(){
  document
    .getElementById("totalQuantity")
    .innerText =  `${computeTotalQuantity()}`;
}

function setTotalPrice(){
  document
    .getElementById("totalPrice")
    .innerText =  `${computeTotalPrice()}`;
}

setTotalQuantity();
setTotalPrice();

/**
 * Listen to click event on any ".deleteItem" button
 * On click : remove related article from page and cart
 */
let removeButtonsCollection = document.getElementsByClassName("deleteItem");
let removeButtonsArray = Array.from(removeButtonsCollection);

removeButtonsArray.forEach(function(button) {
  button.addEventListener('click', function(event){
    event.stopPropagation();
    let closestArticle = button.closest("article");
    removeArticle(closestArticle.dataset.id,closestArticle.dataset.color);
    setTotalQuantity();
    setTotalPrice();
    cartSection.removeChild(closestArticle);
  })
});


/**
 * Listen to change event on any "itemQuantity" input
 * On change: update article quantity in cart
 */
let quantityInputsCollection = document.getElementsByClassName("itemQuantity");
let quantityInputsArray = Array.from(quantityInputsCollection);

quantityInputsArray.forEach(function(quantityInput) {
  quantityInput.addEventListener('change', function(event){
    event.stopPropagation();
    let closestArticle = quantityInput.closest("article");
    setArticleQuantity(closestArticle.dataset.id,closestArticle.dataset.color, event.target.value);
    setTotalQuantity();
    setTotalPrice();
  })
})


let contact = new Contact();
let order = [];

let firstname = document.getElementById("firstName");
let firstNameErrorMsg = document.getElementById("firstNameErrorMsg");

firstname
  .addEventListener('change', function(event) {
    event.stopPropagation();
    if ((event.target.value != "") && (nameIsValid(event.target.value) == false)) {
      firstNameErrorMsg.innerText = "Le prénom n'est pas valide (contient chiffres et/ou caractères spéciaux)";
    }
    else {
      contact.firstName = event.target.value;
      clearMessage(firstNameErrorMsg);
    }
})

let lastname = document.getElementById("lastName");
let lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
lastname
  .addEventListener('change', function(event) {
    event.stopPropagation();
    if ((event.target.value != "") && (nameIsValid(event.target.value) == false)) {
      lastNameErrorMsg.innerText = "Le nom n'est pas valide (contient chiffres et/ou caractères spéciaux)";
    }
    else {
      contact.lastName = event.target.value;
      clearMessage(lastNameErrorMsg);
    }
})

let address = document.getElementById("address");
let addressErrorMsg = document.getElementById("addressErrorMsg");
address
  .addEventListener('change', function(event) {
    event.stopPropagation();
    if ((event.target.value != "") && (addressIsValid(event.target.value) == false)) {
      addressErrorMsg.innerText = "L'adresse n'est pas valide";
    }
    else {
      contact.address = event.target.value;
      clearMessage(addressErrorMsg);
    }
})

let city = document.getElementById("city");
let cityErrorMsg = document.getElementById("cityErrorMsg");
city
  .addEventListener('change', function(event) {
    event.stopPropagation();
    if ((event.target.value != "") && (nameIsValid(event.target.value) == false)) {
      cityErrorMsg.innerText = "La ville n'est pas valide";
    }
    else {
      contact.city = event.target.value;
      clearMessage(cityErrorMsg);
    }
})

let email = document.getElementById("email");
let emailErrorMsg = document.getElementById("emailErrorMsg");
email
  .addEventListener('change', function(event) {
    event.stopPropagation();
    if ((event.target.value != "") && (emailIsValid(event.target.value) == false)) {
      emailErrorMsg.innerText = "L'adresse email n'est pas valide";
    }
    else {
      contact.email = event.target.value;
      clearMessage(emailErrorMsg);
    }
})


let submit = document.getElementById("order");

let orderInfo = new Order();

function getOrderId(value){
  return value.orderId;
}

function redirect(id){
  document.location = `./confirmation.html?orderId=${id}`;
}

function sendOrder(e) {
  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    headers: {
      'Accept': 'application/json', 
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(orderInfo)
  })
  .then(function(res){
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(data){
    let id = getOrderId(data);
    return id;
  })
  .then(function(id){
    redirect(id);
  })
}

function inputIsComplete() {
  for (let data in orderInfo.contact) {
    if ((orderInfo.contact[data] == "") || (orderInfo.contact[data] == undefined)) {
      return false;
    }
  }
  return true;
}

let submitErrMsg = document.getElementById("submitErrorMsg");

submit.addEventListener('click', function(e){
  e.preventDefault();
  orderInfo.products = getIds();
  orderInfo.contact = contact;
  let inputComplete = inputIsComplete();
  if (getIds() == 0) {
    submitErrMsg.innerText = "Votre panier est vide";
  }
  else if (inputComplete == false) {
    submitErrMsg.innerText = "Veuillez renseigner tous les champs du formulaire";
  } else {
    sendOrder();
  }
});




