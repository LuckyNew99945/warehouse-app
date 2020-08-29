const router = require('express').Router();
let Product = require('../models/products.model');

router.route('/').get((req, res) => {
  Product.find()
    .then((product) => {
      res.json(product);
    })
    .catch((err) => res.status(400).json(`Error : ${err}`));
}); //get all products from db

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const productname = req.body.productname;
  const description = req.body.description;
  const width = Number(req.body.width);
  const length = Number(req.body.length);
  const thickness = Number(req.body.thickness);
  const expired = req.body.expired;

  const newProduct = new Product({
    username,
    productname,
    description,
    width,
    length,
    thickness,
    expired,
  });

  newProduct
    .save()
    .then(() => {
      res.json('Product Added!');
    })
    .catch((err) => res.status(400).json(`Error : ${err}`));
}); //add product to db

router.route('/:id').get((req, res) => {
  Product.findById(req.params.id)
    .then((product) => {
      res.json(product);
    })
    .catch((err) => res.status(400).json(`Error : ${err}`));
}); //get one product from db

router.route('/:id').delete((req, res) => {
  Product.findByIdAndRemove(req.params.id)
    .then((product) => res.json('Product Deleted!'))
    .catch((err) => res.json(`Error : ${err}`));
}); //delete on product from db

router.route('/update/:id').post((req, res) => {
  Product.findById(req.params.id).then((product) => {
    product.username = req.body.username;
    product.productname = req.body.productname;
    product.description = req.body.description;
    product.width = Number(req.body.width);
    product.length = Number(req.body.length);
    product.thickness = Number(req.body.thickness);
    product.expired = Date(req.body.expired);

    product
      .save()
      .then(() => res.json('Product Updated!'))
      .catch((err) => res.status(400).json(`Error : ${err}`));
  });
});

module.exports = router;
