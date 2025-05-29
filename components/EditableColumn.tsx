"use client";

import { Food } from "@/db/schema";
import { ColumnDef, Table } from "@tanstack/react-table";
import { Input } from "./ui/input";
import { useCallback, useEffect, useRef, useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { FieldSchemas } from "@/lib/zodSchemas";

function EditableCell({
  initialValue,
  id,
  table,
}: {
  initialValue: unknown;
  id: string;
  table: Table<Food>;
}) {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState<string>("");
  const [isValidating, setIsValidating] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Reset local value when initialValue changes (row switching)
  useEffect(() => {
    setValue(initialValue);
    setError("");
  }, [initialValue]);

  // Validate input value
  const validateValue = useCallback((inputValue: unknown, fieldId: string) => {
    try {
      const schema =
        FieldSchemas[fieldId as keyof typeof FieldSchemas] || z.string();
      const validatedValue = schema.parse(inputValue);
      return { success: true, data: validatedValue, error: null };
    } catch (error) {
      if (error instanceof z.ZodError) {
        return {
          success: false,
          data: null,
          error: error.errors[0].message,
        };
      }
      return {
        success: false,
        data: null,
        error: "Invalid input",
      };
    }
  }, []);
  // Handle blur event with validation
  const handleBlur = useCallback(async () => {
    setIsValidating(true);

    const validation = validateValue(value, id);

    if (validation.success) {
      // Update the editing data with validated value
      table.options.meta?.setEditingData({
        ...table.options.meta.editingData,
        [id]: validation.data,
      });
      setError("");
    } else {
      // Show error and revert to previous value
      setError(validation.error || "Invalid input");
      setValue(initialValue);
      toast.error(`Invalid ${id}: ${validation.error}`);

      // Focus back to input for correction
      setTimeout(() => inputRef.current?.focus(), 100);
    }

    setIsValidating(false);
  }, [value, id, initialValue, table.options.meta, validateValue]);

  // Handle input change
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
      // Clear error on change to give immediate feedback
      if (error) setError("");
    },
    [error]
  );

  // Handle key events
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.currentTarget.blur(); // Trigger validation
      } else if (e.key === "Escape") {
        setValue(initialValue); // Revert changes
        setError("");
        e.currentTarget.blur();
      }
    },
    [initialValue]
  );

  // Save the value to the table's meta object state when the blur event is triggered

  return (
    <div className="relative">
      <Input
        ref={inputRef}
        value={value as string | number}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={`
          ${error ? "border-red-500 focus:border-red-500" : ""}
          ${isValidating ? "opacity-50" : ""}
        `}
        disabled={isValidating}
        placeholder={`Enter ${id}...`}
      />
      {error && (
        <div className="absolute top-full left-0 mt-1 text-xs text-red-500 whitespace-nowrap z-10">
          {error}
        </div>
      )}
    </div>
  );
}

export const DefaultColumn: Partial<ColumnDef<Food>> = {
  cell: ({ getValue, row: { index }, column: { id }, table }) => {
    const initialValue = getValue();

    // If the row is being edited, render the editable cell
    if (table.options.meta?.editingData.rowIndex === index) {
      return <EditableCell initialValue={initialValue} id={id} table={table} />;
    } else {
      return initialValue;
    }
  },
};
