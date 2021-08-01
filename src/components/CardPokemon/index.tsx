import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import ChipTypePokemon from '../ChipTypePokemon'
import { Img } from 'react-image'
import './index.scss'
import Loading from '../Utils/Loading'

interface IProps {
    data: {
        name: string
        url: string
    },
    handlePokemonCardEvent?: (e: any) => void
}

interface IPokemon {
    id: string
    name: string
    types: []
}

const CardPokemon: React.FC<IProps> = ({
    data,
    handlePokemonCardEvent = () => { }
}) => {

    const [pokemon, setPokemon] = useState<IPokemon | undefined>(undefined)

    useEffect(() => {
        getPokemonInfo()
    }, []);

    const getPokemonInfo = async () => {
        const res = await axios.get(data.url)
        setPokemon(res.data)
    }

    const capitalizeFirstLetter = (word: string) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }

    return (
        <div className="pokemon-card" onClick={() => handlePokemonCardEvent(pokemon?.id)}>
            <div className="pokemon-card__data">
                <h2 className="pokemon-card__name">{capitalizeFirstLetter(pokemon?.name || '')}</h2>
                <div className="pokemon-card__types">
                    {
                        pokemon?.types.map((element: any) => (
                            <ChipTypePokemon type={element.type} key={`${pokemon.name}-${element.type.name}`} />
                        ))
                    }
                </div>
            </div>
            {/* <Img
                className="pokemon-card__image"
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon?.id}.png`}
                loader={
                    <div className="pokemon-card__image">
                        <i className="fas fa-spinner fa-spin"></i>
                    </div>
                }
            /> */}
            <img className="pokemon-card__image" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon?.id}.png`} alt="Pokemon" />
            <span className="pokemon-card__number">#{pokemon?.id}</span>
        </div>
    )
}

export default CardPokemon
