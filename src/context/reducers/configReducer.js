
const configReducer = (state = null, action) => {
    switch (action.type) {
      case "SET_CONFIG":
        return action.config;
  
      case "GET_CONFIG":
        return state;
  
      default:
        return state;
    }
  };
  
  export default configReducer;
  