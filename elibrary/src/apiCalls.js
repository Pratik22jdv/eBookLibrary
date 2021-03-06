import axios from 'axios';
import queryString from 'query-string';

export const loginCall = async (userCredential, dispatch, setMessage) => {
  dispatch({ type: 'LOGIN_START' });
  try {
    const res = await axios.post(
      'http://localhost:3000/api/auth/login',
      userCredential
    );
    dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
  } catch (error) {
    setMessage('Invalid email or password');
    dispatch({ type: 'LOGIN_FAILURE', payload: error });
  }
};

export const getProducts = (sortBy) => {
  return fetch(
    `http://localhost:3000/products?sortBy=${sortBy}&order=desc&limit=18`,
    {
      method: 'GET',
    }
  )
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

export const borrowBook = (productId, userId) => {
  return fetch(
    `http://localhost:3000/api/users/${productId}/borrow?userId=${userId}`,
    {
      method: 'PUT',
    }
  )
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

// export const payment = (productId, userId, TransactionData) => {
//   const payment_data = { "userId": userId, "productId": productId, "TransactionData": TransactionData };
//   console.log(payment_data);
//   return fetch(
//     `http://localhost:3000/payments`,
//     {
//       method: 'POST',
//       // body: { "userId": userId, "productId": productId, "TransactionData": TransactionData },
//       body: { "product_id": "61781ca707205a9a4112eddc", "transactionID": { "Name": "1234", "email": "1234", "CardNum": "2345", "TransactionID": "" }, "userID": "617927fa82d262089a3556a5" },
//     }
//   )
// };

export const payment = async (productId, userId, TransactionData) => {
  // dispatch({ type: 'LOGIN_START' });
  const payment_data = { "userId": userId, "productId": productId, "TransactionData": TransactionData };
  try {
    const res = await axios.post(
      'http://localhost:3000/payments',
      payment_data
    );

  } catch (error) {

    console.log(error)
  }
};

export const returnBook = (productId, userId) => {
  return fetch(
    `http://localhost:3000/api/users/${productId}/return?userId=${userId}`,
    {
      method: 'PUT',
    }
  )
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const userBooks = (userId) => {
  return fetch(`http://localhost:3000/api/users/books/${userId}`, {
    method: 'GET',
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
export const getProductCategory = (categoryId) => {
  return fetch(`http://localhost:3000/categories/${categoryId}`, {
    method: 'GET',
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
