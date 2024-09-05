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

export default { getAll, addBlog }
