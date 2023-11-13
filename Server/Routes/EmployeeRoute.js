import express from "express";
import pool from "../db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = express.Router();

//Employee Login
router.post("/employee_login", (req, res) => {
  const sql = "SELECT * from employee Where email = ?";
  pool.query(sql, [req.body.email], (err, result) => {
    if (err) return res.json({ loginStatus: false, Error: "Query error" });
    if (result.length > 0) {
      bcrypt.compare(req.body.password, result[0].password, (err, response) => {
        if (err) return res.json({ loginStatus: false, Error: "Wrong Password" });
        if (response) {
          const email = result[0].email;
          const token = jwt.sign(
            { role: "employee", email: email, id: result[0].id },
            "jwt_secret_key",
            { expiresIn: "1d" }
          );
          res.cookie("token", token);
          return res.json({ loginStatus: true, id: result[0].id });
        } else {
          return res.json({
            loginStatus: false,
            Error: "email o password incorrectos",
          });
        }
      });
    }
  });
});

//Detalle de empleado por ID
router.get("/detail/:id", (req, res) => {
  const id = req.params.id;
  const sql = `
    SELECT employee.*, category.name AS category_name, company.name AS company_name
    FROM employee
    INNER JOIN category ON employee.category_id = category.id
    LEFT JOIN company ON employee.company_id = company.id
    WHERE employee.id = ?;
  `;

  pool.query(sql, [id], (err, result) => {
    if (err) return res.json({ Status: false });
    return res.json(result);
  });
});

//Lista los recibos del empleado por ID
router.get("/detail/:id/receipts", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM receipts where employee_id = ?";
  pool.query(sql, [id], (err, result) => {
    if (err) return res.json({ Status: false });
    return res.json(result);
  });
});

//Employee Logout
router.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ Status: true });
});

export { router as EmployeeRouter };
