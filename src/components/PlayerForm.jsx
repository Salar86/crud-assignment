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
      <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="id">Id</label>
        <input
          id="id"
          type="number"
          readOnly
          className="form-control"
          placeholder="id"
          value={player.id}
        />
         </div>

         <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            id="name"
            type="text"
            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
            placeholder="Name"
            value={player.name}
            onChange={handleChange}
          />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="age" className="form-label">
            Age
          </label>
          <input
            id="age"
            type="number"
            min="1"
            max="120"
            className={`form-control ${errors.age ? 'is-invalid' : ''}`}
            placeholder="Age"
            value={player.age}
            onChange={handleChange}
          />
          {errors.age && <div className="invalid-feedback">{errors.age}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="playerNumber" className="form-label">
            Jersey Number
          </label>
          <input
            id="playerNumber"
            type="number"
            min="1"
            max="99"
            className={`form-control ${errors.playerNumber ? 'is-invalid' : ''}`}
            placeholder="Jersey Number"
            value={player.playerNumber}
            onChange={handleChange}
          />
          {errors.playerNumber && <div className="invalid-feedback">{errors.playerNumber}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="position" className="form-label">
            Position
          </label>
          <select
            id="position"
            className={`form-control ${errors.position ? 'is-invalid' : ''}`}
            value={player.position}
            onChange={handleChange}
          >
            <option disabled>Select Position</option>
            <option value="GK">Goalkeeper</option>
            <option value="DF">Defender</option>
            <option value="MF">Midfielder</option>
            <option value="ST">Striker</option>
          </select>
          {errors.position && <div className="invalid-feedback">{errors.position}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="team" className="form-label">
            Team
          </label>
          <select
            id="team"
            className={`form-control ${errors.team ? 'is-invalid' : ''}`}
            value={player.team}
            onChange={handleChange}
          >
            <option disabled>Select Team</option>
            <option value="1st">First Team</option>
            <option value="N-HG">Næstved HG</option>
            <option value="U19">Under 19</option>
            <option value="U17">Under 17</option>
          </select>
          {errors.team && <div className="invalid-feedback">{errors.team}</div>}
        </div>

        <button type="submit" className="btn btn-primary update-button">
          Update
        </button>
        <button
          type="button"
          className="btn btn-dark"
          onClick={() => {
            setPlayer(blankPlayer);
            setErrors({});
          }}
        >
          Reset
        </button>
      </form>
    </div>
  );
}

export default PlayerForm;
