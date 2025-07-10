import { InferSelectModel } from "drizzle-orm";
import {
  pgTable,
  varchar,
  text,
  integer,
  numeric,
  timestamp,
  serial,
  boolean,
} from "drizzle-orm/pg-core";

export const food = pgTable("food", {
  foodId: varchar("foodId", { length: 50 }).primaryKey(),
  name: varchar("label", { length: 255 }).notNull(),
  calories: integer("calories").notNull(),
  protein: numeric("protein", { precision: 5, scale: 2, mode: "number" }),
  fat: numeric("fat", { precision: 5, scale: 2, mode: "number" }),
  carbohydrates: numeric("carbohydrates", {
    precision: 5,
    scale: 2,
    mode: "number",
  }),
  fiber: numeric("fiber", { precision: 5, scale: 2, mode: "number" }),
  category: varchar("category", { length: 255 }),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
});

export const gameSession = pgTable("game_sessions", {
  id: serial("id").primaryKey(),
  score: integer("score").notNull().default(0),
  totalQuestions: integer("total_questions").notNull().default(10),
  correctAnswers: integer("correct_answers").notNull().default(0),
  maxStreak: integer("max_streak").notNull().default(0),
  completedAt: timestamp("completed_at").defaultNow(),
});

export const gameAnswer = pgTable("game_answers", {
  id: serial("id").primaryKey(),
  sessionId: integer("session_id").references(() => gameSession.id),
  foodId: varchar("food_id").references(() => food.foodId),
  userAnswer: integer("user_answer"),
  correctAnswer: integer("correct_answer").notNull(),
  isCorrect: boolean("is_correct").notNull(),
  responseTime: integer("response_time"), // in milliseconds
  questionIndex: integer("question_index").notNull(),
});

export type GameSession = InferSelectModel<typeof gameSession>;
export type GameAnswer = InferSelectModel<typeof gameAnswer>;
export type Food = InferSelectModel<typeof food>;
