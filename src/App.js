import logo from './logo.svg';
import { useEffect, useState } from 'react';
import PokemonList from './Components/pokemonList';
import Pagination from './Components/pagination';
import axios from 'axios';
function App() {
  const [pokemon, setPokemon] = useState([])
  const [currentPageUrl, setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon")
  const [nextPageUrl, setNextPageUrl] = useState()
  const [prevPageUrl, setPrevPageUrl] = useState()
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setLoading(true)
    axios.get(currentPageUrl).then(res => {
      setLoading(false)
      setPokemon(res.data.results.map(p => p.name))
      setNextPageUrl(res.data.next)
      setPrevPageUrl(res.data.previous)
    })
  }, [currentPageUrl])
  function goToNextPage() {
    setCurrentPageUrl(nextPageUrl)
  }

  function goToPrevPage() {
    setCurrentPageUrl(prevPageUrl)
  }

  return (
    <div>
      {loading ? "Loading" : ""}
      <PokemonList pokemon={pokemon} />
      <Pagination goToNextPage={nextPageUrl ? goToNextPage : null} goToPrevPage={prevPageUrl ? goToPrevPage : null} />
    </div>

  );
}

export default App;
