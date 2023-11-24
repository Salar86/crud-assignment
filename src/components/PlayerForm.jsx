import { useState, useEffect } from "react";

function PlayerForm({ blankPlayer, playerToEdit, mutatePlayer }) {
  const [player, setPlayer] = useState({...playerToEdit});
  const [errors, setErrors] = useState({});
  useEffect(() => {
    setPlayer(playerToEdit)
    setErrors({})
  }, [playerToEdit])

  function handleChange(event) {
    const value = event.target.value
    const name = event.target.id
    setPlayer({...player, [name]: value})
  }

  function handleSubmit(event) {
    event.preventDefault()
    const newErrors = {};
    if (!player.name) {
      newErrors.name = "Name is required";
    }
    if (!player.age || player.age < 1 || player.age > 120) {
      newErrors.age = "Age must be between 1 and 120"
    }
    if (!player.playerNumber || player.playerNumber < 1 || player.playerNumber > 99) {
        newErrors.playerNumber = "Jersey number must between 1 and 99"
    }
    if (!player.position) {
        newErrors.position = "You must choose a position for the player"
    }
    if (!player.team) {
        newErrors.team = "You must choose a team for the player"
    }
    // Add more validation checks for other fields

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
    console.log("submit", player)
    mutatePlayer(player)
  }
    //callback function fra app.jsx,som enten indsætter ny person (hvis id er tom) el opdaterer (hvis id != "")

  }
  return (
    <div>
      <h1>Add/Edit player</h1>
      {JSON.stringify(player)} 
      <form onSubmit={handleSubmit}>
        <label htmlFor="id">Id</label>
        <input
          id="id"
          type="number"
          readOnly
          placeholder="id"
          value={player.id}
        />
        <label htmlFor="name">Name</label>
        <input id="name" type="text" placeholder="name" value={player.name} onChange={handleChange} />
        <label htmlFor="age">Age</label>
        <input
          id="age"
          type="number"
          min="1"
          max="120"
          placeholder="age"
          value={player.age}
          onChange={handleChange}
        />
        <label htmlFor="playerNumber">Jersey</label>
        <input
          id="playerNumber"
          type="number"
          min="1"
          max="99"
          placeholder="No"
          value={player.playerNumber}
          onChange={handleChange}
        />
        <label htmlFor="position">Position</label>
        <select id="position" value={player.position} onChange={handleChange}>
          <option defaultChecked>Select Position</option>
          <option value="GK">Goalkeeper</option>
          <option value="DF">Defender</option>
          <option value="MF">Midfielder</option>
          <option value="ST">Striker</option>
        </select>
        <label htmlFor="team">Team</label>
        <select id="team" value={player.team} onChange={handleChange}>
          <option defaultChecked>Select Team</option>
          <option value="1st">First Team</option>
          <option value="N-HG">Næstved HG</option>
          <option value="U19">Under 19</option>
          <option value="U17">Under 17</option>
        </select>
        <button className="btn btn-primary btn-sm active">Update</button>
        <button
          className="btn btn-dark btn-sm active"
          onClick={() => {
            setPlayer(blankPlayer)
            setErrors({})
          }}
        >
          Reset
        </button>
        {errors.name && <p className="error">{errors.name}</p>}
        {errors.age && <p className="error">{errors.age}</p>}
        {errors.playerNumber && <p className="error">{errors.playerNumber}</p>}
        {errors.position && <p className="error">{errors.position}</p>}
        {errors.team && <p className="error">{errors.team}</p>}
      </form>
    </div>
  );
}

export default PlayerForm;
