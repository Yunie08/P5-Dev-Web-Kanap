


/**
 * Check if an article is already in cart (same id and color)
 * @param { String } article.id
 * @param { String } article.color
 * @return { Number } cart[index] where article is found or -1 if not found
 */
function isInCart(articleId,articleColor) {
  let cart = getCart();
  for (let item in cart) {
    if ((cart[item].id == articleId) && (cart[item].color == articleColor)) {
      console.log(item);
      return item;
    }
  }
  console.log(-1);
  return -1;
}


/**
 * Add new article to cart or update article quantity
 * @param { Article } article
 */
function addArticle(article) {
  let cart = getCart();
  if (isInCart(article.id,article.color) != -1) {
    console.log("déjà présent dans panier");
    cart[isInCart(article.id,article.color)].quantity += article.quantity;
  } else {
    console.log(cart);
    cart.push(article);
  }
  sortCart(cart);
  saveCart(cart);
}

function setArticleQuantity(articleId,articleColor,articleQuantity) {
  let cart = getCart();
  let articleInCart = isInCart(articleId,articleColor);
  if (articleQuantity > 0){
    cart[articleInCart].quantity = articleQuantity;
  }
  saveCart(cart);
}


/**
 * Remove article from cart
 */
 function removeArticle(articleId,articleColor){
  let cart = getCart();
  let articleInCart = isInCart(articleId,articleColor);
  if (articleInCart != -1) {
  cart.splice((articleInCart), 1);
  saveCart(cart);
  }
}


/**
 * Retrieve cart from localStorage and parse it
 * @return { Array } cart
 */
function getCart() {
  let cart = [];
  if (localStorage.getItem('cart')) {
    cart = JSON.parse(localStorage.getItem('cart'));
  }
  return cart;
}


/**
 * Save cart in localStorage
 */
function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}


/**
 * String comparison function used to sort cart array
 * @param { String } article.name
 * @param { String } article.name
 * @return { Number } 
 * 1 if a.name comes before b.name
 * 0 if a.name = b.name
 * -1 if b.name comes before a.name
 */
function compare(a,b) {
  if (a.name > b.name) {
    return 1;
  }
  if (a.name < b.name) {
    return -1;
  }
  return 0;
}


/**
 * Sort cart articles by their name (alphabetically)
 */
function sortCart(cart){
  cart.sort(compare);
}


