const { test, beforeEach, after } = require('node:test')
const assert= require('node:assert')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')
const connectDB = require('../utils/db')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  console.log('deleted blogs')

  let blogObject = new Blog(helper.initialBlogs[0])  
  await blogObject.save()
  console.log('added blog one')

  blogObject = new Blog(helper.initialBlogs[1])  
  await blogObject.save()
  console.log('added blog two')

  await User.deleteMany({})
  const user = new User({
    username: 'testuser',
    name: 'testuser',
    password: await bcrypt.hash('testpassword', 10)
  });
  await user.save();
  console.log('added user')

  const response = await api
  .post('/api/users/login')
  .send({ username: 'testuser', password: 'testpassword'})
  .expect(200)
  console.log('finished login')

  token = response.body.token
  console.log('finished before', token)
})

test('app returns correct amount of blogs in JSON', async () => {
  console.log('test started')
  await api
  .get('/api/blogs')
  .set('Authorization',`Bearer ${token}`)
  .expect(200)
  .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
})

test('check for unique identifier id in blog posts', async () => {
  const response = await api.get('/api/blogs').set('Authorization', `Bearer ${token}`)
  const post = response.body[0]

  assert.ok(post.id)
  assert.strictEqual(post._id, undefined)
})

test('checks whether a new blog post is created', async () => {
  const newPost = {
    title: 'SUB settings',
    author: 'testuser',
    url: 'x.com/testuser',
    likes: 1000
  }
  await api
  .post('/api/blogs')
  .set('Authorization',`Bearer ${token}`)
  .send(newPost)
  .expect(201)
  .expect('Content-Type', /application\/json/)
  
  const blogsAtEnd = await helper.blogsInDb()
  assert(blogsAtEnd.length, helper.initialBlogs.length + 1)
  
  const contents = blogsAtEnd.map(r => r.title)
  assert(contents.includes('SUB settings'))
})

test('adding blog without token fails with proper status code', async () => {
  const newPost = {
    title: 'testnotoken',
    author: 'testuser',
    url: 'x.com/testuser',
    likes: 200
  }

  await api
  .post('/api/blogs')
  .send(newPost)
  .expect(401)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(helper.initialBlogs.length, blogsAtEnd.length)
})

test('verifies likes has a default value of zero', async () => {
  const newPost = {
    title: 'SQUAD DEPTH settings',
    author: 'redDevilMike',
    url: 'x.com/reddevilmike'
  }
  await api
  .post('/api/blogs')
  .set('Authorization',`Bearer ${token}`)
  .send(newPost)
  .expect(201)
  .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  const contents = blogsAtEnd.map(r => r.likes)
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
  .set('Authorization',`Bearer ${token}`)
  .send(newPost)
  .expect(400)
})

test('deletion of a blog succeeds with code 204 if id is valid', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
  .delete(`/api/blogs/${blogToDelete.id}`)
  .set('Authorization',`Bearer ${token}`)
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
