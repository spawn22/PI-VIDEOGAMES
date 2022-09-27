require("dotenv").config();
const axios = require("axios");
const { API_KEY } = process.env;
const { Videogame, Genre, Op } = require("../db");

// llamada a la api
const getVideoGamesApi = async () => {
  const pageOne = await axios.get(
    `https://api.rawg.io/api/games?key=${API_KEY}`
  );
  const pageTwo = await axios(pageOne.data.next);
  const pageThree = await axios(pageTwo.data.next);
  const pageFour = await axios(pageThree.data.next);
  const pageFive = await axios(pageFour.data.next);

  const apiPages = pageOne.data.results
    .concat(pageTwo.data.results)
    .concat(pageThree.data.results)
    .concat(pageFour.data.results)
    .concat(pageFive.data.results);

  const apiInfo = await apiPages.map((page) => {
    return {
      id: page.id,
      name: page.name,
      image: page.background_image,
      rating: page.rating,
      genres: page.genres.map((e) => e.name),
    };
  });

  return apiInfo;
};

// llamado a la api por nombre
const getVideoGamesName = async (name) => {
  const dataApi = await axios(
    `https://api.rawg.io/api/games?search=${name}&&key=${API_KEY}`
  );

  const videoGameInfo = dataApi.data.results.map((game) => {
    return {
      id: game.id,
      name: game.name,
      image: game.background_image,
      rating: game.rating,
      genres: game.genres.map((e) => e.name),
    };
  });

  return videoGameInfo;
};

// obtener juego por id
const getVideoGameId = async (id) => {
  const videogameId = await axios(
    `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
  );

  return videogameId.data;
};

// llamando a la api por genero
const getVideoGamesGenre = async () => {
  const videogames = await axios(
    `https://api.rawg.io/api/genres?key=${API_KEY}`
  );
  const genres = videogames.data.results.map((genre) => genre.name);

  await genres.map((genre) => {
    Genre.findOrCreate({
      where: { name: genre },
    });
  });

  return genres;
};

// obtener info de la base de datos
const getInfoDataBase = async () => {
  const dbVideoGames = await Videogame.findAll({
    include: {
      model: Genre,
      atribute: ["name"],
    },
  });

  return dbVideoGames;
};

// unir db con datos de la api
const getDbAndApi = async () => {
  const infoApi = await getVideoGamesApi();
  const infoDb = await getInfoDataBase();
  const allInfo = [...infoDb, ...infoApi];

  return allInfo;
};

module.exports = {

  videoDelete: async (req, res) => {
    Videogame.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then(res.status(200).send('El videojuego fue eliminado correctamente'))
      .catch((err) => console.log(err));
  },
  
  // obtener todos los juegos
  getVideoGames: async (req, res) => {
    const name = req.query.search;

    // si no viene nada por query
    if (!name) {
      try {
        const videogames = await getDbAndApi();

        res.json(videogames);
      } catch (error) {
        res.status(404).json(error);
      }
    }

    // si viene algo por query
    if (name) {
      try {
        const videogamesApi = await getVideoGamesName(name);
        const videogameDb = await Videogame.findAll({
          where: {
            name: {
              [Op.iLike]: `%${name}%`,
            },
          },
          include: {
            model: Genre,
            atribute: "name",
          },
        });

        const videogames = [...videogameDb, ...videogamesApi];

        res.json(videogames);
      } catch (error) {
        res.status(404).json(error);
      }
    }
  },

  // obtener juego por id
  getVideoGamesId: async (req, res) => {
    const { id } = req.params;

    // si el id es menor a 10, es porq pertenece a la api
    if (id.length < 10) {
      try {
        const videogameApi = await getVideoGameId(id);

        const infoApi = {
          image: videogameApi.background_image,
          name: videogameApi.name,
          description: videogameApi.description_raw,
          released: videogameApi.released,
          rating: videogameApi.rating,
          platforms: videogameApi.parent_platforms.map((e) => e.platform.name),
          genres: videogameApi.genres.map((e) => e.name),
        };

        res.json(infoApi);
      } catch (error) {
        res.status(404).json(error);
      }
    }

    // sino, pertenece a la db
    else {
      try {
        const videogameDb = await Videogame.findByPk(id, {
          include: Genre,
        });

        res.json(videogameDb);
      } catch (error) {
        res.status(404).json(error);
      }
    }
  },

  // crear video juego
  createVideoGame: async (req, res) => {
    const { name, description, released, rating, platforms, image, genres } =
      req.body;

    if (!name || !description || !platforms)
      throw new Error({ msg: "complete required fields" });

    try {
      const videogame = await Videogame.create({
        name,
        description,
        released,
        rating,
        platforms,
        image,
      });

      const genreDb = await Genre.findAll({
        where: { name: genres },
      });

      videogame.addGenre(genreDb);

      res.json({ msg: "VideoGame created successfully" });
    } catch (error) {
      res.status(404).json(error);
    }
  },

  // obtener juegos por genero
  getGamesGenre: async (req, res) => {
    try {
      const genres = await getVideoGamesGenre();

      res.json(genres);
    } catch (error) {
      res.status(404).json(error);
    }
  },
};


