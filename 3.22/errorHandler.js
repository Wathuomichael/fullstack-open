const errorHandler = (error, req, res, next) => {
  console.log(error)

  if(error.name == 'CastError') {
    res.status(400).send({ message: 'Wrong format id'})
  }

  if(error.name == 'ValidationError') {
    res.status(400).send(error)
    console.log(error)
  }

  next(error)
}

module.exports = errorHandler
