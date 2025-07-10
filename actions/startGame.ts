"use server";

import db from "@/db";
import { food, gameSession } from "@/db/schema";
import { generateGameQuestion } from "@/lib/gameHelpers";
import { sql } from "drizzle-orm";

/**
 * Starts a new game by fetching 10 random food items from the database
 * and generating game questions based on those items.
 *
 * @returns {Promise<Array>} An array of game questions.
 * @throws {Error} If there are no food items in the database or if the game session creation fails.
 */

export async function startGame() {
  // Get 10 random food items from the database
  try {
    const foods = await db
      .select()
      .from(food)
      .orderBy(sql`RANDOM()`)
      .limit(10);

    if (foods.length === 0) {
      throw new Error("No food items found in the database");
    }

    // Generate options for each food
    const gameQuestions = foods.map((food) => generateGameQuestion(food));

    // Generate a game session
    const [session] = await db.insert(gameSession).values({}).returning();

    if (!session) {
      throw new Error("Failed to create game session");
    }
    // console.log("Game session created:", session);

    return { gameQuestions, sessionId: session.id };
  } catch (error) {
    throw new Error(
      `Failed to start game: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}
