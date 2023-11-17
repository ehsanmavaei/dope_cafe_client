const productListReducer = (state = null, action) => {
  switch (action.type) {
    case "GET_ALL_PRODUCTS_LIST":
      return state;

    case "SET_ALL_PRODUCTS_LIST":
      return action.productsList;

    default:
      return state;
  }
};

export default productListReducer;
