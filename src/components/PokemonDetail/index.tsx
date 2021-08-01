import React, { useContext, useEffect } from 'react'
import { PokemonContext } from '../../store/pokemon/pokemonContext'
import Loading from '../Utils/Loading'
import './index.scss'

interface IProps {

}

const PokemonDetail: React.FC<IProps> = ({

}) => {

    const { id, loading, getPokemonDetail } = useContext(PokemonContext)

    useEffect(() => {
        getPokemon();
    }, [id])

    const getPokemon = async () => {
        getPokemonDetail(id)
    }

    return (
        <div>
            {
                loading && <Loading />
            }
        </div>
    )
}

export default PokemonDetail
