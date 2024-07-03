import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { ImmunizationServiceAddPatientIcon } from "@/constants/images";
import API, { BASE_URL } from "@/constants/api.constant";
import Cookies from "js-cookie";
import { InputSMResponsive } from "@/components/ui/input";
import { LabelSMResponsive, Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import DrugAllergiesCard from "./Cards/DrugAllergiesCard";
import EmployeeHousingCard from "./Cards/EmployeeHousingCard";
import FamilyHealthCard from "./Cards/FamilyHealthCard";
import HealthConditionsCard from "./Cards/HealthConditionsCard";
import ComboboxDropDown from "./comboBoxDropDown";
import { useContext, useEffect, useState } from "react";
import { ReloadDataContext } from "@/pages/cmr-service/cmr-service-edit/cmr-service-edit";
import { DataTable } from "./tables/data-table";
import { MedicationDataLabel } from "@/constants/fields";
import { AllergiesColumns, HelthConditionsColumns, MedicationColumns } from "./tables/column-def";
import DialogWithInputTableViewAdd from "./CustomDialogBox/DialogWithInputTableViewAdd";
import { CustomDrawer } from "./drawer/drawer";
import { Button } from "@/components/ui/button";
import { axiosPOSTAPI } from "@/helpers/commonAPI";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import TextArea from "antd/es/input/TextArea";

const MedicalHistory = ({
  getAPIDataDocs,
  params,
  registerPropValue,
  useStateProps,
}: {
  getAPIDataDocs: any;
  params: any;
  registerPropValue: any;
  useStateProps: any;
}) => {
  const {
    selectMaritalStatus,
    setMaritalStatus,
    usedTobacoProduct,
    setUsedTobacoProduct,
    accessToNarcan,
    setaccessToNarcan,
    wantToQuit,
    setWantToQuit,
    haveYouEverInjected,
    setHaveYouEverInjected,
    haveYouEverHospitalized,
    setHaveYouEverHospitalized,
    selectCurrentCigaretteSmoker,
    setCurrentCigaretteSmoker,
    selectFormerCigaretteSmoker,
    setFormerCigaretteSmoker,
    selectOtherTobbacoUser,
    setOtherTobbacoUser,
    selectMedicalCardData,
    setMedicationCardData,
    selectDiagnosisCardData,
    setDiagnosisCardData,
    selectDrugAllergiesCardData,
    setDrugAllergiesCardData,
    selectFamilyHealthHistory,
    setFamilyHealthCardData,
    selectSurgicalHistory,
    setSurgicalHisotryData,
    selectEmployeeHousing,
    setemployeeHousingData,
    handleInputChangeComboBox,
    tableViewFieldState,
    setTableViewFieldState,
  } = useStateProps;
  const [open, onOpen] = useState<boolean>(false);
  const handlerSetCurrentCigaretteSmoker = (e: any) => {
    setCurrentCigaretteSmoker(e);
  };
  const handlerSetFormerCigaretteSmoker = (e: any) => {
    setFormerCigaretteSmoker(e);
  };
  const handlersetOtherTobbacoUser = (e: any) => {
    setOtherTobbacoUser(e);
  };

  const handlerSetMaritalStatus = (e: any) => {
    setMaritalStatus(e.target.value);
  };
  const handlerSetUsedTobacoProductChange = (e: any) => {
    setUsedTobacoProduct(e.target.value);
  };
  const handlerSetaccessToNarcanChange = (e: any) => {
    setaccessToNarcan(e.target.value);
  };
  const handlerSetWantToQuitChange = (e: any) => {
    setWantToQuit(e.target.value);
  };
  const handlerSetHaveYouEverInjectedChange = (e: any) => {
    setHaveYouEverInjected(e.target.value);
  };
  const handlerSetHaveYouEverHospitalizedChange = (e: any) => {
    setHaveYouEverHospitalized(e.target.value);
  };
  // useEffect(() => {
  //   setMaritalStatus(getAPIDataDocs?.marital_status);

  //   setUsedTobacoProduct(
  //     getAPIDataDocs?.custom_do_you_currently_use_or_have_you_ever_tobacco_profucts
  //   );
  //   setCurrentCigaretteSmoker(
  //     getAPIDataDocs?.custom_current_cigarette_smoker === 1 ? true : false
  //   );

  //   setFormerCigaretteSmoker(
  //     getAPIDataDocs?.custom_former_cigarette_smoker === 1 ? true : false
  //   );

  //   setOtherTobbacoUser(
  //     getAPIDataDocs?.custom_other_tobacco_user === 1 ? true : false
  //   );

  //   setaccessToNarcan(
  //     getAPIDataDocs?.custom_use_opioids_and_have_access_to_nacran
  //   );

  //   setWantToQuit(getAPIDataDocs?.custom_are_you_interested_in_quiting_2);

  //   setHaveYouEverInjected(getAPIDataDocs?.custom_purpose_of_body_shapping);

  //   setHaveYouEverHospitalized(
  //     getAPIDataDocs?.custom_have_you_hospitalized_overnight
  //   );

  //   //medication data filled up
  //   setMedicationCardData(getAPIDataDocs?.custom_medications);

  //   //diagnosis data filled up
  //   setDiagnosisCardData(getAPIDataDocs?.custom_health_conditions);

  //   //DrugAllergies data filled up
  //   setDrugAllergiesCardData(
  //     getAPIDataDocs?.custom_drug_allergies__side_effects
  //   );

  //   //Family Health Data Filled UP
  //   setFamilyHealthCardData(getAPIDataDocs?.custom_relative_medical_conditions);

  //   //Sugical History Filled UP
  //   setSurgicalHisotryData(getAPIDataDocs?.custom_surgical_histories);

  //   //Family Housing Filled up
  //   setemployeeHousingData(
  //     getAPIDataDocs?.custom_employment_housing_transportation
  //   );
  // }, [
  //   getAPIDataDocs,
  //   setUsedTobacoProduct,
  //   setCurrentCigaretteSmoker,
  //   setFormerCigaretteSmoker,
  //   setOtherTobbacoUser,
  //   setaccessToNarcan,
  //   setWantToQuit,
  //   setHaveYouEverInjected,
  //   setHaveYouEverHospitalized,
  //   setMedicationCardData,
  //   setDiagnosisCardData,
  //   setDrugAllergiesCardData,
  //   setFamilyHealthCardData,
  //   setSurgicalHisotryData,
  //   setemployeeHousingData,
  //   setMaritalStatus,
  // ]);

  const AddNewMedication = (newMedicationData: any) => {
    const newData = {
      medication_name: newMedicationData.medication_name,
      prescriber: newMedicationData.prescriber,
      dosage: newMedicationData.dosage,
      directions: newMedicationData.directions,
      related_conditions: newMedicationData.related_conditions,
      custom_added_by_patient: newMedicationData.custom_added_by_patient,
      potential_problem: newMedicationData.potential_problem,
      parent: params.id,
      parentfield: "custom_medications",
      parenttype: "Patient",
      doctype: "CMR Medications",
    };

    setMedicationCardData((prev: any) => {
      return [...prev, newData];
    });
  };

  const AddNewDiagnosis = (newDiagnosisData: any) => {
    const newData = {
      health_condition: newDiagnosisData.health_condition,
      condition_status: newDiagnosisData.condition_status,
      parent: params.id,
      parentfield: "custom_health_conditions",
      parenttype: "Patient",
      doctype: "Common Conditions",
    };

    setDiagnosisCardData((prev: any) => {
      return [...prev, newData];
    });
  };

  const AddNewDrugAllergies = (newDrugAllergiesData: any) => {
    const newData = {
      allergies: newDrugAllergiesData.allergies,
      reaction: newDrugAllergiesData.reaction,
      parent: params.id,
      parentfield: "custom_drug_allergies__side_effects",
      parenttype: "Patient",
      doctype: "Drug Allergies Side Effects",
    };

    setDrugAllergiesCardData((prev: any) => {
      return [...prev, newData];
    });
  };

  const AddNewFamilyHealthHistory = (newFamilyHealthHistory: any) => {
    const newData = {
      condition: newFamilyHealthHistory.condition,
      add_relative: newFamilyHealthHistory.add_relative,
      relatives: newFamilyHealthHistory.relatives,
      parent: params.id,
      parentfield: "custom_relative_medical_conditions",
      parenttype: "Patient",
      doctype: "Relative Medical Condition",
    };

    setFamilyHealthCardData((prev: any) => {
      return [...prev, newData];
    });
  };

  const AddNewSugicalHistory = (newSurgicalHistory: any) => {
    const newData = {
      surgery: newSurgicalHistory.surgery,
      year: newSurgicalHistory.year,
      parent: params.id,
      parentfield: "custom_surgical_histories",
      parenttype: "Patient",
      doctype: "Surgical History",
    };

    setSurgicalHisotryData((prev: any) => {
      return [...prev, newData];
    });
  };

  const AddNewEmployeeHousing = (newEmployeeHousing: any) => {
    const newData = {
      question_tag: newEmployeeHousing.question_tag,
      question: newEmployeeHousing.question,
      yes_no: newEmployeeHousing.yes_no,
      answer: newEmployeeHousing.answer,
      parent: params.id,
      parentfield: "custom_employment_housing_transportation",
      parenttype: "Patient",
      doctype: "Environmental Factors Questionnaires",
    };

    setemployeeHousingData((prev: any) => {
      return [...prev, newData];
    });
  };
  return (
    <div>
      <div className="mt-5">
        {/* Allergies, Medical and Surgical History */}
        <Accordion type="multiple">
          <AccordionItem value="item-1" className="bg-[#F6F9FD] my-4 pl-4">
            <AccordionTrigger className="text-left mb-1 heading-text-xl font-semibold text-[#474747]">
              Allergies, Medical and Surgical History
            </AccordionTrigger>
            <AccordionContent>
              <div className="mr-5 ml-2 bg-[#F4F5F7] border">
                <h4 className="m-3 font-semibold heading-text-xl text-[#333333]">
                  Medications
                </h4>
                <hr className="border border-[#D4D6DD]" />
                <div className="m-4 grid gap-4">
                  {/* {selectMedicalCardData.map((medication: any, index: any) => (
                    <MedicationsCard
                      addData
                      showData={true}
                      data={medication}
                      key={index}
                      setData={setMedicationCardData}
                      index={index}
                    />
                  ))}
                  <MedicationsCard
                    showData={false}
                    addData={AddNewMedication}
                    key={undefined}
                    setData={undefined}
                    index={undefined}
                  /> */}
                  <DataTable
                    columns={MedicationColumns}
                    data={selectMedicalCardData}
                    label={"Medication"}
                    userSettingLabel={"CMR Medications"}
                    onOpen={onOpen}
                    setData={setMedicationCardData}
                    tableViewFieldState={tableViewFieldState}
                    setTableViewFieldState={setTableViewFieldState}
                    allFields={MedicationDataLabel}
                    doctype="Patient"
                    addable={true}
                  />
                  <DialogWithInputTableViewAdd
                    onOpen={onOpen}
                    open={open}
                    AddNewData={AddNewMedication}
                    dialogTitle={"Add Medication"}
                    inputLabel={[
                      {
                        label: "Medication Name",
                        value: "medication_name",
                        type: "comboBox",
                        doctype: "Medication",
                        placeholder: "select Medicaltion",
                      },
                      {
                        label: "Prescriber",
                        value: "prescriber",
                        type: "text",
                      },
                      {
                        label: "Related Conditions",
                        value: "related_conditions",
                        type: "comboBox",
                        doctype: "Diagnosis",
                        placeholder: "select Related Conditions",
                      },
                      { label: "Dosage", value: "dosage", type: "text" },
                      {
                        label: "Directions",
                        value: "directions",
                        type: "text",
                      },
                      {
                        label: "Potential Problem",
                        value: "potential_problem",
                        type: "text",
                      },
                      {
                        label: "Added By Patient",
                        value: "custom_added_by_patient",
                        type: "checkbox",
                      },
                    ]}
                    classname={undefined}
                  />
                </div>
              </div>

              <div className="mr-5 mb-5 ml-2 bg-[#F4F5F7] border">
                <h4 className="m-3 font-semibold heading-text-xl text-[#333333]">
                  Health Conditions
                </h4>
                <hr className="border border-[#D4D6DD]" />
                <div className="m-4 flex flex-wrap gap-4">
                  {/* <HealthConditionsCard showData={true} /> */}
                  {selectDiagnosisCardData.map((diagnosis: any, index: any) => (
                    <HealthConditionsCard
                      showData={true}
                      data={diagnosis}
                      index={index}
                      key={index}
                      setData={setDiagnosisCardData}
                    />
                  ))}

                  <HealthConditionsCard
                    showData={false}
                    addData={AddNewDiagnosis}
                  />
                </div>
              </div>

              <div className="mr-5 mb-5 ml-2 bg-[#F4F5F7] border">
                <h4 className="m-3 font-semibold heading-text-xl text-[#333333]">
                  Drug Allergies + Side Effects
                </h4>
                <hr className="border border-[#D4D6DD]" />
                <div className="m-4 flex gap-4">
                  {selectDrugAllergiesCardData.map(
                    (DrugAllergies: any, index: any) => (
                      <DrugAllergiesCard
                        showData={true}
                        data1={DrugAllergies.allergies}
                        data2={DrugAllergies.reaction}
                        index={index}
                        key={index}
                        setData={setDrugAllergiesCardData}
                        inputLabel={[
                          {
                            label: "Allergies",
                            value: "allergies",
                            data: DrugAllergies.allergies,
                            type: "comboBox",
                            doctype: "Allergy",
                            placeholder: "select Allergy",
                          },
                          {
                            label: "Side Effects",
                            value: "reaction",
                            data: DrugAllergies.reaction,
                            type: "text",
                          },
                        ]}
                      />
                    )
                  )}
                  <DrugAllergiesCard
                    showData={false}
                    addData={AddNewDrugAllergies}
                    inputLabel={[
                      {
                        label: "Allergies",
                        value: "allergies",
                        type: "comboBox",
                        doctype: "Allergy",
                        placeholder: "select Allergy",
                      },
                      {
                        label: "Side Effects",
                        value: "reaction",
                        type: "text",
                      },
                    ]}
                  />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Social History Section */}
          <AccordionItem value="item-2" className="bg-[#F6F9FD] my-4 pl-4">
            <AccordionTrigger className="text-left mb-1 heading-text-xl font-semibold text-[#474747]">
              Social History Section
            </AccordionTrigger>
            <AccordionContent>
              <Separator orientation="horizontal" className="mb-4" />
              <div className="grid  2xl:grid-cols-2 sm:grid-cols-1 gap-4">
                <div className="grid w-full max-w-prose items-center gap-1.5">
                  <LabelSMResponsive className="text-[#616161]">
                    Occupation
                  </LabelSMResponsive>
                  <InputSMResponsive
                    type="text"
                    className="mx-1"
                    defaultValue={getAPIDataDocs?.occupation}
                    {...registerPropValue("occupation")}
                  />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <LabelSMResponsive className="text-[#616161]">
                    Marital Status
                  </LabelSMResponsive>
                  <RadioGroup
                    defaultValue="single"
                    className="flex bg-white p-2 rounded-2xl border-[#DDDDDD] border-2 border-opacity-40 w-auto"
                  >
                    <div className="grid lg:grid-cols-4 sm:grid-cols-2 gap-2 w-full">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="Single"
                          id="singlePersonalSocialHistory"
                          className="text-[#7ACFFF] data-[state=checked]:border-[#7ACFFF] border-[#C6C6C6]"
                          onClick={handlerSetMaritalStatus}
                          checked={selectMaritalStatus === "Single"}
                        />
                        <LabelSMResponsive
                          htmlFor="singlePersonalSocialHistory"
                          className="text-[#616161]"
                        >
                          Single
                        </LabelSMResponsive>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="Married"
                          id="marriedPersonalSocialHistory"
                          className="text-[#7ACFFF] data-[state=checked]:border-[#7ACFFF] border-[#C6C6C6]"
                          onClick={handlerSetMaritalStatus}
                          checked={selectMaritalStatus === "Married"}
                        />
                        <LabelSMResponsive
                          htmlFor="marriedPersonalSocialHistory"
                          className="text-[#616161]"
                        >
                          Married
                        </LabelSMResponsive>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="Divorced"
                          id="divorcedPersonalSocialHistory"
                          className="text-[#7ACFFF] data-[state=checked]:border-[#7ACFFF] border-[#C6C6C6]"
                          onClick={handlerSetMaritalStatus}
                          checked={selectMaritalStatus === "Divorced"}
                        />
                        <LabelSMResponsive
                          htmlFor="divorcedPersonalSocialHistory"
                          className="text-[#616161]"
                        >
                          Divorced
                        </LabelSMResponsive>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="Widow"
                          id="widowPersonalSocialHistory"
                          className="text-[#7ACFFF] data-[state=checked]:border-[#7ACFFF] border-[#C6C6C6]"
                          onClick={handlerSetMaritalStatus}
                          checked={selectMaritalStatus === "Widow"}
                        />
                        <LabelSMResponsive
                          htmlFor="widowPersonalSocialHistory"
                          className="text-[#616161]"
                        >
                          Widow
                        </LabelSMResponsive>
                      </div>
                    </div>
                  </RadioGroup>
                </div>
              </div>
              {/* <Separator orientation="horizontal" className="my-4"/> */}

              <div className="mt-4 grid lg:grid-cols-2 gap-9  mr-5">
                <div className="w-full">
                  <LabelSMResponsive className="text-[#707070] font-semibold text-md mb-2">
                    1. Do you currently use or have you ever used tobacco
                    products?
                  </LabelSMResponsive>
                  <RadioGroup defaultValue="Yes" className="flex gap-5 mt-2">
                    <div
                      className={`flex items-center space-x-2  ${usedTobacoProduct === "Yes"
                        ? "bg-[#7ACFFF]"
                        : "border-2 border-[#DDDDDD] bg-white"
                        }  rounded-3xl p-2`}
                    >
                      <RadioGroupItem
                        value="Yes"
                        id="yesSocialHistorySection"
                        className={`${usedTobacoProduct === "Yes" &&
                          "border-[#FFFFFF] text-[#FFFFFF]"
                          }`}
                        onClick={handlerSetUsedTobacoProductChange}
                        checked={usedTobacoProduct === "Yes"}
                      />
                      <LabelSMResponsive
                        htmlFor="yesSocialHistorySection"
                        className={`${usedTobacoProduct === "Yes"
                          ? "text-[#FFFFFF]"
                          : "text-[#616161]"
                          } font-semibold`}
                      >
                        Yes
                      </LabelSMResponsive>
                    </div>
                    <div
                      className={`flex items-center space-x-2  ${usedTobacoProduct === "No"
                        ? "bg-[#7ACFFF]"
                        : "border-2 border-[#DDDDDD] bg-white"
                        }  rounded-3xl p-2`}
                    >
                      <RadioGroupItem
                        value="No"
                        id="noSocialHistorySection"
                        className={` ${usedTobacoProduct === "No" &&
                          "border-[#FFFFFF] text-[#FFFFFF]"
                          } `}
                        onClick={handlerSetUsedTobacoProductChange}
                        checked={usedTobacoProduct === "No"}
                      />
                      <LabelSMResponsive
                        htmlFor="noSocialHistorySection"
                        className={`${usedTobacoProduct === "No"
                          ? "text-[#FFFFFF]"
                          : "text-[#616161]"
                          } font-semibold`}
                      >
                        No
                      </LabelSMResponsive>
                    </div>
                  </RadioGroup>
                </div>
                {/* <div className="w-full">
                    <LabelSMResponsive className="text-[#707070] font-semibold text-md mb-2">
                      when did you first start smoking?
                    </LabelSMResponsive>
                    <InputSMResponsive className="mx-1" defaultValue={getAPIDataDocs?.custom_when_did_you_first_start_smoking}/>
                  </div> */}
              </div>
              <div className="mt-5 grid lg:grid-cols-2 gap-9  mr-5">
                <div className="w-full flex gap-2">
                  <Checkbox
                    id="current-cigarette-smoker"
                    checked={selectCurrentCigaretteSmoker}
                    onCheckedChange={handlerSetCurrentCigaretteSmoker}
                  />
                  <LabelSMResponsive
                    htmlFor="current-cigarette-smoker"
                    className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[#616161]"
                  >
                    Current cigarette smoker
                  </LabelSMResponsive>
                </div>

                <div className="w-full flex gap-2">
                  <Checkbox
                    id="former-cigarette-smoker"
                    checked={selectFormerCigaretteSmoker}
                    onCheckedChange={handlerSetFormerCigaretteSmoker}
                  />
                  <LabelSMResponsive
                    htmlFor="former-cigarette-smoker"
                    className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[#616161]"
                  >
                    Former cigarette smoker
                  </LabelSMResponsive>
                </div>
              </div>
              <div className="mt-5 mr-5 grid lg:grid-cols-2 gap-9">
                <div className="w-full">
                  <LabelSMResponsive className="text-[#707070] font-semibold text-md mb-2">
                    when did you first start smoking?
                  </LabelSMResponsive>
                  {/* <InputSMResponsive
                      className="mx-1"
                      defaultValue={
                        getAPIDataDocs?.custom_when_did_you_first_start_smoking
                      }
                      {...registerPropValue("custom_when_did_you_first_start_smoking")}
                    /> */}
                  <ComboboxDropDown
                    doctype="Year"
                    placeholder="select year"
                    label="custom_when_did_you_first_start_smoking"
                    handleInputChange={handleInputChangeComboBox}
                    dataValue={
                      getAPIDataDocs?.custom_when_did_you_first_start_smoking
                    }
                  />
                </div>
                {/* <div className="w-full">
                    <LabelSMResponsive className="text-[#707070] font-semibold text-md mb-2">
                      when did you first quit smoking?
                    </LabelSMResponsive>
                    <InputSMResponsive className="mx-1" />
                  </div> */}
              </div>
              <div className="mt-5 grid lg:grid-cols-2 gap-4  mr-5">
                <div className="w-full flex gap-2">
                  <Checkbox
                    id="other-tobbaco-user"
                    checked={selectOtherTobbacoUser}
                    onCheckedChange={handlersetOtherTobbacoUser}
                  />
                  <LabelSMResponsive
                    htmlFor="other-tobbaco-user"
                    className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[#616161]"
                  >
                    Other tobacco user (Circle:cigars, hookah, chew, vape).
                  </LabelSMResponsive>
                </div>
                <div className="w-full  lg:ml-4">
                  <LabelSMResponsive className="text-[#707070] font-semibold mb-2">
                    On average how many cigarettes did you smoke per
                    day(Cigarette)?
                  </LabelSMResponsive>
                  <InputSMResponsive
                    className=""
                    defaultValue={
                      getAPIDataDocs?.custom_on_average_how_many_cigarettes_did_you_smoke_per_day
                    }
                    {...registerPropValue(
                      "custom_on_average_how_many_cigarettes_did_you_smoke_per_day"
                    )}
                  />
                </div>
              </div>
              <div className="mt-5  mr-5">
                <div className="">
                  <LabelSMResponsive className="text-[#707070] font-semibold mb-2">
                    When did you quit smoking?
                  </LabelSMResponsive>

                  <ComboboxDropDown
                    doctype="Year"
                    placeholder="select year"
                    label="custom_when_did_you_quit_smoking"
                    buttonClassName=""
                    handleInputChange={handleInputChangeComboBox}
                    dataValue={getAPIDataDocs?.custom_when_did_you_quit_smoking}
                  />
                </div>
              </div>
              <Separator orientation="horizontal" className="my-4" />
              <div className="mt-5  mr-5">
                <div className="">
                  <LabelSMResponsive className="text-[#707070] font-semibold mb-2">
                    2. How many times in the past year have you had 4 or more
                    alcoholic drinks in 1 day?
                  </LabelSMResponsive>
                  <InputSMResponsive
                    className="mx-1 "
                    defaultValue={
                      getAPIDataDocs?.custom_how_many_times_in_the_past_year
                    }
                    {...registerPropValue("custom_how_many_times_in_the_past_year")}
                  />
                </div>
              </div>
              <Separator orientation="horizontal" className="my-4" />
              <div className="mt-5  mr-5">
                <div className="">
                  <LabelSMResponsive className="text-[#707070] font-semibold mb-2">
                    3. How many times in the past year have you used
                    recreational or prescription drug for non-medical reasons?
                  </LabelSMResponsive>
                  <InputSMResponsive
                    className="mx-1 "
                    defaultValue={
                      getAPIDataDocs?.custom_past_year_have_you_had_4_or_more_alcoholic_drinks_iady
                    }
                    {...registerPropValue(
                      "custom_past_year_have_you_had_4_or_more_alcoholic_drinks_iady"
                    )}
                  />
                </div>
              </div>
              <Separator orientation="horizontal" className="my-4" />

              <div className="mt-5  mr-5 grid xl:grid-cols-2  gap-4">
                <div className="w-full">
                  <LabelSMResponsive className="text-[#707070] font-semibold text-md mb-2">
                    4. If you use opioids, do you have access to Narcan
                    (Naloxone)?
                  </LabelSMResponsive>
                  <RadioGroup defaultValue="yes" className="flex gap-5 mt-2">
                    <div
                      className={`flex items-center space-x-2  ${accessToNarcan === "Not Applicable"
                        ? "bg-[#7ACFFF]"
                        : "border-2 border-[#DDDDDD] bg-white"
                        }  rounded-3xl p-2 w-fit`}
                    >
                      <RadioGroupItem
                        value="Not Applicable"
                        id="notApplicableAccessToNarcan"
                        className={`${accessToNarcan === "Not Applicable" &&
                          "border-[#FFFFFF] text-[#FFFFFF]"
                          }`}
                        onClick={handlerSetaccessToNarcanChange}
                        checked={accessToNarcan === "Not Applicable"}
                      />
                      <LabelSMResponsive
                        htmlFor="notApplicableAccessToNarcan"
                        className={`${accessToNarcan === "Not Applicable"
                          ? "text-[#FFFFFF]"
                          : "text-[#616161]"
                          } font-semibold`}
                      >
                        Not Applicable
                      </LabelSMResponsive>
                    </div>
                    <div
                      className={`flex items-center space-x-2  ${accessToNarcan === "Yes"
                        ? "bg-[#7ACFFF]"
                        : "border-2 border-[#DDDDDD] bg-white"
                        }  rounded-3xl p-2 w-fit`}
                    >
                      <RadioGroupItem
                        value="Yes"
                        id="yesAccessToNarcan"
                        className={`${accessToNarcan === "Yes" &&
                          "border-[#FFFFFF] text-[#FFFFFF]"
                          }`}
                        onClick={handlerSetaccessToNarcanChange}
                        checked={accessToNarcan === "Yes"}
                      />
                      <LabelSMResponsive
                        htmlFor="yesAccessToNarcan"
                        className={`${accessToNarcan === "Yes"
                          ? "text-[#FFFFFF]"
                          : "text-[#616161]"
                          } font-semibold`}
                      >
                        Yes
                      </LabelSMResponsive>
                    </div>
                    <div
                      className={`flex items-center space-x-2  ${accessToNarcan === "No"
                        ? "bg-[#7ACFFF]"
                        : "border-2 border-[#DDDDDD] bg-white"
                        }  rounded-3xl p-2 w-fit`}
                    >
                      <RadioGroupItem
                        value="No"
                        id="noAccessToNarcan"
                        className={` ${accessToNarcan === "No" &&
                          "border-[#FFFFFF] text-[#FFFFFF]"
                          } `}
                        onClick={handlerSetaccessToNarcanChange}
                        checked={accessToNarcan === "No"}
                      />
                      <LabelSMResponsive
                        htmlFor="noAccessToNarcan"
                        className={`${accessToNarcan === "No"
                          ? "text-[#FFFFFF]"
                          : "text-[#616161]"
                          } font-semibold`}
                      >
                        No
                      </LabelSMResponsive>
                    </div>
                  </RadioGroup>
                </div>
                <div className="w-full ">
                  <LabelSMResponsive className="text-[#707070] font-semibold text-md mb-2">
                    Are you interesting in quiting?
                  </LabelSMResponsive>
                  <RadioGroup
                    defaultValue="Ready to quit"
                    className="flex gap-5 mt-2"
                  >
                    <div
                      className={`flex items-center space-x-2  ${wantToQuit === "Thinking about quitting"
                        ? "bg-[#7ACFFF]"
                        : "border-2 border-[#DDDDDD] bg-white"
                        }  rounded-3xl p-2`}
                    >
                      <RadioGroupItem
                        value="Thinking about quitting"
                        id="thinkAboutQuitingInterestinginQuiting"
                        className={`${wantToQuit === "Thinking about quitting" &&
                          "border-[#FFFFFF] text-[#FFFFFF]"
                          }`}
                        onClick={handlerSetWantToQuitChange}
                        checked={wantToQuit === "Thinking about quitting"}
                      />
                      <LabelSMResponsive
                        htmlFor="thinkAboutQuitingInterestinginQuiting"
                        className={`${wantToQuit === "Thinking about quitting"
                          ? "text-[#FFFFFF]"
                          : "text-[#616161]"
                          } font-semibold`}
                      >
                        Think about quiting
                      </LabelSMResponsive>
                    </div>
                    <div
                      className={`flex items-center space-x-2  ${wantToQuit === "No"
                        ? "bg-[#7ACFFF]"
                        : "border-2 border-[#DDDDDD] bg-white"
                        }  rounded-3xl p-2 w-fit`}
                    >
                      <RadioGroupItem
                        value="No"
                        id="noInterestinginQuiting"
                        className={` ${wantToQuit === "No" &&
                          "border-[#FFFFFF] text-[#FFFFFF]"
                          } w-fit`}
                        onClick={handlerSetWantToQuitChange}
                        checked={wantToQuit === "No"}
                      />
                      <LabelSMResponsive
                        htmlFor="noInterestinginQuiting"
                        className={`${wantToQuit === "No"
                          ? "text-[#FFFFFF]"
                          : "text-[#616161]"
                          } font-semibold`}
                      >
                        No
                      </LabelSMResponsive>
                    </div>
                    <div
                      className={`flex items-center space-x-2  ${wantToQuit === "Ready to quit"
                        ? "bg-[#7ACFFF]"
                        : "border-2 border-[#DDDDDD] bg-white"
                        }  rounded-3xl p-2 w-fit`}
                    >
                      <RadioGroupItem
                        value="Ready to quit"
                        id="readyToQuiteInterestinginQuiting"
                        className={`${wantToQuit === "Ready to quit" &&
                          "border-[#FFFFFF] text-[#FFFFFF]"
                          }`}
                        onClick={handlerSetWantToQuitChange}
                        checked={wantToQuit === "Ready to quit"}
                      />
                      <LabelSMResponsive
                        htmlFor="readyToQuiteInterestinginQuiting"
                        className={`${wantToQuit === "Ready to quit"
                          ? "text-[#FFFFFF]"
                          : "text-[#616161]"
                          } font-semibold`}
                      >
                        Ready to quit
                      </LabelSMResponsive>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Family Health History */}
          <AccordionItem value="item-3" className="bg-[#F6F9FD] my-4 pl-4">
            <AccordionTrigger className="text-left mb-1 heading-text-xl font-semibold text-[#474747]">
              Family Health History
            </AccordionTrigger>
            <AccordionContent>
              <Separator orientation="horizontal" />
              <p className="font-semibold label-text-base text-[#707070]">
                Have any of your blood relatives had any of the following? If
                so, please indicate which of your blood relatives have the
                condition.
              </p>
              <div className="my-3 flex flex-wrap gap-4">
                {selectFamilyHealthHistory.map(
                  (FamilyHealth: any, index: any) => (
                    <FamilyHealthCard
                      showData={true}
                      data={FamilyHealth}
                      index={index}
                      key={index}
                      setData={setFamilyHealthCardData}
                    />
                  )
                )}
                <FamilyHealthCard
                  showData={false}
                  addData={AddNewFamilyHealthHistory}
                />
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Past medical, surgical and hospitalization history Section */}
          <AccordionItem
            value="item-4"
            className="text-left bg-[#F6F9FD] my-4 pl-4"
          >
            <AccordionTrigger className="mb-1 heading-text-xl font-semibold text-[#474747] text-left">
              Past medical, surgical and hospitalization history
            </AccordionTrigger>
            <AccordionContent>
              <Separator orientation="horizontal" />
              <p className="font-semibold label-text-lg text-[#616161]">
                Surgical History
              </p>
              <p className="font-semibold label-text-base text-[#707070]">
                What surgeries have you had in the past, and in what year?
              </p>
              <div className="my-3 flex flex-wrap gap-4">
                {/* {selectSurgicalHistory.map((SurgicalHistory: any, index) => (
                      <DrugAllergiesCard
                        showData={true}
                        data={SurgicalHistory}
                        index={index}
                        key={index}
                        setData={setSurgicalHisotryData}
                      />

                    ))}
                  <DrugAllergiesCard showData={false} addData={AddNewSugicalHistory}/> */}
                {selectSurgicalHistory.map(
                  (SurgicalHistory: any, index: any) => (
                    <DrugAllergiesCard
                      showData={true}
                      data1={SurgicalHistory.surgery}
                      data2={SurgicalHistory.year}
                      index={index}
                      key={index}
                      setData={setSurgicalHisotryData}
                      inputLabel={[
                        {
                          label: "Surgery",
                          value: "surgery",
                          data: SurgicalHistory.surgery,
                          type: "comboBox",
                          doctype: "Surgery",
                          placeholder: "select Surgery",
                        },
                        {
                          label: "Year",
                          value: "year",
                          data: SurgicalHistory.year,
                          type: "comboBox",
                          doctype: "Year",
                          placeholder: "select Year",
                        },
                      ]}
                    />
                  )
                )}
                <DrugAllergiesCard
                  showData={false}
                  addData={AddNewSugicalHistory}
                  inputLabel={[
                    {
                      label: "Surgery",
                      value: "surgery",
                      type: "comboBox",
                      doctype: "Surgery",
                      placeholder: "select Surgery",
                    },
                    {
                      label: "Year",
                      value: "year",
                      type: "comboBox",
                      doctype: "Year",
                      placeholder: "select Year",
                    },
                  ]}
                />
              </div>

              <div className="mt-5  mr-5 flex gap-4">
                <div className="w-full">
                  <LabelSMResponsive className="text-[#707070] font-semibold mb-2">
                    Have you ever injected or pumped silicone, oils, or other
                    substances for the purpose of body shaping? (Naloxone)?
                  </LabelSMResponsive>
                  <RadioGroup defaultValue="Yes" className="flex gap-5 mt-2">
                    <div
                      className={`flex items-center space-x-2  ${haveYouEverInjected === "Yes"
                        ? "bg-[#7ACFFF]"
                        : "border-2 border-[#DDDDDD] bg-white"
                        }  rounded-3xl p-2`}
                    >
                      <RadioGroupItem
                        value="Yes"
                        id="yesHaveYouEverInjected"
                        className={`${haveYouEverInjected === "Yes" &&
                          "border-[#FFFFFF] text-[#FFFFFF]"
                          }`}
                        onClick={handlerSetHaveYouEverInjectedChange}
                        checked={haveYouEverInjected === "Yes"}
                      />
                      <LabelSMResponsive
                        htmlFor="yesHaveYouEverInjected"
                        className={`${haveYouEverInjected === "Yes"
                          ? "text-[#FFFFFF]"
                          : "text-[#616161]"
                          } font-semibold`}
                      >
                        Yes
                      </LabelSMResponsive>
                    </div>
                    <div
                      className={`flex items-center space-x-2  ${haveYouEverInjected === "No"
                        ? "bg-[#7ACFFF]"
                        : "border-2 border-[#DDDDDD] bg-white"
                        }  rounded-3xl p-2`}
                    >
                      <RadioGroupItem
                        value="No"
                        id="noHaveYouEverInjected"
                        className={`${haveYouEverInjected === "No" &&
                          "border-[#FFFFFF] text-[#FFFFFF]"
                          }`}
                        onClick={handlerSetHaveYouEverInjectedChange}
                        checked={haveYouEverInjected === "No"}
                      />
                      <LabelSMResponsive
                        htmlFor="noHaveYouEverInjected"
                        className={`${haveYouEverInjected === "No"
                          ? "text-[#FFFFFF]"
                          : "text-[#616161]"
                          } font-semibold`}
                      >
                        No
                      </LabelSMResponsive>
                    </div>
                  </RadioGroup>
                </div>
              </div>
              <Separator orientation="horizontal" className="my-4" />
              <div className="mt-5  mr-5 gap-4">
                <LabelSMResponsive className="text-[#616161] font-bold mb-2">
                  Hospitalization History
                </LabelSMResponsive>
                <div className="w-full">
                  <LabelSMResponsive className="text-[#707070] font-semibold mb-2">
                    Other than for surgery or childbirth, have you ever been
                    hospitalized overnight for a medical or mental health issue?
                  </LabelSMResponsive>
                  <RadioGroup defaultValue="Yes" className="flex gap-5 mt-2">
                    <div
                      className={`flex items-center space-x-2  ${haveYouEverHospitalized === "Yes"
                        ? "bg-[#7ACFFF]"
                        : "border-2 border-[#DDDDDD] bg-white"
                        }  rounded-3xl p-2`}
                    >
                      <RadioGroupItem
                        value="Yes"
                        id="yesHospitalizationHistory"
                        className={`${haveYouEverHospitalized === "Yes" &&
                          "border-[#FFFFFF] text-[#FFFFFF]"
                          }`}
                        onClick={handlerSetHaveYouEverHospitalizedChange}
                        checked={haveYouEverHospitalized === "Yes"}
                      />
                      <LabelSMResponsive
                        htmlFor="yesHospitalizationHistory"
                        className={`${haveYouEverHospitalized === "Yes"
                          ? "text-[#FFFFFF]"
                          : "text-[#616161]"
                          } font-semibold`}
                      >
                        Yes
                      </LabelSMResponsive>
                    </div>
                    <div
                      className={`flex items-center space-x-2  ${haveYouEverHospitalized === "No"
                        ? "bg-[#7ACFFF]"
                        : "border-2 border-[#DDDDDD] bg-white"
                        }  rounded-3xl p-2`}
                    >
                      <RadioGroupItem
                        value="No"
                        id="noHospitalizationHistory"
                        className={`${haveYouEverHospitalized === "No" &&
                          "border-[#FFFFFF] text-[#FFFFFF]"
                          }`}
                        onClick={handlerSetHaveYouEverHospitalizedChange}
                        checked={haveYouEverHospitalized === "No"}
                      />
                      <LabelSMResponsive
                        htmlFor="noHospitalizationHistory"
                        className={`${haveYouEverHospitalized === "No"
                          ? "text-[#FFFFFF]"
                          : "text-[#616161]"
                          } font-semibold`}
                      >
                        No
                      </LabelSMResponsive>
                    </div>
                  </RadioGroup>
                  <div className="mt-4">
                    <LabelSMResponsive className="mb-2">
                      What for and when?
                    </LabelSMResponsive>
                    <InputSMResponsive
                      className="mx-1"
                      defaultValue={getAPIDataDocs?.custom_what_for_and_when}
                      {...registerPropValue("custom_what_for_and_when")}
                    />
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Environmental Factors Employment and Living Condition Section */}
          <AccordionItem
            value="item-5"
            className="text-left bg-[#F6F9FD] my-4 pl-4"
          >
            <AccordionTrigger className="mb-1 heading-text-xl font-semibold text-[#474747] text-left">
              Environmental Factors Employment and Living Condition
            </AccordionTrigger>
            <AccordionContent>
              <Separator orientation="horizontal" className="mb-2" />
              <p className="font-semibold label-text-lg text-[#616161]">
                Employment, Housing, &Transportation
              </p>

              <div className="my-2 grid gap-4">
                {selectEmployeeHousing.map(
                  (employeeHousing: any, index: any) => (
                    <EmployeeHousingCard
                      showData={true}
                      setData={setemployeeHousingData}
                      data={employeeHousing}
                      index={index}
                      key={index}
                    />
                  )
                )}
                <EmployeeHousingCard
                  showData={false}
                  addData={AddNewEmployeeHousing}
                  setData={undefined}
                  index={undefined}
                />
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Risk Factor */}
          <AccordionItem
            value="item-6"
            className="text-left bg-[#F6F9FD] my-4 pl-4"
          >
            <AccordionTrigger className="mb-1 heading-text-xl font-semibold text-[#474747] text-left">
              Risk Factor
            </AccordionTrigger>
            <AccordionContent>
              <Separator orientation="horizontal" className="mb-4" />
              <div className="grid lg:grid-cols-2 gap-4 p-1">
                <div className="grid  items-center gap-1.5">
                  <LabelSMResponsive className="text-[#707070]">
                    Tobacco Consumption (Past)
                  </LabelSMResponsive>
                  <InputSMResponsive
                    type="text"
                    defaultValue={getAPIDataDocs?.tobacco_past_use}
                    {...registerPropValue("tobacco_past_use")}
                  />
                </div>
                <div className="grid items-center gap-1.5 ">
                  <LabelSMResponsive className="text-[#707070]">
                    Tobacco Consumption (Present)
                  </LabelSMResponsive>
                  <InputSMResponsive
                    type="text"
                    defaultValue={getAPIDataDocs?.tobacco_current_use}
                    {...registerPropValue("tobacco_current_use")}
                  />
                </div>
                <div className="grid  items-center gap-1.5">
                  <LabelSMResponsive className="text-[#707070]">
                    Alcohol Consumption (Past)
                  </LabelSMResponsive>
                  <InputSMResponsive
                    type="text"
                    defaultValue={getAPIDataDocs?.alcohol_past_use}
                    {...registerPropValue("alcohol_past_use")}
                  />
                </div>
                <div className="grid  items-center gap-1.5 ">
                  <LabelSMResponsive className="text-[#707070]">
                    Alcohol Consumption (Present)
                  </LabelSMResponsive>
                  <InputSMResponsive
                    type="text"
                    defaultValue={getAPIDataDocs?.alcohol_current_use}
                    {...registerPropValue("alcohol_current_use")}
                  />
                </div>
                <div className="grid  items-center gap-1.5 ">
                  <LabelSMResponsive className="text-[#707070]">
                    Occupational Hazards and Environmental Factors
                  </LabelSMResponsive>
                  <Textarea
                    className="resize-none"
                    defaultValue={getAPIDataDocs?.surrounding_factors}
                    {...registerPropValue("surrounding_factors")}
                  />
                </div>
                <div className="grid  items-center gap-1.5 ">
                  <LabelSMResponsive className="text-[#707070]">
                    Other Risk Factors
                  </LabelSMResponsive>
                  <Textarea
                    className="resize-none"
                    defaultValue={getAPIDataDocs?.other_risk_factors}
                    {...registerPropValue("other_risk_factors")}
                  />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      {/* <div className="mt-5 text-left  bg-[#F6F9FD] p-4">
          <h5 className="mb-1 heading-text-xl font-semibold text-[#474747]"></h5>
          <Separator orientation="horizontal" />
        </div> */}
    </div>
  );
};

