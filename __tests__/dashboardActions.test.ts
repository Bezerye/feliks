import {
  deleteFood,
  getFoodList,
  updateFood,
} from "@/actions/dashboardActions";
import { food, Food } from "@/db/schema";
import db from "@/db";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

const mockFoodList: Food[] = [
  {
    foodId: "1",
    name: "Apple",
    calories: 95,
    protein: 0.5,
    fat: 0.3,
    carbohydrates: 25,
    fiber: 4.4,
    category: "Fruit",
    image: "apple.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    foodId: "2",
    name: "Banana",
    calories: 105,
    protein: 1.3,
    fat: 0.3,
    carbohydrates: 27,
    fiber: 3.1,
    category: "Fruit",
    image: "banana.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

jest.mock("@/db", () => ({
  __esModule: true,
  default: {
    select: jest.fn(),
    delete: jest.fn(),
    update: jest.fn(),
  },
}));

jest.mock("drizzle-orm", () => ({
  eq: jest.fn(),
}));

jest.mock("next/cache", () => ({
  revalidatePath: jest.fn(),
}));

const mockSelectChain = (data: unknown[] | Promise<unknown[]>) => {
  const orderBy = jest.fn().mockResolvedValue(data);
  const from = jest.fn(() => ({ orderBy }));
  (db.select as jest.Mock).mockReturnValue({ from });
  return { orderBy, from };
};

const mockDeleteChain = () => {
  const where = jest.fn().mockResolvedValue(undefined);
  (db.delete as jest.Mock).mockReturnValue({ where });
  return { where };
};

const mockUpdateChain = () => {
  const where = jest.fn().mockResolvedValue(undefined);
  const set = jest.fn(() => ({ where }));
  (db.update as jest.Mock).mockReturnValue({ set });
  return { where, set };
};

describe("Dashboard Actions", () => {
  afterEach(() => {
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  describe("getFoodList", () => {
    it("should fetch food list from the database", async () => {
      const { orderBy, from } = mockSelectChain(mockFoodList);
      const result = await getFoodList();

      expect(db.select).toHaveBeenCalledTimes(1);
      expect(from).toHaveBeenCalledWith(food);
      expect(orderBy).toHaveBeenCalledWith(food.createdAt);
      expect(result).toEqual(mockFoodList);
    });

    it("should handle errors when fetching food list", async () => {
      const error = new Error("fail");
      mockSelectChain(Promise.reject(error));

      await expect(getFoodList()).rejects.toThrow(
        "Failed to fetch food list: "
      );
    });
  });
  describe("deleteFood", () => {
    const foodId = "1";

    it("should reject empty food ID", async () => {
      await expect(deleteFood("")).rejects.toThrow(
        "Validation error: Food ID is required"
      );
    });

    it("should delete food item from the database and revalidates on success", async () => {
      const { where } = mockDeleteChain();

      await expect(deleteFood(foodId)).resolves.toBeUndefined();

      expect(db.delete).toHaveBeenCalledWith(food);
      expect(where).toHaveBeenCalledWith(eq(food.foodId, foodId));
      expect(revalidatePath).toHaveBeenCalledWith("/dashboard");
    });

    it("should handle errors when deleting food item", async () => {
      const error = new Error("fail");
      const where = jest.fn().mockRejectedValue(error);
      (db.delete as jest.Mock).mockReturnValue({ where });
      const logSpy = jest.spyOn(console, "error").mockImplementation();

      await expect(deleteFood(foodId)).rejects.toThrow(
        "Failed to delete food item"
      );
      expect(logSpy).not.toHaveBeenCalled(); // Remove this line since error is thrown before logging
      expect(revalidatePath).not.toHaveBeenCalled();
    });
  });
  describe("updateFood", () => {
    const newData = {
      foodId: "1",
      name: "Updated Food",
      calories: 200,
      protein: 10,
      fat: 5,
      carbohydrates: 30,
    };

    it("should update food item in the database and revalidates on success", async () => {
      const { where, set } = mockUpdateChain();

      await expect(updateFood(newData)).resolves.toBeUndefined();

      expect(db.update).toHaveBeenCalledWith(food);
      expect(set).toHaveBeenCalledWith({
        name: newData.name,
        calories: newData.calories,
        protein: newData.protein,
        fat: newData.fat,
        carbohydrates: newData.carbohydrates,
      });
      expect(where).toHaveBeenCalledWith(eq(food.foodId, newData.foodId));
      expect(revalidatePath).toHaveBeenCalledWith("/dashboard");
    });

    it("should reject invalid data", async () => {
      const invalidData = {
        foodId: "",
        name: "",
        calories: -10,
        protein: -5,
        fat: -3,
        carbohydrates: -8,
      };

      await expect(updateFood(invalidData)).rejects.toThrow(
        "Validation error: Food ID is required"
      );
    });

    it("should handle errors when updating food item", async () => {
      const error = new Error("fail");
      const where = jest.fn().mockRejectedValue(error);
      const set = jest.fn(() => ({ where }));
      (db.update as jest.Mock).mockReturnValue({ set });

      await expect(updateFood(newData)).rejects.toThrow(
        "Failed to update food item"
      );
      expect(revalidatePath).not.toHaveBeenCalled();
    });
  });
});
