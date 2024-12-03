module.exports = mongoose => {
  const schema = mongoose.Schema(
    {
      jumlah: {
        type: Number,
        required: true
      },
      total_harga: {
        type: Number,
        required: true
      },
      products: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products'
      },
      keterangan: {
        type: String,
      }
    }
  )

  const Cart = mongoose.model("carts", schema);
  return Cart;
};