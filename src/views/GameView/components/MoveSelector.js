import React, { useState } from "react";
import useWebSocket from "react-use-websocket";

import "./MoveSelector.css";

const MoveSelector = ({ move, onConfirm }) => {
  const [selectedMove, setSelectedMove] = useState(null);

  return (
    <div className="move-selector">
      <div>If Statement Options:</div>
      {move.if_statement_options.map(option => (
        <div onClick={() => setSelectedMove(option.id)} key={option.id}>
          {option.id}: {option.statement}
        </div>
      ))}

      <div>Then Statement Options:</div>
      {move.then_statement_options.map(option => (
        <div onClick={() => setSelectedMove(option.id)} key={option.id}>
          {option.id}: {option.statement}
        </div>
      ))}
      <div>Your choices: {selectedMove || "Not decided"}</div>
      <button
        onClick={() => {
          selectedMove && onConfirm(selectedMove);
        }}
      >
        Confirm
      </button>
    </div>
  );
};

export default MoveSelector;
