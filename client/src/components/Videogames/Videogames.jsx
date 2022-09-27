import { get_videogames } from "../../redux/action";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../Loading/Loading";
import Navbar from "../Nav/Navbar";
import Paginated from "../Paginated/Paginated";
import Videogame from "../Videogame/Videogame"


import "./Videogames.css"



const Videogames = () => {
    const dispatch = useDispatch();
    let videogames = useSelector((state) => state.videogames);
    let {videogames_name} = useSelector((state) => state);


    const [currentPage, setCurrentPage] = useState(1); // pagina actual
    const [gamesPerPage, setGamesPerPage] = useState(15); // juegos por pagina
    const lastVideogame = currentPage * gamesPerPage; // indice del ultimo personaje = 15
    const firstVideogame = lastVideogame - gamesPerPage; // 0
    const currentVideogames = videogames.slice(firstVideogame, lastVideogame);


    const paginated = (page) => {
        setCurrentPage(page);
      };

    useEffect(() => {
        dispatch(get_videogames())
    }, [dispatch]);

    return (
        <div className="conteiner">
       
            {!currentVideogames.length ? (
                        <p className="loadingDetail">Loading...</p>
                    ) : (
                        <Paginated
                        paginated={paginated}
                        videogames={videogames.length}
                        gamesPerPage={gamesPerPage}
                        />
                    )}
            <section className="section_games">
            <Navbar />
                    

                {videogames_name.length 
                ? videogames_name.map((game) => (
                    <Videogame key={game.id} game={game} />
                ))
                 : currentVideogames.length &&
                 currentVideogames.map((game) => (
                    <Videogame key={game.id} game={game}/>
                 ))       
                }

            </section>
        
            </div>
        
    );

}

export default Videogames;
