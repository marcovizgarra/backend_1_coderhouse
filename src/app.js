import express from 'express';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import __dirName from './utils.js';
import viewsRouter from './routes/views.router.js'
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
    console.log('Server on port ', port);
});

// path routers config
app.use('/', viewsRouter);

// handlebars engine config
app.engine('handlebars', handlebars.engine());
app.set('views', __dirName + '/views');
app.set('view engine', 'handlebars');

// set public folder as static files directory
const publicPath = path.join(__dirName, '/public');
app.use(express.static(path.join(publicPath)));

// PRODUCTOS INSERTADOS A LA BASE DE DATOS MONGO
// const insertProducts = async () => {
//     let insertion = await productModel.insertMany(
//         [
//             {
//                 title: 'Red Dead Redemption II',
//                 platform: 'PS4',
//                 brief_overview: 'Disfruta de una aventura única en el Salvaje Oeste',
//                 full_description: 'Red Dead Redemption 2 es un videojuego de acción-aventura de mundo abierto con temática del Salvaje Oeste desarrollado y publicado por Rockstar Games. El juego es la tercera entrada de la serie Red Dead y una precuela del juego de 2010 Red Dead Redemption.',
//                 image: 'https://s.pacn.ws/1/p/rj/red-dead-redemption-2-495571.10.jpg?v=p8e2fk&width=800&crop=1204,1500',
//                 price: 60000
//             },
//             {
//                 title: 'God of War',
//                 platform: 'PS4',
//                 brief_overview: 'El regreso de Kratos, esta vez en la mitología nórdica',
//                 full_description: 'God of War es un videojuego de acción-aventura hack and slash en tercera persona desarrollado por SCE Santa Monica Studio y publicado por Sony Interactive Entertainment. El juego se lanzó para PlayStation 4 en abril de 2018, con un puerto para Windows lanzado en enero de 2022',
//                 image: 'https://ams3.digitaloceanspaces.com/web01.ho-sting/videogamesartwork_com/public/concept-art/1624009275/god-of-war--key-art--cover-art-01--by-jose-cabrera.jpg',
//                 price: 53000
//             },
//             {
//                 title: 'Assassins Creed Origins',
//                 platform: 'XBOX ONE',
//                 brief_overview: 'Esta entrega de AC, ambientado en el misterioso antiguo Egipto, es un nuevo comienzo para la saga',
//                 full_description: 'Assassins Creed Origins es un videojuego de acción-aventura y RPG de la saga Assassins Creed cuya fecha de lanzamiento fue el 27 de octubre de 2017. Está disponible para las plataformas PlayStation 4, Xbox One, Stadia, Luna y PC',
//                 image: 'https://www.rpgfan.com/wp-content/uploads/2022/05/Assassins-Creed-Origins-Cover-Art-XB1.jpg',
//                 price: 45000
//             },
//             {
//                 title: 'Assassin\'s Creed Ezio Collection ',
//                 platform: 'Nintendo Switch',
//                 brief_overview: 'Disfruta de la aclamada trilogía de Assassins Creed y encarna a Ezio Auditore da Firenze',
//                 full_description: 'Assassin\'s Creed: The Ezio Collection es una colección comprendida de versiones gráficamente realzadas de juegos que presentan a Ezio Auditore da Firenze. El juego saldrá al público el 15 de noviembre de 2016 en los Estados Unidos, 17 en España y el 18 en el Reino Unido para PlayStation 4 y Xbox One',
//                 image: 'https://ps4digitalargentina.com/files/images/productos/1645492017-assassins-creed-the-ezio-collection-nintendo-switch.jpg',
//                 price: 18000
//             },
//             {
//                 title: 'Batman Arkham Knight',
//                 platform: 'PS4',
//                 brief_overview: 'Enfrenta el máximo peligro para la ciudad que Batman juró prometer',
//                 full_description: 'Batman: Arkham Knight es un videojuego de acción-aventura de mundo abierto desarrollado por Rocksteady Studios y publicado por Warner Bros. Interactive Entertainment',
//                 image: 'https://spacegamer.com.ar/img/Public/1058-producto-batman-arkham-knight-ps4-3-2577.jpg',
//                 price: 44500
//             },
//             {
//                 title: 'GTA V',
//                 platform: 'PS5',
//                 brief_overview: 'Explora los éxitos de taquilla de GTA V y GTA Online ahora actualizados para PlayStation 5',
//                 full_description: 'Grand Theft Auto V (abreviado como GTA V o GTA 5) es un videojuego de acción-aventura de mundo abierto desarrollado por Rockstar North y distribuido por Rockstar Games. Este título revolucionario hizo su debut el 17 de septiembre de 2013 en las consolas Xbox 360 y PlayStation 3.',
//                 image: 'https://dixgamer.com/wp-content/uploads/2021/09/gta-v-ps5.jpg',
//                 price: 52000
//             },
//             {
//                 title: 'Assassins Creed: Unity',
//                 platform: 'PS4',
//                 brief_overview: 'Assassin\'s Creed Unity es un videojuego de acción y aventura de sigilo, mundo abierto y ficción histórica desarrollado por Ubisoft. El juego fue lanzado en',
//                 full_description: 'Assassin\'s Creed Unity es un videojuego de acción y aventura de sigilo, mundo abierto y ficción histórica desarrollado por Ubisoft. El juego fue lanzado en Norteamérica el 11 de noviembre de 2014 y en Europa el 13 de noviembre de 2014​',
//                 image: 'https://m.media-amazon.com/images/I/71lfw0xgZmL._SL1000_.jpg',
//                 price: 45000
//             },
//             {
//                 title: 'Star Wars: Jedi Fallen Order',
//                 platform: 'PS4',
//                 brief_overview: 'Star Wars Jedi: Fallen Order para PS4 es un emocionante videojuego de acción y aventura que sumerge a los jugadores en el universo de Star Wars.',
//                 full_description: 'Star Wars Jedi: Fallen Order, traducido en algunas tiendas digitales como Star Wars Jedi: La Orden caída, es un videojuego de acción y aventura para un solo jugador desarrollado por Respawn Entertainment y publicado por Electronic Arts, ambientado en el universo de Star Wars.',
//                 image: 'https://acdn.mitiendanube.com/stores/427/682/products/star-wars-jedi-fallen-order1-102553021e97a11f6416076996055259-640-0.jpg',
//                 price: 63000
//             },
//             {
//                 title: 'The Leyend of Zelda: Breath of the Wild',
//                 platform: 'Nintendo Switch',
//                 brief_overview: 'Sumérgete en un mundo de aventuras, exploración y descubrimientos en The Legend of Zelda™: Breath of the Wild.',
//                 full_description: 'The Legend of Zelda: Breath of the Wild es un videojuego de acción-aventura de 2017 de la serie The Legend of Zelda, desarrollado por la filial Nintendo EPD en colaboración con Monolith Soft y publicado por Nintendo para las consolas Wii U y Nintendo Switch',
//                 image: 'https://cdn02.plentymarkets.com/qozbgypaugq8/item/images/1613/full/PSTR-ZELDA005.jpg',
//                 price: 78000
//             },
//             {
//                 title: 'The Leyendo of Zelda: Tears of the Kingdom',
//                 platform: 'Nintendo Switch',
//                 brief_overview: 'Disponible solamente para Nintendo Switch. El juego The Legend of Zelda: Tears of the Kingdom solamente está disponible para las consolas de la familia Nintendo',
//                 full_description: 'The Legend of Zelda: Tears of the Kingdom es un videojuego de acción-aventura de 2023 de la serie The Legend of Zelda, desarrollado por la filial Nintendo EPD en colaboración con Monolith Soft y publicado por Nintendo para la consola Nintendo Switch.',
//                 image: 'https://acdn.mitiendanube.com/stores/082/436/products/zelda1-28386a84e9d1c1bd3516833070881508-640-0.png',
//                 price: 44300
//             },
//             {
//                 title: 'Dragon Ball: Sparking Zero',
//                 platform: 'PS5',
//                 brief_overview: '¡Domina el poder destructivo de los luchadores más fuertes que han aparecido en DRAGON BALL!',
//                 full_description: 'DRAGON BALL: Sparking! ZERO lleva a un nuevo nivel el legendario estilo de juego de la serie Budokai Tenkaichi. Aprende a dominar a diversos personajes jugables, cada uno con sus habilidades, transformaciones y técnicas propias. Libera tu espíritu de lucha y pelea en escenarios que se derrumban y reaccionan a tu poder a medida que el combate se recrudece.',
//                 image: 'https://m.media-amazon.com/images/I/81QsM5cNn5L._AC_UF1000,1000_QL80_.jpg',
//                 price: 74000
//             },
//             {
//                 title: 'Resident Evil 4: Remake',
//                 platform: 'PS4',
//                 brief_overview: 'Resident Evil 4 es un remake del Resident Evil 4 original del 2005. Survival Horror de última generación reimaginado para el año 2023.',
//                 full_description: 'Resident Evil 4 — conocido en Japón como Biohazard 4 — es un videojuego de acción-aventura de disparos en tercera persona de terror y supervivencia desarrollado y publicado por Capcom',
//                 image: 'https://www.xtechzplus.com/cdn/shop/products/mainps4_170f50f2-1fbe-423f-8ce6-3b5b19d9e533.jpg?v=1679557452',
//                 price: 84000
//             },
//             {
//                 title: 'Shadow of the Colossus: Remake',
//                 platform: 'PS4',
//                 brief_overview: 'Con tan solo una espada y un arco, deberás explorar las tierras espaciosas y descubrir cada Colossus',
//                 full_description: 'Shadow of the Colossus es un videojuego de acción-aventura desarrollado y publicado por Sony Computer Entertainment para PlayStation 2. El juego fue publicado en Norteamérica y Japón en octubre de 2005, y posteriormente en Europa en febrero de 2006.​',
//                 image: 'https://metajuego1.com/assets/uploads/product_uGlVcfTQXNUh9wrytn6v.jpg',
//                 price: 19000
//             }
//         ]
//     )
// }
// insertProducts();