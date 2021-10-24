import React, { useState, useEffect, useContext } from 'react';
//import Layout from './Layout';
import { read, borrowBook } from "../apiCalls"; 
import Card from './Card';
import { AuthContext } from '../context/AuthContext';

const Product = (props) => {
  const [product, setProduct] = useState({});
  //const [relatedProduct, setRelatedProduct] = useState([]);
  //const [error, setError] = useState(false);
  const {user}= useContext(AuthContext);

  const loadSingleProduct = (productId) => {
    read(productId).then((data) => {
      //console.log(productId)
      console.log(data);
      
        setProduct(data);
        //console.log("hii",product);
        //console.log(product.name,"/", product.category , "/", product.category.name);
        // fetch related products
        
      
    });
  };

  const buyItem=()=>{
    const productId = props.match.params.productId;
    borrowBook(productId, user._id).then((data)=>{
      //console.log(data);
    })
  }

  useEffect(() => {
    const productId = props.match.params.productId;
    loadSingleProduct(productId);
  }, [props]);

  return (
   
    
      <div className='row'>
      <h2 className='mb-4' style={{paddingTop:"20px"}}>Product Details</h2>
      <hr />
        <div className='col-md-2'></div>
        <div className='col-md-4 col-sm-12'>
        
  
          {product && product.description && (
            <Card product={product} showViewProductButton={false} />
          )}
        </div>

        
        <div className='col-md-4 col-sm-12' style={{paddingTop:"40px"}}>
        
        
          <h2>Total: ${product.price}</h2>
          
          <button type="button" className="btn btn-success btn-sm btn-block" style={{width:"100%"}} onClick={buyItem}>Pay</button>
          
        </div>
        
        <div className='col-md-2'></div>
      </div>
   
  );
};

export default Product;