import React from "react"
import { useDispatch, useSelector } from "react-redux"
import _ from "lodash"
import { GetPokemonList } from "../actions/pokemonActions"
import { Link } from "react-router-dom"

const PokemonList = () => {

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

        if (pokemonList.loading) {
            return <p>Loading...</p>
        }

        if (pokemonList.errMsg !== "") {
            return <p>{pokemonList.List.errMsg}</p>
        }

        return <p>Unable to get data</p>
    }

    return (
        <div>
            {ShowingData()}
        </div>
    )

}

export default PokemonList