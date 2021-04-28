const mongoose = require("mongoose");

const pets = mongoose.model("Pet", {
  nombre: String,
  tipo: String,
  description: String,
});

module.exports = pets;
