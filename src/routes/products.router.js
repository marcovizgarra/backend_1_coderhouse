import { Router } from "express";
import productModel from "../models/product.model.js";

const productsRouter = Router();

productsRouter.get('/', async (request, response) => {
    let page = parseInt(request.query.page);
    let row = parseInt(request.query.row);

    if (!row || row < 1) {
    row = 1
    };


    let query = await productModel.paginate({}, {page, limit: row, lean: true});

    response.render('products', query)
});

export default productsRouter