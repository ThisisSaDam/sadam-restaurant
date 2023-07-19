const express = require('express');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const authenticateToken = require('./jwt');
const {User, Order} = require('./model')
dotenv.config();

mongoose.connect(process.env.DATABASE_URL);
const database = mongoose.connection
database.once('connected', () => {
  console.log('Database Connected');
})

const app = express()
const port = 3003

const generateAccessToken = (username) => {
  return jwt.sign({username}, process.env.TOKEN_SECRET, { expiresIn: '1d' });
}

const allowedOrigins = ['http://localhost:3000', 'https://restaurant-frontend-dxkk.onrender.com']
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors(corsOptions));
app.use(express.json())

app.post('/api/login', async (req, res) => {
  const {username, password} = req.body
  const users = await (User
    .where('username', username)
    .where('password', password)).exec();

  if (users.length === 0) res.json({message: 'error'})
  else {
    const {role} = users[0];
    const token = generateAccessToken(username)
    res.json({message: 'success', token, role})
  }
})

app.post('/api/register', async (req, res) => {
  const {username, password} = req.body
  await User.create({
    username, password,
    role: 'USER',
  });

  res.json({
    message: 'success'
  })
})

app.post('/api/logout', authenticateToken, (req, res) => {
  res.json({
    message: 'success'
  })
})

app.get('/api/order', authenticateToken, async (req, res) => {
  const { username } = req.user
  const user = await User.findOne({username})
  if (user.role !== 'ADMIN') {
    res.status(401)
    res.json({message: 'error'})
  } else {
    const orders = await Order.find()
    res.json({message: 'success', orders})
  }
})

app.post('/api/order', authenticateToken, async (req, res) => {
  const {dishes} = req.body
  await Order.create({
    user: req.user.username,
    dishes,
  })
  res.json({
    message: 'success'
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
