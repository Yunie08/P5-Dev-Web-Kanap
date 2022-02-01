
function displayHompageProducts(articleList) {
  let articleHtml = new DocumentFragment();
    for (let article of articleList) {

      let aElement = createElt("a","","","href",`./product.html?id=${article._id}`);

      let articleElement = createElt("article");

      let imgElement = createElt("img","","","src", `${article.imageUrl}`);
      imgElement.setAttribute("alt", `${article.altTxt}`);

      let h3Element = createElt("h3","productName",`${article.name}`);

      let pElement = createElt("p","productDescription",`${article.description}`);

      articleElement.append(imgElement, h3Element, pElement);
      aElement.append(articleElement);

      articleHtml.append(aElement);
    }
    document.getElementById("items").append(articleHtml);
}

/*
function displayHompageProducts(articleList) {
  let articleHtml = new DocumentFragment();
    for (let article of articleList) {
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
}
*/

fetch("http://localhost:3000/api/products/")
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (jsonArticleList) {
    displayHompageProducts(jsonArticleList);
  })
  .catch(function (err) {
    console.log(err);
  });