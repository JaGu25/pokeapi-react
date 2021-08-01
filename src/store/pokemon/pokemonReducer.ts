import { types } from '../types'
import * as React from 'react'

const reducer: React.Reducer<any, any> = (state, action) => {
    switch (action.type) {
        case types.GET_POKEMON_DETAIL:
            return {
                ...state,
                pokemon: action.payload,
                loading: false
            }
        case types.SET_POKEMON_ID:
            return {
                ...state,
                id: action.payload.id,
                loading: true
            }
        default:
            return state
    }
}

export default reducer
