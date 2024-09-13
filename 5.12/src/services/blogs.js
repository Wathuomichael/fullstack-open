import axios from 'axios'
const baseUrl = '/api/blogs'


const loggedInUser = JSON.parse(window.localStorage.getItem('loggedInUser'))
const config = {
  headers: { Authorization: `Bearer ${loggedInUser.token}` }
}
const getAll = async () => {
  const response =  await axios.get(baseUrl, config)
  return response.data
}

const addBlog = async (blog) => {
  const addedBlog = await axios.post(baseUrl, blog, config)
  return addedBlog
}

const updateBlog = async(newBlog, id) => {
  const updatedBlog = await axios.put(`${baseUrl}/${id}`, newBlog, config)
  return updatedBlog
}

const deleteBlog = async(id) => {
  const deletedBlog = await axios.delete(`${baseUrl}/${id}`, config)
  return deletedBlog
}

export default { getAll, addBlog, updateBlog, deleteBlog }
