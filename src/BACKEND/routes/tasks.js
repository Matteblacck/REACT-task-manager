const express = require("express");
const pool = require("../db");
const router = express.Router();

// Получить все задачи пользователя
router.get("/", async (req, res) => {
  try {
    const tasks = await pool.query(
      "SELECT * FROM tasks WHERE user_id = $1 ORDER BY created_at DESC",
      [req.user.id]
    );
    res.json(tasks.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

// Создать новую задачу
router.post("/", async (req, res) => {
  const { title, description, status, due_date } = req.body;
  try {
    const newTask = await pool.query(
      "INSERT INTO tasks (title, description, status, due_date, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [title, description, status, due_date, req.user.id]
    );
    res.status(201).json(newTask.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

// Обновить задачу
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, status, due_date } = req.body;
  try {
    const updatedTask = await pool.query(
      "UPDATE tasks SET title = $1, description = $2, status = $3, due_date = $4 WHERE id = $5 AND user_id = $6 RETURNING *",
      [title, description, status, due_date, id, req.user.id]
    );
    if (updatedTask.rows.length === 0) {
      return res.status(404).json({ message: "Задача не найдена" });
    }
    res.json(updatedTask.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

// Удалить задачу
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTask = await pool.query(
      "DELETE FROM tasks WHERE id = $1 AND user_id = $2 RETURNING *",
      [id, req.user.id]
    );
    if (deletedTask.rows.length === 0) {
      return res.status(404).json({ message: "Задача не найдена" });
    }
    res.json({ message: "Задача удалена" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

module.exports = router; 