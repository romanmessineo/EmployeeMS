import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import multer from "multer";
import path from "path";
import { resourceLimits } from "worker_threads";
import pool from "../utils/db.js";

const router = express.Router();

//Admin Login
router.post("/adminlogin", (req, res) => {
  const sql = "SELECT * from admin Where email = ? and password = ?";
  pool.query(sql, [req.body.email, req.body.password], (err, result) => {
    if (err) return res.json({ loginStatus: false, Error: "query error" });
    if (result.length > 0) {
      const email = result[0].email;
      const token = jwt.sign(
        { role: "admin", email: email, id: result[0].id },
        "jwt_secret_key",
        { expiresIn: "1d" }
      );
      res.cookie("token", token);
      return res.json({ loginStatus: true });
    } else {
      return res.json({
        loginStatus: false,
        Error: "email o password incorrectos",
      });
    }
  });
});

//lista las categorias
router.get("/category", (req, res) => {
  const sql = "SELECT * FROM category";
  pool.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "query Error" });
    return res.json({ Status: true, Result: result });
  });
});

//añade categorias
router.post("/add_category", (req, res) => {
  const sql = "INSERT INTO category (`name`) VALUES (?)";
  pool.query(sql, [req.body.category], (err, result) => {
    if (err) return res.json({ Status: false, Error: "query Error" });
    return res.json({ Status: true });
  });
});

//add company
router.post("/add_company", (req, res) => {
  const sql =
    "INSERT INTO company (`name`, `cuit`, `address`, `sector`) VALUES (?, ?, ?, ?)";
  pool.query(
    sql,
    [req.body.name, req.body.cuit, req.body.address, req.body.sector],
    (err, result) => {
      if (err) {
        return res.json({ Status: false, Error: "Error en la consulta SQL" });
      }
      return res.json({ Status: true });
    }
  );
});

// Configura el almacenamiento para imágenes
const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/Images");
  },
  filename: (req, file, cb) => {
    const id = req.params.id;
    cb(null, `id_${Date.now()}${path.extname(file.originalname)}`);
  },
});

// Configura el almacenamiento para archivos PDF
const pdfStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/Recibos");
  },
  filename: (req, file, cb) => {
    const id = req.params.id;
    cb(
      null,
      `receipt_id_${id}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const uploadImage = multer({ storage: imageStorage });
const uploadPDF = multer({ storage: pdfStorage });

//Subir recibos de sueldo
router.post("/upload_receipt/:id", uploadPDF.single("receipt"), (req, res) => {
  const id = req.params.id;
  const receiptFileName = req.file.filename;

  // Obtén la fecha actual
  const currentDate = new Date();

  const sql = `INSERT INTO receipts (employee_id, file_name, upload_date) VALUES (?, ?, ?)`;

  pool.query(sql, [id, receiptFileName, currentDate], (err, result) => {
    if (err) {
      return res.json({
        Status: false,
        Error: "Error al cargar el recibo de sueldo",
      });
    } else {
      return res.json({ Status: true });
    }
  });
});

// add empleado

router.post("/add_employee", uploadImage.single("image"), (req, res) => {
  const sql = `INSERT INTO employee 
  (name, last_name, cuil, email, password, address, salary, image, category_id, company_id) 
  VALUES(?)`;

  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) return res.json({ Status: false, Error: "query Error" });

    // Check if req.file is defined, use req.file.filename, otherwise use defaultImagePath
    const imageFileName = req.file ? req.file.filename : "/imagesNullpng.png";


    const values = [
      req.body.name,
      req.body.last_name,
      req.body.cuil,
      req.body.email,
      hash,
      req.body.address,
      req.body.salary,
      imageFileName,
      req.body.category_id,
      req.body.company_id,
    ];

    pool.query(sql, [values], (err, result) => {
      if (err) return res.json({ Status: false, Error: err });
      return res.json({ Status: true });
    });
  });
});


//tabla empleados
router.get("/employee", (req, res) => {
  const sql = `
    SELECT employee.*, category.name AS category_name, company.name AS company_name
    FROM employee
    INNER JOIN category ON employee.category_id = category.id
    LEFT JOIN company ON employee.company_id = company.id;

  `;
  pool.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "query Error" });
    return res.json({ Status: true, Result: result });
  });
});

//tabla de empresas
router.get("/company", (req, res) => {
  const sql = "SELECT * FROM company";
  pool.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "query Error" });
    return res.json({ Status: true, Result: result });
  });
});

//trae los datos para editar empleados
router.get("/employee/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM employee WHERE id = ?";
  pool.query(sql, [id], (err, result) => {
    if (err) return res.json({ Status: false, Error: "query Error" });
    return res.json({ Status: true, Result: result });
  });
});

//edita empleados con los nuevos datos
router.put("/edit_employee/:id", (req, res) => {
  const id = req.params.id;
  const sql = `UPDATE employee set name= ?, last_name= ?, cuil= ?, email= ?, password= ?, salary = ?, address = ?, category_id = ? WHERE id = ?`;
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) return res.json({ Status: false, Error: "query Error" });
    const values = [
      req.body.name,
      req.body.last_name,
      req.body.cuil,
      req.body.email,
      hash,
      req.body.salary,
      req.body.address,
      req.body.category_id,
    ];
    pool.query(sql, [...values, id], (err, result) => {
      if (err) return res.json({ Status: false, Error: "query Error" });
      return res.json({ Status: true, Result: result });
    });
  });
});

// Borrar empleados
router.delete("/delete_employee/:id", (req, res) => {
  const id = req.params.id;

  // Primero, borra los recibos asociados al empleado
  const deleteReceiptsQuery = "DELETE FROM receipts WHERE employee_id = ?";
  pool.query(deleteReceiptsQuery, [id], (deleteErr, deleteResult) => {
    if (deleteErr) {
      return res.json({ Status: false, Error: "Error al borrar recibos: " + deleteErr });
    }

    // Después, borra al empleado
    const deleteEmployeeQuery = "DELETE FROM employee WHERE id = ?";
    pool.query(deleteEmployeeQuery, [id], (err, result) => {
      if (err) {
        return res.json({ Status: false, Error: "Error al borrar empleado: " + err });
      }

      return res.json({ Status: true, Result: result });
    });
  });
});


//Home conteo de administrados
router.get("/admin_count", (req, res) => {
  const sql = "select count(id) as admin from admin";
  pool.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "query Error" + err });
    return res.json({ Status: true, Result: result });
  });
});

//Home conteo de empleados
router.get("/employee_count", (req, res) => {
  const sql = "select count(id) as employee from employee";
  pool.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "query Error" + err });
    return res.json({ Status: true, Result: result });
  });
});

//Home conteo de empresas
router.get("/company_count", (req, res) => {
  const sql = "select count(id) as company from company";
  pool.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "query Error" + err });
    return res.json({ Status: true, Result: result });
  });
});

//Home conteo de salarios
router.get("/salary_count", (req, res) => {
  const sql = "select sum(salary) as salaryOFEmp from employee";
  pool.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "query Error" + err });
    return res.json({ Status: true, Result: result });
  });
});

//Home lista de administradores
router.get("/admin_records", (req, res) => {
  const sql = "select * from admin";
  pool.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" + err });
    return res.json({ Status: true, Result: result });
  });
});

//Admin logout
router.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ Status: true });
});

export { router as adminRouter };
