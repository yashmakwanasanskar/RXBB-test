import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import Cookies from "js-cookie";
import { ChevronLeft } from "lucide-react";
import React, { useContext, useEffect, useState, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";

import DynamicRadioButton from "@/components/shared/DynamicRadioButton";
import { LayoutContext } from "@/components/shared/LayoutContext";
import { ComboboxDropDownWithUseFormHook } from "@/components/shared/comboBoxDropDown";
import ReqiredFieldErrorImage from "@/components/shared/reqiredFieldError";
import API, { BASE_URL } from "@/constants/api.constant";
import ROUTES from "@/constants/routes.constats";
import { getChildValueWrapper, getListWrapper } from "@/helpers/API/APIWrapper";
import { getDocMethod, getList, validatedLink } from "@/helpers/API/getAPIData";
import { axiosPOSTAPI } from "@/helpers/commonAPI";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { PhoneInput } from "react-international-phone";
import { ImmunizationServiceAddPatientIcon } from "@/constants/images";
import { CustomDrawer } from "@/components/shared/drawer/drawer";
import AddPatientModal from "@/components/shared/modals/add-patient";

// const EligibilityCrieria = () => {
//   const frameworks = [
//     {
//       value: "medicalmtm",
//       label: "Medi-cal MTM",
//     },
//     {
//       value: "sveltekit",
//       label: "SvelteKit",
//     },
//   ];

//   return (
//     <div className="mt-5  bg-[#F6F9FD] px-4 py-4 m-4">
//       <div className="grid grid-flow-row gap-4">
//         <div className="">
//           <Label className="text-[#616161]  xl:text-sm text-xs">
//             Service Provider Form
//           </Label>
//           <div className="mt-1">
//             <ComboboxDemo data={frameworks} />
//           </div>
//         </div>
//         <div className="flex space-x-4">
//           <Checkbox id="eligibilitycriteriachecbox1" className=" my-auto" />
//           <label className=" font-medium leading-6 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[#474747] xl:text-sm text-xs">
//             An outpatient (not inpatient or in an institutional setting)
//           </label>
//         </div>
//         <div className="flex space-x-4">
//           <Checkbox id="eligibilitycriteriachecbox2" className=" my-auto" />
//           <label className="font-medium leading-6 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[#474747] xl:text-sm text-xs">
//             Not eligible for Medicare Part D
//           </label>
//         </div>
//         <div className="flex space-x-4">
//           <Checkbox id="eligibilitycriteriachecbox3" className=" my-auto" />
//           <div className="">
//             <label className="font-medium leading-6 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[#474747]  xl:text-sm text-xs">
//               Not eligible for Medicare Part D
//             </label>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const PatientHistory = ({ patientHistoryProps }: any) => {
//   const {
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
//   } = patientHistoryProps;
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

//   return (
//     <div>
//       <div className="mt-5  bg-[#F6F9FD] px-4 py-4 m-4">
//         <h5 className="mb-1  xl:text-xl sm:text-lg text-base font-semibold text-[#474747] ">
//           Allergies, Medical and Surgical History
//         </h5>
//         <Separator orientation="horizontal" className="my-3" />
//         <div className="mr-5 mb-5 ml-2 bg-[#F4F5F7] border">
//           <h4 className="m-3 font-semibold  xl:text-xl sm:text-lg text-base text-[#333333]">
//             Health Conditions
//           </h4>
//           <hr className="border border-[#D4D6DD]" />
//           <div className="m-4 grid grid-cols-8 gap-4">
//             <HealthConditionsCard showData={false} />
//           </div>
//         </div>

//         <div className="mr-5 mb-5 ml-2 bg-[#F4F5F7] border">
//           <h4 className="m-3 font-semibold  xl:text-xl sm:text-lg text-base text-[#333333]">
//             Drug Allergies + Side Effects
//           </h4>
//           <hr className="border border-[#D4D6DD]" />
//           <div className="m-4 grid grid-cols-4 gap-4">
//             <DrugAllergiesCard showData={false} inputLabel={[]}/>
//           </div>
//         </div>

//         <div className="mr-5 ml-2 bg-[#F4F5F7] border">
//           <h4 className="m-3 font-semibold  xl:text-xl sm:text-lg text-base text-[#333333]">
//             Medications
//           </h4>
//           <hr className="border border-[#D4D6DD]" />
//           <div className="m-4 grid gap-4">
//             <MedicationsCard
//               showData={false}
//               setData={undefined}
//               data={undefined}
//               index={undefined}
//             />
//           </div>
//         </div>
//       </div>
//       <Accordion type="multiple">
//         {/* Social History Section */}
//         <AccordionItem value="item-2" className="bg-[#F6F9FD] px-4 m-4">
//           <AccordionTrigger className="text-left mb-1  xl:text-xl sm:text-lg text-base font-semibold text-[#474747]">
//             Social History Section
//           </AccordionTrigger>
//           <AccordionContent>
//             <Separator orientation="horizontal" />
//             <div className="mt-4 grid lg:grid-cols-2 gap-9  mr-5">
//               <div className="w-full">
//                 <Label className="text-[#707070] font-semibold  xl:text-sm text-xs mb-2">
//                   1. Do you currently use or have you ever used tobacco
//                   products?
//                 </Label>
//                 <RadioGroup defaultValue="yes" className="flex gap-5 mt-2">
//                   <div
//                     className={`flex items-center space-x-2  ${
//                       usedTobacoProduct === "yes"
//                         ? "bg-[#7ACFFF]"
//                         : "border-2 border-[#DDDDDD] bg-white"
//                     }  rounded-3xl p-2`}
//                   >
//                     <RadioGroupItem
//                       value="yes"
//                       id="yesSocialHistorySection"
//                       className={`${
//                         usedTobacoProduct === "yes" &&
//                         "border-[#FFFFFF] text-[#FFFFFF]"
//                       }`}
//                       onClick={handlerSetUsedTobacoProductChange}
//                       checked={usedTobacoProduct === "yes"}
//                     />
//                     <Label
//                       htmlFor="yesSocialHistorySection"
//                       className={`${
//                         usedTobacoProduct === "yes"
//                           ? "text-[#FFFFFF]"
//                           : "text-[#616161]"
//                       } font-semibold xl:text-sm text-xs`}
//                     >
//                       Yes
//                     </Label>
//                   </div>
//                   <div
//                     className={`flex items-center space-x-2  ${
//                       usedTobacoProduct === "no"
//                         ? "bg-[#7ACFFF]"
//                         : "border-2 border-[#DDDDDD] bg-white"
//                     }  rounded-3xl p-2`}
//                   >
//                     <RadioGroupItem
//                       value="no"
//                       id="noSocialHistorySection"
//                       className={` ${
//                         usedTobacoProduct === "no" &&
//                         "border-[#FFFFFF] text-[#FFFFFF]"
//                       } `}
//                       onClick={handlerSetUsedTobacoProductChange}
//                       checked={usedTobacoProduct === "no"}
//                     />
//                     <Label
//                       htmlFor="noSocialHistorySection"
//                       className={`${
//                         usedTobacoProduct === "no"
//                           ? "text-[#FFFFFF]"
//                           : "text-[#616161]"
//                       } font-semibold xl:text-sm text-xs`}
//                     >
//                       No
//                     </Label>
//                   </div>
//                 </RadioGroup>
//               </div>
//               <div className="w-full">
//                 <Label className="text-[#707070] font-semibold xl:text-sm text-xs mb-2">
//                   when did you first start smoking?
//                 </Label>
//                 <Input className="mx-1 xl:text-sm text-xs" />
//               </div>
//             </div>
//             <div className="mt-5 grid lg:grid-cols-2 gap-9  mr-5">
//               <div className="w-full flex gap-2">
//                 <Checkbox id="current-cigarette-smoker" />
//                 <label
//                   htmlFor="current-cigarette-smoker"
//                   className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[#616161] xl:text-sm text-xs"
//                 >
//                   Current cigarette smoker
//                 </label>
//               </div>

//               <div className="w-full flex gap-2">
//                 <Checkbox id="former-cigarette-smoker" />
//                 <label
//                   htmlFor="former-cigarette-smoker"
//                   className="xl:text-sm text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[#616161]"
//                 >
//                   Former cigarette smoker
//                 </label>
//               </div>
//             </div>
//             <div className="mt-5 mr-5 grid lg:grid-cols-2 gap-9">
//               <div className="w-full">
//                 <Label className="text-[#707070] font-semibold xl:text-sm text-xs mb-2">
//                   when did you first start smoking?
//                 </Label>
//                 <Input className="mx-1 xl:text-sm text-xs" />
//               </div>
//               <div className="w-full">
//                 <Label className="text-[#707070] font-semibold xl:text-sm text-xs mb-2">
//                   when did you first quit smoking?
//                 </Label>
//                 <Input className="mx-1 xl:text-sm text-xs" />
//               </div>
//             </div>
//             <div className="mt-5 grid lg:grid-cols-2 gap-4  mr-5">
//               <div className="w-full flex gap-2">
//                 <Checkbox id="other-tobbaco-user" />
//                 <label
//                   htmlFor="other-tobbaco-user"
//                   className="xl:text-sm text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[#616161]"
//                 >
//                   Other tobacco user (Circle:cigars, hookah, chew, vape).
//                 </label>
//               </div>
//               <div className="w-full  lg:ml-4">
//                 <Label className="text-[#707070] font-semibold xl:text-sm text-xs mb-2">
//                   On average how many cigarettes did you smoke per
//                   day(Cigarette)?
//                 </Label>
//                 <Input className="xl:text-sm text-xs" />
//               </div>
//             </div>
//             <div className="mt-5  mr-5">
//               <div className="">
//                 <Label className="text-[#707070] font-semibold xl:text-sm text-xs mb-2">
//                   When did you quit smoking?
//                 </Label>
//                 <Input className="mx-1 w-[45rem] xl:text-sm text-xs" />
//               </div>
//             </div>
//             <Separator orientation="horizontal" className="my-4" />
//             <div className="mt-5  mr-5">
//               <div className="">
//                 <Label className="text-[#707070] font-semibold xl:text-sm text-xs mb-2">
//                   2. How many times in the past year have you had 4 or more
//                   alcoholic drinks in 1 day?
//                 </Label>
//                 <Input className="mx-1 xl:text-sm text-xs" />
//               </div>
//             </div>
//             <Separator orientation="horizontal" className="my-4" />
//             <div className="mt-5  mr-5">
//               <div className="">
//                 <Label className="text-[#707070] font-semibold xl:text-sm text-xs mb-2">
//                   3. How many times in the past year have you used recreational
//                   or prescription drug for non-medical reasons?
//                 </Label>
//                 <Input className="mx-1 xl:text-sm text-xs" />
//               </div>
//             </div>
//             <Separator orientation="horizontal" className="my-4" />

//             <div className="mt-5  mr-5 grid xl:grid-cols-2  gap-4">
//               <div className="w-full">
//                 <Label className="text-[#707070] font-semibold xl:text-sm text-xs mb-2">
//                   4. If you use opioids, do you have access to Narcan
//                   (Naloxone)?
//                 </Label>
//                 <RadioGroup
//                   defaultValue="yes"
//                   className="flex xl:gap-5  mt-2 text-center"
//                 >
//                   <div
//                     className={`flex items-center space-x-2  ${
//                       accessToNarcan === "notApplicable"
//                         ? "bg-[#7ACFFF]"
//                         : "border-2 border-[#DDDDDD] bg-white"
//                     }  rounded-3xl p-2 w-fit`}
//                   >
//                     <RadioGroupItem
//                       value="notApplicable"
//                       id="notApplicableAccessToNarcan"
//                       className={`${
//                         accessToNarcan === "notApplicable" &&
//                         "border-[#FFFFFF] text-[#FFFFFF]"
//                       }`}
//                       onClick={handlerSetaccessToNarcanChange}
//                       checked={accessToNarcan === "notApplicable"}
//                     />
//                     <Label
//                       htmlFor="notApplicableAccessToNarcan"
//                       className={`${
//                         accessToNarcan === "notApplicable"
//                           ? "text-[#FFFFFF]"
//                           : "text-[#616161]"
//                       } font-semibold xl:text-sm text-xs`}
//                     >
//                       Not Applicable
//                     </Label>
//                   </div>
//                   <div
//                     className={`flex items-center space-x-2  ${
//                       accessToNarcan === "yes"
//                         ? "bg-[#7ACFFF]"
//                         : "border-2 border-[#DDDDDD] bg-white"
//                     }  rounded-3xl p-2 w-fit`}
//                   >
//                     <RadioGroupItem
//                       value="yes"
//                       id="yesAccessToNarcan"
//                       className={`${
//                         accessToNarcan === "yes" &&
//                         "border-[#FFFFFF] text-[#FFFFFF]"
//                       }`}
//                       onClick={handlerSetaccessToNarcanChange}
//                       checked={accessToNarcan === "yes"}
//                     />
//                     <Label
//                       htmlFor="yesAccessToNarcan"
//                       className={`${
//                         accessToNarcan === "yes"
//                           ? "text-[#FFFFFF]"
//                           : "text-[#616161]"
//                       } font-semibold xl:text-sm text-xs`}
//                     >
//                       Yes
//                     </Label>
//                   </div>
//                   <div
//                     className={`flex items-center space-x-2  ${
//                       accessToNarcan === "no"
//                         ? "bg-[#7ACFFF]"
//                         : "border-2 border-[#DDDDDD] bg-white"
//                     }  rounded-3xl p-2 w-fit`}
//                   >
//                     <RadioGroupItem
//                       value="no"
//                       id="noAccessToNarcan"
//                       className={` ${
//                         accessToNarcan === "no" &&
//                         "border-[#FFFFFF] text-[#FFFFFF]"
//                       } `}
//                       onClick={handlerSetaccessToNarcanChange}
//                       checked={accessToNarcan === "no"}
//                     />
//                     <Label
//                       htmlFor="noAccessToNarcan"
//                       className={`${
//                         accessToNarcan === "no"
//                           ? "text-[#FFFFFF]"
//                           : "text-[#616161]"
//                       } font-semibold xl:text-sm text-xs`}
//                     >
//                       No
//                     </Label>
//                   </div>
//                 </RadioGroup>
//               </div>
//               <div className="w-full ">
//                 <Label className="text-[#707070] font-semibold xl:text-sm text-xs mb-2">
//                   Are you interesting in quiting?
//                 </Label>
//                 <RadioGroup
//                   defaultValue="readyToQuite"
//                   className="flex xl:gap-5 mt-2 text-center"
//                 >
//                   <div
//                     className={`flex items-center space-x-2  ${
//                       wantToQuit === "thinkAboutQuiting"
//                         ? "bg-[#7ACFFF]"
//                         : "border-2 border-[#DDDDDD] bg-white"
//                     }  rounded-3xl p-2 `}
//                   >
//                     <RadioGroupItem
//                       value="thinkAboutQuiting"
//                       id="thinkAboutQuitingInterestinginQuiting"
//                       className={`${
//                         wantToQuit === "thinkAboutQuiting" &&
//                         "border-[#FFFFFF] text-[#FFFFFF]"
//                       }`}
//                       onClick={handlerSetWantToQuitChange}
//                       checked={wantToQuit === "thinkAboutQuiting"}
//                     />
//                     <Label
//                       htmlFor="thinkAboutQuitingInterestinginQuiting"
//                       className={`${
//                         wantToQuit === "thinkAboutQuiting"
//                           ? "text-[#FFFFFF]"
//                           : "text-[#616161]"
//                       } font-semibold xl:text-sm text-xs`}
//                     >
//                       Think about quiting
//                     </Label>
//                   </div>
//                   <div
//                     className={`flex items-center space-x-2  ${
//                       wantToQuit === "no"
//                         ? "bg-[#7ACFFF]"
//                         : "border-2 border-[#DDDDDD] bg-white"
//                     }  rounded-3xl p-2 w-fit`}
//                   >
//                     <RadioGroupItem
//                       value="no"
//                       id="noInterestinginQuiting"
//                       className={` ${
//                         wantToQuit === "no" && "border-[#FFFFFF] text-[#FFFFFF]"
//                       } w-fit`}
//                       onClick={handlerSetWantToQuitChange}
//                       checked={wantToQuit === "no"}
//                     />
//                     <Label
//                       htmlFor="noInterestinginQuiting"
//                       className={`${
//                         wantToQuit === "no"
//                           ? "text-[#FFFFFF]"
//                           : "text-[#616161]"
//                       } font-semibold xl:text-sm text-xs`}
//                     >
//                       No
//                     </Label>
//                   </div>
//                   <div
//                     className={`flex items-center space-x-2  ${
//                       wantToQuit === "readyToQuite"
//                         ? "bg-[#7ACFFF]"
//                         : "border-2 border-[#DDDDDD] bg-white"
//                     }  rounded-3xl p-2 w-fit`}
//                   >
//                     <RadioGroupItem
//                       value="readyToQuite"
//                       id="readyToQuiteInterestinginQuiting"
//                       className={`${
//                         wantToQuit === "readyToQuite" &&
//                         "border-[#FFFFFF] text-[#FFFFFF]"
//                       }`}
//                       onClick={handlerSetWantToQuitChange}
//                       checked={wantToQuit === "readyToQuite"}
//                     />
//                     <Label
//                       htmlFor="readyToQuiteInterestinginQuiting"
//                       className={`${
//                         wantToQuit === "readyToQuite"
//                           ? "text-[#FFFFFF]"
//                           : "text-[#616161]"
//                       } font-semibold xl:text-sm text-xs`}
//                     >
//                       Ready to quite
//                     </Label>
//                   </div>
//                 </RadioGroup>
//               </div>
//             </div>
//           </AccordionContent>
//         </AccordionItem>

//         {/* Family Health History */}
//         <AccordionItem value="item-3" className="bg-[#F6F9FD] px-4  m-4">
//           <AccordionTrigger className="text-left mb-1  xl:text-xl sm:text-lg text-base font-semibold text-[#474747]">
//             Family Health History
//           </AccordionTrigger>
//           <AccordionContent>
//             <Separator orientation="horizontal" />
//             <p className="font-semibold xl:text-base sm:text-sm text-xs text-[#707070]">
//               Have any of your blood relatives had any of the following? If so,
//               please indicate which of your blood relatives have the condition.
//             </p>
//             <div className="my-3 grid grid-cols-5 gap-4">
//               <FamilyHealthCard showData={false} />
//             </div>
//           </AccordionContent>
//         </AccordionItem>
//         {/* Past medical, surgical and hospitalization history Section */}
//         <AccordionItem
//           value="item-4"
//           className="text-left bg-[#F6F9FD] px-4  m-4"
//         >
//           <AccordionTrigger className="mb-1  xl:text-xl sm:text-lg text-base font-semibold text-[#474747] text-left">
//             Past medical, surgical and hospitalization history
//           </AccordionTrigger>
//           <AccordionContent>
//             <Separator orientation="horizontal" />
//             <p className="font-semibold xl:text-lg sm:text-base text-sm text-[#616161]">
//               Surgical History
//             </p>
//             <p className="font-semibold xl:text-base sm:text-sm text-xs text-[#707070]">
//               What surgeries have you had in the past, and in what year?
//             </p>
//             <div className="my-3 grid grid-cols-5 gap-4">
//               <DrugAllergiesCard showData={false} inputLabel={[]} />
//             </div>
//             <div className="mt-5  mr-5 flex gap-4">
//               <div className="w-full">
//                 <Label className="text-[#707070] font-semibold xl:text-sm text-xs mb-2">
//                   Have you ever injected or pumped silicone, oils, or other
//                   substances for the purpose of body shaping? (Naloxone)?
//                 </Label>
//                 <RadioGroup defaultValue="yes" className="flex gap-5 mt-2">
//                   <div
//                     className={`flex items-center space-x-2  ${
//                       haveYouEverInjected === "yes"
//                         ? "bg-[#7ACFFF]"
//                         : "border-2 border-[#DDDDDD] bg-white"
//                     }  rounded-3xl p-2`}
//                   >
//                     <RadioGroupItem
//                       value="yes"
//                       id="yesHaveYouEverInjected"
//                       className={`${
//                         haveYouEverInjected === "yes" &&
//                         "border-[#FFFFFF] text-[#FFFFFF]"
//                       }`}
//                       onClick={handlerSetHaveYouEverInjectedChange}
//                       checked={haveYouEverInjected === "yes"}
//                     />
//                     <Label
//                       htmlFor="yesHaveYouEverInjected"
//                       className={`${
//                         haveYouEverInjected === "yes"
//                           ? "text-[#FFFFFF]"
//                           : "text-[#616161]"
//                       } font-semibold xl:text-sm text-xs`}
//                     >
//                       Yes
//                     </Label>
//                   </div>
//                   <div
//                     className={`flex items-center space-x-2  ${
//                       haveYouEverInjected === "no"
//                         ? "bg-[#7ACFFF]"
//                         : "border-2 border-[#DDDDDD] bg-white"
//                     }  rounded-3xl p-2`}
//                   >
//                     <RadioGroupItem
//                       value="no"
//                       id="noHaveYouEverInjected"
//                       className={`${
//                         haveYouEverInjected === "no" &&
//                         "border-[#FFFFFF] text-[#FFFFFF]"
//                       }`}
//                       onClick={handlerSetHaveYouEverInjectedChange}
//                       checked={haveYouEverInjected === "no"}
//                     />
//                     <Label
//                       htmlFor="noHaveYouEverInjected"
//                       className={`${
//                         haveYouEverInjected === "no"
//                           ? "text-[#FFFFFF]"
//                           : "text-[#616161]"
//                       } font-semibold xl:text-sm text-xs`}
//                     >
//                       No
//                     </Label>
//                   </div>
//                 </RadioGroup>
//               </div>
//             </div>
//             <Separator orientation="horizontal" className="my-4" />
//             <div className="mt-5  mr-5 gap-4">
//               <Label className="text-[#616161] font-bold mb-2  xl:text-[0.85rem] text-xs">
//                 Hospitalization History
//               </Label>
//               <div className="w-full">
//                 <Label className="text-[#707070] font-semibold xl:text-sm text-xs mb-2">
//                   Other than for surgery or childbirth, have you ever been
//                   hospitalized overnight for a medical or mental health issue?
//                 </Label>
//                 <RadioGroup defaultValue="yes" className="flex gap-5 mt-2">
//                   <div
//                     className={`flex items-center space-x-2  ${
//                       haveYouEverHospitalized === "yes"
//                         ? "bg-[#7ACFFF]"
//                         : "border-2 border-[#DDDDDD] bg-white"
//                     }  rounded-3xl p-2`}
//                   >
//                     <RadioGroupItem
//                       value="yes"
//                       id="yesHospitalizationHistory"
//                       className={`${
//                         haveYouEverHospitalized === "yes" &&
//                         "border-[#FFFFFF] text-[#FFFFFF]"
//                       }`}
//                       onClick={handlerSetHaveYouEverHospitalizedChange}
//                       checked={haveYouEverHospitalized === "yes"}
//                     />
//                     <Label
//                       htmlFor="yesHospitalizationHistory"
//                       className={`${
//                         haveYouEverHospitalized === "yes"
//                           ? "text-[#FFFFFF]"
//                           : "text-[#616161]"
//                       } font-semibold xl:text-sm text-xs`}
//                     >
//                       Yes
//                     </Label>
//                   </div>
//                   <div
//                     className={`flex items-center space-x-2  ${
//                       haveYouEverHospitalized === "no"
//                         ? "bg-[#7ACFFF]"
//                         : "border-2 border-[#DDDDDD] bg-white"
//                     }  rounded-3xl p-2`}
//                   >
//                     <RadioGroupItem
//                       value="no"
//                       id="noHospitalizationHistory"
//                       className={`${
//                         haveYouEverHospitalized === "no" &&
//                         "border-[#FFFFFF] text-[#FFFFFF]"
//                       }`}
//                       onClick={handlerSetHaveYouEverHospitalizedChange}
//                       checked={haveYouEverHospitalized === "no"}
//                     />
//                     <Label
//                       htmlFor="noHospitalizationHistory"
//                       className={`${
//                         haveYouEverHospitalized === "no"
//                           ? "text-[#FFFFFF]"
//                           : "text-[#616161]"
//                       } font-semibold xl:text-sm text-xs`}
//                     >
//                       No
//                     </Label>
//                   </div>
//                 </RadioGroup>
//                 <div className="mt-4">
//                   <Label className="mb-2 xl:text-sm text-xs">
//                     What for and when?
//                   </Label>
//                   <Input className="mx-1 xl:text-sm text-xs" />
//                 </div>
//               </div>
//             </div>
//           </AccordionContent>
//         </AccordionItem>

//         {/* Environmental Factors Employment and Living Condition Section */}
//         <AccordionItem
//           value="item-5"
//           className="text-left bg-[#F6F9FD] px-4  m-4"
//         >
//           <AccordionTrigger className="mb-1 xl:text-xl sm:text-lg text-base font-semibold text-[#474747] text-left">
//             Environmental Factors Employment and Living Condition
//           </AccordionTrigger>
//           <AccordionContent>
//             <p className="font-semibold xl:text-lg sm:text-base text-sm text-[#616161]">
//               Employment, Housing, &Transportation
//             </p>

//             <div className="my-2 grid gap-4">
//               <MedicationsCard
//                 showData={false}
//                 setData={undefined}
//                 data={undefined}
//                 index={undefined}
//               />
//             </div>
//           </AccordionContent>
//         </AccordionItem>
//       </Accordion>
//     </div>
//   );
// };

// const MedicalActionPlan = () => {
//   return (
//     <div className="mt-5  bg-[#F6F9FD] px-4 py-4 m-4">
//       <h5 className="mb-1   xl:text-xl sm:text-lg  font-semibold text-[#474747] ">
//         Vital Signs
//       </h5>
//       <Separator orientation="horizontal" className="my-3" />
//       <div className="grid 2xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-6 mt-7">
//         <div className="grid w-full  items-center gap-1.5">
//           <Label className="text-[#616161] xl:text-sm text-xs">
//             Date <span className="text-[#ED9192] xl:text-sm text-xs">*</span>
//           </Label>
//           <Input type="date" className=" xl:text-sm text-xs" />
//         </div>
//         <div className="grid w-full  items-center gap-1.5">
//           <Label className="text-[#616161] xl:text-sm text-xs">
//             Time(hh:mm){" "}
//             <span className="text-[#ED9192] xl:text-sm text-xs">*</span>
//           </Label>
//           <Input type="time" className=" xl:text-sm text-xs" />
//         </div>
//         <div className="grid w-full  items-center gap-1.5">
//           <Label className="text-[#616161] xl:text-sm text-xs">
//             Heart Rate / Pulse
//           </Label>
//           <Input type="number" className=" xl:text-sm text-xs" />
//         </div>
//         <div className="grid w-full  items-center gap-1.5">
//           <Label className="text-[#616161] xl:text-sm text-xs">
//             Height (Feet & Inches)
//           </Label>
//           <Input
//             type="number"
//             placeholder="6'2"
//             className=" xl:text-sm text-xs"
//           />
//         </div>
//         <div className="grid w-full  items-center gap-1.5">
//           <Label className="text-[#616161] xl:text-sm text-xs">
//             Weight (in lbs.)
//           </Label>
//           <Input
//             type="number"
//             placeholder="0.0"
//             className=" xl:text-sm text-xs"
//           />
//         </div>
//         <div className="grid w-full  items-center gap-1.5">
//           <Label className="text-[#616161] xl:text-sm text-xs">BMI</Label>
//           <Input
//             type="number"
//             placeholder="0.0"
//             className=" xl:text-sm text-xs"
//           />
//         </div>
//       </div>
//       <Separator orientation="horizontal" className="my-3" />
//       <div className="grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-6 mt-7">
//         <div className="grid w-full  items-center gap-1.5">
//           <Label className="text-[#616161]  xl:text-sm text-xs">
//             Questions I want to ask (include topics about medications or
//             therapy):
//           </Label>
//           <Input type="text" className=" xl:text-sm text-xs" />
//         </div>
//         <div className="grid w-full  items-center gap-1.5">
//           <Label className="text-[#616161] xl:text-sm text-xs">
//             My follow-up plan (add notes about next steps):
//           </Label>
//           <Input type="text" className=" xl:text-sm text-xs" />
//         </div>
//       </div>
//     </div>
//   );
// };
// const Scheduling = () => {
//   const [selectDeliveryMethod, setSelectDeliveryMethod] =
//     useState("faceToFace");
//   const handlerForSetSelectDeliveryMethod = (e: any) => {
//     setSelectDeliveryMethod(e.target.value);
//   };

//   return (
//     <div>
//       <div className="mt-5  bg-[#F6F9FD] px-4 py-4 m-4">
//         <h5 className="mb-1 xl:text-xl sm:text-lg font-semibold text-[#707070] ">
//           Service Delivery
//         </h5>
//         <Separator orientation="horizontal" className="my-3" />
//         <Label className="text-[#707070] font-semibold xl:text-sm text-xs mb-2">
//           Delivery Method
//         </Label>
//         <RadioGroup defaultValue="faceToFace" className="flex gap-5 mt-2">
//           <div
//             className={`flex items-center space-x-2  ${
//               selectDeliveryMethod === "faceToFace"
//                 ? "bg-[#7ACFFF]"
//                 : "border-2 border-[#DDDDDD] bg-white"
//             }  rounded-3xl p-2`}
//           >
//             <RadioGroupItem
//               value="faceToFace"
//               id="faceToFace"
//               className={`${
//                 selectDeliveryMethod === "faceToFace" &&
//                 "border-[#FFFFFF] text-[#FFFFFF]"
//               }`}
//               onClick={handlerForSetSelectDeliveryMethod}
//               checked={selectDeliveryMethod === "faceToFace"}
//             />
//             <Label
//               htmlFor="faceToFace"
//               className={`${
//                 selectDeliveryMethod === "faceToFace"
//                   ? "text-[#FFFFFF]"
//                   : "text-[#616161]"
//               } font-semibold  xl:text-sm text-xs`}
//             >
//               Face To Face
//             </Label>
//           </div>
//           <div
//             className={`flex items-center space-x-2  ${
//               selectDeliveryMethod === "teleHealth"
//                 ? "bg-[#7ACFFF]"
//                 : "border-2 border-[#DDDDDD] bg-white"
//             }  rounded-3xl p-2`}
//           >
//             <RadioGroupItem
//               value="teleHealth"
//               id="teleHealth"
//               className={`${
//                 selectDeliveryMethod === "teleHealth" &&
//                 "border-[#FFFFFF] text-[#FFFFFF]"
//               }`}
//               onClick={handlerForSetSelectDeliveryMethod}
//               checked={selectDeliveryMethod === "teleHealth"}
//             />
//             <Label
//               htmlFor="teleHealth"
//               className={`${
//                 selectDeliveryMethod === "teleHealth"
//                   ? "text-[#FFFFFF]"
//                   : "text-[#616161]"
//               } font-semibold  xl:text-sm text-xs`}
//             >
//               Telehealth
//             </Label>
//           </div>
//         </RadioGroup>
//       </div>
//       <div className="mt-5  bg-[#F6F9FD] px-4 py-4 m-4">
//         <h5 className="mb-1   xl:text-xl sm:text-lg font-semibold text-[#474747] ">
//           Appointment Details
//         </h5>
//         <Separator orientation="horizontal" className="my-3" />
//         <Label className="text-[#707070] font-semibold   xl:text-sm text-xs mb-2">
//           Open Appointment
//         </Label>
//       </div>
//     </div>
//   );
// };

// const PatientSummary = () => {
//   const [selectCMRWasCompleted, setSelectCMRWasCompleted] = useState(
//     "yesCMRWasCompeleted"
//   );
//   const [
//     selectLanguageTemplateForPatient,
//     setSelectLanguageTemplateForPatient,
//   ] = useState("englishLanguageTemplateForPatientSummary");
//   const [selectCMRPaymentType, setSelectCMRPaymentType] = useState(
//     "insuranceCMRPaymentType"
//   );
//   const CMRWasCompelted = [
//     {
//       label: "Yes",
//       value: "yesCMRWasCompeleted",
//     },
//     {
//       label: "No",
//       value: "noCMRWasCompeleted",
//     },
//   ];
//   const LanguageTemplatePatientSummary = [
//     {
//       label: "English",
//       value: "englishLanguageTemplateForPatientSummary",
//     },
//     {
//       label: "Spanish",
//       value: "spanishLanguageTemplateForPatientSummary",
//     },
//   ];
//   const CMRPaymentTypes = [
//     {
//       label: "Insurance",
//       value: "insuranceCMRPaymentType",
//     },
//     {
//       label: "Cash/Credit Card",
//       value: "cashCreditCardCMRPaymentType",
//     },
//   ];
//   const ServiceProviderFormComboBoxData = [
//     {
//       label: "Ready to Claim",
//       value: "readytoclaim",
//     },
//     {
//       label: "Not Ready to Claim",
//       value: "notreadytoclaim",
//     },
//   ];
//   const BillingStatusComboBoxData = [
//     {
//       label: "Ready for billing",
//       value: "readyforbilling",
//     },
//     {
//       label: "Not Ready for billing",
//       value: "notreadyforbilling",
//     },
//   ];

//   return (
//     <div className="mt-5  bg-[#F6F9FD] px-4 pb-4 pt-0.5 m-4">
//       <div className="grid 2xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-6 mt-7">
//         <div className="grid w-full  items-center gap-1.5">
//           <Label className="text-[#616161] xl:text-sm text-xs">
//             Date CMR was completed
//           </Label>
//           <Input
//             type="date"
//             placeholder="03-18-2024"
//             className=" xl:text-sm text-xs"
//           />
//         </div>
//         <div className="grid w-full  items-center gap-1.5">
//           <Label className="text-[#616161] xl:text-sm text-xs">
//             Pharmacists Availability for Questions?
//           </Label>
//           <Input
//             type="time"
//             placeholder="Monday to Friday 8am-5pm"
//             className=" xl:text-sm text-xs"
//           />
//         </div>
//         <div className="grid w-full  items-center gap-1.5">
//           <Label className="text-[#616161] xl:text-sm text-xs">BMI</Label>
//           <Input
//             type="number"
//             placeholder="0.0"
//             className=" xl:text-sm text-xs"
//           />
//         </div>
//         <div className="grid w-full  items-center gap-1.5 lg:col-span-2">
//           <Label className="text-[#616161] xl:text-sm text-xs">
//             Was the patient in a Long Term Care (LTC) facility when the CMR was
//             completed?
//           </Label>
//           <DynamicRadioButton
//             data={CMRWasCompelted}
//             getButtonSelection={selectCMRWasCompleted}
//             setButtonSelection={setSelectCMRWasCompleted}
//             defaultValue="yesCMRWasCompeleted"
//           />
//         </div>
//         <div className="grid w-full  items-center gap-1.5">
//           <Label className="text-[#616161] xl:text-sm text-xs">
//             Language template for the patient summary
//           </Label>
//           <DynamicRadioButton
//             data={LanguageTemplatePatientSummary}
//             getButtonSelection={selectLanguageTemplateForPatient}
//             setButtonSelection={setSelectLanguageTemplateForPatient}
//             defaultValue="englishLanguageTemplateForPatientSummary"
//           />
//         </div>
//         <div className="grid w-full  items-center gap-1.5">
//           <Label className="text-[#616161] xl:text-sm text-xs">
//             Address Line 1
//           </Label>
//           <Input
//             type="text"
//             placeholder="Address Line 1"
//             className="xl:text-sm text-xs"
//           />
//         </div>
//         <div className="grid w-full  items-center gap-1.5">
//           <Label className="text-[#616161] xl:text-sm text-xs">
//             Address Line 2
//           </Label>
//           <Input
//             type="text"
//             placeholder="Address Line 2"
//             className="xl:text-sm text-xs"
//           />
//         </div>
//         <div className="grid w-full  items-center gap-1.5">
//           <Label className="text-[#616161] xl:text-sm text-xs">State</Label>
//           <Input
//             type="text"
//             placeholder="State"
//             className="xl:text-sm text-xs"
//           />
//         </div>
//         <div className="grid w-full  items-center gap-1.5">
//           <Label className="text-[#616161] xl:text-sm text-xs">City</Label>
//           <Input
//             type="text"
//             placeholder="Chichago"
//             className="xl:text-sm text-xs"
//           />
//         </div>
//         <div className="grid w-full  items-center gap-1.5">
//           <Label className="text-[#616161] xl:text-sm text-xs">Zip-Code</Label>
//           <Input
//             type="number"
//             placeholder="60601"
//             className="xl:text-sm text-xs"
//           />
//         </div>
//       </div>
//       <Separator orientation="horizontal" className="my-3" />
//       <h5 className="mb-1 xl:text-lg sm:text-base text-sm font-semibold text-[#656565] ">
//         Service Details
//       </h5>
//       <div className="grid 2xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-6">
//         <div className="grid w-full  items-center gap-1.5">
//           <Label className="text-[#616161] xl:text-sm text-xs ">
//             Service start time
//           </Label>
//           <Input type="datetime-local" className=" xl:text-sm text-xs " />
//         </div>
//         <div className="grid w-full  items-center gap-1.5">
//           <Label className="text-[#616161] xl:text-sm text-xs ">
//             Service end time
//           </Label>
//           <Input type="datetime-local" className=" xl:text-sm text-xs " />
//         </div>
//         <div className="grid w-full  items-center gap-1.5">
//           <Label className="text-[#616161] xl:text-sm text-xs ">
//             Total Service Duration(in minutes)
//           </Label>
//           <Input type="number" className=" xl:text-sm text-xs " />
//         </div>
//         <div className="grid w-full  items-center gap-1.5">
//           <Label className="text-[#616161] xl:text-sm text-xs ">
//             Payment Type
//           </Label>
//           <DynamicRadioButton
//             data={CMRPaymentTypes}
//             getButtonSelection={selectCMRPaymentType}
//             setButtonSelection={setSelectCMRPaymentType}
//             defaultValue="insuranceCMRPaymentType"
//           />
//         </div>
//         <div className="grid w-full  items-center gap-1.5">
//           <Label className="text-[#616161] xl:text-sm text-xs ">
//             Service Provider Form
//           </Label>
//           <ComboboxDemo
//             data={ServiceProviderFormComboBoxData}
//             buttonClassName="w-full"
//             popOverClassName="w-full"
//           />
//         </div>
//         <div className="grid w-full  items-center gap-1.5">
//           <Label className="text-[#616161] xl:text-sm text-xs ">
//             Billing Status
//           </Label>
//           <ComboboxDemo
//             data={BillingStatusComboBoxData}
//             buttonClassName="w-full"
//             popOverClassName="w-full"
//           />
//         </div>
//       </div>
//       {/* billing Code here */}
//       <div>
//         <Separator orientation="horizontal" className="my-3" />
//         <h5 className="mb-1  xl:text-lg sm:text-base text-sm font-semibold text-[#656565] ">
//           Billing Code
//         </h5>
//       </div>
//       {/* reference Document */}
//       <Separator orientation="horizontal" className="my-3" />
//       <div>
//         <h5 className="mb-1  xl:text-lg sm:text-base text-sm font-semibold text-[#656565] ">
//           Reference Document
//         </h5>
//         <Input
//           type="text"
//           placeholder="CMR-24-1"
//           className="max-w-sm w-full xl:text-sm text-xs "
//         />
//       </div>
//       <div className="flex space-x-4 mt-5">
//         <Checkbox id="termsandcondition" className="mt-0.5" />
//         <label
//           htmlFor="termsandcondition"
//           className=" text-justify  xl:text-sm text-xs font-medium leading-5 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[#474747]"
//         >
//           I attest that I have reviewed and updated the patient&apos;s health,
//           allergies, medication, medication action plan, and discussed how to
//           safely dispose of unused Prescription medications. I will provide the
//           CMR recipient with the exact patient takeaway generated in this
//           platform
//         </label>
//       </div>
//     </div>
//   );
// };

// const Activity = () => {
//   const data = [
//     {
//       date: "Jan 15, 2024",
//       time: "11:50 AM",
//       heading1:
//         "Data Patient with Dr. Jonathan Woo, PharmD. - Tenant Admin Company",
//       heading2:
//         "Data Patient with Dr. Jonathan Woo, PharmD. - Tenant Admin Company",
//       activityBy: "By, Administrator",
//     },
//     {
//       date: "Jan 15, 2024",
//       time: "11:50 AM",
//       heading1:
//         "Data Patient with Dr. Jonathan Woo, PharmD. - Tenant Admin Company",
//       heading2:
//         "Data Patient with Dr. Jonathan Woo, PharmD. - Tenant Admin Company",
//       activityBy: "By, Administrator",
//     },

//     {
//       date: "Jan 15, 2024",
//       time: "11:50 AM",
//       heading1:
//         "You changed the value of 1. Do you currently use or have you ever used tobacco products? from toYes, Former cigarette smoker from0to1, Other tobacco user (Circle:cigars, hookah, chew, vape). How often and for how many years? from0to1",
//       heading2:
//         "Data Patient with Dr. Jonathan Woo, PharmD. - Tenant Admin Company",
//       activityBy: "By, Administrator",
//     },

//     {
//       date: "Jan 15, 2024",
//       time: "11:50 AM",
//       heading1:
//         "You changed the value of 1. Do you currently use or have you ever used tobacco products? from toYes, Former cigarette smoker from0to1, Other tobacco user (Circle:cigars, hookah, chew, vape). How often and for how many years? from0to1",
//       heading2:
//         "Data Patient with Dr. Jonathan Woo, PharmD. - Tenant Admin Company",
//       activityBy: "By, Administrator",
//     },
//     {
//       date: "Jan 15, 2024",
//       time: "11:50 AM",
//       heading1:
//         "You changed the value of 1. Do you currently use or have you ever used tobacco products? from toYes, Former cigarette smoker from0to1, Other tobacco user (Circle:cigars, hookah, chew, vape). How often and for how many years? from0to1",
//       heading2:
//         "Data Patient with Dr. Jonathan Woo, PharmD. - Tenant Admin Company",
//       activityBy: "By, Administrator",
//     },
//   ];
//   return (
//     <div className="lg:m-10 mt-5">
//       {/* <ActivityComponenet data={data} /> */}
//     </div>
//   );
// };
const AddCMR = () => {
  const params = { id: "add-new-CMR-wefwWDdwddgreges" };
  const [selectedStepper, setSelectedStepper] = useState("patientInfo");
  const [selectCMRRecipient, setselectCMRRecipient] = useState("Patient");
  const [selectOptionOnData, setSelectOptionOnData] = useState<any>([]);
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
  const [openAddPatient, setOnOpenPatient] = useState<boolean>(false);
  const handleInputChangeComboBox = (value: string, label: string) => {
    setComboBoxKeyValues((prev: any) => {
      return { ...prev, [label]: value };
    });
    if (label === "patient_name") {
      onChangePatientFieldHandler(value);
    }
  };
  const { setDocTypeStatus } = useContext<any>(LayoutContext);
  const [comboBoxKeyValues, setComboBoxKeyValues] = useState<any>({});
  //---------------------------------

  const changesetselectCMRRecipient = (e: any) => {
    setselectCMRRecipient(e.target.value);
    setValue("cmr_recipient", e.target.value);
  };
  const router = useNavigate();
  const steps = [
    {
      key: "patientInfo",
      label: "Patient Info",
    },
    // {
    //   key: "eligibilityCriteria",
    //   label: "Eligibility Criteria",
    // },
    // {
    //   key: "patientHistory",
    //   label: "Patient History",
    // },
    // {
    //   key: "scheduling",
    //   label: "Scheduling",
    // },
    // {
    //   key: "medicalActionPlan",
    //   label: "Medical Action Plan",
    // },
    // {
    //   key: "patientSummary",
    //   label: "Patient Summary",
    // },
    // {
    //   key: "activity",
    //   label: "Activity",
    // },
  ];

  //   const IncrementStepper = () => {
  //     let nextIndex = Math.min(
  //       steps.findIndex((step) => selectedStepper === step.key) + 1,
  //       steps.length - 1
  //     );
  //     setSelectedStepper(steps[nextIndex].key);
  //   };

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
      firstNameInputRefsdad?.querySelector(".focus-select").focus();
    }
  }, []);

  const DecrementStepper = () => {
    let nextIndex = Math.max(
      steps.findIndex((step) => selectedStepper === step.key) - 1,
      0
    );
    setSelectedStepper(steps[nextIndex].key);
  };

  const finalSubmit = async () => {
    const createCMR = async () => {
      const URL = BASE_URL + API.SAVE_DOCS;

      // const patientFields = (
      //   await getList(
      //     "Patient",
      //     `[["name","=","${comboBoxKeyValues.patient_name}"]]`,
      //     `["custom_do_you_currently_use_or_have_you_ever_tobacco_profucts","custom_current_cigarette_smoker","custom_when_did_you_first_start_smoking","custom_how_many_cigarettes_do_you_smoke_per_day","custom_are_you_interested_in_quiting_1","custom_former_cigarette_smoker","custom_when_did_you_quit_smoking","custom_on_average_how_many_cigarettes_did_you_smoke_per_day","custom_how_many_years_did_you_smoke_for","custom_other_tobacco_user","custom_other_description","custom_how_many_times_in_the_past_year","custom_are_you_interested_in_quiting_2","custom_past_year_have_you_had_4_or_more_alcoholic_drinks_iady","custom_use_opioids_and_have_access_to_nacran","custom_are_you_interesting_in_quiting","custom_purpose_of_body_shapping","custom_have_you_hospitalized_overnight","custom_what_for_and_when"]`,
      //     ""
      //   )
      // )[0];

      // const patientPersonalInfoFields = await validatedLink(
      //   "Patient",
      //   comboBoxKeyValues.patient_name,
      //   `["dob","mobile","sex","custom_pcp_name","custom_pcp_phone"]`
      // );
      const reqBody = {
        ...getRequestBody,
        pcp_name: getValues("pcp_name"),
        pcp_phone_number: getValues("pcp_phone"),
        cmr_recipient: selectCMRRecipient,
        reason_for_service: getValues("reason_for_service"),
        caregiver_name: getValues("caregiver_name"),
        caregiver_relationship: getValues("caregiver_relationship"),
        ...comboBoxKeyValues,
      };
      try {
        const response = await axiosPOSTAPI(URL, {
          doc: JSON.stringify(reqBody),
          action: "Save",
        });
        if (response.status !== 200) {
          console.log("CMR not Create");
        }
        const reqBodyForAppointment = response.data.docs[0];
        const respAppointment = await axiosPOSTAPI(
          BASE_URL + API.CREATE_APPOINTMENT,
          { doc: JSON.stringify(reqBodyForAppointment) }
        );
        if (respAppointment !== 200) {
          toast.success("CMR Created Successfully");
          router("/cmr-service/" + response.data?.docs[0]?.name);
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
      `["dob","mobile","sex","custom_pcp_name","custom_pcp_phone"]`
    );
    const patientFields = (
      await getList(
        "Patient",
        `[["name","=","${patientName}"]]`,
        `["custom_do_you_currently_use_or_have_you_ever_tobacco_profucts","custom_current_cigarette_smoker","custom_when_did_you_first_start_smoking","custom_how_many_cigarettes_do_you_smoke_per_day","custom_are_you_interested_in_quiting_1","custom_former_cigarette_smoker","custom_when_did_you_quit_smoking","custom_on_average_how_many_cigarettes_did_you_smoke_per_day","custom_how_many_years_did_you_smoke_for","custom_other_tobacco_user","custom_other_description","custom_how_many_times_in_the_past_year","custom_are_you_interested_in_quiting_2","custom_past_year_have_you_had_4_or_more_alcoholic_drinks_iady","custom_use_opioids_and_have_access_to_nacran","custom_are_you_interesting_in_quiting","custom_purpose_of_body_shapping","custom_have_you_hospitalized_overnight","custom_what_for_and_when"]`,
        ""
      )
    )[0];

    const reqBody = {
      docstatus: 0,
      doctype: "CMR Service",
      name: params.id,
      __islocal: 1,
      __unsaved: 1,
      owner: Cookies.get("email"),
      naming_series: "CMR-.YY.-.#",
      eligibility: [],
      medications: await getListWrapper(
        params.id,
        "CMR Medications",
        "Patient",
        `[["parent","=","${patientName}"]]`,
        `["medication_name","prescriber","directions","related_conditions","potential_problem"]`,
        "medications",
        "CMR Service"
      ),
      health_conditions: await getListWrapper(
        params.id,
        "Common Conditions",
        "Patient",
        `[["parent","=","${patientName}"]]`,
        `["health_condition","condition_status"]`,
        "health_conditions",
        "CMR Service"
      ),
      allergies_side_effects: await getListWrapper(
        params.id,
        "Drug Allergies Side Effects",
        "Patient",
        `[["parent","=","${patientName}"]]`,
        `["allergies","reaction"]`,
        "allergies_side_effects",
        "CMR Service"
      ),

      recreational_drug_usage: await getChildValueWrapper(
        "Patient",
        patientName,
        "custom_recreational_drug_usage"
      ),
      relative_medical_conditions: await getChildValueWrapper(
        "Patient",
        patientName,
        "custom_relative_medical_conditions"
      ),
      surgical_histories: await getChildValueWrapper(
        "Patient",
        patientName,
        "custom_surgical_histories"
      ),
      employment_housing_transportation: await getChildValueWrapper(
        "Patient",
        patientName,
        "custom_employment_housing_transportation"
      ),
      delivery_method: "Face to Face",
      mode_of_delivering_mtm: 0,
      aggree: "",
      // signs_date: "2024-05-13",
      // signs_time: "22:25:30",
      medication_action_plan: await getListWrapper(
        params.id,
        "CMR Medications",
        "Patient",
        `[["parent","=","${patientName}"]]`,
        `["medication_name","prescriber","directions","related_conditions","potential_problem"]`,
        "medications",
        "CMR Service"
      ),
      ltc: "",
      language: "English",
      agreement: 0,
      total_duration: 0,
      payment_type: "Medi-Cal Billing",
      billing_status: "Not Ready for Billing",
      is_the_patient_the_primary_policy_holder: "Yes",
      billing_code: [],
      workflow_progress:
        '{\n    "Not Started":0,\n    "Ineligible": 6,\n    "Qualified": 1,\n    "In Progress":2,\n    "Scheduled": 3,\n    "Ready for Review": 4,\n    "Ready for Service":5,\n    "Service Completed": 6\n}',
      workflow_state: "Not Started",
      patient_eligibility_template: "Medi-cal MTM",
      // weight: 0,
      // bmi: 0,
      // patient_address: "P00002-Billing",
      // address_html: "wedwqdqwd<br>\nwqdwq<br>dwqdwqd, wdwqdwqd wqd<br>",
      ...comboBoxKeyValues,
      do_you_currently_use_or_have_you_ever_tobacco_profucts:
        patientFields[
        "custom_do_you_currently_use_or_have_you_ever_tobacco_profucts"
        ],
      current_cigarette_smoker:
        patientFields["custom_current_cigarette_smoker"],
      when_did_you_first_start_smoking:
        patientFields["custom_when_did_you_first_start_smoking"],
      how_many_cigarettes_do_you_smoke_per_day:
        patientFields["custom_how_many_cigarettes_do_you_smoke_per_day"],
      are_you_interested_in_quiting_1:
        patientFields["custom_are_you_interested_in_quiting_1"],
      former_cigarette_smoker: patientFields["custom_former_cigarette_smoker"],
      when_did_you_quit_smoking:
        patientFields["custom_when_did_you_quit_smoking"],
      on_average_how_many_cigarettes_did_you_smoke_per_day:
        patientFields[
        "custom_on_average_how_many_cigarettes_did_you_smoke_per_day"
        ],
      how_many_years_did_you_smoke_for:
        patientFields["custom_how_many_years_did_you_smoke_for"],
      other_tobacco_user: patientFields["custom_other_tobacco_user"],
      other_description: patientFields["custom_other_description"],
      how_many_times_in_the_past_year:
        patientFields["custom_how_many_times_in_the_past_year"],
      are_you_interested_in_quiting_2:
        patientFields["custom_are_you_interested_in_quiting_2"],
      past_year_have_you_had_4_or_more_alcoholic_drinks_iady:
        patientFields[
        "custom_past_year_have_you_had_4_or_more_alcoholic_drinks_iady"
        ],
      use_opioids_and_have_access_to_nacran:
        patientFields["custom_use_opioids_and_have_access_to_nacran"],
      are_you_interesting_in_quiting:
        patientFields["custom_are_you_interesting_in_quiting"],
      purpose_of_body_shapping:
        patientFields["custom_purpose_of_body_shapping"],
      have_you_hospitalized_overnight:
        patientFields["custom_have_you_hospitalized_overnight"],
      what_for_and_when: patientFields["custom_what_for_and_when"],
      dob: patientPersonalInfoFields["dob"],
      phone: patientPersonalInfoFields["mobile"],
      gender: patientPersonalInfoFields["sex"],
      pcp_name: patientPersonalInfoFields["custom_pcp_name"],
      pcp_phone_number: patientPersonalInfoFields["custom_pcp_phone"],
      patient_name: patientPersonalInfoFields["name"],
      cmr_recipient: selectCMRRecipient,
      reason_for_service: getValues("reason_for_service"),
      caregiver_name: getValues("caregiver_name"),
      caregiver_relationship: getValues("caregiver_relationship"),
    };

    const docMethodResponse = await getDocMethod(
      reqBody,
      "get_patient_address"
    );
    if (docMethodResponse.status === 200) {
      const addressFieldName = docMethodResponse.data.message.address;
      const GET_ADDRESS_URL = BASE_URL + API.GET_ADDRESS_DISPLAY;
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
    console.log("sfgsdfgdf", patientPersonalInfoFields);
    
    //here set the values after getting response
    setValue("phone", patientPersonalInfoFields?.mobile);
    setValue("pcp_name", patientPersonalInfoFields?.custom_pcp_name === null  ? "" : patientPersonalInfoFields?.custom_pcp_name);
    setValue("dob", patientPersonalInfoFields?.dob);
    setSelectGender(patientPersonalInfoFields?.sex);
    setValue("pcp_phone_number", patientPersonalInfoFields?.custom_pcp_phone === null ? "" : patientPersonalInfoFields?.custom_pcp_phone);
  };

  useEffect(() => {
    setComboBoxKeyValues({ ...comboBoxKeyValues, custom_select_appointment_type: "cc" });
    setDocTypeStatus({ page: "cmr-service", status: "Not Started" });
    const fetchData = async () => {
      const URL = BASE_URL + API.GET_DOCDATA_FOR_SELECT;
      const response = await axiosPOSTAPI(URL, { doctype: "CMR Service" });
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
            New CMR Service
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
      <Separator orientation="horizontal" className="my-2 lg:my-0" />

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
            {selectedStepper === "patientInfo" && (
              <>
                <div className="overflow-auto flex-grow mt-5  bg-[#F6F9FD] px-4 py-4 mx-1 border border-[#E0E0E0]">
                  <h5 className="mb-1  font-semibold text-[#474747] xl:text-xl sm:text-lg text-base">
                    Add Information
                  </h5>
                  <Separator orientation="horizontal" className="my-3" />
                  <div className="grid 2xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-6 mt-7">
                    <div className="grid w-full  items-center gap-1.5">
                      <div className="flex w-full">
                        <div className="w-full">

                          <Label className="text-[#616161] xl:text-sm text-xs">
                            Patient Name{" "}
                            <span className="text-[#ED9192] xl:text-sm text-xs">
                              *
                            </span>
                            <ReqiredFieldErrorImage error={errors.patient_name} />
                          </Label>
                          <div ref={firstNameInputRef}>
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
                            />
                          </div>
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
                    <div className="grid w-full  items-center gap-1.5 ">
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
                        name="phone"
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
                        rules={{ required: true }}
                        render={({
                          field: { onChange, value },
                          fieldState: { error },
                        }) => (
                          <>
                            <Label className="text-[#616161] xl:text-sm text-xs">
                              PCP Phone Number
                            </Label>
                            <div ref={inputRefs.current[1]}>
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
                    <div className="grid w-full items-center gap-1.5 ">
                      <Label className="text-[#616161] xl:text-sm text-xs">
                        Appointment Type{" "}
                        <span className="text-[#ED9192] xl:text-sm text-xs">
                          *
                        </span>
                        <ReqiredFieldErrorImage
                          error={errors.custom_select_appointment_type}
                        />
                      </Label>
                      <ComboboxDropDownWithUseFormHook
                        // staticValue={[
                        //   { value: "Follow-up CMR Appointment" },
                        //   { value: "New CMR Service" },
                        // ]}
                        staticValue={
                          selectOptionOnData && selectOptionOnData[2]
                            ? selectOptionOnData[2].map((item: string) => ({
                              value: item,
                            }))
                            : []
                        }
                        placeholder="select Appointment Type"
                        handleInputChange={handleInputChangeComboBox}
                        label="custom_select_appointment_type"
                        required
                        register={register}
                        errors={errors}
                        setValueForm={setValue}
                      />
                    </div>
                    <div className="grid w-full  items-center gap-1.5 lg:col-span-2 ">
                      <Label className="text-[#616161] xl:text-sm text-xs">
                        Reason for Service
                      </Label>
                      <Input
                        type="text"
                        placeholder="Enter the Reason"
                        className="xl:text-sm text-xs"
                        {...register("reason_for_service")}
                      />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5 xl2:col-span-2 sm:col-span-0 ">
                      <Label className="text-[#616161] xl:text-sm text-xs">
                        CMR Recipient{" "}
                        <span className="text-[#ED9192] xl:text-sm text-xs">
                          *
                        </span>
                        <ReqiredFieldErrorImage error={errors.cmr_recipient} />
                      </Label>
                      <RadioGroup
                        // defaultValue="Patient"
                        className="flex  xl:text-sm text-xs"
                        {...register("cmr_recipient", { required: true })}
                      >
                        <div
                          className={`flex items-center space-x-2  ${selectCMRRecipient === "Patient"
                            ? "bg-[#7ACFFF]"
                            : "border-2 border-[#DDDDDD] bg-white"
                            }  rounded-3xl p-2`}
                        >
                          <RadioGroupItem
                            value="Patient"
                            id="Patient"
                            className="data-[state=checked]:text-[#FFFFFF] data-[state=checked]:border-[#FFFFFF]"
                            onClick={changesetselectCMRRecipient}
                            checked={selectCMRRecipient === "Patient"}
                          />
                          <Label
                            htmlFor="Patient"
                            className={`${selectCMRRecipient === "Patient"
                              ? "text-[#FFFFFF]"
                              : "text-[#616161]"
                              } font-semibold  xl:text-sm text-xs`}
                          >
                            Patient
                          </Label>
                        </div>
                        <div
                          className={`flex items-center space-x-2  ${selectCMRRecipient === "Caregiver"
                            ? "bg-[#7ACFFF]"
                            : "border-2 border-[#DDDDDD] bg-white"
                            }  rounded-3xl p-2 `}
                        >
                          <RadioGroupItem
                            value="Caregiver"
                            id="Caregiver"
                            className="data-[state=checked]:text-[#FFFFFF] data-[state=checked]:border-[#FFFFFF]"
                            onClick={changesetselectCMRRecipient}
                            checked={selectCMRRecipient === "Caregiver"}
                          />
                          <Label
                            htmlFor="Caregiver"
                            className={`${selectCMRRecipient === "Caregiver"
                              ? "text-[#FFFFFF]"
                              : "text-[#616161]"
                              } font-semibold  xl:text-sm text-xs`}
                          >
                            Caregiver
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    {selectCMRRecipient === "Caregiver" && (
                      <div className="grid w-full  items-center gap-1.5  ">
                        <Label className="text-[#616161] xl:text-sm text-xs">
                          Caregiver Name
                        </Label>
                        <Input
                          type="text"
                          placeholder="Enter Caregiver Name"
                          className="xl:text-sm text-xs"
                          {...register("caregiver_name")}
                        />
                      </div>
                    )}
                    {selectCMRRecipient === "Caregiver" && (
                      <div className="grid w-full  items-center gap-1.5  ">
                        <Label className="text-[#616161] xl:text-sm text-xs">
                          Caregiver Relationship
                        </Label>
                        <Input
                          type="text"
                          placeholder="Enter Caregiver Relationship"
                          className="xl:text-sm text-xs"
                          {...register("caregiver_relationship")}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
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
              onClick={DecrementStepper}
              variant="outline"
              size="icon"
              className={`rounded-full border-[#6a6a6a]  border-[3px] ${steps.findIndex((step) => selectedStepper === step.key) === 0 &&
                "invisible"
                }     xl:border-[3px] border-[2px]  xl:text-sm text-xs`}
            >
              <ChevronLeft
                color="#6a6a6a"
                className="xl:w-[2rem] xl:h-[2rem] w-[1rem] h-[1rem]"
              />
            </Button>
            <div className="flex space-x-4">
              <div className="items-end space-x-2">
                <Button

                  className="bg-[#47BDFF] text-white border-[#474747] border-x  border-y border-opacity-20 font-semibold  xl:text-sm text-xs"
                  onClick={() => finalSubmit()}
                >
                  Next: Eligibility Criteria
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddCMR;
