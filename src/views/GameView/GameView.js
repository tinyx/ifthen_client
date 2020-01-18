import React, { useEffect, useMemo } from "react";
import { useParams } from "react-router";
import useWebSocket from "react-use-websocket";
import { useResource } from "react-request-hook";
import MoveSelector from "./components/MoveSelector";
import PreviousMove from "./components/PreviousMove";
import PlayerStats from "./components/PlayerStats";
import useAuth from "../../hooks/useAuth";

const GameView = () => {
  const { gameId } = useParams();
  const { user, jwt } = useAuth();
  const [game, getGame] = useResource(id => ({
    url: `/games/${id}`,
    method: "GET"
  }));
  const STATIC_OPTIONS = useMemo(
    () => ({
      onOpen: () => console.log("opened"),
      shouldReconnect: closeEvent => true
    }),
    []
  );
  const [sendMessage, lastMessage, readyState, getWebSocket] = useWebSocket(
    `ws://yitao.io/ws/game/${gameId}` +
      (jwt === undefined ? "" : `?jwt=${jwt}`),
    STATIC_OPTIONS
  );

  useEffect(() => getGame(gameId), []);
  useEffect(getWebSocket, []);
  useEffect(() => {
    if (lastMessage !== null) {
      const data = JSON.parse(lastMessage.data);
      if (data.type === "refresh game") {
        getGame(gameId);
      }
    }
  }, [lastMessage]);

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
      <div style={{ display: "flex" }}>
        <div>
          <div>Player 1: {game.data.player1_user || "Not joined"}</div>
          <div>Player Initial Stats:</div>
          <PlayerStats playerStats={game.data.player1_initial_stats} />
        </div>
        <div style={{ marginLeft: 40 }}>
          <div>Player 2: {game.data.player2_user || "Not joined"}</div>
          <div>Player Initial Stats:</div>
          <PlayerStats playerStats={game.data.player2_initial_stats} />
        </div>
      </div>
      <div>{moves}</div>
      {!game.data.is_draw && user.user_id === game.data.winner ? (
        <div>You win!</div>
      ) : null}
      {!game.data.is_draw && user.user_id === game.data.loser ? (
        <div>You lose!</div>
      ) : null}
      {game.data.is_draw ? <div>Draw Game</div> : null}
    </div>
  );
};

export default GameView;
