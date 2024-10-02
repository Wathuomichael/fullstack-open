import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}` 
}

const getConfig = () => ({
  headers: { Authorization: token }
})

const getAll = async () => {
  const response =  await axios.get(baseUrl, getConfig())
  return response.data
}

const addBlog = async (blog) => {
  const addedBlog = await axios.post(baseUrl, blog, getConfig())
  return addedBlog
}

const updateBlog = async(newBlog, id) => {
  const updatedBlog = await axios.put(`${baseUrl}/${id}`, newBlog, getConfig())
  return updatedBlog
}

const deleteBlog = async(id) => {
  const deletedBlog = await axios.delete(`${baseUrl}/${id}`, getConfig())
  return deletedBlog
}

export default { getAll, addBlog, updateBlog, deleteBlog, setToken }
