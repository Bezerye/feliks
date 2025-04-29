import db from "@/db";
import { food } from "@/db/schema";

export async function getFoodList() {
  const data = await db.select().from(food).orderBy(food.createdAt);
  return data;
}
