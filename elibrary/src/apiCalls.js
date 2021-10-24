import axios from "axios";
import queryString from 'query-string';

export const loginCall = async (userCredential, dispatch, setMessage) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axios.post("http://localhost:3000/api/auth/login", userCredential);
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
  } catch (error) {
    setMessage("Invalid email or password");
    dispatch({ type: "LOGIN_FAILURE", payload: error });
  }
};

export const getProducts = (sortBy) => {
  return fetch(`http://localhost:3000/products?sortBy=${sortBy}&order=desc&limit=8`, {
    method: 'GET',
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const list = (params) => {
  const query = queryString.stringify(params);
  console.log('query', query);
  return fetch(`http://localhost:3000/products/search?${query}`, {
    method: 'GET',
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getCategories = () => {
  return fetch(`http://localhost:3000/categories`, {
    method: 'GET',
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const read = (productId) => {
  //console.log(productId);
  return fetch(`http://localhost:3000/products/${productId}`, {
    method: 'GET',
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const borrowBook = (productId, userId) =>{
  return fetch(`http://localhost:3000/api/users/${productId}/borrow?userId=${userId}`, {
    method: 'PUT',
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
}

export const userBooks = (userId) =>{
  return fetch(`http://localhost:3000/api/users/books/${userId}`, {
    method: 'GET',
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
}