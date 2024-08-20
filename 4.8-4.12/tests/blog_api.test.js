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

test('checks whether a new blog post is created', async () => {
  const newPost = {
    title: 'SUB settings',
    author: 'redDevilMike',
    url: 'x.com/reddevilmike',
    likes: 1000
  }
  await api
  .post('/api/blogs')
  .send(newPost)
  .expect(201)
  .expect('Content-Type', /application\/json/)
  
  const response = await api.get('/api/blogs')
  assert(response.body.length, helper.initialBlogs.length + 1)
  
  const contents = response.body.map(r => r.title)
  assert(contents.includes('SUB settings'))
})

test('verifies likes has a default value of zero', async () => {
  const newPost = {
    title: 'SQUAD DEPTH settings',
    author: 'redDevilMike',
    url: 'x.com/reddevilmike'
  }
  await api
  .post('/api/blogs')
  .send(newPost)
  .expect(201)
  .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const contents = response.body.map(r => r.likes)
  assert(contents.includes(0))
})

test('verifies backend response to missing properties', async () => {
  const newPost = {
    author: 'redDevilMike',
    url: 'x.com/reddevilmike',
    likes: 500
  }
  await api
  .post('/api/blogs')
  .send(newPost)
  .expect(400)
})

after(async () => {
  await mongoose.connection.close()
})
