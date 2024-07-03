import DynamicRadioButton from "@/components/shared/DynamicRadioButton";
import { LayoutContext } from "@/components/shared/LayoutContext";
import ComboboxDropDown, {
  ComboboxDropDownWithUseFormHook,
} from "@/components/shared/comboBoxDropDown";
import ReqiredFieldErrorImage from "@/components/shared/reqiredFieldError";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label, LabelSMResponsive } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import API, { BASE_URL } from "@/constants/api.constant";
import { getDocMethod, validatedLink } from "@/helpers/API/getAPIData";
import {
  ArrowDownUp,
  ChevronLeft,
  ChevronRight,
  Paperclip,
  Tags,
} from "lucide-react";
import { createContext, useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";

import ActivityComponenet from "@/components/shared/ActivityComponenet";
import { PatientAppointmentCardImmunization } from "@/components/shared/Cards/PatientAppointmentCard";
import PaymentTypeComponent from "@/components/shared/PaymentTypeComponent";
import { Stepper } from "@/components/shared/Stepper";
import { DrawerDemo } from "@/components/shared/activityDrawer";
import { CustomDrawer } from "@/components/shared/drawer/drawer";
import LoadingScreen from "@/components/shared/loading-screen";
import AddPatientModal from "@/components/shared/modals/add-patient";
import {
  BillingInfoImmunization,
  MedicalCodeImmunization,
  VaccineDetailsImmunization,
} from "@/components/shared/tables/column-def";
import { DataTable } from "@/components/shared/tables/data-table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { TagInput } from "@/components/ui/tagInput";
import {
  BillingInfoImmunizationField,
  BillingStatusCashField,
  BillingStatusInsuredField,
  EthnicityDropDownOption,
  ImmunizationARMField,
  ImmunizationSiteField,
  ImmunizationWorkFlowState,
  MedicalCodeImmunizationField,
  RaceDropDownOption,
  VaccineDetailsImmunizationField,
  getStepsForWorkflowStateImmunization,
  paymentTypeMapping,
} from "@/constants/fields";
import {
  ActivityButtonIcon,
  AttachementBrowseFile,
  CMRPatientTakeAway,
  DeleteFileIcon,
  DocFileicon,
  FemaleImage,
  ImmunizationServiceAddPatientIcon,
  ImmunizationServiceCloseAppointmentTypeIcon,
  MaleImage,
} from "@/constants/images";
import ROUTES from "@/constants/routes.constats";
import { axiosGETAPI, axiosPOSTAPI, axiosPUTAPI } from "@/helpers/commonAPI";
import { CommentData } from "@/types";
import {
  PatientStatusCodeImage,
  checkboxGetValueNumber,
  checkboxSetValueNumber,
} from "@/utilities/utils";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import Cookies from "js-cookie";
import { useDropzone } from "react-dropzone";
import { PhoneInput } from "react-international-phone";
import { Textarea } from "@/components/ui/textarea";

export const ImmunizationContext = createContext<any>(false);

const Activity = ({ selectActivity }: { selectActivity: CommentData[] }) => {
  return (
    <div className="lg:m-10 mt-5">
      <ActivityComponenet data={selectActivity} />
    </div>
  );
};
interface Result {
  [key: string]: {
    [subKey: string]: string[];
  };
}

const Questionnair = ({ questionnairUseStates }: any) => {
  const { getQuestionnaireAPIData, questionnaireData, setQuestionnaireData } =
    questionnairUseStates;
  const [questinnaireDataTransformate, setQuestinnaireDataTransformate] =
    useState<any>({});

  const { params } = useContext(ImmunizationContext);
  useEffect(() => {
    if (questionnaireData) {
      const result: Result = {};
      questionnaireData.forEach((item: any) => {
        // Split the criteria string
        const parts = item.criteria.split("#$%");

        // Ensure there are exactly 3 parts after splitting
        if (parts.length === 3) {
          const [mainKey, subKey, value] = parts;

          // Initialize the main key if it doesn't exist
          if (!result[mainKey]) {
            result[mainKey] = {};
          }

          // Initialize the sub key if it doesn't exist
          if (!result[mainKey][subKey]) {
            result[mainKey][subKey] = [];
          }

          // Add the value to the sub key list
          result[mainKey][subKey].push(value);
        }
      });
      console.log("result", result);
      setQuestinnaireDataTransformate(result);
    }
  }, [questionnaireData]);
  const checkQuestionnaireCheckbox = (
    appointmentType: string,
    questionID: string,
    value: string
  ): boolean => {
    // console.log(appointmentType, questionID,value)
    // Check if appointmentType exists in the data
    if (questinnaireDataTransformate[appointmentType]) {
      // Check if questionID exists within the appointmentType
      if (questinnaireDataTransformate[appointmentType][questionID]) {
        // Check if the value exists within the questionID
        return questinnaireDataTransformate[appointmentType][
          questionID
        ].includes(value);
      } else {
        return false;
      }
    } else {
      return false;
    }
  };
  const addRemoveQuestionnaire = (
    check: boolean,
    appointmentType: string,
    questionID: string,
    value: string
  ) => {
    if (check) {
      const newData = {
        owner: Cookies.get("email"),
        docstatus: 0,
        criteria: `${appointmentType}#$%${questionID}#$%${value}`,
        yes_or_no: 0,
        parent: params.id,
        parentfield: "questions_store",
        parenttype: "Immunization Service",
        doctype: "Eligibility Check for CMR",
      };
      setQuestionnaireData((prev: any) => [...prev, newData]);
    } else {
      setQuestionnaireData((prev: any) =>
        prev.filter(
          (item: any) =>
            !(item.criteria === `${appointmentType}#$%${questionID}#$%${value}`)
        )
      );
    }
  };

  return (
    <div className="mt-5  bg-[#F6F9FD] px-4 py-4 mx-1 border border-[#E0E0E0] space-y-2">
      <h5 className="mb-1  px-4 font-semibold text-[#474747] xl:text-2xl sm:text-xl text-lg">
        Screening Questions
      </h5>
      <Separator />
      <div className="px-4 pt-1">
        {questinnaireDataTransformate &&
          Object.entries(getQuestionnaireAPIData).map(
            (item: any, categoryIndex: number) => (
              <div
                className="m-4 p-3 bg-white border-[#D4D6DD] border"
                key={categoryIndex}
              >
                <Label className="text-[#474747] text-sm font-semibold ">
                  {item[0]}
                </Label>
                {item[1].map((subItem: any, index: number) => (
                  <div className="space-y-2 pt-2" key={index}>
                    <Separator />
                    <div className="flex justify-between space-x-3">
                      <Label className="flex-grow">
                        <div
                          className="text-[#474747] text-sm font-medium leading-relaxed text-wrap"
                          dangerouslySetInnerHTML={{
                            __html: subItem.questions,
                          }}
                        ></div>
                      </Label>
                      <div className="flex space-x-3 justify-evenly min-w-fit">
                        <div>
                          <Checkbox
                            defaultChecked={checkQuestionnaireCheckbox(
                              item[0],
                              subItem.q_no,
                              "yes"
                            )}
                            onCheckedChange={(check: boolean) =>
                              addRemoveQuestionnaire(
                                check,
                                item[0],
                                subItem.q_no,
                                "yes"
                              )
                            }
                          />
                          <p className="font-bold text-xs">Yes</p>
                        </div>
                        <div>
                          <Checkbox
                            checked={checkQuestionnaireCheckbox(
                              item[0],
                              subItem.q_no,
                              "no"
                            )}
                            onCheckedChange={(check: boolean) =>
                              addRemoveQuestionnaire(
                                check,
                                item[0],
                                subItem.q_no,
                                "no"
                              )
                            }
                          />
                          <p className="font-bold text-xs">No</p>
                        </div>
                        <div>
                          <Checkbox
                            checked={checkQuestionnaireCheckbox(
                              item[0],
                              subItem.q_no,
                              "na"
                            )}
                            onCheckedChange={(check: boolean) =>
                              addRemoveQuestionnaire(
                                check,
                                item[0],
                                subItem.q_no,
                                "na"
                              )
                            }
                          />
                          <p className="font-bold text-xs">N/A</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )
          )}
      </div>
    </div>
  );
};

const Scheduling = ({ schedlingUseStates }: any) => {
  const { setAppointmentScheduling, getAppointmentScheduling } =
    schedlingUseStates;
  const { setReloadData } = useContext(ImmunizationContext);
  const ChangeDateandTimeAPI = async (
    appointmentName: string,
    date: string,
    time: string
  ) => {
    const URL = BASE_URL + API.CMR_APPOINTMENT_SAVE_DATE_TIME;
    await axiosPOSTAPI(URL, {
      appointment: appointmentName,
      date: date,
      time: time,
    });
    setReloadData((prev: boolean) => !prev);
  };
  console.log(getAppointmentScheduling);
  return (
    <div className="mt-5  bg-[#F6F9FD] px-4 py-4 mx-1 border border-[#E0E0E0] space-y-2">
      <h5 className="mb-1  px-4 font-semibold text-[#474747] xl:text-2xl sm:text-xl text-lg">
        Appointment Details
      </h5>
      <Separator />
      <div>
        {getAppointmentScheduling.map((item: any, index: number) => {
          return (
            <div className="p-4 flex space-x-4 ">
              <div className="flex items-center flex-col pt-2">
                <div className="bg-[#47BDFF] text-white p-2 rounded-full w-8 h-8 text-center">
                  {index + 1}
                </div>
                {getAppointmentScheduling.length !== index + 1 && (
                  <Separator orientation="vertical" className="bg-[#CBBFBF]" />
                )}
              </div>
              <PatientAppointmentCardImmunization
                data={item}
                ChangeDateandTimeAPI={ChangeDateandTimeAPI}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

const VaccineDetails = ({ vaccineDetailsProps }: any) => {
  const {
    getAPIDataDocs,
    register,
    getAPIDataLinkTitles,
    params,
    setValue,
    handleInputChangeComboBox,
    tableViewFieldState,
    setTableViewFieldState,
  } = useContext(ImmunizationContext);

  const {
    getVFCCheck,
    setVFCCheck,
    getVFCTemplate,
    setVFCEligibleTableData,
    getVFCEligibleTableData,
    getVaccineDetailsData,
    setVaccineDetailsData,
  } = vaccineDetailsProps;

  const [open, onOpen] = useState<boolean>(false);

  const handleVFCQuestion = (question: string) => {
    const newData = {
      owner: Cookies.get("email"),
      docstatus: 0,
      idx: 1,
      question: question,
      description: "",
      response: 1,
      parent: params.id,
      parentfield: "vfc_eligible_table",
      parenttype: "Immunization Service",
      doctype: "VFC Eligibility Question Response Table",
    };
    setVFCEligibleTableData([newData]);
    if (
      [
        "CHDP_eligible",
        "Is_uninsured",
        "American_Indian_or_Alaskan_Native",
      ].includes(question)
    ) {
      setValue("vfc_status", "Qualified");
    } else {
      setValue("vfc_status", "Not Qualified");
    }
  };
  return (
    <div className="mt-5  bg-[#F6F9FD] px-4 py-4 mx-1 border border-[#E0E0E0]">
      <h5 className="mb-1  px-4 font-semibold text-[#474747] xl:text-2xl sm:text-xl text-lg">
        Vaccine Details
      </h5>
      <Separator className="my-3" />
      <div className="grid md:grid-cols-2 gap-6  m-4 ">
        <div className="grid  w-full  items-center gap-1.5">
          <Label className="text-[#616161] xl:text-sm text-xs">
            Form Completed By
          </Label>
          <Input
            type="text"
            placeholder=""
            disabled
            defaultValue={getAPIDataDocs.form_completed_by}
            className="xl:text-sm text-xs"
          />
        </div>
        <div className="grid  w-full  items-center gap-1.5">
          <Label className="text-[#616161] xl:text-sm text-xs">
            Form Reviewed By
          </Label>
          <ComboboxDropDown
            doctype="Healthcare Practitioner"
            dataValue={
              getAPIDataLinkTitles[
                "Healthcare Practitioner::" + getAPIDataDocs.form_reviewed_by
              ]
            }
            label="form_reviewed_by"
            handleInputChange={handleInputChangeComboBox}
            referenceDoctype="Immunization Service"
            displayValue="label"
            placeholder="select HealthCare Practitioner"
          />
        </div>
        <div className="grid  w-full  items-center gap-1.5">
          <Label className="text-[#616161] xl:text-sm text-xs">
            Completion Date
          </Label>
          <Input
            type="date"
            placeholder=""
            defaultValue={getAPIDataDocs.completion_date}
            className="xl:text-sm text-xs"
            {...register("completion_date")}
          />
        </div>
        <div className="grid  w-full  items-center gap-1.5">
          <Label className="text-[#616161] xl:text-sm text-xs">
            Reviewed Date
          </Label>
          <Input
            type="date"
            placeholder=""
            defaultValue={getAPIDataDocs.reviewed_date}
            className="xl:text-sm text-xs"
            {...register("reviewed_date")}
          />
        </div>
      </div>
      <Separator className="my-3" />
      <div className="m-4 space-y-3 ">
        <div className="text-[#66BB6A]  bg-[#EAFFE0] text-base border border-[#66BB6A] w-fit p-2 rounded-xl font-semibold ">
          VFC Eligibility Screening
        </div>
        <div className="space-x-1 flex gap-1 pt-2">
          <Checkbox
            checked={checkboxGetValueNumber(getVFCCheck)}
            onCheckedChange={(check) =>
              checkboxSetValueNumber(check, setVFCCheck)
            }
          />
          <Label className="text-[#303348] text-sm">
            Let’s check if{" "}
            {getAPIDataLinkTitles["Patient::" + getAPIDataDocs.patient_name]} is
            eligible for VFC.
          </Label>
        </div>
        {getVFCCheck === 1 && (
          <div className="bg-[#FFFFFF] border border-[#DFD6DD] px-5 py-3 shadow-md">
            <Label className="text-[#303348] font-semibold text-[0.90rem]">
              Choose one of the following (If child meets two or more of the
              eligibility qualifications, choose the first one that applies):
            </Label>
            <div>
              <RadioGroup>
                {getVFCTemplate.map((item: any) => {
                  return (
                    <div className="space-x-1 flex gap-1 items-center">
                      <RadioGroupItem
                        value={item.question}
                        onClick={() => handleVFCQuestion(item.question)}
                        checked={
                          getVFCEligibleTableData.length > 0
                            ? item.question ===
                              getVFCEligibleTableData[0].question
                            : false
                        }
                      />

                      <div
                        className="text-[#303348] text-sm font-medium"
                        dangerouslySetInnerHTML={{
                          __html: item.description,
                        }}
                      ></div>
                    </div>
                  );
                })}
              </RadioGroup>
            </div>
            <div className="grid md:grid-cols-2 gap-6  m-4 ">
              <div className="grid  w-full  items-center gap-1.5">
                <Label className="text-[#303348] xl:text-sm text-xs font-medium">
                  VFC Status
                </Label>
                <Input
                  type="text"
                  disabled
                  placeholder=""
                  defaultValue={getAPIDataDocs.vfc_status}
                  className="xl:text-sm text-xs border border-[#DDDDDD]"
                  {...register("vfc_status")}
                />
              </div>
              <div className="grid  w-full  items-center gap-1.5">
                <Label className="text-[#303348] xl:text-sm text-xs font-medium">
                  VFC Screening Date
                </Label>
                <Input
                  type="date"
                  disabled
                  placeholder=""
                  defaultValue={getAPIDataDocs.vfc_screening_date}
                  className=" xl:text-sm text-xs border border-[#DDDDDD]"
                />
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="m-4">
        <DataTable
          columns={VaccineDetailsImmunization}
          data={getVaccineDetailsData}
          onOpen={onOpen}
          setData={setVaccineDetailsData}
          label="Vaccine"
          title="Vaccine Details"
          tableViewFieldState={tableViewFieldState}
          addable
          setTableViewFieldState={setTableViewFieldState}
          allFields={VaccineDetailsImmunizationField}
          doctype="Immunization Service"
          userSettingLabel="Vaccine Details"
        />
      </div>
      <CustomDrawer
        title="Add Vaccine Details"
        open={open}
        setOpen={onOpen}
        classNameDrawer=" rounded-l-xl"
        contentChilder={
          <div className="m-4 overflow-auto h-[65vh]">
            <AddVaccinationDetails
              setVaccineDetailsData={setVaccineDetailsData}
              onOpen={onOpen}
              params={params}
            />
          </div>
        }
      />
    </div>
  );
};

const BillingInfo = ({ billingInfoProps }: any) => {
  const { getPatientAppointmentAPIData, setPatientAppointmentAPIData } =
    billingInfoProps;
  const { params } = useContext(ImmunizationContext);
  const [editOpen, onEditOpen] = useState<boolean>(false);
  const { tableViewFieldState, setTableViewFieldState } =
    useContext(ImmunizationContext);
  const [editDataIndex, setEditDataIndex] = useState<number>();

  return (
    <div className="mt-5  bg-[#F6F9FD] px-4 py-4 mx-1 border border-[#E0E0E0]">
      <h5 className="mb-1  px-4 font-semibold text-[#474747] xl:text-2xl sm:text-xl text-lg">
        Biiling Info
      </h5>
      <Separator className="my-3" />
      <div>
        <div className="m-4">
          <DataTable
            columns={BillingInfoImmunization}
            data={getPatientAppointmentAPIData}
            onEditOpen={onEditOpen}
            setData={setPatientAppointmentAPIData}
            label="Billing Code"
            tableViewFieldState={tableViewFieldState}
            setTableViewFieldState={setTableViewFieldState}
            allFields={BillingInfoImmunizationField}
            doctype="Immunization Service"
            userSettingLabel="Billing Code"
            editable
            setEditDataIndex={setEditDataIndex}
          />
        </div>
        <CustomDrawer
          open={editOpen}
          title="Billing Information"
          setOpen={onEditOpen}
          classNameDrawer=" rounded-l-xl"
          contentChilder={
            <div className="m-4">
              <AddBillingInformation
                getAppointmentAPIData={getPatientAppointmentAPIData}
                editDataIndex={editDataIndex}
                setPatientAppointmentAPIData={setPatientAppointmentAPIData}
                params={params}
                onEditOpen={onEditOpen}
              />
            </div>
          }
        />
      </div>
    </div>
  );
};

const AddBillingInformation = ({
  setPatientAppointmentAPIData,
  getAppointmentAPIData,
  editDataIndex,
  onEditOpen,
  params,
}: any) => {
  const { setReloadData, tableViewFieldState, setTableViewFieldState } =
    useContext(ImmunizationContext);
  const { register, getValues, setValue, reset } = useForm();
  const [getMedicalCodeData, setMedicalCodeData] = useState<any>([]);
  const [getPaymentTypeOptions, setPaymentTypeOptions] = useState<any>([]);
  const [currentIndexData, setCurrentIndexData] = useState<any>();
  const [comboBoxKeyValues, setComboBoxKeyValues] = useState<any>();
  const [getAPIData, setAPIData] = useState<any>();
  const [openBillingCode, setOpenBillingCode] = useState<boolean>(false);
  const handleInputChangeComboBox = async (value: string, label: string) => {
    setComboBoxKeyValues((prev: any) => ({ ...prev, [label]: value }));

    if (label === "code_value") {
      console.log("ina  code value")
      const respCodeValue = await validatedLink(
        "Code Value",
        value,
        `["code_system","custom_is_vfc_billing","code_value","display","definition"]`
      );
        setValue("definition", respCodeValue.definition);

        // setValue("definition",respCodeValue.data.message?.definition)
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const CLIENT_GET_URL = BASE_URL + API.CLIENT_GET;
      const responseClientGet = await axiosPOSTAPI(CLIENT_GET_URL, {
        doctype: "Appointment Type",
        name: currentIndexData.appointment_type,
      });
      console.log("Available response client get ", responseClientGet);
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
        setMedicalCodeData(
          responseClientGet.data?.message?.custom_medical_codes
        );
        setAPIData(responseClientGet.data?.message);
      }
    };
    if (currentIndexData) {
      fetchData();
      setComboBoxKeyValues((prev: any) => ({
        ...prev,
        custom_payment_type: currentIndexData.custom_payment_type,
        custom_billing_status: currentIndexData.custom_billing_status,
      }));
      reset(currentIndexData);
    }
  }, [currentIndexData]);

  useEffect(() => {}, [getPaymentTypeOptions]);
  useEffect(() => {
    setCurrentIndexData(getAppointmentAPIData[editDataIndex]);
  }, [editDataIndex]);

  const finalSave = async () => {
    const newData = {
      appointment: currentIndexData.name,
      payment_type: comboBoxKeyValues?.custom_payment_type,
      status: comboBoxKeyValues?.custom_billing_status,
      custom_medicare_id_number: getValues("custom_medicare_id_number"),
      custom_medi_cal_id_number: getValues("custom_medi_cal_id_number"),
      primary_carrier: getValues("custom_primary_carrier"),
      is_primary_holder: getValues(
        "custom_is_the_patient_the_primary_policy_holder"
      ),
      first_name: getValues("custom_primary_holder_first_name"),
      middle_name: getValues("custom_primary_holder_middle_name"),
      last_name: getValues("custom_primary_holder_last_name"),
      dob: getValues("custom_primary_holder_dob1"),
      medical_record_number: getValues("custom_medical_record_number_required"),
      group_number: getValues("custom_group_number"),
    };
    const response = await axiosPOSTAPI(
      BASE_URL + API.IMMUNIZATION_BILLING_SAVE,
      newData
    );
    const resUpdateMedicalCode = await axiosPOSTAPI(BASE_URL + API.SAVE_DOCS, {
      doc: JSON.stringify({
        ...getAPIData,
        custom_medical_codes: getMedicalCodeData,
      }),
      action: "Save",
    });
    if (response.status === 200 && resUpdateMedicalCode.status === 200) {
      setReloadData((prev: boolean) => !prev);
      onEditOpen(false);
    }
  };

  const addBillingCode = () => {
    setMedicalCodeData((prev: any) => [
      ...prev,
      {
        definition: getValues("definition"),
        code_value: comboBoxKeyValues.code_value,
      },
    ]);
    setValue("definition", "");
    setOpenBillingCode(false);
  };
  return (
    <div className="flex flex-col h-full space-y-4">
      <div className="space-y-2 bg-[#F6F9FD] border border-[#E0E0E0] p-3 rounded-xl flex flex-col h-full">
        <Label className="text-[#303348] font-semibold text-lg align-middle">
          Add Billing Information
        </Label>
        <Separator className="my-3" />
        <div className="flex-grow overflow-auto h-[calc(100vh-15rem)]">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="grid w-full items-center gap-1.5">
              <Label className="text-[#303348] xl:text-sm text-xs font-medium">
                Appointment Type
              </Label>
              <ComboboxDropDown
                staticValue={getPaymentTypeOptions}
                label="vaccine"
                disabled
                dataValue={currentIndexData?.appointment_type}
                placeholder="Select Vaccine"
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label className="text-[#303348] xl:text-sm text-xs font-medium">
                Billing Status
              </Label>
              {[
                "Medicare Billing",
                "Medi-Cal Billing",
                "Private Insurance Billing",
                "VFC Billing",
              ].includes(comboBoxKeyValues?.custom_payment_type) ? (
                <ComboboxDropDown
                  staticValue={BillingStatusInsuredField}
                  dataValue={comboBoxKeyValues?.custom_billing_status}
                  label="custom_billing_status"
                  placeholder="Select Status"
                  handleInputChange={handleInputChangeComboBox}
                />
              ) : (
                <ComboboxDropDown
                  staticValue={BillingStatusCashField}
                  dataValue={comboBoxKeyValues?.custom_billing_status}
                  label="custom_billing_status"
                  handleInputChange={handleInputChangeComboBox}
                  placeholder="Select Status"
                />
              )}
            </div>
          </div>
          <div className="m-4">
            <PaymentTypeComponent
              register={register}
              setValue={setValue}
              getValues={getValues}
              handleInputChangeComboBox={handleInputChangeComboBox}
              comboBoxKeyValues={comboBoxKeyValues}
              getPaymentTypeOptions={getPaymentTypeOptions}
              fieldLabel={{
                payment_type: "custom_payment_type",
                primary_policy_holder:
                  "custom_is_the_patient_the_primary_policy_holder",
                primary_carrier: "custom_primary_carrier",
                medical_record_number: "custom_medical_record_number_required",
                group_number: "custom_group_number",
                primary_holder_first_name: "custom_primary_holder_first_name",
                primary_holder_middle_name: "custom_primary_holder_middle_name",
                primary_holder_last_name: "custom_primary_holder_last_name",
                primary_holder_dob: "custom_primary_holder_dob1",
                relationship_to_policy_holder:
                  "custom_relationship_to_policy_holder",
                medicare_id_number: "custom_medicare_id_number",
                medi_cal_id_number: "custom_medi_cal_id_number",
                time_of_payment: "custom_payment_time",
                insurance_type: "insurance_type",
              }}
            />
          </div>
          <div>
            <DataTable
              data={getMedicalCodeData}
              columns={MedicalCodeImmunization}
              allFields={MedicalCodeImmunizationField}
              label={"Medical Code"}
              setData={setMedicalCodeData}
              tableViewFieldState={tableViewFieldState}
              setTableViewFieldState={setTableViewFieldState}
              doctype={"Appointment Type"}
              onOpen={setOpenBillingCode}
              userSettingLabel={"Codification Table"}
              addable
            />
            <CustomDrawer
              open={openBillingCode}
              title="Billing Information"
              setOpen={setOpenBillingCode}
              classNameDrawer="rounded-l-xl h-[70vh] w-[45%] top-[15%]"
              contentChilder={
                <div className="m-4 space-y-3">
                  <div className="space-y-2 bg-[#F6F9FD] border border-[#E0E0E0] p-3 rounded-xl flex w-[85%] flex-col ">
                    <Label className="text-[#303348] font-semibold text-lg align-middle">
                      Add Billing Information
                    </Label>
                    <div className="grid gap-4 w-full h-full">
                      <div className="grid w-full items-center gap-1.5">
                        <Label className="text-[#303348] xl:text-sm text-xs font-medium">
                          Code Value
                        </Label>
                        <ComboboxDropDown
                          label="code_value"
                          placeholder="Select Code Value"
                          doctype="Code Value"
                          referenceDoctype="Codification Table"
                          handleInputChange={handleInputChangeComboBox}
                        />
                      </div>
                      <div className="grid w-full items-center gap-1.5">
                        <Label className="text-[#303348] xl:text-sm text-xs font-medium">
                          Definition
                        </Label>
                        <Textarea
                          className="text-[#303348] xl:text-sm text-xs font-medium resize-none"
                          {...register("definition")}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 w-[85%] ">
                    <Button
                      className="text-white bg-[#47BDFF] hover:bg-[#3EA4DE] rounded-xl"
                      onClick={() => addBillingCode()}
                    >
                      Save
                    </Button>
                  </div>
                </div>
              }
            />
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <Button
          className="text-white bg-[#47BDFF] hover:bg-[#3EA4DE] rounded-xl"
          onClick={() => finalSave()}
        >
          Save
        </Button>
      </div>
    </div>
  );
};
const AddVaccinationDetails = ({
  setVaccineDetailsData,
  onOpen,
  params,
}: any) => {
  const { getValues, setValue, register, reset } = useForm();

  const addNewVaccineDetails = () => {
    const newData = {
      owner: Cookies.get("email"),
      docstatus: 0,
      vaccine: comboBoxKeyValues.vaccine,
      vis_given: getValues("vis_given"),
      arm: comboBoxKeyValues.arm,
      dosage: comboBoxKeyValues.dosage,
      vis_exp: getValues("vis_exp"),
      vaccine_given: getValues("vaccine_given"),
      site: comboBoxKeyValues.site,
      parent: params.i,
      parentfield: "vaccine_details",
      parenttype: "Immunization Service",
      doctype: "Vaccine Details",
    };
    setVaccineDetailsData((prev: any) => [...prev, newData]);
    onOpen(false);
  };

  const [comboBoxKeyValues, setComboBoxKeyValues] = useState<any>({});
  const [dosageVaccineValue, setDosageVaccineValue] = useState<any>();
  useEffect(() => {
    console.log("comboBoxKeyValues", comboBoxKeyValues);
  }, [comboBoxKeyValues]);
  const handleInputChange = async (value: string, label: string) => {
    setComboBoxKeyValues((prev: any) => ({ ...prev, [label]: value }));

    if (label === "vaccine") {
      const respValidateLink = await validatedLink(
        "Medication",
        value,
        `["default_prescription_dosage"]`
      );
      if (respValidateLink) {
        setDosageVaccineValue(respValidateLink.default_prescription_dosage);
      }
      const respGetLot = await axiosPOSTAPI(
        BASE_URL + API.VACCINE_DETAILS_GET_LOT,
        {
          vaccine: value,
        }
      );
      if (respGetLot.status === 200) {
        setValue("exp", respGetLot.data.message?.expiration_date);
        setValue("lot", respGetLot.data.message?.lot_no);
        setValue("manufacturer", respGetLot.data.message?.manufacturer);
        setValue("vis_exp", respGetLot.data.message?.vis_date);
      }
    }
  };
  return (
    <div className="space-y-2 overflow-auto">
      <div className="bg-[#F6F9FD] border border-[#E0E0E0] p-3 rounded-xl">
        <Label className={`text-[#303348] font-semibold text-lg align-middle`}>
          Add Vaccine Details
        </Label>
        <Separator className="my-3" />
        <div className="grid md:grid-cols-2 gap-4 overflow-auto">
          <div className="grid  w-full  items-center gap-1.5">
            <Label className="text-[#303348] xl:text-sm text-xs font-medium">
              Vaccine
            </Label>
            <ComboboxDropDown
              doctype="Medication"
              doctypeFilter={`{"custom_is_vaccine":1}`}
              referenceDoctype="Vaccine Details"
              handleInputChange={handleInputChange}
              label="vaccine"
              placeholder="Select Vaccine"
            />
          </div>
          <div className="grid  w-full  items-center gap-1.5">
            <Label className="text-[#303348] xl:text-sm text-xs font-medium">
              VIS Date <span className="text-[#ED9192]">*</span>
            </Label>
            <Input
              type="date"
              placeholder=""
              {...register("vis_exp")}
              className="xl:text-sm text-xs border border-[#DDDDDD]"
            />
          </div>
          <div className="grid  w-full  items-center gap-1.5">
            <Label className="text-[#303348] xl:text-sm text-xs font-medium">
              VIS Given
            </Label>
            <Input
              type="date"
              placeholder=""
              {...register("vis_given")}
              className="xl:text-sm text-xs border border-[#DDDDDD]"
              onClick={() => console.log("wroking")}
            />
          </div>
          <div className="grid  w-full  items-center gap-1.5">
            <Label className="text-[#303348] xl:text-sm text-xs font-medium">
              Vaccine Given <span className="text-[#ED9192]">*</span>
            </Label>
            <Input
              type="date"
              placeholder=""
              {...register("vaccine_given")}
              className="xl:text-sm text-xs border border-[#DDDDDD]"
            />
          </div>
          <div className="grid  w-full  items-center gap-1.5">
            <Label className="text-[#303348] xl:text-sm text-xs font-medium">
              Manufacture
            </Label>
            <ComboboxDropDown
              doctype="Manufacturer"
              referenceDoctype="Vaccine Details"
              placeholder="Select Manufacturer"
              handleInputChange={handleInputChange}
              label="manufacturer"
            />
          </div>
          <div className="grid  w-full  items-center gap-1.5">
            <Label className="text-[#303348] xl:text-sm text-xs font-medium">
              Lot#
            </Label>
            <ComboboxDropDown
              doctype="Lot Number"
              referenceDoctype="Vaccine Details"
              handleInputChange={handleInputChange}
              label="manufacturer"
              placeholder="Select Lot"
            />
          </div>
          <div className="grid  w-full  items-center gap-1.5">
            <Label className="text-[#303348] xl:text-sm text-xs font-medium">
              Expiration Date
            </Label>
            <Input
              type="date"
              placeholder=""
              {...register("exp")}
              className="xl:text-sm text-xs border border-[#DDDDDD]"
            />
          </div>
          <div className="grid  w-full  items-center gap-1.5">
            <Label className="text-[#303348] xl:text-sm text-xs font-medium">
              Site
            </Label>
            <ComboboxDropDown
              staticValue={ImmunizationSiteField}
              handleInputChange={handleInputChange}
              placeholder="Select Site"
              label="site"
            />
          </div>
          <div className="grid  w-full  items-center gap-1.5">
            <Label className="text-[#303348] xl:text-sm text-xs font-medium">
              ARM
            </Label>
            <ComboboxDropDown
              staticValue={ImmunizationARMField}
              handleInputChange={handleInputChange}
              label="manufacturer"
              placeholder="Select ARM"
            />
          </div>
          <div className="grid  w-full  items-center gap-1.5">
            <Label className="text-[#303348] xl:text-sm text-xs font-medium">
              RPH
            </Label>
            <Input
              type="text"
              placeholder=""
              {...register("rph")}
              className="xl:text-sm text-xs border border-[#DDDDDD]"
            />
          </div>
          <div className="grid  w-full  items-center gap-1.5">
            <Label className="text-[#303348] xl:text-sm text-xs font-medium">
              Dosage
            </Label>
            {
              <ComboboxDropDown
                doctype="Prescription Dosage"
                referenceDoctype="Vaccine Details"
                placeholder="Select Dosage"
                handleInputChange={handleInputChange}
                label="dosage"
                dataValue={dosageVaccineValue}
              />
            }
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <Button
          className="text-white bg-[#47BDFF] hover:bg-[#3EA4DE] rounded-xl"
          onClick={() => addNewVaccineDetails()}
        >
          Save
        </Button>
      </div>
    </div>
  );
};
const EditImmunization = () => {
  const params = useParams();
  const [selectedStepper, setSelectedStepper] = useState("patientInfo");
  const [selectOptionOnData, setSelectOptionOnData] = useState<any>([]);
  const [openAddPatient, setOnOpenPatient] = useState<boolean>(false);

  const {
    register,
    getValues,
    setValue,
    formState: { errors },
    trigger,
    control,
  } = useForm();
  const [selectGender, setSelectGender] = useState<string>("");
  const [getRequestBody, setRequestBody] = useState<any>();
  const [getAddressData, setAddressData] = useState<any>();
  const [getAppointmentTypeData, setAppointmentTypeData] = useState<any[]>([]);
  const handleInputChangeComboBox = (value: string, label: string) => {
    setComboBoxKeyValues((prev: any) => {
      return { ...prev, [label]: value };
    });
    if (label === "patient_name") {
      onChangePatientFieldHandler(value);
    }
    if (label === "custom_select_appointment_type") {
      setAppointmentTypeData((prev: any) => {
        return [
          ...prev,
          {
            docstatus: 0,
            doctype: "Select Appointment",
            __islocal: 1,
            __unsaved: 1,
            owner: Cookies.get("email"),
            parent: params.id,
            parentfield: "custom_select_appointment_type",
            parenttype: "Immunization Service",
            appointment_type: value,
          },
        ];
      });
    }
  };
  const { setDocTypeStatus } = useContext<any>(LayoutContext);
  const [comboBoxKeyValues, setComboBoxKeyValues] = useState<any>({});

  //---------------------------------
  //set API data
  const [getAPIDataDocs, setAPIDataDocs] = useState<any>({});
  const [getAPIDataDocsInfo, setAPIDataDocsInfo] = useState<any>({});
  const [getAPIDataLinkTitles, setAPIDataLinkTitles] = useState<any>({});
  const [loadData, setLoadData] = useState<boolean>(false);
  const [reloadData, setReloadData] = useState<boolean>(false);

  const [selectPatientApiData, setPatientAPIData] = useState<any>();
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [tags, setTags] = useState<string[]>([]);
  const [selectActivity, setActivity] = useState<CommentData[]>([]);
  const [steps, setSteps] = useState<{ key: string; label: string }[]>([]);
  const [nextWorkFlowState, setNextWorkFlowState] = useState<string>("");

  const [getPatientAppointmentAPIData, setPatientAppointmentAPIData] =
    useState<any>();
  const [getQuestionnaireAPIData, setQuestionnaireAPIData] = useState<any>();
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles: any) => {
      setUploadedFiles(acceptedFiles);
      // Call your backend API endpoint to upload files
    },
  });
  //schedling Props
  const [getAppointmentScheduling, setAppointmentScheduling] = useState<any>(
    []
  );
  //questionnaire useStates
  const [questionnaireData, setQuestionnaireData] = useState<any>([]);
  const router = useNavigate();

  //Vaccine Details useStates
  const [getVFCCheck, setVFCCheck] = useState<number>(0);
  const [getVFCTemplate, setVFCTemplate] = useState<any>([]);
  const [getVFCEligibleTableData, setVFCEligibleTableData] = useState<any>([]);
  const [getVaccineDetailsData, setVaccineDetailsData] = useState<any>([]);

  //set fieldviewstate from API
  const [tableViewFieldState, setTableViewFieldState] = useState<any>();

  const finalSubmit = async () => {
    const createCMR = async () => {
      const URL = BASE_URL + API.SAVE_DOCS;

      const reqBody = {
        ...getRequestBody,
        ...comboBoxKeyValues,
        custom_select_appointment_type: getAppointmentTypeData,
        doctype: "Immunization Service",
        custom_is_walkin: 1,
      };
      try {
        const response = await axiosPOSTAPI(URL, {
          doc: JSON.stringify(reqBody),
          action: "Save",
        });
        if (response.status !== 200) {
          console.log("Immunization not Create");
        }
        const reqBodyForAppointment = response.data.docs[0];
        const respAppointment = await axiosPOSTAPI(
          BASE_URL + API.CREATE_APPOINTMENT,
          { doc: JSON.stringify(reqBodyForAppointment) }
        );
        if (respAppointment.status === 200) {
          const respGetTransition = await axiosPOSTAPI(
            BASE_URL + API.GET_WORKFLOW,
            { doc: JSON.stringify(reqBodyForAppointment) }
          );

          if (
            respGetTransition.status === 200 &&
            respGetTransition.data.message[0].action
          ) {
            await axiosPOSTAPI(BASE_URL + API.ADD_MINOR_TAG, {
              patient: response.data?.docs[0]?.patient_name,
              doc: response.data?.docs[0]?.name,
            });
            const respApplyWorkFlow = await axiosPOSTAPI(
              BASE_URL + API.APPLY_WORKFLOW,
              {
                doc: JSON.stringify(reqBodyForAppointment),
                action: respGetTransition.data.message[0].action,
              }
            );
            if (respApplyWorkFlow.status === 200) {
              toast.success("Immunization Created Successfully");
              router("/immunization-service/" + response.data?.docs[0]?.name);
            } else {
              toast.error("Immunization not Created Successfully");
            }
          } else {
            toast.error("Immunization not Created Successfully");
          }
        } else {
          toast.error("Immunization not Created Successfully");
        }
      } catch (err: any) {
        console.log("not created ");
      }
    };
    const isValid = await trigger();
    if (isValid) {
      if (comboBoxKeyValues.patient_name) {
        await createCMR();
      }
    }
  };

  //save docs from here
  const finalSave = async () => {
    const isValid = await trigger();
    if (isValid) {
      try {
        const URL = BASE_URL + API.SAVE_DOCS;
        const reqBody = {
          ...getAPIDataDocs,
          ...getValues(),
          docstatus: getAPIDataDocs.docstatus,
          doctype: getAPIDataDocs.doctype,
          name: params.id,
          __unsaved: 1,
          owner: Cookies.get("email"),
          naming_series: getAPIDataDocs.naming_series,
          custom_select_appointment_type: getAppointmentTypeData,
          gender:
            selectGender !== undefined ? selectGender : getAPIDataDocs.gender,
          questions_store:
            questionnaireData !== undefined
              ? questionnaireData
              : getAPIDataDocs.questions_store,
          check_vfc_eligibility:
            getVFCCheck !== undefined
              ? getVFCCheck
              : getAPIDataDocs.check_vfc_eligibility,

          vfc_eligible_table:
            getVFCEligibleTableData !== undefined
              ? getVFCEligibleTableData
              : getAPIDataDocs.vfc_eligible_table,
          vaccine_details:
            getVaccineDetailsData !== undefined
              ? getVaccineDetailsData
              : getAPIDataDocs.vaccine_details,
          workflow_progress: getAPIDataDocs.workflow_progress,
          payment_type: getAPIDataDocs.payment_type,
          billing_status: getAPIDataDocs.billing_status,
          billing_code: getAPIDataDocs.billing_code,
          workflow_state: getAPIDataDocs.workflow_state,
          patient_full_name: getAPIDataDocs.patient_full_name,
          mobile__primary_phone:
            getValues("mobile__primary_phone") !== undefined
              ? getValues("mobile__primary_phone")
              : getAPIDataDocs.mobile__primary_phone,
          pcp_name:
            getValues("mobile__primary_phone") !== undefined
              ? getValues("mobile__primary_phone")
              : getAPIDataDocs.mobile__primary_phone,
          pcp_phone_number:
            getValues("mobile__primary_phone") !== undefined
              ? getValues("mobile__primary_phone")
              : getAPIDataDocs.mobile__primary_phone,
          form_completed_by: getAPIDataDocs.form_completed_by,
          patient_name: getAPIDataDocs.patient_name,
          custom_is_walkin: getAPIDataDocs.custom_is_walkin,
          total_service_durationin_minutes:
            getAPIDataDocs.total_service_durationin_minutes,
          patient_address: getAPIDataDocs.patient_address,
          address_html: getAPIDataDocs.address_html,
          parentguardian_first_name: getAPIDataDocs.parentguardian_first_name,
          parentguardian_last_name: getAPIDataDocs.parentguardian_last_name,
          dob:
            getValues("dob") !== undefined
              ? getValues("dob")
              : getAPIDataDocs.dob,
          vfc_status:
            getValues("vfc_status") !== undefined
              ? getValues("vfc_status")
              : getAPIDataDocs.vfc_status,

          ...comboBoxKeyValues,
        };
        const response = await axiosPOSTAPI(URL, {
          doc: JSON.stringify(reqBody),
          action: "Save",
        });
        if (response.status === 200) {
          toast.success("Document Saved Successfully");
        }
        setReloadData((prev: boolean) => !prev);
        return response;
      } catch (error: any) {
        toast.error("Document not Saved Successfully");
      }
    }
  };

  const updateWorkUpdate = async () => {
    const response = await finalSave();
    if (response.status === 200) {
      const respGetTransition = await axiosPOSTAPI(
        BASE_URL + API.GET_WORKFLOW,
        { doc: JSON.stringify(response.data.docs[0]) }
      );

      if (
        respGetTransition.status === 200 &&
        respGetTransition.data.message[0].action
      ) {
        await axiosPOSTAPI(BASE_URL + API.ADD_MINOR_TAG, {
          patient: response.data?.docs[0]?.patient_name,
          doc: response.data?.docs[0]?.name,
        });
        const respApplyWorkFlow = await axiosPOSTAPI(
          BASE_URL + API.APPLY_WORKFLOW,
          {
            doc: JSON.stringify(response.data.docs[0]),
            action: respGetTransition.data.message[0].action,
          }
        );
        if (respApplyWorkFlow.status === 200) {
          toast.success("Immunization WorkFlow Updated");
          setReloadData((prev: boolean) => !prev);
        } else {
          toast.error("Immunization WorkFlow not Updated");
        }
      } else {
        toast.error("Immunization WorkFlow not Updated");
      }
    } else {
      toast.error("Immunization WorkFlow not Updated");
    }
  };
  const onChangePatientFieldHandler = async (patientName: string) => {
    const patientPersonalInfoFields = await validatedLink(
      "Patient",
      patientName,
      `["patient_name","dob","mobile","custom_parentguardian_first_name","custom_parentguardian_last_name","sex","custom_ethnicity","custom_race","custom_pcp_name","custom_pcp_phone","patient_name"]`
    );

    const reqBody = {
      docstatus: 0,
      doctype: "Immunization Service",
      name: params.id,
      __unsaved: 1,
      owner: Cookies.get("email"),
      naming_series: getAPIDataDocs.naming_series,
      custom_select_appointment_type: getAppointmentTypeData,
      gender: patientPersonalInfoFields["sex"],
      ethnicity: patientPersonalInfoFields["custom_ethnicity"],
      race: patientPersonalInfoFields["custom_race"],
      questions_store:
        questionnaireData !== undefined
          ? questionnaireData
          : getAPIDataDocs.questions_store,
      check_vfc_eligibility:
        getVFCCheck !== undefined
          ? getVFCCheck
          : getAPIDataDocs.check_vfc_eligibility,

      vfc_eligible_table:
        getVFCEligibleTableData !== undefined
          ? getVFCEligibleTableData
          : getAPIDataDocs.vfc_eligible_table,
      vfc_status:
        getValues("vfc_status") !== undefined
          ? getValues("vfc_status")
          : getAPIDataDocs.vfc_status,
      vaccine_details:
        getVaccineDetailsData !== undefined
          ? getVaccineDetailsData
          : getAPIDataDocs.vaccine_details,
      workflow_progress: getAPIDataDocs.workflow_progress,
      payment_type: getAPIDataDocs.payment_type,
      billing_status: getAPIDataDocs.billing_status,
      billing_code: getAPIDataDocs.billing_code,
      workflow_state: getAPIDataDocs.workflow_state,
      patient_full_name: patientPersonalInfoFields["patient_name"],
      mobile__primary_phone: patientPersonalInfoFields["mobile"],
      pcp_name: patientPersonalInfoFields["custom_pcp_name"],
      pcp_phone_number: patientPersonalInfoFields["custom_pcp_phone"],
      form_completed_by: patientPersonalInfoFields["patient_name"],
      patient_name: patientName,
      custom_is_walkin: getAPIDataDocs.custom_is_walkin,
      total_service_durationin_minutes:
        getAPIDataDocs.total_service_durationin_minutes,
      patient_address: getAPIDataDocs.patient_address,
      address_html: getAPIDataDocs.address_html,
      parentguardian_first_name: getAPIDataDocs.parentguardian_first_name,
      parentguardian_last_name: getAPIDataDocs.parentguardian_last_name,
      dob: patientPersonalInfoFields["dob"],
    };

    const docMethodResponse = await getDocMethod(
      reqBody,
      "get_patient_address"
    );
    if (docMethodResponse.status === 200) {
      const addressFieldName = docMethodResponse.data.message.address;
      const GET_ADDRESS_URL = BASE_URL + API.GET_ADDRESS_DISPLAY;
      if (addressFieldName) {
        const getAddressResponse = await axiosPOSTAPI(GET_ADDRESS_URL, {
          address_dict: addressFieldName,
        });
        if (getAddressResponse.status === 200) {
          setAddressData(getAddressResponse.data.message);
          setAPIDataDocs({
            ...reqBody,
            address_html: getAddressResponse.data.message,
            patient_address: addressFieldName,
          });
        } else {
          setAPIDataDocs(reqBody);
        }
      } else {
        setAPIDataDocs(reqBody);
      }
    } else {
      setAPIDataDocs(reqBody);
    }
    //here set the values after getting response
    setValue("mobile__primary_phone", patientPersonalInfoFields.mobile);
    setValue("pcp_name", patientPersonalInfoFields.custom_pcp_name);
    setValue("dob", patientPersonalInfoFields.dob);
    setSelectGender(patientPersonalInfoFields.sex);
    setValue("pcp_phone_number", patientPersonalInfoFields.custom_pcp_phone);
    setComboBoxKeyValues((prev: any) => {
      return {
        ...prev,
        race: patientPersonalInfoFields.custom_race,
        ethnicity: patientPersonalInfoFields.custom_ethnicity,
      };
    });
  };
  const UploadAttachment = (params: any) => {
    const uploadFile = async () => {
      const URL = BASE_URL + API.ATTACHMENT;
      const response = await axiosPOSTAPI(
        URL,
        {
          file: uploadedFiles[0],
          // file: getValues("attachment_upload.file")[0],
          is_private: 1,
          folder: "Home/Attachments",
          doctype: "CMR Service",
          docname: params.id,
        },
        {
          headers: {
            Authorization: Cookies.get("Authorization"),
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        setUploadedFiles([]);
        setReloadData((prev: boolean) => !prev);
      }
    };
    uploadFile();
  };

  //for deleting attachment
  const DeleteAttachment = (name: string) => {
    const DeleteFile = async () => {
      const URL = BASE_URL + API.DELETE_ATTACHMENT;
      const response = await axiosPOSTAPI(
        URL,
        { fid: name, is_private: 1, dt: "CMR Service", dn: params.id },
        {
          headers: {
            Authorization: Cookies.get("Authorization"),
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        setReloadData((prev: boolean) => !prev);
      }
    };
    DeleteFile();
  };

  //tags functions

  //add tag
  const AddTags = (tag: string) => {
    const AddTagAsync = async () => {
      const URL = BASE_URL + API.ADD_TAG;
      await axiosPOSTAPI(
        URL,
        { tag: tag, dt: "Immunization Service", dn: params.id },
        {
          headers: {
            Authorization: Cookies.get("Authorization"),
            "Content-Type": "multipart/form-data",
          },
        }
      );
    };
    AddTagAsync();
  };

  //delete tag

  const DeleteTags = (tag: string) => {
    const DeleteTagsAsync = async () => {
      const URL = BASE_URL + API.REMOVE_TAG;
      const response = await axiosPOSTAPI(
        URL,
        { tag: tag, dt: "Immunization Service", dn: params.id },
        {
          headers: {
            Authorization: Cookies.get("Authorization"),
            "Content-Type": "multipart/form-data",
          },
        }
      );
    };
    DeleteTagsAsync();
  };

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
      const URL = BASE_URL + API.VIEW_DOCTYPE;
      const response = await axiosPOSTAPI(URL, {
        doctype: "Immunization Service",
        name: params.id,
      });
      if (response.status === 200) {
        const responseGETDocData = await axiosPOSTAPI(
          BASE_URL + API.GET_DOCDATA_FOR_SELECT,
          {
            doctype: "Immunization Service",
          }
        );
        if (responseGETDocData.status === 200) {
          setSelectOptionOnData(responseGETDocData.data.message);
        }
        setAPIDataDocs(response.data.docs[0]);
        setAPIDataDocsInfo(response.data.docinfo);
        setAPIDataLinkTitles(response.data._link_titles);
        setDocTypeStatus({
          page: "immunization-service",
          status: response.data.docs[0].workflow_state,
        });

        setSteps(
          getStepsForWorkflowStateImmunization(
            response.data.docs[0].workflow_state
          )
        );
        setSelectGender(response.data.docs[0].gender);

        setAppointmentTypeData(
          response.data.docs[0].custom_select_appointment_type
        );

        //set APPOINTMENT DATA WITH API
        const respAppointmentScheduling = await axiosPOSTAPI(
          BASE_URL + API.GET_APPOINTMENT_DATA_IMMUNIZATION,
          {
            doctype: response.data.docs[0].doctype,
            docname: response.data.docs[0].name,
          }
        );
        if (respAppointmentScheduling.status === 200) {
          setAppointmentScheduling(
            respAppointmentScheduling.data.message.column
          );
        }
        //set Activity data
        //--------------------------------------
        const creationModifiedLog: CommentData[] = [
          {
            name: "",
            creation: response.data.docs[0]?.creation,
            content: response.data.docs[0]?.owner + " created this",
            owner: response.data.docs[0]?.owner,
            comment_type: "",
          },
          {
            name: "",
            creation: response.data.docs[0]?.modified,
            content: response.data.docs[0]?.modified_by + " Modified this",
            owner: response.data.docs[0]?.modified_by,
            comment_type: "",
          },
        ];

        setActivity(
          [
            ...creationModifiedLog,
            ...response.data?.docinfo?.attachment_logs,
            ...response.data?.docinfo?.workflow_logs,
          ].sort((a, b) => {
            return (
              new Date(b.creation || "").getTime() -
              new Date(a.creation || "").getTime()
            );
          })
        );

        const LOAD_GET_DOCTYPE =
          BASE_URL + API.LOAD_FORM_DOCTYPE + "?doctype=Immunization Service";
        const responseLoadGETDocType = await axiosGETAPI(LOAD_GET_DOCTYPE);
        if (responseLoadGETDocType.status === 200) {
          setTableViewFieldState(
            JSON.parse(responseLoadGETDocType.data.user_settings)
          );
        }

        const currentStepperSteps = getStepsForWorkflowStateImmunization(
          response.data.docs[0].workflow_state
        );

        setSelectedStepper(
          currentStepperSteps[currentStepperSteps.length - 1].key
        );

        const respGetTransition = await axiosPOSTAPI(
          BASE_URL + API.GET_WORKFLOW,
          { doc: JSON.stringify(response.data.docs[0]) }
        );
        if (
          respGetTransition.status === 200 &&
          respGetTransition.data.message[0].next_state
        ) {
          console.log(
            "respGetTransition.data.message[0].",
            respGetTransition.data.message[0].next_state
          );
          setNextWorkFlowState(respGetTransition.data.message[0].next_state);
        }
      }
      if (response.data?.docs[0].patient_name) {
        const patientResponse = await validatedLink(
          "Patient",
          response.data?.docs[0].patient_name,
          '["custom_patient_notes","image","email","sex","status"]'
        );
        setPatientAPIData(patientResponse);
      }
      if (response.data?.docs[0].patient_name) {
        const respGETQuestionnaire = await axiosPOSTAPI(
          BASE_URL + API.GET_QUESTIONNAIR,
          {
            patient: response.data?.docs[0].patient_name,
            service_type: "Immunization Service",
            template: JSON.stringify(
              response.data.docs[0].custom_select_appointment_type
            ),
            walkin: 1,
          }
        );
        if (respGETQuestionnaire.status === 200) {
          setQuestionnaireAPIData(respGETQuestionnaire.data.message);
        }
      }
      const respGETAppointmentData = await axiosPOSTAPI(
        BASE_URL + API.GET_BILLING_FROM_APPOINTMENT,
        { doctype: "Immunization Service", docname: response.data.docs[0].name }
      );
      respGETAppointmentData.status === 200 &&
        respGETAppointmentData.data.message.column &&
        setPatientAppointmentAPIData(
          respGETAppointmentData.data.message.column
        );

      //set questinnaire data
      setQuestionnaireData(response.data.docs[0].questions_store);
      setVaccineDetailsData(response.data.docs[0].vaccine_details);
      const respVFCTemplate = await axiosPOSTAPI(
        BASE_URL + API.VFC_ELIGIBILITY_TEMPLATE,
        { doc_name: response.data.docs[0].name }
      );
      respVFCTemplate.status === 200 &&
        setVFCTemplate(respVFCTemplate.data.message);
      //set Vaccine Details props
      setVFCCheck(response.data.docs[0].check_vfc_eligibility);
      setVFCEligibleTableData(response.data.docs[0].vfc_eligible_table);

      setLoadData(true);
    };
    fetchData();
    return () => {
      setDocTypeStatus(undefined);
    };
  }, [reloadData]);

  return loadData ? (
    <ImmunizationContext.Provider
      value={{
        setReloadData,
        loadData,
        params,
        getAPIDataDocs,
        getAPIDataDocsInfo,
        getAPIDataLinkTitles,
        reloadData,
        register,
        getValues,
        setValue,
        errors,
        handleInputChangeComboBox,
        tableViewFieldState,
        setTableViewFieldState,
      }}
    >
      <div className="px-3 pt-3 max-h-screen overflow-hidden">
        <div className="mb-2">
          <div className="flex justify-between  ">
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
                  {
                    getAPIDataLinkTitles[
                      "Patient::" + getAPIDataDocs.patient_name
                    ]
                  }
                </h3>
                <div className=" items-center">
                  <div className="text-[#898989] flex flex-wrap lg:text-lg text-xs items-center">
                    {getAPIDataDocs.dob && (
                      <div className="inline-block">
                        <span>
                          <span className="text-[#474747]  font-medium">
                            DOB
                          </span>
                          :&nbsp;
                        </span>
                      </div>
                    )}
                    {[
                      getAPIDataDocs.dob,
                      selectPatientApiData.email,
                      getAPIDataDocs.phone,
                      getAPIDataDocs.payment_type,
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
                    {getAPIDataDocs.payment_type &&
                      getAPIDataDocs.payment_type ===
                        paymentTypeMapping.custom_medicare_billing &&
                      getAPIDataDocs.medicare_id_number && (
                        <>
                          <div className="border-2 rounded-full mx-2 w-1 h-1 inline-block border-[#898989]"></div>
                          <div className="inline-block">
                            <span>{getAPIDataDocs.medicare_id_number}</span>
                          </div>
                        </>
                      )}
                    {getAPIDataDocs.payment_type &&
                      getAPIDataDocs.payment_type ===
                        paymentTypeMapping.custom_medical_billing &&
                      getAPIDataDocs.medi_cal_id_number && (
                        <>
                          <div className="border-2 rounded-full mx-2 w-1 h-1 inline-block border-[#898989]"></div>
                          <div className="inline-block">
                            <span>{getAPIDataDocs.medi_cal_id_number}</span>
                          </div>
                        </>
                      )}
                    {getAPIDataDocs.payment_type &&
                      getAPIDataDocs.payment_type ===
                        paymentTypeMapping.custom_private_insurance_billing &&
                      [
                        getAPIDataDocs.primary_carrier,
                        getAPIDataDocs.medical_record_number,
                        getAPIDataDocs.group_number,
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
            <div className="space-x-2 text-nowrap align-middle  sm:flex hidden">
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
                    {getAppointmentScheduling.map((item: any) => {
                      return (
                        <Link to={`/appointments/${item.name}`}>
                          <DropdownMenuItem>
                            <Label className="text-[#616161] xl:text-sm text-xs">
                              {item.appointment_type}
                            </Label>
                          </DropdownMenuItem>
                        </Link>
                      );
                    })}
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="bg-[#F6F9FD] border-[#DDDDDD] text-[#616161] space-x-1"
                  >
                    <Paperclip className="sm:w-4 sm:h-4 w-3 h-3" />{" "}
                    {/* <p className="hidden sm:block">Attachment</p> */}
                    <div className="bg-[#47BDFF] px-2 py-0.5 rounded-full text-white">
                      {getAPIDataDocsInfo?.attachments.length}
                    </div>
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-[#F6F9FD] sm:max-w-[50rem]">
                  <DialogHeader>
                    {/* <DialogTitle>Attachments</DialogTitle> */}
                  </DialogHeader>
                  <div className="flex ">
                    <div className="py-4 w-1/2 h-full items-center border-r-2 space-y-3 ">
                      <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <div className="flex flex-col justify-center items-center gap-3">
                          <img
                            src={AttachementBrowseFile.path}
                            alt={AttachementBrowseFile.alt}
                            width={50}
                            height={50}
                            className=""
                          />
                          <Label className=" text-[#616161] font-semibold">
                            Drag Files Here
                          </Label>
                          <Label className=" text-[#C3C3C3]">or</Label>
                          <Label
                            htmlFor="input-file-upload"
                            className="bg-[#7ACFFF] rounded-full text-[white] p-3 hover:cursor-pointer w-fit"
                          >
                            Browse
                          </Label>
                          {uploadedFiles.map((file: any, index: any) => (
                            <div
                              className="flex space-x-3  justify-between  bg-white "
                              key={file.name}
                            >
                              <div className="flex space-x-2">
                                <img
                                  src={DocFileicon.path}
                                  alt={DocFileicon.alt}
                                  width={15}
                                  height={15}
                                  className="flex-none"
                                />
                                <div className="">
                                  <Label className="text-[#616161]">
                                    {file.name}
                                  </Label>
                                </div>
                              </div>
                              <img
                                src={DeleteFileIcon.path}
                                alt={DeleteFileIcon.alt}
                                width={15}
                                height={15}
                                className="hover:cursor-pointer flex-none"
                                onClick={() =>
                                  setUploadedFiles((prev: any) =>
                                    prev.filter(
                                      (_item: any, id: any) => index != id
                                    )
                                  )
                                }
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="w-full h-full space-y-4 mx-4">
                      <Label className=" text-[#616161] font-semibold text-nowrap text-base">
                        Uploaded Files
                      </Label>
                      <div className="space-y-3">
                        {getAPIDataDocsInfo?.attachments.map(
                          (attachment: any, index: any) => {
                            return (
                              <div
                                className="flex space-x-3  justify-between  bg-white "
                                key={index}
                              >
                                <div className="flex space-x-2">
                                  <img
                                    src={DocFileicon.path}
                                    alt={DocFileicon.alt}
                                    width={15}
                                    height={15}
                                    className="flex-none"
                                  />
                                  <div className="">
                                    <Link to={BASE_URL + attachment.file_url}>
                                      <Label className="text-[#616161]">
                                        {attachment.file_name}
                                      </Label>
                                    </Link>
                                  </div>
                                </div>
                                <img
                                  src={DeleteFileIcon.path}
                                  alt={DeleteFileIcon.alt}
                                  width={15}
                                  height={15}
                                  className="hover:cursor-pointer flex-none"
                                  onClick={() =>
                                    DeleteAttachment(attachment.name)
                                  }
                                />
                              </div>
                            );
                          }
                        )}
                        {getAPIDataDocsInfo?.attachments &&
                          getAPIDataDocsInfo.attachments.length === 0 && (
                            <Label>No Attachment Found</Label>
                          )}
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button
                        type="submit"
                        className="bg-[#7ACFFF] rounded-full"
                        onClick={() => UploadAttachment(params)}
                      >
                        Save
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="bg-[#F6F9FD] border-[#DDDDDD] text-[#616161] space-x-1"
                  >
                    <Tags
                      className="sm:w-4 sm:h-4 w-3 h-3 "
                      style={{ transform: "rotate(90deg)" }}
                    />
                    {/* <p className="hidden sm:block">Tags</p> */}
                    <div className="bg-[#47BDFF] px-2 py-0.5 rounded-full text-white">
                      {tags.length}
                    </div>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Tags</DialogTitle>
                  </DialogHeader>
                  <div className="">
                    <TagInput
                      tags={tags}
                      setTags={setTags}
                      placeholder="Enter tag"
                      deleteTag={DeleteTags}
                      addNewTag={AddTags}
                    />
                  </div>
                </DialogContent>
              </Dialog>
              <DrawerDemo
                triggerChilder={
                  <Button
                    variant="outline"
                    className="bg-[#F6F9FD] border-[#DDDDDD] text-[#616161] space-x-1"
                  >
                    <img
                      src={ActivityButtonIcon.path}
                      alt={ActivityButtonIcon.alt}
                      className="w-5 h-5 min-w-5 min-h-5"
                    />
                  </Button>
                }
                contentChilder={<Activity selectActivity={selectActivity} />}
              />
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
          {selectPatientApiData &&
            selectPatientApiData.custom_patient_notes && (
              <div className="ml-4 text-[#474747] text-base">
                <span className=" font-bold">note:</span>{" "}
                {selectPatientApiData.custom_patient_notes}
              </div>
            )}
          <div className="my-1 space-x-2 flex-wrap align-middle  sm:hidden flex justify-end">
            {getAPIDataDocs.workflow_state === "Service Completed" && (
              <div className="items-end space-x-2">
                <Button className="bg-[#7ACFFF] text-[#FFFFFF] border-[#CCCCCC] border-x  border-y border-opacity-20 font-semibold  xl:text-sm text-xs ">
                  <img
                    src={CMRPatientTakeAway.path}
                    alt={CMRPatientTakeAway.alt}
                    width={17}
                    height={17}
                    className="lg:mr-2"
                  />
                  <p className="hidden lg:block xl:text-sm text-xs">
                    Patient Take Away
                  </p>
                </Button>
              </div>
            )}
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
                  <Link
                    to={`/appointments/${getAPIDataDocs.patient_appointment}`}
                  >
                    <DropdownMenuItem>
                      <Label className="text-[#616161] xl:text-sm text-xs">
                        Appointment
                      </Label>
                    </DropdownMenuItem>
                  </Link>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="bg-[#F6F9FD] border-[#DDDDDD] text-[#616161] space-x-1"
                >
                  <Paperclip className="sm:w-4 sm:h-4 w-3 h-3" />{" "}
                  {/* <p className="hidden sm:block">Attachment</p> */}
                  <div className="bg-[#47BDFF] px-2 py-0.5 rounded-full text-white">
                    {getAPIDataDocsInfo?.attachments.length}
                  </div>
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-[#F6F9FD] sm:max-w-[50rem]">
                <DialogHeader>
                  {/* <DialogTitle>Attachments</DialogTitle> */}
                </DialogHeader>
                <div className="flex ">
                  <div className="py-4 w-1/2 h-full items-center border-r-2 space-y-3 ">
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <div className="flex flex-col justify-center items-center gap-3">
                        <img
                          src={AttachementBrowseFile.path}
                          alt={AttachementBrowseFile.alt}
                          width={50}
                          height={50}
                          className=""
                        />
                        <Label className=" text-[#616161] font-semibold">
                          Drag Files Here
                        </Label>
                        <Label className=" text-[#C3C3C3]">or</Label>
                        <Label
                          htmlFor="input-file-upload"
                          className="bg-[#7ACFFF] rounded-full text-[white] p-3 hover:cursor-pointer w-fit"
                        >
                          Browse
                        </Label>
                        {uploadedFiles.map((file: any, index: any) => (
                          <div
                            className="flex space-x-3  justify-between  bg-white "
                            key={file.name}
                          >
                            <div className="flex space-x-2">
                              <img
                                src={DocFileicon.path}
                                alt={DocFileicon.alt}
                                width={15}
                                height={15}
                                className="flex-none"
                              />
                              <div className="">
                                <Label className="text-[#616161]">
                                  {file.name}
                                </Label>
                              </div>
                            </div>
                            <img
                              src={DeleteFileIcon.path}
                              alt={DeleteFileIcon.alt}
                              width={15}
                              height={15}
                              className="hover:cursor-pointer flex-none"
                              onClick={() =>
                                setUploadedFiles((prev: any) =>
                                  prev.filter(
                                    (_item: any, id: any) => index != id
                                  )
                                )
                              }
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="w-full h-full space-y-4 mx-4">
                    <Label className=" text-[#616161] font-semibold text-nowrap text-base">
                      Uploaded Files
                    </Label>
                    <div className="space-y-3">
                      {getAPIDataDocsInfo?.attachments.map(
                        (attachment: any, index: any) => {
                          return (
                            <div
                              className="flex space-x-3  justify-between  bg-white "
                              key={index}
                            >
                              <div className="flex space-x-2">
                                <img
                                  src={DocFileicon.path}
                                  alt={DocFileicon.alt}
                                  width={15}
                                  height={15}
                                  className="flex-none"
                                />
                                <div className="">
                                  <Link to={BASE_URL + attachment.file_url}>
                                    <Label className="text-[#616161]">
                                      {attachment.file_name}
                                    </Label>
                                  </Link>
                                </div>
                              </div>
                              <img
                                src={DeleteFileIcon.path}
                                alt={DeleteFileIcon.alt}
                                width={15}
                                height={15}
                                className="hover:cursor-pointer flex-none"
                                onClick={() =>
                                  DeleteAttachment(attachment.name)
                                }
                              />
                            </div>
                          );
                        }
                      )}
                      {getAPIDataDocsInfo?.attachments &&
                        getAPIDataDocsInfo.attachments.length === 0 && (
                          <Label>No Attachment Found</Label>
                        )}
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button
                      type="submit"
                      className="bg-[#7ACFFF] rounded-full"
                      onClick={() => UploadAttachment(params)}
                    >
                      Save
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="bg-[#F6F9FD] border-[#DDDDDD] text-[#616161] space-x-1"
                >
                  <Tags
                    className="sm:w-4 sm:h-4 w-3 h-3 "
                    style={{ transform: "rotate(90deg)" }}
                  />
                  {/* <p className="hidden sm:block">Tags</p> */}
                  <div className="bg-[#47BDFF] px-2 py-0.5 rounded-full text-white">
                    {tags.length}
                  </div>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Tags</DialogTitle>
                </DialogHeader>
                <div className="">
                  <TagInput
                    tags={tags}
                    setTags={setTags}
                    placeholder="Enter tag"
                    deleteTag={DeleteTags}
                    addNewTag={AddTags}
                  />
                </div>
              </DialogContent>
            </Dialog>
            <DrawerDemo
              triggerChilder={
                <Button
                  variant="outline"
                  className="bg-[#F6F9FD] border-[#DDDDDD] text-[#616161] space-x-1"
                >
                  <img
                    src={ActivityButtonIcon.path}
                    alt={ActivityButtonIcon.alt}
                    className="w-5 h-5 min-w-5 min-h-5"
                  />
                </Button>
              }
              contentChilder={<Activity selectActivity={selectActivity} />}
            />
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
        <Separator orientation="horizontal" className="my-2 lg:my-0" />
        <div className="m-auto align-middle block xl:hidden pl-3"></div>

        <div className="flex h-[calc(100vh-180px)] overflow-auto">
          <Stepper
            steps={steps}
            selectedStepper={selectedStepper}
            setSelectedStepper={setSelectedStepper}
            hideSideIcons={false}
            progressCheckBox={true}
          />

          <div className="w-full h-full flex flex-col overflow-hidden">
            <div className="overflow-auto flex-grow">
              <div className="">
                {selectedStepper === "patientInfo" && (
                  <>
                    <div className="mt-5  bg-[#F6F9FD] px-4 py-4 mx-1 border border-[#E0E0E0]">
                      <h5 className="mb-1  font-semibold text-[#474747] xl:text-2xl sm:text-xl text-lg">
                        Add Information
                      </h5>
                      <Separator orientation="horizontal" className="my-3" />
                      <h5 className="mb-1  font-semibold text-[#474747] xl:text-base sm:text-base text-sm">
                        Patient Information
                      </h5>

                      <div className="grid 2xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-6 mt-7">
                        <div className="grid w-full  items-center gap-1.5">
                          <Label className="text-[#616161] xl:text-sm text-xs">
                            Patient Name{" "}
                            <span className="text-[#ED9192] xl:text-sm text-xs">
                              *
                            </span>
                            <ReqiredFieldErrorImage
                              error={errors.patient_name}
                            />
                          </Label>
                          <div className="flex w-full justify-between space-x-3">
                            <div className="w-full">
                              <ComboboxDropDownWithUseFormHook
                                doctype="Patient"
                                placeholder="select patient"
                                displayValue="label"
                                handleInputChange={handleInputChangeComboBox}
                                label="patient_name"
                                description={"description"}
                                required
                                register={register}
                                setValueForm={setValue}
                                dataValue={
                                  getAPIDataLinkTitles[
                                    "Patient::" + getAPIDataDocs.patient_name
                                  ]
                                }
                                errors={errors}
                                // addEntity={{
                                //   name: "Add Patient",
                                //   href: ROUTES.ADD_PATIENT,
                                // }}
                              />
                            </div>
                            <div className="flex items-end ml-2">
                                <Button variant={"outline"} onClick={() => setOnOpenPatient(true)}>
                                  <img
                                    src={ImmunizationServiceAddPatientIcon.path}
                                    alt={ImmunizationServiceAddPatientIcon.alt}
                                    className="w-8 h-8 min-w-8 min-h-8"
                                  />
                                </Button>
                                </div>
                          </div>
                        </div>
                        <div className="grid  w-full  items-center gap-1.5">
                          <Label className="text-[#616161] xl:text-sm text-xs">
                            Date of Birth
                          </Label>
                          <Input
                            type="date"
                            placeholder=""
                            disabled
                            defaultValue={getAPIDataDocs.dob}
                            className="xl:text-sm text-xs"
                            {...register("dob")}
                          />
                        </div>

                        <div className="grid w-full  items-center gap-1.5">
                          <Controller
                            name="mobile__primary_phone"
                            control={control}
                            defaultValue={getAPIDataDocs.mobile__primary_phone}
                            render={({
                              field: { onChange, value },
                              fieldState: { error },
                            }) => (
                              <>
                                <Label className="text-[#616161] xl:text-sm text-xs">
                                  Mobile (Primary Phone)
                                  <ReqiredFieldErrorImage error={error} />
                                </Label>

                                <PhoneInput
                                  value={value}
                                  onChange={onChange}
                                  placeholder="Enter Phone Number"
                                  prefix=""
                                  className="w-full h-full"
                                  inputClassName={`${
                                    error && "border-[#FF441B]"
                                  } w-full h-full`}
                                />
                              </>
                            )}
                          />
                        </div>

                        <div className="grid w-full  items-center gap-1.5">
                          <Label className="text-[#616161] xl:text-sm text-xs">
                            Gender
                          </Label>
                          <DynamicRadioButton
                            data={[
                              {
                                label: "Male",
                                value: "Male",
                              },
                              {
                                label: "Female",
                                value: "Female",
                              },
                              {
                                label: "Other",
                                value: "Other",
                              },
                            ]}
                            getButtonSelection={selectGender}
                            setButtonSelection={setSelectGender}
                            defaultValue="Male"
                            disabled
                          />
                        </div>
                        <div className="grid w-full items-center gap-1.5 ">
                          <LabelSMResponsive className="text-[#616161]">
                            Race
                          </LabelSMResponsive>
                          <ComboboxDropDown
                            // dataValue={getAPIDataDocs.custom_race}
                            label="race"
                            staticValue={RaceDropDownOption}
                            placeholder="select Race"
                            handleInputChange={handleInputChangeComboBox}
                            dataValue={comboBoxKeyValues.race}
                          />
                        </div>
                        <div className="grid w-full items-center gap-1.5 ">
                          <LabelSMResponsive className="text-[#616161]">
                            Ethnicity
                          </LabelSMResponsive>
                          <ComboboxDropDown
                            // dataValue={getAPIDataDocs.custom_ethnicity}
                            label="ethnicity"
                            placeholder="select Ethnicity"
                            staticValue={EthnicityDropDownOption}
                            handleInputChange={handleInputChangeComboBox}
                            dataValue={comboBoxKeyValues.ethnicity}
                          />
                        </div>

                        <div className="grid w-full  items-center gap-1.5">
                          <Label className="text-[#616161] xl:text-sm text-xs">
                            PCP Name
                          </Label>
                          <Input
                            type="text"
                            placeholder=""
                            className="xl:text-sm text-xs"
                            {...register("pcp_name")}
                            defaultValue={getAPIDataDocs.pcp_name}
                          />
                        </div>

                        <div className="grid w-full  items-center gap-1.5">
                          <Controller
                            name="pcp_phone_number"
                            defaultValue={getAPIDataDocs.pcp_phone_number}
                            control={control}
                            render={({
                              field: { onChange, value },
                              fieldState: { error },
                            }) => (
                              <>
                                <Label className="text-[#616161] xl:text-sm text-xs">
                                  PCP Phone Number
                                </Label>

                                <PhoneInput
                                  value={value}
                                  onChange={onChange}
                                  placeholder="Enter Phone Number"
                                  prefix=""
                                  className="w-full h-full"
                                  inputClassName={`${
                                    error && "border-[#FF441B]"
                                  } w-full h-full`}
                                />
                              </>
                            )}
                          />
                        </div>

                        {getAddressData && (
                          <div className="grid w-full  items-center gap-1.5">
                            <Label className="text-[#616161] xl:text-sm text-xs">
                              Address
                            </Label>
                            <div
                              className="font-medium leading-6 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[#474747] bg-white xl:text-sm text-xs"
                              dangerouslySetInnerHTML={{
                                __html: getAddressData,
                              }}
                            ></div>
                          </div>
                        )}
                      </div>
                      <Separator orientation="horizontal" className="my-5" />
                      <h5 className="mb-1  font-semibold text-[#474747] xl:text-base sm:text-base text-sm">
                        Service Details
                      </h5>
                      <div className="grid 2xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-6 mt-7">
                        <div className="w-full  items-center gap-1.5 space-y-0.5">
                          <Label className="text-[#616161] xl:text-sm text-xs">
                            Location{" "}
                            <span className="text-[#ED9192] xl:text-sm text-xs">
                              *
                            </span>
                            <ReqiredFieldErrorImage
                              error={errors.custom_location_of_service}
                            />
                          </Label>
                          <ComboboxDropDownWithUseFormHook
                            // staticValue={[
                            //   { value: "ABC Pharmacy #1" },
                            //   { value: "LTC Community Center - RS" },
                            //   { value: "Stage Location # 1 - RS" },
                            //   { value: "Test123 - RS" },
                            //   { value: "Church - RS" },
                            //   { value: "Pharmacy1 - RS" },
                            //   { value: "April 17 - Location - RS" },
                            //   { value: "Forum - RS" },
                            // ]}
                            staticValue={
                              selectOptionOnData && selectOptionOnData[1]
                                ? selectOptionOnData[1].map((item: string) => ({
                                    value: item,
                                  }))
                                : []
                            }
                            placeholder="select Location of Service"
                            handleInputChange={handleInputChangeComboBox}
                            label="custom_location_of_service"
                            required
                            register={register}
                            errors={errors}
                            setValueForm={setValue}
                            dataValue={
                              getAPIDataDocs.custom_location_of_service
                            }
                          />
                        </div>
                        <div className="grid w-full  items-center gap-1.5">
                          <Label className="text-[#616161] xl:text-sm text-xs">
                            Appointment Type
                          </Label>
                          <ComboboxDropDown
                            placeholder="select Appointment Type"
                            doctype="Appointment Type"
                            referenceDoctype="Immunization Service"
                            doctypeFilter={`[["Appointment Type","custom_service_type","=","Immunization Service"]]`}
                            multiple
                            optionsSelected={getAppointmentTypeData.map(
                              (item) => item.appointment_type
                            )}
                            handleInputChange={handleInputChangeComboBox}
                            label="custom_select_appointment_type"
                          />
                          {getAppointmentTypeData.length > 0 && (
                            <div className="bg-white p-2 space-x-2 space-y-3 border-[#DDDDDD] border">
                              {getAppointmentTypeData.map(
                                (item: any, index: any) => (
                                  <span
                                    key={index}
                                    className="transition-all border border-[#CCCCCC]  inline-flex h-8 items-center text-sm pl-2 rounded-full text-[#303348] font-medium"
                                  >
                                    {item.appointment_type}
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      className={
                                        "py-1 px-3 h-full hover:bg-transparent w-fit"
                                      }
                                    >
                                      <img
                                        src={
                                          ImmunizationServiceCloseAppointmentTypeIcon.path
                                        }
                                        alt={
                                          ImmunizationServiceCloseAppointmentTypeIcon.alt
                                        }
                                        className={"w-5 h-5 min-w-5 min-h-5"}
                                        onClick={() =>
                                          setAppointmentTypeData(
                                            (prev: any) => {
                                              return prev.filter(
                                                (_: any, idx: number) =>
                                                  !(idx === index)
                                              );
                                            }
                                          )
                                        }
                                      />
                                    </Button>
                                  </span>
                                )
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </>
                )}
                {selectedStepper === "questionnairs" && (
                  <Questionnair
                    questionnairUseStates={{
                      getQuestionnaireAPIData,
                      questionnaireData,
                      setQuestionnaireData,
                    }}
                  />
                )}
                {selectedStepper === "scheduling" && (
                  <Scheduling
                    schedlingUseStates={{
                      setAppointmentScheduling,
                      getAppointmentScheduling,
                    }}
                  />
                )}
                {selectedStepper === "vaccineDetails" && (
                  <VaccineDetails
                    vaccineDetailsProps={{
                      getVFCCheck,
                      setVFCCheck,
                      setVFCTemplate,
                      getVFCTemplate,
                      getVFCEligibleTableData,
                      setVFCEligibleTableData,
                      getVaccineDetailsData,
                      setVaccineDetailsData,
                    }}
                  />
                )}
                {selectedStepper === "billing" && (
                  <BillingInfo
                    billingInfoProps={{
                      getPatientAppointmentAPIData,
                      setPatientAppointmentAPIData,
                    }}
                  />
                )}
              </div>
            </div>

            <CustomDrawer
            open={openAddPatient}
            title=""
            setOpen={setOnOpenPatient}
            contentChilder={
              <AddPatientModal />
            }
          />
          
            <div className="flex justify-between mt-4 sticky bottom-1 py-2 ">
              <Button
                onClick={DecrementStepper}
                variant="outline"
                size="icon"
                className={`rounded-full border-[#6a6a6a]  border-[3px] ${
                  steps.findIndex((step) => selectedStepper === step.key) ===
                    0 && "invisible"
                }     xl:border-[3px] border-[2px]  xl:text-sm text-xs`}
              >
                <ChevronLeft
                  color="#6a6a6a"
                  className="xl:w-[2rem] xl:h-[2rem] w-[1rem] h-[1rem]"
                />
              </Button>
              <div className="flex space-x-2 ">
                {ImmunizationWorkFlowState.includes(nextWorkFlowState) && (
                  <Button
                    className="bg-[#47BDFF] text-white border-[#474747] xl:text-sm text-xs hover:bg-[#3EA4DE] "
                    onClick={() => updateWorkUpdate()}
                  >
                    {nextWorkFlowState}
                  </Button>
                )}
                {getAPIDataDocs.workflow_state !== "Service Completed" && (
                  <Button
                    onClick={() => finalSave()}
                    className="bg-[#47BDFF] text-white border-[#474747]  xl:text-sm text-xs  hover:bg-[#3EA4DE]"
                  >
                    Save
                  </Button>
                )}

                {!(
                  steps.length - 1 ===
                  steps.findIndex((step) => selectedStepper === step.key)
                ) && (
                  <Button
                    onClick={IncrementStepper}
                    variant="outline"
                    size="icon"
                    className="rounded-full border-[#6a6a6a]  xl:border-[3px] border-[2px]  xl:text-sm text-xs"
                  >
                    <ChevronRight
                      color="#6a6a6a"
                      className="xl:w-[2rem] xl:h-[2rem] w-[1rem] h-[1rem]"
                    />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ImmunizationContext.Provider>
  ) : (
    <>
      <LoadingScreen />
    </>
  );
};
export default EditImmunization;
