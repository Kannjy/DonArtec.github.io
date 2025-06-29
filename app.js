const express = require('express');
const path = require('path');
const app = express();
const rutas = require('./routes/index');
const port = 10000;

// configurar EJS como motor de plantillas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// archivos estaticos
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// rutas
app.use('/', rutas);

// iniciar servidor
app.listen(port, () =>{
    console.log(`Servidor Activo en: http://localhost:${port}`);
});
