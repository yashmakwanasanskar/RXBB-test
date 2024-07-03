import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

import BillingCodeAppointment from "@/components/shared/Cards/BillingCodeAppointment";
import DynamicRadioButton, {
  DynamicRadioButtonWithUseFormHook,
} from "@/components/shared/DynamicRadioButton";
import { Stepper } from "@/components/shared/Stepper";
import ComboboxDropDown from "@/components/shared/comboBoxDropDown";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input, InputSMResponsive } from "@/components/ui/input";
import { Label, LabelSMResponsive } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import API, { BASE_URL } from "@/constants/api.constant";
import {
  BillService,
  DetailsInformationService,
  FemaleImage,
  MaleImage,
  userProfile,
} from "@/constants/images";
import { axiosGETAPI, axiosPOSTAPI } from "@/helpers/commonAPI";
import { ArrowDownUp, ChevronLeft, ChevronRight, Printer } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BillingCodeLabel, paymentTypeMapping } from "@/constants/fields";
import DialogWithInputComboboxBillingCode from "@/components/shared/CustomDialogBox/DialogwithInputComboboxBillingCodePopup";
import { DataTable } from "@/components/shared/tables/data-table";
import { BillingCodeColumns } from "@/components/shared/tables/column-def";
import { validatedLink } from "@/helpers/API/getAPIData";
import { PatientStatusCodeImage } from "@/utilities/utils";
import LoadingScreen from "@/components/shared/loading-screen";
import { LayoutContext } from "@/components/shared/LayoutContext";

