const supertest = require('supertest')
const { test, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const app = require('../app')
const User = require('../models/user')
const helper = require('../utils/user_helper')
const mongoose = require('mongoose')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})

  let userObject = new User(helper.initialUsers[0])
  await userObject.save()

  userObject = new User(helper.initialUsers[1])
  await userObject.save()
})

test('app returns correct amount of users', async () => {
  await api
  .get('/api/users')
  .expect(200)
  .expect('Content-Type', /application\/json/)

  const users = await helper.usersInDb()
  assert.strictEqual(helper.initialUsers.length, users.length)
})

test('adding users to database', async () => {
  const user = {
    username: 'chilliSauce',
    name: 'Chilli',
    password: 'chillisauce'
  }
  await api
  .post('/api/users')
  .send(user)
  .expect(201)

  const users = await helper.usersInDb()
  assert.strictEqual(helper.initialUsers.length + 1, users.length)
  const content = users.map(user => user.username)
  assert(content.includes('chilliSauce'))
})

test('invalid user operation', async () => {
  const user = {
    username: 'mwathuo',
    name: 'Mark Wathuo',
    password: 'mw'
  }

  await api
  .post('/api/users')
  .send(user)
  .expect(400)

  const users = await helper.usersInDb()
  assert.strictEqual(helper.initialUsers.length, users.length)
})

after(async () => {
  await mongoose.connection.close()
})
