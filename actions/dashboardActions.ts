"use server";

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
