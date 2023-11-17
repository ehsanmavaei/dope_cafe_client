export const setCartItems = (items) => {
  return {
    type: "SET_CART_ITEMS",
    items: items,
  };
};

export const getCartItems = () => {
  return {
    type: "GET_CART_ITEMS",
  };
};
export const addToCart = (items) => {
  return {
    type: "ADD_TO_CART",
    items: items,
  };
};
export const decrementCartQuantity = (items) => {
  return {
    type: "DECREMENT_CART",
    items: items,
  };
};

export const clearCartItems = () => {
  return {
    type: "CLEAR_CART_ITEMS",
    items: null,
  };
};
