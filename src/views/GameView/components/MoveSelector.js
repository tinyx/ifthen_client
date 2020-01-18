import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";

import "./MoveSelector.css";

const MoveSelector = ({ move, onConfirm }) => {
  const [selectedMove, setSelectedMove] = useState(null);
  const { user } = useAuth();
  console.log(user);
  const choosingIf = user?.user_id === move.if_user;
  const choosingThen = user?.user_id === move.then_user;

  return (
    <div className="move-selector">
      <div className={`${choosingIf ? "choosing" : ""}`}>
        <div>If Statement Options:</div>
        {move.if_statement_options.map(option => (
          <div onClick={() => setSelectedMove(option.id)} key={option.id}>
            {option.id}: {option.statement}
          </div>
        ))}
      </div>

      <div className={`${choosingThen ? "choosing" : ""}`}>
        <div>Then Statement Options:</div>
        {move.then_statement_options.map(option => (
          <div onClick={() => setSelectedMove(option.id)} key={option.id}>
            {option.id}: {option.statement}
          </div>
        ))}
      </div>
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
