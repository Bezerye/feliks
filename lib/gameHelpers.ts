import { Food } from "@/db/schema";

export function generateGameQuestion(food: Food) {
  const question = `What is the calorie content of ${food.name}?`;

  // Generate options (for simplicity, using random values)
  // TODO: Replace random values with more meaningful options based on the food item
  const options = [
    food.calories,
    Math.floor(Math.random() * 500),
    Math.floor(Math.random() * 500),
    Math.floor(Math.random() * 500),
  ];

  // Shuffle options
  options.sort(() => Math.random() - 0.5);

  return {
    foodId: food.foodId,
    question,
    options,
    // answer: food.calories,
  };
}
