
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

    for (let color of article.colors) { 
      document
        .getElementById('colors')
        .innerHTML +=
          `<option value="${color}">${color}</option>`
    }

    let item = new Article(article._id, null, 0);
    document
      .getElementById('colors')
      .addEventListener('change', function(event) {
        item.color = event.target.value;
      })

    document
      .getElementById('quantity')
      .addEventListener('change', function(event) {
        item.quantity = event.target.value;
      })

    document
      .getElementById('addToCart')
      .addEventListener('click', function(event){
        console.log(item);
        if ((item.color === null) || (item.quantity === 0)) {
          alert('Pour ajouter un article au panier, renseigner une couleur et une quantité.')
        } else {
          addArticle(item);
        }
      })
  });