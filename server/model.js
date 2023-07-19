const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    required: true,
    type: String
  },
  password: {
    required: true,
    type: String
  },
  role: {
    required: true,
    type: String
  }
})

const orderSchema = new mongoose.Schema({
  user: String,
  dishes: [{
    url: String,
    name: String,
    price: Number,
    amount: Number,
  }]
})

// module.exports = mongoose.model('User', userSchema)
// module.exports = mongoose.model('Order', orderSchema)
module.exports = {
  User: mongoose.model('User', userSchema),
  Order: mongoose.model('Order', orderSchema)
}
