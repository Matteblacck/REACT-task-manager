const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Нет авторизации" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;  // Декодируем токен в объект пользователя
    next();
  } catch (error) {
    res.status(401).json({ message: "Неверный токен" });
  }
};

module.exports = authMiddleware;