const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/productdb");
module.exports = mongoose.connection;