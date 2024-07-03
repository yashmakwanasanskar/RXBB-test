
import { useMemo, useState, useId } from "react";
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
import { Button } from "@/components/ui/button";
import { PatientAppointment } from "@/types";
import { addBlueIcon } from "@/constants/images";

// needed for table body level scope DnD setup
import { DndContext, closestCenter } from "@dnd-kit/core";
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers";

// needed for row & cell level scope DnD setup
import { Checkbox } from "@/components/ui/checkbox";

// Main DataTable component
export function DataTable({ data }: { data: any }) {
  // Define table columns
  const columns = useMemo<ColumnDef<PatientAppointment>[]>(
    () => [
      // Each column definition with accessor, header, cell renderer, and size
      {
        id: "select",
        header: ({ table }) => (
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
        cell: ({ row }) => (
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
            <span className="text-[#474747] mr-2 font-semibold text-xs lg:text-sm">
              TITLE
            </span>
          );
        },
        cell: ({ row }: any) => (
          <div className="flex gap-2">
            <img
              src={row.original.userImg}
              alt=""
              width={30}
              height={30}
              className=""
            />
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
        accessorKey: "date",
        id: "date",
        header: () => (
          <span className="text-[#474747] mr-2 font-semibold text-xs lg:text-sm">
            Date
          </span>
        ),
        size: 60,
      },
      {
        accessorKey: "patients",
        id: "patients",
        header: () => (
          <span className="text-[#474747] mr-2 font-semibold text-xs lg:text-sm">
            PATIENTS
          </span>
        ),
        size: 0,
      },
      {
        accessorKey: "id",
        id: "id",
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
  // const router = useNavigate();

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
      <div className="space-y-4">
        {/* Search, View, Add Patients Buttons */}
        <div className="text-right pt-4">
          <Button className="ml-4 text-[#0049C6] bg-white border-2 rounded-lg border-[#0049C6] font-medium sm:text-xs lg:text-sm 2xl:text-base">
            <img
              src={addBlueIcon.path}
              alt={addBlueIcon.alt}
              width={20}
              height={100}
              className="sm:mr-2 text-[#0049C6]"
            />
            <p className="hidden sm:block lg:text-sm">
              Add Patients Appointment
            </p>
          </Button>
        </div>

        <div className="rounded-md border overflow-auto">
          <div className="overflow-auto">
            <Table className="">
              <TableHeader className="bg-[#EBEBEB] pharmehr-table-center">
                {/* Table Header */}
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
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

              <TableBody className="pharmehr-table-padding">
                {/* Table Body */}
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                      className="font-medium sm:text-xs lg:text-sm bg-[#FFFFFF]">
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
                      className="h-24 text-center">
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
        {/* <DataTablePagination table={table} /> */}
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
