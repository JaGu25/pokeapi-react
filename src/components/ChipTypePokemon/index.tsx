import React from 'react'
import './index.scss'

interface IProps {
    type: {
        name: string
    }
}


const ChipTypePokemon:React.FC<IProps> = ({ type }) => {
    return (
        <span className={`pokemon-type pokemon-type--${type.name}`}>
            {type.name}
        </span>
    )
}

export default ChipTypePokemon
