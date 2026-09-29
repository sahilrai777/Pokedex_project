import useDebounce from "../../hooks/useDebounce";
import "./search.css";

function Search({ updateSearchTerm }) {
    const debouncedcallback = useDebounce((e) =>
        updateSearchTerm(e.target.value)
    );

    return (
        <div className="search-wrapper">
            <input
                id="pokemon-name-search"
                type="text"
                placeholder="pokemon name....."
                onChange={debouncedcallback}
            />
        </div>
    );
}

export default Search;