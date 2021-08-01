import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import CardPokemon from '../../components/CardPokemon'
import PokemonDetail from '../../components/PokemonDetail'
import Loading from '../../components/Utils/Loading'
import Modal from '../../components/Utils/Modal'
import Select from '../../components/Utils/Select'
import useKeypress from '../../hooks/useKeypress'
import { PokemonContext } from '../../store/pokemon/pokemonContext'
import './index.scss'

const Home: React.FC = () => {

    const [loading, setLoading] = useState(true)
    const [pokemons, setPokemons] = useState([])
    const [showModal, setShowModal] = useState(false);
    const [types, setTypes] = useState([]);
    const [currentType, setCurrentType] = useState('normal');

    const { id: currentId, setPokemonId } = useContext(PokemonContext)

    useEffect(() => {
        getPokemonTypes();
    }, [currentType])

    useEffect(() => {
        getPokemons();
    }, [currentType])

    const getPokemons = async () => {
        setLoading(true);
        const res = await axios.get(`https://pokeapi.co/api/v2/type/${currentType}`);
        setPokemons(res.data.pokemon);
        setLoading(false);
    }

    const getPokemonTypes = async () => {
        const res = await axios.get('https://pokeapi.co/api/v2/type');
        setTypes(res.data.results);
    }

    const handleChangeType = (e: any) => {
        setCurrentType(e.target.value)
    }

    const handlePokemonCardEvent = (id: number) => {
        if (id != currentId) {
            setPokemonId(id)
        }
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false);
    }

    useKeypress('Escape', () => {
        setShowModal(false);
    });

    return (
        <div className="container">
            <Select options={types.slice(1, 18)} handleChange={handleChangeType} currentValue={currentType} />
            <div className="pokemon-list">
                {
                    loading && <Loading />
                }
                {
                    !loading && (pokemons.map((element: any, index) => (
                        <CardPokemon data={element.pokemon} key={element.pokemon.name} handlePokemonCardEvent={handlePokemonCardEvent} />
                    )))
                }
            </div>
            <Modal show={showModal} handleCloseModal={handleCloseModal} ContentComponent={PokemonDetail} />
        </div>
    )
}

export default Home
