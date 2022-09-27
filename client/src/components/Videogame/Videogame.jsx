import {Link} from 'react-router-dom';
import "./Videogame.css";



const Videogame = ({ game }) => {
  return (
    
    <article className="article_videogame rgb">
      <Link to={`/videogames/${game.id}`}>
        <div className="article_image">
          <img src={game.image} alt={game.name} />
        </div>
        <div className="article_div_text">
          <h3 className="article_div_title">{game.name}</h3>
          <span className="article_div_span">{game.rating}</span>
        </div>
        <div className="article_div_genre">
          {game.genres.map((genre) =>
            typeof genre === "object" ? (
              <p key={genre.id}> {genre.name} /</p>
            ) : (
              <p key={genre}> {genre}/</p>
            )
          )}
        </div>
      </Link>
    </article>
  );
};

export default Videogame;


