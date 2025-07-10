import { ZapIcon } from "lucide-react";
import GameOptions from "./GameOptions";
import { useGame } from "@/hooks/useGame";

export default function GameQuestion({}) {
  const {
    currentQuestion,
    // selectedAnswer,
    // showAnswer,
    // timeLeft,
    // currentQuestionIndex,
    // totalQuestions,
    // selectAnswer,
    // showAnswer: showAnswerAction,
    // nextQuestion,
  } = useGame();

  return (
    <div className="flex items-center justify-center">
      <div className="relative">
        <div className="w-80 h-80 bg-gradient-to-br from-orange-200 to-red-200 rounded-full flex items-center justify-center">
          <div className="w-64 h-64 bg-white rounded-full shadow-lg flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="text-6xl">🍽️</div>
              <div className="space-y-2">
                <p className="text-lg font-semibold text-gray-800">
                  {currentQuestion.question}
                </p>
                <GameOptions />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute -top-4 -right-4 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
          <ZapIcon className="h-8 w-8 text-yellow-800" />
        </div>
      </div>
      {/* TODO : Delete after circle timer */}
      {/* <div>Time left: {timeLeft}s</div> */}
    </div>
  );
}
