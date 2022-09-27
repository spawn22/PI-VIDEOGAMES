import { Route, Routes, Switch } from "react-router-dom";
import CreateVideogame from "./components/CreateVideogame/CreateVideogame";
import Details from "./components/Details/Details";
import Landing from "./components/Landing/Landing";
import NotFound from "./components/NotFound/NotFound";
import Videogames from "./components/Videogames/Videogames";

function App() {
  return (
    <>
      <Routes>
        <Switch>
        <Route path="/" element={<Landing />} />
        <Route path="/videogames" element={<Videogames />} />
        <Route path="/videogames/:id" element={<Details />} />
        <Route path="/videogames/create" element={<CreateVideogame />} />

        <Route path="*" element={<NotFound />} />
        </Switch>
      </Routes>
    </>
  );
}

export default App;
