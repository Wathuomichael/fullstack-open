const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const sum = (value1, value2) => {
    return value1 + value2.likes 
  }
  return blogs === 0 ? 0 : blogs.reduce(sum, 0)
}

const favoriteBlog = (blogs) => {
  let mostLiked = { likes: 0}
  blogs.forEach(blog => {
    if (blog.likes > mostLiked.likes) {
      mostLiked = blog
    }
  })

  return mostLiked
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
