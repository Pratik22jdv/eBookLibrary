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

router.get('/', catlist);
router.post('/', create);

// router.param('categoryId', categoryById);
// router.param('userId', userById);

module.exports = router;
