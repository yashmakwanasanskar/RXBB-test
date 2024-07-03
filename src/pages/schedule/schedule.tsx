"use client";
import React, {
  useState,
  useCallback,
  useEffect,
  useMemo,
  useContext,
} from "react";
import { Calendar, momentLocalizer, View, Views } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "/styles/css/style.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { getEventData } from "@/constants";
import {
  formatToTime,
  getPreviousDate,
  getNextDate,
  ConvertDateObjFromatToDateandTimeFormat,
} from "@/utilities/utils";
import {
  CMRAppointmentFilter,
  CalenderFilterImage,
  FilterRequestCalenderView,
  ListViewIcon,
  timeIconCalenderView,
} from "@/constants/images";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { axiosGETAPI, axiosPOSTAPI } from "@/helpers/commonAPI";
import API, { BASE_URL } from "@/constants/api.constant";
import { start } from "repl";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { AppointmentContext } from "../appointments/data-table";
import MultipleColumnFilter from "@/components/shared/multipleColumnFilter";
import { AlertDialogConfirmation } from "@/components/shared/alertDialog";

export interface Events {
  id: number;
  start: Date;
  end: Date;
  patient: string;
  desc?: string;
  allDay?: boolean;
}

const NewToolBar = (props: any) => {
  const today = new Date();
  const {
    getAppointmentEventFilterCalender,
    setAppointmentEventFilterCalender,
    getAppointmenEventCalender,
    setAppointmentEventCalender,
  } = useContext(AppointmentContext);
  useEffect(() => {
    console.log("get element", getAppointmentEventFilterCalender);
  }, [getAppointmentEventFilterCalender]);

  const [filterOpen, setFilterOpen] = useState<boolean>(false);

  const handleAppointmentCheckChange = (checked: any, item: string) => {
    setAppointmentEventFilterCalender((prev: any) => {
      if (checked) {
        return [...prev, item];
      } else {
        return prev.filter((filterItem: any) => filterItem !== item);
      }
    });
  };
  return (
    <div className="flex justify-between p-3 mx-2">
      <div className="flex gap-5 align-middle">
        <div className=" flex">
          <Button
            onClick={() =>
              props.onNavigate("back", getPreviousDate(props.date, props.view))
            }
            variant={"outline"}
            className="text-[#C7CBF1] rounded-l-2xl  hover:bg-[#3EA4DE] hover:text-white"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant={"outline"}
            onClick={() => props.onNavigate("next", today)}
            className={`${
              today.getDay() === props.date.getDay() &&
              today.getMonth() === props.date.getMonth() &&
              today.getFullYear() === props.date.getYear()
                ? "text-white bg-[#2869D7]"
                : "text-[#4747FF]"
            }  w-auto `}
          >
            Today
          </Button>
          <Button
            variant={"outline"}
            className="text-[#C7CBF1] rounded-r-2xl hover:bg-[#3EA4DE] hover:text-white"
            onClick={() =>
              props.onNavigate("next", getNextDate(props.date, props.view))
            }
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
        <Separator orientation="vertical" />
        <span className="text-[#2869D7] font-semibold text-xl flex items-center">
          {props.label}
        </span>
      </div>
      <div className="flex gap-4">
        <MultipleColumnFilter
          onOpen={setFilterOpen}
          open={filterOpen}
          triggerButton={
            <Button
              variant="outline"
              className="rounded-lg border border-[#CCCCCC] relative"
            >
              {Object.keys(getAppointmenEventCalender).length > 0 && (
                <div className="bg-[#F4022C] rounded-full p-[0.30rem] absolute -right-1 -top-0.5"></div>
              )}
              <img
                src={CalenderFilterImage.path}
                alt={CalenderFilterImage.alt}
                width={20}
                height={100}
                className="w-4 h-4 min-w-4 min-h-4"
              />
            </Button>
          }
          columnData={getAppointmentEventFilterCalender}
          keyMapping={{ Event: "subject" }}
          setFilter={setAppointmentEventCalender}
          getFilter={getAppointmenEventCalender}
        />

        <Button
          variant={"outline"}
          className="gap-1 rounded-lg border border-[#CCCCCC]"
          onClick={() => props.useStateProps.setToggleView(false)}
        >
          <img
            src={ListViewIcon.path}
            alt={ListViewIcon.alt}
            className="w-4 h-4 min-w-4 min-h-4"
          />
        </Button>

        <div className=" border border-[#C7CBF1]  p-1 rounded-full  space-x-2 m-auto ">
          {props.views.map((view: string, index: any) => {
            return (
              <button
                className={`${
                  props.view === view && "bg-[#C7CBF1] text-white"
                } ${index === 0 && "rounded-l-full"} ${
                  index + 1 === props.views.length && "rounded-r-full"
                } p-1`}
                key={index}
                onClick={() => props.onView(view)}
              >
                {view}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

//custom monthwise header
const MonthHeader = (props: any) => {
  return (
    <div className="p-2">
      <span className="text-[#5C648D] text-base">{props.label}</span>
    </div>
  );
};

const MyMonthEvent = (event: any) => {
  const startDate = formatToTime(event.event.start);
  const endDate = formatToTime(event.event.end);
  const navigate = useNavigate();
  return (
    <div className="flex w-full">
      <div className="bg-[#4291FA] min-h-fit min-w-2"></div>
      <div
        className="w-full flex flex-col justify-around bg-[#E5F3FE]  border-[#E5F3FE] 2xl:p-3 p-1 xl:space-y-1 rounded-r-2xl"
        onClick={() => navigate(`/appointments/${event.event.name}`)}
      >
        <div>
          <span className="w-full text-[#4291FA] xl:text-sm text-xs font-semibold">
            {event.title}
          </span>
        </div>
        <div className="w-full 2xl:block hidden">
          <img
            src={timeIconCalenderView.path}
            alt={timeIconCalenderView.alt}
            width={20}
            height={20}
            className="xl:h-5 xl:w-5 h-3 w-3  fill-[#4291FA] inline-block"
          />
          <span className="text-[#4291FA] xl:text-xs text-[0.5rem] ml-2 ">
            {startDate} - {endDate}
          </span>
        </div>
      </div>
    </div>
  );
};

const MyWeekEvent = (event: any) => {
  const startDate = formatToTime(event.event.start);
  const endDate = formatToTime(event.event.end);
  const navigate = useNavigate();
  return (
    <div className="flex w-full">
      <div className="bg-[#4291FA] min-h-fit min-w-2"></div>
      <div
        className="w-full flex flex-col justify-around bg-[#E5F3FE]  border-[#E5F3FE] p-3 space-y-1 rounded-r-2xl"
        onClick={() => navigate(`/appointments/${event.event.name}`)}
      >
        <div>
          <span className="w-full text-[#4291FA] font-semibold">
            {event.title}
          </span>
        </div>
        <div className="w-full">
          <img
            src={timeIconCalenderView.path}
            alt={timeIconCalenderView.alt}
            width={20}
            height={20}
            className="h-5 w-5 fill-[#4291FA] inline-block"
          />
          <span className="text-[#4291FA] text-xs ml-2">
            {startDate} - {endDate}
          </span>
        </div>
      </div>
    </div>
  );
};

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

const Schedule = ({ setToggleView, scheduleProps }: any) => {
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState(Views.WEEK);
  const { events, setEvents } = scheduleProps;
  const [open, onOpen] = useState<boolean>(false);
  const { setReloadData } = useContext(AppointmentContext);
  const [moveEventData, setMoveEventData] = useState<any>({});
  //Custom component for Event
  const NewEvent = (event: any) => {
    const startDate = formatToTime(event.event.start);
    const endDate = formatToTime(event.event.end);
    const navigate = useNavigate();
    return (
      <div
        className="flex flex-col justify-around bg-[#E5F3FE]  border-[#E5F3FE] p-3 space-y-1 rounded-r-2xl"
        onClick={() => navigate(`/appointments/${event.event.name}`)}
      >
        <div>
          <span className="text-[#4291FA] font-semibold">{event.title}</span>
        </div>
        <div>
          <img
            src={timeIconCalenderView.path}
            alt={timeIconCalenderView.alt}
            width={20}
            height={20}
            className="h-5 w-5 fill-[#4291FA] inline-block"
          />
          <span className="text-[#4291FA] text-xs ml-2">
            {startDate} - {endDate}
          </span>
        </div>
      </div>
    );
  };

  const NewToolBarWrapper = (props: any) => (
    <NewToolBar {...props} useStateProps={{ setToggleView }} />
  );

  const ChangeDateandTimeAPI = async (
    name: string,
    date: string,
    time: string,
    duration: any
  ) => {
    const URL = BASE_URL + API.CMR_APPOINTMENT_SAVE_DATE_TIME;
    await axiosPOSTAPI(URL, {
      appointment: name,
      date: date,
      time: time,
      duration: duration,
    });
    setReloadData((prev: boolean) => !prev);
  };

  const moveEvent = useCallback(
    ({ event, start, end, isAllDay: droppedOnAllDaySlot = false }: any) => {
      const { allDay } = event;
      if (!allDay && droppedOnAllDaySlot) {
        event.allDay = true;
      }
      console.log("move event", start, end.getTime(), droppedOnAllDaySlot);
      setEvents((prev: any) => {
        const existing = prev.find((ev: Events) => ev.id === event.id) ?? {};
        const filtered = prev.filter((ev: Events) => ev.id !== event.id);
        return [...filtered, { ...existing, start, end, allDay }];
      });
      const [date, time] = ConvertDateObjFromatToDateandTimeFormat(start);
      onOpen(true);
      setMoveEventData({
        name: event.name,
        date: date,
        time: time,
        duration: 10,
      });
      // ChangeDateandTimeAPI(event.name, date, time, 30);
    },
    [setEvents]
  );

  const resizeEvent = useCallback(
    ({ event, start, end }: any) => {
      setEvents((prev: any) => {
        const existing = prev.find((ev: Events) => ev.id === event.id) ?? {};
        const filtered = prev.filter((ev: Events) => ev.id !== event.id);
        return [...filtered, { ...existing, start, end }];
      });
      const [date, time] = ConvertDateObjFromatToDateandTimeFormat(start);
      onOpen(true);
      setMoveEventData({
        name: event.name,
        date: date,
        time: time,
        duration: 10,
      });
    },
    [setEvents]
  );
  return (
    <div className="App m-2 h-[calc(100vh-9.5rem)]">
      <AlertDialogConfirmation
        onOpen={onOpen}
        open={open}
        onConfirm={ChangeDateandTimeAPI}
        eventData={moveEventData}
        onCancel={() => setReloadData((prev: boolean) => !prev)}
      />
      <DnDCalendar
        defaultDate={moment().toDate()}
        defaultView="month"
        events={events}
        localizer={localizer}
        onEventDrop={moveEvent}
        className="overflow-auto h-[calc(100vh-9.5rem)]"
        onEventResize={resizeEvent}
        views={[Views.MONTH, Views.WEEK, Views.DAY]}
        view={view}
        date={date}
        onView={(view: any) => setView(view)}
        onNavigate={(date) => {
          setDate(new Date(date));
        }}
        components={useMemo(
          () => ({
            toolbar: NewToolBarWrapper,
            // event: NewEvent,
            month: { header: MonthHeader, event: MyMonthEvent },
            // week: { event: MyWeekEvent },
          }),
          []
        )}
        showAllEvents
      />
    </div>
  );
};

export default Schedule;
