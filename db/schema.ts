import { InferSelectModel } from "drizzle-orm";
import {
  pgTable,
  varchar,
  text,
  integer,
  numeric,
  timestamp,
} from "drizzle-orm/pg-core";

export const food = pgTable("food", {
  foodId: varchar("foodId", { length: 50 }).primaryKey(),
  name: varchar("label", { length: 255 }).notNull(),
  calories: integer("calories").notNull(),
  protein: numeric("protein", { precision: 5, scale: 2 }),
  fat: numeric("fat", { precision: 5, scale: 2 }),
  carbohydrates: numeric("carbohydrates", { precision: 5, scale: 2 }),
  fiber: numeric("fiber", { precision: 5, scale: 2 }),
  category: varchar("category", { length: 255 }),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
});

export type Food = InferSelectModel<typeof food>;
