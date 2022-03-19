const adminMiddleware = (req, res, next) => {
  if (!req.role.admin) {
    return res.status(401).json({ msg: "access denied" });
  }
  next();
};
module.exports = adminMiddleware;
