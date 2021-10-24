const express = require('express');
const router = express.Router();
const Category = require("../models/Category");

// const {
//   create,
//   categoryById,
//   read,
//   update,
//   remove,
//   list
// } = require('../controllers/category');
// const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
// const { userById } = require('../controllers/user');

// router.get('/category/:categoryId', read);
// router.post('/category/create/:userId', requireSignin, isAuth, isAdmin, create);
// router.put(
//   '/category/:categoryId/:userId',
//   requireSignin,
//   isAuth,
//   isAdmin,
//   update
// );
// router.delete(
//   '/category/:categoryId/:userId',
//   requireSignin,
//   isAuth,
//   isAdmin,
//   remove
// );

catlist = (req, res) => {
    Category.find().exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json(data);
    });
  };

  create = (req, res) => {
    const category = new Category(req.body);
    category.save((err, data) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json({ data });
    });
  };

  getCategoryById = (req, res, next) => {
    const id = req.params.id;
    Category.findById(id)
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

router.get('/', catlist);
router.post('/', create);
router.get('/:id', getCategoryById);

// router.param('categoryId', categoryById);
// router.param('userId', userById);

module.exports = router;
