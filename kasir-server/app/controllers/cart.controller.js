const mongoose = require('mongoose');

const db = require('../models');

const Carts = db.carts

exports.findCart = (req, res) => {
  Carts.find()
    .populate('products')
    .then((result) => {
      res.send(result);
    }).catch((err) => {
      res.status(409).send({
        message: err.message
      })
    })
}

exports.findCartByIdProduct = (req, res) => {
  const {productId} = req.params
  Carts.findOne({ products: productId })
  .populate('products')
  .then((result) => {
    res.send(result);
  }).catch((err) => {
    res.status(409).send({
      message: err.message
    })
  })
}

exports.insertProductToCart = async (req, res) => {
  const { product, keterangan } = req.body
  const product_id = new mongoose.Types.ObjectId(product.id);

  try {
    const cartData = {
      jumlah: 1,
      total_harga: product.harga,
      products: product_id,
      keterangan
    };

    const createCart = await Carts.create(cartData);
    return res.status(201).send({
      message: 'Cart created successfully',
      cart: createCart
    }); 
  } catch (error) {
    console.error('Error creating cart:', error);
    res.status(500).json({ message: 'Failed to create cart' });
  }
}

exports.updateProductInCart = async (req, res) => {
  const { productId } = req.params;
  const { keterangan, jumlah, total_harga  } = req.body;
  try {
    const getCart = await Carts.findOne({ products: productId }).populate('products');

    if (!getCart) {
      return res.status(404).send({ message: 'Cart not found' });
    }
  
    // Jika produk sudah ada, update jumlah produk
    getCart.jumlah = jumlah;
  
    // Update total harga setelah perubahan jumlah
    getCart.total_harga = total_harga;

    getCart.keterangan = keterangan;
  
    // Simpan perubahan pada cart
    await getCart.save();
  
    res.status(200).send({
      message: 'Cart updated successfully'
    });
  } catch (error) {
    console.error('Error updating cart:', error);
    res.status(500).json({ message: 'Failed to update cart' });
  }
}

exports.deleteAllCart = async (req, res) => {
  try {
    await Carts.deleteMany({});
    res.status(200).send({
      message: 'All Cart Deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting cart:', error);
    res.status(500).json({ message: 'Failed to delete cart' });
  }
}

exports.deleteCartByProductId = async (req, res) => {
  const { productId } = req.params
  try {
    await Carts.deleteOne({ products: productId});
    res.status(200).send({
      message: 'Cart Deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting cart:', error);
    res.status(500).json({ message: 'Failed to delete cart' });
  }
}