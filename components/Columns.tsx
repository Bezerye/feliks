"use client";

import { ColumnDef, Table } from "@tanstack/react-table";
import { Food } from "@/db/schema";
import { DataTableColumnHeader } from "./DataTableColumnHeader";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CircleX, MoreHorizontal, Save } from "lucide-react";
import { deleteFood, updateFood } from "@/actions/dashboardActions";
import { toast } from "sonner";
import { FoodUpdateType } from "@/lib/zodSchemas";

function handleDelete(food: Food) {
  toast.promise(deleteFood(food.foodId), {
    loading: "Deleting food item...",
    success: "Food item deleted successfully",
    error: "Error deleting food item",
  });
}

const handleEditSave = async (food: Food, table: Table<Food>) => {
  const newData: FoodUpdateType = {
    foodId: food.foodId,
    name: table.options.meta?.editingData.name || "",
    calories: table.options.meta?.editingData.calories || 0,
    protein: table.options.meta?.editingData.protein || 0,
    fat: table.options.meta?.editingData.fat || 0,
    carbohydrates: table.options.meta?.editingData.carbohydrates || 0,
  };
  table.options.meta?.setEditingData({
    rowIndex: -1,
    name: "",
    calories: null,
    protein: 0,
    fat: 0,
    carbohydrates: 0,
  });

  toast.promise(updateFood(newData), {
    loading: "Updating food item...",
    success: () => {
      return `${food.name} has been edited successfully`;
    },
    error: "Error editing food item",
  });
};

export const columns: ColumnDef<Food>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    accessorKey: "calories",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Calories" />
    ),
  },
  {
    accessorKey: "protein",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Protein" />
    ),
  },
  {
    accessorKey: "fat",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fat" />
    ),
  },
  {
    accessorKey: "carbohydrates",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Carbohydrates" />
    ),
  },
  {
    id: "actions",
    cell: ({ row, table }) => {
      const food = row.original;
      const editing = table.options.meta?.editingData.rowIndex === row.index;

      if (editing) {
        return (
          <div className="flex space-x-2">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => {
                table.options.meta?.setEditingData({
                  rowIndex: -1,
                  name: "",
                  calories: null,
                  protein: 0,
                  fat: 0,
                  carbohydrates: 0,
                });
              }}
            >
              <CircleX />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => handleEditSave(food, table)}
            >
              <Save />
            </Button>
          </div>
        );
      }

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() =>
                table.options.meta?.setEditingData({
                  rowIndex: row.index,
                  name: food.name,
                  calories: food.calories,
                  protein: food.protein!,
                  fat: food.fat!,
                  carbohydrates: food.carbohydrates!,
                })
              }
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDelete(food)}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
