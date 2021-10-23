import React, { useState, useEffect } from 'react';
//import Layout from './Layout';
import { getProducts } from '../apiCalls';
import Card from './Card';
//import Search from './Search';
//import 'fontsource-roboto';
//import Copyright from './Copyright';

const Books = () => {
  const [productsBySell, setProductsBySell] = useState([]);
  //const [productsByArrival, setProductsByArrival] = useState([]);
  const [error, setError] = useState([]);

  const loadProductsBySell = () => {
    getProducts('sold').then((data) => {
        setProductsBySell(data);
      
    });
  };

 

  useEffect(() => {
    loadProductsBySell();
    console.log(productsBySell);
  }, []);

  return (
    <div>
      <div className='row'>
        <div className='col-md-1'></div>
        <div className='col-md-10'>
          

          <h2 className='mb-2 mt-4'>Best Sellers</h2>
          <div className='row'>
            {productsBySell.map((product, i) => (
              <div key={i} className='col-xl-4 col-lg-6 col-md-6 col-sm-12'>
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

export default Books;
