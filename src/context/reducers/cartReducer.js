const cartReducer = (state = [], action) => {
  // console.log('the state is ',state)
  // console.log('the action is ',action)
  // console.log('the type is',action.type)
  // console.log('the item is',action.items)
  switch (action.type) {
    case "GET_CART_ITEMS":
      return state;

    case "SET_CART_ITEMS":
      //write the code to add the action.items to the state and if the action.items is already  in the state increment  action.items.quantity by one  

 let  newSetState=[...state,action.items]
  return newSetState
    case "ADD_TO_CART":
      // write the code that only changes the value of quantity in redux and adds one to it and if the value of the quantity equals zero , remove it

      let newState = [...state];
      console.log(newState);
      for (let i = 0; i < newState.length; i++) {
        if (newState[i]._id === action.items) {
          let tempItem = { ...newState[i] };
          tempItem.quantity += 1;
          newState[i] = tempItem;
        }
      }

      return newState;

    case "DECREMENT_CART":
      //write the code that decrement the value of quantity by one in redux and if the value of quantity is equal to zero ,remove that item from the state
      let newCart = [...state];
      for (let j = 0; j < newCart.length; j++) {
        if (newCart[j]._id === action.items) {
          let decrementedQuantity = newCart[j].quantity - 1;
          if (decrementedQuantity > 0) {
            let updatedDecrementedQuantity = {
              ...newCart[j],
              quantity: decrementedQuantity,
            };
            newCart[j] = updatedDecrementedQuantity;
          } else {
            newCart.splice(j, 1);
          }
        }
      }
      return newCart;

    case "CLEAR_CART_ITEMS":
      return action.items;

    default:
      return state;
  }
};

export default cartReducer;
