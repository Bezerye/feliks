import { useGame } from "@/hooks/useGame";

export default function GameResult() {
  const { score, maxStreak } = useGame();

  return (
    <div className="flex items-center justify-center h-full">
      <h1 className="text-2xl font-bold">Game Result</h1>
      <div className="mt-4">
        <p className="text-lg">
          Your Score: <span className="font-semibold">{score}</span>
        </p>
        <p className="text-lg">
          Max Streak: <span className="font-semibold">{maxStreak}</span>
        </p>
      </div>
      {/* Additional game result details can be added here */}
    </div>
  );
}
