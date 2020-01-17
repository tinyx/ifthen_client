import React from "react";

const PreviousMove = ({ move, player1_stats, player2_stats }) => {
  return (
    <div>
      <div>If Statement Options:</div>
      {move.if_statement_options.map(option => (
        <div>
          {option.id}: {option.statement}
        </div>
      ))}

      <div>Then Statement Options:</div>
      {move.then_statement_options.map(option => (
        <div>
          {option.id}: {option.statement}
        </div>
      ))}
    </div>
  );
};

export default PreviousMove;
