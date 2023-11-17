export const setAllProductsList = (productsList) => {
  return {
    type: "SET_ALL_PRODUCTS_LIST",
    productsList: productsList,
  };
};

export const getAllProductsList = (productsList) => {
  return {
    type: "GET_ALL_PRODUCTS_LIST",
  };
};
