"use client";

import { Food } from "@/db/schema";
import { ColumnDef, Table } from "@tanstack/react-table";
import { Input } from "./ui/input";
import { useState } from "react";

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

  // Save the value to the table's meta object state when the blur event is triggered
  return (
    <Input
      value={value as string | number}
      onChange={(e) => {
        setValue(e.target.value);
      }}
      onBlur={() => {
        table.options.meta?.setEditingData({
          ...table.options.meta.editingData,
          [id]: value,
        });
      }}
    />
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
