
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

function getCart() {
  let cart = [];
  if (localStorage.getItem('cart')) {
    cart = JSON.parse(localStorage.getItem('cart'));
  }
  return cart;
}

function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}