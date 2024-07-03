import toast, { Toaster } from "react-hot-toast";

import { InputSMResponsive } from "@/components/ui/input";
import { LabelSMResponsive } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Cookies from "js-cookie";
import React, { useEffect, useState, useRef } from "react";
import { Controller, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

import { Stepper } from "@/components/shared/Stepper";
import {
  patientSubMenuClinicalInformation,
  patientSubMenuCommunications,
  patientSubMenuInsuranceDetails,
  patientSubMenuMedicalHistory,
  patientSubMenuOverview,
} from "@/constants/images";
import { ChevronLeft, ChevronRight } from "lucide-react";

import PatientRelationCard from "@/components/shared/Cards/PatientRelationCard";
import MedicalHistory from "@/components/shared/PatientHistory";
import API, { BASE_URL } from "@/constants/api.constant";
import { axiosGETAPI, axiosPOSTAPI } from "@/helpers/commonAPI";
import { useNavigate } from "react-router-dom";
import ReqiredFieldErrorImage from "@/components/shared/reqiredFieldError";
import { DynamicRadioButtonWithUseFormHook } from "@/components/shared/DynamicRadioButton";
import { PhoneInput } from "react-international-phone";
import ComboboxDropDown from "@/components/shared/comboBoxDropDown";
import { PatientStatusCode } from "@/utilities/utils";
import { EthnicityDropDownOption, RaceDropDownOption } from "@/constants/fields";
//Medical History component
// const MedicalHistory = ({
//   getAPIDataDocs,
//   params,
//   register,
//   useStateProps,
// }: {
//   getAPIDataDocs: any;
//   params: any;
//   register: any;
//   useStateProps: any;
// }) => {
//   const {
//     selectMaritalStatus,
//     setMaritalStatus,
//     usedTobacoProduct,
//     setUsedTobacoProduct,
//     accessToNarcan,
//     setaccessToNarcan,
//     wantToQuit,
//     setWantToQuit,
//     haveYouEverInjected,
//     setHaveYouEverInjected,
//     haveYouEverHospitalized,
//     setHaveYouEverHospitalized,
//     selectCurrentCigaretteSmoker,
//     setCurrentCigaretteSmoker,
//     selectFormerCigaretteSmoker,
//     setFormerCigaretteSmoker,
//     selectOtherTobbacoUser,
//     setOtherTobbacoUser,
//     selectMedicalCardData,
//     setMedicationCardData,
//     selectDiagnosisCardData,
//     setDiagnosisCardData,
//     selectDrugAllergiesCardData,
//     setDrugAllergiesCardData,
//     selectFamilyHealthHistory,
//     setFamilyHealthCardData,
//     selectSurgicalHistory,
//     setSurgicalHisotryData,
//     selectEmployeeHousing,
//     setemployeeHousingData,
//     handleInputChangeComboBox
//   } = useStateProps;
//   const handlerSetCurrentCigaretteSmoker = (e: any) => {
//     setCurrentCigaretteSmoker(e);
//   };
//   const handlerSetFormerCigaretteSmoker = (e: any) => {
//     setFormerCigaretteSmoker(e);
//   };
//   const handlersetOtherTobbacoUser = (e: any) => {
//     setOtherTobbacoUser(e);
//   };

//   const handlerSetMaritalStatus = (e: any) => {
//     setMaritalStatus(e.target.value);
//   };
//   const handlerSetUsedTobacoProductChange = (e: any) => {
//     setUsedTobacoProduct(e.target.value);
//   };
//   const handlerSetaccessToNarcanChange = (e: any) => {
//     setaccessToNarcan(e.target.value);
//   };
//   const handlerSetWantToQuitChange = (e: any) => {
//     setWantToQuit(e.target.value);
//   };
//   const handlerSetHaveYouEverInjectedChange = (e: any) => {
//     setHaveYouEverInjected(e.target.value);
//   };
//   const handlerSetHaveYouEverHospitalizedChange = (e: any) => {
//     setHaveYouEverHospitalized(e.target.value);
//   };

//   const AddNewMedication = (newMedicationData: any) => {
//     const newData = {
//       medication_name: newMedicationData.medication_name,
//       prescriber: newMedicationData.prescriber,
//       dosage: newMedicationData.dosage,
//       directions: "",
//       related_conditions: newMedicationData.related_conditions,
//       parent: params.id,
//       parentfield: "custom_medications",
//       parenttype: "Patient",
//       doctype: "CMR Medications",
//     };

//     setMedicationCardData((prev:any) => {
//       return [...prev, newData];
//     });
//   };

//   const AddNewDiagnosis = (newDiagnosisData: any) => {
//     const newData = {
//       health_condition: newDiagnosisData.health_condition,
//       condition_status: newDiagnosisData.condition_status,
//       parent: params.id,
//       parentfield: "custom_health_conditions",
//       parenttype: "Patient",
//       doctype: "Common Conditions",
//     };

//     setDiagnosisCardData((prev:any) => {
//       return [...prev, newData];
//     });
//   };

//   const AddNewDrugAllergies = (newDrugAllergiesData: any) => {
//     const newData = {
//       allergies: newDrugAllergiesData.allergies,
//       reaction: newDrugAllergiesData.reaction,
//       parent: params.id,
//       parentfield: "custom_drug_allergies__side_effects",
//       parenttype: "Patient",
//       doctype: "Drug Allergies Side Effects",
//     };

//     setDrugAllergiesCardData((prev:any) => {
//       return [...prev, newData];
//     });
//   };

//   const AddNewFamilyHealthHistory = (newFamilyHealthHistory: any) => {
//     const newData = {
//       condition: newFamilyHealthHistory.condition,
//       add_relative: newFamilyHealthHistory.add_relative,
//       relatives: newFamilyHealthHistory.relatives,
//       parent: params.id,
//       parentfield: "custom_relative_medical_conditions",
//       parenttype: "Patient",
//       doctype: "Relative Medical Condition",
//     };
//     setFamilyHealthCardData((prev:any) => {
//       return [...prev, newData];
//     });
//   };

//   const AddNewSugicalHistory = (newSurgicalHistory: any) => {
//     const newData = {
//       surgery: newSurgicalHistory.surgery,
//       year: newSurgicalHistory.year,
//       parent: params.id,
//       parentfield: "custom_surgical_histories",
//       parenttype: "Patient",
//       doctype: "Surgical History",
//     };

//     setSurgicalHisotryData((prev:any) => {
//       return [...prev, newData];
//     });
//   };

//   const AddNewEmployeeHousing = (newEmployeeHousing: any) => {
//     const newData = {
//       question_tag: newEmployeeHousing.question_tag,
//       question: newEmployeeHousing.question,
//       yes_no: newEmployeeHousing.yes_no,
//       answer: newEmployeeHousing.answer,
//       parent: params.id,
//       parentfield: "custom_employment_housing_transportation",
//       parenttype: "Patient",
//       doctype: "Environmental Factors Questionnaires",
//     };

//     setemployeeHousingData((prev:any) => {
//       return [...prev, newData];
//     });
//   };
//   return (
//     <div>
//       <div className="mt-5">
//         {/* Allergies, Medical and Surgical History */}
//         <Accordion type="multiple">
//           <AccordionItem value="item-1" className="bg-[#F6F9FD] my-4 pl-4">
//             <AccordionTrigger className="text-left mb-1 heading-text-xl font-semibold text-[#474747]">
//               Allergies, Medical and Surgical History
//             </AccordionTrigger>
//             <AccordionContent>
//               <div className="mr-5 ml-2 bg-[#F4F5F7] border">
//                 <h4 className="m-3 font-semibold heading-text-xl text-[#333333]">
//                   Medications
//                 </h4>
//                 <hr className="border border-[#D4D6DD]" />
//                 <div className="m-4 grid gap-4">
//                   {selectMedicalCardData.map((medication: any, index:any) => (
//                     <MedicationsCard
//                       addData
//                       showData={true}
//                       data={medication}
//                       key={index}
//                       setData={setMedicationCardData}
//                       index={index}
//                     />
//                   ))}
//                   <MedicationsCard
//                     showData={false}
//                     addData={AddNewMedication}
//                     key={undefined}
//                     setData={undefined}
//                     index={undefined}
//                   />
//                 </div>
//               </div>

//               <div className="mr-5 mb-5 ml-2 bg-[#F4F5F7] border">
//                 <h4 className="m-3 font-semibold heading-text-xl text-[#333333]">
//                 Health Conditions
//                 </h4>
//                 <hr className="border border-[#D4D6DD]" />
//                 <div className="m-4 flex flex-wrap gap-4">
//                   {/* <HealthConditionsCard showData={true} /> */}
//                   {selectDiagnosisCardData.map((diagnosis: any, index:any) => (
//                     <HealthConditionsCard
//                       showData={true}
//                       data={diagnosis}
//                       index={index}
//                       key={index}
//                       setData={setDiagnosisCardData}
//                     />
//                   ))}

//                   <HealthConditionsCard
//                     showData={false}
//                     addData={AddNewDiagnosis}
//                   />
//                 </div>
//               </div>

//               <div className="mr-5 mb-5 ml-2 bg-[#F4F5F7] border">
//                 <h4 className="m-3 font-semibold heading-text-xl text-[#333333]">
//                   Drug Allergies + Side Effects
//                 </h4>
//                 <hr className="border border-[#D4D6DD]" />
//                 <div className="m-4 flex gap-4">
//                   {selectDrugAllergiesCardData.map(
//                     (DrugAllergies: any, index:any) => (
//                       <DrugAllergiesCard
//                         showData={true}
//                         data1={DrugAllergies.allergies}
//                         data2={DrugAllergies.reaction}
//                         index={index}
//                         key={index}
//                         setData={setDrugAllergiesCardData}
//                         inputLabel={[
//                           {
//                             label: "Allergies",
//                             value: "allergies",
//                             data: DrugAllergies.allergies,
//                             type:"comboBox",
//                             doctype:"Allergy",
//                             placeholder:"select a Allergy"
//                           },
//                           {
//                             label: "Side Effects",
//                             value: "reaction",
//                             data: DrugAllergies.reaction,
//                             type:"text",
//                           },
//                         ]}
//                       />
//                     )
//                   )}
//                   <DrugAllergiesCard
//                     showData={false}
//                     addData={AddNewDrugAllergies}
//                     inputLabel={[
//                       {
//                         label: "Allergies",
//                         value: "allergies",
//                         type:"comboBox",
//                         doctype:"Allergy",
//                         placeholder:"select a Allergy"
//                       },
//                       {
//                         label: "Side Effects",
//                         value: "reaction",
//                         type:"text",

//                       },
//                     ]}
//                   />
//                 </div>
//               </div>
//             </AccordionContent>
//           </AccordionItem>

//           {/* Social History Section */}
//           <AccordionItem value="item-2" className="bg-[#F6F9FD] my-4 pl-4">
//             <AccordionTrigger className="text-left mb-1 heading-text-xl font-semibold text-[#474747]">
//               Social History Section
//             </AccordionTrigger>
//             <AccordionContent>
//               <Separator orientation="horizontal" className="mb-4" />
//               <div className="grid  2xl:grid-cols-2 sm:grid-cols-1 gap-4">
//                 <div className="grid w-full max-w-prose items-center gap-1.5">
//                   <LabelSMResponsive className="text-[#616161]">
//                     Occupation
//                   </LabelSMResponsive>
//                   <InputSMResponsive
//                     type="text"
//                     className="mx-1"
//                     defaultValue={getAPIDataDocs?.occupation}
//                     {...register("occupation")}
//                   />
//                 </div>
//                 <div className="grid w-full max-w-sm items-center gap-1.5">
//                   <LabelSMResponsive className="text-[#616161]">
//                     Marital Status
//                   </LabelSMResponsive>
//                   <RadioGroup
//                     defaultValue="single"
//                     className="flex bg-white p-2 rounded-2xl border-[#DDDDDD] border-2 border-opacity-40 w-auto"
//                   >
//                     <div className="grid lg:grid-cols-4 sm:grid-cols-2 gap-2 w-full">
//                       <div className="flex items-center space-x-2">
//                         <RadioGroupItem
//                           value="Single"
//                           id="singlePersonalSocialHistory"
//                           className="text-[#7ACFFF] data-[state=checked]:border-[#7ACFFF] border-[#C6C6C6]"
//                           onClick={handlerSetMaritalStatus}
//                           checked={selectMaritalStatus === "Single"}
//                         />
//                         <LabelSMResponsive
//                           htmlFor="singlePersonalSocialHistory"
//                           className="text-[#616161]"
//                         >
//                           Single
//                         </LabelSMResponsive>
//                       </div>
//                       <div className="flex items-center space-x-2">
//                         <RadioGroupItem
//                           value="Married"
//                           id="marriedPersonalSocialHistory"
//                           className="text-[#7ACFFF] data-[state=checked]:border-[#7ACFFF] border-[#C6C6C6]"
//                           onClick={handlerSetMaritalStatus}
//                           checked={selectMaritalStatus === "Married"}
//                         />
//                         <LabelSMResponsive
//                           htmlFor="marriedPersonalSocialHistory"
//                           className="text-[#616161]"
//                         >
//                           Married
//                         </LabelSMResponsive>
//                       </div>
//                       <div className="flex items-center space-x-2">
//                         <RadioGroupItem
//                           value="Divorced"
//                           id="divorcedPersonalSocialHistory"
//                           className="text-[#7ACFFF] data-[state=checked]:border-[#7ACFFF] border-[#C6C6C6]"
//                           onClick={handlerSetMaritalStatus}
//                           checked={selectMaritalStatus === "Divorced"}
//                         />
//                         <LabelSMResponsive
//                           htmlFor="divorcedPersonalSocialHistory"
//                           className="text-[#616161]"
//                         >
//                           Divorced
//                         </LabelSMResponsive>
//                       </div>
//                       <div className="flex items-center space-x-2">
//                         <RadioGroupItem
//                           value="Widow"
//                           id="widowPersonalSocialHistory"
//                           className="text-[#7ACFFF] data-[state=checked]:border-[#7ACFFF] border-[#C6C6C6]"
//                           onClick={handlerSetMaritalStatus}
//                           checked={selectMaritalStatus === "Widow"}
//                         />
//                         <LabelSMResponsive
//                           htmlFor="widowPersonalSocialHistory"
//                           className="text-[#616161]"
//                         >
//                           Widow
//                         </LabelSMResponsive>
//                       </div>
//                     </div>
//                   </RadioGroup>
//                 </div>
//               </div>
//               {/* <Separator orientation="horizontal" className="my-4"/> */}

//               <div className="mt-4 grid lg:grid-cols-2 gap-9  mr-5">
//                 <div className="w-full">
//                   <LabelSMResponsive className="text-[#707070] font-semibold text-md mb-2">
//                     1. Do you currently use or have you ever used tobacco
//                     products?
//                   </LabelSMResponsive>
//                   <RadioGroup defaultValue="Yes" className="flex gap-5 mt-2">
//                     <div
//                       className={`flex items-center space-x-2  ${
//                         usedTobacoProduct === "Yes"
//                           ? "bg-[#7ACFFF]"
//                           : "border-2 border-[#DDDDDD] bg-white"
//                       }  rounded-3xl p-2`}
//                     >
//                       <RadioGroupItem
//                         value="Yes"
//                         id="yesSocialHistorySection"
//                         className={`${
//                           usedTobacoProduct === "Yes" &&
//                           "border-[#FFFFFF] text-[#FFFFFF]"
//                         }`}
//                         onClick={handlerSetUsedTobacoProductChange}
//                         checked={usedTobacoProduct === "Yes"}
//                       />
//                       <LabelSMResponsive
//                         htmlFor="yesSocialHistorySection"
//                         className={`${
//                           usedTobacoProduct === "Yes"
//                             ? "text-[#FFFFFF]"
//                             : "text-[#616161]"
//                         } font-semibold`}
//                       >
//                         Yes
//                       </LabelSMResponsive>
//                     </div>
//                     <div
//                       className={`flex items-center space-x-2  ${
//                         usedTobacoProduct === "No"
//                           ? "bg-[#7ACFFF]"
//                           : "border-2 border-[#DDDDDD] bg-white"
//                       }  rounded-3xl p-2`}
//                     >
//                       <RadioGroupItem
//                         value="No"
//                         id="noSocialHistorySection"
//                         className={` ${
//                           usedTobacoProduct === "No" &&
//                           "border-[#FFFFFF] text-[#FFFFFF]"
//                         } `}
//                         onClick={handlerSetUsedTobacoProductChange}
//                         checked={usedTobacoProduct === "No"}
//                       />
//                       <LabelSMResponsive
//                         htmlFor="noSocialHistorySection"
//                         className={`${
//                           usedTobacoProduct === "No"
//                             ? "text-[#FFFFFF]"
//                             : "text-[#616161]"
//                         } font-semibold`}
//                       >
//                         No
//                       </LabelSMResponsive>
//                     </div>
//                   </RadioGroup>
//                 </div>
//                 {/* <div className="w-full">
//                   <LabelSMResponsive className="text-[#707070] font-semibold text-md mb-2">
//                     when did you first start smoking?
//                   </LabelSMResponsive>
//                   <InputSMResponsive className="mx-1" defaultValue={getAPIDataDocs?.custom_when_did_you_first_start_smoking}/>
//                 </div> */}
//               </div>
//               <div className="mt-5 grid lg:grid-cols-2 gap-9  mr-5">
//                 <div className="w-full flex gap-2">
//                   <Checkbox
//                     id="current-cigarette-smoker"
//                     checked={selectCurrentCigaretteSmoker}
//                     onCheckedChange={handlerSetCurrentCigaretteSmoker}
//                   />
//                   <LabelSMResponsive
//                     htmlFor="current-cigarette-smoker"
//                     className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[#616161]"
//                   >
//                     Current cigarette smoker
//                   </LabelSMResponsive>
//                 </div>

//                 <div className="w-full flex gap-2">
//                   <Checkbox
//                     id="former-cigarette-smoker"
//                     checked={selectFormerCigaretteSmoker}
//                     onCheckedChange={handlerSetFormerCigaretteSmoker}
//                   />
//                   <LabelSMResponsive
//                     htmlFor="former-cigarette-smoker"
//                     className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[#616161]"
//                   >
//                     Former cigarette smoker
//                   </LabelSMResponsive>
//                 </div>
//               </div>
//               <div className="mt-5 mr-5 grid lg:grid-cols-2 gap-9">
//                 <div className="w-full">
//                   <LabelSMResponsive className="text-[#707070] font-semibold text-md mb-2">
//                     when did you first start smoking?
//                   </LabelSMResponsive>
//                   {/* <InputSMResponsive
//                     className="mx-1"
//                     defaultValue={
//                       getAPIDataDocs?.custom_when_did_you_first_start_smoking
//                     }
//                     {...register("custom_when_did_you_first_start_smoking")}
//                   /> */}
//                   <ComboboxDropDown doctype="Year" placeholder="select year" label="custom_when_did_you_first_start_smoking" handleInputChange={handleInputChangeComboBox}/>
//                 </div>
//                 {/* <div className="w-full">
//                   <LabelSMResponsive className="text-[#707070] font-semibold text-md mb-2">
//                     when did you first quit smoking?
//                   </LabelSMResponsive>
//                   <InputSMResponsive className="mx-1" />
//                 </div> */}
//               </div>
//               <div className="mt-5 grid lg:grid-cols-2 gap-4  mr-5">
//                 <div className="w-full flex gap-2">
//                   <Checkbox
//                     id="other-tobbaco-user"
//                     checked={selectOtherTobbacoUser}
//                     onCheckedChange={handlersetOtherTobbacoUser}
//                   />
//                   <LabelSMResponsive
//                     htmlFor="other-tobbaco-user"
//                     className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[#616161]"
//                   >
//                     Other tobacco user (Circle:cigars, hookah, chew, vape).
//                   </LabelSMResponsive>
//                 </div>
//                 <div className="w-full  lg:ml-4">
//                   <LabelSMResponsive className="text-[#707070] font-semibold mb-2">
//                     On average how many cigarettes did you smoke per
//                     day(Cigarette)?
//                   </LabelSMResponsive>
//                   <InputSMResponsive
//                     className=""
//                     defaultValue={
//                       getAPIDataDocs?.custom_on_average_how_many_cigarettes_did_you_smoke_per_day
//                     }
//                     {...register("custom_on_average_how_many_cigarettes_did_you_smoke_per_day")}
//                   />
//                 </div>
//               </div>
//               <div className="mt-5  mr-5">
//                 <div className="">
//                   <LabelSMResponsive className="text-[#707070] font-semibold mb-2">
//                     When did you quit smoking?
//                   </LabelSMResponsive>
//                   {/* <InputSMResponsive
//                     className="mx-1 w-[45rem]"
//                     defaultValue={
//                       getAPIDataDocs?.custom_when_did_you_quit_smoking
//                     }
//                     {...register("custom_when_did_you_quit_smoking")}
//                   /> */}
//                   <ComboboxDropDown doctype="Year" placeholder="select year" label="custom_when_did_you_quit_smoking" buttonClassName="" handleInputChange={handleInputChangeComboBox}/>

//                 </div>
//               </div>
//               <Separator orientation="horizontal" className="my-4" />
//               <div className="mt-5  mr-5">
//                 <div className="">
//                   <LabelSMResponsive className="text-[#707070] font-semibold mb-2">
//                     2. How many times in the past year have you had 4 or more
//                     alcoholic drinks in 1 day?
//                   </LabelSMResponsive>
//                   <InputSMResponsive
//                     className="mx-1 "
//                     defaultValue={
//                       getAPIDataDocs?.custom_how_many_times_in_the_past_year
//                     }
//                     {...register("custom_how_many_times_in_the_past_year")}

//                   />
//                 </div>
//               </div>
//               <Separator orientation="horizontal" className="my-4" />
//               <div className="mt-5  mr-5">
//                 <div className="">
//                   <LabelSMResponsive className="text-[#707070] font-semibold mb-2">
//                     3. How many times in the past year have you used
//                     recreational or prescription drug for non-medical reasons?
//                   </LabelSMResponsive>
//                   <InputSMResponsive
//                     className="mx-1 "
//                     defaultValue={
//                       getAPIDataDocs?.custom_past_year_have_you_had_4_or_more_alcoholic_drinks_iady
//                     }
//                     {...register("custom_past_year_have_you_had_4_or_more_alcoholic_drinks_iady")}
//                   />
//                 </div>
//               </div>
//               <Separator orientation="horizontal" className="my-4" />

//               <div className="mt-5  mr-5 grid xl:grid-cols-2  gap-4">
//                 <div className="w-full">
//                   <LabelSMResponsive className="text-[#707070] font-semibold text-md mb-2">
//                     4. If you use opioids, do you have access to Narcan
//                     (Naloxone)?
//                   </LabelSMResponsive>
//                   <RadioGroup defaultValue="yes" className="flex gap-5 mt-2">
//                     <div
//                       className={`flex items-center space-x-2  ${
//                         accessToNarcan === "Not Applicable"
//                           ? "bg-[#7ACFFF]"
//                           : "border-2 border-[#DDDDDD] bg-white"
//                       }  rounded-3xl p-2 w-fit`}
//                     >
//                       <RadioGroupItem
//                         value="Not Applicable"
//                         id="notApplicableAccessToNarcan"
//                         className={`${
//                           accessToNarcan === "Not Applicable" &&
//                           "border-[#FFFFFF] text-[#FFFFFF]"
//                         }`}
//                         onClick={handlerSetaccessToNarcanChange}
//                         checked={accessToNarcan === "Not Applicable"}
//                       />
//                       <LabelSMResponsive
//                         htmlFor="notApplicableAccessToNarcan"
//                         className={`${
//                           accessToNarcan === "Not Applicable"
//                             ? "text-[#FFFFFF]"
//                             : "text-[#616161]"
//                         } font-semibold`}
//                       >
//                         Not Applicable
//                       </LabelSMResponsive>
//                     </div>
//                     <div
//                       className={`flex items-center space-x-2  ${
//                         accessToNarcan === "Yes"
//                           ? "bg-[#7ACFFF]"
//                           : "border-2 border-[#DDDDDD] bg-white"
//                       }  rounded-3xl p-2 w-fit`}
//                     >
//                       <RadioGroupItem
//                         value="Yes"
//                         id="yesAccessToNarcan"
//                         className={`${
//                           accessToNarcan === "Yes" &&
//                           "border-[#FFFFFF] text-[#FFFFFF]"
//                         }`}
//                         onClick={handlerSetaccessToNarcanChange}
//                         checked={accessToNarcan === "Yes"}
//                       />
//                       <LabelSMResponsive
//                         htmlFor="yesAccessToNarcan"
//                         className={`${
//                           accessToNarcan === "Yes"
//                             ? "text-[#FFFFFF]"
//                             : "text-[#616161]"
//                         } font-semibold`}
//                       >
//                         Yes
//                       </LabelSMResponsive>
//                     </div>
//                     <div
//                       className={`flex items-center space-x-2  ${
//                         accessToNarcan === "No"
//                           ? "bg-[#7ACFFF]"
//                           : "border-2 border-[#DDDDDD] bg-white"
//                       }  rounded-3xl p-2 w-fit`}
//                     >
//                       <RadioGroupItem
//                         value="No"
//                         id="noAccessToNarcan"
//                         className={` ${
//                           accessToNarcan === "No" &&
//                           "border-[#FFFFFF] text-[#FFFFFF]"
//                         } `}
//                         onClick={handlerSetaccessToNarcanChange}
//                         checked={accessToNarcan === "No"}
//                       />
//                       <LabelSMResponsive
//                         htmlFor="noAccessToNarcan"
//                         className={`${
//                           accessToNarcan === "No"
//                             ? "text-[#FFFFFF]"
//                             : "text-[#616161]"
//                         } font-semibold`}
//                       >
//                         No
//                       </LabelSMResponsive>
//                     </div>
//                   </RadioGroup>
//                 </div>
//                 <div className="w-full ">
//                   <LabelSMResponsive className="text-[#707070] font-semibold text-md mb-2">
//                     Are you interesting in quiting?
//                   </LabelSMResponsive>
//                   <RadioGroup
//                     defaultValue="Ready to quit"
//                     className="flex gap-5 mt-2"
//                   >
//                     <div
//                       className={`flex items-center space-x-2  ${
//                         wantToQuit === "Thinking about quitting"
//                           ? "bg-[#7ACFFF]"
//                           : "border-2 border-[#DDDDDD] bg-white"
//                       }  rounded-3xl p-2`}
//                     >
//                       <RadioGroupItem
//                         value="Thinking about quitting"
//                         id="thinkAboutQuitingInterestinginQuiting"
//                         className={`${
//                           wantToQuit === "Thinking about quitting" &&
//                           "border-[#FFFFFF] text-[#FFFFFF]"
//                         }`}
//                         onClick={handlerSetWantToQuitChange}
//                         checked={wantToQuit === "Thinking about quitting"}
//                       />
//                       <LabelSMResponsive
//                         htmlFor="thinkAboutQuitingInterestinginQuiting"
//                         className={`${
//                           wantToQuit === "Thinking about quitting"
//                             ? "text-[#FFFFFF]"
//                             : "text-[#616161]"
//                         } font-semibold`}
//                       >
//                         Think about quiting
//                       </LabelSMResponsive>
//                     </div>
//                     <div
//                       className={`flex items-center space-x-2  ${
//                         wantToQuit === "No"
//                           ? "bg-[#7ACFFF]"
//                           : "border-2 border-[#DDDDDD] bg-white"
//                       }  rounded-3xl p-2 w-fit`}
//                     >
//                       <RadioGroupItem
//                         value="No"
//                         id="noInterestinginQuiting"
//                         className={` ${
//                           wantToQuit === "No" &&
//                           "border-[#FFFFFF] text-[#FFFFFF]"
//                         } w-fit`}
//                         onClick={handlerSetWantToQuitChange}
//                         checked={wantToQuit === "No"}
//                       />
//                       <LabelSMResponsive
//                         htmlFor="noInterestinginQuiting"
//                         className={`${
//                           wantToQuit === "No"
//                             ? "text-[#FFFFFF]"
//                             : "text-[#616161]"
//                         } font-semibold`}
//                       >
//                         No
//                       </LabelSMResponsive>
//                     </div>
//                     <div
//                       className={`flex items-center space-x-2  ${
//                         wantToQuit === "Ready to quit"
//                           ? "bg-[#7ACFFF]"
//                           : "border-2 border-[#DDDDDD] bg-white"
//                       }  rounded-3xl p-2 w-fit`}
//                     >
//                       <RadioGroupItem
//                         value="Ready to quit"
//                         id="readyToQuiteInterestinginQuiting"
//                         className={`${
//                           wantToQuit === "Ready to quit" &&
//                           "border-[#FFFFFF] text-[#FFFFFF]"
//                         }`}
//                         onClick={handlerSetWantToQuitChange}
//                         checked={wantToQuit === "Ready to quit"}
//                       />
//                       <LabelSMResponsive
//                         htmlFor="readyToQuiteInterestinginQuiting"
//                         className={`${
//                           wantToQuit === "Ready to quit"
//                             ? "text-[#FFFFFF]"
//                             : "text-[#616161]"
//                         } font-semibold`}
//                       >
//                         Ready to quit
//                       </LabelSMResponsive>
//                     </div>
//                   </RadioGroup>
//                 </div>
//               </div>
//             </AccordionContent>
//           </AccordionItem>

//           {/* Family Health History */}
//           <AccordionItem value="item-3" className="bg-[#F6F9FD] my-4 pl-4">
//             <AccordionTrigger className="text-left mb-1 heading-text-xl font-semibold text-[#474747]">
//               Family Health History
//             </AccordionTrigger>
//             <AccordionContent>
//               <Separator orientation="horizontal" />
//               <p className="font-semibold label-text-base text-[#707070]">
//                 Have any of your blood relatives had any of the following? If
//                 so, please indicate which of your blood relatives have the
//                 condition.
//               </p>
//               <div className="my-3 flex flex-wrap gap-4">
//                 {selectFamilyHealthHistory.map((FamilyHealth: any, index:any) => (
//                   <FamilyHealthCard
//                     showData={true}
//                     data={FamilyHealth}
//                     index={index}
//                     key={index}
//                     setData={setFamilyHealthCardData}
//                   />
//                 ))}
//                 <FamilyHealthCard
//                   showData={false}
//                   addData={AddNewFamilyHealthHistory}
//                 />
//               </div>
//             </AccordionContent>
//           </AccordionItem>

//           {/* Past medical, surgical and hospitalization history Section */}
//           <AccordionItem
//             value="item-4"
//             className="text-left bg-[#F6F9FD] my-4 pl-4"
//           >
//             <AccordionTrigger className="mb-1 heading-text-xl font-semibold text-[#474747] text-left">
//               Past medical, surgical and hospitalization history
//             </AccordionTrigger>
//             <AccordionContent>
//               <Separator orientation="horizontal" />
//               <p className="font-semibold label-text-lg text-[#616161]">
//                 Surgical History
//               </p>
//               <p className="font-semibold label-text-base text-[#707070]">
//                 What surgeries have you had in the past, and in what year?
//               </p>
//               <div className="my-3 flex flex-wrap gap-4">
//                 {/* {selectSurgicalHistory.map((SurgicalHistory: any, index) => (
//                     <DrugAllergiesCard
//                       showData={true}
//                       data={SurgicalHistory}
//                       index={index}
//                       key={index}
//                       setData={setSurgicalHisotryData}
//                     />

//                   ))}
//                 <DrugAllergiesCard showData={false} addData={AddNewSugicalHistory}/> */}
//                 {selectSurgicalHistory.map((SurgicalHistory: any, index:any) => (
//                   <DrugAllergiesCard
//                     showData={true}
//                     data1={SurgicalHistory.surgery}
//                     data2={SurgicalHistory.year}
//                     index={index}
//                     key={index}
//                     setData={setSurgicalHisotryData}
//                     inputLabel={[
//                       {
//                         label: "Surgery",
//                         value: "surgery",
//                         data: SurgicalHistory.surgery,
//                         type:"comboBox",
//                         doctype:"Surgery",
//                         placeholder:"select a Surgery"

//                       },
//                       {
//                         label: "Year",
//                         value: "year",
//                         data: SurgicalHistory.year,
//                         type:"comboBox",
//                         doctype:"Year",
//                         placeholder:"select a Year"
//                       },
//                     ]}
//                   />
//                 ))}
//                 <DrugAllergiesCard
//                   showData={false}
//                   addData={AddNewSugicalHistory}
//                   inputLabel={[
//                     {
//                       label: "Surgery",
//                       value: "surgery",
//                       type:"comboBox",
//                       doctype:"Surgery",
//                       placeholder:"select a Surgery"
//                     },
//                     {
//                       label: "Year",
//                       value: "year",
//                       type:"comboBox",
//                       doctype:"Year",
//                       placeholder:"select a Year"
//                     },
//                   ]}
//                 />
//               </div>

//               <div className="mt-5  mr-5 flex gap-4">
//                 <div className="w-full">
//                   <LabelSMResponsive className="text-[#707070] font-semibold mb-2">
//                     Have you ever injected or pumped silicone, oils, or other
//                     substances for the purpose of body shaping? (Naloxone)?
//                   </LabelSMResponsive>
//                   <RadioGroup defaultValue="Yes" className="flex gap-5 mt-2">
//                     <div
//                       className={`flex items-center space-x-2  ${
//                         haveYouEverInjected === "Yes"
//                           ? "bg-[#7ACFFF]"
//                           : "border-2 border-[#DDDDDD] bg-white"
//                       }  rounded-3xl p-2`}
//                     >
//                       <RadioGroupItem
//                         value="Yes"
//                         id="yesHaveYouEverInjected"
//                         className={`${
//                           haveYouEverInjected === "Yes" &&
//                           "border-[#FFFFFF] text-[#FFFFFF]"
//                         }`}
//                         onClick={handlerSetHaveYouEverInjectedChange}
//                         checked={haveYouEverInjected === "Yes"}
//                       />
//                       <LabelSMResponsive
//                         htmlFor="yesHaveYouEverInjected"
//                         className={`${
//                           haveYouEverInjected === "Yes"
//                             ? "text-[#FFFFFF]"
//                             : "text-[#616161]"
//                         } font-semibold`}
//                       >
//                         Yes
//                       </LabelSMResponsive>
//                     </div>
//                     <div
//                       className={`flex items-center space-x-2  ${
//                         haveYouEverInjected === "No"
//                           ? "bg-[#7ACFFF]"
//                           : "border-2 border-[#DDDDDD] bg-white"
//                       }  rounded-3xl p-2`}
//                     >
//                       <RadioGroupItem
//                         value="No"
//                         id="noHaveYouEverInjected"
//                         className={`${
//                           haveYouEverInjected === "No" &&
//                           "border-[#FFFFFF] text-[#FFFFFF]"
//                         }`}
//                         onClick={handlerSetHaveYouEverInjectedChange}
//                         checked={haveYouEverInjected === "No"}
//                       />
//                       <LabelSMResponsive
//                         htmlFor="noHaveYouEverInjected"
//                         className={`${
//                           haveYouEverInjected === "No"
//                             ? "text-[#FFFFFF]"
//                             : "text-[#616161]"
//                         } font-semibold`}
//                       >
//                         No
//                       </LabelSMResponsive>
//                     </div>
//                   </RadioGroup>
//                 </div>
//               </div>
//               <Separator orientation="horizontal" className="my-4" />
//               <div className="mt-5  mr-5 gap-4">
//                 <LabelSMResponsive className="text-[#616161] font-bold mb-2">
//                   Hospitalization History
//                 </LabelSMResponsive>
//                 <div className="w-full">
//                   <LabelSMResponsive className="text-[#707070] font-semibold mb-2">
//                     Other than for surgery or childbirth, have you ever been
//                     hospitalized overnight for a medical or mental health issue?
//                   </LabelSMResponsive>
//                   <RadioGroup defaultValue="Yes" className="flex gap-5 mt-2">
//                     <div
//                       className={`flex items-center space-x-2  ${
//                         haveYouEverHospitalized === "Yes"
//                           ? "bg-[#7ACFFF]"
//                           : "border-2 border-[#DDDDDD] bg-white"
//                       }  rounded-3xl p-2`}
//                     >
//                       <RadioGroupItem
//                         value="Yes"
//                         id="yesHospitalizationHistory"
//                         className={`${
//                           haveYouEverHospitalized === "Yes" &&
//                           "border-[#FFFFFF] text-[#FFFFFF]"
//                         }`}
//                         onClick={handlerSetHaveYouEverHospitalizedChange}
//                         checked={haveYouEverHospitalized === "Yes"}
//                       />
//                       <LabelSMResponsive
//                         htmlFor="yesHospitalizationHistory"
//                         className={`${
//                           haveYouEverHospitalized === "Yes"
//                             ? "text-[#FFFFFF]"
//                             : "text-[#616161]"
//                         } font-semibold`}
//                       >
//                         Yes
//                       </LabelSMResponsive>
//                     </div>
//                     <div
//                       className={`flex items-center space-x-2  ${
//                         haveYouEverHospitalized === "No"
//                           ? "bg-[#7ACFFF]"
//                           : "border-2 border-[#DDDDDD] bg-white"
//                       }  rounded-3xl p-2`}
//                     >
//                       <RadioGroupItem
//                         value="No"
//                         id="noHospitalizationHistory"
//                         className={`${
//                           haveYouEverHospitalized === "No" &&
//                           "border-[#FFFFFF] text-[#FFFFFF]"
//                         }`}
//                         onClick={handlerSetHaveYouEverHospitalizedChange}
//                         checked={haveYouEverHospitalized === "No"}
//                       />
//                       <LabelSMResponsive
//                         htmlFor="noHospitalizationHistory"
//                         className={`${
//                           haveYouEverHospitalized === "No"
//                             ? "text-[#FFFFFF]"
//                             : "text-[#616161]"
//                         } font-semibold`}
//                       >
//                         No
//                       </LabelSMResponsive>
//                     </div>
//                   </RadioGroup>
//                   <div className="mt-4">
//                     <LabelSMResponsive className="mb-2">
//                       What for and when?
//                     </LabelSMResponsive>
//                     <InputSMResponsive
//                       className="mx-1"
//                       defaultValue={getAPIDataDocs?.custom_what_for_and_when}
//                       {...register("custom_what_for_and_when")}
//                     />
//                   </div>
//                 </div>
//               </div>
//             </AccordionContent>
//           </AccordionItem>

//           {/* Environmental Factors Employment and Living Condition Section */}
//           <AccordionItem
//             value="item-5"
//             className="text-left bg-[#F6F9FD] my-4 pl-4"
//           >
//             <AccordionTrigger className="mb-1 heading-text-xl font-semibold text-[#474747] text-left">
//               Environmental Factors Employment and Living Condition
//             </AccordionTrigger>
//             <AccordionContent>
//               <Separator orientation="horizontal" className="mb-2" />
//               <p className="font-semibold label-text-lg text-[#616161]">
//                 Employment, Housing, &Transportation
//               </p>

//               <div className="my-2 grid gap-4">
//                 {selectEmployeeHousing.map(
//                   (employeeHousing: any, index: any) => (
//                     <EmployeeHousingCard
//                       showData={true}
//                       setData={setemployeeHousingData}
//                       data={employeeHousing}
//                       index={index}
//                       key={index}
//                     />
//                   )
//                 )}
//                 <EmployeeHousingCard
//                   showData={false}
//                   addData={AddNewEmployeeHousing}
//                   setData={undefined}
//                   index={undefined}
//                 />
//               </div>
//             </AccordionContent>
//           </AccordionItem>

//           {/* Risk Factor */}
//           <AccordionItem
//             value="item-6"
//             className="text-left bg-[#F6F9FD] my-4 pl-4"
//           >
//             <AccordionTrigger className="mb-1 heading-text-xl font-semibold text-[#474747] text-left">
//               Risk Factor
//             </AccordionTrigger>
//             <AccordionContent>
//               <Separator orientation="horizontal" className="mb-4" />
//               <div className="grid lg:grid-cols-2 gap-4 p-1">
//                 <div className="grid  items-center gap-1.5">
//                   <LabelSMResponsive className="text-[#707070]">
//                     Tobacco Consumption (Past)
//                   </LabelSMResponsive>
//                   <InputSMResponsive
//                     type="text"
//                     defaultValue={getAPIDataDocs?.tobacco_past_use}
//                     {...register("tobacco_past_use")}
//                   />
//                 </div>
//                 <div className="grid items-center gap-1.5 ">
//                   <LabelSMResponsive className="text-[#707070]">
//                     Tobacco Consumption (Present)
//                   </LabelSMResponsive>
//                   <InputSMResponsive
//                     type="text"
//                     defaultValue={getAPIDataDocs?.tobacco_current_use}
//                     {...register("tobacco_current_use")}
//                   />
//                 </div>
//                 <div className="grid  items-center gap-1.5">
//                   <LabelSMResponsive className="text-[#707070]">
//                     Alcohol Consumption (Past)
//                   </LabelSMResponsive>
//                   <InputSMResponsive
//                     type="text"
//                     defaultValue={getAPIDataDocs?.alcohol_past_use}
//                     {...register("alcohol_past_use")}
//                   />
//                 </div>
//                 <div className="grid  items-center gap-1.5 ">
//                   <LabelSMResponsive className="text-[#707070]">
//                     Alcohol Consumption (Present)
//                   </LabelSMResponsive>
//                   <InputSMResponsive
//                     type="text"
//                     defaultValue={getAPIDataDocs?.alcohol_current_use}
//                     {...register("alcohol_current_use")}

//                   />
//                 </div>
//                 <div className="grid  items-center gap-1.5 ">
//                   <LabelSMResponsive className="text-[#707070]">
//                     Occupational Hazards and Environmental Factors
//                   </LabelSMResponsive>
//                   <Textarea
//                     className="resize-none"
//                     defaultValue={getAPIDataDocs?.surrounding_factors}
//                     {...register("surrounding_factors")}

//                   />
//                 </div>
//                 <div className="grid  items-center gap-1.5 ">
//                   <LabelSMResponsive className="text-[#707070]">
//                     Other Risk Factors
//                   </LabelSMResponsive>
//                   <Textarea
//                     className="resize-none"
//                     defaultValue={getAPIDataDocs?.other_risk_factors}
//                     {...register("other_risk_factors")}

//                   />
//                 </div>
//               </div>
//             </AccordionContent>
//           </AccordionItem>
//         </Accordion>
//       </div>
//       {/* <div className="mt-5 text-left  bg-[#F6F9FD] p-4">
//         <h5 className="mb-1 heading-text-xl font-semibold text-[#474747]"></h5>
//         <Separator orientation="horizontal" />
//       </div> */}
//     </div>
//   );
// };

//Insurance Details component
const Insurancedetails = ({
  getAPIDataDocs,
  useStateProps,
  register,
}: {
  getAPIDataDocs: any;
  useStateProps: any;
  register: any;
}) => {
  const {
    selectPaymentType,
    setSelectPaymentType,
    handleSelectPaymentTypeChanges,
    isPrimaryPolicyHolder,
    setIsPrimaryPolicyHolder,
    handleisPrimaryPolicyHolderChanges,
  } = useStateProps;
  useEffect(() => {
    getAPIDataDocs?.custom_payment_type
      ? setSelectPaymentType(getAPIDataDocs?.custom_payment_type)
      : setSelectPaymentType("Medicare or Medi-Cal");

    setIsPrimaryPolicyHolder(
      getAPIDataDocs?.custom_is_the_patient_the_primary_policy_holder
    );
  }, [getAPIDataDocs, setSelectPaymentType, setIsPrimaryPolicyHolder]);
  return (
    <>
      <div className="mt-5  bg-[#F6F9FD] p-4">
        <h5 className="mb-1 heading-text-xl font-semibold text-[#474747]">
          Payment & Insurance Details
        </h5>
        <Separator orientation="horizontal" className="my-2" />
        <div className="grid lg:grid-cols-2 gap-5">
          <div className="mt-2">
            <LabelSMResponsive className="text-[#707070] font-semibold">
              Payment Type
            </LabelSMResponsive>
            <RadioGroup
              defaultValue="Medicare or Medi-Cal"
              className="flex gap-5 mt-2"
            >
              <div className="flex space-x-3">
                <div
                  className={`flex items-center space-x-2  ${selectPaymentType === "Medicare or Medi-Cal"
                    ? "bg-[#7ACFFF]"
                    : "border-2 border-[#DDDDDD] bg-white"
                    }  rounded-3xl p-2`}
                >
                  <RadioGroupItem
                    value="Medicare or Medi-Cal"
                    id="Medicare or Medi-Cal"
                    className={`${selectPaymentType === "Medicare or Medi-Cal" &&
                      "text-[#FFFFFF] border-[#FFFFFF]"
                      } `}
                    onClick={handleSelectPaymentTypeChanges}
                    checked={selectPaymentType === "Medicare or Medi-Cal"}
                  />
                  <LabelSMResponsive
                    htmlFor="Medicare or Medi-Cal"
                    className={`${selectPaymentType === "Medicare or Medi-Cal"
                      ? "text-[#FFFFFF]"
                      : "text-[#616161]"
                      } font-semibold`}
                  >
                    Medical or Medi-cal
                  </LabelSMResponsive>
                </div>
                <div
                  className={`flex items-center space-x-2  ${selectPaymentType === "Private Insurance"
                    ? "bg-[#7ACFFF]"
                    : "border-2 border-[#DDDDDD] bg-white"
                    }  rounded-3xl p-2`}
                >
                  <RadioGroupItem
                    value="Private Insurance"
                    id="Private Insurance"
                    className={`${selectPaymentType === "Private Insurance" &&
                      "text-[#FFFFFF] border-[#FFFFFF]"
                      } `}
                    onClick={handleSelectPaymentTypeChanges}
                    checked={selectPaymentType === "Private Insurance"}
                  />
                  <LabelSMResponsive
                    htmlFor="Private Insurance"
                    className={`${selectPaymentType === "Private Insurance"
                      ? "text-[#FFFFFF]"
                      : "text-[#616161]"
                      } font-semibold`}
                  >
                    Private Insurance
                  </LabelSMResponsive>
                </div>
                {/* <div
              className={`flex items-center space-x-2  ${
                selectPaymentType === "atTheTimeOfAppointment"
                  ? "bg-[#7ACFFF]"
                  : "border-2 border-[#DDDDDD] bg-white"
              }  rounded-3xl p-2`}
            >
              <RadioGroupItem
                value="atTheTimeOfAppointment"
                id="atTheTimeOfAppointment"
                className={`${
                  selectPaymentType === "atTheTimeOfAppointment" &&
                  "text-[#FFFFFF] border-[#FFFFFF]"
                } `}
                onClick={handleSelectPaymentTypeChanges}
                checked={selectPaymentType === "atTheTimeOfAppointment"}
              />
              <LabelSMResponsive
                htmlFor="atTheTimeOfAppointment"
                className={`${
                  selectPaymentType === "atTheTimeOfAppointment"
                    ? "text-[#FFFFFF]"
                    : "text-[#616161]"
                } font-semibold`}
              >
                At the time of Appointment
              </LabelSMResponsive>
            </div>
            <div
              className={`flex items-center space-x-2  ${
                selectPaymentType === "payNowViaCreditCard"
                  ? "bg-[#7ACFFF]"
                  : "border-2 border-[#DDDDDD] bg-white"
              }  rounded-3xl p-2`}
            >
              <RadioGroupItem
                value="payNowViaCreditCard"
                id="payNowViaCreditCard"
                className={`${
                  selectPaymentType === "payNowViaCreditCard" &&
                  "text-[#FFFFFF] border-[#FFFFFF]"
                } `}
                onClick={handleSelectPaymentTypeChanges}
                checked={selectPaymentType === "payNowViaCreditCard"}
              />
              <LabelSMResponsive
                htmlFor="payNowViaCreditCard"
                className={`${
                  selectPaymentType === "payNowViaCreditCard"
                    ? "text-[#FFFFFF]"
                    : "text-[#616161]"
                } font-semibold`}
              >
                Pay now via Credit Card
              </LabelSMResponsive>
            </div> */}
              </div>
            </RadioGroup>
          </div>
          {selectPaymentType === "Medicare or Medi-Cal" && (
            <div className="mt-4">
              <LabelSMResponsive className="text-[#707070] font-semibold">
                Policy Number
              </LabelSMResponsive>
              <InputSMResponsive
                defaultValue={getAPIDataDocs?.custom_policy_number}
                {...register("custom_policy_number")}
              />
              <LabelSMResponsive className="text-[#707070] font-semibold">
                Medical Beneficiary Identification (MBI) Number or Benefits
                Identification card (BIC) Number
              </LabelSMResponsive>
            </div>
          )}
          {selectPaymentType === "Private Insurance" && (
            <div className="">
              <LabelSMResponsive className="text-[#707070] font-semibold">
                Is the Patient the primary policy holder?
              </LabelSMResponsive>
              <RadioGroup
                defaultValue="yesPrimaryPolicyHolder"
                className="flex gap-5 mt-2"
              >
                <div
                  className={`flex items-center space-x-2  ${isPrimaryPolicyHolder === "Yes"
                    ? "bg-[#7ACFFF]"
                    : "border-2 border-[#DDDDDD] bg-white"
                    }  rounded-3xl p-2`}
                >
                  <RadioGroupItem
                    value="Yes"
                    id="yesPrimaryPolicyHolder"
                    className={`${isPrimaryPolicyHolder === "Yes" &&
                      "text-[#FFFFFF] border-[#FFFFFF]"
                      } `}
                    onClick={handleisPrimaryPolicyHolderChanges}
                    checked={isPrimaryPolicyHolder === "Yes"}
                  />
                  <LabelSMResponsive
                    htmlFor="yesPrimaryPolicyHolder"
                    className={`${isPrimaryPolicyHolder === "Yes"
                      ? "text-[#FFFFFF]"
                      : "text-[#616161]"
                      } font-semibold`}
                  >
                    Yes
                  </LabelSMResponsive>
                </div>
                <div
                  className={`flex items-center space-x-2  ${isPrimaryPolicyHolder === "No"
                    ? "bg-[#7ACFFF]"
                    : "border-2 border-[#DDDDDD] bg-white"
                    }  rounded-3xl p-2`}
                >
                  <RadioGroupItem
                    value="No"
                    id="noPrimaryPolicyHolder"
                    className={`${isPrimaryPolicyHolder === "No" &&
                      "text-[#FFFFFF] border-[#FFFFFF]"
                      } `}
                    onClick={handleisPrimaryPolicyHolderChanges}
                    checked={isPrimaryPolicyHolder === "No"}
                  />
                  <LabelSMResponsive
                    htmlFor="noPrimaryPolicyHolder"
                    className={`${isPrimaryPolicyHolder === "No"
                      ? "text-[#FFFFFF]"
                      : "text-[#616161]"
                      } font-semibold`}
                  >
                    No
                  </LabelSMResponsive>
                </div>
              </RadioGroup>
            </div>
          )}

          {selectPaymentType === "Private Insurance" && (
            <div className="w-full">
              <LabelSMResponsive className="text-[#707070] font-semibold mb-2">
                Primary Carrier
              </LabelSMResponsive>
              <InputSMResponsive
                defaultValue={getAPIDataDocs?.custom_primary_carrier}
                {...register("custom_primary_carrier")}
              />
            </div>
          )}
          {selectPaymentType === "Private Insurance" &&
            isPrimaryPolicyHolder === "No" && (
              <div className="w-full">
                <LabelSMResponsive className="text-[#707070] font-semibold mb-2">
                  Primary Holder first name
                </LabelSMResponsive>
                <InputSMResponsive
                  defaultValue={
                    getAPIDataDocs?.custom_primary_holder_first_name
                  }
                  {...register("custom_primary_holder_first_name")}
                />
              </div>
            )}

          {/* medical Record number  */}
          {selectPaymentType === "Private Insurance" && (
            <div className="w-full">
              <LabelSMResponsive className="text-[#707070] font-semibold mb-2">
                Medical Record Number (required)
              </LabelSMResponsive>
              <InputSMResponsive
                defaultValue={getAPIDataDocs?.custom_medical_record_number}
                {...register("custom_medical_record_number")}
              />
            </div>
          )}
          {selectPaymentType === "Private Insurance" &&
            isPrimaryPolicyHolder === "No" && (
              <div className="w-full">
                <LabelSMResponsive className="text-[#707070] font-semibold mb-2">
                  Primary Holder middle name
                </LabelSMResponsive>
                <InputSMResponsive
                  defaultValue={
                    getAPIDataDocs?.custom_primary_holder_middle_name
                  }
                  {...register("custom_primary_holder_middle_name")}
                />
              </div>
            )}

          {/* Group number */}
          {selectPaymentType === "Private Insurance" && (
            <div className="w-full">
              <LabelSMResponsive className="text-[#707070] font-semibold mb-2">
                Group Number
              </LabelSMResponsive>
              <InputSMResponsive
                defaultValue={getAPIDataDocs?.custom_group_number}
                {...register("custom_group_number")}
              />
            </div>
          )}
          {selectPaymentType === "Private Insurance" &&
            isPrimaryPolicyHolder === "No" && (
              <div className="w-full">
                <LabelSMResponsive className="text-[#707070] font-semibold mb-2">
                  Primary Holder last name
                </LabelSMResponsive>
                <InputSMResponsive
                  defaultValue={getAPIDataDocs?.custom_primary_holder_last_name}
                  {...register("custom_primary_holder_last_name")}
                />
              </div>
            )}
          {selectPaymentType === "Private Insurance" &&
            isPrimaryPolicyHolder === "No" && (
              <div className="w-full">
                <LabelSMResponsive className="text-[#707070] font-semibold mb-2">
                  Primary Holder dob
                </LabelSMResponsive>
                <InputSMResponsive
                  type="date"
                  defaultValue={getAPIDataDocs?.custom_primary_holder_dob1}
                  {...register("custom_primary_holder_dob1")}
                />
              </div>
            )}
          {selectPaymentType === "Private Insurance" &&
            isPrimaryPolicyHolder === "No" && (
              <div className="w-full">
                <LabelSMResponsive className="text-[#707070] font-semibold mb-2">
                  Relationship to policy holder
                </LabelSMResponsive>
                <InputSMResponsive
                  defaultValue={
                    getAPIDataDocs?.custom_relationship_to_policy_holder
                  }
                  {...register("custom_relationship_to_policy_holder")}
                />
              </div>
            )}
        </div>
      </div>
      <div className="mt-5  bg-[#F6F9FD] p-4">
        <h5 className="mb-1 heading-text-xl font-semibold text-[#474747]">
          Prescription Benefit Information
        </h5>
        <Separator orientation="horizontal" className="my-2" />

        <div className="mt-4 grid lg:grid-cols-2 gap-10 mb-10">
          <div className="w-full">
            <LabelSMResponsive className="text-[#707070] font-semibold">
              RxBin
            </LabelSMResponsive>
            <InputSMResponsive
              defaultValue={getAPIDataDocs?.custom_rxbin}
              {...register("custom_rxbin")}
            />
          </div>
          <div className="w-full">
            <LabelSMResponsive className="text-[#707070] font-semibold">
              RxPCN
            </LabelSMResponsive>
            <InputSMResponsive
              defaultValue={getAPIDataDocs?.custom_rxpcn}
              {...register("custom_rxpcn")}
            />
          </div>
        </div>
        <div className="mt-4 grid lg:grid-cols-2 gap-10">
          <div className="w-full">
            <LabelSMResponsive className="text-[#707070] font-semibold">
              RxID
            </LabelSMResponsive>
            <InputSMResponsive
              defaultValue={getAPIDataDocs?.custom_rxid}
              {...register("custom_rxid")}
            />
          </div>
          <div className="w-full">
            <LabelSMResponsive className="text-[#707070] font-semibold">
              RxGroup
            </LabelSMResponsive>
            <InputSMResponsive
              defaultValue={getAPIDataDocs?.custom_rxgroup}
              {...register("custom_rxgroup")}
            />
          </div>
        </div>
      </div>
    </>
  );
};

//Address and Contact Component
// const AddressContact = () => {
//   return (
//     <div>
//       {/* Address Div */}
//       <div className="mt-5  bg-[#F6F9FD] p-4">
//         <div className="flex justify-between">
//           <h5 className="mb-1 heading-text-xl font-semibold text-[#616161]">
//             Address
//           </h5>
//           <Button
//             variant="outline"
//             className=" border-[#DDDDDD] text-[#616161] flex gap-2"
//           >
//             <CirclePlus className="xl:w-[2rem] xl:h-[2rem] w-[1rem] h-[1rem]" />
//             <span className="label-text-sm">Add Address</span>
//           </Button>
//         </div>
//         <Separator orientation="horizontal" className="my-2" />
//         <div className="grid lg:grid-cols-2 gap-4 mt-4">
//           <div className="grid w-full  items-center gap-1.5">
//             <LabelSMResponsive className="text-[#616161] ">
//               Address Line 1
//             </LabelSMResponsive>
//             <InputSMResponsive type="text" />
//           </div>
//           <div className="grid w-full items-center gap-1.5">
//             <LabelSMResponsive className="text-[#616161] ">
//               Address Line 2
//             </LabelSMResponsive>
//             <InputSMResponsive type="text" />
//           </div>
//           <div className="grid w-full items-center gap-1.5">
//             <LabelSMResponsive className="text-[#616161] ">
//               State
//             </LabelSMResponsive>
//             <InputSMResponsive type="text" />
//           </div>
//           <div className="grid w-full items-center gap-1.5">
//             <LabelSMResponsive className="text-[#616161] ">
//               City
//             </LabelSMResponsive>
//             <InputSMResponsive type="text" />
//           </div>
//           <div className="grid w-full items-center gap-1.5">
//             <LabelSMResponsive className="text-[#616161] ">
//               Zip-Code
//             </LabelSMResponsive>
//             <InputSMResponsive type="text" />
//           </div>
//         </div>
//       </div>

//       {/* Contact Div */}
//       <div className="mt-5  bg-[#F6F9FD] p-4">
//         <div className="flex justify-between">
//           <h5 className="mb-1 heading-text-xl font-semibold text-[#616161]">
//             Contact
//           </h5>
//           <Button
//             variant="outline"
//             className=" border-[#DDDDDD] text-[#616161] flex gap-2"
//           >
//             <CirclePlus className="xl:w-[2rem] xl:h-[2rem] w-[1rem] h-[1rem]" />
//             <span className="label-text-sm"> Add Contact</span>
//           </Button>
//         </div>
//         <Separator orientation="horizontal" className="my-2" />
//         <div className="grid lg:grid-cols-3 gap-4 mt-4">
//           <div className="grid w-full  items-center gap-3.5">
//             <LabelSMResponsive className="text-[#616161] ">
//               Primary Phone
//             </LabelSMResponsive>
//             <InputSMResponsive type="tel" placeholder="723-652-896" />
//           </div>
//           <div className="grid w-full items-center gap-1.5">
//             <LabelSMResponsive className="text-[#616161] ">
//               Secondary Phone
//             </LabelSMResponsive>
//             <InputSMResponsive type="tle" />
//           </div>
//           <div className="grid w-full items-center gap-1.5">
//             <LabelSMResponsive className="text-[#616161] ">
//               Email
//             </LabelSMResponsive>
//             <InputSMResponsive type="email" placeholder="email@email.com" />
//           </div>
//         </div>
//       </div>

//       {/* Patient Relation */}
//       <div className="mt-5  bg-[#F6F9FD] p-4">
//         <div className="flex justify-between">
//           <h5 className="mb-1 heading-text-xl font-semibold text-[#616161]">
//             Patient Relation
//           </h5>
//         </div>
//         <Separator orientation="horizontal" className="my-2" />
//       </div>
//     </div>
//   );
// };

//Prescription benefits informations component
// const PrescriptionBenefitInformation = () => {
//   return (
//     <div className="mt-5  bg-[#F6F9FD] p-4">
//       <h5 className="mb-1 heading-text-xl font-semibold text-[#474747]">
//         Prescription Benefit Information
//       </h5>
//       <Separator orientation="horizontal" />

//       <div className="mt-4 grid lg:grid-cols-2 gap-10 mb-10">
//         <div className="w-full">
//           <LabelSMResponsive className="text-[#707070] font-semibold">
//             RxBin
//           </LabelSMResponsive>
//           <InputSMResponsive />
//         </div>
//         <div className="w-full">
//           <LabelSMResponsive className="text-[#707070] font-semibold">
//             RxPCN
//           </LabelSMResponsive>
//           <InputSMResponsive />
//         </div>
//       </div>
//       <div className="mt-4 grid lg:grid-cols-2 gap-10">
//         <div className="w-full">
//           <LabelSMResponsive className="text-[#707070] font-semibold">
//             RxID
//           </LabelSMResponsive>
//           <InputSMResponsive />
//         </div>
//         <div className="w-full">
//           <LabelSMResponsive className="text-[#707070] font-semibold">
//             RxGroup
//           </LabelSMResponsive>
//           <InputSMResponsive />
//         </div>
//       </div>
//     </div>
//   );
// };

//Activity

//Comments component
// const Comments = ({
//   getComments,
//   params,
// }: {
//   getComments: CommentData[];
//   params: any;
// }) => {
//   const [data, setData] = useState<CommentData[]>();

//   const createComment = async (commentmsg: string) => {
//     async function SendComment() {
//       const URL = BASE_URL + API.POST_COMMENT;

//       const reqBody = {
//         reference_doctype: "Patient",
//         reference_name: params.id,
//         content: commentmsg,
//         comment_email: Cookies.get("email"),
//         comment_by: Cookies.get("full_name"),
//       };

//       const httpOptions = {
//         Authorization: Cookies.get("Authorization"),
//         "Content-Type": "multipart/form-data",
//       };

//       try {
//         const response = await axiosPOSTAPI(URL, reqBody, {
//           headers: httpOptions,
//         });
//         // If you need to do something with the response, you can add code here
//         console.log("Comment posted successfully:", response.data);
//       } catch (error) {
//         console.error("Error posting comment:", error);
//       }
//     }

//     await SendComment(); // Wait for SendComment to complete before reloading the page

//     window.location.reload();
//   };
//   return (
//     <div className="mt-5 bg-[#F6F9FD] xl:pl-4 sm:pl-2  py-4">
//       <h5 className="ml-2 mb-1 heading-text-xl font-semibold text-[#474747] ">
//         Prescription Benefits Information
//       </h5>
//       <Separator orientation="horizontal" className="mb-5" />
//       <div className="mx-4">
//         <div className="flex flex-row gap-5 justify-between">
//           <Image
//             src={patientCommentsPersonPhotos.path}
//             alt={patientCommentsPersonPhotos.alt}
//             width={37}
//             height={100}
//             className="sm:mr-2"
//           />
//           <InputSMResponsive
//             type="text"
//             placeholder="Type a reply / comment"
//             onKeyDown={(e: any) => {
//               if (e.key === "Enter") {
//                 e.target.value && createComment(e.target.value);
//               }
//             }}
//             className="w-full h-[2.5rem] border-[#DDDDDD] border p-2"
//           />
//         </div>
//         <div className="my-5 ml-2">
//           <CommentBox data={getComments} />
//         </div>
//       </div>
//     </div>
//   );
// };

//Clinical Information Component
const ClinicalInformation = () => {
  return <div>Clinical Information</div>;
};

//Appointment Component
// const Appointment = () => {
//   const [data, setData] = useState<PatientAppointment[]>([]);

//   /*
//   Fetches patient data from a remote API endpoint,
//   then processes the received JSON data to extract relevant
//   fields and updates the state with the filtered data.
//   */
//   // useEffect(() => {
//   //   async function fetchPatientListData() {
//   //     const res = await fetch(
//   //       'https://qa-tenant.rxbb.io/api/resource/Patient?fields=["*"]',
//   //       { headers: { Authorization: "token 8439f44d8979c57:0211dc092e01771" } }
//   //     );

//   //     const dataJson = await res.json();

//   //     const finalData = dataJson.data.map((item: any) => ({
//   //       mobile: item.mobile,
//   //       sex: item.sex,
//   //       dob: item.dob,
//   //       customPatientStatus: item.custom_patient_status,
//   //       patientName: item.patient_name,
//   //       email: item.email,
//   //     }));

//   //     setData(finalData);
//   //   }
//   //   fetchPatientListData();
//   // }, []);

//   // Fetch patient data from a local JSON object
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Fetch data from local JSON object
//         const fetchedData = await getPatientAppointmentData();
//         setData(fetchedData);
//       } catch (error) {
//         console.error("Error fetching patient data:", error);
//         // Handle error: Display error message or fallback data
//       }
//     };

//     fetchData(); // Invoke data fetching function
//   }, []);

//   return (
//     <div>
//       <DataTable data={data} />
//     </div>
//   );
// };

//Communications component
const Communications = () => {
  return <div>Communications</div>;
};

// View Patient Component
const AddPatient = ({ }: any) => {
  const params = { id: "add-new-patient-wefwienifgegreges" };
  // const [date, setDate] = useState<Date>();
  // const [reload, setReload] = useState<boolean>(false);
  const [selectedStepper, setSelectedStepper] = useState("overview");
  const [selectGender, setSelectGender] = useState("Male");
  const [selectEmailPreference, setEmailPreference] = useState("");
  const [selectStatus, setStatus] = useState("Active");
  // const [selectComment, setComment] = useState<CommentData[]>([]);
  // const [selectActivity, setActivity] = useState<CommentData[]>([]);
  // const [isDataLoaded, setDataLoaded] = useState<boolean>(false);
  const [selectPatientRelation, setSelectionPatientRelationData] = useState<
    any[]
  >([]);
  const handleInputChangeComboBox = (value: string, label: string) => {
    setComboBoxKeyValues((prev: any) => {
      return { ...prev, [label]: value };
    });
  };
  const [comboBoxKeyValues, setComboBoxKeyValues] = useState<any>({});
  const [tableViewFieldState, setTableViewFieldState] = useState<any>();
  //Medical History useState declared
  const [selectMaritalStatus, setMaritalStatus] = useState("Single");
  const [usedTobacoProduct, setUsedTobacoProduct] = useState("Yes");
  const [accessToNarcan, setaccessToNarcan] = useState("Yes");
  const [wantToQuit, setWantToQuit] = useState("Ready to quit");
  const [haveYouEverInjected, setHaveYouEverInjected] = useState("Yes");
  const [haveYouEverHospitalized, setHaveYouEverHospitalized] = useState("Yes");
  const [selectCurrentCigaretteSmoker, setCurrentCigaretteSmoker] =
    useState(false);
  const [selectFormerCigaretteSmoker, setFormerCigaretteSmoker] =
    useState(false);
  const [selectOtherTobbacoUser, setOtherTobbacoUser] = useState(false);

  const [selectMedicalCardData, setMedicationCardData] = useState<any[]>([]);
  const [selectDiagnosisCardData, setDiagnosisCardData] = useState<any[]>([]);
  const [selectDrugAllergiesCardData, setDrugAllergiesCardData] = useState<
    any[]
  >([]);
  const [selectFamilyHealthHistory, setFamilyHealthCardData] = useState<any[]>(
    []
  );
  const [selectSurgicalHistory, setSurgicalHisotryData] = useState<any[]>([]);
  const [selectEmployeeHousing, setemployeeHousingData] = useState<any[]>([]);

  //Inusurance Details Props | useStates
  const [selectPaymentType, setSelectPaymentType] = useState(
    "Medicare or Medi-Cal"
  );

  const handleSelectPaymentTypeChanges = (e: any) => {
    setSelectPaymentType(e.target.value);
  };
  const [isPrimaryPolicyHolder, setIsPrimaryPolicyHolder] = useState("Yes");
  const handleisPrimaryPolicyHolderChanges = (e: any) => {
    setIsPrimaryPolicyHolder(e.target.value);
  };

  const firstNameInputRef = useRef<any>(null);
  const inputRefs = useRef<any>([]);
  inputRefs.current = [0, 1, 2, 3, 4].map((_, i) => inputRefs.current[i] ?? React.createRef());

  useEffect(() => {
    inputRefs.current.forEach((ref: any) => {
      if (ref.current) {
        const countryDropdown = ref.current.querySelector('.react-international-phone-country-selector-button');
        if (countryDropdown) {
          countryDropdown.tabIndex = -1;
        }
      }
    });

    const firstNameInputRefsdad = firstNameInputRef?.current
    if (firstNameInputRefsdad) {
      firstNameInputRefsdad?.querySelector(".focus-first-name").focus();
    }
  }, []);

  const handlerStatus = (e: any) => {
    setStatus(e.target.value);
  };
  const {
    register,
    getValues,
    trigger,
    formState: { errors },
    setValue,
    control
  } = useForm();
  const handlerEmailPreference = (e: any) => {
    setEmailPreference(e.target.value);
  };
  const changeStateGender = (e: any) => {
    setSelectGender(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      const LOAD_GET_DOCTYPE =
        BASE_URL + API.LOAD_FORM_DOCTYPE + "?doctype=Patient";
      const responseLoadGETDocType = await axiosGETAPI(LOAD_GET_DOCTYPE);
      if (responseLoadGETDocType.status === 200) {
        setTableViewFieldState(
          JSON.parse(responseLoadGETDocType.data.user_settings)
        );
      }
    };
    fetchData();
  }, []);
  const [selectInviteUser, setInviteUser] = useState<number>(0);

  const router = useNavigate();

  const [getAPIDataDocs, _setAPIDataDocs] = useState<any>();
  const [_getAPIDataDocsInfo, _setAPIDataDocsInfo] = useState();
  const steps = [
    {
      key: "overview",
      label: "Overview",
      icon: patientSubMenuOverview.path,
    },
    // {
    //   key: "addressContact",
    //   label: "Address & Contact",
    //   icon: patientSubMenuAddressContact.path,
    // },
    {
      key: "medicalHistory",
      label: "Medical History",
      icon: patientSubMenuMedicalHistory.path,
    },
    {
      key: "insuranceDetails",
      label: "Insurance Details",
      icon: patientSubMenuInsuranceDetails.path,
    },
    // {
    //   key: "prescriptionBenefitInformation",
    //   label: "Prescription Benefit Information",
    //   icon: patientSubMenuPrescriptionBenefitInformation.path,
    // },
    {
      key: "clinicalInformation",
      label: "Clinical Information",
      icon: patientSubMenuClinicalInformation.path,
    },
    // {
    //   key: "appointments",
    //   label: "Appointments",
    //   icon: patientSubMenuAppointments.path,
    // },
    {
      key: "communications",
      label: "Communications",
      icon: patientSubMenuCommunications.path,
    },
    // {
    //   key: "activity",
    //   label: "Activity",
    //   icon: patientSubMenuActivity.path,
    // },
    // {
    //   key: "comments",
    //   label: "Comments",
    //   icon: patientSubMenuComments.path,
    // },
  ];

  const finalSubmit = async (isRedirect: boolean) => {
    const updateAddress = async (name: string) => {
      const oldData = getAPIDataDocs?.__onload?.addr_list[0];
      const URL = BASE_URL + API.SAVE_DOCS;

      if (oldData) {
        const RevisedData = {
          ...oldData,
          links: [
            {
              doctype: "Dynamic Link",
              owner: Cookies.get("email"),
              parent: "new-address-xytyeqwtxl",
              parentfield: "links",
              parenttype: "Address",
              link_doctype: "Patient",
              link_name: name,
            },
          ],
          address_line1: getValues("address.address_line1"),
          address_line2: getValues("address.address_line2"),
          city: getValues("address.city"),
          state: getValues("address.state"),
          pincode: getValues("address.pincode"),
          doctype: "Address",
        };
        try {

          const response = await axiosPOSTAPI(
            URL,
            { doc: JSON.stringify(RevisedData), action: "Save" },
            {
              headers: {
                Authorization: Cookies.get("Authorization"),
                "Content-Type": "multipart/form-data",
              },
            }
          );
          if (response.status !== 200) {
            toast("please filled all required fields")
          }
          return 200
        }
        catch (error: any) {
          toast("please filled all required fields")

        }
      } else {
        const newAddressSchema = {
          doctype: "Address",
          address_type: "Billing",
          country: "United States",
          links: [
            {
              doctype: "Dynamic Link",
              owner: Cookies.get("email"),
              parent: "new-address-xytyeqwtxl",
              parentfield: "links",
              parenttype: "Address",
              link_doctype: "Patient",
              link_name: name,
            },
          ],
          address_line1: getValues("address.address_line1"),
          address_line2: getValues("address.address_line2"),
          city: getValues("address.city"),
          state: getValues("address.state"),
          pincode: getValues("address.pincode"),
        };
        try {
          const response = await axiosPOSTAPI(
            URL,
            { doc: JSON.stringify(newAddressSchema), action: "Save" },
            {
              headers: {
                Authorization: Cookies.get("Authorization"),
                "Content-Type": "multipart/form-data",
              },
            }
          );
          return 200
          if (response.status !== 200) {
            toast("please filled all required fields")
          }
        }
        catch (error: any) {
          toast("please filled all required fields")

        }
      }
    };

    const UpdateContactDetails = async (name: string) => {
      const oldData = getAPIDataDocs?.__onload?.contact_list[0];
      const URL = BASE_URL + API.SAVE_DOCS;
      if (oldData) {
        // call Contact Details API for Fetching Data
        const GETDATA_URL =
          BASE_URL + API.VIEW_DOCTYPE + "?doctype=Contact&name=" + oldData.name;
        const resData = await axiosGETAPI(GETDATA_URL, {
          headers: { Authorization: Cookies.get("Authorization") },
        });
        if (resData.status === 200) {
          const contactDetailsData = resData.data?.docs[0];

          const updateData = {
            ...contactDetailsData,
            email_ids: [
              {
                doctype: "Contact Email",
                parent: "new-contact-ecjmvvbffj",
                parentfield: "email_ids",
                parenttype: "Contact",
                ...contactDetailsData.email_ids[0],
                is_primary: 1,
                email_id: getValues("contact_details.email"),
              },
            ],
            phone_nos: [
              {
                doctype: "Contact Phone",
                parent: "new-contact-ecjmvvbffj",
                parentfield: "phone_nos",
                parenttype: "Contact",
                ...contactDetailsData.phone_nos[0],
                is_primary_phone: 0,
                is_primary_mobile_no: 1,
                phone: getValues("contact_details.primary_phone"),
              },
              {
                doctype: "Contact Phone",
                parent: "new-contact-ecjmvvbffj",
                parentfield: "phone_nos",
                parenttype: "Contact",
                ...contactDetailsData.phone_nos[1],
                is_primary_phone: 1,
                is_primary_mobile_no: 0,
                phone: getValues("contact_details.secondary_phone"),
              },
            ],
          };

          try {
            const response = await axiosPOSTAPI(
              URL,
              { doc: JSON.stringify(updateData), action: "Save" },
              {
                headers: {
                  Authorization: Cookies.get("Authorization"),
                  "Content-Type": "multipart/form-data",
                },
              }
            );
            if (response.status !== 200) {
              toast("please filled all required fields")
            }
            return 200
          }
          catch (erros: any) {
            toast("please fill all required fields")
          }

        }
      } else {
        const newContactDetailSchema = {
          docstatus: 0,
          doctype: "Contact",
          email_ids: [
            {
              doctype: "Contact Email",
              // name: "new-contact-email-puztrjymva",
              is_primary: 1,
              parent: "new-contact-ecjmvvbffj",
              parentfield: "email_ids",
              parenttype: "Contact",
              email_id: getValues("contact_details.email"),
            },
          ],
          phone_nos: [
            {
              doctype: "Contact Phone",
              // name: "new-contact-phone-uwzopuojsf",
              is_primary_phone: 0,
              is_primary_mobile_no: 1,
              parent: "new-contact-ecjmvvbffj",
              parentfield: "phone_nos",
              parenttype: "Contact",
              phone: getValues("contact_details.primary_phone"),
            },
            {
              doctype: "Contact Phone",
              is_primary_phone: 1,
              is_primary_mobile_no: 0,
              parent: "new-contact-ecjmvvbffj",
              parentfield: "phone_nos",
              parenttype: "Contact",
              phone: getValues("contact_details.secondary_phone"),
            },
          ],
          links: [
            {
              doctype: "Dynamic Link",
              owner: Cookies.get("email"),
              parent: "new-address-xytyeqwtxl",
              parentfield: "links",
              parenttype: "Address",
              link_doctype: "Patient",
              link_name: name,
            },
          ],
        };
        try {
          const response = await axiosPOSTAPI(
            URL,
            { doc: JSON.stringify(newContactDetailSchema), action: "Save" },
            {
              headers: {
                Authorization: Cookies.get("Authorization"),
                "Content-Type": "multipart/form-data",
              },
            }
          );
          if (response.status !== 200) {
            toast("please filled all required fields")
          }
          return 200
        }
        catch (errors: any) {

        }
      }
    };

    const UpdatePatient = async () => {
      // const oldData = getAPIDataDocs;
      const URL = BASE_URL + API.SAVE_DOCS;
      const NewData = {
        name: params.id,
        owner: Cookies.get("email"),
        __islocal: 1,
        __unsaved: 1,
        docstatus: 0,
        naming_series: "P.#",
        first_name:
          getValues("first_name") !== undefined ? getValues("first_name") : "",
        middle_name:
          getValues("middle_name") !== undefined
            ? getValues("middle_name")
            : "",
        last_name:
          getValues("last_name") !== undefined ? getValues("last_name") : "",
        sex: selectGender !== undefined ? selectGender : "",
        custom_pcp_name:
          getValues("custom_pcp_name") !== undefined
            ? getValues("custom_pcp_name")
            : "",
        custom_patient_series: "P.#####",
        dob: getValues("dob") !== undefined ? getValues("dob") : "",
        custom_pcp_phone:
          getValues("custom_pcp_phone") !== undefined
            ? getValues("custom_pcp_phone")
            : "",
        patient_name: "",
        custom_patient_status: selectStatus,
        status: "",
        invite_user: "",
        inpatient_status: "",
        report_preference: selectEmailPreference,
        blood_group: "",
        mobile: getValues("mobile") !== undefined ? getValues("mobile") : "",
        phone: getValues("phone") !== undefined ? getValues("phone") : "",
        email: getValues("email") !== undefined ? getValues("email") : "",
        custom_unsubscribe_to_marketing: "",
        customer: "",
        customer_group: "",
        territory: "",
        default_currency: "",
        default_price_list: "",
        language: "en",
        custom_is_the_patient_cognitively_impared: "",
        custom_brief_interview_for_material_statusbims_score13: "",
        custom_cognitive_impairment_noted_in_patients_chart: "",
        custom_confirmed_status_with_family_membercaregiver: "",
        custom_confirmed_status_with_healthcare_staff: "",
        custom_minimental_state_examinationmmse_score__27: "",
        marital_status:
          selectMaritalStatus !== undefined ? selectMaritalStatus : "",
        custom_do_you_currently_use_or_have_you_ever_tobacco_profucts:
          usedTobacoProduct !== undefined ? usedTobacoProduct : "",
        custom_current_cigarette_smoker:
          selectCurrentCigaretteSmoker !== undefined
            ? selectCurrentCigaretteSmoker
            : "",
        custom_are_you_interested_in_quiting_1: "",
        custom_former_cigarette_smoker:
          selectFormerCigaretteSmoker !== undefined
            ? selectFormerCigaretteSmoker
            : "",
        custom_on_average_how_many_cigarettes_did_you_smoke_per_day:
          getValues(
            "custom_on_average_how_many_cigarettes_did_you_smoke_per_day"
          ) !== undefined
            ? getValues(
              "custom_on_average_how_many_cigarettes_did_you_smoke_per_day"
            )
            : "",
        custom_how_many_years_did_you_smoke_for: "",
        custom_other_tobacco_user:
          selectOtherTobbacoUser !== undefined ? selectOtherTobbacoUser : "",
        custom_are_you_interested_in_quiting_2:
          wantToQuit !== undefined ? wantToQuit : "",
        custom_past_year_have_you_had_4_or_more_alcoholic_drinks_iady:
          getValues(
            "custom_past_year_have_you_had_4_or_more_alcoholic_drinks_iady"
          ) !== undefined
            ? getValues(
              "custom_past_year_have_you_had_4_or_more_alcoholic_drinks_iady"
            )
            : "",
        custom_use_opioids_and_have_access_to_nacran:
          accessToNarcan !== undefined ? accessToNarcan : "",
        custom_are_you_interesting_in_quiting: "",
        custom_purpose_of_body_shapping:
          haveYouEverInjected !== undefined ? haveYouEverInjected : "",
        custom_have_you_hospitalized_overnight:
          haveYouEverHospitalized !== undefined ? haveYouEverHospitalized : "",
        custom_payment_type:
          selectPaymentType !== undefined ? selectPaymentType : "",
        custom_is_the_patient_the_primary_policy_holder:
          isPrimaryPolicyHolder !== undefined ? isPrimaryPolicyHolder : "",
        doctype: "Patient",
        custom_employment_housing_transportation:
          selectEmployeeHousing !== undefined ? selectEmployeeHousing : "",
        custom_recreational_drug_usage: "",
        custom_drug_allergies__side_effects:
          selectDrugAllergiesCardData !== undefined
            ? selectDrugAllergiesCardData
            : "",
        patient_relation:
          selectPatientRelation !== undefined ? selectPatientRelation : "",
        custom_medications:
          selectMedicalCardData !== undefined ? selectMedicalCardData : "",
        custom_relative_medical_conditions:
          selectFamilyHealthHistory !== undefined
            ? selectFamilyHealthHistory
            : "",
        custom_health_conditions:
          selectDiagnosisCardData !== undefined ? selectDiagnosisCardData : "",
        custom_surgical_histories:
          selectSurgicalHistory !== undefined ? selectSurgicalHistory : "",
        custom_patient_notes:
          getValues("custom_patient_notes") !== undefined
            ? getValues("custom_patient_notes")
            : "",
        // __onload: "",
        occupation:
          getValues("occupation") !== undefined ? getValues("occupation") : "",
        custom_how_many_times_in_the_past_year:
          getValues("custom_how_many_times_in_the_past_year") !== undefined
            ? getValues("custom_how_many_times_in_the_past_year")
            : "",
        custom_what_for_and_when:
          getValues("custom_what_for_and_when") !== undefined
            ? getValues("custom_what_for_and_when")
            : "",
        tobacco_past_use:
          getValues("tobacco_past_use") !== undefined
            ? getValues("tobacco_past_use")
            : "",
        tobacco_current_use:
          getValues("tobacco_current_use") !== undefined
            ? getValues("tobacco_current_use")
            : "",
        alcohol_past_use:
          getValues("alcohol_past_use") !== undefined
            ? getValues("alcohol_past_use")
            : "",
        alcohol_current_use:
          getValues("alcohol_current_use") !== undefined
            ? getValues("alcohol_current_use")
            : "",
        surrounding_factors:
          getValues("surrounding_factors") !== undefined
            ? getValues("surrounding_factors")
            : "",
        other_risk_factors:
          getValues("other_risk_factors") !== undefined
            ? getValues("other_risk_factors")
            : "",
        custom_policy_number:
          getValues("custom_policy_number") !== undefined
            ? getValues("custom_policy_number")
            : "",
        custom_primary_carrier:
          getValues("custom_primary_carrier") !== undefined
            ? getValues("custom_primary_carrier")
            : "",
        custom_primary_holder_first_name:
          getValues("custom_primary_holder_first_name") !== undefined
            ? getValues("custom_primary_holder_first_name")
            : "",
        custom_medical_record_number:
          getValues("custom_medical_record_number") !== undefined
            ? getValues("custom_medical_record_number")
            : "",
        custom_primary_holder_middle_name:
          getValues("custom_primary_holder_middle_name") !== undefined
            ? getValues("custom_primary_holder_middle_name")
            : "",
        custom_group_number:
          getValues("custom_group_number") !== undefined
            ? getValues("custom_group_number")
            : "",
        custom_primary_holder_last_name:
          getValues("custom_primary_holder_last_name") !== undefined
            ? getValues("custom_primary_holder_last_name")
            : "",
        custom_primary_holder_dob1:
          getValues("custom_primary_holder_dob1") !== undefined
            ? getValues("custom_primary_holder_dob1")
            : "",
        custom_relationship_to_policy_holder:
          getValues("custom_relationship_to_policy_holder") !== undefined
            ? getValues("custom_relationship_to_policy_holder")
            : "",
        custom_rxbin:
          getValues("custom_rxbin") !== undefined
            ? getValues("custom_rxbin")
            : "",
        custom_rxpcn:
          getValues("custom_rxpcn") !== undefined
            ? getValues("custom_rxpcn")
            : "",
        custom_rxid:
          getValues("custom_rxid") !== undefined
            ? getValues("custom_rxid")
            : "",
        custom_rxgroup:
          getValues("custom_rxgroup") !== undefined
            ? getValues("custom_rxgroup")
            : "",
        ...comboBoxKeyValues,
        // custom_how_many_cigarettes_do_you_smoke_per_day: getValues("custom_how_many_cigarettes_do_you_smoke_per_day") !== undefined ? getValues("custom_how_many_cigarettes_do_you_smoke_per_day") : getAPIDataDocs.custom_how_many_cigarettes_do_you_smoke_per_day,
      };

      try {
        const response = await axiosPOSTAPI(
          URL,
          { doc: JSON.stringify(NewData), action: "Save" },
          {
            headers: {
              Authorization: Cookies.get("Authorization"),
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.status !== 200) {
          toast("please filled all required fields");
        }

        return response;
      } catch (error: any) {
        toast("please filled all required fields");
      }
    };

    /* eslint-disable-next-line no-unused-vars */
    const isValid = await trigger();
    if (isValid) {
      const response = await UpdatePatient();
      if (response) {
        console.log("iam on it")
        await updateAddress(response.data.docs[0].name);
        await UpdateContactDetails(response.data.docs[0].name);
        if (isRedirect === true) {
          router("/patients");
        } else {
          IncrementStepper()
          router("/patients/" + response.data?.docs[0]?.name);
        }
      }
    }

    // if(updateAddressResponose === 200 && UpdateContactDetailsResponose === 200 && UpdatePatientResponose === 200){
    //   window.location.reload();
    // }
    // if(UpdatePatientResponose[0] === 200){
    //   router.push("/patient-list/");
    // }

    // }
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

  const AddNewPatientRelation = (newPatientRelation: any) => {
    const newData = {
      patient: newPatientRelation.patient,
      relation: newPatientRelation.relation,
      parent: params.id,
      patientName: newPatientRelation.patientName,
      parentfield: "patient_relation",
      parenttype: "Patient",
      doctype: "Patient Relation",
    };

    setSelectionPatientRelationData((prev) => {
      return [...prev, newData];
    });
  };

  return (
    <div className="px-3 pt-3 ">
      <div className="flex justify-between mb-2">
        <div className="flex flex-row gap-4 mb-2 align-middle">
          <h3 className="pl-3 text-xl sm:text-2xl lg:text-3xl 2xl:text-4xl font-medium text-[#474747] ">
            New Patient
          </h3>
        </div>
        <div className="space-x-2 text-nowrap">
          {/* <Button
              variant="outline"
              className="bg-[#F6F9FD] border-[#DDDDDD] text-[#616161]"
            >
              <Paperclip className="sm:w-4 sm:h-4 w-3 h-3" />{" "}
              <p className="hidden sm:block">Attachment</p>
            </Button>
            <Button
              variant="outline"
              className="bg-[#F6F9FD] border-[#DDDDDD] text-[#616161]"
            >
              <Tags
                className="sm:w-4 sm:h-4 w-3 h-3"
                style={{ transform: "rotate(90deg)" }}
              />
              <p className="hidden sm:block">Tags</p>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className=" border-[#DDDDDD] bg-[#F6F9FD] text-[#616161]"
            >
              <Printer className="sm:w-4 sm:h-4 w-3 h-3" />
            </Button> */}
        </div>
      </div>
      <Separator orientation="horizontal" className="my-2 lg:my-0" />

      <div className="flex h-[calc(100vh-180px)] overflow-auto">
        <Stepper
          steps={steps}
          selectedStepper={selectedStepper}
          setSelectedStepper={setSelectedStepper}
          hideSideIcons={false}
          progressCheckBox={true}
        />
        {/* <Separator
          orientation="vertical"
          className="h-[90vh] mr-4 hidden sm:block"
        /> */}
        <div className=" w-full h-full flex flex-col overflow-hidden">
          <div className=" overflow-auto flex-grow">
            {selectedStepper === "overview" && (
              <>
                <div className="mt-5  bg-[#F6F9FD] pl-4 py-4">
                  <div className="flex justify-between pr-10">
                    <h5 className="mb-1 heading-text-xl font-semibold text-[#474747] ">
                      Patient Demographics
                    </h5>
                    <div>
                      <ComboboxDropDown
                        placeholder="status"
                        staticValue={[
                          {
                            value: "Active",
                          },
                          {
                            value: "Inactive",
                          },
                          {
                            value: "Transferred",
                          },
                        ]}
                        handleInputChange={(value: string, _: any) => {
                          setStatus(value);
                        }}
                        dataValue={selectStatus}
                        buttonClassName={` rounded-full ${PatientStatusCode(
                          selectStatus
                        )}`}
                      />
                    </div>
                  </div>

                  <Separator orientation="horizontal" className="my-3" />

                  <div className="grid 2xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-4 mt-2">
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                      <LabelSMResponsive className="text-[#616161]">
                        First Name <span className="text-[#ED9192]">*</span>
                        <ReqiredFieldErrorImage error={errors.first_name} />
                      </LabelSMResponsive>
                      <div ref={firstNameInputRef}>
                        <InputSMResponsive
                          type="text"
                          defaultValue={getAPIDataDocs?.first_name}
                          {...register("first_name", { required: true })}
                          className={`focus-first-name ${errors.first_name && "border-[#FF441B]"}`}
                        />
                      </div>
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                      <LabelSMResponsive className="text-[#616161]">
                        Middle Name (optional)
                      </LabelSMResponsive>
                      <InputSMResponsive
                        type="text"
                        defaultValue={getAPIDataDocs?.middle_name}
                        {...register("middle_name")}
                      />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                      <LabelSMResponsive className="text-[#616161]">
                        Last Name <span className="text-[#ED9192]">*</span>
                        <ReqiredFieldErrorImage error={errors.last_name} />
                      </LabelSMResponsive>
                      <InputSMResponsive
                        type="text"
                        defaultValue={getAPIDataDocs?.last_name}
                        {...register("last_name", { required: true })}
                        className={`${errors.last_name && "border-[#FF441B]"}`}
                      />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                      <Controller
                        name="mobile"
                        control={control}
                        defaultValue={getAPIDataDocs?.mobile}
                        rules={{
                          required:
                            selectEmailPreference === "Print" ? true : false,
                        }}
                        render={({
                          field: { onChange, value },
                          fieldState: { error },
                        }) => (
                          <>
                            <LabelSMResponsive className="text-[#616161]">
                              Primary Phone{" "}
                              <ReqiredFieldErrorImage error={error} />
                            </LabelSMResponsive>
                            <div ref={inputRefs.current[0]}>
                              <PhoneInput
                                value={value}
                                onChange={onChange}
                                placeholder="Enter Phone Number"
                                prefix=""
                                className="w-full h-full"
                                inputClassName={`${error && "border-[#FF441B]"
                                  } w-full h-full`}
                              />
                            </div>
                          </>
                        )}
                      />{" "}
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                      <LabelSMResponsive className="text-[#616161]">
                        Secondary Phone
                      </LabelSMResponsive>

                      <Controller
                        name="phone"
                        control={control}
                        defaultValue={getAPIDataDocs?.phone}
                        render={({ field: { onChange, value } }) => (
                          <div ref={inputRefs.current[1]}>
                            <PhoneInput
                              value={value}
                              onChange={onChange}
                              placeholder="Enter Phone Number"
                              prefix=""
                              inputClassName="w-full h-full"
                              className="w-full h-full"
                            />
                          </div>
                        )}
                      />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                      <LabelSMResponsive className="text-[#616161]">
                        Email <span className="text-[#ED9192]">*</span>
                        <ReqiredFieldErrorImage error={errors.email} />
                      </LabelSMResponsive>
                      <InputSMResponsive
                        type="text"
                        defaultValue={getAPIDataDocs?.email}
                        {...(selectEmailPreference === "Email"
                          ? register("email", { required: true })
                          : register("email", { required: true }))}
                        className={`${errors.email && "border-[#FF441B]"}`}
                      />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                      <LabelSMResponsive className="text-[#616161]">
                        Date of birth <span className="text-[#ED9192]">*</span>
                        <ReqiredFieldErrorImage error={errors.dob} />
                      </LabelSMResponsive>
                      <InputSMResponsive
                        type="date"
                        defaultValue={getAPIDataDocs?.dob}
                        {...register("dob", { required: true })}
                        className={`${errors.email && "border-[#FF441B]"}`}
                      />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5 xl2:col-span-2 sm:col-span-0">
                      <LabelSMResponsive className="text-[#616161]">
                        Gender <span className="text-[#ED9192]">*</span>
                        <ReqiredFieldErrorImage error={errors.sex} />
                      </LabelSMResponsive>
                      <DynamicRadioButtonWithUseFormHook
                        setButtonSelection={setSelectGender}
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
                          {
                            label: "Others",
                            value: "Others",
                          },
                        ]}
                        defaultValue={"Male"}
                        register={register}
                        label={"sex"}
                        required
                        setValueForm={setValue}
                        getValueForm={getValues}
                      />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5 xl2:col-span-2 sm:col-span-0">
                      <LabelSMResponsive className="text-[#616161]">
                        Race
                      </LabelSMResponsive>
                      <ComboboxDropDown
                        // dataValue={getAPIDataDocs.custom_race}
                        label="custom_race"
                        staticValue={RaceDropDownOption}
                        placeholder="select Race"
                        handleInputChange={handleInputChangeComboBox}
                      />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5 xl2:col-span-2 sm:col-span-0">
                      <LabelSMResponsive className="text-[#616161]">
                        Ethnicity
                      </LabelSMResponsive>
                      <ComboboxDropDown
                        // dataValue={getAPIDataDocs.custom_ethnicity}
                        label="custom_ethnicity"
                        placeholder="select Ethnicity"
                        staticValue={EthnicityDropDownOption}
                        handleInputChange={handleInputChangeComboBox}
                      />
                    </div>
                  </div>
                  <Separator orientation="horizontal" className="my-3" />
                  <div className="grid 2xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-4 mt-2">
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                      <LabelSMResponsive className="text-[#616161]">
                        PCP Name <span className="text-[#ED9192]">*</span>
                        <ReqiredFieldErrorImage
                          error={errors.custom_pcp_name}
                        />
                      </LabelSMResponsive>
                      <InputSMResponsive
                        type="text"
                        placeholder="First Name Last Name"
                        defaultValue={getAPIDataDocs?.custom_pcp_name}
                        {...register("custom_pcp_name", { required: true })}
                        className={`${errors.custom_pcp_name && "border-[#FF441B]"
                          }`}
                      />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5  xl2:col-span-2 sm:col-span-">
                      <LabelSMResponsive className="text-[#616161]">
                        PCP Phone
                      </LabelSMResponsive>
                      {/* <InputSMResponsive
                          type="text"
                          placeholder="723-652-8960"
                          defaultValue={getAPIDataDocs?.custom_pcp_phone}
                          {...register("custom_pcp_phone")}
                        /> */}
                      <Controller
                        name="custom_pcp_phone"
                        control={control}
                        defaultValue={getAPIDataDocs?.custom_pcp_phone}
                        render={({ field: { onChange, value } }) => (
                          <div ref={inputRefs.current[2]}>
                            <PhoneInput
                              value={value}
                              onChange={onChange}
                              placeholder="Enter Phone Number"
                              prefix=""
                              inputClassName="w-full h-full"
                              className="w-full h-full"
                            />
                           </div>
                        )}
                      />
                    </div>
                  </div>
                </div>
                <div className="bg-[#F6F9FD] grid 2xl:grid-cols-2  gap-5 mt-5 p-2 ml-2">
                  <div className="">
                    <div className="">
                      <LabelSMResponsive
                        htmlFor="patientnote"
                        className="text-[#616161]"
                      >
                        Patient Notes
                      </LabelSMResponsive>
                      <Textarea
                        id="patientnotes"
                        className="resize-none "
                        placeholder="This filed is only viewable by internal staff"
                        defaultValue={getAPIDataDocs?.custom_patient_notes}
                        {...register("custom_patient_notes")}
                      />
                    </div>
                  </div>
                  <div className=" w-full max-w-sm items-center space-y-2">
                    <LabelSMResponsive className="text-[#616161]">
                      Notification Preference
                    </LabelSMResponsive>

                    <div className="flex gap-5">
                      <div className="flex items-center space-x-2 border-2 border-[#DDDDDD] bg-white p-3 rounded-3xl">
                        <Checkbox
                          id="emailcheckbox"
                          className="data-[state=checked]:bg-[#7ACFFF] data-[state=checked]:border-[#7ACFFF]"
                          value="Email"
                          onClick={handlerEmailPreference}
                          checked={selectEmailPreference === "Email"}
                        />
                        <LabelSMResponsive
                          htmlFor="emailcheckbox"
                          className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70  text-[#616161]"
                        >
                          Email
                        </LabelSMResponsive>
                      </div>
                      <div className="flex items-center space-x-2 border-[#DDDDDD] bg-white p-3 rounded-3xl border-2">
                        <Checkbox
                          id="printcheckbox"
                          value="Print"
                          className="data-[state=checked]:bg-[#7ACFFF] data-[state=checked]:border-[#7ACFFF]"
                          onClick={handlerEmailPreference}
                          checked={selectEmailPreference === "Print"}
                        />
                        <LabelSMResponsive
                          htmlFor="printcheckbox"
                          className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[#616161]"
                        >
                          SMS
                        </LabelSMResponsive>
                      </div>
                    </div>
                  </div>
                  <div className="space-x-2 flex col-span-2">
                    <Checkbox
                      id="invite-as-user"
                      checked={selectInviteUser === 1}
                      onClick={() =>
                        setInviteUser((prev: number) => {
                          if (prev === 1) {
                            return 0;
                          } else {
                            return 1;
                          }
                        })
                      }
                    />
                    <LabelSMResponsive
                      htmlFor="invite-as-user"
                      className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[#616161] "
                    >
                      Email access to Patient Portal page
                    </LabelSMResponsive>
                  </div>
                </div>
                <div>
                  {/* Address Div */}
                  <div className="mt-5  bg-[#F6F9FD] p-4">
                    <div className="flex justify-between">
                      <h5 className="mb-1 heading-text-xl font-semibold text-[#616161]">
                        Address
                      </h5>
                      {/* <Button
                      variant="outline"
                      className=" border-[#DDDDDD] text-[#616161] flex gap-2"
                    >
                      <CirclePlus className="xl:w-[2rem] xl:h-[2rem] w-[1rem] h-[1rem]" />
                      <span className="label-text-sm">Add Address</span>
                    </Button> */}
                    </div>
                    <Separator orientation="horizontal" className="my-2" />
                    <div className="grid lg:grid-cols-2 gap-4 mt-4">
                      <div className="grid w-full  items-center gap-1.5">
                        <LabelSMResponsive className="text-[#616161] ">
                          Address Line 1{" "}
                          <span className="text-[rgb(237,145,146)]">*</span>
                          <ReqiredFieldErrorImage
                            error={(errors as any).address?.address_line1}
                          />
                        </LabelSMResponsive>
                        <InputSMResponsive
                          type="text"
                          defaultValue={
                            getAPIDataDocs?.__onload?.addr_list[0]
                              ?.address_line1
                          }
                          {...register("address.address_line1", {
                            required: true,
                          })}
                          className={`${(errors as any).address?.address_line1 &&
                            "border-[#FF441B]"
                            }`}
                        />
                      </div>
                      <div className="grid w-full items-center gap-1.5">
                        <LabelSMResponsive className="text-[#616161] ">
                          Address Line 2
                        </LabelSMResponsive>
                        <InputSMResponsive
                          type="text"
                          defaultValue={
                            getAPIDataDocs?.__onload?.addr_list[0]
                              ?.address_line2cv
                          }
                          {...register("address.address_line2")}
                        />{" "}
                      </div>
                      <div className="grid w-full items-center gap-1.5">
                        <LabelSMResponsive className="text-[#616161] ">
                          State{" "}
                          <span className="text-[rgb(237,145,146)]">*</span>
                          <ReqiredFieldErrorImage
                            error={(errors as any).address?.state}
                          />
                        </LabelSMResponsive>
                        <InputSMResponsive
                          type="text"
                          defaultValue={
                            getAPIDataDocs?.__onload?.addr_list[0]?.state
                          }
                          {...register("address.state", { required: true })}
                          className={`${(errors as any).address?.state && "border-[#FF441B]"
                            }`}
                        />
                      </div>
                      <div className="grid w-full items-center gap-1.5">
                        <LabelSMResponsive className="text-[#616161] ">
                          City{" "}
                          <span className="text-[rgb(237,145,146)]">*</span>
                          <ReqiredFieldErrorImage
                            error={(errors as any).address?.city}
                          />
                        </LabelSMResponsive>
                        <InputSMResponsive
                          type="text"
                          defaultValue={
                            getAPIDataDocs?.__onload?.addr_list[0]?.city
                          }
                          {...register("address.city", { required: true })}
                          className={`${(errors as any).address?.city && "border-[#FF441B]"
                            }`}
                        />
                      </div>
                      <div className="grid w-full items-center gap-1.5">
                        <LabelSMResponsive className="text-[#616161] ">
                          Zip-Code{" "}
                          <span className="text-[rgb(237,145,146)]">*</span>
                          <ReqiredFieldErrorImage
                            error={(errors as any).address?.pincode}
                          />
                        </LabelSMResponsive>
                        <InputSMResponsive
                          type="text"
                          defaultValue={
                            getAPIDataDocs?.__onload?.addr_list[0]?.pincode
                          }
                          {...register("address.pincode", { required: true })}
                          className={`${(errors as any).address?.pincode &&
                            "border-[#FF441B]"
                            }`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Contact Div */}
                  <div className="mt-5  bg-[#F6F9FD] p-4">
                    <div className="flex justify-between">
                      <h5 className="mb-1 heading-text-xl font-semibold text-[#616161]">
                        Contact
                      </h5>
                    </div>
                    <Separator orientation="horizontal" className="my-2" />
                    <div className="grid lg:grid-cols-3 gap-4 mt-4">
                      <div className="grid w-full  items-center gap-1.5">
                        <LabelSMResponsive className="text-[#616161] ">
                          Primary Phone
                        </LabelSMResponsive>
                        <Controller
                          name="contact_details.primary_phone"
                          control={control}
                          render={({ field: { onChange, value } }) => (
                            <div ref={inputRefs.current[3]}>
                              <PhoneInput
                                value={value}
                                onChange={onChange}
                                placeholder="Enter Phone Number"
                                prefix=""
                                defaultCountry="us"
                                inputClassName="w-full h-full"
                                className="w-full h-full"
                              />
                            </div>
                          )}
                        />
                      </div>
                      <div className="grid w-full items-center gap-1.5">
                        <LabelSMResponsive className="text-[#616161] ">
                          Secondary Phone
                        </LabelSMResponsive>

                        <Controller
                          name="contact_details.secondary_phone"
                          control={control}
                          defaultValue={
                            getAPIDataDocs?.__onload?.contact_list[0]?.phone
                          }
                          render={({ field: { onChange, value } }) => (
                            <div ref={inputRefs.current[4]}>
                              <PhoneInput
                                value={value}
                                onChange={onChange}
                                placeholder="Enter Phone Number"
                                prefix=""
                                inputClassName="w-full h-full"
                                className="w-full h-full"
                              />
                            </div>
                          )}
                        />
                      </div>
                      <div className="grid w-full items-center gap-1.5">
                        <LabelSMResponsive className="text-[#616161] ">
                          Email
                        </LabelSMResponsive>
                        <InputSMResponsive
                          type="email"
                          placeholder="email@email.com"
                          defaultValue={
                            getAPIDataDocs?.__onload?.contact_list[0]?.email_id
                          }
                          {...register("contact_details.email")}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Patient Relation */}
                  <div className="mt-5  bg-[#F6F9FD] p-4">
                    <div className="flex justify-between">
                      <h5 className="mb-1 heading-text-xl font-semibold text-[#616161]">
                        Patient Relation
                      </h5>
                    </div>
                    <Separator orientation="horizontal" className="my-2" />
                    <div className="m-4 flex-wrap flex gap-2">
                      {selectPatientRelation.map(
                        (PatientRealtion: any, index: any) => (
                          <PatientRelationCard
                            showData={true}
                            data={PatientRealtion}
                            setData={setSelectionPatientRelationData}
                            index={index}
                            key={index}
                          />
                        )
                      )}
                      <PatientRelationCard
                        showData={false}
                        addData={AddNewPatientRelation}
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
            {selectedStepper === "medicalHistory" && (
              <MedicalHistory
                getAPIDataDocs={getAPIDataDocs}
                params={params}
                registerPropValue={register}
                useStateProps={{
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
                }}
              />
            )}
            {selectedStepper === "insuranceDetails" && (
              <Insurancedetails
                getAPIDataDocs={getAPIDataDocs}
                useStateProps={{
                  selectPaymentType,
                  setSelectPaymentType,
                  handleSelectPaymentTypeChanges,
                  isPrimaryPolicyHolder,
                  setIsPrimaryPolicyHolder,
                  handleisPrimaryPolicyHolderChanges,
                }}
                register={register}
              />
            )}
            {/* {selectedStepper === "addressContact" && <AddressContact />} */}

            {/* {selectedStepper === "prescriptionBenefitInformation" && (
            <PrescriptionBenefitInformation />
          )} */}
            {selectedStepper === "clinicalInformation" && (
              <ClinicalInformation />
            )}
            {/* {selectedStepper === "appointments" && <Appointment />} */}
            {selectedStepper === "communications" && <Communications />}
            {/* {selectedStepper === "activity" && (
              <Activity selectActivity={selectActivity} />
            )}
            {selectedStepper === "comments" && (
              <Comments getComments={selectComment} params={params} />
            )} */}
          </div>
          <div className="flex justify-end mt-4 sticky bottom-1 py-2">
            <div className="flex space-x-4">
              <div className="items-end space-x-2">
                <Button
                  className="bg-[#47BDFF] text-white border-[#474747] border-x  border-y border-opacity-20 font-semibold xl:text-sm text-xs"
                  onClick={() => finalSubmit(true)}
                >
                  Save & Close
                </Button>
              </div>
              <div className="items-end space-x-2">
                <Button
                  className="bg-[#47BDFF] text-white border-[#474747] border-x  border-y border-opacity-20 font-semibold xl:text-sm text-xs"
                  onClick={() => finalSubmit(false)}
                >
                  Save & Next
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPatient;
