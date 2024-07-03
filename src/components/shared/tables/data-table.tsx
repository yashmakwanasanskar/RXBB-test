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
  EditIconTable,
  SettingIconTable,
} from "@/constants/images";
import { useEffect } from "react";
import { visibilityInitializer } from "@/utilities/utils";
import { constants } from "buffer";
import { TableViewColumnVisibility } from "@/helpers/API/changePositionFields";
import { Label } from "@/components/ui/label";

export function DataTable({
  data,
  columns,
  label,
  onOpen,
  onEditOpen,
  setData,
  tableViewFieldState,
  setTableViewFieldState,
  allFields,
  doctype,
  userSettingLabel,
  title = undefined,
  editable = false,
  addable = false,
  setEditDataIndex,
}: {
  data: any;
  columns: any[];
  label: string;
  onEditOpen?: any;
  onOpen?: any;
  setData: any;
  tableViewFieldState: any;
  setTableViewFieldState: any;
  allFields: any;
  doctype: string;
  userSettingLabel: string;
  title?: string;
  editable?: boolean;
  addable?: boolean;
  setEditDataIndex?: any;
}) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>(
      visibilityInitializer(tableViewFieldState, userSettingLabel, allFields)
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
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });
  const visibilityTransformData = async (check: boolean, column: any) => {
    let visibleColumnData = allFields
      .filter((field: string) => columnVisibility[field] !== false)
      .map((field: any) => ({ fieldname: field, columns: 2 }));

    if (check) {
      // Add the column if it's not already present
      if (!visibleColumnData.some((col: any) => col.fieldname === column)) {
        visibleColumnData.push({ fieldname: column.id, columns: 2 });
      }
    } else {
      // Remove the column if it's present
      visibleColumnData = visibleColumnData.filter(
        (col: any) => col.fieldname !== column.id
      );
    }

    const newTableViewFieldState = {
      ...tableViewFieldState,
      GridView: {
        ...tableViewFieldState.GridView,
        [userSettingLabel]: visibleColumnData,
      },
    };

    const response = await TableViewColumnVisibility(
      doctype,
      newTableViewFieldState,
      userSettingLabel
    );
    setTableViewFieldState(response.message);
  };

  return (
    <div className="w-full">
      <div className="py-3 w-full flex justify-between gap-2">
        <Label
          className={`text-[#303348] font-semibold text-lg align-middle ${
            !title && "invisible"
          }`}
        >
          {title}
        </Label>
        <div className="flex gap-2">
          {table.getFilteredSelectedRowModel().rows?.length > 0 && (
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
                  prev.filter(
                    (_: any, idx: number) => !listOfIndex.includes(idx)
                  )
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
          {addable && (
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
          )}
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
                <th className="w-14 h-12 text-right align-right text-[#303348] bg-[#EBEBEB] font-extrabold">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <div className=" flex justify-center items-center min-h-full min-w-full">
                        <img
                          src={SettingIconTable.path}
                          alt={SettingIconTable.alt}
                          className="w-4 h-4 min-h-4 min-w-4"
                        />
                      </div>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                      {table
                        .getAllColumns()
                        .filter((column) => column.getCanHide())
                        .map((column) => {
                          return (
                            <DropdownMenuCheckboxItem
                              key={column.id}
                              className="capitalize"
                              checked={column.getIsVisible()}
                              onCheckedChange={(value) => {
                                column.toggleVisibility(!!value);
                                visibilityTransformData(value, column);
                              }}
                            >
                              {column.id}
                            </DropdownMenuCheckboxItem>
                          );
                        })}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </th>
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

                  <td>
                    {editable && (
                      <div className="flex justify-center">
                        <img
                          src={EditIconTable.path}
                          alt={EditIconTable.alt}
                          className="w-7 h-7 min-h-7 min-w-7 cursor-pointer"
                          onClick={(e) => {
                            setEditDataIndex(row.index)
                            onEditOpen((prev: any) => !prev);
                          }}
                        />
                      </div>
                    )}
                  </td>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns?.length}
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
