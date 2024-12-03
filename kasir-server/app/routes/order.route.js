module.exports = (app) => {
  const orders = require('../controllers/order.controller');
  const router = require('express').Router();

  router.get('/', orders.findAllOrders);
  router.post('/create', orders.createOrders);

  app.use('/api/orders', router);
}