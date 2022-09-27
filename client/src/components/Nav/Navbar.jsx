/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Search from '../Search/Search';
import "./Navbar.css"


import {
    created_existing,
    filter_alphabetic,
    filter_by_genre,
    filter_rating,
    get_videogames,
    get_videogame_genres,
  } from "../../redux/action";

  
  
  const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { videogame_genres, videogames } = useSelector((state) => state);
  
    useEffect(() => {
      dispatch(get_videogame_genres());
    }, [dispatch]);
  
    const handleClick = () => {
      dispatch(videogames());
    };
    
    function handleClickreset(e){
      e.preventDefault();
      dispatch(get_videogames())
      navigate("/videogames")
      
      
  }
    const handleGenres = (e) => {
      dispatch(filter_by_genre(e.target.value));
    };
  
    const handleRating = (e) => {
      dispatch(filter_rating(e.target.value));
    };
  
    const handleAlphabetic = (e) => {
      dispatch(filter_alphabetic(e.target.value));
    };
  
    const handleCreated = (e) => {
      dispatch(created_existing(e.target.value));
    };

  

    return (
    <body>
    <div className='nav'>
      <nav className='nav_container'>
        <div>
          <a href='#' className='nav_title'>
          <Link onClick={handleClick} to="/">
            <span className='nav_title'>VideoGames</span>
          </Link>
          </a>
          <Search/> 
          <button onClick={handleClickreset} className="nav_select"> Reset </button>
          <div className='nav_list'>
            <div className='nav_items'>
              <a href='#' className='nav_link'>
              <select 
              onChange={handleAlphabetic}
              className ="nav_select"
              name='alphabetical'
            >
            <option >Alphabetical Order:</option>
            <option value="asc">A - Z</option>
            <option value="desc">Z - A</option>   
            </select>
              </a>

              <a href='#' className='nav_link'>
              <select onChange={handleRating} className="nav_select">
            <option>Rating Orden:</option>
            <option value="asc">Low to Hight</option>
            <option value="desc">Hight to Low</option>
            </select>
              </a>

              <a href='#' className='nav_link'>
              <select onChange={handleGenres} className="nav_select">
              <option value="All">Filter by Genre:</option>
              {videogame_genres.map((genre) => (
              <option value={genre} key={genre}>
                {genre}
              </option>
                ))}
              </select>
              </a>

              <a href='#' className='nav_link'>
              <select onChange={handleCreated} className="nav_select">
              <option value="All">Created - Existing:</option>
              <option value="created">Created</option>
              <option value="existing">Existing</option>
              </select>
              
              </a>
              <Link className="nav_create" to="/videogames/create">
              Create Videogame
            </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  </body>
    );
}

export default Navbar;
