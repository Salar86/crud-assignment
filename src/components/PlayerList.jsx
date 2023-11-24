/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
function PlayerList({players, deletePlayerById, editPlayer}) {
    return ( 
        <div>
            <h1>List of players</h1>
            <table className="table table-striped">
    <thead>
        <tr>
        <th>Id</th>
        <th>Name</th>
        <th>Age</th>
        <th>Jersey No.</th>
        <th>Position</th>
        <th>Team</th>
        <th>Action</th>
        </tr>
    </thead>
    <tbody>
            {players.map((player) => (
                    <tr key={crypto.randomUUID()}>
                    <td>{player.id}</td>
                    <td>{player.name}</td>
                    <td>{player.age}</td>
                    <td>{player.playerNumber}</td>
                    <td>{player.position}</td>
                    <td>{player.team}</td>
                    <td>
                        <button type="button" className="btn btn-warning" onClick={() => editPlayer(player)}>Edit</button>
                        <button type="button" className="btn btn-danger"  onClick={() => deletePlayerById(player.id)}>Delete</button>
                    </td>
                    </tr>
            ))}
    </tbody>
    </table>
        </div>
     );
}

export default PlayerList;