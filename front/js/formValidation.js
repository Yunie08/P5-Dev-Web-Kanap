/**
 * Check string validity
 * Not valid if the string contains numbers or special characters
 * @param { String } name (can be user firstname or lastname)  
 * @returns { boolean } true if name is valid, false if invalid
 */

function nameIsValid(name) {
  let namePattern = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
  return namePattern.test(name);
}

function addressIsValid(address) {
  let addressPattern = /^[^_!¡?÷?¿\/\+=@#$%ˆ^&*(){}|~<>;:[\]]{5,}$/;
  return addressPattern.test(address);
}

function emailIsValid(email) {
  let emailPattern = /^[\w\.-]+@[\w\.-]+\.\w{2,4}$/;
  return emailPattern.test(email);
}


function clearMessage(element) {
  element.innerText = "";
}
