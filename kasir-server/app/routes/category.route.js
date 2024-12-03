module.exports = (app) => {
  const categories = require('../controllers/category.controller');
  const router = require('express').Router();

  router.get('/', categories.findAllCategories);

  app.use('/api/categories', router);
}