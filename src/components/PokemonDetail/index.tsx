import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { PokemonContext } from '../../store/pokemon/pokemonContext'
import ChipTypePokemon from '../ChipTypePokemon'
import Loading from '../Utils/Loading'
import './index.scss'

interface IProps {

}

const PokemonDetail: React.FC<IProps> = ({

}) => {

    const { id, loading, getPokemonDetail, pokemon } = useContext(PokemonContext)
    const [description, setDescription] = useState('');

    useEffect(() => {
        getPokemon()
        getPokemonCharacteristic()
    }, [id])

    const getPokemon = async () => {
        getPokemonDetail(id)
    }

    const getPokemonCharacteristic = async () => {
        try {
            const res = await axios.get(`https://pokeapi.co/api/v2/characteristic/${id}`)
            setDescription(res.data.descriptions[1].description);
        } catch (error) {   
            setDescription('')
        }
    }

    return (
        <>
            {
                loading ? <Loading />
                    : (
                        pokemon && (<div className="pokemon-detail">
                            <img className="pokemon-detail__image" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`} alt="" />
                            <div className="pokemon-detail__content">
                                <h2 className="pokemon-detail__name"><span>#{pokemon.id}</span> {pokemon.name}</h2>
                                <p className="pokemon-detail__desc">{description}</p>
                                <div className="pokemon-detail__types">
                                    {
                                        pokemon?.types.map((element: any) => (
                                            <ChipTypePokemon type={element.type} key={`${pokemon.name}-${element.type.name}`} />
                                        ))
                                    }
                                </div>
                                <h3 className="pokemon-detail__subtitle">ABILITIES</h3>
                                <div className="pokemon-detail__abilities">
                                    {
                                        pokemon?.abilities.map((o: any) => (
                                            <p className="pokemon-detail__chips pokemon-detail__chips--border">{o.ability.name}</p>
                                        ))
                                    }
                                </div>
                                <div className="pokemon-detail__properties">
                                    <div className="content">
                                        <h3>HEIGHT</h3>
                                        <p className="pokemon-detail__chips">{pokemon.height}m</p>
                                    </div>
                                    <div className="content">
                                        <h3>WIGHT</h3>
                                        <p className="pokemon-detail__chips">{pokemon.weight}Kg</p>
                                    </div>
                                    <div className="content">
                                        <h3>BASE EXP</h3>
                                        <p className="pokemon-detail__chips">{pokemon.base_experience}</p>
                                    </div>
                                </div>
                            </div>
                        </div>)
                    )
            }
        </>
    )
}

export default PokemonDetail
