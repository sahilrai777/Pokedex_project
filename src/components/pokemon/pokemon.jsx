import "./pokemon.css";
import { Link } from "react-router-dom";

function Pokemon({ name, image ,id}) {

  return (
    <div className="pokemon">

      {/* Pokemon card par click karne par /pokemon/2 page open hoga */}
      <Link to={`/pokemon/${id}`}>

        <div className="pokemon-name">{name}</div>

        <div>
          <img src={image} alt={name} />
        </div>

      </Link>

    </div>
  );
}

export default Pokemon;