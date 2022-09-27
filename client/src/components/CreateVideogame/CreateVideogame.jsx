import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
    get_videogame_genres,
    post_create_videogame,
  } from "../../redux/action";
import "./CreateVideogame.css"

const initialState = {
    name: "",
    description: "",
    released: "",
    image: "",
    rating: 0,
    platforms: [],
    genres: [],
};

const platforms = [
    "Linux",
    "PC",
    "Xbox One",
    "PlayStation 4",
    "Xbox 360",
    "PlayStation 3",
    "macOS",
    "Nintendo Switch",
    "Xbox Series S/X",
    "PlayStation 5",
    "Wii U",
    "Nintendo 3DS",
    "iOS",
    "PS Vite",
    "Android",
    "Xbox",
    "PlayStation 2",
    "Dreamcast",
    "Web",
]



const CreateVideogame = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {videogame_genres} = useSelector((state) => state);
    const [form, setForm] = useState(initialState);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        dispatch(get_videogame_genres());
    }, [dispatch]);

    const validate = (input) => {
        let errors = {};

        if (!input.name.length) errors.name = "Name required";
        if (!input.image.length) errors.image = "Image required";
        if (!input.genres.length) errors.genres = "Genres required";
        if (!input.platforms.length) errors.platforms = "Platforms required";
        if (!input.released.length) errors.released = "Released required";
        if (!input.rating.length) errors.rating = "Rating required";
        if (!input.description.length) errors.description = "Description required";
        
        return errors;
    }

    const handleDeleteGenre = (el) => {
        setForm({
            ...form,
            genres: form.genres.filter((genre) => genre !== el),

        });
    };

    const handleDeletePlatform = (el) => {
      setForm({
          ...form,
          platforms: form.platforms.filter((platforms) => platforms !== el),

      });
  };

    
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });

        setErrors(
            validate({
                ...form,
                [e.target.name]: e.target.value,
            })
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(post_create_videogame(form));

        alert("Game Created!");
        navigate("/videogames")
    }

    const handleSelectGenres = (e) => {
        setForm({
            ...form,
            genres: [...new Set([...form.genres, e.target.value])]
        })
    }

    const handleSelectPlatform = (e) => {
      setForm({
          ...form,
          platforms: [...new Set([...form.platforms, e.target.value])]
      })
  }
    

    return(
    
      <div className="container">
      <div className="mainContainer">
        
      
          <div  className="formContainer1">
              <div className="formContainer2">
              <h1 className="formTitle">Crea el jueguito AQUI!</h1>
                 
              
                  <form onSubmit={(e) => handleSubmit(e)}>
                    
                      <div>
                          <div className="divContainer">
                              <label htmlFor="name" className="labelContainer1">Name </label>
                              {/* input nombre */}
                              <input
                                  className="inputContainer"
                                  type="text"
                                  placeholder="Name"
                                  name="name"
                                  value={form.name}
                                  onChange={handleChange}
                                  required
                                  autoComplete="off"
                                />
                            {errors.name && <p className="msjInputError">{errors.name}</p>}
                          </div>
                          {/* --------------------------------------- */}
                          
                          <div className="divContainer">
                              <label htmlFor="released" className="labelContainer3">Released: </label>
                              {/* input fecha */}
                              <input 
                                  className="inputContainer"
                                  type="date" 
                                  value={form.released}
                                  name="released"
                                  required
                                  autoComplete="off"
                                  onChange={handleChange}
                              />
                              {errors.released && <p className="msjInputError">{errors.released}</p>}
                          </div>
                          {/* ---------------------------------------- */}
                          <div className="divContainer">
                              <label htmlFor="rating" className="labelContainer4">Rating: </label>
                              {/* input puntuacion */}
                                  <input
                                      className="inputContainer"
                                      type="text"
                                      placeholder="Rating"
                                      name="rating"
                                      value={form.rating}
                                      onChange={handleChange}
                                      required
                                  />
                                   {errors.rating && <p className="msjInputError">{errors.rating}</p>}
                              </div>
                          {/* --------------------------------------- */}
                          <div className="divContainer">
                              <label htmlFor="image" className="labelContainer5">Image: </label>
                              {/* input imagen */}
                              <input
                                  className="inputContainer" 
                                  type="text" 
                                  placeholder="URL image"
                                  value={form.image}
                                  name="image"
                                  onChange={handleChange}
                                  required=""
                                  autoComplete="off"
                              />
                              {errors.image && <p className="msjInputError">{errors.image}</p>}
                          </div>
                          {/* --------------------------------------- */}
                          <div className="divContainer">
                              <label htmlFor="description" className="labelContainer2">Description </label>
                               {/* input descripcion */}
                              <textarea 
                                  className="inputDescriContainer"
                                  placeholder="Description"
                                  name="description"
                                  value={form.description}
                                  onChange={handleChange}
                                  required
                              />
                              {errors.description && (
                              <p className="msjInputError">{errors.description}</p>
                               )}

                          </div>
                            {/* input genrero */}
                          {/* --------------------------------------- */}
                           <div className="selectContainer">
                        <div>
                            <select className="inputGenres" onChange={e => handleSelectGenres(e)}>
                                <option value="gen">Genres</option>
                                {videogame_genres.map((genre) => (
                                <option key={genre} value={genre} onChange={handleChange}>
                                  {genre}
                                  </option>
                                    ))} 
                            </select> 
                            {errors.genres && <p className="msjInputError">{errors.genres}</p>}
                           </div>
                          
                            {/* input plataforma */}
                          {/* --------------------------------------- */}
                          
                          <div>
                              <select className="inputPlatform" onChange={e => handleSelectPlatform(e)}>
                              {platforms.map((p) => (
                              <option key={p} value={p} onChange={handleChange}>
                                {p}
                                 </option>
                                 ))}
                                 </select>
                                 {errors.platforms && (<p className="msjInputError">{errors.platforms}</p>)}
                          </div>
                          </div>
                          

                          <Link to="/videogames"><button className="formBackBtn">Back</button></Link>
                          <button className="formCreateBtn" type="submit" disabled={false}>Create</button>
                          
                      </div>
                      
                  </form>
              </div>
              
                                    
      </div>
      <div className="GenContainer">
                {form.genres.map(e =>
                    <div className="deleteGenresContainer" key={e}>
                        
                        <p onClick={()=> handleDeleteGenre(e)} className="pGenres">{e}</p>
                        
                    </div>
                )}
              </div>

            <div className="PlatContainer">
        
           
                   {form.platforms.map(e =>
                    <div className="deletePlatformContainer" key={e}>
                        <p onClick={()=> handleDeletePlatform(e)} className="pPlatform">{e}</p>
                        
                    </div>
                    )}
            </div>                        

      </div>
      </div>
      
      
      )
  
}

export default CreateVideogame;
