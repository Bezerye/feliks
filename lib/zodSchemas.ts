import { z } from "zod";

// Schema for the Food database model
export const FoodSchema = z.object({
  foodId: z.string().max(50, "Food ID must be 50 characters or less"),
  name: z
    .string()
    .min(1, "Name is required")
    .max(255, "Name must be 255 characters or less"),
  calories: z.number().int("Calories must be an integer"),
  protein: z.string().nullable(),
  fat: z.string().nullable(),
  carbohydrates: z.string().nullable(),
  fiber: z.string().nullable(),
  category: z
    .string()
    .max(255, "Category must be 255 characters or less")
    .nullable(),
  image: z.string().nullable(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

// Schema for updating food data (only updatable fields)
export const FoodUpdateSchema = z.object({
  foodId: z.string().min(1, "Food ID is required"),
  name: z.string().min(1, "Name is required").max(255, "Name too long"),
  calories: z.number().int().min(0, "Calories must be positive"),
  protein: z.number().min(1, "Protein is required"),
  fat: z.number().min(1, "Fat is required"),
  carbohydrates: z.number().min(1, "Carbohydrates is required"),
});

// Schema for editing data in the table
export const EditingDataSchema = z.object({
  rowIndex: z.number().int(),
  name: z.string(),
  calories: z.number().int().nullable(),
  protein: z.number(),
  fat: z.number(),
  carbohydrates: z.number(),
});

// Field-specific schemas for validation
export const FieldSchemas = {
  name: z.string().min(1, "Name is required").max(255, "Name too long"),
  calories: z.coerce
    .number()
    .int("Must be a whole number")
    .min(0, "Must be positive"),
  protein: z.coerce.number().min(0, "Must be positive"),
  fat: z.coerce.number().min(0, "Must be positive"),
  carbohydrates: z.coerce.number().min(0, "Must be positive"),
  fiber: z.coerce.number().min(0, "Must be positive").optional(),
} as const;

// For API responses (different structure)
export const EdamamFoodSchema = z.object({
  parsed: z.array(
    z.object({
      food: z.object({
        foodId: z.string(),
        label: z.string(),
        nutrients: z.object({
          ENERC_KCAL: z.number(),
          PROCNT: z.number(),
          FAT: z.number().optional(),
          CHOCDF: z.number().optional(),
          FIBTG: z.number().optional(),
        }),
        category: z.string().optional(),
        image: z.string().optional(),
      }),
    })
  ),
});

// Export types inferred from schemas
export type FoodType = z.infer<typeof FoodSchema>;
export type FoodUpdateType = z.infer<typeof FoodUpdateSchema>;
export type EditingDataType = z.infer<typeof EditingDataSchema>;
export type EdamamFoodType = z.infer<typeof EdamamFoodSchema>;
