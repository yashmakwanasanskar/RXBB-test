;

import { useMemo, useState, useId } from "react";
import { useNavigate } from "react-router-dom";
import {
  ColumnFiltersState,
  SortingState,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTablePagination } from "@/components/shared/data-table-pagination";
import { PatientAppointment } from "@/types";

// needed for table body level scope DnD setup
import { DndContext, closestCenter } from "@dnd-kit/core";
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers";

// needed for row & cell level scope DnD setup
import { Checkbox } from "@/components/ui/checkbox";

// Main DataTable component
export function DataTable({ data,setPageSize,getPageSize,getAllDataCount,getLimitStart,setLimitStart }: { data: any,setPageSize:any,getPageSize:any,getAllDataCount:number,getLimitStart:number,setLimitStart:any}) {
  // Define table columns
  const columns = useMemo<ColumnDef<PatientAppointment>[]>(
    () => [
      // Each column definition with accessor, header, cell renderer, and size
      {
        id: "select",
        header: ({ table }:any) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
          />
        ),
        cell: ({ row }:any) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "title",
        id: "title",
        header: () => {
          return (
            <span className="text-[#474747]  font-semibold text-xs lg:text-sm ">
              TITLE
            </span>
          );
        },
        cell: ({ row }: any) => (
          <div className="flex ">
            {row.original.title}
          </div>
        ),
        size: 0,
      },
      {
        accessorKey: "status",
        id: "status",
        header: () => {
          return (
            <span className="text-[#474747] mr-2 font-semibold text-xs lg:text-sm">
              STATUS
            </span>
          );
        },
        cell: ({ row }: any) => (
          <div
            className={`md:w-28 xl:w-32 h-7 xl:h-8 rounded-full mr-2 text-center place-content-center ${getStatusBgColor(
              row
            )} ${getStatusTextColor(row)}`}>
            {row.original.status}
          </div>
        ),
        size: 0,
      },
      {
        accessorKey: "appointment_date",
        id: "appointment_date",
        header: () => (
          <span className="text-[#474747] mr-2 font-semibold text-xs lg:text-sm">
            Date
          </span>
        ),
        size: 60,
      },
      // {
      //   accessorKey: "patient_name",
      //   id: "patient_name",
      //   header: () => (
      //     <span className="text-[#474747] mr-2 font-semibold text-xs lg:text-sm">
      //       PATIENTS
      //     </span>
      //   ),
      //   size: 0,
      // },
      {
        accessorKey: "name",
        id: "name",
        header: () => (
          <span className="text-[#474747] mr-2 font-semibold text-xs lg:text-sm">
            ID
          </span>
        ),
        size: 0,
      },
    ],
    []
  );

  // Router hook for navigation
  const router = useNavigate();

  // State hooks for table settings
  const [columnOrder, setColumnOrder] = useState<string[]>(
    columns.map((c) => c.id!)
  );
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  // React-table hook to manage table state and interactions
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),

    state: {
      sorting,
      columnFilters,
      columnOrder,
    },
    onColumnOrderChange: setColumnOrder,
  });

  const id = useId();

  // JSX for rendering the DataTable component
  return (
    <DndContext
      collisionDetection={closestCenter}
      modifiers={[restrictToHorizontalAxis]}
      id={id}>
      <div className="space-y-4 mt-5">
        {/* Search, View, Add Patients Buttons */}
        <div className="rounded-md border overflow-auto h-[65vh]">
          <div className="">
            <Table className="">
              <TableHeader className="bg-[#EBEBEB] pharmehr-table-center">
                {/* Table Header */}
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id} className="px-4 ">
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

              <TableBody className="">
                {/* Table Body */}
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                      className="font-medium sm:text-xs lg:text-sm bg-[#FFFFFF]"
                      onClick={() =>
                        router(`/appointments/${row.original.name}`)
                      }>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id} className="align-left">
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
                      className="h-24 text-center">
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
        <DataTablePagination table={table} setPageSize={setPageSize} getPageSize={getPageSize} getAllDataCount={getAllDataCount} getLimitStart={getLimitStart} setLimitStart={setLimitStart}/>
      </div>
    </DndContext>
  );
}

// Helper function to determine background color based on status
function getStatusBgColor(row: any) {
  switch (row.original.status) {
    case "Scheduled":
      return "bg-[#F8F5C4]";
    case "Completed":
      return "bg-[#D9EDE6]";
    case "Draft":
      return "bg-[#FFE3E3]";
    default:
      return "";
  }
}

// Helper function to determine text color based on status
function getStatusTextColor(row: any) {
  switch (row.original.status) {
    case "Scheduled":
      return "text-[#BCA900]";
    case "Completed":
      return "text-[#008993]";
    case "Draft":
      return "text-[#EF5D5D]";
    default:
      return "";
  }
}
