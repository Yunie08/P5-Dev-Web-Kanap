
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

    let optionsHtml = new DocumentFragment();  
    for (let color of article.colors) {
      let optionElement = document.createElement("option");
      optionElement.setAttribute("value",`${color}`);
      optionElement.textContent = `${color}`;

      optionsHtml.append(optionElement);
    }
    document
    .getElementById('colors')
    .append(optionsHtml);

    let item = new Article(article._id, null, 0,article.name, article.price, article.imageUrl,article.altTxt);
    document
      .getElementById('colors')
      .addEventListener('change', function(event) {
        item.color = event.target.value;
      })

    document
      .getElementById('quantity')
      .addEventListener('change', function(event) {
        item.quantity = Number(event.target.value);
      })

    document
      .getElementById('addToCart')
      .addEventListener('click', function(event){
        if ((item.color === null) || (item.quantity === 0)) {
          alert('Pour ajouter un article au panier, renseigner une couleur et une quantité.')
        } else {
          addArticle(item);
        }
      })
    
  });
