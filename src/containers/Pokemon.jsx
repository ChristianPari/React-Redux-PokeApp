import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { GetPokemon } from "../actions/pokemonActions"
import _ from "lodash"

const Pokemon = (props) => {

    const pokemonName = props.match.params.pokemon;
    const displayName = pokemonName[0].toUpperCase() + pokemonName.slice(1, pokemonName.length);
    const dispatch = useDispatch();
    const pokemonState = useSelector(state => state.Pokemon);

    React.useEffect(() => {
        dispatch(GetPokemon(pokemonName))
        // eslint-disable-next-line
    }, []);

    const ShowData = () => {
        if (!_.isEmpty(pokemonState.data[pokemonName])) {
            const pokeData = pokemonState.data[pokemonName];

            return (
                <div className={"pokemon-wrapper"}>
                    <div className={"item"}>
                        <h1>Sprites</h1>
                        <img src={pokeData.sprites.front_default} alt="" />
                        <img src={pokeData.sprites.back_default} alt="" />
                        <img src={pokeData.sprites.front_shiny} alt="" />
                        <img src={pokeData.sprites.back_shiny} alt="" />
                    </div>
                    <div className={"type"}>
                        <h1>Types</h1>
                        {pokeData.types.map(feild => {

                            const name = feild.type.name[0].toUpperCase() + feild.type.name.slice(1, feild.type.name.length);

                            return <p>{name}</p>
                        })}
                    </div>
                    <div className={"stats"}>
                        <h1>Stats</h1>
                        {pokeData.stats.map(feild => {
                            return (
                                <p>
                                    {feild.stat.name.toUpperCase()}
                                    {feild.base_stat}
                                </p>
                            )
                        })}
                    </div>
                    <div className={"ablities"}>
                        <h1>Abilities</h1>
                        {pokeData.abilities.map(feild => {

                            const name = feild.ability.name[0].toUpperCase() + feild.ability.name.slice(1, feild.ability.name.length);

                            return <p>{name}</p>
                        })}
                    </div>
                    <div className={"moves"}>
                        <h1>Moves</h1>
                        {pokeData.moves.map(feild => {

                            const name = feild.move.name[0].toUpperCase() + feild.move.name.slice(1, feild.move.name.length);

                            return <p>{name}</p>
                        })}
                    </div>
                </div>
            )
        }

        if (pokemonState.loading) {
            return <p>loading...</p>
        }

        if (pokemonState.errorMsg !== "") {
            return <p>{pokemonState.errorMsg}</p>
        }

        return <p>error getting pokemon</p>

    }

    return (
        <div className={"poke"}>
            <h1>{displayName}</h1>
            {ShowData()}
        </div>
    )

}

export default Pokemon