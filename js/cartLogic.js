let carts = document.querySelectorAll('.products__card-btn');

for (let i = 0; i < carts.length; i++) {
  carts[i].addEventListener('click', () => {
    cartNumbers(jackets[i]);
    totalCost(jackets[i]);
  });
}

const onLoadCartNumbers = () => {
  let productNumbers = localStorage.getItem('cartNumbers');

  if (productNumbers) {
    document.querySelector('.navbar__count').textContent = productNumbers;
  }
};

const cartNumbers = (jacket) => {
  let productNumbers = localStorage.getItem('cartNumbers');

  productNumbers = parseInt(productNumbers);
  if (productNumbers) {
    localStorage.setItem('cartNumbers', productNumbers + 1);
    document.querySelector('.navbar__count').textContent = productNumbers + 1;
  } else {
    localStorage.setItem('cartNumbers', 1);
    document.querySelector('.navbar__count').textContent = 1;
  }

  setItem(jacket);
};

const setItem = (jacket) => {
  let cartItems = localStorage.getItem('jacketsInCart');
  cartItems = JSON.parse(cartItems);

  if (cartItems != null) {
    if (cartItems[jacket.id] == undefined) {
      cartItems = {
        ...cartItems,
        [jacket.id]: jacket,
      };
    }

    cartItems[jacket.id].inCart += 1;
  } else {
    jacket.inCart = 1;
    cartItems = {
      [jacket.id]: jacket,
    };
  }

  localStorage.setItem('jacketsInCart', JSON.stringify(cartItems));
};

const totalCost = (jacket) => {
  let cartCost = localStorage.getItem('totalCost');

  if (cartCost != null) {
    cartCost = parseInt(cartCost);
    localStorage.setItem('totalCost', cartCost + jacket.price);
  } else {
    localStorage.setItem('totalCost', jacket.price);
  }
};

const displayCart = () => {
  let cartItems = localStorage.getItem('jacketsInCart');
  cartItems = JSON.parse(cartItems);

  let jacketContainer = document.querySelector(".cart__jackets");

  let cartCost = localStorage.getItem('totalCost');

  if(cartItems && jacketContainer) {
    jacketContainer.innerHTML = '';
    Object.values(cartItems).map(jacket => {
      jacketContainer.innerHTML += `
      <div class = "cart__jackets-container">
        <div class = "cart__title">
          <p class="remove-item" onClick="Remove(${jacket.id})"><i class="far fa-trash-alt"></i></p>
          <span>${jacket.title}</span>
        </div>
        <div class="cart__price">$${jacket.price}</div>
        <div class= "cart__quantity">
          <p class="${jacket.inCart == 1 ? "disabled" : ''} minus" onClick="Decrement(${jacket.id})"><i class="fas fa-chevron-left"></i></p>
          <span>${jacket.inCart}</span>
          <p class="plus" onClick="Increment(${jacket.id})"><i class="fas fa-chevron-right"></i></p>
        </div>
        <div class="cart__total">
          $${jacket.inCart * jacket.price}
        </div>
      </div>
      `
    });

    jacketContainer.innerHTML += `
      <div class = "basketTotalContainer">
        <h4 class = "basketTotalTitle">
        Basket Total
        </h4>
        <h4 class ="basketTotal">
          $${cartCost}
        </h4>
      </div>
      `
    jacketContainer.innerHTML += ` 
    <div class="btn-cta">
    <input type="button" value="Order" class="btn" onClick="Order()">    
    </div>
    `
  }
}

onLoadCartNumbers();
displayCart();

function Order(lastItem) {
  localStorage.clear();
  document.querySelector(".cart__jackets").innerHTML = '';
  document.querySelector('.navbar__count').textContent = '0';
  if (!lastItem) {
    alert('Your order has been placed successfully!');
  }
}

function Remove(id) {
  // Remove the item from the cart
  let jackets = JSON.parse(localStorage.jacketsInCart || {});
  let price = jackets[id]['price'];
  let itemAmount = jackets[id]['inCart'];
  jackets[id] ? delete jackets[id] : null
  window.localStorage.jacketsInCart = JSON.stringify(jackets);

  // Update cart indicator number
  let cartNumbers = parseInt(localStorage.cartNumbers);
  window.localStorage.cartNumbers = cartNumbers - itemAmount;
  cartNumbers - itemAmount == 0 ? Order('lastItem') : null
  onLoadCartNumbers();

  // Update Basket Total
  let basketTotal = parseInt(localStorage.totalCost);
  let updatedTotal = basketTotal - (price * itemAmount);
  cartNumbers - itemAmount == 0 ? Order('lastItem') : window.localStorage.totalCost = updatedTotal;

  ResetCart();
}

function Increment(id) {
  let incrementItem = JSON.parse(localStorage.jacketsInCart)[id];
  cartNumbers(incrementItem);
  totalCost(incrementItem);

  ResetCart();

}

function Decrement(id) {

  let cartItems = JSON.parse(localStorage.jacketsInCart);
  let decrementItem = JSON.parse(localStorage.jacketsInCart)[id];
  let decrementPrice = parseInt(JSON.parse(localStorage.jacketsInCart)[id]['price']);

  cartItems[decrementItem.id].inCart -= 1;
  localStorage.setItem('jacketsInCart', JSON.stringify(cartItems));

  // Update cart indicator number
  let cartNumbers = parseInt(localStorage.cartNumbers);
  window.localStorage.cartNumbers = cartNumbers - 1;
  onLoadCartNumbers();

  // Update Basket Total
  let basketTotal = parseInt(localStorage.totalCost);
  let updatedTotal = basketTotal - decrementPrice;
  window.localStorage.totalCost = updatedTotal;
  
  ResetCart();

}

function ResetCart() {
  document.querySelector(".cart__jackets").innerHTML = '';
  displayCart();
}