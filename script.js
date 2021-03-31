const user = {
  name: 'Akash',
  active: true,
  cart: [],
  purchases: []
};

// Add item to cart
// Add 3% tax to all items in the cart
// Add items to the purchases array
// Empty the cart

const compose = (f, g) => (...args) => f(g(...args));

const pipe = (f, g) => (...args) => g(f(...args));

const purchaseItem = (...fns) => fns.reduce(compose);

const purchaseItem2  = (...fns) => fns.reduce(pipe);

const addItemToCart = (user, item) => {
  const updatedCart = user.cart.concat(item);
  return Object.assign({}, user, { cart: updatedCart });
}

const addTaxRateToAllItems = (user, item) => {
  const {cart} = user;
  const taxRate = 1.03;
  const updatedCart = cart.map((item) => {
    return {
      item: item.name,
      price: item.price * taxRate
    }
  });
  return Object.assign({}, user, { cart: updatedCart });
}

const buyItem = (user, item) => {
  const itemsInCart = user.cart;
  return Object.assign({}, user, { purchases: itemsInCart });
}

const emptyCart = (user, item) => {
  return Object.assign({}, user, { cart: [] });
}

console.log(purchaseItem(
  emptyCart,
  buyItem,
  addTaxRateToAllItems,
  addItemToCart
)(user, {name: 'laptop', price: 200}));

console.log(purchaseItem2(
  addItemToCart,
  addTaxRateToAllItems,
  buyItem,
  emptyCart
)(user, {name: 'laptop', price: 200}));
