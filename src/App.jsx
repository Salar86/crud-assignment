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

  useEffect(() => {
    getPlayers((data) => setPlayers(data))
  }, []);

  return (
    <div>
      <h1>Player DB</h1>
      <PlayerList players={players} deletePlayerById={deletePlayerById} editPlayer={editPlayer}/>
      <PlayerForm blankPlayer={blankPlayer} playerToEdit={playerToEdit} mutatePlayer={mutatePlayer}/>
    </div>
  )
}

export default App
