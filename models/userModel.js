const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const user = new Schema({
  username: String,
  title: String,
  description: String
});


module.exports = mongoose.model('User', user)