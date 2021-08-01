import React, { useReducer } from 'react'
import PokemonReducer from './pokemonReducer'
import { types } from '../types'
import axios from 'axios'

interface Props {
    children: React.ReactNode
}

interface IPokemon {
    pokemon: any
    id: number,
    getPokemonDetail: (id: number) => void,
    setPokemonId: (id: number) => void,
    loading: Boolean
}

export const PokemonContext = React.createContext<IPokemon>({
    pokemon: null,
    id: 0,
    getPokemonDetail: () => { },
    setPokemonId: () => { },
    loading: false
})

const PokemonProvider = ({ children }: Props): any => {

    const [state, dispatch] = useReducer(PokemonReducer, PokemonContext)

    const getPokemonDetail = async (id: number) => {
        try {
            if (id > 0) {
                const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
                dispatch({
                    type: types.GET_POKEMON_DETAIL,
                    payload: res.data
                })
            }
        } catch (error) {
            console.log(error);
        }
    }

    const setPokemonId = (id: number) => {
        dispatch({
            type: types.SET_POKEMON_ID,
            payload: {
                id
            }
        })
    }

    return (
        <PokemonContext.Provider
            value={{
                pokemon: state.pokemon,
                id: state.id,
                loading: state.loading,
                getPokemonDetail,
                setPokemonId
            }}
        >
            {children}
        </PokemonContext.Provider>
    )
}

export default PokemonProvider
