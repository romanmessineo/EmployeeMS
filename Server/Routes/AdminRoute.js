import express from "express";
import con from "../utils/db.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import multer from "multer";
import path from "path";
import { resourceLimits } from "worker_threads";

const router = express.Router();

router.post("/adminlogin", (req, res) => {
  const sql = "SELECT * from admin Where email = ? and password = ?";
  con.query(sql, [req.body.email, req.body.password], (err, result) => {
    if (err) return res.json({ loginStatus: false, Error: "query error" });
    if (result.length > 0) {
      const email = result[0].email;
      const token = jwt.sign(
        { role: "admin", email: email, id: result[0].id },
        "jwt_secret_key", { expiresIn: '1d' }
      );
      res.cookie('token', token)
      return res.json({ loginStatus: true });
    } else {
      return res.json({ loginStatus: false, Error: "email o password incorrectos" });
    }
  });
});

router.get('/category', (req, res) => {
  const sql = "SELECT * FROM category";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "query Error" })
    return res.json({ Status: true, Result: result })
  })
})



router.post('/add_category', (req, res) => {
  const sql = "INSERT INTO category (`name`) VALUES (?)"
  con.query(sql, [req.body.category], (err, result) => {
    if (err) return res.json({ Status: false, Error: "query Error" })
    return res.json({ Status: true })
  })
})


// Configura el almacenamiento para imágenes
const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/Images');
  },
  filename: (req, file, cb) => {
    const id = req.params.id;
    cb(null, `id_${Date.now()}${path.extname(file.originalname)}`);
  },
});

// Configura el almacenamiento para archivos PDF
const pdfStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/Recibos');
  },
  filename: (req, file, cb) => {
    const id = req.params.id;
    cb(null, `receipt_id_${id}_${Date.now()}${path.extname(file.originalname)}`);
  },
});

const uploadImage = multer({ storage: imageStorage });
const uploadPDF = multer({ storage: pdfStorage });


router.post('/upload_receipt/:id', uploadPDF.single('receipt'), (req, res) => {
  const id = req.params.id;
  const receiptFileName = req.file.filename;

  // Obtén la fecha actual
  const currentDate = new Date();

  const sql = `INSERT INTO receipts (employee_id, file_name, upload_date) VALUES (?, ?, ?)`;

  con.query(sql, [id, receiptFileName, currentDate], (err, result) => {
    if (err) {
      return res.json({ Status: false, Error: "Error al cargar el recibo de sueldo" });
    } else {
      return res.json({ Status: true });
    }
  });
});


router.post('/add_employee', uploadImage.single('image'), (req, res) => {
  const sql = `INSERT INTO employee 
  (name, last_name, cuil, email, password, address, salary, image, category_id) 
  VALUES(?)`;
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) return res.json({ Status: false, Error: "query Error" })
    const values = [
      req.body.name,
      req.body.last_name,
      req.body.cuil,
      req.body.email,
      hash,
      req.body.address,
      req.body.salary,
      req.file.filename,
      req.body.category_id
    ]
    con.query(sql, [values], (err, result) => {
      if (err) return res.json({ Status: false, Error: err })
      return res.json({ Status: true })
    })

  })
})

router.post('/add_company', (req, res) => {
  const sql = `INSERT INTO company
  (name, cuit, address, sector) VALUES(?)`;

  const values = [
    req.body.name,
    req.body.cuit,
    req.body.address,
    req.body.sector,

  ]
  con.query(sql, [values], (err, result) => {
    if (err)
      if (err) return res.json({ Status: false, Error: err })
    return res.json({ Status: true })
  });

})

router.get('/employee', (req, res) => {
  const sql = `
    SELECT employee.*, category.name AS category_name
    FROM employee
    INNER JOIN category ON employee.category_id = category.id;
  `;
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "query Error" });
    return res.json({ Status: true, Result: result });
  });
});

router.get('/company', (req, res) => {
  const sql = "SELECT * FROM company";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "query Error" })
    return res.json({ Status: true, Result: result })
  })

})

router.get('/employee/:id', (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM employee WHERE id = ?";
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({ Status: false, Error: "query Error" })
    return res.json({ Status: true, Result: result })
  })
})

router.put('/edit_employee/:id', (req, res) => {
  const id = req.params.id;
  const sql = `UPDATE employee set name= ?, last_name= ?, cuil= ?, email= ?, password= ?, salary = ?, address = ?, category_id = ? WHERE id = ?`
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) return res.json({ Status: false, Error: "query Error" })
  const values = [
    req.body.name,
    req.body.last_name,
    req.body.cuil,
    req.body.email,
    hash,
    req.body.salary,
    req.body.address,
    req.body.category_id
  ]
  con.query(sql, [...values, id], (err, result) => {
    if (err) return res.json({ Status: false, Error: "query Error" })
    return res.json({ Status: true, Result: result })
  })
  })
})

router.delete('/delete_employee/:id', (req, res) => {
  const id = req.params.id;
  const sql = "delete from employee where id = ?"
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({ Status: false, Error: "query Error" + err })
    return res.json({ Status: true, Result: result })
  })
})

router.get('/admin_count', (req, res) => {
  const sql = "select count(id) as admin from admin";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "query Error" + err })
    return res.json({ Status: true, Result: result })
  })
})

router.get('/employee_count', (req, res) => {
  const sql = "select count(id) as employee from employee";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "query Error" + err })
    return res.json({ Status: true, Result: result })
  })
})

router.get('/salary_count', (req, res) => {
  const sql = "select sum(salary) as salaryOFEmp from employee";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "query Error" + err })
    return res.json({ Status: true, Result: result })
  })
})

router.get('/admin_records', (req, res) => {
  const sql = "select * from admin"
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" + err })
    return res.json({ Status: true, Result: result })
  })
})

router.get('/logout', (req, res) => {
  res.clearCookie('token')
  return res.json({ Status: true })
})

export { router as adminRouter };
