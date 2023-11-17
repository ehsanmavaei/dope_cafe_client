import axios from "axios";

const tokenInTheStorage=localStorage.getItem('user')
const parsed= tokenInTheStorage? JSON.parse(tokenInTheStorage).token :" "
console.log(parsed)
axios.defaults.headers.common['authorization'] = `Bearer ${parsed}`;

export const baseURL = "https://dope-cafe-server.onrender.com";

export const validateUserJWTToken = async (token) => {
  try {
    const res = await axios.get(`${baseURL}/api/users/jwtVerfication`, {
      headers: { Authorization: "Bearer " + token },
    });
    return res.data.data;
  } catch (err) {
    return null;
  }
};

// add new product
export const addNewProduct = async (data) => {
  try {
    const res = await axios.post(`${baseURL}/api/products/create`, { ...data });
    return res.data;
  } catch (err) {
    return null;
  }
};
export const addNewProductList = async (data) => {
  try {
    const res = await axios.post(`${baseURL}/api/product/list/create`,data);
    return res.data;
  } catch (err) {
    return null;
  }
};

// user signup
export const signup = async (email, password) => {
  const res = await axios.post(`${baseURL}/api/user/signup`, {
    email: email,
    password: password,
  });
  return res.data;
};
// user login
export const login = async (email, password) => {
  const res = await axios.post(`${baseURL}/api/user/login`, {
    email: email,
    password: password,
  });
  return res.data;
};

// user uploadImage
// export const uploadIMG = async (image) => {

//     const res= await axios
//     .post(`${baseURL}/api/files/upload`, image)
//     return res.data;

// };

export const uploadIMG = async (file, func) => {
  // ev.preventDefault();
  const formData = new FormData();
  formData.append("message", "");
  formData.append("image", file[0]);
  const onUploadProgress = (event) => {
    const percentage = Math.round((100 * event.loaded) / event.total);
    console.log(percentage);
  };

  const config = {
    onUploadProgress: (e) => {
      const { loaded, total } = e;
      console.log(loaded, total);
      func((loaded / total) * 100);

    },
    header: {
      "Content-Type": "multipart/form-data",
    },
  };

  // const config = {
  //   onUploadProgress: (e) => {
  //     const { loaded, total } = e;
  //     console.log(loaded,total)

  //     func((loaded / total) * 100);
  //   },

  // };
  const res = await axios.post(`
  ${baseURL}/api/files/upload`,
    formData,
    config
  );
  return res;
};

// get all the products
export const getAllProducts = async () => {
  try {
    const res = await axios.get(`${baseURL}/api/products/all`);
    return res.data;
  } catch (err) {
    return null;
  }
};
export const getAllProductsList = async () => {
  try {
    const res = await axios.get(`${baseURL}/api/product/list/all`);
    return res.data;
  } catch (err) {
    return null;
  }
};
// update a productList
export const updateAProductList = async (product_id,payload) => {
  try {
    const res = await axios.put(`${baseURL}/api/product/list/update/${product_id}`,payload);
    return res.data;
  } catch (err) {
    return null;
  }
};
// update a product
export const updateAProduct = async (product_id,payload) => {
  try {
    const res = await axios.put(`${baseURL}/api/products/update/${product_id}`,payload);
    return res.data;
  } catch (err) {
    return null;
  }
};
//delete image from cloudionary
export const deleteIMG = async (assetId) => {
  let newval=encodeURIComponent(assetId)
  const res = await axios.delete(`${baseURL}/api/files/delete/${newval}`);
  return res;
};

// delete a product
export const deleteAProduct = async (productId) => {
  try {
    const res = await axios.delete(
      `${baseURL}/api/products/delete/${productId}`
    );
    return res.data;
  } catch (err) {
    return null;
  }
};
// delete a product
export const deleteAProductList = async (productId) => {
  try {
    const res = await axios.delete(
      `${baseURL}/api/product/list/delete/${productId}`
    );
    return res.data;
  } catch (err) {
    return null;
  }
};

export const getAllUsers = async () => {
  try {
    const res = await axios.get(`${baseURL}/api/users/all`);
    return res.data.data;
  } catch (err) {
    return null;
  }
};

// add an item to cart
// add new items to  the cart
export const addNewItemToCart = async (user_id, data) => {
  try {
    const res = await axios.post(
      `${baseURL}/api/products/addToCart/${user_id}`,
      { ...data }
    );
    return res.data.data;
  } catch (error) {
    return null;
  }
};

export const getAllCartItems = async (user_id) => {
  try {
    const res = await axios.get(
      `${baseURL}/api/products/getCartItems/${user_id}`
    );
    return res.data.data;
  } catch (error) {
    return null;
  }
};

// cart increment
export const increaseItemQuantity = async (user_id, productId, type) => {
  console.log(user_id, productId, type);
  try {
    const res = await axios.post(
      `${baseURL}/api/products/updateCart/${user_id}`,
      null,
      { params: { productId: productId, type: type } }
    );
    return res.data.data;
  } catch (error) {
    return null;
  }
};

export const getAllOrder = async () => {
  try {
    const res = await axios.get(`${baseURL}/api/products/orders`);
    return res.data.data;
  } catch (error) {
    return null;
  }
};

// update the order status
export const updateOrderSts = async (order_id, sts) => {
  try {
    const res = await axios.post(
      `${baseURL}/api/products/updateOrder/${order_id}`,
      null,
      { params: { sts: sts } }
    );
    return res.data.data;
  } catch (error) {
    return null;
  }
};
