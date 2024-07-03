"use client";

import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AddIconTable,
  DeleteIconTable,
  SettingIconTable,
} from "@/constants/images";
import { useEffect } from "react";
import { visibilityInitializer } from "@/utilities/utils";
import { constants } from "buffer";
import { TableViewColumnVisibility } from "@/helpers/API/changePositionFields";
import { Label } from "@/components/ui/label";

export function DataTableWIthoutVisibility({
  data,
  columns,
  label,
  onOpen,
  setData,
  title = undefined
}: {
  data: any;
  columns: any[];
  label: string;
  onOpen: any;
  setData: any;
  title?:string;
}) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [rowSelection, setRowSelection] = React.useState({});
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      
      <div className="py-3 w-full flex justify-between gap-2">
        <Label className={`text-[#303348] font-semibold text-lg align-middle ${!title && "invisible"}`}>
          {title}
        </Label>
        <div className="flex gap-2">
        {table.getFilteredSelectedRowModel().rows.length > 0 && (
          <Button
            variant={"outline"}
            className="bg-[#FF425A] text-[#303348] space-x-1  rounded-xl hover:bg-[#DF283F]"
            onClick={() => {
              const listOfIndex = table
                .getFilteredSelectedRowModel()
                .rows.reduce((indices: any, item: any) => {
                  indices.push(item.index); // Assuming 'id' is the key representing the index
                  return indices;
                }, []);
              setData((prev: any) =>
                prev.filter((_: any, idx: number) => !listOfIndex.includes(idx))
              );
              table.resetRowSelection(false);
            }}
          >
            <img
              src={DeleteIconTable.path}
              alt={DeleteIconTable.alt}
              className="w-4 h-4 min-w-4 min-h-4"
            />
          </Button>
        )}
        <Button
          variant={"outline"}
          className="bg-[#FFFFFF] border-[#EBEBEB] text-[#303348] space-x-1 rounded-lg font-semibold"
          onClick={(e) => onOpen((prev: any) => !prev)}
        >
          <img
            src={AddIconTable.path}
            alt={AddIconTable.alt}
            className="w-4 h-4 min-w-4 min-h-4"
          />
          <span>Add {label}</span>
        </Button>
        </div>

      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader className="w-full">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="text-[#303348] bg-[#EBEBEB] font-extrabold"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody className="bg-white">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
