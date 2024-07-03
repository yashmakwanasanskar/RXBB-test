import { DataTablePagination } from "@/components/shared/data-table-pagination";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AddEventImage,
  EventLocationImage,
  LinkImage,
  patientListSearchIcon,
  patientListViewIcon,
} from "@/constants/images";
import { PatientAppointmentList } from "@/types";
import {
  Cell,
  ColumnDef,
  ColumnFiltersState,
  Header,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { CSSProperties, useId, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";

// needed for row & cell level scope DnD setup
import {
  PatientAppointmentFieldsData,
  PatientAppointmentLabelData,
} from "@/constants/fields";
import { changeColumnPosition } from "@/helpers/API/changePositionFields";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { convertToAmPm, formatTime } from "@/utilities/utils";
import { CustomDrawer } from "@/components/shared/drawer/drawer";
import ViewLocation from "./add-edit-service-location";
// Component for draggable table header
const DraggableTableHeader = ({
  header,
}: {
  header: Header<PatientAppointmentList, unknown>;
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
const DragAlongCell = ({
  cell,
}: {
  cell: Cell<PatientAppointmentList, unknown>;
}) => {
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
  filterProps,
}: {
  data: any;
  setFilter: any;
  setPageSize: any;
  getPageSize: any;
  getAllDataCount: number;
  getLimitStart: number;
  setLimitStart: any;
  filterProps: any;
}) {
  // Define table columns
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [openAddLocation, setOpenAddLocation] = useState<boolean>(false);
  const [openEditLocation, setOpenEditLocation] = useState<boolean>(false);

  const columns = useMemo<ColumnDef<PatientAppointmentList>[]>(
    () => [
      // Each column definition with accessor, header, cell renderer, and size
      {
        accessorKey: "healthcare_service_unit_name",
        id: "healthcare_service_unit_name",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
              className="text-[#474747] font-semibold text-xs lg:text-sm"
            >
              Location
              <ArrowUpDown className="ml-2 w-3 h-3 sm:w-4 sm:h-4" />
            </Button>
          );
        },
        cell: ({ row }: any) => (
          <div className="">{row.original.healthcare_service_unit_name}</div>
        ),
        size: 0,
      },
      {
        accessorKey: "company",
        id: "company",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
              className="text-[#474747] font-semibold text-xs lg:text-sm"
            >
              Company
              <ArrowUpDown className="ml-2 w-3 h-3 sm:w-4 sm:h-4" />
            </Button>
          );
        },
        cell: ({ row }: any) => {
          return (
            <div>
              <div
                className={`md:w-28 xl:w-32 py-1.5 rounded-full mr-2 text-center place-content-center ${getStatusColor(
                  row
                )}`}
              >
                {row.original.company}
              </div>
            </div>
          );
        },
        size: 60,
      },
      {
        accessorKey: "name",
        id: "name",

        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              className="text-[#474747] font-semibold text-xs lg:text-sm"
            >
              ID
              <ArrowUpDown className="ml-2 w-3 h-3 sm:w-4 sm:h-4" />
            </Button>
          );
        },
        cell: ({ row }: any) => <div className=" ">{row.original.name}</div>,

        size: 0,
      },
      {
        accessorKey: "custom_opening_time",
        id: "custom_opening_time",

        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              className="text-[#474747] font-semibold text-xs lg:text-sm"
            >
              Opening Time
              <ArrowUpDown className="ml-2 w-3 h-3 sm:w-4 sm:h-4" />
            </Button>
          );
        },
        cell: ({ row }: any) => (
          <div className=" ">
            {convertToAmPm(formatTime(row.original.custom_opening_time))}
          </div>
        ),

        size: 0,
      },
      {
        accessorKey: "custom_closing_time",
        id: "custom_closing_time",

        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              className="text-[#474747] font-semibold text-xs lg:text-sm"
            >
              Closing Time
              <ArrowUpDown className="ml-2 w-3 h-3 sm:w-4 sm:h-4" />
            </Button>
          );
        },
        cell: ({ row }: any) => (
          <div className=" ">
            {convertToAmPm(formatTime(row.original.custom_closing_time))}
          </div>
        ),

        size: 0,
      },
    ],
    []
  );
  const {
    cmrServiceChecBox,
    setCmrServiceChecBox,
    immunizationServiceChecBox,
    setImmunizationServiceChecBox,
    getListofFields,
    setListofFields,
    customFilter,
    setCustomFilter,
    setReloadData,
  } = filterProps;
  // Router hook for navigation
  const router = useNavigate();
  const [getCurrentID, setCurrentID] = useState<string>("");
  const [toggleView, setToggleView] = useState<boolean>(false);
  const [openFilter, onOpenFilter] = useState<boolean>(false);
  const [customFilterFieldState, setCustomFilterFieldState] = useState<any>([]);

  // State hooks for table settings
  const [columnOrder, setColumnOrder] = useState<string[]>(getListofFields);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
    PatientAppointmentFieldsData.filter(
      (field: string) => !getListofFields.includes(field)
    ).reduce((acc: { [key: string]: boolean }, field: string) => {
      acc[field] = false;
      return acc;
    }, {})
  );
  const [events, setEvents] = useState<any>([]);
  const [getAppointmenCalender, setAppointmentCalender] = useState<any>([]);

  const [getAppointmentFilterCalender, setAppointmentFilterCalender] =
    useState<any>([]);
  // useEffect(() => {
  //   console.log("getlistfield", getListofFields);
  //   if (getListofFields) {
  //     console.log(getListofFields, columnVisibility);
  //     setColumnOrder(getListofFields);
  //     setColumnVisibility(
  //       PatientAppointmentFieldsData.filter(
  //         (field: string) => !getListofFields.includes(field)
  //       ).reduce((acc: { [key: string]: boolean }, field: string) => {
  //         acc[field] = false;
  //         return acc;
  //       }, {})
  //     );
  //   }
  // }, [getListofFields]);

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
        changeColumnPosition("Event", visibleChangedFields, [])
          .then((response) => {
            setListofFields(response);
          })
          .catch((error) => {
            console.error("Error changing column position", error);
          });

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

  const removedAddFields = async (value: boolean, column: any) => {
    if (value) {
      console.log(getListofFields);
      const newAppendedList = getListofFields.concat(column.id);
      const visibleChangedFields = {
        disable_count: 1,
        disable_comment_count: 1,
        disable_sidebar_stats: 1,
        disable_auto_refresh: 1,
        total_fields: getListofFields.length + 1,
        fields: JSON.stringify(
          newAppendedList.map((field: string) => {
            return {
              fieldname: field,
              label: PatientAppointmentLabelData[field],
            };
          })
        ),
      };
      const response = await changeColumnPosition(
        "Event",
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
            return {
              fieldname: field,
              label: PatientAppointmentLabelData[field],
            };
          })
        ),
      };
      const response = await changeColumnPosition(
        "Event",
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
        <div className="flex items-center justify-between pt-4">
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
              placeholder="Search by Location"
              // value={
              //   (table.getColumn("patient")?.getFilterValue() as string) ?? ""
              // }
              // onChange={(event) =>
              //   table.getColumn("patient")?.setFilterValue(event.target.value)
              // }
              onChange={(event) => {
                setFilter(event.target.value);
              }}
              className="lg:text-base placeholder:text-[#A6A6A6] block bg-[#FFFFFF] w-full border rounded-md py-2 pl-9 pr-3 sm:text-sm "
            />
          </div>
          <div className="flex gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="ml-auto border border-[#CCCCCC]"
                >
                  <img
                    src={patientListViewIcon.path}
                    alt={patientListViewIcon.alt}
                    width={25}
                    height={100}
                    className="sm:mr-2"
                  />
                  {/* <p className="hidden sm:block lg:text-sm">View</p> */}
                </Button>
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
                          if (value === false && getListofFields.length <= 4) {
                            return;
                          }
                          column.toggleVisibility(!!value);
                          removedAddFields(value, column);
                        }}
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              className=" text-[#0049C6] bg-white border-2 rounded-lg border-[#0049C6] font-medium sm:text-xs lg:text-sm 2xl:text-base"
              onClick={() => setOpenAddLocation(true)}
            >
              <img
                src={AddEventImage.path}
                alt={AddEventImage.alt}
                width={25}
                height={100}
                className="sm:mr-2"
              />
              <p className="hidden sm:block lg:text-sm">Add Service Location</p>
            </Button>

            <CustomDrawer
              open={openAddLocation}
              title="Add Location Details"
              setOpen={setOpenAddLocation}
              contentChilder={
                <ViewLocation
                  onOpen={setOpenAddLocation}
                  from="add"
                  id="add-location-fbweuifbwejef"
                  setReloadData={setReloadData}
                />
              }
            />
          </div>
        </div>

        <div className={`overflow-auto flex-grow`}>
          <div className="">
            <Table>
              <TableHeader className="bg-[#EBEBEB] pharmehr-table-center ">
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
                      onClickCapture={() => {
                        setCurrentID(row.original.name);
                        setOpenEditLocation(true);
                      }}
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
            <CustomDrawer
              open={openEditLocation}
              title="Edit Location Details"
              setOpen={setOpenEditLocation}
              contentChilder={
                <ViewLocation
                  onOpen={setOpenEditLocation}
                  from="edit"
                  id={getCurrentID}
                  setReloadData={setReloadData}
                />
              }
            />
          </div>
        </div>
        <DataTablePagination
          table={table}
          className="flex justify-between mt-4 sticky bottom-1 py-2"
          setPageSize={setPageSize}
          getPageSize={getPageSize}
          getAllDataCount={getAllDataCount}
          getLimitStart={getLimitStart}
          setLimitStart={setLimitStart}
        />
      </div>
    </DndContext>
  );
}

