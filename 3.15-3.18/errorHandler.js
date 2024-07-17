const errorHandler = (error, req, res, next) => {
  console.log(error)

  if(error.name == 'CastError') {
    res.status(400).send({ message: 'Wrong format id'})
  }
  next(error)
}

module.exports = errorHandler
