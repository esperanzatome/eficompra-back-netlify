
import express, { Router } from "express";
import serverless from "serverless-http";
import cors from "cors";
import { connection } from "../../config.db";
import dotenv from "dotenv";

const api = express();
const router = Router();
api.use(cors());
api.use("/api/",router);


dotenv.config();





router.get("/", (req, res) => res.send("Hello World!"));
router.get("/productosDeSupermercados",(request, response) => {
    connection.query
("SELECT distinct id,name,supermarket,zip_code,category,url,description,trademark,trademark_propietary_flag,price,reference_price,reference_unit,offer_flag,offer_price,offer_type FROM `productosdesupermercados.sql`ORDER BY reference_price ASC LIMIT 100", 
    (error, results) => {
        if(error)
            throw error;
        response.status(200).json(results);
    });
});

router.post("/productosDeSupermercados",(request, response) => {
    const {id,url,supermarket,zip_code,category,name,description,
    trademark,trademark_propietary_flag,price,reference_price,reference_unit,
    offer_flag,offer_price,offer_type,insert_date} = request.body;
    connection.query("INSERT INTO productosdesupermercados(id,url,supermarket,zip_code,category,name,description,trademark,trademark_propietary_flag,price,reference_price,reference_unit,offer_flag,offer_price,offer_type,insert_date) VALUES (?,?,?,?) ", 
    [id,url,supermarket,zip_code,category,name,description,trademark,trademark_propietary_flag,price,reference_price,reference_unit,offer_flag,offer_price,offer_type,insert_date],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json({"Item añadido correctamente": results.affectedRows});
    });
});

router.delete("/productosDeSupermercados/:id",(request, response) => {
    const id = request.params.id;
    connection.query("Delete from productosdesupermercados where id = ?", 
    [id],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json({"Item eliminado":results.affectedRows});
    });
});





export const handler = serverless(api);
