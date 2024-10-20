import { Router } from "express";
import productModel from "../models/product.model.js";
import productsRouter from '../routes/products.router.js'

const router = Router();

router.get('/', async (req, res) => {
    res.render('index', {})
});

router.get('products', productsRouter);

export default router