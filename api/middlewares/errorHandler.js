module.exports = (err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({ ok: false, message: err.message || 'Internal server error' });
};
