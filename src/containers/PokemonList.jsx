import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import _ from "lodash"
import { GetPokemonList } from "../actions/pokemonActions"
import { Link } from "react-router-dom"
import ReactPaginate from "react-paginate"

const PokemonList = (props) => {

    const [search, setSearch] = useState("");
    const dispatch = useDispatch();
    const pokemonList = useSelector(state => state.PokemonList);

    React.useEffect(() => {
        FetchData(1)
        // eslint-disable-next-line
    }, []);

    const FetchData = (page = 1) => {
        dispatch(GetPokemonList(page))
    }

    const ShowingData = () => {

        // this is what appears quickly while the app is loading
        if (pokemonList.loading) {
            return <p>Loading...</p>
        }

        if (!_.isEmpty(pokemonList.data)) {
            return (
                <div id={"list-wrapper"}>
                    {/* storing all items that will be rendered to the DOM within one big div */}
                    {pokemonList.data.map(pokemon => {
                        // mapping through the pokemon data and creating elements with the data for each pokemon
                        return (
                            <div className={"pokemon-item"}>
                                <p>{pokemon.name.toUpperCase()}</p>
                                <Link to={`/pokemon/${pokemon.name}`}>View Pokemon</Link>
                            </div>
                            // each pokemon has its own div with its name and a link to its data
                        )
                    })}
                </div>
            )
        }

        // this will appear if there is an error retriving the pokemon list data
        if (pokemonList.errMsg !== "") {
            return <p>{pokemonList.List.errMsg}</p>
        }

        return <p>Unable to get data</p>
    }

    // this is what will be compiled and displayed to the virtual DOM within the main App component
    return (
        <div>
            <div className={"search-wrapper"}>
                <label htmlFor="search">Search:</label>
                <input type="text" onChange={e => setSearch(e.target.value)} />
                {/* props.history.push("path") will allow you to change the path of the Application */}
                <button onClick={() => props.history.push(`/pokemon/${search}`)}>Search</button>
            </div>
            {ShowingData()}
            {/* the below will only run if there is actually data wihtin the pokemonList state */}
            {!_.isEmpty(pokemonList.data) && (
                <ReactPaginate
                    containerClassName={"pagination"}
                    pageCount={Math.ceil(pokemonList.count / 15)}
                    pageRangeDisplay={2}
                    marginPagesDisplayed={1}
                    onPageChange={(data) => FetchData(data.selected + 1)}
                />
            )}
        </div>
    )

}

export default PokemonList