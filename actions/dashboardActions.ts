"use server";

import { FoodUpdateData } from "@/components/Columns";
import db from "@/db";
import { food } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getFoodList() {
  try {
    const data = await db.select().from(food).orderBy(food.createdAt);
    return data;
  } catch (error) {
    console.error("Error fetching food list:", error);
  }
}

export async function deleteFood(id: string) {
  try {
    await db.delete(food).where(eq(food.foodId, id));
    revalidatePath("/dashboard");
  } catch (error) {
    console.error("Error deleting food item:", error);
  }
}

// export async function addFood(data) {}

export async function updateFood(newData: FoodUpdateData) {
  try {
    await db
      .update(food)
      .set({
        name: newData.name,
        calories: newData.calories,
        protein: newData.protein,
        fat: newData.fat,
        carbohydrates: newData.carbohydrates,
      })
      .where(eq(food.foodId, newData.foodId));
    revalidatePath("/dashboard");
  } catch (error) {
    console.error("Error updating food item:", error);
  }
}
