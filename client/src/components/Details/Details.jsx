import { useEffect } from "react";
import {useParams} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import {get_videogames_id, deleteVideogame, antilagDetails} from "../../redux/action"
import { Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Details.css"



const Details = () => {

    const { id } = useParams();

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const state = useSelector((state) => state.videogame_id);

  useEffect(() => {
    dispatch(get_videogames_id(id));
  }, [dispatch, id]);

  const handleDelete = ()=>{
    dispatch(deleteVideogame(id));
    alert('videogame deleted ');
    navigate("/videogames")
  }


    return (
        <div className="firstContainer">
          <Link to="/videogames">
                <button className="backBtnDetail" onClick={() => dispatch(antilagDetails())}>Back</button>
            </Link>
            
      {!state ? (
        <p className="loadingDetail">Loading...</p>
        ) :(
        <div className="detailContainer">
          
          <img className="gameImg" src={state.image} alt="File Not Found" width="300px" hight="300px"/>
            <div className="gameDetail" >
                        <h1>{state.name}</h1>
                        <p><strong>Released: </strong>{state.released}</p>
                        <div className="ratingDetail"><strong>Rating: </strong><p className="ratingDetails">{state.rating}</p></div>
                        <div className="detailPlatform"><strong>Platform: </strong>{state.platforms?.map(e => <div key={e}>{e + " "}</div>)}</div>
                        <div><strong>Genre: </strong>{state.genres && state.genres.map((genre) =>
                          typeof genre === "object" ? (
                            <p key={genre.id}>{genre.name}</p>
                          ) : (
                            <p key={genre}>{genre}</p>
                          )
                        )}</div>
                        <div><strong>Sinopsis: </strong>{<p dangerouslySetInnerHTML={{__html: state.description}}></p>}</div>
                    </div>
                  </div>
              )}

              {id.length > 15 ? (<Link to='/videogames'><button className="btn_delete" onClick={()=> handleDelete()}>
                Delete
              </button></Link>
                ) : null }
          </div>
  );
}

export default Details;
