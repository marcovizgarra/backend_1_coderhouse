import { Router } from "express";
import cartModel from "../models/cart.model.js";

const cartRouter = Router();

cartRouter.get('/', async (req, res) => {
    try {
        // Get cart with populate
        const cart = await cartModel.findOne({ _id: '671898b6ffad40be7c8c92ea' })
          .populate('items.item');
    
        // Rendering views with items (populate)
        res.render('cart', {
            cartItems: cart.items.map(i => ({
                product: i.item,
                quant: i.quant
            }))
        });
        
      } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los productos');
      }
});

export default cartRouter