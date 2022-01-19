/**
 * Check current url and return product _id if any
 * @param { String } url
 * @return { String } Orderid
 */
 function getId(currentUrl) {
  let url = new URL(currentUrl);
  let searchParams = new URLSearchParams(url.search); 
  if (searchParams.has('orderId')) {
    return (searchParams.get('orderId'));
  }
}

let productId = getId(window.location.href);
let orderElement = document.getElementById('orderId');

orderElement.innerText = productId;

localStorage.clear();