const dbConfig = require('../../config/db.config');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.categories = require('./category.model')(mongoose);
db.products = require('./product.model')(mongoose);
db.carts = require('./cart.model')(mongoose);
db.orders = require('./order.model')(mongoose);

module.exports = db