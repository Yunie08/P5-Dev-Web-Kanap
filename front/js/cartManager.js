
function isInCart(article) {
  let cart = getCart();
  for (let item in cart) {
    if ((item.id == article.id) && (item.color == article.color)) {
      return item;
    }
  }
  return -1;
}

function addArticle(article) {
  let cart = getCart();
  if (isInCart(article) != -1) {
    cart[isInCart(article)].quantity += article.quantity;
  } else {
    cart.push(article);
    saveCart(cart);
  }
}

function getCart() {
  let cart = localStorage.getItem("cartList");
  if (cart === null) {
    return [];
  } else {
    return cart;
  }
}

function saveCart(cart) {
  localStorage.setItem("cart", cart);
}