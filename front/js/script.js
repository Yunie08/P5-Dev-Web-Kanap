fetch("http://localhost:3000/api/products/")
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (jsonArticleList) {
    let articleHtml = new DocumentFragment();
    for (let article of jsonArticleList) {
      let aElement = document.createElement("a");
      aElement.setAttribute("href", `./product.html?id=${article._id}`);

      let articleElement = document.createElement("article");

      let imgElement = document.createElement("img");
      imgElement.setAttribute("src", `${article.imageUrl}`);
      imgElement.setAttribute("alt", `${article.altTxt}`);

      let h3Element = document.createElement("h3");
      h3Element.classList.add("productName");
      h3Element.innerText = `${article.name}`;

      let pElement = document.createElement("p");
      pElement.classList.add("productDescription");
      pElement.innerText = `${article.description}`;

      articleElement.append(imgElement, h3Element, pElement);
      aElement.append(articleElement);

      articleHtml.append(aElement);
    }
    document.getElementById("items").append(articleHtml);
  })
  .catch(function (err) {
    console.log(err);
  });
