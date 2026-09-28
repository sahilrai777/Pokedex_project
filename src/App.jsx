
import { Link } from "react-router-dom";
import CustomRoutes from "./routes/CustonRoutes";

function App() {
  return (
    <div  className="outer-pokedex">
     <h1 id="pokemon-heading">
  <Link to="/">Pokedex</Link>
</h1>
      <CustomRoutes />
    </div>
  );
}

export default App;