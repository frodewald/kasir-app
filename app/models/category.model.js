module.exports = mongoose => {
  const schema = mongoose.Schema(
    {
      nama: {
        type: String,
        required: true
      }
    }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;  // Ganti _id dengan id untuk kemudahan akses
    return object;
  });
  
  const Category = mongoose.model("categories", schema);
  return Category;
};