import { CSSProperties, useEffect, useMemo, useState } from "react";
import { useId } from "react";
import { useNavigate } from "react-router-dom";
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  Cell,
  ColumnDef,
  Header,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTablePagination } from "@/components/shared/data-table-pagination";
import { PatientInfo } from "@/types";
import { ArrowUpDown } from "lucide-react";
import {
  patientListAddIcon,
  patientListSearchIcon,
  patientListViewIcon,
} from "@/constants/images";

// needed for table body level scope DnD setup
import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";

// needed for row & cell level scope DnD setup
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { changeColumnPosition } from "@/helpers/API/changePositionFields";
import { PatientFIeldData, PatientLabelData } from "@/constants/fields";

// Component for draggable table header
const DraggableTableHeader = ({
  header,
}: {
  header: Header<PatientInfo, unknown>;
}) => {
  // Hook to enable sorting
  const { attributes, isDragging, listeners, setNodeRef, transform } =
    useSortable({ id: header.column.id });
  const style: CSSProperties = {
    opacity: isDragging ? 0.8 : 1,
    position: "relative",
    transform: CSS.Translate.toString(transform),
    transition: "width transform 0.2s ease-in-out",
    whiteSpace: "nowrap",
    width: header.column.getSize(),
    zIndex: isDragging ? 1 : 0,
  };
  return (
    <th colSpan={header.colSpan} ref={setNodeRef} style={style}>
      {/* Render the header content */}
      {header.isPlaceholder
        ? null
        : flexRender(header.column.columnDef.header, header.getContext())}
      {/* Render the sorting button */}
      <button {...attributes} {...listeners}>
        ::
      </button>
    </th>
  );
};

// Component for draggable table cell
const DragAlongCell = ({ cell }: { cell: Cell<PatientInfo, unknown> }) => {
  // Hook to enable sorting
  const { isDragging, setNodeRef, transform } = useSortable({
    id: cell.column.id,
  });
  const style: CSSProperties = {
    opacity: isDragging ? 0.8 : 1,
    position: "relative",
    transform: CSS.Translate.toString(transform),
    transition: "width transform 0.2s ease-in-out",
    zIndex: isDragging ? 1 : 0,
  };

  return (
    <td style={style} ref={setNodeRef}>
      {/* Render the cell content */}
      {flexRender(cell.column.columnDef.cell, cell.getContext())}
    </td>
  );
};

