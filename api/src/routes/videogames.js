const { Router } = require("express");
const router = Router();
const {
  getVideoGames,
  getVideoGamesId,
  createVideoGame,
  getGamesGenre,
  videoDelete,
} = require("../controllers/videogames");

router.get("/videogames", getVideoGames);
router.get("/videogames/:id", getVideoGamesId);
router.post("/videogames", createVideoGame);
router.get("/genres", getGamesGenre);
router.delete('/videogames/:id', videoDelete);

module.exports = router;
