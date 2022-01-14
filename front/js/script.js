fetch('http://localhost:3000/api/products/')
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(jsonArticleList) {
    for (let article of jsonArticleList) {
      
      let articleHtml =
        `<a href="./product.html?id=${article._id}">
          <article>
            <img src="${article.imageUrl}" alt="${article.altTxt}" />
            <h3 class="productName">${article.name}</h3>
            <p class="productDescription">${article.description}</p>
          </article>
        </a>`;

      document
        .getElementById('items')
        .innerHTML += articleHtml;
    }
  })
  .catch(function(err){
    console.log(err);
  });