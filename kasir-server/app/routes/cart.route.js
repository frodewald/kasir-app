module.exports = (app) => {
  const carts = require('../controllers/cart.controller');
  const router = require('express').Router();

  router.get('/', carts.findCart);
  router.get('/:productId', carts.findCartByIdProduct);
  router.post('/inserts', carts.insertProductToCart);
  router.put('/update/:productId', carts.updateProductInCart);
  router.delete('/deleteAll', carts.deleteAllCart);
  router.delete('/delete/:productId', carts.deleteCartByProductId);

  app.use('/api/carts', router);
}