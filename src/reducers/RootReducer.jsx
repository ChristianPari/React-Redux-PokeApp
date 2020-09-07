import { combineReducers } from "redux"
import PokemonListReducer from "./PokemonListReducer";
import PokemonMultipleReducer from "./PokemonMutlipleReducer";

const RootReducer = combineReducers({
    PokemonList: PokemonListReducer,
    Pokemon: PokemonMultipleReducer
});

export default RootReducer;