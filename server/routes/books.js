const router = require("express").Router();
const BookSchema = require("../models/Book");
const User = require("../models/User");
const Product = require("../models/Product");

// const express = require('express');
// const router = express.Router();

// const {
//   create,
//   productById,
//   read,
//   update,
//   remove,
//   list,
//   listRelated,
//   listCategories,
//   listBySearch,
//   photo,
//   listSearch
// } = require('../controllers/product');
// const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
// const { userById } = require('../controllers/user');

//router.get('/product/:productId', read);
//router.post('/product/create/:userId', requireSignin, isAuth, isAdmin, create);
/*router.delete(
  '/product/:productId/:userId',
  requireSignin,
  isAuth,
  isAdmin,
  remove
);*/

/*router.put(
  '/product/:productId/:userId',
  requireSignin,
  isAuth,
  isAdmin,
  update
);*/

list = (req, res) => {
    let order = req.query.order ? req.query.order : 'asc';
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
    let limit = req.query.limit ? parseInt(req.query.limit) : 6;
  
    Product.find()
      .sort([[sortBy, order]])
      .limit(limit)
      .exec((err, products) => {
        if (err) {
          return res.status(400).json({
            error: 'Products not found',
          });
        }
        res.json(products);
      });
  };

  listSearch = (req, res) => {
    // create query object to hold search value and category value
    const query = {};
    // assign search value to query.name
    if (req.query.search) {
      query.name = { $regex: req.query.search, $options: 'i' };
      // assigne category value to query.category
      if (req.query.category && req.query.category != 'All') {
        query.category = req.query.category;
      }
      // find the product based on query object with 2 properties
      // search and category
      Product.find(query, (err, products) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler(err),
          });
        }
        res.json(products);
      });
    }
  };

  read = (req, res) => {
    req.product.photo = undefined;
    return res.json(req.product);
  };

  products_get_product = (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
      .exec()
      .then(doc => {
        
        if (doc) {
          res.status(200).json( doc);
        } else {
          res
            .status(404)
            .json({ message: "No valid entry found for provided ID" });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
      });
  };




  
router.get('/', list);
router.get('/search', listSearch);
router.get('/:productId', products_get_product);

//router.post('/product/create', create);
// router.get('/products/search', listSearch);
// router.get('/products/related/:productId', listRelated);
// router.get('/products/categories', listCategories);
// router.post('/products/by/search', listBySearch);
// router.get('/product/photo/:productId', photo);

// router.param('userId', userById);
// router.param('productId', productById);

module.exports = router;
