"use client";
import { Champion } from "@/@types/generated/typescript";
import {
  SortingState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";

const columnHelper = createColumnHelper<Champion>();

const columns = [
  columnHelper.accessor("name", {
    header: "Name",
  }),
  columnHelper.accessor("cost", {
    header: "Cost",
  }),
  columnHelper.accessor("health", {
    header: "Health",
    cell: (info) => info.getValue().join(" / "),
  }),
  columnHelper.accessor("armor", {
    header: "Armor",
  }),
  columnHelper.accessor("magic_resist", {
    header: "Magic Resist",
  }),
  columnHelper.accessor("damage", {
    header: "Damage",
    cell: (info) => info.getValue().join(" / "),
  }),
  columnHelper.accessor("attack_speed", {
    header: "Attack Speed",
  }),
  columnHelper.accessor("crit_rate", {
    header: "Critical Chance",
    cell: (info) => `%${info.getValue()}`,
  }),
];

export default function SimpleTable({ data }: { data: Champion[] }) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-2">
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="border rounded px-2 py-1">
                  {header.isPlaceholder ? null : (
                    <div
                      {...{
                        className: header.column.getCanSort()
                          ? "cursor-pointer select-none"
                          : "",
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{
                        asc: " 🔼",
                        desc: " 🔽",
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-2">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
