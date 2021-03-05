const { Router } = require('express');

// import all routers;

const Candy = require('./candy');
const router = Router();



//Rutas
router.use('/candy',Candy );

module.exports = router;
