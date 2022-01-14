
/**
 * Check current url and return product _id if any
 * @param { String } url
 * @return { String } product id
 */
function getId(currentUrl) {
  let url = new URL(currentUrl);
  let searchParams = new URLSearchParams(url.search); 
  if (searchParams.has('id')) {
    return (searchParams.get('id'));
  }
}

let productId = getId(window.location.href);
let productApi = "http://localhost:3000/api/products/" + productId;

fetch(`${productApi}`)
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(article) {
    console.log(article);

    document
      .querySelector('title')
      .textContent = article.name;

    document
      .querySelector('.item__img')
      .innerHTML = `<img src="${article.imageUrl}" alt="${article.altTxt}"></img>`;

    document
      .getElementById('title')
      .textContent = article.name;

    document
      .getElementById('price')
      .textContent = article.price;

    document
      .getElementById('description')
      .textContent = article.description;

    for (let color of article.colors) { 
      document
        .getElementById('colors')
        .innerHTML +=
          `<option value="${color}">${color}</option>`
    }
  });
