import { Stepper } from "@/components/shared/Stepper";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DrawerDemo } from "@/components/shared/activityDrawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { createContext, useContext, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

import ActivityComponenet from "@/components/shared/ActivityComponenet";
import BillingCodeCMR from "@/components/shared/Cards/BillingcodeCMR";
import PatientAppointmentCard from "@/components/shared/Cards/PatientAppointmentCard";
import PatientMedicalActionPlan from "@/components/shared/Cards/PatientMedicalActionPlan";
import DynamicRadioButton, {
  DynamicRadioButtonWithUseFormHook,
} from "@/components/shared/DynamicRadioButton";
import { PatientHistory } from "@/components/shared/PatientHistory";
import ComboboxDropDown, {
  ComboboxDropDownWithUseFormHook,
} from "@/components/shared/comboBoxDropDown";
import ReqiredFieldErrorImage from "@/components/shared/reqiredFieldError";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TagInput } from "@/components/ui/tagInput";
import { Textarea } from "@/components/ui/textarea";
import API, { BASE_URL } from "@/constants/api.constant";
import {
  AttachementBrowseFile,
  CMRFollowUpAppointment,
  CMRPatientTakeAway,
  DeleteFileIcon,
  DocFileicon,
  MaleImage,
  userProfile,
  FemaleImage,
  ActivityButtonIcon,
  ImmunizationServiceAddPatientIcon,
} from "@/constants/images";
import { axiosGETAPI, axiosPOSTAPI } from "@/helpers/commonAPI";
import { CommentData } from "@/types";
import {
  PatientStatusCodeImage,
  calculateBMI,
  convertDateFormat,
  formatTime,
  getCurrentDate,
} from "@/utilities/utils";
import Cookies from "js-cookie";
import {
  ArrowDownUp,
  ChevronLeft,
  ChevronRight,
  Paperclip,
  Tags,
} from "lucide-react";

import { LayoutContext } from "@/components/shared/LayoutContext";
import ROUTES from "@/constants/routes.constats";
import { getChildValueWrapper, getListWrapper } from "@/helpers/API/APIWrapper";
import { getDocMethod, getList, validatedLink } from "@/helpers/API/getAPIData";
import { useForm, Controller } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import { BillingCodeLabel, paymentTypeMapping } from "@/constants/fields";
import { DataTable } from "@/components/shared/tables/data-table";
import { BillingCodeColumns } from "@/components/shared/tables/column-def";
import DialogWithInputComboboxBillingCode from "@/components/shared/CustomDialogBox/DialogwithInputComboboxBillingCodePopup";
import { getPatientData } from "@/constants";
import { PhoneInput } from "react-international-phone";
import LoadingScreen from "@/components/shared/loading-screen";
import AddPatientModal from "@/components/shared/modals/add-patient";
import { CustomDrawer } from "@/components/shared/drawer/drawer";

export const ReloadDataContext = createContext<any>(false);