const BillingComponent = ({
  billingComponentProps,
  getAPIDocs,
  register,
  params,
  comboBoxKeyValues,
  setValue,
  getValues,
}: any) => {
  const {
    handleInputChangeComboBox,
    getBillingCodeData,
    setBillingCodeData,
    selectPrimaryPolicyHolder,
    setPrimaryPolicyHolder,
    selectTimeofPayment,
    setTimeofPayment,
    paymentTypeOptions,
    tableViewFieldState,
    setTableViewFieldState,
  } = billingComponentProps;

  const [open, onOpen] = useState<boolean>(false);
  const AddNewBillingData = (newBillingData: any) => {
    const newData = {
      doctype: "Billing Code",
      owner: "mehta.viral@gmail.com",
      parent: params.id,
      parentfield: "custom_billing_code",
      parenttype: "Patient Appointment",
      // item_name: "0636",
      definition: newBillingData.definition,
      item_name: newBillingData.item_name,
      item_code: newBillingData.item_code,
      appointment_type: newBillingData.appointment_type,
      code_system: newBillingData.code_system,
    };

    setBillingCodeData((prev: any) => {
      return [...prev, newData];
    });
  };
  console.log(comboBoxKeyValues);
  return (
    <div className="mt-5  bg-[#F6F9FD] px-4 py-4 mx-1 border border-[#E0E0E0] rounded-lg space-y-3">
      {/* Price List */}
      <div className="grid 2xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-6 my-4 bg-white border-[#D4D6DD] p-4 rounded-xl shadow-lg">
        <div className="grid w-full  items-center gap-1.5">
          <Label className="text-[#616161] xl:text-sm text-xs ">
            Payment Type
          </Label>
          {/* <DynamicRadioButton
            data={CMRPaymentTypes}
            getButtonSelection={selectCMRPaymentType}
            setButtonSelection={setSelectCMRPaymentType}
            defaultValue="Medi-Cal Billing"
          /> */}
          <ComboboxDropDown
            staticValue={paymentTypeOptions}
            placeholder="select Payment Type"
            handleInputChange={handleInputChangeComboBox}
            label="custom_payment_type"
            // register={register}
            // errors={errors}
            // dataValue={getAPIDocs.payment_type}
            // setValueForm={setValue}
            displayValue={"label"}
            outputValue={"label"}
            dataValue={
              comboBoxKeyValues.custom_payment_type ||
              getAPIDocs.custom_payment_type
            }
          />
        </div>
        {comboBoxKeyValues &&
          comboBoxKeyValues.custom_payment_type ===
            "Private Insurance Billing" && (
            <div className="col-span-2">
              <Label className="text-[#616161] xl:text-sm text-xs ">
                is the Primary Policy Holder
              </Label>
              <DynamicRadioButtonWithUseFormHook
                data={[
                  {
                    label: "Yes",
                    value: "Yes",
                  },
                  {
                    label: "No",
                    value: "No",
                  },
                ]}
                getButtonSelection={selectPrimaryPolicyHolder}
                setButtonSelection={setPrimaryPolicyHolder}
                defaultValue="Yes"
                label="custom_is_the_patient_the_primary_policy_holder"
                register={register}
                setValueForm={setValue}
                getValueForm={getValues}
              />
            </div>
          )}

        {/* if primary policy holder is yes  */}

        {comboBoxKeyValues &&
          comboBoxKeyValues.custom_payment_type ===
            "Private Insurance Billing" && (
            <div className="text-[#616161] xl:text-sm text-xs ">
              <Label className="text-[#616161] xl:text-sm text-xs ">
                Primary Carrier
              </Label>
              <Input
                type="text"
                className=" xl:text-sm text-xs "
                defaultValue={getAPIDocs.custom_primary_carrier}
                {...register("custom_primary_carrier")}
              />
            </div>
          )}
        {comboBoxKeyValues &&
          comboBoxKeyValues.custom_payment_type ===
            "Private Insurance Billing" && (
            <div className="text-[#616161] xl:text-sm text-xs ">
              <Label className="text-[#616161] xl:text-sm text-xs ">
                Medical Record Number
              </Label>
              <Input
                type="text"
                className=" xl:text-sm text-xs "
                defaultValue={getAPIDocs.custom_medical_record_number_required}
                {...register("custom_medical_record_number_required")}
              />
            </div>
          )}
        {comboBoxKeyValues &&
          comboBoxKeyValues.custom_payment_type ===
            "Private Insurance Billing" && (
            <div className="text-[#616161] xl:text-sm text-xs ">
              <Label className="text-[#616161] xl:text-sm text-xs ">
                Group Number
              </Label>
              <Input
                type="text"
                className=" xl:text-sm text-xs "
                defaultValue={getAPIDocs.custom_group_number}
                {...register("custom_group_number")}
              />
            </div>
          )}

        {/* if primary policy holder is No */}

        {comboBoxKeyValues &&
          comboBoxKeyValues.custom_payment_type ===
            "Private Insurance Billing" &&
          selectPrimaryPolicyHolder === "No" && (
            <div className="text-[#616161] xl:text-sm text-xs ">
              <Label className="text-[#616161] xl:text-sm text-xs ">
                Primary holder first name
              </Label>
              <Input
                type="text"
                className=" xl:text-sm text-xs "
                defaultValue={getAPIDocs.custom_primary_holder_first_name}
                {...register("custom_primary_holder_first_name")}
              />
            </div>
          )}

        {comboBoxKeyValues &&
          comboBoxKeyValues.custom_payment_type ===
            "Private Insurance Billing" &&
          selectPrimaryPolicyHolder === "No" && (
            <div className="text-[#616161] xl:text-sm text-xs ">
              <Label className="text-[#616161] xl:text-sm text-xs ">
                Primary holder middle name
              </Label>
              <Input
                type="text"
                className=" xl:text-sm text-xs "
                defaultValue={getAPIDocs.custom_primary_holder_middle_name}
                {...register("custom_primary_holder_middle_name")}
              />
            </div>
          )}

        {comboBoxKeyValues &&
          comboBoxKeyValues.custom_payment_type ===
            "Private Insurance Billing" &&
          selectPrimaryPolicyHolder === "No" && (
            <div className="text-[#616161] xl:text-sm text-xs ">
              <Label className="text-[#616161] xl:text-sm text-xs ">
                Primary holder last name
              </Label>
              <Input
                type="text"
                className=" xl:text-sm text-xs "
                defaultValue={getAPIDocs.custom_primary_holder_last_name}
                {...register("custom_primary_holder_last_name")}
              />
            </div>
          )}

        {comboBoxKeyValues &&
          comboBoxKeyValues.custom_payment_type ===
            "Private Insurance Billing" &&
          selectPrimaryPolicyHolder === "No" && (
            <div className="text-[#616161] xl:text-sm text-xs ">
              <Label className="text-[#616161] xl:text-sm text-xs ">
                Primary holder dob
              </Label>
              <Input
                type="date"
                className=" xl:text-sm text-xs "
                defaultValue={getAPIDocs.custom_primary_holder_dob1}
                {...register("custom_primary_holder_dob1")}
              />
            </div>
          )}
        {comboBoxKeyValues &&
          comboBoxKeyValues.custom_payment_type ===
            "Private Insurance Billing" &&
          selectPrimaryPolicyHolder === "No" && (
            <div className="text-[#616161] xl:text-sm text-xs ">
              <Label className="text-[#616161] xl:text-sm text-xs ">
                Relationship to policy holder
              </Label>
              <Input
                type="text"
                className=" xl:text-sm text-xs "
                defaultValue={getAPIDocs.custom_relationship_to_policy_holder}
                {...register("custom_relationship_to_policy_holder")}
              />
            </div>
          )}

        {comboBoxKeyValues &&
          ["Medicare Billing", "Medi-Cal Billing"].includes(
            comboBoxKeyValues.custom_payment_type
          ) && (
            <div className="grid w-full  items-center gap-1.5">
              <Label className="text-[#616161] xl:text-sm text-xs ">
                Medi-Cal ID Number
              </Label>
              <Input
                type="text"
                defaultValue={getAPIDocs.custom_medicare_id_number}
                {...register("custom_medicare_id_number")}
              />
            </div>
          )}

        {comboBoxKeyValues &&
          ["Cash", "Credit Card"].includes(
            comboBoxKeyValues.custom_payment_type
          ) && (
            <div className="col-span-2">
              <Label className="text-[#616161] xl:text-sm text-xs ">
                Time of Payment
              </Label>
              <DynamicRadioButtonWithUseFormHook
                data={[
                  {
                    label: "At the time of appointment",
                    value: "At the time of appointment",
                  },
                  {
                    label: "Pay now",
                    value: "Pay now",
                  },
                ]}
                getButtonSelection={selectTimeofPayment}
                setButtonSelection={setTimeofPayment}
                defaultValue="Pay now"
                label="time_of_payment"
                register={register}
                setValueForm={setValue}
                getValueForm={getValues}
              />
            </div>
          )}
      </div>

      <div className="grid 2xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-6">
        {/* <div className="grid w-full max-w-sm items-center gap-1.5">
          <LabelSMResponsive className="text-[#616161]">
            Payment Type
          </LabelSMResponsive>
          <ComboboxDropDown
            placeholder="select Payment Type"
            staticValue={[
              {
                value: "Medicare Billing",
              },
              {
                value: "Medi-Cal Billing",
              },
              {
                value: "Private Insurance Billing",
              },
              {
                value: "VFC Billing",
              },
            ]}
            handleInputChange={handleInputChangeComboBox}
            doctype="CMR Service"
            label="custom_payment_type"
            dataValue={getAPIDocs.custom_payment_type}
          />
        </div> */}

        {/* Cash Price */}
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <LabelSMResponsive className="text-[#616161]">
            Cash Price
          </LabelSMResponsive>
          <InputSMResponsive
            type="text"
            placeholder="0.00"
            defaultValue={getAPIDocs.custom_cash}
            {...register("custom_cash")}
            readOnly
          />
        </div>
      </div>
      {/* <div className="space-x-2 ">
        <Checkbox className=" my-auto" />
        <label className="font-medium leading-6 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[#474747] xl:text-sm text-xs">
          Accept Cash Payments
        </label>

        <Checkbox className=" my-auto ml-2" />
        <label className="font-medium leading-6 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[#474747] xl:text-sm text-xs">
          Accept RX Billing
        </label>
      </div>
      <div className="space-x-2">
        <Checkbox className=" my-auto " />
        <label className="font-medium leading-6 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[#474747] xl:text-sm text-xs">
          Accept Medical Billing
        </label>
      </div> */}
      <div>
        {[
          "Medicare Billing",
          "Medi-Cal Billing",
          "Private Insurance Billing",
          "VFC Billing",
        ].includes(comboBoxKeyValues.custom_payment_type) && (
          <div className="flex flex-wrap ">
            <Separator orientation="horizontal" className="my-3 mb-5" />
            <h5 className="mb-1  xl:text-[1.35rem] sm:text-base  font-semibold text-[#656565] ">
              Billing Code
            </h5>
            {/* {getBillingCodeData.map((item: any, index: any) => (
            <BillingCodeAppointment
              data1={item.item_code}
              showData
              data2={item.code_system}
              data3={item.definition}
              inputLabel={[
                {
                  type: "comboBox",
                  doctype: "Code Value",
                  value: "item_code",
                  placeholder: "Select Billing Code",
                  label: "Code Value",
                  data: item.item_code,
                  dependValueChange: true,
                },
                {
                  type: "comboBox",
                  doctype: "Code System",
                  value: "code_system",
                  placeholder: "Select Code System",
                  label: "Code System",
                  data: item.code_system,
                },
                {
                  type: "text",
                  value: "definition",
                  label: "Definition",
                  data: item.definition,
                },
              ]}
              key={index}
              index={index}
              setData={setBillingCodeData}
            />
          ))}
          <BillingCodeAppointment
            data1="efwef"
            data2="Efefefef"
            inputLabel={[
              {
                type: "comboBox",
                doctype: "Code Value",
                value: "item_code",
                placeholder: "Select Billing Code",
                label: "Code Value",
                dependValueChange: true,
              },
              {
                type: "comboBox",
                doctype: "Code System",
                value: "code_system",
                placeholder: "Select Code System",
                label: "Code System",
              },
              {
                type: "text",
                value: "definition",
                label: "Definition",
              },
            ]}
            addData={AddNewBillingData}
          /> */}
            <DataTable
              columns={BillingCodeColumns}
              data={getBillingCodeData}
              label={"Billing Code"}
              onOpen={onOpen}
              setData={setBillingCodeData}
              tableViewFieldState={tableViewFieldState}
              setTableViewFieldState={setTableViewFieldState}
              allFields={BillingCodeLabel}
              userSettingLabel="Billing Code"
              doctype="Patient Appointment"
            />
            <DialogWithInputComboboxBillingCode
              inputLabel={[
                {
                  type: "comboBox",
                  doctype: "Code Value",
                  value: "item_code",
                  placeholder: "Select Billing Code",
                  label: "Code Value",
                  dependValueChange: true,
                },
                {
                  type: "comboBox",
                  doctype: "Code System",
                  value: "code_system",
                  placeholder: "Select Code System",
                  label: "Code System",
                },
                {
                  type: "text",
                  value: "definition",
                  label: "Definition",
                  dependantValue: true,
                },
                {
                  type: "text",
                  value: "item_name",
                  label: "Time Slot",
                  dependantValue: true,
                },
                {
                  type: "comboBox",
                  value: "appointment_type",
                  doctype: "Appointment Type",
                  placeholder: "Select Appointment Type",
                  label: "Appointment Type",
                },
              ]}
              AddNewData={AddNewBillingData}
              open={open}
              onOpen={onOpen}
              dialogTitle={"Add Billing Code"}
              classname={undefined}
            />
          </div>
        )}
      </div>
    </div>
  );
};

