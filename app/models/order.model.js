module.exports = mongoose => {
  const schema = mongoose.Schema(
    {
      total_bayar: {
        type: Number,
        required: true
      },
      menus: [{
        type: Object,
        required: true
      }]
    }
  )

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;  // Ganti _id dengan id untuk kemudahan akses
    return object;
  });

  const Order = mongoose.model("orders", schema);
  return Order;
}