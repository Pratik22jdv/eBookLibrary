

import React, { useState, useEffect, useContext } from 'react';
import { getProducts } from '../apiCalls';
import Card from './Card';
import { AuthContext } from '../context/AuthContext';
import { read } from '../apiCalls';

const MyBooks = () => {
  const myBooks =[] ;
  //const [productsByArrival, setProductsByArrival] = useState([]);
  const [error, setError] = useState([]);

  const loadProductsBySell = () => {
    const userBooks = user.borrowedBooks;
    for(let i=0; i<userBooks.length; i++){
    read(userBooks[i]).then((data) => {
         myBooks.push(data);
      
     });
    }
    console.log(myBooks);
  };

  useEffect(() => {
    loadProductsBySell();
    //console.log(productsBySell);
  }, []);

  const {user} = useContext(AuthContext);

  return (
    <div>
      <div className='row'>
        <div className='col-md-1'></div>
        <div className='col-md-10'>
          

          <h2 className='mb-2 mt-4'>Borrowed Books</h2>
          <div className='row'>
            {myBooks.map((product, i) => (
              <div key={i} className='col-xl-4 col-lg-6 col-md-6 col-sm-12'>
              hii
              <Card product={product} />
              </div>
            ))}
          </div>
        </div>
        <div className='col-md-1'></div>
      </div>
      </div>
      
    
  );
};

export default MyBooks;
