import './styles/App.css'
import PlayerForm from './components/PlayerForm'
import PlayerList from './components/PlayerList'
import { useState, useEffect } from 'react'
import { fetchData } from './util/persistence'

const blankPlayer = {id: '', age: '', name: '', playerNumber: '', position: '', team: ''}

function App() {

  const [players, setPlayers] = useState([])
  const [playerToEdit, setPlayerToEdit] = useState(blankPlayer)
  const APIURL = 'http://127.0.0.1:3000/api'

  function getPlayers(callback) {
    //Fetch data
    fetchData(APIURL, callback)
  }

  function editPlayer(player) {
    setPlayerToEdit(player)
  }

  function mutatePlayer(player) {
    if (player.id != "") {
      //PUT
      updatePlayer(player)
    } else {
      //POST
      createPlayer(player)
    }
  }

  function updatePlayer(player) {
    console.log("update")
    fetchData(`${APIURL}/${player.id}`, setPlayers(players.map(p => p.id === player.id ? {...player} : p)), 'PUT', player)
  }

  function createPlayer(player) {
    console.log("create")
    fetchData(APIURL, (player) => setPlayers([...players, player]), 'POST', player)
  }

  function deletePlayerById(playerId) {
    //Remove from API
    fetchData(`${APIURL}/${playerId}`, () => {}, 'DELETE')
    //Remove from array via setPersons
    setPlayers([...players.filter(p => p.id != playerId)])
  }

  function countPlayersByTeam(team) {
    return players.filter(player => player.team === team).length;
  }

  useEffect(() => {
    getPlayers((data) => setPlayers(data))
  }, []);

  return (
    <div className='container'>
      <nav className="navbar navbar-expand-lg navbar-light">
        <span className="navbar-brand">
          <img src="src/assets/NIF.png"
           alt="NIF Logo" 
           width="60" 
           height="60" 
           className="d-inline-block align-top" /></span>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <span className="nav-link">Total Players: {players.length}</span>
            </li>
            <li className="nav-item">
              <span className="nav-link">First Team: {countPlayersByTeam('1st')}</span>
            </li>
            <li className="nav-item">
              <span className="nav-link">Næstved HG: {countPlayersByTeam('N-HG')}</span>
            </li>
            <li className="nav-item">
              <span className="nav-link">Under 19: {countPlayersByTeam('U19')}</span>
            </li>
            <li className="nav-item">
              <span className="nav-link">Under 17: {countPlayersByTeam('U17')}</span>
            </li>
          </ul>
        </div>
      </nav>
      <div className="row">
        <div className="col-lg-8">
          <h1>Næstved IF Player Database</h1>
          <PlayerList players={players} deletePlayerById={deletePlayerById} editPlayer={editPlayer} />
        </div>

        <div className="col-lg-4">
          <PlayerForm blankPlayer={blankPlayer} playerToEdit={playerToEdit} mutatePlayer={mutatePlayer} />
        </div>
      </div>
    </div>
  )
}

export default App
