import { DataTablePagination } from "@/components/shared/data-table-pagination";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AddService,
  AppointmentDetailsImage,
  AppointmentServiceCMRImage,
  AppointmentServiceImmunizationImage,
  CMRAppointmentFilter,
  CalenderFilterImage,
  CalenderIcon,
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
import { Link, useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  CSSProperties,
  createContext,
  useEffect,
  useId,
  useMemo,
  useState,
} from "react";

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
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  PatientAppointmentFieldsData,
  PatientAppointmentLabelData,
  customFIlterFieldAppointment,
} from "@/constants/fields";
import { changeColumnPosition } from "@/helpers/API/changePositionFields";
import CustomFilter from "@/components/shared/CustomFilter";
import ROUTES from "@/constants/routes.constats";
import { table } from "console";
import { convertToAmPm, formatTime } from "@/utilities/utils";
import Schedule from "../schedule/schedule";
import { axiosGETAPI } from "@/helpers/commonAPI";
import API, { BASE_URL } from "@/constants/api.constant";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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

export const AppointmentContext = createContext<any>({});
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

  const columns = useMemo<ColumnDef<PatientAppointmentList>[]>(
    () => [
      // Each column definition with accessor, header, cell renderer, and size
      {
        accessorKey: "title",
        id: "title",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
              className="text-[#474747] font-semibold text-xs lg:text-sm"
            >
              TITLE
              <ArrowUpDown className="ml-2 w-3 h-3 sm:w-4 sm:h-4" />
            </Button>
          );
        },
        cell: ({ row }: any) => <div className="">{row.original.title}</div>,
        size: 0,
      },
      {
        accessorKey: "appointment_type",
        id: "appointment_type",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
              className="text-[#474747] font-semibold text-xs lg:text-sm"
            >
              APPOINTMENT TYPE
              <ArrowUpDown className="ml-2 w-3 h-3 sm:w-4 sm:h-4" />
            </Button>
          );
        },
        cell: ({ row }: any) => (
          <div className=" ">{row.original.appointment_type}</div>
        ),

        size: 0,
      },
      {
        accessorKey: "appointment_date",
        id: "appointment_date",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              className="text-[#474747] font-semibold text-xs lg:text-sm"
            >
              DATE
              <ArrowUpDown className="ml-2 w-3 h-3 sm:w-4 sm:h-4" />
            </Button>
          );
        },
        cell: ({ row }: any) => (
          <div className=" ">{row.original.appointment_date}</div>
        ),

        size: 0,
      },
      {
        accessorKey: "patient_name",
        id: "patient_name",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              className="text-[#474747] font-semibold text-xs lg:text-sm"
            >
              PATIENT
              <ArrowUpDown className="ml-2 w-3 h-3 sm:w-4 sm:h-4" />
            </Button>
          );
        },
        cell: ({ row }: any) => (
          <div className=" ">{row.original.patient_name}</div>
        ),

        size: 0,
      },
      {
        accessorKey: "appointment_time",
        id: "appointment_time",

        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              className="text-[#474747] font-semibold text-xs lg:text-sm"
            >
              TIME
              <ArrowUpDown className="ml-2 w-3 h-3 sm:w-4 sm:h-4" />
            </Button>
          );
        },
        cell: ({ row }: any) => (
          <div className=" ">
            {convertToAmPm(formatTime(row.original.appointment_time))}
          </div>
        ),

        size: 0,
      },

      {
        accessorKey: "status",
        id: "status",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
              className="text-[#474747] font-semibold text-xs lg:text-sm"
            >
              STATUS
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
                {row.original.status}
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
        id: "quick_link",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
              className="text-[#474747] font-semibold text-xs lg:text-sm"
            >
              Quick Links
            </Button>
          );
        },
        cell: ({ row }: any) => (
          <div className="cursor-pointer">
            <div className="flex gap-2">
              {
                <Link
                  className={`${
                    row.original.custom_service_type ? "visible" : "invisible"
                  }`}
                  to={`${
                    row.original.custom_service_type === "Immunization Service"
                      ? "/immunization-service/"
                      : "/cmr-service/"
                  }${row.original.custom_service_name}`}
                >
                  <Button
                    className="bg-[#F6F9FD] border gap-1 border-[#CCCCCC] text-[#303348]"
                    variant={"outline"}
                  >
                    {
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <img
                              src={AppointmentServiceCMRImage.path}
                              alt={AppointmentServiceCMRImage.alt}
                              className="w-5 h-5"
                            />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{row.original.custom_service_type}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    }
                  </Button>
                </Link>
              }
              <Link
                className="cursor-pointer"
                to={`/appointments/${row.original.name}`}
              >
                <Button
                  className="bg-[#F6F9FD] border gap-1 border-[#CCCCCC] text-[#303348]"
                  variant={"outline"}
                >
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <img
                          src={AppointmentDetailsImage.path}
                          alt={AppointmentDetailsImage.alt}
                          className="w-5 h-5"
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Appointment Details</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Button>
              </Link>
            </div>
          </div>
        ),
      },
    ],
    []
  );
  const {
    cmrServiceChecBox,
    setCmrServiceChecBox,
    immunizationServiceChecBox,
    setImmunizationServiceChecBox,
    setAppointmentTypeFilter,
    getListofFields,
    appointmentTypeFilter,
    setListofFields,
    customFilter,
    setCustomFilter,
    customFilterFieldState,
    setCustomFilterFieldState,
    reloadData,
    setReloadData
  } = filterProps;
  // Router hook for navigation
  const router = useNavigate();
  const [toggleView, setToggleView] = useState<boolean>(false);
  const [openFilter, onOpenFilter] = useState<boolean>(false);

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
  const [getAppointmenEventCalender, setAppointmentEventCalender] =
    useState<any>({});

  const [getAppointmentEventFilterCalender, setAppointmentEventFilterCalender] =
    useState<any>({});
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

  useEffect(() => {
    let filter = undefined;
    if (Object.keys(getAppointmenEventCalender).length > 0) {
      filter = JSON.stringify(
        customFilter.concat(
          appointmentTypeFilter.concat(
            Object.entries(getAppointmenEventCalender).map((item: any) => {
              return [item[0], "in", item[1]];
            }),
          )
        )
      );
    } else {
      filter = JSON.stringify(customFilter);
    }

    const fetchData = async () => {
      const params: any = {
        doctype: "Patient Appointment",
        start: "2024-01-01",
        end: "2024-12-31",
        field_map: JSON.stringify({
          start: "start",
          end: "end",
          id: "name",
          title: "patient",
          allDay: "allDay",
          eventColor: "color",
        }),
        filters: filter,
      };

      const baseUrl = `${BASE_URL}${API.APPOINTMENT_GET_CALENDER}`;
      let url = `${baseUrl}?`;

      // Build query string
      for (let key in params) {
        if (params.hasOwnProperty(key) && params[key] !== undefined) {
          url += `${encodeURIComponent(key)}=${encodeURIComponent(
            params[key]
          )}&`;
        }
      }
      url = url.endsWith("&") ? url.slice(0, -1) : url;

      const response = await axiosGETAPI(url);
      console.log(response.data);
      if (response.status === 200) {
        let updatedData: any = [];
        response.data?.message.forEach((item: any, index: number) => {
          updatedData.push({
            ...item,
            id: index,
            start: new Date(item.start),
            end: new Date(item.end),
            title: item.patient,
          });
        });
        console.log(updatedData);
        setEvents(updatedData);
      }
    };
    fetchData();
  }, [getAppointmenEventCalender,reloadData, appointmentTypeFilter, customFilter]);

  useEffect(() => {
    const fetchData = async () => {
      const respAppointmentType = await axiosGETAPI(
        BASE_URL +
          `/api/resource/Appointment Type?fields=["name","custom_service_type"]`
      );
      const respEventType = await axiosGETAPI(
        BASE_URL + `/api/resource/Event?fields=["name","subject"]`
      );
      let eventAppointmentMapFilterData = {};
      console.log(respAppointmentType);
      if (respAppointmentType.status === 200) {
        eventAppointmentMapFilterData = respAppointmentType.data.data.reduce(
          (acc: any, service: any) => {
            const { custom_service_type } = service;
            if (!acc[custom_service_type]) {
              acc[custom_service_type] = [];
            }
            acc[custom_service_type].push({
              ...service,
              key: "custom_service_name",
            });
            return acc;
          },
          {} as any
        );
        if (respEventType.status === 200) {
          eventAppointmentMapFilterData = {
            ...eventAppointmentMapFilterData,
            ...respEventType.data.data.reduce((acc: any, service: any) => {
              const { custom_service_type } = service;
              if (!acc["Event"]) {
                acc["Event"] = [];
              }
              acc["Event"].push({ ...service, key: "custom_event_id" });
              return acc;
            }, {} as any),
          };
        }
        setAppointmentEventFilterCalender(eventAppointmentMapFilterData);
        // setAppointmentEventCalender();
        // respAppointmentType.data.data.map((item: any) => item.name)
      }
    };
    fetchData();
  }, [reloadData]);

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
        changeColumnPosition("Patient Appointment", visibleChangedFields, [])
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

  function onAddPatientHandleClick() {
    router("/patient-list/add-patient");
  }

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
        "Patient Appointment",
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
        "Patient Appointment",
        visibleChangedFields,
        [column.id]
      );
      setListofFields(response);
    }
  };

  // JSX for rendering the DataTable component
  return (
    <AppointmentContext.Provider
      value={{
        getAppointmenEventCalender,
        setAppointmentEventCalender,
        getAppointmentEventFilterCalender,
        setAppointmentEventFilterCalender,
        reloadData,
        setReloadData
      }}
    >
      <DndContext
        collisionDetection={closestCenter}
        modifiers={[restrictToHorizontalAxis]}
        onDragEnd={handleDragEnd}
        sensors={sensors}
        id={id}
      >
        {!toggleView ? (
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
                  placeholder="Search by Appointment"
                  // value={
                  //   (table.getColumn("patient")?.getFilterValue() as string) ?? ""
                  // }
                  // onChange={(event) =>
                  //   table.getColumn("patient")?.setFilterValue(event.target.value)
                  // }
                  onChange={(event) => {
                    setFilter(event.target.value);
                  }}
                  className="lg:text-base placeholder:text-[#A6A6A6] block bg-[#FFFFFF] w-full border rounded-md py-2 pl-9 pr-3 sm:text-sm"
                />
              </div>
              <div className="flex gap-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="ml-auto rounded-lg border border-[#CCCCCC]"
                    >
                      <img
                        src={patientListViewIcon.path}
                        alt={patientListViewIcon.alt}
                        width={25}
                        height={100}
                        className=""
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
                              if (
                                value === false &&
                                getListofFields.length <= 4
                              ) {
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

                <CustomFilter
                  open={openFilter}
                  onOpen={onOpenFilter}
                  filter={customFilter}
                  setFilter={setCustomFilter}
                  filterFieldState={customFilterFieldState}
                  setFilterFieldState={setCustomFilterFieldState}
                  filterColumns={customFIlterFieldAppointment}
                  headingChild={
                    <div className="p-2 flex justify-between space-x-3">
                      <span className="text-[#303348] text-base font-medium">
                        In this view show records{" "}
                      </span>
                      <div className="flex space-x-4 mr-2">
                        <div className="space-x-2">
                          <Checkbox
                            id="cmrServiceList"
                            className="border-[#AAAAAA] align-middle data-[state=checked]:bg-[#B2CEFF] data-[state=checked]:border-[#B2CEFF]"
                            checked={cmrServiceChecBox}
                            onCheckedChange={(check: boolean) => {
                              setCmrServiceChecBox((prev: boolean) => check);
                              if (check) {
                                if (immunizationServiceChecBox) {
                                  setAppointmentTypeFilter([
                                    [
                                      "custom_service_type",
                                      "in",
                                      ["Immunization Service", "CMR Service"],
                                    ],
                                  ]);
                                } else {
                                  setAppointmentTypeFilter([
                                    [
                                      "custom_service_type",
                                      "in",
                                      ["CMR Service"],
                                    ],
                                  ]);
                                }
                              } else {
                                if (immunizationServiceChecBox) {
                                  setAppointmentTypeFilter([
                                    [
                                      "custom_service_type",
                                      "in",
                                      ["Immunization Service"],
                                    ],
                                  ]);
                                } else {
                                  setAppointmentTypeFilter([]);
                                }
                              }
                            }}
                          />
                          <Label
                            htmlFor="cmrServiceList"
                            className="text-[#474747]"
                          >
                            CMR Service List
                          </Label>
                        </div>
                        <div className="space-x-2">
                          <Checkbox
                            id="immunizationServiceList"
                            className="border-[#AAAAAA] align-middle data-[state=checked]:bg-[#B2CEFF] data-[state=checked]:border-[#B2CEFF]"
                            onCheckedChange={(check: boolean) => {
                              setImmunizationServiceChecBox(
                                (prev: boolean) => check
                              );
                              if (check) {
                                if (cmrServiceChecBox) {
                                  setAppointmentTypeFilter([
                                    [
                                      "custom_service_type",
                                      "in",
                                      ["Immunization Service", "CMR Service"],
                                    ],
                                  ]);
                                } else {
                                  setAppointmentTypeFilter([
                                    [
                                      "custom_service_type",
                                      "in",
                                      ["Immunization Service"],
                                    ],
                                  ]);
                                }
                              } else {
                                if (cmrServiceChecBox) {
                                  setAppointmentTypeFilter([
                                    [
                                      "custom_service_type",
                                      "in",
                                      ["CMR Service"],
                                    ],
                                  ]);
                                } else {
                                  setAppointmentTypeFilter([]);
                                }
                              }
                            }}
                            checked={immunizationServiceChecBox}
                          />

                          <Label
                            htmlFor="immunizationServiceList"
                            className="text-[#474747]"
                          >
                            Immunization Service List
                          </Label>
                        </div>
                      </div>
                    </div>
                  }
                  triggerButton={
                    <Button
                      variant="outline"
                      className="rounded-lg border border-[#CCCCCC] relative"
                      onClick={() => onOpenFilter((state) => !state)}
                    >
                      {(customFilter.length > 0 ||
                        appointmentTypeFilter.length > 0) && (
                        <div className="bg-[#F4022C] rounded-full p-[0.30rem] absolute -right-1 -top-0.5"></div>
                      )}
                      <img
                        src={CalenderFilterImage.path}
                        alt={CalenderFilterImage.alt}
                        width={20}
                        height={100}
                        className="w- h-4 min-w-4 min-h-4"
                      />
                    </Button>
                  }
                />
                <Button
                  variant={"outline"}
                  className="gap-1 rounded-lg border border-[#CCCCCC]"
                  onClick={() => setToggleView(true)}
                >
                  <img
                    src={CalenderIcon.path}
                    alt={CalenderIcon.alt}
                    className="w-4 h-4 min-w-4 min-h-4"
                  />
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      className=" text-[#0049C6] bg-white border-2 rounded-lg border-[#0049C6] font-medium sm:text-xs lg:text-sm 2xl:text-base"
                      onClick={onAddPatientHandleClick}
                    >
                      <img
                        src={AddService.path}
                        alt={AddService.alt}
                        width={25}
                        height={100}
                        className="sm:mr-2"
                      />
                      <p className="hidden sm:block lg:text-sm">
                        Start a Service
                      </p>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-44">
                    <DropdownMenuItem>
                      <Link to={ROUTES.ADD_CMR}>CMR Service</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link to={ROUTES.ADD_IMMUNIZATION}>
                        Immunization Service
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link to="/">Add Vaccine Service</Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <div className={`rounded-md  border overflow-auto flex-grow`}>
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
                          className="font-medium sm:text-xs lg:text-sm bg-[#FFFFFF] "
                          // onClickCapture={() =>
                          //   router(`/appointments/${row.original.name}`)
                          // }
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
              className="flex justify-between mt-4 sticky bottom-1 py-2"
              getLimitStart={getLimitStart}
              setLimitStart={setLimitStart}
            />
          </div>
        ) : (
          <Schedule
            setToggleView={setToggleView}
            scheduleProps={{
              events,
              setEvents,
            }}
          />
        )}
      </DndContext>
    </AppointmentContext.Provider>
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
      return "text-[#EF5D5D] bg-[#FFE3E3]";
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
    default:
      return "";
  }
}