const AppointmentView = () => {
  const params = useParams();
  const [selectedStepper, setSelectedStepper] = useState("details");

  const [getAPIDocs, setAPIDocs] = useState<any>();
  const [_getAPIDocsInfo, setAPIDocsInfo] = useState<any>();
  const [_getLinkTitle, setLinkTitle] = useState<any>();
  const [isDataLoaded, setDataLoaded] = useState<boolean>(false);

  const [reloadData, setReloadData] = useState<boolean>(false);
  //select a gender useState
  const [selectGender, setGender] = useState<any>("Male");
  const [selectPrimaryPolicyHolder, setPrimaryPolicyHolder] =
    useState<string>("Yes");
  const [selectTimeofPayment, setTimeofPayment] = useState<string>("Pay Now");
  const { setDocTypeStatus } = useContext<any>(LayoutContext);

  const [tableViewFieldState, setTableViewFieldState] = useState<any>();
  const steps = [
    {
      key: "details",
      label: "Details",
      icon: DetailsInformationService.path,
    },
    {
      key: "billing",
      label: "Billing",
      icon: BillService.path,
    },
  ];

  //   const data = [
  //     {
  //       value: "servicenew", //not using camelcase due to error on the ComboBox
  //       label: "Service New",
  //     },
  //     {
  //       value: "servicedemo", //not using camelcase due to error on the ComboBox
  //       label: "Service Demo",
  //     },
  //   ];

  //   const CMRRecipientData = [
  //     {
  //       label: "Locations",
  //       value: "locations",
  //     },
  //     {
  //       label: "Department",
  //       value: "department",
  //     },
  //     {
  //       label: "Practitioner",
  //       value: "practitioner",
  //     },
  //   ];
  const IncrementStepper = () => {
    let nextIndex = Math.min(
      steps.findIndex((step) => selectedStepper === step.key) + 1,
      steps.length - 1
    );
    setSelectedStepper(steps[nextIndex].key);
  };

  const DecrementStepper = () => {
    let nextIndex = Math.max(
      steps.findIndex((step) => selectedStepper === step.key) - 1,
      0
    );
    setSelectedStepper(steps[nextIndex].key);
  };
  useEffect(() => {
    const fetchData = async () => {
      const URL =
        BASE_URL +
        API.VIEW_DOCTYPE +
        `?doctype=Patient%20Appointment&name=${params.id}`;
      const response = await axiosGETAPI(URL);
      if (response.status === 200) {
        const CLIENT_GET_URL = BASE_URL + API.CLIENT_GET;
        const responseClientGet = await axiosPOSTAPI(CLIENT_GET_URL, {
          doctype: "Appointment Type",
          name: response.data.docs[0].appointment_type,
        });
        if (responseClientGet.status === 200) {
          const AvailablePaymentTypeOptions = [];

          // Iterate over the keys in the mapping
          for (const [key, label] of Object.entries(paymentTypeMapping)) {
            if (responseClientGet.data.message[key] === 1) {
              AvailablePaymentTypeOptions.push({
                label: label,
                value: key,
              });
            }
          }
          setPaymentTypeOptions(AvailablePaymentTypeOptions);
        }
        const LOAD_GET_DOCTYPE =
          BASE_URL + API.LOAD_FORM_DOCTYPE + "?doctype=Patient Appointment";
        const responseLoadGETDocType = await axiosGETAPI(LOAD_GET_DOCTYPE);
        if (responseLoadGETDocType.status === 200) {
          setTableViewFieldState(
            JSON.parse(responseLoadGETDocType.data.user_settings)
          );
        }

        if (response.data?.docs[0].patient_name) {
          const patientResponse = await validatedLink(
            "Patient",
            response.data?.docs[0].patient,
            '["custom_patient_notes","image","status","email","mobile","sex"]'
          );
          setPatientAPIData(patientResponse);
          console.log("patientResponse", patientResponse);
        }

        setAPIDocs(response.data?.docs[0]);
        setAPIDocsInfo(response.data?.docinfo);
        setLinkTitle(response.data?._link_titles);
        setBillingCodeData(response.data?.docs[0].custom_billing_code);
        setGender(response.data?.docs[0].patient_sex);
        setPrimaryPolicyHolder(
          response.data?.docs[0].custom_is_the_patient_the_primary_policy_holder
        );
        setComboBoxKeyValues((prev: any) => {
          return {
            ...prev,
            custom_payment_type: response.data?.docs[0].custom_payment_type,
          };
        });

        const workflowState = await validatedLink(
          response.data.docs[0].custom_service_type,
          response.data.docs[0].custom_service_name,
          `["workflow_state"]`
        );

        setDocTypeStatus({
          page: `${
            response.data.docs[0].custom_service_type === "CMR Service"
              ? "cmr-service"
              : "immunization-service"
          }`,
          status: workflowState.workflow_state,
        });
        setTimeofPayment(response.data?.docs[0].custom_payment_time);
        setDataLoaded(true);
      }
    };
    fetchData();
    return () => {
      setDocTypeStatus(undefined);
    };
  }, [params, reloadData]);



  const { register, getValues, setValue } = useForm();
  const handleInputChangeComboBox = (value: string, label: string) => {
    setComboBoxKeyValues((prev: any) => {
      return { ...prev, [label]: value };
    });
  };
  const [comboBoxKeyValues, setComboBoxKeyValues] = useState<any>({});
  const [getBillingCodeData, setBillingCodeData] = useState<any>([]);
  const [paymentTypeOptions, setPaymentTypeOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const [selectPatientApiData, setPatientAPIData] = useState<any>();
  const finalSubmit = async () => {
    const URL = BASE_URL + API.SAVE_DOCS;
    const reqBody = {
      name: getAPIDocs.name,
      owner: getAPIDocs.owner,
      creation: getAPIDocs.creation,
      modified: getAPIDocs.modified,
      modified_by: getAPIDocs.modified_by,
      docstatus: getAPIDocs.docstatus,
      idx: getAPIDocs.idx,
      naming_series: getAPIDocs.naming_series,
      title: getAPIDocs.title,
      status: getAPIDocs.status,
      appointment_type: getAPIDocs.appointment_type,
      appointment_for: getAPIDocs.appointment_for,
      custom_service_type:
        comboBoxKeyValues.custom_service_type !== undefined
          ? comboBoxKeyValues.custom_service_type
          : getAPIDocs.custom_service_type,
      custom_service_name:
        comboBoxKeyValues.custom_service_name !== undefined
          ? comboBoxKeyValues.custom_service_name
          : getAPIDocs.custom_service_name,
      company: getAPIDocs.company,
      service_unit:
        comboBoxKeyValues.service_unit !== undefined
          ? comboBoxKeyValues.service_unit
          : getAPIDocs.service_unit,
      custom_delivery_method: getAPIDocs.custom_delivery_method,
      appointment_date: getAPIDocs.appointment_date,
      custom_event_id:
        comboBoxKeyValues.custom_event_id !== undefined
          ? comboBoxKeyValues.custom_event_id
          : getAPIDocs.custom_event_id,
      patient: getAPIDocs.patient,
      patient_name: getAPIDocs.patient_name,
      patient_sex:
        selectGender !== undefined ? selectGender : getAPIDocs.patient_sex,
      custom_dob: getAPIDocs.custom_dob,
      duration: getAPIDocs.duration,
      appointment_time: getAPIDocs.appointment_time,
      custom_appointment_date_time:
        getValues("custom_appointment_date_time") !== undefined
          ? getValues("custom_appointment_date_time")
          : getAPIDocs.custom_appointment_date_time,
      appointment_datetime: getAPIDocs.appointment_datetime,
      add_video_conferencing: getAPIDocs.add_video_conferencing,
      invoiced: getAPIDocs.invoiced,
      paid_amount: getAPIDocs.paid_amount,
      position_in_queue: getAPIDocs.position_in_queue,
      appointment_based_on_check_in: getAPIDocs.position_in_queue,
      reminded: getAPIDocs.reminded,
      custom_payment_type:
        comboBoxKeyValues.custom_payment_type !== undefined
          ? comboBoxKeyValues.custom_payment_type
          : getAPIDocs.custom_payment_type,
      custom_primary_carrier:
        getValues("custom_primary_carrier") !== undefined
          ? getValues("custom_primary_carrier")
          : getAPIDocs.custom_primary_carrier,
      custom_medical_record_number_required:
        getValues("custom_medical_record_number_required") !== undefined
          ? getValues("custom_medical_record_number_required")
          : getAPIDocs.custom_medical_record_number_required,
      custom_group_number:
        getValues("custom_group_number") !== undefined
          ? getValues("custom_group_number")
          : getAPIDocs.custom_group_number,
      custom_exported: getAPIDocs.custom_exported,
      custom_payment_time: getAPIDocs.custom_payment_time,
      custom_payment_mode: getAPIDocs.custom_payment_mode,
      custom_medical_biller_status: getAPIDocs.custom_medical_biller_status,
      custom_policy_number: getAPIDocs.custom_policy_number,
      custom_primary_holder_first_name:
        getValues("custom_primary_holder_first_name") !== undefined
          ? getValues("custom_primary_holder_first_name")
          : getAPIDocs.custom_primary_holder_first_name,
      custom_primary_holder_middle_name:
        getValues("custom_primary_holder_middle_name") !== undefined
          ? getValues("custom_primary_holder_middle_name")
          : getAPIDocs.custom_primary_holder_middle_name,
      custom_primary_holder_last_name:
        getValues("custom_primary_holder_last_name") !== undefined
          ? getValues("custom_primary_holder_last_name")
          : getAPIDocs.custom_primary_holder_last_name,
      custom_primary_holder_dob1: getValues("custom_primary_holder_dob1")
        ? getValues("custom_primary_holder_dob1")
        : getAPIDocs.custom_primary_holder_dob1,
      custom_relationship_to_policy_holder:
        getValues("custom_relationship_to_policy_holder") !== undefined
          ? getValues("custom_relationship_to_policy_holder")
          : getAPIDocs.custom_relationship_to_policy_holder,
      custom_total_service_durationin_minutes:
        getAPIDocs.custom_total_service_durationin_minutes,
      custom_cash:
        getValues("custom_cash") !== undefined
          ? getValues("custom_cash")
          : getAPIDocs.custom_cash,
      custom_billing_status: getAPIDocs.custom_billing_status,
      custom_payment_status: getAPIDocs.custom_payment_status,
      doctype: getAPIDocs.doctype,
      custom_billing_code:
        getBillingCodeData != undefined
          ? getBillingCodeData
          : getAPIDocs.custom_billing_code,
      custom_medical_codes: getAPIDocs.custom_medical_codes,
      custom_is_the_patient_the_primary_policy_holder:
        selectPrimaryPolicyHolder !== undefined
          ? selectPrimaryPolicyHolder
          : getAPIDocs.selectPrimaryPolicyHolder,
    };
    const response = await axiosPOSTAPI(URL, {
      doc: JSON.stringify(reqBody),
      action: "Save",
    });
    if (response.status === 200) {
      toast.success("Document Saved Successfully");
      setReloadData((prev: boolean) => !prev);
    } else {
      toast.success("Document not Saved Successfully");
    }
  };
  return isDataLoaded ? (
    <div className="px-3 pt-3">
      <div className="flex justify-between mb-2 ">
        {/* <div className="flex flex-row gap-4 mb-2 align-middle">
          <h3 className="pl-3 text-xl sm:text-2xl lg:text-3xl 2xl:text-4xl font-medium text-[#474747] ">
            {getAPIDocs.name}
          </h3>
          <div className="m-auto inline-flex align-middle">
            {
              <div className="bg-[#FFFEDF] text-[#B5A300] h-fit w-fit p-1 px-2 border border-[#CCCCCC] rounded-xl font-medium xl:text-base sm:text-sm text-xs text-center sm:block hidden">
                {getAPIDocs.status}
              </div>
            }

            <p className="text-[#898989] m-auto text-wrap xl:block hidden xl:text-base sm:text-sm text-xs ">
              <span className="mx-2 text-[#DFDFDF] xl:text-2xl sm:text-xl text-lg">
                |
              </span>
              11-02-1998
              <span className="mx-2 text-[#DFDFDF] xl:text-2xl sm:text-xl text-lg">
                |
              </span>
              723-652-8960
              <span className="mx-2 text-[#DFDFDF] xl:text-2xl sm:text-xl text-lg">
                |
              </span>
              Chicago, USA, 60601
              <span className="mx-2 text-[#DFDFDF] xl:text-2xl sm:text-xl text-lg">
                |
              </span>
              Medical or Medi-cal
            </p>
          </div>
        </div> */}
        <div className="flex flex-row gap-4 mb-2 ml-3">
          <div className="relative inline-block self-center">
            <img
              src={
                selectPatientApiData && selectPatientApiData.image
                  ? BASE_URL + selectPatientApiData.image
                  : selectPatientApiData.sex === "Male"
                  ? MaleImage.path
                  : FemaleImage.path
              }
              alt={"not found"}
              className="flex-none block w-14 h-14 min-w-14 min-h-14 rounded-full"
            />
            <div
              className={` border-[#66BB6A] w-3 h-3 rounded-full  absolute top-1 right-1 ${PatientStatusCodeImage(
                selectPatientApiData.status
              )}`}
            ></div>
          </div>

          <div>
            <h3 className="text-xl sm:text-2xl lg:text-3xl 2xl:text-4xl font-medium text-[#474747] ">
              {getAPIDocs.patient_name}
            </h3>
            <div className=" items-center">
              <div className="text-[#898989] flex flex-wrap lg:text-lg text-xs items-center">
                {getAPIDocs.custom_dob && (
                  <div className="inline-block">
                    <span>
                      <span className="text-[#474747]  font-medium">DOB</span>
                      :&nbsp;
                    </span>
                  </div>
                )}
                {[
                  getAPIDocs.custom_dob,
                  selectPatientApiData.email,
                  selectPatientApiData.mobile,
                  getAPIDocs.custom_payment_type,
                ]
                  .filter((item: any) => item)
                  .map((item, index) => {
                    return (
                      <>
                        {index !== 0 && (
                          <div className="border-2 rounded-full mx-2 w-1 h-1 inline-block border-[#898989]"></div>
                        )}
                        <div className="inline-block">
                          <span>{item}</span>
                        </div>
                      </>
                    );
                  })}
                {getAPIDocs.custom_payment_type &&
                  getAPIDocs.custom_payment_type ===
                    paymentTypeMapping.custom_medicare_billing &&
                  getAPIDocs.custom_medicare_id_number && (
                    <>
                      <div className="border-2 rounded-full mx-2 w-1 h-1 inline-block border-[#898989]"></div>
                      <div className="inline-block">
                        <span>{getAPIDocs.custom_medicare_id_number}</span>
                      </div>
                    </>
                  )}
                {getAPIDocs.custom_payment_type &&
                  getAPIDocs.custom_payment_type ===
                    paymentTypeMapping.custom_medical_billing &&
                  getAPIDocs.custom_medi_cal_id_number && (
                    <>
                      <div className="border-2 rounded-full mx-2 w-1 h-1 inline-block border-[#898989]"></div>
                      <div className="inline-block">
                        <span>{getAPIDocs.custom_medi_cal_id_number}</span>
                      </div>
                    </>
                  )}
                {getAPIDocs.custom_payment_type &&
                  getAPIDocs.custom_payment_type ===
                    paymentTypeMapping.custom_private_insurance_billing &&
                  [
                    getAPIDocs.custom_primary_carrier,
                    getAPIDocs.custom_medical_record_number_required,
                    getAPIDocs.custom_group_number,
                  ]
                    .filter((item) => item)
                    .map((item, index) => {
                      return (
                        <>
                          <div className="border-2 rounded-full mx-2 w-1 h-1 inline-block border-[#898989]"></div>
                          <div className="inline-block">
                            <span>{item}</span>
                          </div>
                        </>
                      );
                    })}
              </div>
            </div>
          </div>
        </div>
        <div className="space-x-2 text-nowrap align-middle">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="bg-[#F6F9FD] border-[#DDDDDD] text-[#616161] gap-1"
              >
                <ArrowDownUp className="w-4 h-4" />
                view
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="">
              <DropdownMenuGroup>
                <Link to={`/patients/${getAPIDocs.patient}`}>
                  <DropdownMenuItem>
                    <Label className="text-[#616161] xl:text-sm text-xs">
                      Patient
                    </Label>
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem>
                  <Link
                    to={`${
                      getAPIDocs.custom_service_type === "Immunization Service"
                        ? "/immunization-service/"
                        : "/cmr-service/"
                    }${getAPIDocs.custom_service_name}`}
                  >
                    <Label className="text-[#616161] xl:text-sm text-xs">
                      {getAPIDocs.custom_service_type}
                    </Label>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* <Link
            to={`${BASE_URL}${API.PDF_PAGE}?doctype=CMR Service&name=${params.id}&format=Standard&no_letterhead=1&letterhead=No%20Letterhead&settings=%7B%7D&_lang=en`}
          >
            <Button
              variant="outline"
              size="icon"
              className=" border-[#DDDDDD] bg-[#F6F9FD] text-[#616161]"
            >
              <Printer className="sm:w-4 sm:h-4 w-3 h-3" />
            </Button>
          </Link> */}
        </div>
      </div>
      <div className="m-auto align-middle block xl:hidden pl-3">
        {
          <div className="bg-[#FFFEDF] text-[#B5A300] h-fit w-fit p-1 px-2 border border-[#CCCCCC] rounded-xl font-medium xl:text-base sm:text-sm text-xs text-center block sm:hidden">
            {getAPIDocs.name}
          </div>
        }

        <p className="text-[#898989] m-auto text-wrap block xl:hidden xl:text-base sm:text-sm text-xs">
          11-02-1998
          <span className="mx-2 text-[#DFDFDF] xl:text-2xl sm:text-xl text-lg">
            |
          </span>
          723-652-8960
          <span className="mx-2 text-[#DFDFDF] xl:text-2xl sm:text-xl text-lg">
            |
          </span>
          Chicago, USA, 60601
          <span className="mx-2 text-[#DFDFDF] xl:text-2xl sm:text-xl text-lg">
            |
          </span>
          Medical or Medi-cal
        </p>
      </div>
      <Separator orientation="horizontal" className="my-2 lg:my-0" />
      <div className="flex h-[calc(100vh-180px)] overflow-auto">
        <Stepper
          steps={steps}
          selectedStepper={selectedStepper}
          setSelectedStepper={setSelectedStepper}
          hideSideIcons={false}
          progressCheckBox={false}
        />
        <div className="w-full h-full flex flex-col overflow-hidden">
          <div className="overflow-auto flex-grow">
            {selectedStepper === "details" && (
              <div className="">
                {/* Default Duration */}
                <div className="mt-5 px-4 py-4 grid 2xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-6 bg-[#F6F9FD] rounded-lg  mx-1 border border-[#E0E0E0]">
                  <div className="grid w-full max-w-sm items-center gap-1.5 mb-auto">
                    <LabelSMResponsive className="text-[#616161]">
                      Status
                    </LabelSMResponsive>
                    <InputSMResponsive
                      type="text"
                      placeholder="enter Status"
                      // icon={TimerIconAppointmentView.path}
                      defaultValue={getAPIDocs.status}
                      {...register("status")}
                      readOnly
                    />
                  </div>

                  {/* company */}
                  <div className="grid w-full max-w-sm items-center gap-1.5 mb-auto">
                    <LabelSMResponsive className="text-[#616161]">
                      Company
                    </LabelSMResponsive>
                    <InputSMResponsive
                      type="text"
                      placeholder="enter company"
                      defaultValue={getAPIDocs.company}
                      {...register("company")}
                      readOnly
                    />
                  </div>

                  <div className="grid w-full max-w-sm items-center gap-1.5 mb-auto">
                    <LabelSMResponsive className="text-[#616161]">
                      Appointment Type <span className="text-[#ED9192]">*</span>
                    </LabelSMResponsive>
                    <InputSMResponsive
                      type="text"
                      placeholder="Enter Appointment Type"
                      defaultValue={getAPIDocs.appointment_type}
                      {...register("appointment_type")}
                      readOnly
                    />
                  </div>

                  <div className="grid w-full max-w-sm items-center gap-1.5 mb-auto">
                    <LabelSMResponsive className="text-[#616161]">
                      Locations <span className="text-[#ED9192]">*</span>
                    </LabelSMResponsive>
                    <ComboboxDropDown
                      placeholder="select Location"
                      handleInputChange={handleInputChangeComboBox}
                      doctype="Healthcare Service Unit"
                      label="service_unit"
                      dataValue={getAPIDocs.service_unit}
                    />
                  </div>

                  {/* <div className="grid w-full max-w-sm items-center gap-1.5 mb-auto">
                  <LabelSMResponsive className="text-[#616161]">
                    Appointment For <span className="text-[#ED9192]">*</span>
                  </LabelSMResponsive>
                  <InputSMResponsive
                    type="text"
                    placeholder="Enter Appointment For"
                    readOnly
                    defaultValue={getAPIDocs.appointment_for}
                  />
                </div> */}

                  <div className="grid w-full max-w-sm items-center gap-1.5 mb-auto">
                    <LabelSMResponsive className="text-[#616161]">
                      Date <span className="text-[#ED9192]">*</span>
                    </LabelSMResponsive>
                    <InputSMResponsive
                      type="date"
                      placeholder="Enter Date"
                      defaultValue={getAPIDocs.appointment_date}
                      {...register("appointment_date")}
                    />
                  </div>

                  {/* <div className="grid w-full max-w-sm items-center gap-1.5 mb-auto">
                  <LabelSMResponsive className="text-[#616161]">
                    Service Type
                  </LabelSMResponsive>
                  <ComboboxDropDown
                    placeholder="select Location"
                    handleInputChange={handleInputChangeComboBox}
                    doctype="DocType"
                    label="custom_service_type"
                    dataValue={getAPIDocs.custom_service_type}
                  />
                </div> */}

                  <div className="grid w-full max-w-sm items-center gap-1.5 mb-auto">
                    <LabelSMResponsive className="text-[#616161]">
                      Event
                    </LabelSMResponsive>
                    <ComboboxDropDown
                      placeholder="select Location"
                      handleInputChange={handleInputChangeComboBox}
                      doctype="Event"
                      label="custom_event_id"
                      displayValue="label"
                      dataValue={
                        _getLinkTitle["Event::" + getAPIDocs.custom_event_id]
                      }
                    />
                  </div>

                  <div className="grid w-full max-w-sm items-center gap-1.5 mb-auto">
                    <LabelSMResponsive className="text-[#616161]">
                      Service Name
                    </LabelSMResponsive>
                    <ComboboxDropDown
                      placeholder="select Service Name"
                      handleInputChange={handleInputChangeComboBox}
                      doctype={getAPIDocs.custom_service_type}
                      disabled
                      label="custom_service_name"
                      dataValue={getAPIDocs.custom_service_name}
                    />
                  </div>
                </div>
                <div className="mt-5  bg-[#F6F9FD] px-4 py-4 mx-1 border border-[#E0E0E0] rounded-lg ">
                  <h5 className="mb-1  font-semibold text-[#474747] xl:text-xl sm:text-lg text-base">
                    Patient Details
                  </h5>
                  <Separator orientation="horizontal" className="my-2" />
                  <div className=" grid 2xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-6 ">
                    <div className="grid w-full max-w-sm items-center gap-1.5 mb-auto">
                      <LabelSMResponsive className="text-[#616161]">
                        Patient <span className="text-[#ED9192]">*</span>
                      </LabelSMResponsive>
                      <InputSMResponsive
                        type="text"
                        placeholder="Select Patient"
                        defaultValue={getAPIDocs.patient_name}
                        readOnly
                      />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5 mb-auto">
                      <LabelSMResponsive className="text-[#616161]">
                        Gender <span className="text-[#ED9192]">*</span>
                      </LabelSMResponsive>
                      <DynamicRadioButton
                        setButtonSelection={setGender}
                        getButtonSelection={selectGender}
                        data={[
                          {
                            label: "Male",
                            value: "Male",
                          },
                          {
                            label: "Female",
                            value: "Female",
                          },
                        ]}
                        defaultValue={getAPIDocs.patient_sex}
                        disabled
                      />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5 mb-auto">
                      <LabelSMResponsive className="text-[#616161]">
                        Date of birth <span className="text-[#ED9192]">*</span>
                      </LabelSMResponsive>
                      <InputSMResponsive
                        type="date"
                        placeholder=""
                        readOnly
                        defaultValue={getAPIDocs.custom_dob}
                        {...register("custom_dob")}
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-5  bg-[#F6F9FD] px-4 py-4 mx-1 border border-[#E0E0E0] rounded-lg">
                  <h5 className="mb-1  font-semibold text-[#474747] xl:text-xl sm:text-lg text-base">
                    Appointment Details
                  </h5>
                  <Separator orientation="horizontal" className="my-2" />
                  <div className=" grid 2xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-6 ">
                    <div className="grid w-full max-w-sm items-center gap-1.5 mb-auto">
                      <LabelSMResponsive className="text-[#616161]">
                        Duration (in minutes){" "}
                      </LabelSMResponsive>
                      <InputSMResponsive
                        type="text"
                        placeholder="Select Duration"
                        defaultValue={getAPIDocs.duration}
                        readOnly
                      />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5 mb-auto">
                      <LabelSMResponsive className="text-[#616161]">
                        Appointment Date Time
                      </LabelSMResponsive>
                      <InputSMResponsive
                        type="datetime-local"
                        placeholder="Select DateTime"
                        defaultValue={getAPIDocs.custom_appointment_date_time
                          .split(".")[0]
                          .replace(" ", "T")}
                        {...register("custom_appointment_date_time")}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
            {selectedStepper === "billing" && (
              <BillingComponent
                billingComponentProps={{
                  handleInputChangeComboBox,
                  getBillingCodeData,
                  setBillingCodeData,
                  selectPrimaryPolicyHolder,
                  setPrimaryPolicyHolder,
                  selectTimeofPayment,
                  setTimeofPayment,
                  paymentTypeOptions,
                  tableViewFieldState,
                  setTableViewFieldState,
                }}
                getAPIDocs={getAPIDocs}
                register={register}
                params={params}
                setValue={setValue}
                getValues={getValues}
                comboBoxKeyValues={comboBoxKeyValues}
              />
            )}
          </div>
          <div className="flex justify-between mt-4 sticky bottom-1 py-2">
            <Button
              onClick={DecrementStepper}
              variant="outline"
              size="icon"
              className="rounded-full border-[#6a6a6a] xl:border-[3px] border-[2px] xl:text-sm text-xs"
            >
              <ChevronLeft
                color="#6a6a6a"
                className="xl:w-[2rem] xl:h-[2rem] w-[1rem] h-[1rem]"
              />
            </Button>
            <div className="flex space-x-4">
              <div className="items-end space-x-2">
                <Button
                  className="bg-[#47BDFF] text-white border-[#474747] border-x border-y border-opacity-20 font-semibold xl:text-sm text-xs hover:bg-[#3EA4DE] "
                  onClick={() => finalSubmit()}
                >
                  Save
                </Button>
              </div>
              <Button
                onClick={IncrementStepper}
                variant="outline"
                size="icon"
                className="rounded-full border-[#6a6a6a] xl:border-[3px] border-[2px] xl:text-sm text-xs"
              >
                <ChevronRight
                  color="#6a6a6a"
                  className="xl:w-[2rem] xl:h-[2rem] w-[1rem] h-[1rem]"
                />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <>
      <LoadingScreen />
    </>
  );
};
export default AppointmentView;