export default MedicalHistory;

export const PatientHistory = ({
  getAPIDataDocs,
  params,
  registerPropValue,
  useStateProps,
}: {
  getAPIDataDocs: any;
  params: any;
  registerPropValue: any;
  useStateProps: any;
}) => {
  const {
    usedTobacoProduct,
    setUsedTobacoProduct,
    accessToNarcan,
    setaccessToNarcan,
    wantToQuit,
    setWantToQuit,
    haveYouEverInjected,
    setHaveYouEverInjected,
    haveYouEverHospitalized,
    setHaveYouEverHospitalized,
    selectCurrentCigaretteSmoker,
    setCurrentCigaretteSmoker,
    selectFormerCigaretteSmoker,
    setFormerCigaretteSmoker,
    selectOtherTobbacoUser,
    setOtherTobbacoUser,
    selectMedicalCardData,
    setMedicationCardData,
    selectDiagnosisCardData,
    setDiagnosisCardData,
    selectDrugAllergiesCardData,
    setDrugAllergiesCardData,
    selectFamilyHealthHistory,
    setFamilyHealthCardData,
    selectSurgicalHistory,
    setSurgicalHisotryData,
    selectEmployeeHousing,
    setemployeeHousingData,
    handleInputChangeComboBox,
  } = useStateProps;

  const {
    register,
    getValues,
    watch,
    setValue,
    formState: { errors },
    trigger,
    reset,
    control,
  } = useForm();

  const handlerSetCurrentCigaretteSmoker = (e: any) => {
    setCurrentCigaretteSmoker(e);
  };
  const handlerSetFormerCigaretteSmoker = (e: any) => {
    setFormerCigaretteSmoker(e);
  };
  const handlersetOtherTobbacoUser = (e: any) => {
    setOtherTobbacoUser(e);
  };

  // const handlerSetMaritalStatus = (e: any) => {
  //   setMaritalStatus(e.target.value);
  // };
  const handlerSetUsedTobacoProductChange = (e: any) => {
    setUsedTobacoProduct(e.target.value);
  };
  const handlerSetaccessToNarcanChange = (e: any) => {
    setaccessToNarcan(e.target.value);
  };
  const handlerSetWantToQuitChange = (e: any) => {
    setWantToQuit(e.target.value);
  };
  const handlerSetHaveYouEverInjectedChange = (e: any) => {
    setHaveYouEverInjected(e.target.value);
  };
  const handlerSetHaveYouEverHospitalizedChange = (e: any) => {
    setHaveYouEverHospitalized(e.target.value);
  };

  useEffect(() => { }, [getAPIDataDocs]);
  const { tableViewFieldState, setTableViewFieldState } =
    useContext(ReloadDataContext);
  const [open, onOpen] = useState<boolean>(false);
  const [openDiagnosis, onOpenDiagnosis] = useState<boolean>(false);
  const [openNewDiagnosis, onOpenNewDiagnosis] = useState<boolean>(false);
  const [openAllergies, onOpenAllergies] = useState<boolean>(false);
  const [openNewAllergies, onOpenNewAllergies] = useState<boolean>(false);
  const [openPrescriber, onOpenPrescriber] = useState<boolean>(false);
  const [showResponse, setShowResponse] = useState<boolean>(false);
  const [comboBoxKeyValues, setComboBoxKeyValues] = useState<any>({});
  const [data, setData] = useState<any>({});
  const [inputValue, setInputValue] = useState('');
  const [editDataIndexForMedication, setEditDataIndexForMedication] = useState<number | null>(null);
  const [editDataIndexForDiagnosis, setEditDataIndexForDiagnosis] = useState<number | null>(null);
  const [editDataIndexForAllergie, setEditDataIndexForAllergie] = useState<number | null>(null);

  // Medications
  const AddNewMedication = () => {
    const newData = {
      medication_name: comboBoxKeyValues.medication_name,
      prescriber: comboBoxKeyValues.prescriber,
      directions: inputValue,
      related_conditions: comboBoxKeyValues.related_conditions,
      dosage: "",
      custom_added_by_patient: "",
      potential_problem: "",
      parent: params.id,
      parentfield: "medications",
      parenttype: "CMR Service",
      doctype: "CMR Medications",
    };

    setMedicationCardData((prev: any) => {
      return [...prev, newData];
    });
  };

  const EditMedication = (index: number | null) => {
    setMedicationCardData((prev: any[]) =>
      prev.map((obj, idx) => {
        if (idx === index) {
          return {
            ...obj,
            medication_name: comboBoxKeyValues.medication_name,
            prescriber: comboBoxKeyValues.prescriber,
            directions: inputValue,
            related_conditions: comboBoxKeyValues.related_conditions,
          };
        } else {
          return obj;
        }
      })
    );
  }

  const openMedicationDrawer = () => {
    setEditDataIndexForMedication(null)
    setComboBoxKeyValues({})
    setInputValue('')
    onOpen(true)
  }

  useEffect(() => {
    selectMedicalCardData.map((data: any, idx: number) => {
      if (idx === editDataIndexForMedication) {
        setComboBoxKeyValues((prev: any) => ({ ...prev, "medication_name": data.medication_name, "prescriber": data.prescriber, "related_conditions": data.related_conditions }));
        setInputValue(data.directions)
      }
    })
  }, [editDataIndexForMedication]);

  // Diagnosis
  const AddNewDiagnosis = () => {
    const newData = {
      health_condition: comboBoxKeyValues?.health_condition,
      condition_status: "Active",
      custom_code: comboBoxKeyValues?.custom_code,
      custom_category: getValues('custom_category'),
      parent: params.id,
      parentfield: "health_conditions",
      parenttype: "CMR Service",
      doctype: "Common Conditions",
    };

    setDiagnosisCardData((prev: any) => {
      return [...prev, newData];
    });
  };

  const EditDiagnosis = (index: number | null) => {
    setDiagnosisCardData((prev: any[]) =>
      prev.map((obj, idx) => {
        if (idx === index) {
          return {
            ...obj,
            health_condition: comboBoxKeyValues.health_condition,
            custom_code: comboBoxKeyValues.custom_code,
            condition_status: "Active",
            custom_category: getValues('custom_category'),
          };
        } else {
          return obj;
        }
      })
    );
  }

  const openDiagnosisDrawer = () => {
    setEditDataIndexForDiagnosis(null)
    setComboBoxKeyValues({})
    setValue("category", "");
    onOpenDiagnosis(true)
  }

  useEffect(() => {
    selectDiagnosisCardData.map((data: any, idx: number) => {
      if (idx === editDataIndexForDiagnosis) {
        setComboBoxKeyValues((prev: any) => ({ ...prev, "health_condition": data.health_condition, "custom_code": data.custom_code }));
      }
    })
  }, [editDataIndexForDiagnosis]);

  // Allergies
  const AddNewDrugAllergies = () => {
    const newData = {
      allergies: comboBoxKeyValues.allergies,
      reaction: getValues("reaction"),
      parent: params.id,
      parentfield: "allergies_side_effects",
      parenttype: "CMR Service",
      doctype: "Drug Allergies Side Effects",
    };

    setDrugAllergiesCardData((prev: any) => {
      return [...prev, newData];
    });
  };

  const EditAllergies = (index: number | null) => {
    setDrugAllergiesCardData((prev: any[]) =>
      prev.map((obj, idx) => {
        if (idx === index) {
          return {
            ...obj,
            allergies: comboBoxKeyValues.allergies,
            reaction: getValues('reaction'),
          };
        } else {
          return obj;
        }
      })
    );
  }

  const openAllergiesDrawer = () => {
    setEditDataIndexForAllergie(null)
    setComboBoxKeyValues({})
    setValue("reaction", "");
    onOpenAllergies(true)
  }

  useEffect(() => {
    selectDrugAllergiesCardData.map((data: any, idx: number) => {
      if (idx === editDataIndexForAllergie) {
        setComboBoxKeyValues((prev: any) => ({ ...prev, "allergies": data.allergies}));
      }
    })
  }, [editDataIndexForAllergie]);


  const AddNewFamilyHealthHistory = (newFamilyHealthHistory: any) => {
    const newData = {
      condition: newFamilyHealthHistory.condition,
      add_relative: newFamilyHealthHistory.add_relative,
      relatives: newFamilyHealthHistory.relatives,
      parent: params.id,
      parentfield: "relative_medical_conditions",
      parenttype: "CMR Service",
      doctype: "Relative Medical Condition",
    };

    setFamilyHealthCardData((prev: any) => {
      return [...prev, newData];
    });
  };

  const AddNewSugicalHistory = (newSurgicalHistory: any) => {
    const newData = {
      surgery: newSurgicalHistory.surgery,
      year: newSurgicalHistory.year,
      parent: params.id,
      parentfield: "surgical_histories",
      parenttype: "CMR Service",
      doctype: "Surgical History",
    };

    setSurgicalHisotryData((prev: any) => {
      return [...prev, newData];
    });
  };

  const AddNewEmployeeHousing = (newEmployeeHousing: any) => {
    const newData = {
      question_tag: newEmployeeHousing.question_tag,
      question: newEmployeeHousing.question,
      yes_no: newEmployeeHousing.yes_no,
      answer: newEmployeeHousing.answer,
      parent: params.id,
      parentfield: "employment_housing_transportation",
      parenttype: "CMR Service",
      doctype: "Environmental Factors Questionnaires",
    };

    setemployeeHousingData((prev: any) => {
      return [...prev, newData];
    });
  };

  const addNewPrescriber = async () => {
    const isValid = await trigger();
    if (isValid) {
      const URL = BASE_URL + API.SAVE_DOCS;
      const NewData = {
        doctype: "Prescriber",
        owner: Cookies.get("email"),
        docstatus: 0,
        naming_series: "P.#",
        ...getValues(),
        ...comboBoxKeyValues,
      };

      try {
        const response = await axiosPOSTAPI(URL, {
          doc: JSON.stringify(NewData),
          action: "Save",
        });
        if (response.status !== 200) {          
          toast("please filled all required fields");
        }
        if (response.status === 200) {
          toast.success("Prescriber Created Successfully");
          setComboBoxKeyValues((prev: any) => ({ ...prev, "prescriber": response.data.docs[0].name}));
        }
        return 200;
      } catch (error: any) {
        toast("please filled all required fields");
      }
    }
  };

  const addNewAllergy = async () => {
    const isValid = await trigger();
    if (isValid) {
      const URL = BASE_URL + API.SAVE_DOCS;
      const NewData = {
        doctype: "Allergy",
        owner: Cookies.get("email"),
        docstatus: 0,
        naming_series: "P.#",
        allergy: getValues('allergy'),
        code: getValues('code'),
        symptoms: getValues('symptoms'),
        reasoncause: getValues('reasoncause'),
      };

      try {
        const response = await axiosPOSTAPI(URL, {
          doc: JSON.stringify(NewData),
          action: "Save",
        });
        if (response.status !== 200) {
          toast("please filled all required fields");
        }
        if (response.status === 200) {
          setComboBoxKeyValues((prev: any) => ({ ...prev, "allergies": response.data.docs[0].allergy}));
          toast.success("Allergy Created Successfully");
        }
        return 200;
      } catch (error: any) {
        toast("please filled all required fields");
      }
    }
  };

  const addNewDiagnosis = async () => {
    const isValid = await trigger();
    if (isValid) {
      const URL = BASE_URL + API.SAVE_DOCS;
      const NewData = {
        doctype: "Diagnosis",
        owner: Cookies.get("email"),
        docstatus: 0,
        naming_series: "P.#",
        diagnosis: getValues('diagnosis'),
        custom_category: getValues('custom_category'),
        custom_code: comboBoxKeyValues?.custom_code
      };

      try {
        const response = await axiosPOSTAPI(URL, {
          doc: JSON.stringify(NewData),
          action: "Save",
        });
        if (response.status !== 200) {
          toast("please filled all required fields");
        }
        if (response.status === 200) {
          setComboBoxKeyValues((prev: any) => ({ ...prev, "health_condition": response.data.docs[0].diagnosis}));
          toast.success("Diagnosis Created Successfully");
        }
        return 200;
      } catch (error: any) {
        toast("please filled all required fields");
      }
    }
  };

  const handleInputChangesCombobox = async (value: string, label: string) => {
    setComboBoxKeyValues((prev: any) => ({ ...prev, [label]: value }));
  };

  const handleChange = (e: any) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: any) => {
    if (e.key === ' ') {
      const words = inputValue?.trim().split(' ');
      const lastWord = words[words.length - 1];
      const match = data.message.find((item: any) => item.value.toLowerCase() === lastWord.toLowerCase());
      if (match) {
        words[words.length - 1] = match.label;
        setInputValue(words.join(' ').toLowerCase() + '');
      } else {
        setInputValue(prev => prev.toLowerCase() + '');
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const URL = BASE_URL + API.SEARCH_DROPDOWN_LIST;
      const response = await axiosPOSTAPI(
        URL,
        { doctype: "Sig Code", docname: "docname", ignore_user_permissions: 0, page_length: 0, txt: "" },
        {
          headers: {
            Authorization: Cookies.get("Authorization"),
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setData(response.data)
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className="mt-5">
        {/* Allergies, Medical and Surgical History */}
        <Accordion type="multiple">
          <AccordionItem value="item-1" className="bg-[#F6F9FD] my-4 pl-4 mt-5  mx-1 border border-[#E0E0E0]">
            <AccordionTrigger className="text-left mb-1 heading-text-xl font-semibold text-[#474747]">
              Allergies, Medical and Surgical History
            </AccordionTrigger>
            <AccordionContent>
              <div className="mr-5 ml-2 bg-[#F4F5F7] border">
                <h4 className="m-3 font-semibold heading-text-xl text-[#333333]">
                  Medications
                </h4>
                <hr className="border border-[#D4D6DD]" />
                <div className="m-4 grid gap-4">
                  <DataTable
                    columns={MedicationColumns}
                    data={selectMedicalCardData}
                    label={"Medication"}
                    userSettingLabel={"CMR Medications"}
                    onOpen={openMedicationDrawer}
                    setData={setMedicationCardData}
                    tableViewFieldState={tableViewFieldState}
                    setTableViewFieldState={setTableViewFieldState}
                    allFields={MedicationDataLabel}
                    doctype="CMR Service"
                    addable
                    editable
                    setEditDataIndex={setEditDataIndexForMedication}
                    onEditOpen={onOpen}
                  />
                  <CustomDrawer
                    open={open}
                    setOpen={onOpen}
                    title="Search & Edit Medication"
                    classNameDrawer="rounded-l-xl"
                    contentChilder={
                      <div className="mr-5 mt-5 space-y-3">
                        {showResponse &&

                          <div className="flex border border-solid bg-[#61CE701A] border-[#61CE70] py-[15px] md:py-[10px] px-[10px] md:px-[10px] rounded-[10px]">
                            <p className="text-[#61CE70] ml-2 text-sm md:text-base">Success! Your form has been successfully submitted. Please proceed to fill out the next Medication.</p>
                          </div>
                        }
                        <div className="space-y-4 bg-[#F6F9FD] border border-[#E0E0E0] p-3 rounded-xl flex flex-col">

                          <div className="border-b border-solid pb-2">
                            <Label className="text-[#303348] font-semibold text-lg align-middle">
                              Add Medication
                            </Label>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full h-full">
                            <div className="grid w-full items-center gap-1.5 col-span-1 md:col-span-3">
                              <Label className="text-[#303348] xl:text-sm text-xs font-medium">
                                Medication Name
                              </Label>
                              <ComboboxDropDown
                                label="medication_name"
                                placeholder="Select Medicaltion"
                                doctype="Medication"
                                referenceDoctype="Event Services"
                                handleInputChange={handleInputChangesCombobox}
                                dataValue={comboBoxKeyValues?.medication_name}
                              />
                            </div>
                            <div className="grid w-full items-center gap-1.5 col-span-1">
                              <div className="flex w-full">
                                <div className="w-full">
                                  <Label className="text-[#303348] xl:text-sm text-xs font-medium">
                                    Prescriber
                                  </Label>
                                  <ComboboxDropDown
                                    label="prescriber"
                                    placeholder="Select Prescriber"
                                    doctype="Prescriber"
                                    className="w-full"
                                    handleInputChange={handleInputChangesCombobox}
                                    dataValue={comboBoxKeyValues?.prescriber}
                                  />
                                </div>
                                <div className="flex items-end ml-2">
                                  <Button variant={"outline"} onClick={() => onOpenPrescriber(true)}>
                                    <img
                                      src={ImmunizationServiceAddPatientIcon.path}
                                      alt={ImmunizationServiceAddPatientIcon.alt}
                                      className="w-8 h-8 min-w-8 min-h-8"
                                    />
                                  </Button>
                                </div>
                              </div>
                            </div>
                            <div className="grid w-full items-center gap-1.5 col-span-1">
                              <Label className="text-[#303348] xl:text-sm text-xs font-medium">
                                Diagnosis
                              </Label>
                              <ComboboxDropDown
                                label="related_conditions"
                                placeholder="Select Diagnosis"
                                doctype="Diagnosis"
                                handleInputChange={handleInputChangesCombobox}
                                dataValue={comboBoxKeyValues?.related_conditions}
                              />
                            </div>

                            <div className="grid w-full items-center gap-1.5 col-span-1">
                              <Label className="text-[#303348] xl:text-sm text-xs font-medium">
                                Direction
                              </Label>
                              <InputSMResponsive
                                type="text"
                                value={inputValue}
                                onChange={handleChange}
                                onKeyDown={handleKeyDown}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-end gap-2 ">
                          <Button
                            className="text-white bg-[#47BDFF] hover:bg-[#3EA4DE] rounded-xl"
                            onClick={
                              () => {
                                if (editDataIndexForMedication === null) {
                                  AddNewMedication()
                                } else {
                                  EditMedication(editDataIndexForMedication)
                                  setEditDataIndexForMedication(null)
                                }
                                onOpen(false);
                              }
                            }
                          >
                            Save & Close
                          </Button>
                          <Button
                            className="text-white bg-[#47BDFF] hover:bg-[#3EA4DE] rounded-xl"
                            onClick={() => {
                              if (editDataIndexForMedication === null) {
                                AddNewMedication()
                              } else {
                                EditMedication(editDataIndexForMedication)
                                setEditDataIndexForMedication(null)

                              }
                              setComboBoxKeyValues({})
                              setInputValue("")
                              setShowResponse(true)
                              setTimeout(() => {
                                setShowResponse(false)
                              }, 2000);
                            }}
                          >
                            Save & Add
                          </Button>
                        </div>
                      </div>

                    }
                  />
                  <CustomDrawer
                    open={openPrescriber}
                    setOpen={onOpenPrescriber}
                    title="New Prescriber"
                    classNameDrawer="rounded-l-xl h-[70vh] top-[15%]"
                    contentChilder={
                      <div className="mr-5 mt-5 space-y-3">
                        <div className="space-y-4 bg-[#F6F9FD] border border-[#E0E0E0] p-3 rounded-xl flex flex-col">

                          <div className="border-b border-solid pb-2">
                            <Label className="text-[#303348] font-semibold text-lg align-middle">
                              Add new Prescriber
                            </Label>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                            <div className="grid w-full items-center gap-1.5">
                              <Label className="text-[#303348] xl:text-sm text-xs font-medium">
                                Salutation
                              </Label>
                              <ComboboxDropDown
                                label="salutation"
                                placeholder="Select Salutation"
                                doctype="Salutation"
                                referenceDoctype="Event Services"
                                handleInputChange={handleInputChangesCombobox}
                                dataValue={comboBoxKeyValues?.salutation}
                              />
                            </div>
                            <div className="grid w-full items-center gap-1.5">
                              <Label className="text-[#303348] xl:text-sm text-xs font-medium">
                                Preferred Contact Method
                              </Label>
                              <ComboboxDropDown
                                label="preferred_contact_method"
                                placeholder="Select Contact Method"
                                doctype="Medication"
                                referenceDoctype="Event Services"
                                handleInputChange={handleInputChangesCombobox}
                                dataValue={comboBoxKeyValues?.preferred_contact_method}
                                staticValue={[
                                  {
                                    value: "SMS",
                                  },
                                  {
                                    value: "Call",
                                  },
                                  {
                                    value: "Fax",
                                  },
                                  {
                                    value: "Do Not Call",
                                  },
                                ]}
                              />
                            </div>
                            <div className="grid w-full items-center gap-1.5">
                              <Label className="text-[#303348] xl:text-sm text-xs font-medium">
                                Prescriber Name
                              </Label>
                              <InputSMResponsive
                                type="text"
                                placeholder=""
                                {...register("prescriber_name")}
                              />
                            </div>
                            <div className="grid w-full items-center gap-1.5">
                              <Label className="text-[#303348] xl:text-sm text-xs font-medium">
                                Address
                              </Label>
                              <InputSMResponsive
                                type="text"
                                placeholder=""
                                {...register("prescriber_name")}
                              />
                            </div>
                            <div className="grid w-full items-center gap-1.5">
                              <Label className="text-[#303348] xl:text-sm text-xs font-medium">
                                phone_no
                              </Label>
                              <InputSMResponsive
                                type="number"
                                placeholder=""
                                {...register("phone_no")}
                              />
                            </div>
                            <div className="grid w-full items-center gap-1.5">
                              <Label className="text-[#303348] xl:text-sm text-xs font-medium">
                                SureSripts Prescriber ID
                              </Label>
                              <InputSMResponsive
                                type="text"
                                placeholder=""
                                {...register("suresripts_prescriber_id")}
                              />
                            </div>
                            <div className="grid w-full items-center gap-1.5">
                              <Label className="text-[#303348] xl:text-sm text-xs font-medium">
                                Email
                              </Label>
                              <InputSMResponsive
                                type="text"
                                placeholder=""
                                {...register("email")}
                              />
                            </div>
                            <div className="grid w-full items-center gap-1.5">
                              <Label className="text-[#303348] xl:text-sm text-xs font-medium">
                                Specialty
                              </Label>
                              <InputSMResponsive
                                type="text"
                                placeholder=""
                                {...register("speciality")}
                              />
                            </div>
                            <div className="grid w-full items-center gap-1.5">
                              <Label className="text-[#303348] xl:text-sm text-xs font-medium">
                                Fax Number
                              </Label>
                              <InputSMResponsive
                                type="text"
                                placeholder=""
                                {...register("fax_no")}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-end gap-2 ">
                          <Button
                            className="text-white bg-[#47BDFF] hover:bg-[#3EA4DE] rounded-xl"
                            onClick={
                              () => {
                                addNewPrescriber()
                                onOpenPrescriber(false);
                              }
                            }
                          >
                            Save
                          </Button>
                        </div>
                      </div>

                    }
                  />
                </div>
              </div>

              <div className="mr-5 mb-5 ml-2 bg-[#F4F5F7] border">
                <h4 className="m-3 font-semibold heading-text-xl text-[#333333]">
                  Health Conditions
                </h4>
                <hr className="border border-[#D4D6DD]" />
                <div className="m-4 flex flex-wrap gap-4">
                  <DataTable
                    columns={HelthConditionsColumns}
                    data={selectDiagnosisCardData}
                    label={"Diagnosis"}
                    userSettingLabel={"CMR Medications"}
                    onOpen={openDiagnosisDrawer}
                    setData={setDiagnosisCardData}
                    tableViewFieldState={tableViewFieldState}
                    setTableViewFieldState={setTableViewFieldState}
                    allFields={MedicationDataLabel}
                    doctype="CMR Service"
                    addable
                    editable
                    setEditDataIndex={setEditDataIndexForDiagnosis}
                    onEditOpen={onOpenDiagnosis}
                  />
                  <CustomDrawer
                    open={openDiagnosis}
                    setOpen={onOpenDiagnosis}
                    title="Search & Edit Diagnosis"
                    classNameDrawer="rounded-l-xl"
                    contentChilder={
                      <div className="mr-5 mt-5 space-y-3">
                        {showResponse &&

                          <div className="flex border border-solid bg-[#61CE701A] border-[#61CE70] py-[15px] md:py-[10px] px-[10px] md:px-[10px] rounded-[10px]">
                            <p className="text-[#61CE70] ml-2 text-sm md:text-base">Success! Your form has been successfully submitted. Please proceed to fill out the next Medication.</p>
                          </div>
                        }
                        <div className="space-y-4 bg-[#F6F9FD] border border-[#E0E0E0] p-3 rounded-xl flex flex-col">
                          <div className="border-b border-solid pb-2">
                            <Label className="text-[#303348] font-semibold text-lg align-middle">
                              Add Diagnosis
                            </Label>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full h-full">
                            <div className="grid w-full items-center gap-1.5">
                              <div className="flex w-full">
                                <div className="w-full">
                                  <Label className="text-[#303348] xl:text-sm text-xs font-medium">
                                    Diagnosis Name
                                  </Label>
                                  <ComboboxDropDown
                                    label="health_condition"
                                    placeholder="Select Diagnosis"
                                    doctype="Diagnosis"
                                    className="w-full"
                                    handleInputChange={handleInputChangesCombobox}
                                    dataValue={comboBoxKeyValues?.health_condition}
                                  />
                                </div>
                                <div className="flex items-end ml-2">
                                  <Button variant={"outline"} onClick={() => onOpenNewDiagnosis(true)}>
                                    <img
                                      src={ImmunizationServiceAddPatientIcon.path}
                                      alt={ImmunizationServiceAddPatientIcon.alt}
                                      className="w-8 h-8 min-w-8 min-h-8"
                                    />
                                  </Button>
                                </div>
                              </div>
                            </div>
                            <div className="grid w-full items-center gap-1.5">
                              <Label className="text-[#303348] xl:text-sm text-xs font-medium">
                                Category
                              </Label>
                              <InputSMResponsive
                                type="text"
                                placeholder=""
                                {...register("custom_category")}
                              />
                            </div>

                            <div className="grid w-full items-center gap-1.5">
                              <Label className="text-[#303348] xl:text-sm text-xs font-medium">
                                Code Value
                              </Label>
                              <ComboboxDropDown
                                label="custom_code"
                                placeholder="Select Code Value"
                                doctype="Code Value"
                                handleInputChange={handleInputChangesCombobox}
                                dataValue={comboBoxKeyValues?.custom_code}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-end gap-2 ">
                          <Button
                            className="text-white bg-[#47BDFF] hover:bg-[#3EA4DE] rounded-xl"
                            onClick={() => {
                              if (editDataIndexForDiagnosis === null) {
                                AddNewDiagnosis()
                              } else {
                                EditDiagnosis(editDataIndexForDiagnosis)
                              }
                              onOpenDiagnosis(false);
                            }}
                          >
                            Save & Close
                          </Button>
                          <Button
                            className="text-white bg-[#47BDFF] hover:bg-[#3EA4DE] rounded-xl"
                            onClick={() => {
                              if (editDataIndexForDiagnosis === null) {
                                AddNewDiagnosis()
                              } else {
                                EditDiagnosis(editDataIndexForDiagnosis)
                                setEditDataIndexForDiagnosis(null)
                              }
                              setComboBoxKeyValues({})
                              setValue("category", "");
                              setShowResponse(true)
                              setTimeout(() => {
                                setShowResponse(false)
                              }, 2000);
                            }}
                          >
                            Save & Add
                          </Button>
                        </div>
                      </div>
                    }
                  />
                  <CustomDrawer
                    open={openNewDiagnosis}
                    setOpen={onOpenNewDiagnosis}
                    title="New Diagnosis"
                    classNameDrawer="rounded-l-xl h-[70vh] top-[15%]"
                    contentChilder={
                      <div className="mr-5 mt-5 space-y-3">
                        <div className="space-y-4 bg-[#F6F9FD] border border-[#E0E0E0] p-3 rounded-xl flex flex-col">

                          <div className="border-b border-solid pb-2">
                            <Label className="text-[#303348] font-semibold text-lg align-middle">
                              Add new Diagnosis
                            </Label>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full h-full">
                            <div className="grid w-full items-center gap-1.5">
                              <Label className="text-[#303348] xl:text-sm text-xs font-medium">
                                Diagnosis
                              </Label>
                              <InputSMResponsive
                                type="text"
                                placeholder=""
                                {...register("diagnosis")}
                              />
                            </div>
                            <div className="grid w-full items-center gap-1.5">
                              <Label className="text-[#303348] xl:text-sm text-xs font-medium">
                                Code
                              </Label>
                              <ComboboxDropDown
                                label="custom_code"
                                placeholder="Select Code"
                                doctype="Code Value"
                                referenceDoctype="Diagnosis"
                                handleInputChange={handleInputChangesCombobox}
                                dataValue={comboBoxKeyValues?.custom_code}
                              />
                            </div>
                            <div className="grid w-full items-center gap-1.5">
                              <Label className="text-[#303348] xl:text-sm text-xs font-medium">
                                Category
                              </Label>
                              <InputSMResponsive
                                type="text"
                                placeholder=""
                                {...register("custom_category")}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-end gap-2 ">
                          <Button
                            className="text-white bg-[#47BDFF] hover:bg-[#3EA4DE] rounded-xl"
                            onClick={
                              () => {
                                addNewDiagnosis()
                                onOpenNewDiagnosis(false);
                              }
                            }
                          >
                            Save
                          </Button>
                        </div>
                      </div>

                    }
                  />
                </div>
              </div>

              <div className="mr-5 mb-5 ml-2 bg-[#F4F5F7] border">
                <h4 className="m-3 font-semibold heading-text-xl text-[#333333]">
                  Drug Allergies + Side Effects
                </h4>
                <hr className="border border-[#D4D6DD]" />
                <div className="m-4 flex flex-wrap gap-4">
                  <DataTable
                    columns={AllergiesColumns}
                    data={selectDrugAllergiesCardData}
                    label={"Allergy"}
                    userSettingLabel={"CMR Medications"}
                    onOpen={openAllergiesDrawer}
                    setData={setDrugAllergiesCardData}
                    tableViewFieldState={tableViewFieldState}
                    setTableViewFieldState={setTableViewFieldState}
                    allFields={MedicationDataLabel}
                    doctype="CMR Service"
                    addable
                    editable
                    setEditDataIndex={setEditDataIndexForAllergie}
                    onEditOpen={onOpenAllergies}
                  />
                  <CustomDrawer
                    open={openAllergies}
                    setOpen={onOpenAllergies}
                    title="Search & Edit Allergies"
                    classNameDrawer="rounded-l-xl"
                    contentChilder={
                      <div className="mr-5 mt-5 space-y-3">
                        {showResponse &&

                          <div className="flex border border-solid bg-[#61CE701A] border-[#61CE70] py-[15px] md:py-[10px] px-[10px] md:px-[10px] rounded-[10px]">
                            <p className="text-[#61CE70] ml-2 text-sm md:text-base">Success! Your form has been successfully submitted. Please proceed to fill out the next Medication.</p>
                          </div>
                        }
                        <div className="space-y-4 bg-[#F6F9FD] border border-[#E0E0E0] p-3 rounded-xl flex flex-col">
                          <div className="border-b border-solid pb-2">
                            <Label className="text-[#303348] font-semibold text-lg align-middle">
                              Add Allergies
                            </Label>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full h-full">
                            <div className="grid w-full items-center gap-1.5">
                              <div className="flex w-full">
                                <div className="w-full">
                                  <Label className="text-[#303348] xl:text-sm text-xs font-medium">
                                    Allergies
                                  </Label>
                                  <ComboboxDropDown
                                    label="allergies"
                                    placeholder="Select Allergy"
                                    doctype="Allergy"
                                    handleInputChange={handleInputChangesCombobox}
                                    dataValue={comboBoxKeyValues?.allergies}
                                  />
                                </div>
                                <div className="flex items-end ml-2">
                                  <Button variant={"outline"} onClick={() => onOpenNewAllergies(true)}>
                                    <img
                                      src={ImmunizationServiceAddPatientIcon.path}
                                      alt={ImmunizationServiceAddPatientIcon.alt}
                                      className="w-8 h-8 min-w-8 min-h-8"
                                    />
                                  </Button>
                                </div>
                              </div>
                            </div>
                            <div className="grid w-full items-center gap-1.5">
                              <Label className="text-[#303348] xl:text-sm text-xs font-medium">
                                Reactions
                              </Label>
                              <InputSMResponsive
                                type="text"
                                placeholder=""
                                {...register("reaction")}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-end gap-2 ">
                          <Button
                            className="text-white bg-[#47BDFF] hover:bg-[#3EA4DE] rounded-xl"
                            onClick={() => {
                              if (editDataIndexForAllergie === null) {
                                AddNewDrugAllergies()
                              } else {
                                EditAllergies(editDataIndexForAllergie)
                                setEditDataIndexForAllergie(null)
                              }
                              onOpenAllergies(false)
                            }}
                          >
                            Save & Close
                          </Button>
                          <Button
                            className="text-white bg-[#47BDFF] hover:bg-[#3EA4DE] rounded-xl"
                            onClick={() => {
                              if (editDataIndexForAllergie === null) {
                                AddNewDrugAllergies()
                              } else {
                                EditAllergies(editDataIndexForAllergie)
                                setEditDataIndexForAllergie(null)
                              }
                              setComboBoxKeyValues({})
                              setValue("reaction", "");
                              setShowResponse(true)
                              setTimeout(() => {
                                setShowResponse(false)
                              }, 2000);
                            }}
                          >
                            Save & Add
                          </Button>
                        </div>
                      </div>
                    }
                  />
                  <CustomDrawer
                    open={openNewAllergies}
                    setOpen={onOpenNewAllergies}
                    title="New Allergy"
                    classNameDrawer="rounded-l-xl h-[70vh] top-[15%]"
                    contentChilder={
                      <div className="mr-5 mt-5 space-y-3">
                        <div className="space-y-4 bg-[#F6F9FD] border border-[#E0E0E0] p-3 rounded-xl flex flex-col">

                          <div className="border-b border-solid pb-2">
                            <Label className="text-[#303348] font-semibold text-lg align-middle">
                              Add new Allergy
                            </Label>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full h-full">
                            <div className="grid w-full items-center gap-1.5">
                              <Label className="text-[#303348] xl:text-sm text-xs font-medium">
                                Allergy
                              </Label>
                              <InputSMResponsive
                                type="text"
                                placeholder=""
                                {...register("allergy")}
                              />
                            </div>
                            <div className="grid w-full items-center gap-1.5">
                              <Label className="text-[#303348] xl:text-sm text-xs font-medium">
                                Code
                              </Label>
                              <InputSMResponsive
                                type="text"
                                placeholder=""
                                {...register("code")}
                              />
                            </div>
                            <div className="grid w-full items-center gap-1.5">
                              <Label className="text-[#303348] xl:text-sm text-xs font-medium">
                                Reason/Cause
                              </Label>
                              <TextArea
                                placeholder=""
                                {...register("reasoncause")}
                              />
                            </div>
                            <div className="grid w-full items-center gap-1.5">
                              <Label className="text-[#303348] xl:text-sm text-xs font-medium">
                                Symptoms
                              </Label>
                              <TextArea
                                placeholder=""
                                {...register("symptoms")}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-end gap-2 ">
                          <Button
                            className="text-white bg-[#47BDFF] hover:bg-[#3EA4DE] rounded-xl"
                            onClick={
                              () => {
                                addNewAllergy()
                                onOpenNewAllergies(false);
                              }
                            }
                          >
                            Save
                          </Button>
                        </div>
                      </div>

                    }
                  />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Social History Section */}
          <AccordionItem value="item-2" className="bg-[#F6F9FD] my-4 pl-4 mt-5  mx-1 border border-[#E0E0E0]">
            <AccordionTrigger className="text-left mb-1 heading-text-xl font-semibold text-[#474747]">
              Social History Section
            </AccordionTrigger>
            <AccordionContent>
              <Separator orientation="horizontal" className="mb-4" />
              {/* <div className="grid  2xl:grid-cols-2 sm:grid-cols-1 gap-4">
                <div className="grid w-full max-w-prose items-center gap-1.5">
                  <LabelSMResponsive className="text-[#616161]">
                    Occupation
                  </LabelSMResponsive>
                  <InputSMResponsive
                    type="text"
                    className="mx-1"
                    defaultValue={getAPIDataDocs?.occupation}
                    {...registerPropValue("occupation")}
                  />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <LabelSMResponsive className="text-[#616161]">
                    Marital Status
                  </LabelSMResponsive>
                  <RadioGroup
                    defaultValue="single"
                    className="flex bg-white p-2 rounded-2xl border-[#DDDDDD] border-2 border-opacity-40 w-auto"
                  >
                    <div className="grid lg:grid-cols-4 sm:grid-cols-2 gap-2 w-full">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="Single"
                          id="singlePersonalSocialHistory"
                          className="text-[#7ACFFF] data-[state=checked]:border-[#7ACFFF] border-[#C6C6C6]"
                          onClick={handlerSetMaritalStatus}
                          checked={selectMaritalStatus === "Single"}
                        />
                        <LabelSMResponsive
                          htmlFor="singlePersonalSocialHistory"
                          className="text-[#616161]"
                        >
                          Single
                        </LabelSMResponsive>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="Married"
                          id="marriedPersonalSocialHistory"
                          className="text-[#7ACFFF] data-[state=checked]:border-[#7ACFFF] border-[#C6C6C6]"
                          onClick={handlerSetMaritalStatus}
                          checked={selectMaritalStatus === "Married"}
                        />
                        <LabelSMResponsive
                          htmlFor="marriedPersonalSocialHistory"
                          className="text-[#616161]"
                        >
                          Married
                        </LabelSMResponsive>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="Divorced"
                          id="divorcedPersonalSocialHistory"
                          className="text-[#7ACFFF] data-[state=checked]:border-[#7ACFFF] border-[#C6C6C6]"
                          onClick={handlerSetMaritalStatus}
                          checked={selectMaritalStatus === "Divorced"}
                        />
                        <LabelSMResponsive
                          htmlFor="divorcedPersonalSocialHistory"
                          className="text-[#616161]"
                        >
                          Divorced
                        </LabelSMResponsive>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="Widow"
                          id="widowPersonalSocialHistory"
                          className="text-[#7ACFFF] data-[state=checked]:border-[#7ACFFF] border-[#C6C6C6]"
                          onClick={handlerSetMaritalStatus}
                          checked={selectMaritalStatus === "Widow"}
                        />
                        <LabelSMResponsive
                          htmlFor="widowPersonalSocialHistory"
                          className="text-[#616161]"
                        >
                          Widow
                        </LabelSMResponsive>
                      </div>
                    </div>
                  </RadioGroup>
                </div>
              </div> */}
              {/* <Separator orientation="horizontal" className="my-4"/> */}

              <div className="mt-4 grid lg:grid-cols-2 gap-9  mr-5">
                <div className="w-full">
                  <LabelSMResponsive className="text-[#707070] font-semibold text-md mb-2">
                    1. Do you currently use or have you ever used tobacco
                    products?
                  </LabelSMResponsive>
                  <RadioGroup defaultValue="Yes" className="flex gap-5 mt-2">
                    <div
                      className={`flex items-center space-x-2  ${usedTobacoProduct === "Yes"
                        ? "bg-[#7ACFFF]"
                        : "border-2 border-[#DDDDDD] bg-white"
                        }  rounded-3xl p-2`}
                    >
                      <RadioGroupItem
                        value="Yes"
                        id="yesSocialHistorySection"
                        className={`${usedTobacoProduct === "Yes" &&
                          "border-[#FFFFFF] text-[#FFFFFF]"
                          }`}
                        onClick={handlerSetUsedTobacoProductChange}
                        checked={usedTobacoProduct === "Yes"}
                      />
                      <LabelSMResponsive
                        htmlFor="yesSocialHistorySection"
                        className={`${usedTobacoProduct === "Yes"
                          ? "text-[#FFFFFF]"
                          : "text-[#616161]"
                          } font-semibold`}
                      >
                        Yes
                      </LabelSMResponsive>
                    </div>
                    <div
                      className={`flex items-center space-x-2  ${usedTobacoProduct === "No"
                        ? "bg-[#7ACFFF]"
                        : "border-2 border-[#DDDDDD] bg-white"
                        }  rounded-3xl p-2`}
                    >
                      <RadioGroupItem
                        value="No"
                        id="noSocialHistorySection"
                        className={` ${usedTobacoProduct === "No" &&
                          "border-[#FFFFFF] text-[#FFFFFF]"
                          } `}
                        onClick={handlerSetUsedTobacoProductChange}
                        checked={usedTobacoProduct === "No"}
                      />
                      <LabelSMResponsive
                        htmlFor="noSocialHistorySection"
                        className={`${usedTobacoProduct === "No"
                          ? "text-[#FFFFFF]"
                          : "text-[#616161]"
                          } font-semibold`}
                      >
                        No
                      </LabelSMResponsive>
                    </div>
                  </RadioGroup>
                </div>
                {/* <div className="w-full">
                    <LabelSMResponsive className="text-[#707070] font-semibold text-md mb-2">
                      when did you first start smoking?
                    </LabelSMResponsive>
                    <InputSMResponsive className="mx-1" defaultValue={getAPIDataDocs?.custom_when_did_you_first_start_smoking}/>
                  </div> */}
              </div>
              <div className="mt-5 grid lg:grid-cols-2 gap-9  mr-5">
                <div className="w-full flex gap-2">
                  <Checkbox
                    id="current-cigarette-smoker"
                    checked={selectCurrentCigaretteSmoker}
                    onCheckedChange={handlerSetCurrentCigaretteSmoker}
                  />
                  <LabelSMResponsive
                    htmlFor="current-cigarette-smoker"
                    className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[#616161]"
                  >
                    Current cigarette smoker
                  </LabelSMResponsive>
                </div>

                <div className="w-full flex gap-2">
                  <Checkbox
                    id="former-cigarette-smoker"
                    checked={selectFormerCigaretteSmoker}
                    onCheckedChange={handlerSetFormerCigaretteSmoker}
                  />
                  <LabelSMResponsive
                    htmlFor="former-cigarette-smoker"
                    className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[#616161]"
                  >
                    Former cigarette smoker
                  </LabelSMResponsive>
                </div>
              </div>
              <div className="mt-5 mr-5 grid lg:grid-cols-2 gap-9">
                <div className="w-full">
                  <LabelSMResponsive className="text-[#707070] font-semibold text-md mb-2">
                    when did you first start smoking?
                  </LabelSMResponsive>
                  {/* <InputSMResponsive
                      className="mx-1"
                      defaultValue={
                        getAPIDataDocs?.custom_when_did_you_first_start_smoking
                      }
                      {...registerPropValue("custom_when_did_you_first_start_smoking")}
                    /> */}
                  <ComboboxDropDown
                    doctype="Year"
                    placeholder="select year"
                    label="custom_when_did_you_first_start_smoking"
                    handleInputChange={handleInputChangeComboBox}
                    dataValue={getAPIDataDocs?.when_did_you_first_start_smoking}
                  />
                </div>
                {/* <div className="w-full">
                    <LabelSMResponsive className="text-[#707070] font-semibold text-md mb-2">
                      when did you first quit smoking?
                    </LabelSMResponsive>
                    <InputSMResponsive className="mx-1" />
                  </div> */}
              </div>
              <div className="mt-5 grid lg:grid-cols-2 gap-4  mr-5">
                <div className="w-full flex gap-2">
                  <Checkbox
                    id="other-tobbaco-user"
                    checked={selectOtherTobbacoUser}
                    onCheckedChange={handlersetOtherTobbacoUser}
                  />
                  <LabelSMResponsive
                    htmlFor="other-tobbaco-user"
                    className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[#616161]"
                  >
                    Other tobacco user (Circle:cigars, hookah, chew, vape).
                  </LabelSMResponsive>
                </div>
                {/* <div className="w-full  lg:ml-4">
                  <LabelSMResponsive className="text-[#707070] font-semibold mb-2">
                    On average how many cigarettes did you smoke per
                    day(Cigarette)?
                  </LabelSMResponsive>
                  <InputSMResponsive
                    className=""
                    defaultValue={
                      getAPIDataDocs?.custom_on_average_how_many_cigarettes_did_you_smoke_per_day
                    }
                    {...registerPropValue(
                      "custom_on_average_how_many_cigarettes_did_you_smoke_per_day"
                    )}
                  />
                </div> */}
              </div>
              <div className="mt-5  mr-5">
                <div className="">
                  <LabelSMResponsive className="text-[#707070] font-semibold mb-2">
                    When did you quit smoking?
                  </LabelSMResponsive>

                  <ComboboxDropDown
                    doctype="Year"
                    placeholder="select year"
                    label="custom_when_did_you_quit_smoking"
                    buttonClassName=""
                    handleInputChange={handleInputChangeComboBox}
                    dataValue={getAPIDataDocs?.when_did_you_quit_smoking}
                  />
                </div>
              </div>
              <Separator orientation="horizontal" className="my-4" />
              <div className="mt-5  mr-5">
                <div className="">
                  <LabelSMResponsive className="text-[#707070] font-semibold mb-2">
                    2. How many times in the past year have you had 4 or more
                    alcoholic drinks in 1 day?
                  </LabelSMResponsive>
                  <InputSMResponsive
                    className="mx-1 "
                    defaultValue={
                      getAPIDataDocs?.how_many_times_in_the_past_year
                    }
                    {...registerPropValue("how_many_times_in_the_past_year")}
                  />
                </div>
              </div>
              <Separator orientation="horizontal" className="my-4" />
              <div className="mt-5  mr-5">
                <div className="">
                  <LabelSMResponsive className="text-[#707070] font-semibold mb-2">
                    3. How many times in the past year have you used
                    recreational or prescription drug for non-medical reasons?
                  </LabelSMResponsive>
                  <InputSMResponsive
                    className="mx-1 "
                    defaultValue={
                      getAPIDataDocs?.past_year_have_you_had_4_or_more_alcoholic_drinks_iady
                    }
                    {...registerPropValue(
                      "past_year_have_you_had_4_or_more_alcoholic_drinks_iady"
                    )}
                  />
                </div>
              </div>
              <Separator orientation="horizontal" className="my-4" />

              <div className="mt-5  mr-5 grid xl:grid-cols-2  gap-4">
                <div className="w-full">
                  <LabelSMResponsive className="text-[#707070] font-semibold text-md mb-2">
                    4. If you use opioids, do you have access to Narcan
                    (Naloxone)?
                  </LabelSMResponsive>
                  <RadioGroup defaultValue="yes" className="flex gap-5 mt-2">
                    <div
                      className={`flex items-center space-x-2  ${accessToNarcan === "Not Applicable"
                        ? "bg-[#7ACFFF]"
                        : "border-2 border-[#DDDDDD] bg-white"
                        }  rounded-3xl p-2 w-fit`}
                    >
                      <RadioGroupItem
                        value="Not Applicable"
                        id="notApplicableAccessToNarcan"
                        className={`${accessToNarcan === "Not Applicable" &&
                          "border-[#FFFFFF] text-[#FFFFFF]"
                          }`}
                        onClick={handlerSetaccessToNarcanChange}
                        checked={accessToNarcan === "Not Applicable"}
                      />
                      <LabelSMResponsive
                        htmlFor="notApplicableAccessToNarcan"
                        className={`${accessToNarcan === "Not Applicable"
                          ? "text-[#FFFFFF]"
                          : "text-[#616161]"
                          } font-semibold`}
                      >
                        Not Applicable
                      </LabelSMResponsive>
                    </div>
                    <div
                      className={`flex items-center space-x-2  ${accessToNarcan === "Yes"
                        ? "bg-[#7ACFFF]"
                        : "border-2 border-[#DDDDDD] bg-white"
                        }  rounded-3xl p-2 w-fit`}
                    >
                      <RadioGroupItem
                        value="Yes"
                        id="yesAccessToNarcan"
                        className={`${accessToNarcan === "Yes" &&
                          "border-[#FFFFFF] text-[#FFFFFF]"
                          }`}
                        onClick={handlerSetaccessToNarcanChange}
                        checked={accessToNarcan === "Yes"}
                      />
                      <LabelSMResponsive
                        htmlFor="yesAccessToNarcan"
                        className={`${accessToNarcan === "Yes"
                          ? "text-[#FFFFFF]"
                          : "text-[#616161]"
                          } font-semibold`}
                      >
                        Yes
                      </LabelSMResponsive>
                    </div>
                    <div
                      className={`flex items-center space-x-2  ${accessToNarcan === "No"
                        ? "bg-[#7ACFFF]"
                        : "border-2 border-[#DDDDDD] bg-white"
                        }  rounded-3xl p-2 w-fit`}
                    >
                      <RadioGroupItem
                        value="No"
                        id="noAccessToNarcan"
                        className={` ${accessToNarcan === "No" &&
                          "border-[#FFFFFF] text-[#FFFFFF]"
                          } `}
                        onClick={handlerSetaccessToNarcanChange}
                        checked={accessToNarcan === "No"}
                      />
                      <LabelSMResponsive
                        htmlFor="noAccessToNarcan"
                        className={`${accessToNarcan === "No"
                          ? "text-[#FFFFFF]"
                          : "text-[#616161]"
                          } font-semibold`}
                      >
                        No
                      </LabelSMResponsive>
                    </div>
                  </RadioGroup>
                </div>
                <div className="w-full ">
                  <LabelSMResponsive className="text-[#707070] font-semibold text-md mb-2">
                    Are you interesting in quiting?
                  </LabelSMResponsive>
                  <RadioGroup
                    defaultValue="Ready to quit"
                    className="flex gap-5 mt-2"
                  >
                    <div
                      className={`flex items-center space-x-2  ${wantToQuit === "Thinking about quitting"
                        ? "bg-[#7ACFFF]"
                        : "border-2 border-[#DDDDDD] bg-white"
                        }  rounded-3xl p-2`}
                    >
                      <RadioGroupItem
                        value="Thinking about quitting"
                        id="thinkAboutQuitingInterestinginQuiting"
                        className={`${wantToQuit === "Thinking about quitting" &&
                          "border-[#FFFFFF] text-[#FFFFFF]"
                          }`}
                        onClick={handlerSetWantToQuitChange}
                        checked={wantToQuit === "Thinking about quitting"}
                      />
                      <LabelSMResponsive
                        htmlFor="thinkAboutQuitingInterestinginQuiting"
                        className={`${wantToQuit === "Thinking about quitting"
                          ? "text-[#FFFFFF]"
                          : "text-[#616161]"
                          } font-semibold`}
                      >
                        Think about quiting
                      </LabelSMResponsive>
                    </div>
                    <div
                      className={`flex items-center space-x-2  ${wantToQuit === "No"
                        ? "bg-[#7ACFFF]"
                        : "border-2 border-[#DDDDDD] bg-white"
                        }  rounded-3xl p-2 w-fit`}
                    >
                      <RadioGroupItem
                        value="No"
                        id="noInterestinginQuiting"
                        className={` ${wantToQuit === "No" &&
                          "border-[#FFFFFF] text-[#FFFFFF]"
                          } w-fit`}
                        onClick={handlerSetWantToQuitChange}
                        checked={wantToQuit === "No"}
                      />
                      <LabelSMResponsive
                        htmlFor="noInterestinginQuiting"
                        className={`${wantToQuit === "No"
                          ? "text-[#FFFFFF]"
                          : "text-[#616161]"
                          } font-semibold`}
                      >
                        No
                      </LabelSMResponsive>
                    </div>
                    <div
                      className={`flex items-center space-x-2  ${wantToQuit === "Ready to quit"
                        ? "bg-[#7ACFFF]"
                        : "border-2 border-[#DDDDDD] bg-white"
                        }  rounded-3xl p-2 w-fit`}
                    >
                      <RadioGroupItem
                        value="Ready to quit"
                        id="readyToQuiteInterestinginQuiting"
                        className={`${wantToQuit === "Ready to quit" &&
                          "border-[#FFFFFF] text-[#FFFFFF]"
                          }`}
                        onClick={handlerSetWantToQuitChange}
                        checked={wantToQuit === "Ready to quit"}
                      />
                      <LabelSMResponsive
                        htmlFor="readyToQuiteInterestinginQuiting"
                        className={`${wantToQuit === "Ready to quit"
                          ? "text-[#FFFFFF]"
                          : "text-[#616161]"
                          } font-semibold`}
                      >
                        Ready to quit
                      </LabelSMResponsive>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Family Health History */}
          <AccordionItem value="item-3" className="bg-[#F6F9FD] my-4 pl-4 mt-5  mx-1 border border-[#E0E0E0]">
            <AccordionTrigger className="text-left mb-1 heading-text-xl font-semibold text-[#474747]">
              Family Health History
            </AccordionTrigger>
            <AccordionContent>
              <Separator orientation="horizontal" />
              <p className="font-semibold label-text-base text-[#707070]">
                Have any of your blood relatives had any of the following? If
                so, please indicate which of your blood relatives have the
                condition.
              </p>
              <div className="my-3 flex flex-wrap gap-4">
                {selectFamilyHealthHistory.map(
                  (FamilyHealth: any, index: any) => (
                    <FamilyHealthCard
                      showData={true}
                      data={FamilyHealth}
                      index={index}
                      key={index}
                      setData={setFamilyHealthCardData}
                    />
                  )
                )}
                <FamilyHealthCard
                  showData={false}
                  addData={AddNewFamilyHealthHistory}
                />
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Past medical, surgical and hospitalization history Section */}
          <AccordionItem
            value="item-4"
            className="text-left bg-[#F6F9FD] my-4 pl-4 mt-5  mx-1 border border-[#E0E0E0]"
          >
            <AccordionTrigger className="mb-1 heading-text-xl font-semibold text-[#474747] text-left">
              Past medical, surgical and hospitalization history
            </AccordionTrigger>
            <AccordionContent>
              <Separator orientation="horizontal" />
              <p className="font-semibold label-text-lg text-[#616161]">
                Surgical History
              </p>
              <p className="font-semibold label-text-base text-[#707070]">
                What surgeries have you had in the past, and in what year?
              </p>
              <div className="my-3 flex flex-wrap gap-4">
                {/* {selectSurgicalHistory.map((SurgicalHistory: any, index) => (
                      <DrugAllergiesCard
                        showData={true}
                        data={SurgicalHistory}
                        index={index}
                        key={index}
                        setData={setSurgicalHisotryData}
                      />
  
                    ))}
                  <DrugAllergiesCard showData={false} addData={AddNewSugicalHistory}/> */}
                {selectSurgicalHistory.map(
                  (SurgicalHistory: any, index: any) => (
                    <DrugAllergiesCard
                      showData={true}
                      data1={SurgicalHistory.surgery}
                      data2={SurgicalHistory.year}
                      index={index}
                      key={index}
                      setData={setSurgicalHisotryData}
                      inputLabel={[
                        {
                          label: "Surgery",
                          value: "surgery",
                          data: SurgicalHistory.surgery,
                          type: "comboBox",
                          doctype: "Surgery",
                          placeholder: "select Surgery",
                        },
                        {
                          label: "Year",
                          value: "year",
                          data: SurgicalHistory.year,
                          type: "comboBox",
                          doctype: "Year",
                          placeholder: "select Year",
                        },
                      ]}
                    />
                  )
                )}
                <DrugAllergiesCard
                  showData={false}
                  addData={AddNewSugicalHistory}
                  inputLabel={[
                    {
                      label: "Surgery",
                      value: "surgery",
                      type: "comboBox",
                      doctype: "Surgery",
                      placeholder: "select Surgery",
                    },
                    {
                      label: "Year",
                      value: "year",
                      type: "comboBox",
                      doctype: "Year",
                      placeholder: "select Year",
                    },
                  ]}
                />
              </div>

              <div className="mt-5  mr-5 flex gap-4">
                <div className="w-full">
                  <LabelSMResponsive className="text-[#707070] font-semibold mb-2">
                    Have you ever injected or pumped silicone, oils, or other
                    substances for the purpose of body shaping? (Naloxone)?
                  </LabelSMResponsive>
                  <RadioGroup defaultValue="Yes" className="flex gap-5 mt-2">
                    <div
                      className={`flex items-center space-x-2  ${haveYouEverInjected === "Yes"
                        ? "bg-[#7ACFFF]"
                        : "border-2 border-[#DDDDDD] bg-white"
                        }  rounded-3xl p-2`}
                    >
                      <RadioGroupItem
                        value="Yes"
                        id="yesHaveYouEverInjected"
                        className={`${haveYouEverInjected === "Yes" &&
                          "border-[#FFFFFF] text-[#FFFFFF]"
                          }`}
                        onClick={handlerSetHaveYouEverInjectedChange}
                        checked={haveYouEverInjected === "Yes"}
                      />
                      <LabelSMResponsive
                        htmlFor="yesHaveYouEverInjected"
                        className={`${haveYouEverInjected === "Yes"
                          ? "text-[#FFFFFF]"
                          : "text-[#616161]"
                          } font-semibold`}
                      >
                        Yes
                      </LabelSMResponsive>
                    </div>
                    <div
                      className={`flex items-center space-x-2  ${haveYouEverInjected === "No"
                        ? "bg-[#7ACFFF]"
                        : "border-2 border-[#DDDDDD] bg-white"
                        }  rounded-3xl p-2`}
                    >
                      <RadioGroupItem
                        value="No"
                        id="noHaveYouEverInjected"
                        className={`${haveYouEverInjected === "No" &&
                          "border-[#FFFFFF] text-[#FFFFFF]"
                          }`}
                        onClick={handlerSetHaveYouEverInjectedChange}
                        checked={haveYouEverInjected === "No"}
                      />
                      <LabelSMResponsive
                        htmlFor="noHaveYouEverInjected"
                        className={`${haveYouEverInjected === "No"
                          ? "text-[#FFFFFF]"
                          : "text-[#616161]"
                          } font-semibold`}
                      >
                        No
                      </LabelSMResponsive>
                    </div>
                  </RadioGroup>
                </div>
              </div>
              <Separator orientation="horizontal" className="my-4" />
              <div className="mt-5  mr-5 gap-4">
                <LabelSMResponsive className="text-[#616161] font-bold mb-2">
                  Hospitalization History
                </LabelSMResponsive>
                <div className="w-full">
                  <LabelSMResponsive className="text-[#707070] font-semibold mb-2">
                    Other than for surgery or childbirth, have you ever been
                    hospitalized overnight for a medical or mental health issue?
                  </LabelSMResponsive>
                  <RadioGroup defaultValue="Yes" className="flex gap-5 mt-2">
                    <div
                      className={`flex items-center space-x-2  ${haveYouEverHospitalized === "Yes"
                        ? "bg-[#7ACFFF]"
                        : "border-2 border-[#DDDDDD] bg-white"
                        }  rounded-3xl p-2`}
                    >
                      <RadioGroupItem
                        value="Yes"
                        id="yesHospitalizationHistory"
                        className={`${haveYouEverHospitalized === "Yes" &&
                          "border-[#FFFFFF] text-[#FFFFFF]"
                          }`}
                        onClick={handlerSetHaveYouEverHospitalizedChange}
                        checked={haveYouEverHospitalized === "Yes"}
                      />
                      <LabelSMResponsive
                        htmlFor="yesHospitalizationHistory"
                        className={`${haveYouEverHospitalized === "Yes"
                          ? "text-[#FFFFFF]"
                          : "text-[#616161]"
                          } font-semibold`}
                      >
                        Yes
                      </LabelSMResponsive>
                    </div>
                    <div
                      className={`flex items-center space-x-2  ${haveYouEverHospitalized === "No"
                        ? "bg-[#7ACFFF]"
                        : "border-2 border-[#DDDDDD] bg-white"
                        }  rounded-3xl p-2`}
                    >
                      <RadioGroupItem
                        value="No"
                        id="noHospitalizationHistory"
                        className={`${haveYouEverHospitalized === "No" &&
                          "border-[#FFFFFF] text-[#FFFFFF]"
                          }`}
                        onClick={handlerSetHaveYouEverHospitalizedChange}
                        checked={haveYouEverHospitalized === "No"}
                      />
                      <LabelSMResponsive
                        htmlFor="noHospitalizationHistory"
                        className={`${haveYouEverHospitalized === "No"
                          ? "text-[#FFFFFF]"
                          : "text-[#616161]"
                          } font-semibold`}
                      >
                        No
                      </LabelSMResponsive>
                    </div>
                  </RadioGroup>
                  <div className="mt-4">
                    <LabelSMResponsive className="mb-2">
                      What for and when?
                    </LabelSMResponsive>
                    <InputSMResponsive
                      className="mx-1"
                      defaultValue={getAPIDataDocs?.what_for_and_when}
                      {...registerPropValue("what_for_and_when")}
                    />
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Environmental Factors Employment and Living Condition Section */}
          <AccordionItem
            value="item-5"
            className="text-left bg-[#F6F9FD] my-4 pl-4 mt-5  mx-1 border border-[#E0E0E0]"
          >
            <AccordionTrigger className="mb-1 heading-text-xl font-semibold text-[#474747] text-left">
              Environmental Factors Employment and Living Condition
            </AccordionTrigger>
            <AccordionContent>
              <Separator orientation="horizontal" className="mb-2" />
              <p className="font-semibold label-text-lg text-[#616161]">
                Employment, Housing, &Transportation
              </p>

              <div className="my-2 grid gap-4">
                {selectEmployeeHousing.map(
                  (employeeHousing: any, index: any) => (
                    <EmployeeHousingCard
                      showData={true}
                      setData={setemployeeHousingData}
                      data={employeeHousing}
                      index={index}
                      key={index}
                    />
                  )
                )}
                <EmployeeHousingCard
                  showData={false}
                  addData={AddNewEmployeeHousing}
                  setData={undefined}
                  index={undefined}
                />
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Risk Factor */}
          {/* <AccordionItem
            value="item-6"
            className="text-left bg-[#F6F9FD] my-4 pl-4"
          >
            <AccordionTrigger className="mb-1 heading-text-xl font-semibold text-[#474747] text-left">
              Risk Factor
            </AccordionTrigger>
            <AccordionContent>
              <Separator orientation="horizontal" className="mb-4" />
              <div className="grid lg:grid-cols-2 gap-4 p-1">
                <div className="grid  items-center gap-1.5">
                  <LabelSMResponsive className="text-[#707070]">
                    Tobacco Consumption (Past)
                  </LabelSMResponsive>
                  <InputSMResponsive
                    type="text"
                    defaultValue={getAPIDataDocs?.tobacco_past_use}
                    {...registerPropValue("tobacco_past_use")}
                  />
                </div>
                <div className="grid items-center gap-1.5 ">
                  <LabelSMResponsive className="text-[#707070]">
                    Tobacco Consumption (Present)
                  </LabelSMResponsive>
                  <InputSMResponsive
                    type="text"
                    defaultValue={getAPIDataDocs?.tobacco_current_use}
                    {...registerPropValue("tobacco_current_use")}
                  />
                </div>
                <div className="grid  items-center gap-1.5">
                  <LabelSMResponsive className="text-[#707070]">
                    Alcohol Consumption (Past)
                  </LabelSMResponsive>
                  <InputSMResponsive
                    type="text"
                    defaultValue={getAPIDataDocs?.alcohol_past_use}
                    {...registerPropValue("alcohol_past_use")}
                  />
                </div>
                <div className="grid  items-center gap-1.5 ">
                  <LabelSMResponsive className="text-[#707070]">
                    Alcohol Consumption (Present)
                  </LabelSMResponsive>
                  <InputSMResponsive
                    type="text"
                    defaultValue={getAPIDataDocs?.alcohol_current_use}
                    {...registerPropValue("alcohol_current_use")}
                  />
                </div>
                <div className="grid  items-center gap-1.5 ">
                  <LabelSMResponsive className="text-[#707070]">
                    Occupational Hazards and Environmental Factors
                  </LabelSMResponsive>
                  <Textarea
                    className="resize-none"
                    defaultValue={getAPIDataDocs?.surrounding_factors}
                    {...registerPropValue("surrounding_factors")}
                  />
                </div>
                <div className="grid  items-center gap-1.5 ">
                  <LabelSMResponsive className="text-[#707070]">
                    Other Risk Factors
                  </LabelSMResponsive>
                  <Textarea
                    className="resize-none"
                    defaultValue={getAPIDataDocs?.other_risk_factors}
                    {...registerPropValue("other_risk_factors")}
                  />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem> */}
        </Accordion>
      </div>
      {/* <div className="mt-5 text-left  bg-[#F6F9FD] p-4">
          <h5 className="mb-1 heading-text-xl font-semibold text-[#474747]"></h5>
          <Separator orientation="horizontal" />
        </div> */}
    </div>
  );
};


