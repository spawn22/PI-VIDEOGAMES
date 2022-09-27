const { Router } = require("express");
const router = Router();
const videogames = require("./videogames");

// Configurar los routers
router.use("/", videogames);

module.exports = router;
