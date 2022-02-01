class Article {
  constructor(id, color, quantity, name, price, imageUrl, altTxt) {
    this.id = id;
    this.color = color;
    this.quantity = quantity;
    this.name = name;
    this.price = price;
    this.imageUrl = imageUrl;
    this.altTxt = altTxt;
  }
}

class Contact {
  constructor(firstName, lastName, address, city, email) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.address = address;
    this.city = city;
    this.email = email;
  }
}

class Order {
  constructor(contact, products) {
    this.contact = contact;
    this.products = products;
  }
}
