"use server";

import db from "@/db";
import { food, gameAnswer, gameSession } from "@/db/schema";
import { eq } from "drizzle-orm";

/**
 * Checks the user's answer against the correct answer for a given question.
 *
 * @param {number} sessionId - The ID of the game session.
 * @param {string} foodId - The ID of the food item being questioned.
 * @param {number} questionIndex - The index of the question being answered.
 * @param {number} userAnswer - The user's selected answer.
 * @returns {Promise<{ isCorrect: boolean, correctAnswer: number }>} An object indicating if the answer is correct and the correct answer.
 */
export async function checkAnswer(
  sessionId: number,
  foodId: string,
  questionIndex: number,
  userAnswer: number
) {
  try {
    // Fetch the game session to get the total questions and correct answers
    const session = await db
      .select()
      .from(gameSession)
      .where(eq(gameSession.id, sessionId))
      .limit(1)
      .execute();

    if (session.length === 0) {
      throw new Error("Game session not found");
    }

    const currentSession = session[0];

    // Fetch the food item for the current question
    const foodItem = await db
      .select()
      .from(food)
      .where(eq(food.foodId, foodId))
      .limit(1)
      .execute();

    if (foodItem.length === 0) {
      throw new Error("Food item not found");
    }

    const correctAnswer = foodItem[0].calories;

    // Check if the user's answer is correct
    const isCorrect = userAnswer === correctAnswer;

    // Update the game session with the user's answer
    await db
      .update(gameSession)
      .set({
        score: currentSession.score + (isCorrect ? 1 : 0),
        correctAnswers: currentSession.correctAnswers + (isCorrect ? 1 : 0),
        maxStreak: Math.max(
          currentSession.maxStreak,
          isCorrect ? currentSession.maxStreak + 1 : 0
        ),
      })
      .where(eq(gameSession.id, sessionId));

    // Update the game answer to the DB aswell
    await db.insert(gameAnswer).values({
      sessionId: sessionId,
      foodId: foodItem[0].foodId,
      userAnswer: userAnswer,
      correctAnswer: correctAnswer,
      isCorrect: isCorrect,
      responseTime: 0, // TODO Placeholder for response time, can be updated later
      questionIndex: questionIndex,
    });

    return { isCorrect, correctAnswer };
  } catch (error) {
    throw new Error(
      `Failed to check answer: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}
