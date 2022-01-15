


/**
 * Check if an article is already in cart (same id and color)
 * @param { Article } article
 * @return { Number } cart[index] where article is found or -1 if not found
 */
function isInCart(article) {
  let cart = getCart();
  for (let item in cart) {
    if ((cart[item].id == article.id) && (cart[item].color == article.color)) {
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
  if (isInCart(article) != -1) {
    console.log("déjà présent dans panier");
    cart[isInCart(article)].quantity += article.quantity;
  } else {
    console.log(cart);
    cart.push(article);
  }
  saveCart(cart);
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