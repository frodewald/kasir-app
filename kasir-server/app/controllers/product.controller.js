const db = require('../models');

const Products = db.products;

exports.findAllProducts = (req, res) => {
  Products.find()
    .populate('category')
    .then((result) => {
      res.send(result);
    }).catch((err) => {
      res.status(409).send({
        message: err.message
      })
    })
}

exports.findProductByCategory = (req, res) => {
  const { category } = req.params;

  Products.find()
  .populate('category')
    .then((allProducts) => {
      const filteredProducts = allProducts.filter(product => product.category.nama.toLowerCase() === category.toLowerCase());
      res.send(filteredProducts);
    }).catch((err) => {
      res.status(409).send({
        message: err.message
      })
    })
}