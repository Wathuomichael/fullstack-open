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

test('deletion of a blog succeeds with code 204 if id is valid', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
  .delete(`/api/blogs/${blogToDelete.id}`)
  .expect(204)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtStart.length - 1, blogsAtEnd.length)
  const contents = blogsAtEnd.map(r => r.title)
  assert(!contents.includes(blogToDelete.title))
})

test('updating a blog succeeds with code 200 if id is valid', async () => {
  const blogsAtStart = await helper.blogsInDb()
  let likesAtStart = 0
  blogsAtStart.forEach(blog => likesAtStart += blog.likes)
  const blogToUpdate = blogsAtStart[0]
  const updatedBlog = {
    author: 'redDevilMike',
    title: 'DM settings',
    url: 'x.com/reddevilmike',
    likes: 10000
  }

  await api
  .put(`/api/blogs/${blogToUpdate.id}`)
  .send(updatedBlog)
  .expect(200)
  
  const blogsAtEnd = await helper.blogsInDb()
  let likesAtEnd = 0
  blogsAtEnd.forEach(blog => likesAtEnd += blog.likes)
  assert.strictEqual(blogsAtStart.length, blogsAtEnd.length)
  assert.notStrictEqual(likesAtStart, likesAtEnd)
})

after(async () => {
  await mongoose.connection.close()
})
