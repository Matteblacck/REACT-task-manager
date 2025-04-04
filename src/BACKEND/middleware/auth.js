const jwt = require("jsonwebtoken");
const pool = require("../db");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    
    if (!token) {
      return res.status(401).json({ message: "Требуется авторизация" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await pool.query("SELECT * FROM users WHERE id = $1", [decoded.userId]);

    if (user.rows.length === 0) {
      return res.status(401).json({ message: "Пользователь не найден" });
    }

    req.user = user.rows[0];
    next();
  } catch (error) {
    res.status(401).json({ message: "Неверный токен" });
  }
};

module.exports = auth; 