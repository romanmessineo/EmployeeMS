import dotenv from 'dotenv';
dotenv.config();


import express from "express";
import cors from 'cors';
import { adminRouter } from "./Routes/AdminRoute.js";
import { EmployeeRouter } from "./Routes/EmployeeRoute.js";
import Jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import {
    PORT,
    JWT_SECRET_KEY,
    CORS_ORIGIN,
} from './config.js';

const app = express();

app.use(cors({
    origin: [CORS_ORIGIN],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.use('/auth', adminRouter);
app.use('/employee', EmployeeRouter);
app.use(express.static('Public'));


const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if (token) {
        Jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
            if (err) return res.status(401).json({ Status: false, Error: "Wrong Token" });
            req.id = decoded.id;
            req.role = decoded.role;
            next();
        });
    } else {
        return res.status(401).json({ Status: false, Error: "Not authenticated" });
    }
};

app.get('/verify', verifyUser, (req, res) => {
    return res.json({ Status: true, role: req.role, id: req.id });
});

app.get('/ping'), (req, res) => {
    const result = pool.query(`SELECT "Hola mundo!" as RESULT`);
    console.log(result)
    res.send('Welcome server')
}

// Manejo de errores global
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ Status: false, Error: 'Something went wrong!' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
