const express = require('express');
const router = express.Router();
const GmailController = require('../controllers/GmailController');

// vista principal
router.get('/', (req, res) => {
    res.render('inicio');
});
// procesar donacion
router.post('/donacion', GmailController.enviarCorreoDonacion);
// vista de gracias
router.get('/gracias', (req, res) => {
    res.render('gracias');
});

module.exports = router;