import { Link } from "react-router-dom";
import CustomRoutes from "./routes/CustonRoutes";
import "./App.css";

function App() {
  return (
    <div className="outer-pokedex">
      <h1 id="pokemon-heading">
        <Link to="/">Pokedex</Link>
      </h1>

      <CustomRoutes />
    </div>
  );
}

export default App;