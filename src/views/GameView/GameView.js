import React, { useEffect, useMemo } from "react";
import { useParams } from "react-router";
import useWebSocket from "react-use-websocket";
import { useResource } from "react-request-hook";
import MoveSelector from "./components/MoveSelector";
import PreviousMove from "./components/PreviousMove";

const GameView = () => {
  const { gameId } = useParams();
  const [game, getGame] = useResource(id => ({
    url: `/games/${id}`,
    method: "GET"
  }));
  const STATIC_OPTIONS = useMemo(
    () => ({
      onOpen: () => console.log("opened"),
      shouldReconnect: closeEvent => true //Will attempt to reconnect on all close events, such as server shutting down
    }),
    []
  );
  const [sendMessage, lastMessage, readyState, getWebSocket] = useWebSocket(
    `ws://yitao.io/ws/game/${gameId}`,
    STATIC_OPTIONS
  );

  useEffect(() => getGame(gameId), []);
  useEffect(() => getWebSocket(), []);

  if (game.isLoading || game.data === undefined) {
    return <div>Loading Game Data</div>;
  }
  if (game?.error?.code === 404) {
    return <div>Game not exist</div>;
  }
  const moves = [];
  game.data.moves.map(moveData => {
    if (moveData.move.is_complete) {
      moves.push(
        <PreviousMove
          move={moveData.move}
          player1_stats={moveData.player1_stats}
          player2_stats={moveData.player2_stats}
        />
      );
    } else {
      moves.push(
        <MoveSelector
          move={moveData.move}
          onConfirm={statementId =>
            sendMessage(
              JSON.stringify({
                type: "make move",
                statement_id: statementId
              })
            )
          }
        />
      );
    }
  });

  return (
    <div>
      <div>Game State: {game.data.state}</div>
      <button
        onClick={() => sendMessage(JSON.stringify({ type: "join game" }))}
      >
        Join
      </button>
      <div>Player 1: {game.data.player1_user || "Not joined"}</div>
      <div>Player 2: {game.data.player2_user || "Not joined"}</div>
      <div>{moves}</div>
    </div>
  );
};

export default GameView;
