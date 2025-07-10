import { useGame } from "@/hooks/useGame";
import { Button } from "./ui/button";
import { useState, useTransition } from "react";
import { checkAnswer } from "@/actions/checkAnswer";

export default function GameOptions({}) {
  const [correctAnswer, setCorrectAnswer] = useState<number | null>(null);
  const [isPending, startTransition] = useTransition();
  const {
    sessionId,
    currentQuestionIndex,
    selectAnswer,
    showAnswerAction,
    showAnswer,
    nextQuestion,
    currentQuestion,
    selectedAnswer,
  } = useGame();
  const handleAnswerSelect = async (answer: number) => {
    if (selectedAnswer !== null) return; // Already answered

    selectAnswer(answer);
    if (!sessionId) {
      throw new Error("Session ID is not available");
    }
    const { isCorrect, correctAnswer } = await checkAnswer(
      sessionId,
      currentQuestion.foodId,
      currentQuestionIndex,
      answer
    );
    setCorrectAnswer(correctAnswer);
    setTimeout(() => {
      showAnswerAction(isCorrect);
    }, 500);

    // Move to next question after showing answer
    setTimeout(() => {
      nextQuestion();
    }, 2500);
  };

  return (
    <div className="flex gap-2 justify-center">
      {currentQuestion?.options.map((option, index) => (
        <OptionButton
          key={`${option}-${index}`}
          option={option}
          correctAnswer={correctAnswer}
          isPending={isPending}
          startTransition={startTransition}
          handleAnswer={handleAnswerSelect}
          showAnswer={showAnswer}
        />
      ))}
    </div>
  );
}

function OptionButton({
  option,
  correctAnswer,
  handleAnswer,
  isPending,
  startTransition,
  showAnswer = false, // Default to false if not provided
}: {
  option: number;
  correctAnswer: number | null;
  handleAnswer: (selectedOption: number) => void;
  isPending: boolean;
  startTransition: (callback: () => void) => void;
  showAnswer: boolean;
}) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  // Determine the color class based on the selected option and correct answer
  // TODO : maybe use border instead of background color
  let color: string = "";
  switch (true) {
    case correctAnswer === option:
      color = "bg-green-500 text-white";
      break;
    case selectedOption !== null && selectedOption !== correctAnswer:
      color = "bg-red-500 text-white";
      break;
    default:
      color = "bg-gray-200 text-gray-900 hover:bg-gray-300";
  }

  return (
    <Button
      className={`${color} transition-colors duration-200 ${
        showAnswer ? "pointer-events-none" : ""
      }`}
      onClick={() =>
        startTransition(() => {
          setSelectedOption(option);
          startTransition(() => {
            handleAnswer(option);
          });
        })
      }
      disabled={isPending}
    >
      {option}
    </Button>
  );
}
