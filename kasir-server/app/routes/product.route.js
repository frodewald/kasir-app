module.exports = (app) => {
  const products = require('../controllers/product.controller');
  const router = require('express').Router();

  router.get('/', products.findAllProducts);
  router.get('/:category', products.findProductByCategory);

  app.use('/api/products', router);
}