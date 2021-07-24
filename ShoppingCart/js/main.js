import Cart from './Cart.js';
import UI from './UI.js';

const products = document.querySelector('.product-list');
const shoppingCartBtn = document.querySelector('.btn-shopping-cart');
const shoppingCart = document.querySelector('.shopping-cart');
const shoppingCartListBody = document.querySelector(
  '.shopping-cart-list tbody'
);
const cart = new Cart();
const ui = new UI();

document.addEventListener('DOMContentLoaded', () => {
  products.addEventListener('click', addtoCart);
  shoppingCartBtn.addEventListener('click', toggleCart);
  let shoppingCartEvents = ['click', 'keyup'];
  for (event of shoppingCartEvents) {
    shoppingCartListBody.addEventListener(event, cartListAction);
  }
});

function addtoCart(e) {
  e.preventDefault();
  if (e.target.classList.contains('btn-add-cart')) {
    const productEl = e.target.parentElement;
    const product = productObj(productEl);
    const cartList = cart.getCart();
    if (!isProductInCart(product.id)) {
      cart.addCart(product);
      ui.displaySuccessMessage('Added');
    } else {
      let prevQuantity = cart.getProduct(product.id).quantity;
      prevQuantity = prevQuantity + 1;

      cart.updateQuantity(product.id, prevQuantity);
    }
    ui.displayCart(cartList);
    ui.displayTotal(cart.getTotal());
  }
}

function cartListAction(e) {
  e.preventDefault();
  if (e.target.classList.contains('remove-item')) {
    e.target.parentElement.parentElement.remove();
    const id = e.target.parentElement.parentElement.getAttribute('id');
    cart.removeProduct(id);
    ui.displayTotal(cart.getTotal());
    ui.displayErrorMessage('Item Removed!')
  }
  if (e.target.classList.contains('input-quantity')) {
    const id = e.target.parentElement.parentElement.getAttribute('id');
    const quantity = e.target.value;
    if (quantity <= 0) {
      e.target.parentElement.parentElement.remove();
      cart.removeProduct(id);
    } else {
      cart.updateQuantity(id, quantity);
    }
    ui.displayTotal(cart.getTotal());
  }
}

function productObj(productEl) {
  const id = productEl.querySelector('.btn-add-cart').getAttribute('data-id');
  const name = productEl.querySelector('.product-name').innerHTML;
  const image = productEl.querySelector('img').src;
  const price = productEl
    .querySelector('.product-price')
    .getAttribute('data-value');
  const quantity = 1;

  return {
    id,
    name,
    image,
    price,
    quantity,
  };
}

function isProductInCart(id) {
  const cartList = cart.getCart();
  return cartList.map((cart) => cart.id).includes(id);
}

function toggleCart(e) {
  if (shoppingCart.style.display === 'block') {
    shoppingCart.style.display = 'none';
  } else {
    shoppingCart.style.display = 'block';
  }
}
