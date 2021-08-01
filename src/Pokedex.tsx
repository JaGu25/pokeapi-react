import React from 'react'
import AppRouter from './routers/AppRouter'
import './assets/scss/index.scss'
import PokemonProvider from './store/pokemon/pokemonContext';

const Pokedex: React.FC = () => {
  return (
    <PokemonProvider>
      <AppRouter />
    </PokemonProvider>
  );
}
export default Pokedex;
