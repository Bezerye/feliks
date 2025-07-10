import { GameContext, GameQuestion } from "@/context/gameContext";
import { use } from "react";

export function useGame() {
  const context = use(GameContext);

  if (context === undefined) {
    throw new Error("useGame must be used within a GameProvider");
  }

  const { state, dispatch } = context;

  // Action creators for better DX
  const actions = {
    startGame: (sessionId: number, questions: GameQuestion[]) => {
      dispatch({ type: "START_GAME", payload: { sessionId, questions } });
    },

    selectAnswer: (answer: number) => {
      dispatch({ type: "SELECT_ANSWER", payload: answer });
    },

    showAnswerAction: (isCorrect: boolean) => {
      dispatch({ type: "SHOW_ANSWER", payload: { isCorrect } });
    },

    nextQuestion: () => {
      dispatch({ type: "NEXT_QUESTION" });
    },

    updateTimer: (timeLeft: number) => {
      dispatch({ type: "UPDATE_TIMER", payload: timeLeft });
    },

    completeGame: () => {
      dispatch({ type: "COMPLETE_GAME" });
    },

    resetGame: () => {
      dispatch({ type: "RESET_GAME" });
    },
  };

  // Computed values
  const currentQuestion = state.questions[state.currentQuestionIndex];
  const progress =
    state.totalQuestions > 0
      ? (state.currentQuestionIndex / state.totalQuestions) * 100
      : 0;

  return {
    // State
    ...state,
    currentQuestion,
    progress,

    // Actions
    ...actions,
  };
}
