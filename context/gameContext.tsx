"use client";

import { createContext, useReducer } from "react";

// Types
export interface GameState {
  sessionId: number | null;
  questions: GameQuestion[];
  currentQuestionIndex: number;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  currentStreak: number;
  maxStreak: number;
  timeLeft: number;
  isActive: boolean;
  showAnswer: boolean;
  selectedAnswer: number | null;
  gameCompleted: boolean;
}

export interface GameQuestion {
  foodId: string;
  question: string;
  options: number[];
}

export type GameAction =
  | {
      type: "START_GAME";
      payload: { sessionId: number; questions: GameQuestion[] };
    }
  | { type: "SELECT_ANSWER"; payload: number }
  | { type: "SHOW_ANSWER"; payload: { isCorrect: boolean } }
  | { type: "NEXT_QUESTION" }
  | { type: "UPDATE_TIMER"; payload: number }
  | { type: "COMPLETE_GAME" }
  | { type: "RESET_GAME" };

// Initial state
const initialState: GameState = {
  sessionId: null,
  questions: [],
  currentQuestionIndex: 0,
  score: 0,
  totalQuestions: 10,
  correctAnswers: 0,
  currentStreak: 0,
  maxStreak: 0,
  timeLeft: 10,
  isActive: false,
  showAnswer: false,
  selectedAnswer: null,
  gameCompleted: false,
};

// Reducer
function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "START_GAME":
      return {
        ...initialState,
        sessionId: action.payload.sessionId,
        questions: action.payload.questions,
        totalQuestions: action.payload.questions.length,
        isActive: true,
        timeLeft: 10,
      };

    case "SELECT_ANSWER":
      return {
        ...state,
        selectedAnswer: action.payload,
        timeLeft: 0, // Stop timer
      };

    case "SHOW_ANSWER":
      const newCorrectAnswers = action.payload.isCorrect
        ? state.correctAnswers + 1
        : state.correctAnswers;

      const newStreak = action.payload.isCorrect ? state.currentStreak + 1 : 0;

      return {
        ...state,
        showAnswer: true,
        correctAnswers: newCorrectAnswers,
        currentStreak: newStreak,
        maxStreak: Math.max(state.maxStreak, newStreak),
        score: newCorrectAnswers * 100 + newStreak * 10, // Base score + streak bonus
      };

    case "NEXT_QUESTION":
      const nextIndex = state.currentQuestionIndex + 1;
      const isGameComplete = nextIndex >= state.totalQuestions;

      return {
        ...state,
        currentQuestionIndex: nextIndex,
        selectedAnswer: null,
        showAnswer: false,
        timeLeft: 10,
        gameCompleted: isGameComplete,
        isActive: !isGameComplete,
      };

    case "UPDATE_TIMER":
      return {
        ...state,
        timeLeft: action.payload,
      };

    case "COMPLETE_GAME":
      return {
        ...state,
        isActive: false,
        gameCompleted: true,
      };

    case "RESET_GAME":
      return initialState;

    default:
      return state;
  }
}

// Context
interface GameContextType {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
}

export const GameContext = createContext<GameContextType | undefined>(
  undefined
);

export function GameProvider({ children }: React.PropsWithChildren) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}
