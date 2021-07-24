import Cart from './Cart.js'
export default class UI {
  
  displayCart(cart) {
    const shoppingCartListBody = document.querySelector('.shopping-cart-list tbody');
    shoppingCartListBody.innerHTML = '';
    cart.forEach(product => {
      const row = document.createElement('tr');
      row.setAttribute('id',product.id);
      row.innerHTML = `
        <td>${product.name}</td>
        <td><input type='number' class='input-quantity' value='${product.quantity}' /></td>
        <td>${product.price}</td>
        <td class='subtotal'>${Cart.getSubtotal(product.price,product.quantity)}</td>
        <td><a href='#' class='remove-item'>Remove</a></td>
      `
      shoppingCartListBody.append(row)
    })
  }
  displayTotal(total) {
    const shopingCartListFoot = document.querySelector('.shopping-cart-list tfoot');
    shopingCartListFoot.querySelector('.total').innerHTML = total;

  }

  displaySuccessMessage(message) {
    const messageFloat = document.querySelector('.message-float');
    const messageContent = document.querySelector('.message-content');
    messageFloat.classList = 'message-float message-success';
    messageFloat.style.display = 'flex';
    messageContent.textContent = message;

    setTimeout(() => {
      messageFloat.style.display = 'none';
    }, 1000);


  }
  displayErrorMessage(message) {
    const messageFloat = document.querySelector('.message-float');
    const messageContent = document.querySelector('.message-content');
    messageFloat.classList = 'message-float message-danger';
    messageFloat.style.display = 'flex';
    messageContent.textContent = message;

    setTimeout(() => {
      messageFloat.style.display = 'none';
    }, 1000);


  }


}