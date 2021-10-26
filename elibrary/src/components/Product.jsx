import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from "react-router";
//import Layout from './Layout';
import { read, borrowBook } from "../apiCalls";
import Card from './Card';
import { AuthContext } from '../context/AuthContext';


const Product = (props) => {
  const [product, setProduct] = useState({});
  //const [relatedProduct, setRelatedProduct] = useState([]);
  //const [error, setError] = useState(false);
  const { user } = useContext(AuthContext);
  const history = useHistory();

  const [TransactionData, setTransactionData] = useState(
    {
      Name: "",
      email: "",
      CardNum: "",
      TransactionID: ""
    })

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setTransactionData({ ...TransactionData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (TransactionData.Name && TransactionData.email && TransactionData.CardNum) {
      const newTransactionData = {
        ...TransactionData,
        TransactionID: `${user.email} \n ${new Date().getTime().toString()}`
      };
      console.log(TransactionData)
    }
  };

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

  const buyItem = () => {
    if (user) {
      const productId = props.match.params.productId;

      // console.log("user", user);
      // console.log("u.b", user.borrowedBooks);
      if (user.borrowedBooks.indexOf(productId) !== -1) {
        alert("You already borrowed this book!!")
      }
      else {
        borrowBook(productId, user._id).then((data) => {
        });
        alert("Congratulations!! You purchased book successfully...")
      }
      history.push('/myBooks');
      window.location.reload(false);
    }

    else history.push('/login');
  }

  useEffect(() => {
    const productId = props.match.params.productId;
    loadSingleProduct(productId);
  }, [props]);

  return (
    <div className='row'>
      <h2 className='mb-4' style={{ paddingTop: "20px" }}>Product Details</h2>
      <hr />
      <div className='col-md-2'></div>
      <div className='col-md-4 col-sm-12'>
        {product && product.description && (
          <Card product={product} showViewProductButton={false} />
        )}
      </div>


      <div className='col-md-4 col-sm-12' style={{ paddingTop: "40px" }}>
        <h2>Total: ${product.price}</h2>
        <div className="card" style={{ width: "100%" }}>
          <div className="card-body">
            {/* <h5 className="card-title">Card title</h5> */}
            <form onSubmit={handleSubmit}>
              <div class="input-group mb-3">
                <span class="input-group-text">Name</span>
                <input type="text" name="Name" class="form-control" placeholder="Enter your name"
                  value={TransactionData.Name}
                  onChange={handleChange}
                />
              </div>
              <div class="input-group mb-3">
                <input type="email" name="email" class="form-control" placeholder="Enter your Email ID"
                  value={TransactionData.email}
                  onChange={handleChange}
                />
                <span class="input-group-text">Email</span>
              </div>
              <div class="input-group mb-3">
                <span class="input-group-text">Card Number</span>
                <input type="text" name="CardNum" class="form-control" placeholder="1234 1234 1234 1234"
                  value={TransactionData.CardNum}
                  onChange={handleChange}
                />
              </div>
              <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="MM/ YY" />
                <span class="input-group-text">Expiry Date</span>
              </div>
              <div class="input-group mb-3">
                <span class="input-group-text">CVV No.</span>
                <input type="text" class="form-control" placeholder="CVV" />
              </div>

              {/* this is our SUbmit Button */}
              <button type="submit" className="btn btn-success btn-sm btn-block" style={{ width: "100%" }} onClick={buyItem}>Pay</button>
            </form>
          </div>
        </div>



      </div>


      <div className='col-md-2'></div>
    </div>

  );
};

export default Product;
