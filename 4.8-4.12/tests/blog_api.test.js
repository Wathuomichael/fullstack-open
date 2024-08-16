const { test, beforeEach, after } = require('node:test')
const assert= require('node:assert')
const Blog = require('../models/blog')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')
const connectDB = require('../utils/db')
const mongoose = require('mongoose')

const api = supertest(app)

beforeEach(async () => {
  await connectDB()
  await Blog.deleteMany({})
  console.log('deleted')

  let blogObject = new Blog(helper.initialBlogs[0])  
  await blogObject.save()
  console.log('saved one')

  blogObject = new Blog(helper.initialBlogs[1])  
  await blogObject.save()
  console.log('saved two')
})

test('app returns correct amount of blogs in JSON', async () => {
  console.log('test started')
  await api
  .get('/api/blogs')
  .expect(200)
  .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('check for unique identifier id in blog posts', async () => {
  const response = await api.get('/api/blogs')
  const post = response.body[0]

  assert.ok(post.id)
  assert.strictEqual(post._id, undefined)
})

after(async () => {
  await mongoose.connection.close()
})
