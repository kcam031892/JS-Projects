export default class Cart {
  constructor() {
    this.cart = [];
  }
  addCart(product) {
    this.cart.push(product);
  }
  getCart() {
    return this.cart;
  }
  getProduct(id) {
    const index = this.cart.map((c) => c.id).indexOf(id);
    let product = this.cart[index];

    return product;
  }
  getTotal() {
    const total = this.cart.reduce((total, product) => {
      return (total += product.price * product.quantity);
    }, 0);
    return total;
  }
  removeProduct(id) {
    let index = this.cart.map((c) => c.id).indexOf(id);
    this.cart.splice(index, 1);
  }
  updateQuantity(id, quantity) {
    const index = this.cart.map((c) => c.id).indexOf(id);
    let product = this.cart[index];
    product.quantity = quantity;
  }
  static getSubtotal(price, quantity) {
    return price * quantity;
  }
}
