import React from "react";
import PlayerStats from "./PlayerStats";

const PreviousMove = ({ move, player1_stats, player2_stats }) => {
  return (
    <div>
      <div>
        If {move.if_statement.statement}, then {move.then_statement.statement}
      </div>
      <div style={{ display: "flex" }}>
        <PlayerStats playerStats={player1_stats} />
        <div style={{ marginLeft: 40 }}>
          <PlayerStats playerStats={player2_stats} />
        </div>
      </div>
    </div>
  );
};

export default PreviousMove;
