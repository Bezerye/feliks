"use client";

import { startGame } from "@/actions/startGame";
import GameQuestion from "@/components/GameQuestion";
import { useGame } from "@/hooks/useGame";
import { toast } from "sonner";

export default function Play() {
  const {
    isActive,
    // gameCompleted,
    startGame: startGameAction,
    // resetGame,
  } = useGame();

  async function handleStartGame() {
    const { sessionId, gameQuestions } = await startGame();
    if (!sessionId || !gameQuestions) {
      toast.error("Failed to start the game. Please try again.");
      return;
    }
    startGameAction(sessionId, gameQuestions);
  }

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold">Play</h1>
      {isActive ? (
        <GameQuestion />
      ) : (
        <>
          <p className="mt-2 text-sm text-gray-500">
            Click the button below to start playing!
          </p>
          <button
            className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => {
              handleStartGame();
            }}
          >
            Start Game
          </button>
        </>
      )}
    </div>
  );
}
