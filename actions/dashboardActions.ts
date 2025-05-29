"use server";

import db from "@/db";
import { food } from "@/db/schema";
import { FoodUpdateSchema, FoodUpdateType } from "@/lib/zodSchemas";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function getFoodList() {
  try {
    const data = await db.select().from(food).orderBy(food.createdAt);
    return data;
  } catch (error) {
    throw new Error(
      `Failed to fetch food list: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}

export async function deleteFood(id: string) {
  // Validate the input
  const foodIdSchema = z.string().min(1, "Food ID is required");
  try {
    const validatedId = foodIdSchema.parse(id);

    await db.delete(food).where(eq(food.foodId, validatedId));
    revalidatePath("/dashboard");
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(`Validation error: ${error.errors[0].message}`);
    }
    throw new Error("Failed to delete food item");
  }
}

// export async function addFood(data) {}

export async function updateFood(newData: FoodUpdateType) {
  // Validate the input data using Zod
  try {
    const validatedData = FoodUpdateSchema.parse(newData);
    await db
      .update(food)
      .set({
        name: validatedData.name,
        calories: validatedData.calories,
        protein: validatedData.protein,
        fat: validatedData.fat,
        carbohydrates: validatedData.carbohydrates,
      })
      .where(eq(food.foodId, validatedData.foodId));
    revalidatePath("/dashboard");
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Return validation errors to the client
      throw new Error(
        `Validation error: ${error.errors.map((e) => e.message).join(", ")}`
      );
    }
    throw new Error("Failed to update food item");
  }
}
