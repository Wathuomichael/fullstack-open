const errorHandler = async (error, request, response, next) => {
  console.log(error)
  if(error.name = 'ValidationError') {
    response.status(400).json({
      message: 'Invalid user request'
    })
  }
}

module.exports = errorHandler
