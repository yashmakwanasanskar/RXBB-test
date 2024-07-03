import ComboboxDropDown, {
  ComboboxDropDownWithUseFormHook,
} from "@/components/shared/comboBoxDropDown";
import { CustomDrawer } from "@/components/shared/drawer/drawer";
import { toast as toastifyToast, ToastContainer } from "react-toastify";
import toast, { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import ReqiredFieldErrorImage from "@/components/shared/reqiredFieldError";
import { EventServiceColumnData } from "@/components/shared/tables/column-def";
import { DataTable } from "@/components/shared/tables/data-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { InputSMResponsive } from "@/components/ui/input";
import { Label, LabelSMResponsive } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import API, { BASE_URL } from "@/constants/api.constant";
import { EventServiceDataLabel, EventStatusData } from "@/constants/fields";
import { ImmunizationServiceAddPatientIcon } from "@/constants/images";
import { validatedLink } from "@/helpers/API/getAPIData";
import { axiosGETAPI, axiosPOSTAPI } from "@/helpers/commonAPI";
import { formatDateTime, formatTime, removeTimeFromDate } from "@/utilities/utils";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";
import LoadingScreen from "@/components/shared/loading-screen";
import ViewLocation from "../location/add-edit-service-location";
import ROUTES from "@/constants/routes.constats";

const NewEvent = ({ from }: { from: string }) => {
  const params = from === "add" ? { id: "new-event-volbrfecdt" } : useParams();
  const navigate = useNavigate();
  const [QRCodeFile, setQRCodeFile] = useState<string>("");
  const [getRTEValue, setRTEValue] = useState<any>(
    "Please ensure all information provided is accurate and complete. This form is confidential and will be used solely for medical purposes in accordance with privacy laws. Your cooperation is essential for effective care."
  );
  const [recurringEvent, setRecurringEvent] = useState<boolean>(false);
  const [getEventData, setEventData] = useState<any>([]);
  const [getLinkTitle, setLinkTitle] = useState<any>();
  const [getDocInfo, setDocInfo] = useState<any>();
  const [reloadData, setReloadData] = useState<boolean>(false);
  const [loadData, setLoadData] = useState<boolean>(false);
  const [tableViewFieldState, setTableViewFieldState] = useState<any>([]);
  const [openAddLocation, setOnOpenLocation] = useState<boolean>(false);
  const [patientAppointmentCount, setPatientAppointmentCount] =
    useState<number>(0);
  const setCheckboxValue = (label: string, check: any) => {
    setValue(label, check ? 1 : 0);
    if (label === "all_day") {
      const dayCheckboxes = [
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday",
      ];
      if (check) {
        dayCheckboxes.forEach((element: string) => {
          setValue(element, 1);
        });
      } else {
        dayCheckboxes.forEach((element: string) => {
          setValue(element, 0);
        });
      }
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      if (from === "edit") {
        const response = await axiosGETAPI(
          BASE_URL +
            "/api/method/frappe.desk.form.load.getdoc?doctype=Event&name=" +
            params.id
        );
        if (response.status === 200) {
          reset({
            ...response.data?.docs[0],
            custom_opening_time: formatTime(
              response.data?.docs[0]?.custom_opening_time
            ),
            custom_close_time: formatTime(
              response.data?.docs[0]?.custom_close_time
            ),
            starts_on: removeTimeFromDate(formatDateTime(response.data?.docs[0]?.starts_on)),
            ends_on: removeTimeFromDate(formatDateTime(response.data?.docs[0]?.ends_on)),
          });
          setComboBoxKeyValues({
            custom_service_unit: response.data?.docs[0]?.custom_service_unit,
            status: response.data?.docs[0]?.status,
            custom_company: response.data?.docs[0]?.custom_company,
          });
          setEventData(response.data?.docs[0]?.custom_event_services);
          setLinkTitle(response.data?._link_titles);
          setDocInfo(response.data?.docinfo);
          const recurringDaysList = [
            response.data?.docs[0]?.all_day,
            response.data?.docs[0]?.monday,
            response.data?.docs[0]?.tuesday,
            response.data?.docs[0]?.wednesday,
            response.data?.docs[0]?.thursday,
            response.data?.docs[0]?.friday,
            response.data?.docs[0]?.saturday,
            response.data?.docs[0]?.sunday,
          ];
          setRTEValue(response.data?.docs[0]?.description);
          setRecurringEvent(
            recurringDaysList.some((ele: any) => ele === "1" || ele === 1)
          );

          const responseQRCode = await axiosPOSTAPI(
            BASE_URL + API.CLIENT_GET_LIST,
            {
              doctype: "File",
              filters: `{"attached_to_name":"${response.data?.docs[0].name}","file_name":["like","%${response.data?.docs[0].name}%"],"file_type":"PNG"}`,
              fields: `["name","file_url"]`,
              order_by: "creation asc",
            }
          );
          if (responseQRCode.status === 200) {
            setQRCodeFile(responseQRCode.data?.message[0]?.file_url);
          }
          const appointmentCount = await axiosPOSTAPI(
            BASE_URL + API.PATIENT_APPOINTMENT_COUNT,
            { event_name: response.data?.docs[0].name }
          );
          if (appointmentCount.status === 200) {
            setPatientAppointmentCount(appointmentCount.data.count);
          }
        }
      }
      const LOAD_GET_DOCTYPE =
        BASE_URL + API.LOAD_FORM_DOCTYPE + "?doctype=Event";
      const responseLoadGETDocType = await axiosGETAPI(LOAD_GET_DOCTYPE);
      if (responseLoadGETDocType.status === 200) {
        setTableViewFieldState(
          JSON.parse(responseLoadGETDocType.data.user_settings)
        );
      }
      setLoadData(true);
    };
    fetchData();
  }, [reloadData]);
  const [comboBoxKeyValues, setComboBoxKeyValues] = useState<any>({});
  const handleInputChangesCombobox = async (value: string, label: string) => {
    setComboBoxKeyValues((prev: any) => ({ ...prev, [label]: value }));
    if (label === "vaccine_type") {
      const validatedResponse = await validatedLink(
        "Appointment Type",
        value,
        `["custom_service_type"]`
      );
      setValue("service_type", validatedResponse.custom_service_type);
      const responseQuestionnaires = await axiosPOSTAPI(
        BASE_URL + API.GET_APPOINTMENT_QUESTIONNAIRES,
        { docname: value }
      );
      if (responseQuestionnaires.status === 200) {
        setValue(
          "cash_price",
          responseQuestionnaires.data?.template?.cash_price
        );
      }
    }
    if (label === "custom_service_unit") {
      const validatedResponse = await validatedLink(
        "Healthcare Service Unit",
        value,
        `["service_unit_capacity","custom_opening_time","custom_closing_time"]`
      );
      setValue(
        "custom_simultaneous_unit_capacity",
        validatedResponse.service_unit_capacity
      );
      setValue(
        "custom_opening_time",
        formatTime(validatedResponse.custom_opening_time)
      );
      setValue(
        "custom_close_time",
        formatTime(validatedResponse.custom_closing_time)
      );
    }
  };
  const [openCreateEvent, onOpenCreateEvent] = useState<boolean>(false);

  const onsubmit = async () => {
    const isValid = await trigger();
    if (isValid) {
      createData();
    }
  };
  const createData = async () => {
    const reqBody =
      from === "add"
        ? {
            docstatus: 0,
            doctype: "Event",
            name: params.id,
            __islocal: 1,
            __unsaved: 1,
            owner: Cookies.get("email"),
            event_category: "Event",
            event_type: "Private",
            status: comboBoxKeyValues?.status,
            send_reminder: 0,
            repeat_this_event: 0,
            sync_with_google_calendar: 0,
            add_video_conferencing: 0,
            all_day: getValues("all_day") || "0",
            monday: getValues("monday") || "0",
            tuesday: getValues("tuesday") || "0",
            wednesday: getValues("wednesday") || "0",
            thursday: getValues("thursday") || "0",
            friday: getValues("friday") || "0",
            saturday: getValues("saturday") || "0",
            sunday: getValues("sunday") || "0",
            pulled_from_google_calendar: 0,
            repeat_on: "",
            event_participants: [],
            custom_event_services: getEventData,
            custom_payment_type: "",
            description: getRTEValue,
            custom_simultaneous_unit_capacity: getValues(
              "custom_simultaneous_unit_capacity"
            ),
            custom_opening_time: getValues("custom_opening_time"),
            custom_close_time: getValues("custom_close_time"),
            custom_service_unit: comboBoxKeyValues?.custom_service_unit,
            subject: getValues("subject"),
            starts_on: getValues("starts_on"),
            ends_on: getValues("ends_on"),
            custom_accept_cash_payments:
              getValues("custom_accept_cash_payments") || "0",
            custom_cash: getValues("custom_cash") || "0",
            custom_credit_card: getValues("custom_credit_card") || "0",
            custom_accept_misc_payment:
              getValues("custom_accept_misc_payment") || "0",
            custom_accept_medical_billing:
              getValues("custom_accept_medical_billing") || "0",
            custom_medicare_billing:
              getValues("custom_medicare_billing") || "0",
            custom_medical_billing: getValues("custom_medical_billing") || "0",
            custom_private_insurance_billing:
              getValues("custom_private_insurance_billing") || "0",
            custom_uninsured: getValues("custom_uninsured") || "0",
            custom_do_not_collect_payment:
              getValues("custom_do_not_collect_payment") || "0",
            custom_accept_vfc_billing:
              getValues("custom_accept_vfc_billing") || "0",
            custom_vfc_billing: getValues("custom_vfc_billing") || "0",
            custom_company: comboBoxKeyValues.custom_company,
          }
        : {
            ...getValues(),
            doctype: "Event",
            name: params.id,
            owner: Cookies.get("email"),
            event_category: "Event",
            event_type: "Private",
            status: comboBoxKeyValues?.status,
            send_reminder: 0,
            repeat_this_event: 0,
            sync_with_google_calendar: 0,
            add_video_conferencing: 0,
            all_day: getValues("all_day") || "0",
            monday: getValues("monday") || "0",
            tuesday: getValues("tuesday") || "0",
            wednesday: getValues("wednesday") || "0",
            thursday: getValues("thursday") || "0",
            friday: getValues("friday") || "0",
            saturday: getValues("saturday") || "0",
            sunday: getValues("sunday") || "0",
            pulled_from_google_calendar: 0,
            repeat_on: "",
            event_participants: [],
            custom_event_services: getEventData,
            custom_payment_type: "",
            description: getRTEValue,
            custom_simultaneous_unit_capacity: getValues(
              "custom_simultaneous_unit_capacity"
            ),
            custom_opening_time: getValues("custom_opening_time"),
            custom_close_time: getValues("custom_close_time"),
            custom_service_unit: comboBoxKeyValues?.custom_service_unit,
            subject: getValues("subject"),
            starts_on: getValues("starts_on"),
            ends_on: getValues("ends_on"),
            custom_accept_cash_payments:
              getValues("custom_accept_cash_payments") || "0",
            custom_cash: getValues("custom_cash") || "0",
            custom_credit_card: getValues("custom_credit_card") || "0",
            custom_accept_misc_payment:
              getValues("custom_accept_misc_payment") || "0",
            custom_accept_medical_billing:
              getValues("custom_accept_medical_billing") || "0",
            custom_medicare_billing:
              getValues("custom_medicare_billing") || "0",
            custom_medical_billing: getValues("custom_medical_billing") || "0",
            custom_private_insurance_billing:
              getValues("custom_private_insurance_billing") || "0",
            custom_uninsured: getValues("custom_uninsured") || "0",
            custom_do_not_collect_payment:
              getValues("custom_do_not_collect_payment") || "0",
            custom_accept_vfc_billing:
              getValues("custom_accept_vfc_billing") || "0",
            custom_vfc_billing: getValues("custom_vfc_billing") || "0",
          };

    const response = await axiosPOSTAPI(BASE_URL + API.SAVE_DOCS, {
      doc: JSON.stringify(reqBody),
      action: "Save",
    });
    if (response.status === 200) {
      if (from === "add") {
        toast.success("Event Created Successfully");
        navigate(`/events/${response.data?.docs[0]?.name}`);
      } else {
        toast.success("Event Updated Successfully");
        setReloadData((prev: boolean) => !prev);
      }
    } else {
      if (from === "add") {
        toast.error("Event not Created Successfully");
      } else {
        toast.error("Event not Updated Successfully");
      }
    }
  };
  const {
    register,
    getValues,
    setValue,
    reset,
    watch,
    trigger,
    formState: { errors },
  } = useForm();
  const customAcceptCashPayments = watch("custom_accept_cash_payments");
  const customAcceptMedicalPayment = watch("custom_accept_medical_billing");
  const customAcceptMiscPayment = watch("custom_accept_misc_payment");
  const customAcceptVFCBilling = watch("custom_accept_vfc_billing");
  const monday = watch("monday");
  const tuesday = watch("tuesday");
  const wednesday = watch("wednesday");
  const thursday = watch("thursday");
  const friday = watch("friday");
  const saturday = watch("saturday");
  const sunday = watch("sunday");
  return loadData ? (
    <div className="px-3 pt-3 space-y-4 flex flex-col h-[calc(100vh-70px)] overflow-auto">
      <div className="flex justify-between">
        <h3 className="text-xl sm:text-2xl lg:text-3xl 2xl:text-4xl font-medium text-[#303348] ">
          {from === "add" ? "New Event" : getValues("subject")}
        </h3>
        <div className="flex gap-4">
          {from === "edit" && (
            <>
              <Button
                variant="outline"
                className="bg-[#F6F9FD] border-[#DDDDDD] text-[#616161] gap-2"
                onClick={() =>
                  navigate(ROUTES.APPOINTMENT,{state:{event:getValues("name")}})
                }
              >
                Patient Appointment
                <div className="bg-[#47BDFF] px-3 py-1 rounded-full text-white">
                  {patientAppointmentCount}
                </div>
              </Button>
              <Button
                className="bg-[#7ACFFF] text-[#FFFFFF] border-[#CCCCCC] border-x  border-y border-opacity-20 font-semibold  xl:text-sm text-xs hover:bg-[#3EA4DE] hover:text-[#FFFFFF]"
                onClick={() => {
                  window.open(`/booking?event=${params.id}`, "_blank");
                }}
              >
                <p className="hidden lg:block xl:text-sm text-xs">
                  Event Registration Link
                </p>
              </Button>
              <Button
                className="bg-[#7ACFFF] text-[#FFFFFF] border-[#CCCCCC] border-x  border-y border-opacity-20 font-semibold  xl:text-sm text-xs hover:bg-[#3EA4DE] hover:text-[#FFFFFF]"
                onClick={() => {
                  window.open(BASE_URL + QRCodeFile, "_blank");
                }}
              >
                <p className="hidden lg:block xl:text-sm text-xs">
                  Event QR Link
                </p>
              </Button>
            </>
          )}
        </div>
      </div>
      <div className="space-y-4 overflow-auto flex-grow">
        <div className="p-4 bg-[#F6F9FD] border border-[#E0E0E0] space-y-5 rounded-md">
          <h5 className="mb-1 heading-text-xl font-semibold text-[#303348] ">
            Details
          </h5>
          <Separator orientation="horizontal" />
          <div className="grid xl:grid-cols-3 md:grid-cols-2  gap-3  rounded-md">
            <div className="space-y-1">
              <LabelSMResponsive className="text-[#303348]">
                Event Name <span className="text-[#FF6161]">*</span>
                <ReqiredFieldErrorImage error={errors.subject} />
              </LabelSMResponsive>
              <InputSMResponsive
                type="text"
                placeholder="enter Event"
                className={`${errors.subject && "border-[#FF441B]"}`}
                {...register("subject", { required: true })}
              />
            </div>
            <div className="space-y-1">
              <LabelSMResponsive className="text-[#303348]">
                Starts on <span className="text-[#FF6161]">*</span>
                <ReqiredFieldErrorImage error={errors.starts_on} />
              </LabelSMResponsive>
              <InputSMResponsive
                type="date"
                placeholder=""
                className={`${errors.starts_on && "border-[#FF441B]"}`}
                {...register("starts_on", { required: true })}
              />
              <Label className="text-[#767676] text-xs  float-right">
                america/Los_angeles
              </Label>
            </div>
            <div className="space-y-1">
              <LabelSMResponsive className="text-[#303348]">
                Ends on <span className="text-[#FF6161]">*</span>
                <ReqiredFieldErrorImage error={errors.ends_on} />
              </LabelSMResponsive>
              <InputSMResponsive
                type="date"
                placeholder=""
                className={`${errors.ends_on && "border-[#FF441B]"}`}
                {...register("ends_on", { required: true })}
              />
              <Label className="text-[#767676] text-xs float-right">
                america/Los_angeles
              </Label>
            </div>
            <div className="space-y-1 w-full items-center gap-1.5">
              <Label className="text-[#303348] xl:text-sm text-xs font-medium">
                Company <span className="text-[#ED9192]">*</span>
                <ReqiredFieldErrorImage error={errors.company} />
              </Label>
              <ComboboxDropDownWithUseFormHook
                label="custom_company"
                placeholder="Select Appointment Type"
                doctype="Company"
                referenceDoctype="Healthcare Service Unit"
                handleInputChange={handleInputChangesCombobox}
                dataValue={comboBoxKeyValues?.custom_company}
                register={register}
                setValueForm={setValue}
                errors={errors}
                required
              />
            </div>
          </div>
          <div className="space-y-1 flex gap-2 items-center">
            <Checkbox
              checked={recurringEvent}
              onCheckedChange={(check: boolean) => setRecurringEvent(check)}
            />
            <LabelSMResponsive className="text-[#303348]">
              Recurring Event
            </LabelSMResponsive>
          </div>
          {recurringEvent && (
            <div
              className="bg-white p-3 flex flex-wrap gap-5 items-center "
              style={{ boxShadow: "0px 4px 11px 0px #00000040" }}
            >
              <LabelSMResponsive className="text-[#303348] font-semibold ">
                Event will repeat on
              </LabelSMResponsive>
              <div className="border border-[#D4D6DD] flex gap-2 p-2 rounded-full">
                <Checkbox
                  {...register("all_day")}
                  onCheckedChange={(check: any) =>
                    setCheckboxValue("all_day", check)
                  }
                  defaultChecked={getValues("all_day") === 1}
                />
                <LabelSMResponsive className="text-[#303348]">
                  Select All
                </LabelSMResponsive>
              </div>
              <div className="border border-[#D4D6DD] flex gap-2 p-2 rounded-full">
                <Checkbox
                  {...register("monday")}
                  onCheckedChange={(check: any) =>
                    setCheckboxValue("monday", check)
                  }
                  checked={monday === 1}
                />
                <LabelSMResponsive className="text-[#303348]">
                  Monday
                </LabelSMResponsive>
              </div>
              <div className="border border-[#D4D6DD] flex gap-2 p-2 rounded-full">
                <Checkbox
                  {...register("tuesday")}
                  onCheckedChange={(check: any) =>
                    setCheckboxValue("tuesday", check)
                  }
                  checked={tuesday === 1}
                />
                <LabelSMResponsive className="text-[#303348]">
                  Tuesday
                </LabelSMResponsive>
              </div>
              <div className="border border-[#D4D6DD] flex gap-2 p-2 rounded-full">
                <Checkbox
                  {...register("wednesday")}
                  onCheckedChange={(check: any) =>
                    setCheckboxValue("wednesday", check)
                  }
                  checked={wednesday === 1}
                />

                <LabelSMResponsive className="text-[#303348]">
                  Wednesday
                </LabelSMResponsive>
              </div>
              <div className="border border-[#D4D6DD] flex gap-2 p-2 rounded-full">
                <Checkbox
                  {...register("thursday")}
                  onCheckedChange={(check: any) =>
                    setCheckboxValue("thursday", check)
                  }
                  checked={thursday === 1}
                />
                <LabelSMResponsive className="text-[#303348]">
                  Thursday
                </LabelSMResponsive>
              </div>
              <div className="border border-[#D4D6DD] flex gap-2 p-2 rounded-full">
                <Checkbox
                  {...register("friday")}
                  onCheckedChange={(check: any) =>
                    setCheckboxValue("friday", check)
                  }
                  checked={friday === 1}
                />
                <LabelSMResponsive className="text-[#303348]">
                  Friday
                </LabelSMResponsive>
              </div>
              <div className="border border-[#D4D6DD] flex gap-2 p-2 rounded-full">
                <Checkbox
                  {...register("saturday")}
                  onCheckedChange={(check: any) =>
                    setCheckboxValue("saturday", check)
                  }
                  checked={saturday === 1}
                />{" "}
                <LabelSMResponsive className="text-[#303348]">
                  Saturday
                </LabelSMResponsive>
              </div>
              <div className="border border-[#D4D6DD] flex gap-2 p-2 rounded-full">
                <Checkbox
                  {...register("sunday")}
                  onCheckedChange={(check: any) =>
                    setCheckboxValue("sunday", check)
                  }
                  checked={sunday === 1}
                />{" "}
                <LabelSMResponsive className="text-[#303348]">
                  Sunday
                </LabelSMResponsive>
              </div>
            </div>
          )}
          <div
            className="bg-white border border-[#D4D6DD] p-4"
            style={{ boxShadow: "0px 4px 11px 0px #61616140" }}
          >
            <div className="grid xl:grid-cols-3 md:grid-cols-2  gap-3">
              <div className="space-y-1">
                <LabelSMResponsive className="text-[#303348]">
                  Location <span className="text-[#FF6161]">*</span>
                  <ReqiredFieldErrorImage error={errors.custom_service_unit} />
                </LabelSMResponsive>
                <div className="flex w-full justify-between space-x-3">
                  <div className="w-full">
                    <ComboboxDropDownWithUseFormHook
                      doctype="Healthcare Service Unit"
                      placeholder="Select Location"
                      referenceDoctype="Event"
                      label="custom_service_unit"
                      handleInputChange={handleInputChangesCombobox}
                      dataValue={comboBoxKeyValues.custom_service_unit}
                      register={register}
                      required
                      errors={errors}
                      setValueForm={setValue}
                    />
                  </div>
                  <Button
                    variant={"outline"}
                    onClick={() => setOnOpenLocation(true)}
                  >
                    <img
                      src={ImmunizationServiceAddPatientIcon.path}
                      alt={ImmunizationServiceAddPatientIcon.alt}
                      className="w-8 h-8 min-w-8 min-h-8"
                    />
                  </Button>
                </div>
              </div>
              <div className="space-y-1">
                <LabelSMResponsive className="text-[#303348]">
                  Overlap Booking <span className="text-[#FF6161]">*</span>
                  <ReqiredFieldErrorImage
                    error={errors.custom_simultaneous_unit_capacity}
                  />
                </LabelSMResponsive>
                <InputSMResponsive
                  type="text"
                  placeholder=""
                  className={`${
                    errors.custom_simultaneous_unit_capacity &&
                    "border-[#FF441B]"
                  }`}
                  {...register("custom_simultaneous_unit_capacity", {
                    required: true,
                  })}
                />
              </div>
              <div className="space-y-1">
                <LabelSMResponsive className="text-[#303348]">
                  Opening Time
                </LabelSMResponsive>
                <InputSMResponsive
                  type="time"
                  readOnly
                  placeholder=""
                  {...register("custom_opening_time")}
                />
              </div>
              <div className="space-y-1">
                <LabelSMResponsive className="text-[#303348]">
                  Closing Time
                </LabelSMResponsive>
                <InputSMResponsive
                  type="time"
                  placeholder=""
                  readOnly
                  {...register("custom_close_time")}
                />
              </div>
            </div>
          </div>
          <div className="grid-cols-3 grid">
            <div className="space-y-1">
              <LabelSMResponsive className="text-[#303348]">
                Status
              </LabelSMResponsive>
              <ComboboxDropDown
                staticValue={EventStatusData}
                label="status"
                handleInputChange={handleInputChangesCombobox}
                dataValue={comboBoxKeyValues?.status}
                placeholder="Select Status"
              />
            </div>
          </div>
        </div>
        <div className="p-4 bg-[#F6F9FD] border border-[#E0E0E0] ">
          <h5 className="mb-1 heading-text-xl font-semibold text-[#303348] ">
            Services
          </h5>
          <Separator orientation="horizontal" className="my-4" />
          <div>
            <DataTable
              columns={EventServiceColumnData}
              data={getEventData}
              label={"Event Service"}
              title="Event Services"
              onOpen={onOpenCreateEvent}
              setData={setEventData}
              tableViewFieldState={tableViewFieldState}
              setTableViewFieldState={setTableViewFieldState}
              allFields={EventServiceDataLabel}
              addable
              userSettingLabel="Event"
              doctype="Event"
            />
            <CustomDrawer
              open={openCreateEvent}
              setOpen={onOpenCreateEvent}
              title="Event Service"
              classNameDrawer="rounded-l-xl "
              contentChilder={
                <div className="m-4 space-y-6">
                  <div className="space-y-4 bg-[#F6F9FD] border border-[#E0E0E0] p-3 rounded-xl flex-col ">
                    <ToastContainer />
                    <Label className="text-[#303348] font-semibold text-lg align-middle">
                      Add Event Service
                    </Label>
                    <Separator />
                    <div className="grid gap-4 w-full h-full">
                      <div className="grid w-full items-center gap-1.5">
                        <Label className="text-[#303348] xl:text-sm text-xs font-medium">
                          Appointment Type
                        </Label>
                        <ComboboxDropDown
                          label="vaccine_type"
                          placeholder="Select Appointment Type"
                          doctype="Appointment Type"
                          referenceDoctype="Event Services"
                          handleInputChange={handleInputChangesCombobox}
                          dataValue={comboBoxKeyValues?.vaccine_type}
                          doctypeFilter={`{"name":["not in",[null]],"custom_service_type":["!=",""]}`}
                        />
                      </div>
                      <div className="grid w-full items-center gap-1.5">
                        <Label className="text-[#303348] xl:text-sm text-xs font-medium">
                          Service Type
                        </Label>
                        <InputSMResponsive
                          type="text"
                          placeholder=""
                          {...register("service_type")}
                          readOnly
                        />
                      </div>
                      <div className="grid w-full items-center gap-1.5">
                        <Label className="text-[#303348] xl:text-sm text-xs font-medium">
                          Cash Price
                        </Label>
                        <InputSMResponsive
                          type="number"
                          placeholder=""
                          {...register("cash_price")}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2  ">
                    <Button
                      className="text-white bg-[#47BDFF] hover:bg-[#3EA4DE] rounded-xl"
                      onClick={() => {
                        setEventData((prev: any) => [
                          ...prev,
                          {
                            docstatus: 0,
                            doctype: "Event Services",
                            __islocal: 1,
                            __unsaved: 1,
                            owner: Cookies.get("email"),
                            parent: params.id,
                            parentfield: "custom_event_services",
                            parenttype: "Event",
                            __unedited: false,
                            vaccine_type: comboBoxKeyValues.vaccine_type,
                            service_type: getValues("service_type"),
                            cash_price: getValues("cash_price"),
                          },
                        ]);
                        setValue("cash_price", "");
                        setValue("service_type", "");
                        setComboBoxKeyValues((prev: any) => ({
                          ...prev,
                          vaccine_type: "",
                        }));
                        onOpenCreateEvent(false);
                      }}
                    >
                      Save & Close
                    </Button>
                    <Button
                      className="text-white bg-[#47BDFF] hover:bg-[#3EA4DE] rounded-xl"
                      onClick={() => {
                        setEventData((prev: any) => [
                          ...prev,
                          {
                            docstatus: 0,
                            doctype: "Event Services",
                            __islocal: 1,
                            __unsaved: 1,
                            owner: Cookies.get("email"),
                            parent: params.id,
                            parentfield: "custom_event_services",
                            parenttype: "Event",
                            __unedited: false,
                            vaccine_type: comboBoxKeyValues.vaccine_type,
                            service_type: getValues("service_type"),
                            cash_price: getValues("cash_price"),
                          },
                        ]);
                        setValue("cash_price", "");
                        setValue("service_type", "");
                        setComboBoxKeyValues((prev: any) => ({
                          ...prev,
                          vaccine_type: "",
                        }));

                        toastifyToast.success(
                          <>
                            <span className="font-bold">Success!</span> Your
                            form has been successfully submitted. Please proceed
                            to fill out the next{" "}
                            <span className="font-bold">Event Service</span>.
                          </>,
                          {
                            className: "text-[#66BB6A]",
                          }
                        );
                      }}
                    >
                      Save & Add
                    </Button>
                  </div>
                </div>
              }
            />
          </div>
        </div>

        <div className="p-4 pb-8  bg-[#F6F9FD] border border-[#E0E0E0] ">
          <h5 className="mb-1 heading-text-xl font-semibold text-[#303348] ">
            Payment Info
          </h5>
          <Separator orientation="horizontal" className="my-4" />
          <div
            className=" p-4 bg-white space-y-5"
            style={{ boxShadow: "0px 4px 11px 0px #00000040" }}
          >
            <Label className=" text-[#303348] text-base font-semibold">
              Select Payment Info
            </Label>
            <div className="flex gap-3 flex-wrap px-2">
              <div
                className={`flex gap-2 p-3  bg-[#7ACFFF]  rounded-full items-center ${
                  customAcceptCashPayments === 1
                    ? "bg-[#7ACFFF]"
                    : "bg-white border border-[#DDDDDD]"
                }`}
              >
                <Checkbox
                  className="rounded-full data-[state=checked]:bg-white data-[state=checked]:text-[#7ACFFF] border border-[#DDDDDD]"
                  {...register("custom_accept_cash_payments")}
                  onCheckedChange={(check: any) =>
                    setCheckboxValue("custom_accept_cash_payments", check)
                  }
                  checked={customAcceptCashPayments === 1}
                />
                <LabelSMResponsive
                  className={`text-[#303348] ${
                    customAcceptCashPayments === 1 && "text-white"
                  }`}
                >
                  Accept Cash Payments
                </LabelSMResponsive>
              </div>
              <div
                className={`flex gap-2 p-3  bg-[#7ACFFF]  rounded-full items-center ${
                  customAcceptMedicalPayment === 1
                    ? "bg-[#7ACFFF]"
                    : "bg-white border border-[#DDDDDD]"
                }`}
              >
                <Checkbox
                  className="rounded-full data-[state=checked]:bg-white data-[state=checked]:text-[#7ACFFF] border border-[#DDDDDD]"
                  {...register("custom_accept_medical_billing")}
                  onCheckedChange={(check: any) =>
                    setCheckboxValue("custom_accept_medical_billing", check)
                  }
                  checked={customAcceptMedicalPayment === 1}
                />
                <LabelSMResponsive
                  className={`text-[#303348] ${
                    customAcceptMedicalPayment === 1 && "text-white"
                  }`}
                >
                  Accept Medical Billing
                </LabelSMResponsive>
              </div>
              <div
                className={`flex gap-2 p-3  bg-[#7ACFFF]  rounded-full items-center ${
                  customAcceptMiscPayment === 1
                    ? "bg-[#7ACFFF]"
                    : "bg-white border border-[#DDDDDD]"
                }`}
              >
                <Checkbox
                  className="rounded-full data-[state=checked]:bg-white data-[state=checked]:text-[#7ACFFF] border border-[#DDDDDD]"
                  {...register("custom_accept_misc_payment")}
                  onCheckedChange={(check: any) =>
                    setCheckboxValue("custom_accept_misc_payment", check)
                  }
                  checked={customAcceptMiscPayment === 1}
                />
                <LabelSMResponsive
                  className={`text-[#303348] ${
                    customAcceptMiscPayment === 1 && "text-white"
                  }`}
                >
                  Accept Misc. Payment
                </LabelSMResponsive>
              </div>
              <div
                className={`flex gap-2 p-3  bg-[#7ACFFF]  rounded-full items-center ${
                  customAcceptVFCBilling === 1
                    ? "bg-[#7ACFFF]"
                    : "bg-white border border-[#DDDDDD]"
                }`}
              >
                <Checkbox
                  className="rounded-full data-[state=checked]:bg-white data-[state=checked]:text-[#7ACFFF] border border-[#DDDDDD]"
                  {...register("custom_accept_vfc_billing")}
                  onCheckedChange={(check: any) =>
                    setCheckboxValue("custom_accept_vfc_billing", check)
                  }
                  checked={customAcceptVFCBilling === 1}
                />
                <LabelSMResponsive
                  className={`text-[#303348] ${
                    customAcceptVFCBilling === 1 && "text-white"
                  }`}
                >
                  Accept VFC Billing
                </LabelSMResponsive>
              </div>
            </div>
            <div className="flex flex-wrap gap-6 px-3">
              {customAcceptMedicalPayment === 1 && (
                <>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      {...register("custom_medicare_billing")}
                      onCheckedChange={(check: any) =>
                        setCheckboxValue("custom_medicare_billing", check)
                      }
                      defaultChecked={
                        getValues("custom_medicare_billing") === 1
                      }
                    />
                    <LabelSMResponsive className="text-[#303348]">
                      Medicare Billing
                    </LabelSMResponsive>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      {...register("custom_medical_billing")}
                      onCheckedChange={(check: any) =>
                        setCheckboxValue("custom_medical_billing", check)
                      }
                      defaultChecked={getValues("custom_medical_billing") === 1}
                    />
                    <LabelSMResponsive className="text-[#303348]">
                      Medi-Cal Billing
                    </LabelSMResponsive>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      {...register("custom_private_insurance_billing")}
                      onCheckedChange={(check: any) =>
                        setCheckboxValue(
                          "custom_private_insurance_billing",
                          check
                        )
                      }
                      defaultChecked={
                        getValues("custom_private_insurance_billing") === 1
                      }
                    />
                    <LabelSMResponsive className="text-[#303348]">
                      Private Insurance Billing
                    </LabelSMResponsive>
                  </div>
                </>
              )}
              {customAcceptVFCBilling === 1 && (
                <>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      {...register("custom_vfc_billing")}
                      onCheckedChange={(check: any) =>
                        setCheckboxValue("custom_vfc_billing", check)
                      }
                      defaultChecked={getValues("custom_vfc_billing") === 1}
                    />
                    <LabelSMResponsive className="text-[#303348]">
                      VFC Billing
                    </LabelSMResponsive>
                  </div>
                </>
              )}
              {customAcceptCashPayments === 1 && (
                <>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      {...register("custom_cash")}
                      onCheckedChange={(check: any) =>
                        setCheckboxValue("custom_cash", check)
                      }
                      defaultChecked={getValues("custom_cash") === 1}
                    />
                    <LabelSMResponsive className="text-[#303348]">
                      Cash
                    </LabelSMResponsive>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      {...register("custom_credit_card")}
                      onCheckedChange={(check: any) =>
                        setCheckboxValue("custom_credit_card", check)
                      }
                      defaultChecked={getValues("custom_credit_card") === 1}
                    />
                    <LabelSMResponsive className="text-[#303348]">
                      Credit Card
                    </LabelSMResponsive>
                  </div>
                </>
              )}
              {customAcceptMiscPayment === 1 && (
                <>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      {...register("custom_uninsured")}
                      onCheckedChange={(check: any) =>
                        setCheckboxValue("custom_uninsured", check)
                      }
                      defaultChecked={getValues("custom_uninsured") === 1}
                    />
                    <LabelSMResponsive className="text-[#303348]">
                      Uninsured
                    </LabelSMResponsive>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      {...register("custom_do_not_collect_payment")}
                      onCheckedChange={(check: any) =>
                        setCheckboxValue("custom_do_not_collect_payment", check)
                      }
                      defaultChecked={
                        getValues("custom_do_not_collect_payment") === 1
                      }
                    />
                    <LabelSMResponsive className="text-[#303348]">
                      Do Not Collect Payment
                    </LabelSMResponsive>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="p-4 bg-[#F6F9FD] border border-[#E0E0E0] ">
          <h5 className="mb-1 heading-text-xl font-semibold text-[#303348] ">
            Disclaimer
          </h5>
          <Separator orientation="horizontal" className="my-4" />
          <div className="bg-white ">
            <ReactQuill
              theme="snow"
              value={getRTEValue}
              onChange={setRTEValue}
            />
          </div>
        </div>
      </div>
      <CustomDrawer
        open={openAddLocation}
        title="Add Location Details"
        setOpen={setOnOpenLocation}
        contentChilder={
          <ViewLocation
            onOpen={setOnOpenLocation}
            from="add"
            id={"location-add-wefwegbrieug"}
          />
        }
      />

      <div className="flex justify-end mt-4 sticky bottom-1 py-2">
        <Button
          className="bg-[#47BDFF] text-white border-[#474747] border-x  border-y border-opacity-20 font-semibold  xl:text-sm text-xs hover:bg-[#3EA4DE]"
          onClick={() => onsubmit()}
        >
          Save
        </Button>
      </div>
    </div>
  ) : (
    <LoadingScreen />
  );
};

export default NewEvent;
