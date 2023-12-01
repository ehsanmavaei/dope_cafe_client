export const setConfig = (config) => {
    return {
      type: "SET_CONFIG",
      config: config,
    };
  };
  
  export const getConfig = (config) => {
    return {
      type: "GET_CONFIG",
    };
  };
  