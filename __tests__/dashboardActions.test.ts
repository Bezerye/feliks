import { deleteFood, getFoodList } from "@/actions/dashboardActions";
import { food, Food } from "@/db/schema";
import db from "@/db";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

const mockFoodList: Food[] = [
  {
    foodId: "1",
    name: "Apple",
    calories: 95,
    protein: "0.5",
    fat: "0.3",
    carbohydrates: "25",
    fiber: "4.4",
    category: "Fruit",
    image: "apple.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    foodId: "2",
    name: "Banana",
    calories: 105,
    protein: "1.3",
    fat: "0.3",
    carbohydrates: "27",
    fiber: "3.1",
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
      const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();

      await getFoodList();

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Error fetching food list:",
        expect.any(Error)
      );
    });
  });
  describe("deleteFood", () => {
    const foodId = "1";

    it("should delete food item from the database and revalidates on success", async () => {
      const { where } = mockDeleteChain();

      await expect(deleteFood(foodId)).resolves.toBeUndefined();

      expect(db.delete).toHaveBeenCalledWith(food);
      expect(where).toHaveBeenCalledWith(eq(food.foodId, foodId));
      expect(revalidatePath).toHaveBeenCalledWith("/dashboard");
    });

    it("should handle errors when deleting food item", async () => {
      const error = new Error("boom");
      const where = jest.fn().mockRejectedValue(error);
      (db.delete as jest.Mock).mockReturnValue({ where });
      const logSpy = jest.spyOn(console, "error").mockImplementation();

      await expect(deleteFood(foodId)).resolves.toBeUndefined();
      expect(logSpy).toHaveBeenCalledWith("Error deleting food item:", error);
      expect(revalidatePath).not.toHaveBeenCalled();
    });
  });
});
