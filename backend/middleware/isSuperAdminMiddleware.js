const { Admins } = require("../models/models");
module.exports = async function (req, res, next) {
  if (req.method === "OPTIONS") {
    next();
  }
  try {
    const admin_id = req.headers.authorization;
    const admin = await Admins.findOne({ where: { tg_id: admin_id } });
    if (admin && admin.role === "superadmin") {
      next();
    } else {
      res.status(403).json({ message: "Forbidden" });
    }
  } catch (e) {
    res.status(403).json({ message: "Not authorized" });
  }
};
