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
import { ChevronLeft } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import AddPatientModal from "@/components/shared/modals/add-patient";
import {
  EthnicityDropDownOption,
  RaceDropDownOption,
} from "@/constants/fields";
import {
  ImmunizationServiceAddPatientIcon,
  ImmunizationServiceCloseAppointmentTypeIcon,
} from "@/constants/images";
import ROUTES from "@/constants/routes.constats";
import { axiosPOSTAPI } from "@/helpers/commonAPI";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import Cookies from "js-cookie";
import { PhoneInput } from "react-international-phone";
import { CustomDrawer } from "@/components/shared/drawer/drawer";
const AddImmunization = () => {
  const params = { id: "add-new-CMR-wefwWDdwddgreges" };
  const [selectedStepper, setSelectedStepper] = useState("patientInfo");
  const [selectCMRRecipient, setselectCMRRecipient] = useState("Patient");
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

  const router = useNavigate();

  const finalSubmit = async () => {
    const createCMR = async () => {
      const URL = BASE_URL + API.SAVE_DOCS;

      const reqBody = {
        ...getRequestBody,
        ...comboBoxKeyValues,
        custom_select_appointment_type: getAppointmentTypeData,
        doctype: "Immunization Service",
        custom_is_walkin:1
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

  const onChangePatientFieldHandler = async (patientName: string) => {
    const patientPersonalInfoFields = await validatedLink(
      "Patient",
      patientName,
      `["patient_name","dob","mobile","custom_parentguardian_first_name","custom_parentguardian_last_name","sex","custom_ethnicity","custom_race","custom_pcp_name","custom_pcp_phone","patient_name"]`
    );

    const reqBody = {
      docstatus: 0,
      doctype: "Immunization Service",
      name: "new-immunization-service-ejrldboawn",
      __islocal: 1,
      __unsaved: 1,
      owner: Cookies.get("email"),
      naming_series: "IMMN-.YY.-.#",
      custom_select_appointment_type: getAppointmentTypeData,
      gender: patientPersonalInfoFields["sex"],
      ethnicity: patientPersonalInfoFields["custom_ethnicity"],
      race: patientPersonalInfoFields["custom_race"],
      questions_store: [],
      check_vfc_eligibility: 0,
      vfc_eligible_table: [],
      vfc_status: "",
      vaccine_details: [],
      workflow_progress:
        '{\n    "Not Sent":0,\n    "Ineligible": 6,\n    "Questionnaire": 1,\n     "Scheduled":2,\n    "In Progress": 3,\n    "Billing": 4,\n    "Service Completed": 5\n}',
      payment_type: "Medicare or Medi-Cal",
      billing_status: "Not Ready for Billing",
      billing_code: [],
      workflow_state: "Not Sent",
      patient_full_name: patientPersonalInfoFields["patient_name"],
      mobile__primary_phone: patientPersonalInfoFields["mobile"],
      pcp_name: patientPersonalInfoFields["custom_pcp_name"],
      pcp_phone_number: patientPersonalInfoFields["custom_pcp_phone"],
      form_completed_by: patientPersonalInfoFields["patient_name"],
      patient_name: patientName,
      custom_is_walkin: 0,
      total_service_durationin_minutes: 0,
      patient_address: "",
      address_html: "",
      parentguardian_first_name: null,
      parentguardian_last_name: null,
      dob: patientPersonalInfoFields["dob"],
      custom_location_of_service: getValues("custom_location_of_service"),
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
          setRequestBody({
            ...reqBody,
            address_html: getAddressResponse.data.message,
            patient_address: addressFieldName,
          });
        } else {
          setRequestBody(reqBody);
        }
      } else {
        setRequestBody(reqBody);
      }
    } else {
      setRequestBody(reqBody);
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

  useEffect(() => {
    setDocTypeStatus({ page: "immunization-service", status: "Not Started" });
    const fetchData = async () => {
      const URL = BASE_URL + API.GET_DOCDATA_FOR_SELECT;
      const response = await axiosPOSTAPI(URL, {
        doctype: "Immunization Service",
      });
      if (response.status === 200) {
        setSelectOptionOnData(response.data.message);
      }
    };
    fetchData();
    return () => {
      setDocTypeStatus(undefined);
    };
  }, []);

  return (
    <div className="px-3 pt-3">
      <div className="flex justify-between mb-2 ">
        <div className="flex flex-row gap-4 mb-2 align-middle">
          <h3 className="pl-3 text-xl sm:text-2xl lg:text-3xl 2xl:text-4xl font-medium text-[#474747] ">
            New Immunization Service
          </h3>
          <div className="m-auto inline-flex align-middle">
            {/* {selectedStepper === "patientInfo" && (
                <div className="bg-[#FFFEDF] text-[#B5A300] h-fit w-fit p-1 px-2 border border-[#CCCCCC] rounded-xl font-medium xl:text-base sm:text-sm text-xs text-center sm:block hidden">
                  Not Started
                </div>
              )} */}
          </div>
        </div>
        <div className="space-x-2 text-nowrap align-middle"></div>
      </div>
      <div className="m-auto align-middle block xl:hidden pl-3">
        {selectedStepper === "patientInfo" && (
          <div className="bg-[#FFFEDF] text-[#B5A300] h-fit w-fit p-1 px-2 border border-[#CCCCCC] rounded-xl font-medium xl:text-base sm:text-sm text-xs text-center block sm:hidden">
            Not Started
          </div>
        )}
      </div>

      <div className="flex h-[calc(100vh-180px)] overflow-auto">
        {/* <Stepper
            steps={steps}
            selectedStepper={selectedStepper}
            setSelectedStepper={setSelectedStepper}
            hideSideIcons={false}
            progressCheckBox={true}
          /> */}
        {/* <Separator
            orientation="vertical"
            className="h-[90vh] mr-4 hidden sm:block"
          /> */}

        <div className="w-full h-full flex flex-col overflow-hidden">
          <div className="flex-grow overflow-auto ">
            <>
              <div className="overflow-auto flex-grow mt-5  bg-[#F6F9FD] px-4 py-4 mx-1 border border-[#E0E0E0]">
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
                      <ReqiredFieldErrorImage error={errors.patient_name} />
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
                      className="xl:text-sm text-xs"
                      {...register("dob")}
                    />
                  </div>

                  <div className="grid w-full  items-center gap-1.5">
                    <Controller
                      name="mobile__primary_phone"
                      control={control}
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
                    />
                  </div>

                  <div className="grid w-full  items-center gap-1.5">
                    <Controller
                      name="pcp_phone_number"
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
                        dangerouslySetInnerHTML={{ __html: getAddressData }}
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
                        {getAppointmentTypeData.map((item: any, index: any) => (
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
                                  setAppointmentTypeData((prev: any) => {
                                    return prev.filter(
                                      (_: any, idx: number) => !(idx === index)
                                    );
                                  })
                                }
                              />
                            </Button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>


                </div>
              </div>
            </>
          </div>

          <CustomDrawer
            open={openAddPatient}
            title=""
            setOpen={setOnOpenPatient}
            contentChilder={
              <AddPatientModal />
            }
          />

          <div className="flex justify-between mt-4 sticky bottom-1 py-2">
            <Button
              variant="outline"
              size="icon"
              className={`rounded-full border-[#6a6a6a]  xl:border-[3px] border-[2px]  xl:text-sm text-xs`}
            >
              <ChevronLeft
                color="#6a6a6a"
                className="xl:w-[2rem] xl:h-[2rem] w-[1rem] h-[1rem]"
              />
            </Button>
            <div className="flex space-x-4">
              <div className="items-end space-x-2">
                <Button
                  className="bg-[#47BDFF] text-white border-[#474747] border-x  border-y border-opacity-20 font-semibold  xl:text-sm text-xs hover:bg-[#3EA4DE] "
                  onClick={() => finalSubmit()}
                >
                  Questionnaire
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddImmunization;
