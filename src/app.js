import express from 'express';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import __dirName from './utils.js';
import viewsRouter from './routes/views.router.js'
import productsRouter from './routes/products.router.js';
import cartModel from './models/cart.model.js';
import productModel from './models/product.model.js';

// environment variables config
dotenv.config();
const URLConnection = process.env.URLMongoDb;

// conexión a la base de datos
mongoose.connect(URLConnection);

// server init
const port = 8080
const app = express();
const httpServer = app.listen(port, () => {
    console.log('Server on port', port);
});

// path routers config
app.use('/', viewsRouter);
app.use('/products', productsRouter)

// handlebars engine config
app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirName + '/views'));
app.set('view engine', 'handlebars');

// set public folder as static files directory
const publicPath = path.join(__dirName, '/public');
app.use(express.static(path.join(publicPath)));

const environment = async () => {
    await mongoose.connect('mongodb+srv://marcovizgarra:coderHouseBackend1@backend1.snfv5.mongodb.net/?retryWrites=true&w=majority&appName=Backend1');
  
    let result = await cartModel.findOneAndUpdate(
      { _id: '6716d0db2a2de553fecbb734' },
      { $push: { items: { item: '6710aaf3a7a1d3159a2513a9' } } },  // Añade un nuevo ítem al array
      { new: true }  // Devolver el documento actualizado
    );
  
    if (!result) {
      console.log('Carrito no encontrado');
      return;
    }
  
    console.log('Carrito actualizado:', result);
  };
  
  environment();