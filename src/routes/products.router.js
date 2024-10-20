import { Router } from "express";
import productModel from "../models/product.model.js";

const productsRouter = Router();

productsRouter.get('/', async (request, response) => {
    let query = await productModel.paginate({}, {lean: true});

    response.render('products', query)
});

// router.get('/', async (req, res) => {
//     // let page = parseInt(req.query.page);
//     // let row = parseInt(req.query.row);
//     // if (!row || row < 1) {
//     //     row = 1
//     // }

//     let result = await productModel.paginate({}); // console.log(JSON.stringify(result));

//     // result.isValid = !(page <= 0 || page > result.totalPages);
    
//     res.render('products', result)
// });


// const prueba = async ()  => {
//     let results = await productModel;
//     console.log(results);
// }

// console.log(JSON.stringify(prueba()));

export default productsRouter