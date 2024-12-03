module.exports = mongoose => {
  const schema = mongoose.Schema(
    {
      kode: {
        type: String,
        required: true
      },
      nama: {
        type: String,
        required: true
      },
      harga: {
        type: Number,
        required: true
      },
      is_ready: {
        type: Boolean,
        required: true
      },
      gambar: {
        type: String,
        required: true
      },
      category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categories' 
      },
    }
  )

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;  // Ganti _id dengan id untuk kemudahan akses
    return object;
  });

  const Product = mongoose.model("products", schema);
  return Product;
}