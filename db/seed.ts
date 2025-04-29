import fs from "fs/promises";
import path from "node:path";
import { Food, food as foodDB } from "./schema";
import db from "./index";

// Read the list of food names from the JSON file
async function readFoodNamesFromJsonFile() {
  try {
    const filePath = path.join(__dirname, "foodNames.json");
    const fileContent = await fs.readFile(filePath, "utf-8");
    const foodData = JSON.parse(fileContent);
    console.log("Food names read from JSON successfully");

    return foodData.map((food: string) => food);
  } catch (error) {
    console.error("Error reading food names from JSON file:", error);
    return [];
  }
}

// Query the Edamam API to get the nutritional information of the food items
async function getFoodInfo(food: string) {
  const APP_ID = process.env.EDAMAM_APP_ID;
  const APP_KEY = process.env.EDAMAM_API_KEY;
  const url = `https://api.edamam.com/api/food-database/v2/parser?app_id=${APP_ID}&app_key=${APP_KEY}&ingr=${food}&nutrition-type=cooking`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const foodInfo: Partial<Food> = {
      foodId: data.parsed[0].food.foodId,
      name: data.parsed[0].food.label,
      calories: data.parsed[0].food.nutrients.ENERC_KCAL,
      protein: data.parsed[0].food.nutrients.PROCNT,
      fat: data.parsed[0].food.nutrients.FAT,
      carbohydrates: data.parsed[0].food.nutrients.CHOCDF,
      fiber: data.parsed[0].food.nutrients.FIBTG,
      category: data.parsed[0].food.category,
      image: data.parsed[0].food.image,
    };
    return foodInfo;
  } catch (error) {
    console.error(error);
  }
}

// Save the food items to the database
async function saveFoodItems(food: Food) {
  try {
    await db.insert(foodDB).values(food);
  } catch (error) {
    console.error(error);
  }
}

// Execute the seed function
async function seed() {
  console.log("Seeding the database...");
  console.time("Seeding the database took: ");
  const foodNames = await readFoodNamesFromJsonFile();
  // Clear the food table
  console.log("Clearing the food table...");
  await db.delete(foodDB);
  for (const food of foodNames) {
    try {
      const foodInfo = await getFoodInfo(food);
      if (foodInfo) {
        await saveFoodItems(foodInfo as Food);
      } else {
        console.error(`Failed to get info for food: ${food}`);
      }
    } catch (error) {
      console.error(`Error processing food: ${food}`, error);
    }
  }
  console.timeEnd("Seeding the database took: ");
}

seed();
