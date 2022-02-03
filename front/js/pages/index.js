/**
 * Create HTML elements for each article in the article list and append them to the DOM
 * @param { Array } articleList
 */
function displayHomePageProducts(articleList) {
  let articleHtml = new DocumentFragment();
  for (let article of articleList) {
    let aElement = createElt(
      "a",
      "",
      "",
      "href",
      `./product.html?id=${article._id}`
    );

    let articleElement = createElt("article");

    let imgElement = createElt("img", "", "", "src", `${article.imageUrl}`);
    imgElement.setAttribute("alt", `${article.altTxt}`);

    let h3Element = createElt("h3", "productName", `${article.name}`);

    let pElement = createElt(
      "p",
      "productDescription",
      `${article.description}`
    );

    articleElement.append(imgElement, h3Element, pElement);
    aElement.append(articleElement);

    articleHtml.append(aElement);
  }
  document.getElementById("items").append(articleHtml);
}

fetch("http://localhost:3000/api/products/")
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (jsonArticleList) {
    displayHomePageProducts(jsonArticleList);
  })
  .catch(function (err) {
    console.log(err);
  });
