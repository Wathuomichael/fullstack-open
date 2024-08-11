const _ = require('lodash');

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
  let mostLiked = { likes: 0 }
  blogs.forEach(blog => {
    if (blog.likes > mostLiked.likes) {
      mostLiked = blog
    }
  })

  return mostLiked
}


const mostBlogs = (blogs) => {
  const groupedByAuthor = _.groupBy(blogs, 'author');

  const blogCounts = _.map(groupedByAuthor, (blogs, author) => ({
    author,
    blogs: blogs.length,
  }));

  const topAuthor = _.maxBy(blogCounts, 'blogs');

  return topAuthor;
};

const mostLikedAuthor = (blogs) => {
  const groupedByAuthor = _.groupBy(blogs, "author");

  const blogCounts = _.map(groupedByAuthor, (blogs, author) => {
    return {
      author,
      likes: _.sumBy(blogs, "likes"),
    };
  });

  const topAuthor = _.maxBy(blogCounts, "likes");

  return topAuthor
};


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikedAuthor
}
