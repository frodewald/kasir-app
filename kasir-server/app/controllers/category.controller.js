const db = require('../models');

const Categories = db.categories;

exports.findAllCategories = (req, res) => {
  Categories.find()
  .then((result) => {
      res.send(result)
  }).catch((err) => {
      res.status(409).send({
          message: err.message
      })
  })
}