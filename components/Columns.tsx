"use client";

import { ColumnDef } from "@tanstack/react-table";
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
import { MoreHorizontal } from "lucide-react";
import { deleteFood } from "@/actions/dashboardActions";
import { toast } from "sonner";

function handleDelete(food: Food) {
  toast.promise(deleteFood(food.foodId), {
    loading: "Deleting food item...",
    success: "Food item deleted successfully",
    error: "Error deleting food item",
  });
}

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
    cell: ({ row }) => {
      const food = row.original;

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
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDelete(food)}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
