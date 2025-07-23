import { ZapIcon } from "lucide-react";
import GameOptions from "./GameOptions";
import { useGame } from "@/hooks/useGame";
import GameTimer from "./GameTimer";
import { checkAnswer } from "@/actions/checkAnswer";
import { useState } from "react";

export default function GameQuestion({}) {
  const {
    currentQuestion,
    selectedAnswer,
    showAnswer,
    currentQuestionIndex,
    // totalQuestions,
    sessionId,
    selectAnswer,
    showAnswerAction,
    nextQuestion,
  } = useGame();

  const [correctOption, setCorrectOption] = useState<number | null>(null);

  // Handle when timer reaches zero
  const handleTimeUp = async () => {
    if (selectedAnswer === null && !showAnswer) {
      // Auto-select no answer (or trigger wrong answer logic)
      selectAnswer(-1); // Use -1 to indicate no selection
      // Show the correct answer after a brief delay
      if (!sessionId) {
        throw new Error("Session ID is not available");
      }
      setTimeout(() => {
        showAnswerAction(false); // Mark as incorrect
      }, 500);
      // Move to next question
      setTimeout(() => {
        nextQuestion();
      }, 2500);
      const { correctAnswer } = await checkAnswer(
        sessionId,
        currentQuestion.foodId,
        currentQuestionIndex,
        -1 // No answer selected
      );
      setCorrectOption(correctAnswer);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="relative">
        <div className="w-80 h-80 bg-gradient-to-br from-orange-200 to-red-200 rounded-full flex items-center justify-center">
          <GameTimer totalTime={10} timeUp={handleTimeUp} />
          <div className="w-64 h-64 bg-white rounded-full shadow-lg flex items-center justify-center z-10">
            <div className="text-center space-y-4">
              <div className="text-6xl">🍽️</div>
              <div className="space-y-2">
                <p className="text-lg font-semibold text-gray-800">
                  {currentQuestion.question}
                </p>
                <GameOptions correctAnswerFromParent={correctOption} />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute -top-4 -right-4 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
          <ZapIcon className="h-8 w-8 text-yellow-800" />
        </div>
      </div>
    </div>
  );
}
