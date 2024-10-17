import { Router } from "express";
import productModel from "../models/product.model.js";

const router = Router();

router.get('/', (req, res) => {
    res.render('index', {})
});

export default router