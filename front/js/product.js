/**
 * Check current url and return product _id if any
 * @param { String } url
 * @return { String } product id
 */
function getId(currentUrl) {
  let url = new URL(currentUrl);
  let searchParams = new URLSearchParams(url.search);
  if (searchParams.has("id")) {
    return searchParams.get("id");
  }
}

/**
 * Display all product informations
 */
function displayArticleInfos(article) {
  document.querySelector("title").textContent = article.name;
  document.querySelector(
    ".item__img"
  ).innerHTML = `<img src="${article.imageUrl}" alt="${article.altTxt}"></img>`;
  document.getElementById("title").textContent = article.name;
  document.getElementById("price").textContent = article.price;
  document.getElementById("description").textContent = article.description;

  let optionsHtml = new DocumentFragment();
  for (let color of article.colors) {
    let optionElement = document.createElement("option");
    optionElement.setAttribute("value", `${color}`);
    optionElement.textContent = `${color}`;

    optionsHtml.append(optionElement);
  }
  document.getElementById("colors").append(optionsHtml);
}

/**
 * Create a new Article and fill it with products infos from API, quantity and color from form
 */
function createArticle(product) {
  let article = new Article(
    product._id,
    null,
    0,
    product.name,
    product.price,
    product.imageUrl,
    product.altTxt
  );
  return article;
}

function completeArticle(article) {
  let color = document.getElementById("colors").value;
  let quantity = Number(document.getElementById("quantity").value);

  article.color = color;
  article.quantity = quantity;
}

let productId = getId(window.location.href);
let productApi = "http://localhost:3000/api/products/" + productId;
let article = new Article();

fetch(`${productApi}`)
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (product) {
    displayArticleInfos(product);
    article = createArticle(product);
  })
  .catch(function (err) {
    console.log(err);
  });

/**
 * Check if article quantity is valid (1 to 100) and if color is defined
 * Display error or confirmation message
 */
const productErrMsg = document.getElementById("productErrorMsg");
function validateArticle(article) {
  if (
    article.color === null ||
    article.color === "" ||
    article.quantity <= 0 ||
    article.quantity >= 100
  ) {
    productErrMsg.innerText =
      "Veuillez renseigner une couleur et une quantité.";
    return false;
  }
  productErrMsg.innerText = "Votre article a été ajouté au panier.";
  return true;
}

/**
 * Add article to cart if article is valid
 */
document
  .getElementById("addToCart")
  .addEventListener("click", function (event) {
    completeArticle(article);
    let articleIsValid = validateArticle(article);

    if (articleIsValid == true) {
      addArticle(article);
    }
  });

/**
 * Hide error message when user clicks on input elements
 */
document.querySelector("input").addEventListener("click", function (e) {
  productErrMsg.innerText = "";
});
document.querySelector("select").addEventListener("click", function (e) {
  productErrMsg.innerText = "";
});
