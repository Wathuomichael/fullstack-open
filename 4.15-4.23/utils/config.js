require('dotenv').config()

const PORT = process.env.PORT

const NODE_ENV = process.env.NODE_ENV

const MONGODB_URI = NODE_ENV === 'test' 
  ? process.env.TEST_MONGO_URI
  : process.env.MONGO_URI

const secret = process.env.JWT_SECRET


module.exports = {
  MONGODB_URI,
  PORT,
  secret,
  NODE_ENV
}
