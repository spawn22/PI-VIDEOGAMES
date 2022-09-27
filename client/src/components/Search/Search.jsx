import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { get_videogames_name } from "../../redux/action";
import "./Search.css";

const Search = () => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const handleChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(get_videogames_name(name));
    setName("");
  };

  return (
    <div className="div_search">
      <input
        onChange={e => handleChange(e)}
        type="text"
        className="nav_input_search"
        placeholder="Search"
        value={name}
      />
      <button onClick={e => handleClick(e)} className="div_search_btn" type="submit">
        <FaSearch />
      </button>
    </div>
  );
};

export default Search;
