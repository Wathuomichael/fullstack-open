const User = require('../models/user')

const initialUsers = [
  {
    username: 'heinzKetchup',
    name: 'Heinz',
    password: 'tomatoketchup'
  },
  {
    username: 'cadburyChocolate',
    name: 'Cadbury',
    password: 'cocoaNsugar'
  }
]

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialUsers,
  usersInDb
}
