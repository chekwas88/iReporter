const middleware = (err, req, res, next) => {
  if (err) {
    res.json({
      status: 404,
      message: err.message,
    });
  }
  next();
};
module.exports = middleware;