const EligibilityCrieria = ({
  eligibilityProps,
  params,
  getAPIDataDocs,
  setValue,
}: any) => {
  const [getEligibilityCriteria, setEligibilityCriteria] = useState<any[]>([]);
  const [getEligibilityForm, setEligibilityForm] = useState<string>();
  const {
    getEligibilityCriteriaData,
    setEligibilityCriteriaData,
    selectOptionOnData,
  } = eligibilityProps;
  const helperSetEligibiliyCriteria = (
    e: boolean,
    index: any,
    value: string
  ) => {
    if (e) {
      setEligibilityCriteriaData((prev: any[]) => {
        return [
          ...prev,
          {
            owner: Cookies.get("email"),
            modified_by: "mehta.viral@gmail.com",
            idx: index,
            criteria: value,
            yes_or_no: 0,
            parent: params.id,
            parentfield: "eligibility",
            parenttype: "CMR Service",
            doctype: "Eligibility Check for CMR",
          },
        ];
      });
    } else {
      setEligibilityCriteriaData((prev: any[]) =>
        prev.filter((item: any) => index !== item.idx)
      );
    }
  };
  useEffect(() => {
    const fetchEligibilityCriteria = async () => {
      const URL = BASE_URL + API.GET_ELIGIBILITY_CRIETERIA_CMR;
      try {
        const response = await axiosPOSTAPI(URL, {
          template: getEligibilityForm,
        });
        if (response.status === 200) {
          const eligibilityCriteriaArray = Object.values(response.data.message);
          setEligibilityCriteria(eligibilityCriteriaArray);
        }
      } catch (error: any) {
        console.error("Error fetching eligibility criteria:", error);
      }
    };
    if (getEligibilityForm) {
      fetchEligibilityCriteria();
    }
  }, [getEligibilityForm]);
  const hanleInputChange = (object: string, label: any) => {
    setEligibilityForm(object);
    setValue(label, object);
  };
  return (
    <div className="mt-5  bg-[#F6F9FD] px-4 py-4 mx-1 border border-[#E0E0E0]">
      <div className="grid grid-flow-row gap-4">
        <div className="">
          <Label className="text-[#616161]  xl:text-sm text-xs">
            Service Provider Form
          </Label>
          <div className="mt-1">
            <ComboboxDropDown
              staticValue={selectOptionOnData[0].map((item: any) => ({
                value: item.name,
              }))}
              placeholder="select Eligibility Form"
              dataValue={
                getAPIDataDocs.patient_eligibility_template ||
                selectOptionOnData[0].filter(
                  (item: any) => item.make_this_default === 1
                )[0].name
              }
              label="patient_eligibility_template"
              handleInputChange={hanleInputChange}
              buttonClassName=""
              popOverClassName=""
            />
          </div>
        </div>
        {getEligibilityCriteria &&
          getEligibilityCriteria.map((item: string, index: number) => {
            return (
              <div className="flex space-x-4" key={index}>
                <Checkbox
                  id="eligibilitycriteriachecbox1"
                  className="mt-[3px]"
                  onCheckedChange={(e: boolean) =>
                    helperSetEligibiliyCriteria(
                      e,
                      index + 1,
                      `elig_${index + 1}`
                    )
                  }
                  checked={
                    getEligibilityCriteriaData.filter(
                      (item: any) => item.idx === index + 1
                    )[0] != undefined
                  }
                />
                <div
                  className="font-medium leading-6 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[#474747] xl:text-sm text-xs"
                  dangerouslySetInnerHTML={{ __html: item }}
                ></div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

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

const MedicalActionPlan = ({
  medicationActionPlanProps,
  register,
  getAPIDataDocs,
  errors,
  watch,
}: any) => {
  const { getMedicationActionPlanData, setMecationActionPlanData } =
    medicationActionPlanProps;
  const [getBMI, setBMI] = useState<any>(0.4);
  const { params } = useContext(ReloadDataContext);
  const weight = watch("weight", "");
  const height = watch("height", "");
  const AddNewMedicationActionPlan = (newMedicationActionPlanData: any) => {
    const newData = {
      owner: Cookies.get("email"),
      medication: newMedicationActionPlanData.medication,
      description: newMedicationActionPlanData.description,
      patient_action: newMedicationActionPlanData.patient_action,
      parent: params.id,
      parentfield: "medication_action_plan",
      parenttype: "CMR Service",
      doctype: "Medication Action Plan",
    };

    setMecationActionPlanData((prev: any) => {
      return [...prev, newData];
    });
  };
  useEffect(() => {
    setBMI(calculateBMI(weight, height));
  }, [getAPIDataDocs, watch, weight, height]);
  return (
    <div className="mt-5  bg-[#F6F9FD] px-4 py-4 mx-1 border border-[#E0E0E0]">
      <h5 className="mb-1   xl:text-xl sm:text-lg  font-semibold text-[#474747] ">
        Vital Signs
      </h5>
      <Separator orientation="horizontal" className="my-3" />
      <div className="grid 2xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-6 mt-7">
        <div className="grid w-full  items-center gap-1.5">
          <Label className="text-[#616161] xl:text-sm text-xs">
            Date <span className="text-[#ED9192] xl:text-sm text-xs">*</span>
          </Label>
          <Input
            type="date"
            className=" xl:text-sm text-xs"
            {...register("signs_date")}
            defaultValue={getAPIDataDocs.signs_date}
          />
        </div>
        <div className="grid w-full  items-center gap-1.5">
          <Label className="text-[#616161] xl:text-sm text-xs">
            Time(hh:mm){" "}
            <span className="text-[#ED9192] xl:text-sm text-xs">*</span>
            <ReqiredFieldErrorImage error={errors.signs_time} />
          </Label>
          <Input
            type="time"
            className={` xl:text-sm text-xs ${errors.signs_time && "border-[#FF441B]"
              }`}
            {...register("signs_time", { required: true })}
            defaultValue={formatTime(getAPIDataDocs.signs_time)}
          />
        </div>
        <div className="grid w-full  items-center gap-1.5">
          <Label className="text-[#616161] xl:text-sm text-xs">
            Heart Rate / Pulse
          </Label>
          <Input
            type="number"
            className=" xl:text-sm text-xs"
            {...register("pulse")}
            defaultValue={getAPIDataDocs.pulse}
          />
        </div>
        <div className="grid w-full  items-center gap-1.5">
          <Label className="text-[#616161] xl:text-sm text-xs">
            Blood Pressure (systolic)
          </Label>
          <Input
            type="number"
            className=" xl:text-sm text-xs"
            {...register("bp_systolic")}
            defaultValue={getAPIDataDocs.bp_systolic}
          />
        </div>
        <div className="grid w-full  items-center gap-1.5">
          <Label className="text-[#616161] xl:text-sm text-xs">
            Blood Pressure (diastolic)
          </Label>
          <Input
            type="number"
            className=" xl:text-sm text-xs"
            {...register("bp_diastolic")}
            defaultValue={getAPIDataDocs.bp_diastolic}
          />
        </div>
        <div className="grid w-full  items-center gap-1.5">
          <Label className="text-[#616161] xl:text-sm text-xs">
            Height (Feet & Inches)
          </Label>
          <Input
            type="text"
            placeholder="6'2"
            className=" xl:text-sm text-xs"
            {...register("height")}
            defaultValue={getAPIDataDocs.height}
          />
        </div>
        <div className="grid w-full  items-center gap-1.5">
          <Label className="text-[#616161] xl:text-sm text-xs">
            Weight (in lbs.)
          </Label>
          <Input
            type="number"
            placeholder="0.0"
            className=" xl:text-sm text-xs"
            {...register("weight")}
            defaultValue={getAPIDataDocs.weight}
          />
        </div>
        <div className="grid w-full  items-center gap-1.5">
          <Label className="text-[#616161] xl:text-sm text-xs">BMI</Label>
          <Input
            type="number"
            placeholder="0.0"
            className=" xl:text-sm text-xs"
            {...register("bmi")}
            value={getBMI}
          />
        </div>
      </div>
      <Separator orientation="horizontal" className="my-3" />
      <h5 className="mb-1   xl:text-xl sm:text-lg  font-semibold text-[#656565] ">
        Medical Action Plan
      </h5>
      <div className="flex flex-wrap gap-3">
        {getMedicationActionPlanData.map((item: any, index: any) => {
          return (
            <PatientMedicalActionPlan
              data={item}
              index={index}
              key={index}
              showData
              setData={setMecationActionPlanData}
            />
          );
        })}
        <PatientMedicalActionPlan addData={AddNewMedicationActionPlan} />
      </div>
      <Separator orientation="horizontal" className="my-3" />
      <div className="grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-6 mt-7">
        <div className="grid w-full  items-center gap-1.5">
          <Label className="text-[#616161]  xl:text-sm text-xs">
            Questions I want to ask (include topics about medications or
            therapy):
          </Label>
          <Textarea
            className=" xl:text-sm text-xs"
            defaultValue={getAPIDataDocs.my_follow_up_plan}
            {...register("my_follow_up_plan")}
          />
        </div>
        <div className="grid w-full  items-center gap-1.5">
          <Label className="text-[#616161] xl:text-sm text-xs">
            My follow-up plan (add notes about next steps):
          </Label>
          <Textarea
            className=" xl:text-sm text-xs"
            defaultValue={getAPIDataDocs.questions}
            {...register("questions")}
          />
        </div>
      </div>
    </div>
  );
};
const Scheduling = ({ schedulingProps, params, getAPIDataDocs }: any) => {
  const {
    selectDeliveryMethod,
    setSelectDeliveryMethod,
    selectAgreeToComply,
    setAgreeToComply,
    setDoYouHaveVerbelConsent,
    selectDoYouHaveVerbelConsent,
  } = schedulingProps;
  const [getAppointmentData, setAppointmentData] = useState<any>({});

  const handlerForSetSelectDeliveryMethod = (e: any) => {
    setSelectDeliveryMethod(e.target.value);
  };
  const { reloadData, setReloadData } = useContext(ReloadDataContext);
  useEffect(() => {
    const fetchData = async () => {
      const URL = BASE_URL + API.CMR_APPOINTMENT_DATA;
      const response = await axiosPOSTAPI(URL, {
        patient: getAPIDataDocs.patient_name,
        doctype: "CMR Service",
        docname: params.id,
        location: getAPIDataDocs.custom_location_of_service,
        patient_appointment: getAPIDataDocs.patient_appointment,
        appointment_type: "",
      });

      if (response.status === 200) {
        const respColumnData = response.data.message.column[0];
        setAppointmentData({
          status: respColumnData.status,
          subheading: `${respColumnData.status} in: ${respColumnData.service_unit} | ${respColumnData.appointment_type} on ${respColumnData.date} | ${respColumnData.time}`,
          location: respColumnData.service_unit,
          method: respColumnData.method,
          appointmentType: respColumnData.appointment_type,
          time: respColumnData.time,
          date: convertDateFormat(respColumnData.date),
        });
      }
    };
    fetchData();
  }, [reloadData, getAPIDataDocs, params]);

  const ChangeDateandTimeAPI = async (date: string, time: string) => {
    const URL = BASE_URL + API.CMR_APPOINTMENT_SAVE_DATE_TIME;
    await axiosPOSTAPI(URL, {
      appointment: getAPIDataDocs.patient_appointment,
      date: date,
      time: time,
    });
    setReloadData((prev: boolean) => !prev);
  };

  const handleSetAgreeToComply = (value: string) => {
    if (value === "No") {
      setAgreeToComply("");
      setDoYouHaveVerbelConsent(0);
      setSelectDeliveryMethod("Face to Face");
    } else {
      setAgreeToComply(value);
    }
  };
  return (
    <div>
      <div className="mt-5  bg-[#F6F9FD] px-4 py-4 mx-1 border border-[#E0E0E0]">
        <h5 className="mb-1 xl:text-xl sm:text-lg font-semibold text-[#707070] ">
          Service Delivery
        </h5>
        <Separator orientation="horizontal" className="my-3" />
        <Label className="text-[#707070] font-semibold xl:text-sm text-xs mb-2">
          Delivery Method
        </Label>
        <RadioGroup defaultValue="Face to Face" className="flex gap-5 mt-2">
          <div
            className={`flex items-center space-x-2  ${selectDeliveryMethod === "Face to Face"
                ? "bg-[#7ACFFF]"
                : "border-2 border-[#DDDDDD] bg-white"
              }  rounded-3xl p-2`}
          >
            <RadioGroupItem
              value="Face to Face"
              id="Face to Face"
              className={`${selectDeliveryMethod === "Face to Face" &&
                "border-[#FFFFFF] text-[#FFFFFF]"
                }`}
              onClick={handlerForSetSelectDeliveryMethod}
              checked={selectDeliveryMethod === "Face to Face"}
            />
            <Label
              htmlFor="Face to Face"
              className={`${selectDeliveryMethod === "Face to Face"
                  ? "text-[#FFFFFF]"
                  : "text-[#616161]"
                } font-semibold  xl:text-sm text-xs`}
            >
              Face To Face
            </Label>
          </div>
          <div
            className={`flex items-center space-x-2  ${selectDeliveryMethod === "Telehealth"
                ? "bg-[#7ACFFF]"
                : "border-2 border-[#DDDDDD] bg-white"
              }  rounded-3xl p-2`}
          >
            <RadioGroupItem
              value="Telehealth"
              id="Telehealth"
              className={`${selectDeliveryMethod === "Telehealth" &&
                "border-[#FFFFFF] text-[#FFFFFF]"
                }`}
              onClick={handlerForSetSelectDeliveryMethod}
              checked={selectDeliveryMethod === "Telehealth"}
            />
            <Label
              htmlFor="Telehealth"
              className={`${selectDeliveryMethod === "Telehealth"
                  ? "text-[#FFFFFF]"
                  : "text-[#616161]"
                } font-semibold  xl:text-sm text-xs`}
            >
              Telehealth
            </Label>
          </div>
        </RadioGroup>
        {selectDeliveryMethod === "Telehealth" && (
          <div className="space-y-2">
            <div className="space-x-2">
              <Checkbox
                id="agree-for-verbel-consent"
                checked={selectDoYouHaveVerbelConsent === 1}
                onCheckedChange={(_checked) =>
                  setDoYouHaveVerbelConsent((prev: number) => {
                    if (prev === 0) {
                      return 1;
                    } else {
                      return 0;
                    }
                  })
                }
              />
              <Label
                htmlFor="agree-for-verbel-consent"
                className="text-[#474747] font-semibold  xl:text-sm text-xs mb-2"
              >
                Do you have a verbal consent from the patient for the use of
                telehealth as an acceptable mode of delivering MTM?
              </Label>
            </div>
            {selectDoYouHaveVerbelConsent === 1 && (
              <div className="space-y-3">
                <div className="ml-6 space-y-2">
                  <p className="text-[#474747] font-medium  xl:text-sm text-xs">
                    Telehealth requirements are as follows:
                  </p>
                  <ul className="text-[#474747] font-medium  xl:text-sm text-x list-disc pl-4 space-y-1 max-w-[60vw]">
                    <li>
                      Use an interactive system that is compiant with HIPAA
                      privacy and security requirements and regulations.
                    </li>
                    <li>
                      You will also need to have procedures in place to prevent
                      system failures that could lead to a breach in privacy or
                      cause exposure of health records to unauthorized people.
                    </li>
                    <li>
                      Equipment must be capable of displaying video full screen
                      without reduced image quality or reliability and maintain
                      a minimum download speed or transmission speed of 4 Mbps.
                      The video and audio must be a synchronous interaction
                    </li>
                  </ul>
                </div>
                <div>
                  <Label
                    htmlFor="agree-for-verbel-consent"
                    className="text-[#474747] font-semibold  xl:text-sm text-xs mb-2"
                  >
                    I agree to comply with the above requirements.
                  </Label>
                  <DynamicRadioButton
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
                    getButtonSelection={selectAgreeToComply}
                    setButtonSelection={handleSetAgreeToComply}
                    defaultValue="Yes"
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="mt-5  bg-[#F6F9FD] px-4 py-4 mx-1 border border-[#E0E0E0]">
        <h5 className="mb-1 xl:text-xl sm:text-lg font-semibold text-[#707070] ">
          Appointment Details
        </h5>
        <Separator orientation="horizontal" className="my-1" />

        <div className="pt-4">
          <PatientAppointmentCard
            data={getAppointmentData}
            ChangeDateandTimeAPI={ChangeDateandTimeAPI}
          />
        </div>
      </div>
    </div>
  );
};

const PatientSummary = ({
  patientSummaryProps,
  register,
  getAPIDataDocs,
  errors,
  setValue,
  getValues,
  handleInputChangeComboBox,
  comboBoxKeyValues,
}: any) => {
  const {
    getBillingCodeData,
    setBillingCodeData,
    selectCMRWasCompleted,
    setSelectCMRWasCompleted,
    selectLanguageTemplateForPatient,
    setSelectLanguageTemplateForPatient,
    selectCMRPaymentType,
    setSelectCMRPaymentType,
    getPatientSUmmaryAgreement,
    setPatientSummaryAgreement,
    paymentTypeOptions,
    selectPrimaryPolicyHolder,
    setPrimaryPolicyHolder,
    selectTimeofPayment,
    setTimeofPayment,
  } = patientSummaryProps;
  const [open, onOpen] = useState<boolean>(false);
  const { tableViewFieldState, setTableViewFieldState } =
    useContext(ReloadDataContext);
  const CMRWasCompelted = [
    {
      label: "Yes",
      value: "Yes",
    },
    {
      label: "No",
      value: "No",
    },
  ];
  const LanguageTemplatePatientSummary = [
    {
      label: "English",
      value: "English",
    },
    {
      label: "Spanish",
      value: "Spanish",
    },
  ];
  const CMRPaymentTypes = [
    {
      label: "Medi-Cal Billing",
      value: "Medi-Cal Billing",
    },
  ];
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
  const { params } = useContext(ReloadDataContext);
  useEffect(() => { }, [tableViewFieldState]);

  const AddNewBillingData = (newBillingData: any) => {
    const newData = {
      owner: Cookies.get("email"),
      item_code: newBillingData.item_code,
      definition: newBillingData.definition,
      parent: params.id,
      parentfield: "billing_code",
      parenttype: "CMR Service",
      doctype: "Billing Code",
      item_name: newBillingData.item_name,
      appointment_type: newBillingData.appointment_type,
      code_system: newBillingData.code_system,
    };

    setBillingCodeData((prev: any) => {
      return [...prev, newData];
    });
  };
  useEffect(() => { }, [getValues]);
  return (
    <div className="mt-5  bg-[#F6F9FD] px-4 py-4 mx-1 border border-[#E0E0E0]">
      <div className="grid 2xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-6 mt-7">
        <div className="grid w-full  items-center gap-1.5">
          <Label className="text-[#616161] xl:text-sm text-xs">
            Date CMR was completed
          </Label>
          <Input
            type="date"
            placeholder="03-18-2024"
            className=" xl:text-sm text-xs"
            {...register("date_cmr_was_completed")}
            defaultValue={getAPIDataDocs.date_cmr_was_completed}
            disabled
          />
        </div>
        <div className="grid w-full  items-center gap-1.5">
          <Label className="text-[#616161] xl:text-sm text-xs">
            Pharmacists Availability for Questions?
          </Label>
          <Input
            type="text"
            placeholder="Monday to Friday 8am-5pm"
            className=" xl:text-sm text-xs"
            defaultValue={getAPIDataDocs.pharmacists_availability_for_questions}
            disabled
          />
        </div>
        <div className="grid w-full  items-center gap-1.5">
          <Label className="text-[#616161] xl:text-sm text-xs">
            Verify Patient Name and Address
          </Label>
          <div
            type="text"
            className=" bg-white xl:text-sm text-xs "
            dangerouslySetInnerHTML={{
              __html: getAPIDataDocs.verify_patients_name_and_address,
            }}
            {...register("verify_patients_name_and_address")}
          ></div>
        </div>
        <div className="grid w-full  items-center gap-1.5 lg:col-span-2">
          <Label className="text-[#616161] xl:text-sm text-xs">
            Was the patient in a Long Term Care (LTC) facility when the CMR was
            completed?
          </Label>
          <DynamicRadioButton
            data={CMRWasCompelted}
            getButtonSelection={selectCMRWasCompleted}
            setButtonSelection={setSelectCMRWasCompleted}
            defaultValue="Yes"
          />
        </div>
        <div className="grid w-full  items-center gap-1.5 ">
          <Label className="text-[#616161] xl:text-sm text-xs">
            Language template for the patient summary
          </Label>
          <DynamicRadioButton
            data={LanguageTemplatePatientSummary}
            getButtonSelection={selectLanguageTemplateForPatient}
            setButtonSelection={setSelectLanguageTemplateForPatient}
            defaultValue="englishLanguageTemplateForPatientSummary"
          />
        </div>
        <div className="grid w-full  items-center gap-1.5">
          <Label className="text-[#616161] xl:text-sm text-xs">
            Patient Summary Date
          </Label>
          <Input
            type="date"
            className=" xl:text-sm text-xs"
            defaultValue={getAPIDataDocs.patient_summary_date}
            {...register("patient_summary_date")}
          />
        </div>
      </div>
      <div className="flex space-x-4 mt-5 w-full col-span-2">
        <Checkbox
          id="termsandcondition"
          className="mt-0.5"
          defaultChecked={getPatientSUmmaryAgreement === 1}
          onCheckedChange={(check: boolean) =>
            setPatientSummaryAgreement(check ? 1 : 0)
          }
        />
        <label
          htmlFor="termsandcondition"
          className=" text-justify xl:text-sm text-xs font-medium leading-5 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[#474747]"
        >
          I attest that I have reviewed and updated the patient&apos;s health,
          allergies, medication, medication action plan, and discussed how to
          safely dispose of unused Prescription medications. I will provide the
          CMR recipient with the exact patient takeaway generated in this
          platform
        </label>
      </div>
      <Separator orientation="horizontal" className="my-3" />
      <h5 className="mb-1 xl:text-lg sm:text-base text-sm font-semibold text-[#656565] ">
        Service Details
      </h5>
      <div className="grid 2xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-6">
        <div className="grid w-full  items-center gap-1.5">
          <Label className="text-[#616161] xl:text-sm text-xs ">
            Service start time
          </Label>
          <Input
            type="datetime-local"
            className=" xl:text-sm text-xs"
            defaultValue={getAPIDataDocs.service_start_time
              .split(".")[0]
              .replace(" ", "T")}
            {...register("service_start_time")}
          />
        </div>
        <div className="grid w-full  items-center gap-1.5">
          <Label className="text-[#616161] xl:text-sm text-xs ">
            Service end time
          </Label>
          <Input
            type="datetime-local"
            className=" xl:text-sm text-xs "
            defaultValue={getAPIDataDocs.service_end_time
              .split(".")[0]
              .replace(" ", "T")}
            {...register("service_end_time")}
          />
        </div>
        <div className="grid w-full  items-center gap-1.5">
          <Label className="text-[#616161] xl:text-sm text-xs ">
            Total Service Duration(in minutes)
          </Label>
          <Input
            type="number"
            className=" xl:text-sm text-xs "
            defaultValue={getAPIDataDocs.total_duration}
            {...register("total_duration")}
          />
        </div>

        {/* <div className="grid w-full  items-center gap-1.5">
          <Label className="text-[#616161] xl:text-sm text-xs ">
            Billing Status
          </Label>
          <ComboboxDemo
            data={BillingStatusComboBoxData}
            buttonClassName="w-full"
            popOverClassName="w-full"
          />
        </div>*/}
      </div>
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
            label="payment_type"
            // register={register}
            // errors={errors}
            // dataValue={getAPIDataDocs.payment_type}
            // setValueForm={setValue}
            displayValue={"label"}
            outputValue={"label"}
            dataValue={
              comboBoxKeyValues.payment_type || getAPIDataDocs.payment_type
            }
          />
        </div>
        {comboBoxKeyValues &&
          comboBoxKeyValues.payment_type === "Private Insurance Billing" && (
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
                label="is_the_patient_the_primary_policy_holder"
                register={register}
                setValueForm={setValue}
                getValueForm={getValues}
              />
            </div>
          )}

        {/* if primary policy holder is yes  */}

        {comboBoxKeyValues &&
          comboBoxKeyValues.payment_type === "Private Insurance Billing" && (
            <div className="text-[#616161] xl:text-sm text-xs ">
              <Label className="text-[#616161] xl:text-sm text-xs ">
                Primary Carrier
              </Label>
              <Input
                type="text"
                className=" xl:text-sm text-xs "
                defaultValue={getAPIDataDocs.primary_carrier}
                {...register("primary_carrier")}
              />
            </div>
          )}
        {comboBoxKeyValues &&
          comboBoxKeyValues.payment_type === "Private Insurance Billing" && (
            <div className="text-[#616161] xl:text-sm text-xs ">
              <Label className="text-[#616161] xl:text-sm text-xs ">
                Medical Record Number
              </Label>
              <Input
                type="text"
                className=" xl:text-sm text-xs "
                defaultValue={getAPIDataDocs.medical_record_number}
                {...register("medical_record_number")}
              />
            </div>
          )}
        {comboBoxKeyValues &&
          comboBoxKeyValues.payment_type === "Private Insurance Billing" && (
            <div className="text-[#616161] xl:text-sm text-xs ">
              <Label className="text-[#616161] xl:text-sm text-xs ">
                Group Number
              </Label>
              <Input
                type="text"
                className=" xl:text-sm text-xs "
                defaultValue={getAPIDataDocs.group_number}
                {...register("group_number")}
              />
            </div>
          )}

        {/* if primary policy holder is No */}

        {comboBoxKeyValues &&
          comboBoxKeyValues.payment_type === "Private Insurance Billing" &&
          selectPrimaryPolicyHolder === "No" && (
            <div className="text-[#616161] xl:text-sm text-xs ">
              <Label className="text-[#616161] xl:text-sm text-xs ">
                Primary holder first name
              </Label>
              <Input
                type="text"
                className=" xl:text-sm text-xs "
                defaultValue={getAPIDataDocs.primary_holder_first_name}
                {...register("primary_holder_first_name")}
              />
            </div>
          )}

        {comboBoxKeyValues &&
          comboBoxKeyValues.payment_type === "Private Insurance Billing" &&
          selectPrimaryPolicyHolder === "No" && (
            <div className="text-[#616161] xl:text-sm text-xs ">
              <Label className="text-[#616161] xl:text-sm text-xs ">
                Primary holder middle name
              </Label>
              <Input
                type="text"
                className=" xl:text-sm text-xs "
                defaultValue={getAPIDataDocs.primary_holder_middle_name}
                {...register("primary_holder_middle_name")}
              />
            </div>
          )}

        {comboBoxKeyValues &&
          comboBoxKeyValues.payment_type === "Private Insurance Billing" &&
          selectPrimaryPolicyHolder === "No" && (
            <div className="text-[#616161] xl:text-sm text-xs ">
              <Label className="text-[#616161] xl:text-sm text-xs ">
                Primary holder last name
              </Label>
              <Input
                type="text"
                className=" xl:text-sm text-xs "
                defaultValue={getAPIDataDocs.primary_holder_last_name}
                {...register("primary_holder_last_name")}
              />
            </div>
          )}

        {comboBoxKeyValues &&
          comboBoxKeyValues.payment_type === "Private Insurance Billing" &&
          selectPrimaryPolicyHolder === "No" && (
            <div className="text-[#616161] xl:text-sm text-xs ">
              <Label className="text-[#616161] xl:text-sm text-xs ">
                Primary holder dob
              </Label>
              <Input
                type="date"
                className=" xl:text-sm text-xs "
                defaultValue={getAPIDataDocs.primary_holder_dob}
                {...register("primary_holder_dob")}
              />
            </div>
          )}
        {comboBoxKeyValues &&
          comboBoxKeyValues.payment_type === "Private Insurance Billing" &&
          selectPrimaryPolicyHolder === "No" && (
            <div className="text-[#616161] xl:text-sm text-xs ">
              <Label className="text-[#616161] xl:text-sm text-xs ">
                Relationship to policy holder
              </Label>
              <Input
                type="text"
                className=" xl:text-sm text-xs "
                defaultValue={getAPIDataDocs.relationship_to_policy_holder}
                {...register("relationship_to_policy_holder")}
              />
            </div>
          )}

        {comboBoxKeyValues &&
          ["Medicare Billing"].includes(comboBoxKeyValues.payment_type) && (
            <div className="grid w-full  items-center gap-1.5">
              <Label className="text-[#616161] xl:text-sm text-xs ">
                Medi-Care ID Number
              </Label>
              <Input
                type="text"
                defaultValue={getAPIDataDocs.medicare_id_number}
                {...register("medicare_id_number")}
              />
            </div>
          )}

        {comboBoxKeyValues &&
          ["Medi-Cal Billing"].includes(comboBoxKeyValues.payment_type) && (
            <div className="grid w-full  items-center gap-1.5">
              <Label className="text-[#616161] xl:text-sm text-xs ">
                Medi-Cal ID Number
              </Label>
              <Input
                type="text"
                defaultValue={getAPIDataDocs.medi_cal_id_number}
                {...register("medi_cal_id_number")}
              />
            </div>
          )}

        {comboBoxKeyValues &&
          ["Cash", "Credit Card"].includes(comboBoxKeyValues.payment_type) && (
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
      {/* billing Code here */}
      {[
        "Medicare Billing",
        "Medi-Cal Billing",
        "Private Insurance Billing",
        "VFC Billing",
      ].includes(comboBoxKeyValues.payment_type) && (
          <div>
            <Separator orientation="horizontal" className="my-3 mb-5" />
            <h5 className="mb-1  xl:text-[1.35rem] sm:text-base  font-semibold text-[#656565] ">
              Billing Code
            </h5>
            <div className="flex flex-wrap gap-3">
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
                doctype="CMR Service"
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
          </div>
        )}
      {/* reference Document */}
      {/* <Separator orientation="horizontal" className="my-3" /> */}
      {/* <div>
        <h5 className="mb-1  xl:text-lg sm:text-base text-sm font-semibold text-[#656565] ">
          Reference Document
        </h5>
        <Input
          type="text"
          placeholder="CMR-24-1"
          className="max-w-sm w-full xl:text-sm text-xs "
        />
      </div> */}
    </div>
  );
};

const Activity = ({ selectActivity }: { selectActivity: CommentData[] }) => {
  return (
    <div className="lg:m-10 mt-5">
      <ActivityComponenet data={selectActivity} />
    </div>
  );
};
const ViewCMR = () => {
  const params = useParams<string>();
  const [selectedStepper, setSelectedStepper] = useState("patientInfo");
  const [selectCMRRecipient, setselectCMRRecipient] = useState("Patient");
  const { setDocTypeStatus } = useContext<any>(LayoutContext);
  const [selectPatientApiData, setPatientAPIData] = useState<any>();
  const [openAddPatient, setOnOpenPatient] = useState<boolean>(false);

  const {
    register,
    getValues,
    watch,
    setValue,
    formState: { errors },
    trigger,
    control,
  } = useForm();
  const [reloadData, setReloadData] = useState<boolean>(false);
  const [selectGender, setSelectGender] = useState<string>("");
  const [getRequestBody, setRequestBody] = useState<any>();
  const [getAddressData, setAddressData] = useState<any>();
  // checking data load or not
  const [loadData, setLoadData] = useState<boolean>(false);
  //get All types of payment Type
  const [paymentTypeOptions, setPaymentTypeOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const [selectPrimaryPolicyHolder, setPrimaryPolicyHolder] = useState("Yes");

  const handleInputChangeComboBox = (value: string, label: string) => {
    setComboBoxKeyValues((prev: any) => {
      return { ...prev, [label]: value };
    });
    if (label === "patient_name") {
      onChangePatientFieldHandler(value);
    }
  };
  const [comboBoxKeyValues, setComboBoxKeyValues] = useState<any>({});
  const [selectOptionOnData, setSelectOptionOnData] = useState<any>([]);

  const handleInputChangeForFollowUpAppointmentComboBox = (
    value: string,
    label: string
  ) => {
    setComboBoxKeyValuesForFollowUpAppointment((prev: any) => {
      return { ...prev, [label]: value };
    });
  };
  const [
    comboBoxKeyValuesForFollowUpAppointment,
    setComboBoxKeyValuesForFollowUpAppointment,
  ] = useState<any>({});

  //   const [getFollowAppointmentValuesFromAPI, setFollowAppointmentValuesFromAPI] =
  //     useState<any>({});
  //---------------------------------

  //Medical History useState declared
  // -----------------------------------------------
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
  // -----------------------------------------------

  //eligibility criteria Props
  //-------------------------------------------------
  const [getEligibilityCriteriaData, setEligibilityCriteriaData] = useState<
    any[]
  >([]);

  // Scheduling useState props
  //-----------------------------------

  const [selectDeliveryMethod, setSelectDeliveryMethod] =
    useState<string>("Face to Face");

  const [selectAgreeToComply, setAgreeToComply] = useState<string>("");
  const [selectDoYouHaveVerbelConsent, setDoYouHaveVerbelConsent] =
    useState<number>(0);
  //-------------------------------------
  //-------------------------------------

  //Medication Action Plan useStates
  //----------------------------------------

  const [getMedicationActionPlanData, setMecationActionPlanData] =
    useState<any>([]);
  //----------------------------------------

  const changesetselectCMRRecipient = (e: any) => {
    setselectCMRRecipient(e.target.value);
    setValue("cmr_recipient", e.target.value);
  };
  //steps change to useState
  const [steps, setSteps] = useState<{ key: string; label: string }[]>([]);
  const nextButtonString = [
    {
      key: "Not Started",
      value: "Next: Patient History",
    },
    {
      key: "Qualified",
      value: "Next: Scheduling",
    },
    {
      key: "In Progress",
      value: "Next: Action Plan",
    },
    {
      key: "Scheduled",
      value: "Next: Patient Summary",
    },
    {
      key: "Ready for Service",
      value: "Complete",
    },
  ];

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
      ...getAPIDataDocs,
      name: params.id,
      owner: Cookies.get("email"),
      eligibility:
        getEligibilityCriteriaData !== undefined
          ? getEligibilityCriteriaData
          : getAPIDataDocs.eligibility,
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
      delivery_method:
        selectDeliveryMethod !== undefined
          ? selectDeliveryMethod
          : getAPIDataDocs.delivery_method,
      aggree:
        selectAgreeToComply !== undefined
          ? selectAgreeToComply
          : getAPIDataDocs.aggree,
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
      billing_code:
        getBillingCodeData !== undefined
          ? getBillingCodeData
          : getAPIDataDocs.billing_code,
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
      signs_date:
        getValues("signs_date") !== undefined
          ? getValues("signs_date")
          : getAPIDataDocs.signs_date,
      pulse:
        getValues("pulse") !== undefined
          ? getValues("pulse")
          : getAPIDataDocs.pulse,
      height:
        getValues("height") !== undefined
          ? getValues("height")
          : getAPIDataDocs.height,
      weight:
        getValues("weight") !== undefined
          ? getValues("weight")
          : getAPIDataDocs.weight,
      bmi:
        getValues("bmi") !== undefined ? getValues("bmi") : getAPIDataDocs.bmi,
      signs_time:
        getValues("signs_time") !== undefined
          ? getValues("signs_time")
          : getAPIDataDocs.signs_time,
      bp_systolic:
        getValues("bp_systolic") !== undefined
          ? getValues("bp_systolic")
          : getAPIDataDocs.bp_systolic,
      bp_diastolic:
        getValues("bp_diastolic") !== undefined
          ? getValues("bp_diastolic")
          : getAPIDataDocs.bp_diastolic,
      bp: "23/2323 mmHg",
      my_follow_up_plan:
        getValues("my_follow_up_plan") !== undefined
          ? getValues("my_follow_up_plan")
          : getAPIDataDocs.my_follow_up_plan,
      questions:
        getValues("questions") !== undefined
          ? getValues("questions")
          : getAPIDataDocs.questions,
      date_cmr_was_completed:
        getValues("date_cmr_was_completed") !== undefined
          ? getValues("date_cmr_was_completed")
          : getAPIDataDocs.date_cmr_was_completed,
      ltc:
        selectCMRWasCompleted !== undefined
          ? selectCMRWasCompleted
          : getAPIDataDocs.ltc,
      language:
        selectLanguageTemplateForPatient !== undefined
          ? selectLanguageTemplateForPatient
          : getAPIDataDocs.language,
      patient_summary_date:
        getValues("patient_summary_date") !== undefined
          ? getValues("patient_summary_date")
          : getAPIDataDocs.patient_summary_date,
      pharmacists_availability_for_questions:
        getAPIDataDocs.pharmacists_availability_for_questions,
      verify_patients_name_and_address:
        getAPIDataDocs.verify_patients_name_and_address,
      agreement:
        getPatientSUmmaryAgreement !== undefined
          ? getPatientSUmmaryAgreement
          : getAPIDataDocs.agreement,
      service_start_time:
        getValues("service_start_time") !== undefined
          ? getValues("service_start_time")
          : getAPIDataDocs.service_start_time,
      total_duration:
        getValues("total_duration") !== undefined
          ? parseInt(getValues("total_duration"))
          : parseInt(getAPIDataDocs.total_duration),
      payment_type:
        comboBoxKeyValues.payment_type !== undefined
          ? comboBoxKeyValues.payment_type
          : getAPIDataDocs.payment_type,
      medi_cal_id_number:
        getValues("medi_cal_id_number") !== undefined
          ? getValues("medi_cal_id_number")
          : getAPIDataDocs.medi_cal_id_number,
      service_end_time:
        getValues("service_end_time") !== undefined
          ? getValues("service_end_time")
          : getAPIDataDocs.service_end_time,
      workflow_progress: getAPIDataDocs.workflow_progress,
      _user_tags: getAPIDataDocs._user_tags,
      caregiver_name:
        getValues("caregiver_name") !== undefined
          ? getValues("caregiver_name")
          : getAPIDataDocs.caregiver_name,
      caregiver_relationship:
        getValues("caregiver_relationship") !== undefined
          ? getValues("caregiver_relationship")
          : getAPIDataDocs.caregiver_relationship,

      mode_of_delivering_mtm:
        selectDoYouHaveVerbelConsent != undefined
          ? selectDoYouHaveVerbelConsent
          : getAPIDataDocs.mode_of_delivering_mtm,
      is_the_patient_the_primary_policy_holder:
        selectPrimaryPolicyHolder !== undefined
          ? selectPrimaryPolicyHolder
          : getAPIDataDocs.is_the_patient_the_primary_policy_holder,
      time_of_payment:
        selectTimeofPayment !== undefined
          ? selectTimeofPayment
          : getAPIDataDocs.time_of_payment,
      primary_carrier:
        getValues("primary_carrier") !== undefined
          ? getValues("primary_carrier")
          : getAPIDataDocs.primary_carrier,
      medical_record_number:
        getValues("medical_record_number") !== undefined
          ? getValues("medical_record_number")
          : getAPIDataDocs.medical_record_number,
      group_number:
        getValues("group_number") !== undefined
          ? getValues("group_number")
          : getAPIDataDocs.group_number,
      primary_holder_first_name:
        getValues("primary_holder_first_name") !== undefined
          ? getValues("primary_holder_first_name")
          : getAPIDataDocs.primary_holder_first_name,
      primary_holder_middle_name:
        getValues("primary_holder_middle_name") !== undefined
          ? getValues("primary_holder_middle_name")
          : getAPIDataDocs.primary_holder_middle_name,
      primary_holder_last_name:
        getValues("primary_holder_last_name") !== undefined
          ? getValues("primary_holder_last_name")
          : getAPIDataDocs.primary_holder_last_name,
      primary_holder_dob:
        getValues("primary_holder_dob") !== undefined
          ? getValues("primary_holder_dob")
          : getAPIDataDocs.primary_holder_dob,
      relationship_to_policy_holder:
        getValues("relationship_to_policy_holder") !== undefined
          ? getValues("relationship_to_policy_holder")
          : getAPIDataDocs.relationship_to_policy_holder,
      medicare_id_number:
        getValues("medicare_id_number") !== undefined
          ? getValues("medicare_id_number")
          : getAPIDataDocs.medicare_id_number,
      patient_eligibility_template:
        getValues("patient_eligibility_template") !== undefined
          ? getValues("patient_eligibility_template")
          : getAPIDataDocs.patient_eligibility_template,
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
    //here set the values after getting response
    setValue("phone", patientPersonalInfoFields.mobile);
    setValue("pcp_name", patientPersonalInfoFields.custom_pcp_name);
    setValue("dob", patientPersonalInfoFields.dob);
    setSelectGender(patientPersonalInfoFields.sex);
    setValue("pcp_phone_number", patientPersonalInfoFields.custom_pcp_phone);

    setselectCMRRecipient(reqBody.cmr_recipient);
    setEligibilityCriteriaData(reqBody.eligibility);

    //setting steps to the stepper
    // setSteps(
    //   getStepsForWorkflowState(reqBody.workflow_state)
    // );

    //setting up the data of PatientHistory
    // setMaritalStatus(response.data?.docs[0]?.marital_status);
    //---------------------------------------------------------

    setUsedTobacoProduct(
      reqBody.do_you_currently_use_or_have_you_ever_tobacco_profucts
    );
    setCurrentCigaretteSmoker(
      reqBody.current_cigarette_smoker === 1 ? true : false
    );

    setFormerCigaretteSmoker(
      reqBody.former_cigarette_smoker === 1 ? true : false
    );

    setOtherTobbacoUser(reqBody.other_tobacco_user === 1 ? true : false);

    setaccessToNarcan(reqBody.use_opioids_and_have_access_to_nacran);

    setWantToQuit(reqBody.are_you_interested_in_quiting_1);

    setHaveYouEverInjected(reqBody.purpose_of_body_shapping);

    setHaveYouEverHospitalized(reqBody.have_you_hospitalized_overnight);

    //medication data filled up

    setMedicationCardData(reqBody.medications);

    //diagnosis data filled up
    setDiagnosisCardData(reqBody.health_conditions);

    //DrugAllergies data filled up
    setDrugAllergiesCardData(reqBody.allergies_side_effects);

    //Family Health Data Filled UP
    setFamilyHealthCardData(reqBody.relative_medical_conditions);

    //Sugical History Filled UP
    setSurgicalHisotryData(reqBody.surgical_histories);

    //Family Housing Filled up
    setemployeeHousingData(reqBody.employment_housing_transportation);

    //set Scheduling data
    setSelectDeliveryMethod(reqBody.delivery_method);

    setDoYouHaveVerbelConsent(reqBody.mode_of_delivering_mtm);

    setAgreeToComply(reqBody.aggree);
    //---------------------------------------------------------

    //Medical Action Plan filled UP data
    //---------------------------------------------------------

    setMecationActionPlanData(reqBody.medication_action_plan);
    //---------------------------------------------------------

    //PatientSummary fillled UP Data
    //---------------------------------------------------------
    setBillingCodeData(reqBody.billing_code);
    setPatientSummaryAgreement(reqBody.agreement);
    setSelectCMRPaymentType(reqBody.payment_type);

    setSelectLanguageTemplateForPatient(reqBody.language);
    //---------------------------------------------------------
    setSelectCMRWasCompleted(reqBody.ltc);
  };

  //Patient Summary UseStates

  //---------------------------------------------------
  const [getBillingCodeData, setBillingCodeData] = useState<any[]>([]);
  const [selectCMRWasCompleted, setSelectCMRWasCompleted] = useState("Yes");
  const [getPatientSUmmaryAgreement, setPatientSummaryAgreement] =
    useState<any>(0);
  const [
    selectLanguageTemplateForPatient,
    setSelectLanguageTemplateForPatient,
  ] = useState("English");
  const [selectCMRPaymentType, setSelectCMRPaymentType] = useState(
    "insuranceCMRPaymentType"
  );

  const [selectTimeofPayment, setTimeofPayment] = useState("Pay now");
  //---------------------------------------------------

  //API Data store here
  const [getAPIDataDocs, setAPIDataDocs] = useState<any>({});
  const [getAPIDataDocsInfo, setAPIDataDocsInfo] = useState<any>({});
  const [getAPIDataLinkTitles, setAPIDataLinkTitles] = useState<any>({});

  //Activity UseState props
  const [selectActivity, setActivity] = useState<CommentData[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const [tags, setTags] = useState<string[]>([]);

  //save the state of the tables view here
  const [tableViewFieldState, setTableViewFieldState] = useState<any>();

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles: any) => {
      setUploadedFiles(acceptedFiles);
      // Call your backend API endpoint to upload files
    },
  });
  //integrating API here
  useEffect(() => {
    const fetchData = async () => {
      const URL = BASE_URL + API.VIEW_DOCTYPE;
      const response = await axiosPOSTAPI(URL, {
        doctype: "CMR Service",
        name: params.id,
      });
      if (response.status === 200) {
        if (response.data.docs) {
          //setting up the frappe client get API
          const CLIENT_GET_URL = BASE_URL + API.CLIENT_GET;
          const responseClientGet = await axiosPOSTAPI(CLIENT_GET_URL, {
            doctype: "Appointment Type",
            name: response.data.docs[0].custom_select_appointment_type,
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
            BASE_URL + API.LOAD_FORM_DOCTYPE + "?doctype=CMR Service";
          const responseLoadGETDocType = await axiosGETAPI(LOAD_GET_DOCTYPE);
          if (responseLoadGETDocType.status === 200) {
            setTableViewFieldState(
              JSON.parse(responseLoadGETDocType.data.user_settings)
            );
          }

          //set option of appointment type and location
          const URL = BASE_URL + API.GET_DOCDATA_FOR_SELECT;
          const responseGETDOCData = await axiosPOSTAPI(URL, {
            doctype: "CMR Service",
          });
          if (responseGETDOCData.status === 200) {
            setSelectOptionOnData(responseGETDOCData.data.message);
          }

          setAPIDataDocs(response.data.docs[0]);
          setAPIDataDocsInfo(response.data.docinfo);
          setAPIDataLinkTitles(response.data._link_titles);

          //setting useState of Patient Info tab
          setselectCMRRecipient(response.data.docs[0].cmr_recipient);
          setEligibilityCriteriaData(response.data.docs[0].eligibility);

          //setting steps to the stepper
          setSteps(
            getStepsForWorkflowState(response.data.docs[0].workflow_state)
          );

          //setting the status on the data
          setDocTypeStatus({
            page: "cmr-service",
            status: response.data.docs[0].workflow_state,
          });
          //setting up the data of PatientHistory
          // setMaritalStatus(response.data?.docs[0]?.marital_status);
          //---------------------------------------------------------

          setUsedTobacoProduct(
            response.data?.docs[0]
              ?.do_you_currently_use_or_have_you_ever_tobacco_profucts
          );
          setCurrentCigaretteSmoker(
            response.data?.docs[0]?.current_cigarette_smoker === 1
              ? true
              : false
          );

          setFormerCigaretteSmoker(
            response.data?.docs[0]?.former_cigarette_smoker === 1 ? true : false
          );

          setOtherTobbacoUser(
            response.data?.docs[0]?.other_tobacco_user === 1 ? true : false
          );

          setaccessToNarcan(
            response.data?.docs[0]?.use_opioids_and_have_access_to_nacran
          );

          setWantToQuit(
            response.data?.docs[0]?.are_you_interested_in_quiting_1
          );

          setHaveYouEverInjected(
            response.data?.docs[0]?.purpose_of_body_shapping
          );

          setHaveYouEverHospitalized(
            response.data?.docs[0]?.have_you_hospitalized_overnight
          );

          //medication data filled up

          setMedicationCardData(response.data?.docs[0]?.medications);

          //diagnosis data filled up
          setDiagnosisCardData(response.data?.docs[0]?.health_conditions);

          //DrugAllergies data filled up
          setDrugAllergiesCardData(
            response.data?.docs[0]?.allergies_side_effects
          );

          //Family Health Data Filled UP
          setFamilyHealthCardData(
            response.data?.docs[0]?.relative_medical_conditions
          );

          //Sugical History Filled UP
          setSurgicalHisotryData(response.data?.docs[0]?.surgical_histories);

          //Family Housing Filled up
          setemployeeHousingData(
            response.data?.docs[0]?.employment_housing_transportation
          );

          //set Scheduling data
          setSelectDeliveryMethod(response.data?.docs[0]?.delivery_method);

          setDoYouHaveVerbelConsent(
            response.data?.docs[0]?.mode_of_delivering_mtm
          );

          setAgreeToComply(response.data?.docs[0]?.aggree);
          //---------------------------------------------------------

          //Medical Action Plan filled UP data
          //---------------------------------------------------------

          setMecationActionPlanData(
            response.data?.docs[0]?.medication_action_plan
          );
          //---------------------------------------------------------

          //PatientSummary fillled UP Data
          //---------------------------------------------------------
          setBillingCodeData(response.data?.docs[0]?.billing_code);
          setPatientSummaryAgreement(response.data?.docs[0]?.agreement);
          setPrimaryPolicyHolder(
            response.data?.docs[0]?.is_the_patient_the_primary_policy_holder
          );
          setTimeofPayment(response.data?.docs[0]?.time_of_payment);
          setSelectCMRPaymentType(response.data?.docs[0]?.payment_type);
          setComboBoxKeyValues((prev: any) => {
            return {
              ...prev,
              payment_type: response.data?.docs[0].payment_type,
            };
          });

          setSelectLanguageTemplateForPatient(response.data?.docs[0]?.language);
          //---------------------------------------------------------
          setSelectCMRWasCompleted(response.data?.docs[0]?.ltc);

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
          //--------------------------------------

          if (response.data?.docinfo?.tags) {
            setTags(response.data?.docinfo?.tags.split(","));
          }
          const currentStepperSteps = getStepsForWorkflowState(
            response.data.docs[0].workflow_state
          );

          setSelectedStepper(
            currentStepperSteps[currentStepperSteps.length - 1].key
          );
          // setValue("phone", response.data?.docs[0].phone);
          // setValue("pcp_name", response.data?.docs[0].pcp_name);
          // setValue("dob", response.data?.docs[0].dob);
          setSelectGender(response.data?.docs[0].gender);
          // setValue("pcp_phone_number", response.data?.docs[0].pcp_phone_number);

          //set Patient Image and patient notes
          if (response.data?.docs[0].patient_name) {
            const patientResponse = await validatedLink(
              "Patient",
              response.data?.docs[0].patient_name,
              '["custom_patient_notes","image","email","sex","status"]'
            );
            setPatientAPIData(patientResponse);
          }
          // setAddressData(response.data?.docs[0].address_html);

          //set setvalue for combobox and radio
          setValue("payment_type", response.data.docs[0]?.payment_type);
          setLoadData(true);
        } else {
          toast.error("Data not Found");
        }
      } else {
        toast.error("Data not Found");
      }
    };
    fetchData();
    return () => {
      setDocTypeStatus(undefined);
    };
  }, [reloadData, params]);

  //for uploading attachment file
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
        { tag: tag, dt: "CMR Service", dn: params.id },
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
        { tag: tag, dt: "CMR Service", dn: params.id },
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

  const patientTakeAway = async () => {
    const URL = BASE_URL + API.CMR_PATIENT_TAKE_AWAY;
    const response = await axiosPOSTAPI(URL, {
      doc_name: params.id,
      doc_type: "CMR Service",
      language: "English",
    });
    if (response.status === 200) {
      if (response.data?.message) {
        window.open(response.data?.message, "_blank");
      }
    }
  };

  // const PatientFollowUpDataFilled = async () => {
  //   const appointmentTypeApi = async () => {
  //     const URL = BASE_URL + API.CLIENT_GET_VALUE;
  //     const response = await axiosPOSTAPI(URL, {
  //       filters: { custom_default_followup: 1 },
  //       doc_type: "Appointment Type",
  //       fieldname: "name",
  //     });
  //     if (response.status === 200) {
  //       setFollowAppointmentValuesFromAPI(response.data?.message?.name);
  //     }
  //   };

  //   appointmentTypeApi();
  // };

  const followUpAppointmentCreate = async () => {
    const URL = BASE_URL + API.FOLLOWUP_APPOINTMENT_CREATE_APPOINTMENT;
    const reqbody = {
      appointment_type:
        comboBoxKeyValuesForFollowUpAppointment.appointment_type !== undefined
          ? comboBoxKeyValuesForFollowUpAppointment.appointment_type
          : getAPIDataDocs.custom_select_appointment_type,
      patient: getAPIDataDocs.patient_name,
      department: "Pharmacy",
      appointment_date: getValues("follow_up_appointment.date"),
      service_unit:
        comboBoxKeyValuesForFollowUpAppointment.service_unit !== undefined
          ? comboBoxKeyValuesForFollowUpAppointment.service_unit
          : getAPIDataDocs.custom_location_of_service,
      doctype: "CMR Service",
      docname: params.id,
      is_new: "Follow-up CMR Appointment",
    };
    const response = await axiosPOSTAPI(URL, { args: JSON.stringify(reqbody) });
    if (response.status === 200) {
      toast.success("Appointment Scheduled against CMR Service");
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
          address_html: getAPIDataDocs.address_html,
          name: getAPIDataDocs.name,
          owner: getAPIDataDocs.owner,
          creation: getAPIDataDocs.creation,
          modified: getAPIDataDocs.modified,
          modified_by: getAPIDataDocs.modified_by,
          docstatus: getAPIDataDocs.docstatus,
          idx: getAPIDataDocs.idx,
          workflow_state: getAPIDataDocs.workflow_state,
          naming_series: getAPIDataDocs.naming_series,
          patient_name:
            comboBoxKeyValues.patient_name !== undefined
              ? comboBoxKeyValues.patient_name
              : getAPIDataDocs.patient_name,
          dob: getAPIDataDocs.dob,
          phone: getAPIDataDocs.phone,
          cmr_recipient:
            selectCMRRecipient !== undefined
              ? selectCMRRecipient
              : getAPIDataDocs.cmr_recipient,
          reason_for_service:
            getValues("reason_for_service") !== undefined
              ? getValues("reason_for_service")
              : getAPIDataDocs.reason_for_service,
          patient_appointment: getAPIDataDocs.patient_appointment,
          custom_location_of_service:
            comboBoxKeyValues.custom_location_of_service !== undefined
              ? comboBoxKeyValues.custom_location_of_service
              : getAPIDataDocs.custom_location_of_service,
          custom_select_appointment_type:
            comboBoxKeyValues.custom_select_appointment_type !== undefined
              ? comboBoxKeyValues.custom_select_appointment_type
              : getAPIDataDocs.custom_select_appointment_type,
          gender: getAPIDataDocs.gender,
          pcp_name: getAPIDataDocs.pcp_name,
          pcp_phone_number: getAPIDataDocs.pcp_phone_number,
          do_you_currently_use_or_have_you_ever_tobacco_profucts:
            usedTobacoProduct !== undefined
              ? usedTobacoProduct
              : getAPIDataDocs.do_you_currently_use_or_have_you_ever_tobacco_profucts,
          current_cigarette_smoker:
            selectCurrentCigaretteSmoker !== undefined
              ? selectCurrentCigaretteSmoker
                ? 1
                : 0
              : getAPIDataDocs.current_cigarette_smoker,
          when_did_you_first_start_smoking:
            comboBoxKeyValues.when_did_you_first_start_smoking !== undefined
              ? comboBoxKeyValues.when_did_you_first_start_smoking
              : getAPIDataDocs.when_did_you_first_start_smoking,
          how_many_cigarettes_do_you_smoke_per_day:
            getAPIDataDocs.how_many_cigarettes_do_you_smoke_per_day,
          are_you_interested_in_quiting_1:
            wantToQuit !== undefined
              ? wantToQuit
              : getAPIDataDocs.are_you_interested_in_quiting_1,
          former_cigarette_smoker:
            selectFormerCigaretteSmoker !== undefined
              ? selectFormerCigaretteSmoker
                ? 1
                : 0
              : getAPIDataDocs.former_cigarette_smoker,
          on_average_how_many_cigarettes_did_you_smoke_per_day: 0,
          how_many_years_did_you_smoke_for: 0.0,
          other_tobacco_user:
            selectOtherTobbacoUser !== undefined
              ? selectOtherTobbacoUser
                ? 1
                : 0
              : getAPIDataDocs.other_tobacco_user,
          other_description: getAPIDataDocs.other_description,
          how_many_times_in_the_past_year:
            getValues("how_many_times_in_the_past_year") !== undefined
              ? getValues("how_many_times_in_the_past_year")
              : getAPIDataDocs.how_many_times_in_the_past_year,
          are_you_interested_in_quiting_2:
            getAPIDataDocs.are_you_interested_in_quiting_2,
          past_year_have_you_had_4_or_more_alcoholic_drinks_iady:
            getValues(
              "past_year_have_you_had_4_or_more_alcoholic_drinks_iady"
            ) !== undefined
              ? getValues(
                "past_year_have_you_had_4_or_more_alcoholic_drinks_iady"
              )
              : getAPIDataDocs.past_year_have_you_had_4_or_more_alcoholic_drinks_iady,
          use_opioids_and_have_access_to_nacran:
            accessToNarcan !== undefined
              ? accessToNarcan
              : getAPIDataDocs.use_opioids_and_have_access_to_nacran,
          purpose_of_body_shapping:
            haveYouEverInjected !== undefined
              ? haveYouEverInjected
              : getAPIDataDocs.purpose_of_body_shapping,
          have_you_hospitalized_overnight:
            haveYouEverHospitalized !== undefined
              ? haveYouEverHospitalized
              : getAPIDataDocs.have_you_hospitalized_overnight,
          what_for_and_when:
            getValues("what_for_and_when") !== undefined
              ? getValues("what_for_and_when")
              : getAPIDataDocs.what_for_and_when,
          delivery_method:
            selectDeliveryMethod !== undefined
              ? selectDeliveryMethod
              : getAPIDataDocs.delivery_method,
          aggree:
            selectAgreeToComply !== undefined
              ? selectAgreeToComply
              : getAPIDataDocs.aggree,
          signs_date:
            getValues("signs_date") !== undefined
              ? getValues("signs_date")
              : getAPIDataDocs.signs_date,
          pulse:
            getValues("pulse") !== undefined
              ? getValues("pulse")
              : getAPIDataDocs.pulse,
          height:
            getValues("height") !== undefined
              ? getValues("height")
              : getAPIDataDocs.height,
          weight:
            getValues("weight") !== undefined
              ? getValues("weight")
              : getAPIDataDocs.weight,
          bmi:
            getValues("bmi") !== undefined
              ? getValues("bmi")
              : getAPIDataDocs.bmi,
          signs_time:
            getValues("signs_time") !== undefined
              ? getValues("signs_time")
              : getAPIDataDocs.signs_time,
          bp_systolic:
            getValues("bp_systolic") !== undefined
              ? getValues("bp_systolic")
              : getAPIDataDocs.bp_systolic,
          bp_diastolic:
            getValues("bp_diastolic") !== undefined
              ? getValues("bp_diastolic")
              : getAPIDataDocs.bp_diastolic,
          my_follow_up_plan:
            getValues("my_follow_up_plan") !== undefined
              ? getValues("my_follow_up_plan")
              : getAPIDataDocs.my_follow_up_plan,
          questions:
            getValues("questions") !== undefined
              ? getValues("questions")
              : getAPIDataDocs.questions,
          date_cmr_was_completed:
            getValues("date_cmr_was_completed") !== undefined
              ? getValues("date_cmr_was_completed")
              : getAPIDataDocs.date_cmr_was_completed,
          ltc:
            selectCMRWasCompleted !== undefined
              ? selectCMRWasCompleted
              : getAPIDataDocs.ltc,
          language:
            selectLanguageTemplateForPatient !== undefined
              ? selectLanguageTemplateForPatient
              : getAPIDataDocs.language,
          patient_summary_date:
            getValues("patient_summary_date") !== undefined
              ? getValues("patient_summary_date")
              : getAPIDataDocs.patient_summary_date,
          pharmacists_availability_for_questions:
            getAPIDataDocs.pharmacists_availability_for_questions,
          verify_patients_name_and_address:
            getAPIDataDocs.verify_patients_name_and_address,
          are_you_interesting_in_quiting:
            getAPIDataDocs.are_you_interesting_in_quiting,
          agreement:
            getPatientSUmmaryAgreement !== undefined
              ? getPatientSUmmaryAgreement
              : getAPIDataDocs.agreement,
          service_start_time:
            getValues("service_start_time") !== undefined
              ? getValues("service_start_time")
              : getAPIDataDocs.service_start_time,
          total_duration:
            getValues("total_duration") !== undefined
              ? parseInt(getValues("total_duration"))
              : parseInt(getAPIDataDocs.total_duration),
          payment_type:
            comboBoxKeyValues.payment_type !== undefined
              ? comboBoxKeyValues.payment_type
              : getAPIDataDocs.payment_type,
          medi_cal_id_number:
            getValues("medi_cal_id_number") !== undefined
              ? getValues("medi_cal_id_number")
              : getAPIDataDocs.medi_cal_id_number,
          billing_status: "Not Ready for Billing",
          service_end_time:
            getValues("service_end_time") !== undefined
              ? getValues("service_end_time")
              : getAPIDataDocs.service_end_time,
          workflow_progress: getAPIDataDocs.workflow_progress,
          doctype: getAPIDataDocs.doctype,
          allergies_side_effects:
            selectDrugAllergiesCardData !== undefined
              ? selectDrugAllergiesCardData
              : getAPIDataDocs.allergies_side_effects,
          surgical_histories:
            selectSurgicalHistory !== undefined
              ? selectSurgicalHistory
              : getAPIDataDocs.surgical_histories,
          health_conditions:
            selectDiagnosisCardData !== undefined
              ? selectDiagnosisCardData
              : getAPIDataDocs.health_conditions,
          recreational_drug_usage: [],
          medications:
            selectMedicalCardData !== undefined
              ? selectMedicalCardData
              : getAPIDataDocs.medications,
          employment_housing_transportation:
            selectEmployeeHousing !== undefined
              ? selectEmployeeHousing
              : getAPIDataDocs.employment_housing_transportation,
          billing_code:
            getBillingCodeData !== undefined
              ? getBillingCodeData
              : getAPIDataDocs.billing_code,
          medication_action_plan:
            getMedicationActionPlanData !== undefined
              ? getMedicationActionPlanData
              : getAPIDataDocs.medication_action_plan,
          eligibility:
            getEligibilityCriteriaData !== undefined
              ? getEligibilityCriteriaData
              : getAPIDataDocs.eligibility,
          relative_medical_conditions:
            selectFamilyHealthHistory !== undefined
              ? selectFamilyHealthHistory
              : getAPIDataDocs.relative_medical_conditions,
          _user_tags: getAPIDataDocs._user_tags,
          caregiver_name:
            getValues("caregiver_name") !== undefined
              ? getValues("caregiver_name")
              : getAPIDataDocs.caregiver_name,
          caregiver_relationship:
            getValues("caregiver_relationship") !== undefined
              ? getValues("caregiver_relationship")
              : getAPIDataDocs.caregiver_relationship,
          when_did_you_quit_smoking:
            comboBoxKeyValues.when_did_you_quit_smoking !== undefined
              ? comboBoxKeyValues.when_did_you_quit_smoking
              : getAPIDataDocs.when_did_you_quit_smoking,
          mode_of_delivering_mtm:
            selectDoYouHaveVerbelConsent != undefined
              ? selectDoYouHaveVerbelConsent
              : getAPIDataDocs.mode_of_delivering_mtm,
          is_the_patient_the_primary_policy_holder:
            selectPrimaryPolicyHolder !== undefined
              ? selectPrimaryPolicyHolder
              : getAPIDataDocs.is_the_patient_the_primary_policy_holder,
          time_of_payment:
            selectTimeofPayment !== undefined
              ? selectTimeofPayment
              : getAPIDataDocs.time_of_payment,
          primary_carrier:
            getValues("primary_carrier") !== undefined
              ? getValues("primary_carrier")
              : getAPIDataDocs.primary_carrier,
          medical_record_number:
            getValues("medical_record_number") !== undefined
              ? getValues("medical_record_number")
              : getAPIDataDocs.medical_record_number,
          group_number:
            getValues("group_number") !== undefined
              ? getValues("group_number")
              : getAPIDataDocs.group_number,
          primary_holder_first_name:
            getValues("primary_holder_first_name") !== undefined
              ? getValues("primary_holder_first_name")
              : getAPIDataDocs.primary_holder_first_name,
          primary_holder_middle_name:
            getValues("primary_holder_middle_name") !== undefined
              ? getValues("primary_holder_middle_name")
              : getAPIDataDocs.primary_holder_middle_name,
          primary_holder_last_name:
            getValues("primary_holder_last_name") !== undefined
              ? getValues("primary_holder_last_name")
              : getAPIDataDocs.primary_holder_last_name,
          primary_holder_dob:
            getValues("primary_holder_dob") !== undefined
              ? getValues("primary_holder_dob")
              : getAPIDataDocs.primary_holder_dob,
          relationship_to_policy_holder:
            getValues("relationship_to_policy_holder") !== undefined
              ? getValues("relationship_to_policy_holder")
              : getAPIDataDocs.relationship_to_policy_holder,
          medicare_id_number:
            getValues("medicare_id_number") !== undefined
              ? getValues("medicare_id_number")
              : getAPIDataDocs.medicare_id_number,
          patient_eligibility_template:
            getValues("patient_eligibility_template") !== undefined
              ? getValues("patient_eligibility_template")
              : getAPIDataDocs.patient_eligibility_template,
        };
        const response = await axiosPOSTAPI(URL, {
          doc: JSON.stringify(reqBody),
          action: "Save",
        });
        toast.success("Document Saved Successfully");
        setReloadData((prev: boolean) => !prev);
        return response;
      } catch (error: any) {
        toast.error("Document not Saved Successfully");
      }
    }
  };

  //APPLY workflow here
  const ApplyWorkFlow = async () => {
    const resp = await finalSave();
    if (getAPIDataDocs.workflow_state !== "Not Started") {
      if (resp && resp.status === 200) {
        const URL = BASE_URL + API.APPLY_WORKFLOW;
        const response = await axiosPOSTAPI(URL, {
          doc: JSON.stringify(resp.data.docs[0]),
          action: nextActionWorkFlowState(resp.data.docs[0].workflow_state),
        });
        if (response.status === 200) {
          toast.success("Workflow updated");
          setReloadData((prev: boolean) => !prev);
        }
      }
    }
  };

  return loadData ? (
    <ReloadDataContext.Provider
      value={{
        reloadData,
        setReloadData,
        params,
        tableViewFieldState,
        setTableViewFieldState,
      }}
    >
      <div className="px-3 pt-3">
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
              {getAPIDataDocs.workflow_state === "Service Completed" && (
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="items-end space-x-2">
                      <Button
                        variant="outline"
                        className="bg-[#7ACFFF] text-[#FFFFFF] border-[#CCCCCC] border-x  border-y border-opacity-20 font-semibold hover:bg-[#7295f7] hover:text-[#FFFFFF]"
                      // onClick={() => PatientFollowUpDataFilled()}
                      >
                        <img
                          src={CMRFollowUpAppointment.path}
                          alt={CMRFollowUpAppointment.alt}
                          width={17}
                          height={17}
                          className="lg:mr-2"
                        />
                        <p className="hidden lg:block xl:text-sm text-xs">
                          Follow-up appointment
                        </p>
                      </Button>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="">
                    <DialogHeader>
                      <DialogTitle>Follow-Up Appointment</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-2">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <div>
                          <Label htmlFor="name" className="text-left ">
                            Appointment Type{" "}
                            <span className="text-[#ED9192]">*</span>
                          </Label>
                        </div>
                        <div className="col-span-3">
                          <ComboboxDropDown
                            label="appointment_type"
                            handleInputChange={
                              handleInputChangeForFollowUpAppointmentComboBox
                            }
                            doctype="Appointment Type"
                            dataValue={
                              getAPIDataDocs.custom_select_appointment_type
                            }
                            placeholder="select Appointment Type"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <div>
                          <Label htmlFor="name" className="text-left ">
                            Location <span className="text-[#ED9192]"></span>
                          </Label>
                        </div>
                        <div className="col-span-3">
                          <ComboboxDropDown
                            label="service_unit"
                            handleInputChange={
                              handleInputChangeForFollowUpAppointmentComboBox
                            }
                            doctype="Healthcare Service Unit"
                            dataValue={
                              getAPIDataDocs.custom_location_of_service
                            }
                            placeholder="select Location"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <div>
                          <Label htmlFor="name" className="text-left ">
                            Date <span className="text-[#ED9192]">*</span>
                          </Label>
                        </div>
                        <div className="col-span-3">
                          <Input
                            type="date"
                            defaultValue={getCurrentDate()}
                            {...register("follow_up_appointment.date")}
                          />
                        </div>
                      </div>
                    </div>

                    <DialogFooter>
                      <DialogClose asChild>
                        <Button
                          type="submit"
                          onClick={() => followUpAppointmentCreate()}
                          className="bg-[#7ACFFF]"
                        >
                          Save
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}
              {getAPIDataDocs.workflow_state === "Service Completed" && (
                <div className="items-end space-x-2">
                  <Button
                    className="bg-[#7ACFFF] text-[#FFFFFF] border-[#CCCCCC] border-x  border-y border-opacity-20 font-semibold  xl:text-sm text-xs hover:bg-[#7295f7] hover:text-[#FFFFFF]"
                    onClick={() => patientTakeAway()}
                  >
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
          {selectPatientApiData &&
            selectPatientApiData.custom_patient_notes && (
              <div className="ml-4 text-[#474747] text-base">
                <span className=" font-bold">note:</span>{" "}
                {selectPatientApiData.custom_patient_notes}
              </div>
            )}
          <div className="my-1 space-x-2 flex-wrap align-middle  sm:hidden flex justify-end">
            {getAPIDataDocs.workflow_state === "Service Completed" && (
              <Dialog>
                <DialogTrigger asChild>
                  <div className="items-end space-x-2">
                    <Button
                      variant="outline"
                      className="bg-[#7ACFFF] text-[#FFFFFF] border-[#CCCCCC] border-x  border-y border-opacity-20 font-semibold hover:bg-[#7295f7] hover:text-[#FFFFFF]"
                    // onClick={() => PatientFollowUpDataFilled()}
                    >
                      <img
                        src={CMRFollowUpAppointment.path}
                        alt={CMRFollowUpAppointment.alt}
                        width={17}
                        height={17}
                        className="lg:mr-2"
                      />
                      <p className="hidden lg:block xl:text-sm text-xs">
                        Follow-up appointment
                      </p>
                    </Button>
                  </div>
                </DialogTrigger>
                <DialogContent className="">
                  <DialogHeader>
                    <DialogTitle>Follow-Up Appointment</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-2">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <div>
                        <Label htmlFor="name" className="text-left ">
                          Appointment Type{" "}
                          <span className="text-[#ED9192]">*</span>
                        </Label>
                      </div>
                      <div className="col-span-3">
                        <ComboboxDropDown
                          label="appointment_type"
                          handleInputChange={
                            handleInputChangeForFollowUpAppointmentComboBox
                          }
                          doctype="Appointment Type"
                          dataValue={
                            getAPIDataDocs.custom_select_appointment_type
                          }
                          placeholder="select Appointment Type"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <div>
                        <Label htmlFor="name" className="text-left ">
                          Location <span className="text-[#ED9192]">*</span>
                        </Label>
                      </div>
                      <div className="col-span-3">
                        <ComboboxDropDown
                          label="service_unit"
                          handleInputChange={
                            handleInputChangeForFollowUpAppointmentComboBox
                          }
                          doctype="Healthcare Service Unit"
                          dataValue={getAPIDataDocs.custom_location_of_service}
                          placeholder="select Location"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <div>
                        <Label htmlFor="name" className="text-left ">
                          Date <span className="text-[#ED9192]">*</span>
                        </Label>
                      </div>
                      <div className="col-span-3">
                        <Input
                          type="date"
                          defaultValue={getCurrentDate()}
                          {...register("follow_up_appointment.date")}
                        />
                      </div>
                    </div>
                  </div>

                  <DialogFooter>
                    <DialogClose asChild>
                      <Button
                        type="submit"
                        onClick={() => followUpAppointmentCreate()}
                        className="bg-[#7ACFFF]"
                      >
                        Save
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
            {getAPIDataDocs.workflow_state === "Service Completed" && (
              <div className="items-end space-x-2">
                <Button
                  className="bg-[#7ACFFF] text-[#FFFFFF] border-[#CCCCCC] border-x  border-y border-opacity-20 font-semibold  xl:text-sm text-xs "
                  onClick={() => patientTakeAway()}
                >
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

          <div className="w-full h-full flex flex-col overflow-hidden">
            <div className="overflow-auto flex-grow">
              {selectedStepper === "patientInfo" && (
                <>
                  <div className="mt-5  bg-[#F6F9FD] px-4 py-4 mx-1 border border-[#E0E0E0]">
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
                            <ComboboxDropDownWithUseFormHook
                              doctype="Patient"
                              placeholder="select patient"
                              displayValue="label"
                              handleInputChange={handleInputChangeComboBox}
                              label="patient_name"
                              dataValue={
                                getAPIDataLinkTitles[
                                `Patient::${getAPIDataDocs.patient_name}`
                                ]
                              }
                              // addEntity={{
                              //   name: "Add Patient",
                              //   href: ROUTES.ADD_PATIENT,
                              // }}
                              description={"description"}
                              required
                              register={register}
                              setValueForm={setValue}
                              errors={errors}
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
                          dataValue={getAPIDataDocs.custom_location_of_service}
                          required
                          register={register}
                          errors={errors}
                          setValueForm={setValue}
                        />{" "}
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
                          defaultValue={getAPIDataDocs.dob}
                        />
                      </div>

                      <div className="grid w-full  items-center gap-1.5">
                        <Controller
                          name="phone"
                          control={control}
                          defaultValue={getAPIDataDocs.phone}
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
                                inputClassName={`${error && "border-[#FF441B]"
                                  } w-full h-full`}
                              />
                            </>
                          )}
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
                          control={control}
                          rules={{ required: true }}
                          defaultValue={getAPIDataDocs.pcp_phone_number}
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
                                inputClassName={`${error && "border-[#FF441B]"
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
                      {getAPIDataDocs.address_html && (
                        <div className="grid w-full  items-center gap-1.5">
                          <Label className="text-[#616161] xl:text-sm text-xs">
                            Address
                          </Label>
                          <div
                            className="font-medium leading-6 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[#474747] bg-white xl:text-sm text-xs"
                            dangerouslySetInnerHTML={{
                              __html: getAPIDataDocs.address_html,
                            }}
                          ></div>
                        </div>
                      )}

                      <div className="grid w-full items-center gap-1.5 ">
                        <Label className="text-[#616161] xl:text-sm text-xs">
                          Select Appointment Type{" "}
                          <span className="text-[#ED9192] xl:text-sm text-xs">
                            *
                          </span>
                        </Label>
                        <ComboboxDropDown
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
                          dataValue={
                            getAPIDataDocs.custom_select_appointment_type
                          }
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
                          defaultValue={getAPIDataDocs.reason_for_service}
                        />
                      </div>
                      <div className="grid w-full max-w-sm items-center gap-1.5 xl2:col-span-2 sm:col-span-0 ">
                        <Label className="text-[#616161] xl:text-sm text-xs">
                          CMR Recipient{" "}
                          <span className="text-[#ED9192] xl:text-sm text-xs">
                            *
                          </span>
                          <ReqiredFieldErrorImage
                            error={errors.cmr_recipient}
                          />
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
                            defaultValue={getAPIDataDocs.caregiver_name}
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
                            defaultValue={getAPIDataDocs.caregiver_relationship}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}
              {selectedStepper === "eligibilityCriteria" && (
                <EligibilityCrieria
                  eligibilityProps={{
                    getEligibilityCriteriaData,
                    setEligibilityCriteriaData,
                    selectOptionOnData,
                  }}
                  params={params}
                  getAPIDataDocs={getAPIDataDocs}
                  setValue={setValue}
                />
              )}
              {selectedStepper === "patientHistory" && (
                <PatientHistory
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
                  }}
                />
              )}
              {selectedStepper === "scheduling" && (
                <Scheduling
                  schedulingProps={{
                    selectDeliveryMethod,
                    setSelectDeliveryMethod,
                    selectAgreeToComply,
                    setAgreeToComply,
                    setDoYouHaveVerbelConsent,
                    selectDoYouHaveVerbelConsent,
                  }}
                  params={params}
                  getAPIDataDocs={getAPIDataDocs}
                />
              )}

              {selectedStepper === "medicalActionPlan" && (
                <MedicalActionPlan
                  medicationActionPlanProps={{
                    getMedicationActionPlanData,
                    setMecationActionPlanData,
                  }}
                  register={register}
                  errors={errors}
                  getAPIDataDocs={getAPIDataDocs}
                  watch={watch}
                />
              )}
              {selectedStepper === "patientSummary" && (
                <PatientSummary
                  patientSummaryProps={{
                    getBillingCodeData,
                    setBillingCodeData,
                    selectCMRWasCompleted,
                    setSelectCMRWasCompleted,
                    selectLanguageTemplateForPatient,
                    setSelectLanguageTemplateForPatient,
                    selectCMRPaymentType,
                    setSelectCMRPaymentType,
                    getPatientSUmmaryAgreement,
                    setPatientSummaryAgreement,
                    paymentTypeOptions,
                    selectPrimaryPolicyHolder,
                    setPrimaryPolicyHolder,
                    selectTimeofPayment,
                    setTimeofPayment,
                  }}
                  register={register}
                  getAPIDataDocs={getAPIDataDocs}
                  errors={errors}
                  setValue={setValue}
                  getValues={getValues}
                  handleInputChangeComboBox={handleInputChangeComboBox}
                  comboBoxKeyValues={comboBoxKeyValues}
                />
              )}
              {/* {selectedStepper === "activity" && (
                <Activity selectActivity={selectActivity} />
              )} */}
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
                className={`rounded-full border-[#6a6a6a]  border-[3px] ${steps.findIndex((step) => selectedStepper === step.key) ===
                  0 && "invisible"
                  }     xl:border-[3px] border-[2px]  xl:text-sm text-xs`}
              >
                <ChevronLeft
                  color="#6a6a6a"
                  className="xl:w-[2rem] xl:h-[2rem] w-[1rem] h-[1rem]"
                />
              </Button>
              <div className="flex space-x-4">
                {nextButtonString.filter(
                  (item) => item.key === getAPIDataDocs.workflow_state
                )[0] && (
                    <div className="items-end space-x-2">
                      <Button
                        className="bg-[#47BDFF] text-white border-[#474747] border-x  border-y border-opacity-20 font-semibold  xl:text-sm text-xs"
                        onClick={() => {
                          ApplyWorkFlow();
                        }}
                      >
                        {
                          nextButtonString.filter(
                            (item) => item.key === getAPIDataDocs.workflow_state
                          )[0].value
                        }
                      </Button>
                    </div>
                  )}
                {getAPIDataDocs.workflow_state !== "Service Completed" && (
                  <Button
                    onClick={() => finalSave()}
                    className="bg-[#47BDFF] text-white border-[#474747] border-x  border-y border-opacity-20 font-semibold  xl:text-sm text-xs"
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
    </ReloadDataContext.Provider>
  ) : (
    <>
      <LoadingScreen />
    </>
  );
};
export default ViewCMR;

const getStatusTagColor = (status: string) => {
  switch (status) {
    case "Not Started":
      return "bg-[#FFFEDF] text-[#B5A300]";
    case "Qualified":
      return "bg-[#EAFFE0] text-[#66BB6A]";
    case "In Progress":
      return "bg-[#EAFFE0] text-[#66BB6A]";
    case "Scheduled":
      return "bg-[#E5EFFF] text-[#407DE3]";
    case "Ready For Service":
      return "text-center bg-[#E5EFFF] text-[#407DE3]";
    case "Service Completed":
      return "bg-[#EAFFE0] text-[#66BB6A]";
    case "Ineligible":
      return "bg-[#ffe0c9] text-[#e86c13]";
    default:
      return "bg-[#FFFEDF] text-[#B5A300]";
  }
};

const getStepsForWorkflowState = (
  workflowState: string
): { key: string; label: string }[] => {
  switch (workflowState) {
    case "Ineligible":
      return [
        { key: "patientInfo", label: "Patient Info" },
        { key: "eligibilityCriteria", label: "Eligibility Criteria" },
      ];
    case "Not Started":
      return [
        { key: "patientInfo", label: "Patient Info" },
        { key: "eligibilityCriteria", label: "Eligibility Criteria" },
      ];
    case "Qualified":
      return [
        { key: "patientInfo", label: "Patient Info" },
        { key: "eligibilityCriteria", label: "Eligibility Criteria" },
        { key: "patientHistory", label: "Patient History" },
      ];
    case "In Progress":
      return [
        { key: "patientInfo", label: "Patient Info" },
        { key: "eligibilityCriteria", label: "Eligibility Criteria" },
        { key: "patientHistory", label: "Patient History" },
        { key: "scheduling", label: "Scheduling" },
      ];
    case "Scheduled":
      return [
        { key: "patientInfo", label: "Patient Info" },
        { key: "eligibilityCriteria", label: "Eligibility Criteria" },
        { key: "patientHistory", label: "Patient History" },
        { key: "scheduling", label: "Scheduling" },
        { key: "medicalActionPlan", label: "Medical Action Plan" },
      ];
    case "Ready for Service":
      return [
        { key: "patientInfo", label: "Patient Info" },
        { key: "eligibilityCriteria", label: "Eligibility Criteria" },
        { key: "patientHistory", label: "Patient History" },
        { key: "scheduling", label: "Scheduling" },
        { key: "medicalActionPlan", label: "Medical Action Plan" },
        { key: "patientSummary", label: "Patient Summary" },
      ];
    case "Service Completed":
      return [
        { key: "patientInfo", label: "Patient Info" },
        { key: "eligibilityCriteria", label: "Eligibility Criteria" },
        { key: "patientHistory", label: "Patient History" },
        { key: "scheduling", label: "Scheduling" },
        { key: "medicalActionPlan", label: "Medical Action Plan" },
        { key: "patientSummary", label: "Patient Summary" },
        // { key: "activity", label: "Activity" },
      ];
    default:
      return [];
  }
};

const nextActionWorkFlowState = (currentWorkFlow: string) => {
  switch (currentWorkFlow) {
    case "Ineligible":
      return "Ineligible";
    case "Not Started":
      return "Qualified";
    case "Qualified":
      return "In Progress";
    case "In Progress":
      return "Schedule";
    case "Scheduled":
      return "Ready for service";
    case "Ready for Service":
      return "Complete";
    case "Service Completed":
      return "Complete";
    default:
      "Ineligible";
  }
};