// Helper function to determine background color based on status
function getStatusBgColor(row: any) {
  switch (row.original.status) {
    case "Scheduled":
      return "bg-[#D9EDE6]";
    case "Transferred":
      return "bg-[#F8F5C4]";
    case "Inactive":
      return "bg-[#FFE3E3]";
    default:
      return "bg-[#D9EDE6]";
  }
}

// Helper function to determine text color based on status
function getStatusColor(row: any) {
  switch (row.original.status) {
    case "Draft":
      return "text-[#EF5D5D] bg-[#FFE3E3]";
    case "Open":
      return "text-[#1462E7] bg-[#DEEAFF]";
    case "Scheduled":
      return "text-[#BCA900] bg-[#F8F5C4]";
    case "Completed":
      return "text-[#008993] bg-[#D9EDE6]";
    case "Active":
      return "text-[#008993] bg-[#D9EDE6]";
    case "Transferred":
      return "text-[#BCA900] bg-[#F8F5C4]";
    case "Inactive":
      return "text-[#EF5D5D] bg-[#FFE3E3]";
    case "Closed":
      return "text-[#EF5D5D] bg-[#FFE3E3]";
    case "Canceled":
      return "text-[#BCA900] bg-[#F8F5C4]";
    default:
      return "";
  }
}