// Main DataTable component
export function DataTable({
  data,
  setFilter,
  setPageSize,
  getPageSize,
  getAllDataCount,
  getLimitStart,
  setLimitStart,
  dataTableProps,
}: {
  data: any;
  setFilter: any;
  setPageSize: any;
  getPageSize: any;
  getAllDataCount: number;
  getLimitStart: number;
  setLimitStart: any;
  dataTableProps: any;
}) {
  // Define table columns
  const columns = useMemo<ColumnDef<PatientInfo>[]>(
    () => [
      // Each column definition with accessor, header, cell renderer, and size
      {
        accessorKey: "patient_name",
        id: "patient_name",
        columnName: "Patients Full Name",

        header: ({ column }: any) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
              className="text-[#474747]  font-semibold text-xs lg:text-sm"
            >
              NAME
              <ArrowUpDown className="ml-2 w-3 h-3 sm:w-4 sm:h-4" />
            </Button>
          );
        },
        cell: ({ row }: any) => (
          <div className="flex items-center h-7 xl:h-8">
            {/* <img
              src={row.original.image?row.original.image:userProfile.path}
              alt=""
              width={30}
              height={30}
              className="mx-2"
            /> */}
            {row.original.patient_name}
          </div>
        ),
        size: 0,
      },
      {
        accessorKey: "dob",
        id: "dob",
        columnName: "Patient DOB",

        header: ({ column }: any) => {
          return (
            <Button
              variant="ghost"
              className="text-[#474747] font-semibold text-xs lg:text-sm"
            >
              DOB
              <ArrowUpDown className="ml-2 w-3 sm:w-4 sm:h-4" />
            </Button>
          );
          
        },
        size: 60,
        cell: ({ row }: any) => {
          return <div className="h-7 xl:h-8">{row.original.dob}</div>;
        },
      },
      {
        accessorKey: "sex",
        id: "sex",
        columnName: "Patient Gender",

        header: ({ column }: any) => {
          return (
            <Button
              variant="ghost"
              className="text-[#474747] font-semibold text-xs lg:text-sm"
            >
              GENDER
              <ArrowUpDown className="ml-2 w-3 sm:w-4 sm:h-4" />
            </Button>
          );
          
        },

        cell: ({ row }: any) => {
          return <div className="h-7 xl:h-8">{row.original.sex}</div>;
        },
        size: 0,
      },
      {
        accessorKey: "email",
        id: "email",
        columnName: "Email",

        header: ({ column }: any) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
              className="my-2 text-[#474747] font-semibold text-xs lg:text-sm"
            >
              EMAIL
              <ArrowUpDown className="ml-2 w-3 h-3 sm:w-4 sm:h-4" />
            </Button>
          );
        },
        cell: ({ row }: any) => {
          return <div className="h-7 xl:h-8">{row.original.email}</div>;
        },
        size: 0,
      },
      {
        accessorKey: "mobile",
        id: "mobile",
        columnName: "Phone Number",

        header: ({ column }: any) => {
          return (
            <Button
              variant="ghost"
              className="text-[#474747] font-semibold text-xs lg:text-sm"
            >
              PHONE NUMBER
              <ArrowUpDown className="ml-2 w-3 sm:w-4 sm:h-4" />
            </Button>
          );
          
        },
        size: 0,
        cell: ({ row }: any) => {
          return <div className="h-7 xl:h-8">{row.original.mobile}</div>;
        },
      },
      {
        accessorKey: "status",
        id: "status",
        columnName: "Status",

        header: ({ column }: any) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
              className="text-[#474747] font-semibold text-xs lg:text-sm"
            >
              STATUS
              <ArrowUpDown className="ml-2 w-3 sm:w-4 sm:h-4" />
            </Button>
          );
          
        },
        cell: ({ row }: any) => (
          <div
            className={`md:w-28 xl:w-32 h-7 xl:h-8 rounded-full mr-2 text-center place-content-center ${getStatusBgColor(
              row
            )} ${getStatusTextColor(row)}`}
          >
            {row.original.status}
          </div>
        ),
        size: 0,
      },
      // {
      //   accessorKey: "address",
      //   id: "address",
      //   header: () => (
      //     <span className="text-[#474747] mr-2 font-semibold text-xs lg:text-sm">
      //       ADDRESS
      //     </span>
      //   ),
      //   size: 0,
      // },
      // {
      //   accessorKey: "insurance",
      //   id: "insurance",
      //   header: () => (
      //     <span className="text-[#474747] mr-2 font-semibold text-xs lg:text-sm">
      //       INSURANCE
      //     </span>
      //   ),
      //   size: 0,
      // },
      // {
      //   accessorKey: "totalAppointments",
      //   id: "totalAppointments",
      //   header: () => (
      //     <span className="text-[#474747] mr-2 font-semibold text-xs lg:text-sm">
      //       TOTAL APPOINTMENTS
      //     </span>
      //   ),
      //   size: 0,
      // },
    ],
    []
  );
  // Router hook for navigation
  const router = useNavigate();
  const { getListofFields, setListofFields } = dataTableProps;
  // State hooks for table settings
  const [columnOrder, setColumnOrder] = useState<string[]>(getListofFields);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
    PatientFIeldData.filter(
      (field: string) => !getListofFields.includes(field)
    ).reduce((acc: { [key: string]: boolean }, field: string) => {
      acc[field] = false;
      return acc;
    }, {})
  );
  useEffect(()=>{
    console.log(columnVisibility,getListofFields)
  },)
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
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      columnOrder,
    },
    onColumnOrderChange: setColumnOrder,
  });

  // Handle drag end event for reordering columns
  function handleDragEnd(event: any) {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      setColumnOrder((columnOrder) => {
        const oldIndex = columnOrder.indexOf(active.id as string);
        const newIndex = columnOrder.indexOf(over.id as string);
        const newFieldData = arrayMove(columnOrder, oldIndex, newIndex);
        const visibleChangedFields = {
          disable_count: 1,
          disable_comment_count: 1,
          disable_sidebar_stats: 1,
          disable_auto_refresh: 1,
          total_fields: newFieldData.length,
          fields: JSON.stringify(
            newFieldData.map((field: string) => {
              return { fieldname: field };
            })
          ),
        };

        // Perform the async operation outside of the state update
        changeColumnPosition("Patient", visibleChangedFields, [])
          .then((response) => {
            setListofFields(response);
          })
          .catch((error) => {});

        return newFieldData;
      });
    }
  }

  // Define sensors for drag and drop functionality
  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  );
  const id = useId();

  function onAddPatientHandleClick() {
    router("/patients/add-patient");
  }

  const removedAddFields = async (value: boolean, column: any) => {
    if (value) {
      const newAppendedList = getListofFields.concat(column.id);
      const visibleChangedFields = {
        disable_count: 1,
        disable_comment_count: 1,
        disable_sidebar_stats: 1,
        disable_auto_refresh: 1,
        total_fields: getListofFields.length + 1,
        fields: JSON.stringify(
          newAppendedList.map((field: string) => {
            return { fieldname: field, label: PatientLabelData[field] };
          })
        ),
      };
      const response = await changeColumnPosition(
        "Patient",
        visibleChangedFields,
        []
      );

      setListofFields(response);
    } else {
      const newDeletedList = getListofFields.filter(
        (field: string) => field !== column.id
      );
      const visibleChangedFields = {
        disable_count: 1,
        disable_comment_count: 1,
        disable_sidebar_stats: 1,
        disable_auto_refresh: 1,
        total_fields: newDeletedList.length,
        fields: JSON.stringify(
          newDeletedList.map((field: string) => {
            return { fieldname: field, label: PatientLabelData[field] };
          })
        ),
      };
      const response = await changeColumnPosition(
        "Patient",
        visibleChangedFields,
        [column.id]
      );
      setListofFields(response);
    }
  };

  // JSX for rendering the DataTable component
  return (
    <DndContext
      collisionDetection={closestCenter}
      modifiers={[restrictToHorizontalAxis]}
      onDragEnd={handleDragEnd}
      sensors={sensors}
      id={id}
    >
      <div className="h-[calc(100vh-150px)]  flex flex-col overflow-auto space-y-4">
        {/* Search, View, Add Patients Buttons */}
        <div className="flex items-center pt-4">
          <div className="border-2 rounded-xl w-40 sm:w-60 lg:w-[420px] relative block">
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              <img
                src={patientListSearchIcon.path}
                alt={patientListSearchIcon.alt}
                width={20}
                height={20}
                className="h-5 w-5 fill-slate-300"
              />
            </span>

            <Input
              placeholder="Search by patient"
              // value={
              //   (table.getColumn("patient_name")?.getFilterValue() as string) ??
              //   ""
              // }
              // onChange={(event) =>
              //   table
              //     .getColumn("patient_name")
              //     ?.setFilterValue(event.target.value)
              // }
              onChange={(event) => {
                setFilter(event.target.value);
              }}
              className="lg:text-base placeholder:text-[#A6A6A6] block bg-[#FFFFFF] w-full border rounded-md py-2 pl-9 pr-3 sm:text-sm"
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                <img
                  src={patientListViewIcon.path}
                  alt={patientListViewIcon.alt}
                  width={25}
                  height={100}
                  className="sm:mr-2"
                />
                <p className="hidden sm:block lg:text-sm">View</p>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column: any) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) => {
                        if (value === false && getListofFields.length <= 4) {
                          return;
                        }
                        column.toggleVisibility(!!value);
                        removedAddFields(value, column);
                      }}
                    >
                      {column.columnDef.columnName}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            className="ml-4 text-[#0049C6] bg-white border-2 rounded-lg border-[#0049C6] font-medium sm:text-xs lg:text-sm 2xl:text-base"
            onClick={onAddPatientHandleClick}
          >
            <img
              src={patientListAddIcon.path}
              alt={patientListAddIcon.alt}
              width={25}
              height={100}
              className="sm:mr-2"
            />
            <p className="hidden sm:block lg:text-sm">Add a patient</p>
          </Button>
        </div>

        <div className="rounded-md border overflow-auto flex-grow">
          <div className="">
            <Table className="">
              <TableHeader className="bg-[#EBEBEB] pharmehr-table-center">
                {/* Table Header */}
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    <SortableContext
                      items={columnOrder}
                      strategy={horizontalListSortingStrategy}
                    >
                      {headerGroup.headers.map((header) => {
                        return (
                          <DraggableTableHeader
                            key={header.id}
                            header={header}
                          />
                        );
                      })}
                    </SortableContext>
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
                      className="font-medium sm:text-xs lg:text-sm bg-[#FFFFFF] cursor-pointer"
                      onClick={() =>
                        router(`/patients/${row.original.name}`)
                      }
                    >
                      {row.getVisibleCells().map((cell) => (
                        <SortableContext
                          key={cell.id}
                          items={columnOrder}
                          strategy={horizontalListSortingStrategy}
                        >
                          <DragAlongCell key={cell.id} cell={cell} />
                        </SortableContext>
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
        <DataTablePagination
          table={table}
          setPageSize={setPageSize}
          getPageSize={getPageSize}
          getAllDataCount={getAllDataCount}
          getLimitStart={getLimitStart}
          setLimitStart={setLimitStart}
          className="flex justify-between mt-4 sticky bottom-1 py-2"

        />
      </div>
    </DndContext>
  );
}

// Helper function to determine background color based on status
function getStatusBgColor(row: any) {
  switch (row.original.status) {
    case "Active":
      return "bg-[#D9EDE6]";
    case "Transferred":
      return "bg-[#F8F5C4]";
    case "Inactive":
      return "bg-[#FFE3E3]";
    default:
      return "";
  }
}

// Helper function to determine text color based on status
function getStatusTextColor(row: any) {
  switch (row.original.status) {
    case "Active":
      return "text-[#008993]";
    case "Transferred":
      return "text-[#BCA900]";
    case "Inactive":
      return "text-[#EF5D5D]";
    default:
      return "";
  }
}
