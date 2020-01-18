import React from "react";
import Icon from "../../../components/Icon";

const PlayerStats = ({ playerStats }) => {
  if (playerStats) {
    return (
      <div style={{ display: "flex" }}>
        <div>
          <Icon name="heart" /> {playerStats.hp}
        </div>
        <div>
          <Icon name="sword" /> {playerStats.attack}
        </div>
        <div>
          <Icon name="shield" />
          {playerStats.defense}
        </div>
        <div>
          <Icon name="boot" />
          {playerStats.agility}
        </div>
      </div>
    );
  }
  return null;
};

export default PlayerStats;
