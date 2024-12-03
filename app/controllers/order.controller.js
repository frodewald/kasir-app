const db = require('../models');

const Orders = db.orders;

exports.findAllOrders = (req, res) => {
  Orders.find()
    .populate('menus')
    .then((result) => {
      res.send(result);
    }).catch((err) => {
      res.status(409).send({
        message: err.message
      })
    })
}

exports.createOrders = async (req, res) => {
  try {
    const { total_bayar, menus } = req.body;

    const createOrderData = {
      total_bayar,
      menus
    }

    const createOrderToDB = await Orders.create(createOrderData);
    res.status(201).send({
      message: 'Order Created successfully',
      order: createOrderToDB
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Failed to create order' });
  }
}