import express from 'express';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import __dirName from './utils.js';
import viewsRouter from './routes/views.router.js'
import cartModel from './models/cart.model.js';


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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// path routers config
app.use('/', viewsRouter);

// handlebars engine config
app.engine('handlebars', handlebars.engine({
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true
  }
}));
app.set('views', path.join(__dirName + '/views'));
app.set('view engine', 'handlebars');

// set public folder as static files directory
const publicPath = path.join(__dirName, '/public');
app.use(express.static(path.join(publicPath)));