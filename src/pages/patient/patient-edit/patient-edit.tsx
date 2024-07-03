import { useDropzone } from "react-dropzone";
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";

import ActivityComponenet from "@/components/shared/ActivityComponenet";
import CommentBox from "@/components/shared/CommentBox";
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
import { InputSMResponsive } from "@/components/ui/input";
import { Label, LabelSMResponsive } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  ActivityButtonIcon,
  AttachementBrowseFile,
  DeleteFileIcon,
  DocFileicon,
  FemaleImage,
  MaleImage,
  patientCommentsPersonPhotos,
  patientSubMenuAppointments,
  patientSubMenuClinicalInformation,
  patientSubMenuCommunications,
  patientSubMenuInsuranceDetails,
  patientSubMenuMedicalHistory,
  patientSubMenuOverview
} from "@/constants/images";
import { CommentData, PatientAppointment } from "@/types";
import Cookies from "js-cookie";
import {
  ChevronLeft,
  ChevronRight,
  Paperclip,
  Tags
} from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { DataTable } from "./data-table";

import PatientRelationCard from "@/components/shared/Cards/PatientRelationCard";
import { DynamicRadioButtonWithUseFormHook } from "@/components/shared/DynamicRadioButton";
import MedicalHistory from "@/components/shared/PatientHistory";
import { DrawerDemo } from "@/components/shared/activityDrawer";
import ComboboxDropDown from "@/components/shared/comboBoxDropDown";
import ReqiredFieldErrorImage from "@/components/shared/reqiredFieldError";
import { TagInput } from "@/components/ui/tagInput";
import API, { BASE_URL } from "@/constants/api.constant";
import {
  EthnicityDropDownOption,
  RaceDropDownOption,
  paymentTypeMapping,
} from "@/constants/fields";
import { axiosGETAPI, axiosPOSTAPI } from "@/helpers/commonAPI";
import { PatientStatusCode, PatientStatusCodeImage } from "@/utilities/utils";
import { PhoneInput } from "react-international-phone";

import { Link } from "react-router-dom";
import LoadingScreen from "@/components/shared/loading-screen";
//Medical History component

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
                  className={`flex items-center space-x-2  ${
                    selectPaymentType === "Medicare or Medi-Cal"
                      ? "bg-[#7ACFFF]"
                      : "border-2 border-[#DDDDDD] bg-white"
                  }  rounded-3xl p-2`}
                >
                  <RadioGroupItem
                    value="Medicare or Medi-Cal"
                    id="Medicare or Medi-Cal"
                    className={`${
                      selectPaymentType === "Medicare or Medi-Cal" &&
                      "text-[#FFFFFF] border-[#FFFFFF]"
                    } `}
                    onClick={handleSelectPaymentTypeChanges}
                    checked={selectPaymentType === "Medicare or Medi-Cal"}
                  />
                  <LabelSMResponsive
                    htmlFor="Medicare or Medi-Cal"
                    className={`${
                      selectPaymentType === "Medicare or Medi-Cal"
                        ? "text-[#FFFFFF]"
                        : "text-[#616161]"
                    } font-semibold`}
                  >
                    Medical or Medi-cal
                  </LabelSMResponsive>
                </div>
                <div
                  className={`flex items-center space-x-2  ${
                    selectPaymentType === "Private Insurance"
                      ? "bg-[#7ACFFF]"
                      : "border-2 border-[#DDDDDD] bg-white"
                  }  rounded-3xl p-2`}
                >
                  <RadioGroupItem
                    value="Private Insurance"
                    id="Private Insurance"
                    className={`${
                      selectPaymentType === "Private Insurance" &&
                      "text-[#FFFFFF] border-[#FFFFFF]"
                    } `}
                    onClick={handleSelectPaymentTypeChanges}
                    checked={selectPaymentType === "Private Insurance"}
                  />
                  <LabelSMResponsive
                    htmlFor="Private Insurance"
                    className={`${
                      selectPaymentType === "Private Insurance"
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
                  className={`flex items-center space-x-2  ${
                    isPrimaryPolicyHolder === "Yes"
                      ? "bg-[#7ACFFF]"
                      : "border-2 border-[#DDDDDD] bg-white"
                  }  rounded-3xl p-2`}
                >
                  <RadioGroupItem
                    value="Yes"
                    id="yesPrimaryPolicyHolder"
                    className={`${
                      isPrimaryPolicyHolder === "Yes" &&
                      "text-[#FFFFFF] border-[#FFFFFF]"
                    } `}
                    onClick={handleisPrimaryPolicyHolderChanges}
                    checked={isPrimaryPolicyHolder === "Yes"}
                  />
                  <LabelSMResponsive
                    htmlFor="yesPrimaryPolicyHolder"
                    className={`${
                      isPrimaryPolicyHolder === "Yes"
                        ? "text-[#FFFFFF]"
                        : "text-[#616161]"
                    } font-semibold`}
                  >
                    Yes
                  </LabelSMResponsive>
                </div>
                <div
                  className={`flex items-center space-x-2  ${
                    isPrimaryPolicyHolder === "No"
                      ? "bg-[#7ACFFF]"
                      : "border-2 border-[#DDDDDD] bg-white"
                  }  rounded-3xl p-2`}
                >
                  <RadioGroupItem
                    value="No"
                    id="noPrimaryPolicyHolder"
                    className={`${
                      isPrimaryPolicyHolder === "No" &&
                      "text-[#FFFFFF] border-[#FFFFFF]"
                    } `}
                    onClick={handleisPrimaryPolicyHolderChanges}
                    checked={isPrimaryPolicyHolder === "No"}
                  />
                  <LabelSMResponsive
                    htmlFor="noPrimaryPolicyHolder"
                    className={`${
                      isPrimaryPolicyHolder === "No"
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
const Activity = ({ selectActivity }: { selectActivity: CommentData[] }) => {
  return (
    <div className="lg:m-10 mt-5">
      <ActivityComponenet data={selectActivity} />
    </div>
  );
};

//Comments component
const Comments = ({
  getComments,
  params,
  setReload,
}: {
  getComments: CommentData[];
  params: any;
  setReload: any;
}) => {
  const [_data, _setData] = useState<CommentData[]>();

  const createComment = async (commentmsg: string) => {
    async function SendComment() {
      const URL = BASE_URL + API.POST_COMMENT;

      const reqBody = {
        reference_doctype: "Patient",
        reference_name: params.id,
        content: commentmsg,
        comment_email: Cookies.get("email"),
        comment_by: Cookies.get("full_name"),
      };

      const httpOptions = {
        Authorization: Cookies.get("Authorization"),
        "Content-Type": "multipart/form-data",
      };

      try {
        await axiosPOSTAPI(URL, reqBody, {
          headers: httpOptions,
        });
        // If you need to do something with the response, you can add code here
      } catch (error) {
        console.error("Error posting comment:", error);
      }
    }

    await SendComment(); // Wait for SendComment to complete before reloading the page

    setReload((prev: boolean) => !prev);
  };
  return (
    <div className="mt-5 bg-[#F6F9FD] xl:pl-4 sm:pl-2  py-4">
      <h5 className="ml-2 mb-1 heading-text-xl font-semibold text-[#474747] ">
        Prescription Benefits Information
      </h5>
      <Separator orientation="horizontal" className="mb-5" />
      <div className="mx-4">
        <div className="flex flex-row gap-5 justify-between">
          <img
            src={patientCommentsPersonPhotos.path}
            alt={patientCommentsPersonPhotos.alt}
            width={37}
            height={100}
            className="sm:mr-2"
          />
          <InputSMResponsive
            type="text"
            placeholder="Type a reply / comment"
            onKeyDown={(e: any) => {
              if (e.key === "Enter") {
                e.target.value && createComment(e.target.value);
                e.target.value = "";
              }
            }}
            className="w-full h-[2.5rem] border-[#DDDDDD] border p-2"
          />
        </div>
        <div className="my-5 ml-2">
          <CommentBox data={getComments} setReload={setReload} />
        </div>
      </div>
    </div>
  );
};

//Clinical Information Component
const ClinicalInformation = () => {
  return <div>Clinical Information</div>;
};

//Appointment Component
const Appointment = ({ params }: any) => {
  const [data, setData] = useState<PatientAppointment[]>([]);

  const [getFilterationAPIString, _setFilterationAPIString] =
    useState<string>("");
  const [getPagesize, setPageSize] = useState<number>(10);
  const [getAllDataCount, setAllDataCount] = useState<number>(0);
  const [getLimitStart, setLimitStart] = useState<number>(0);
  /*
  Fetches patient data from a remote API endpoint,
  then processes the received JSON data to extract relevant
  fields and updates the state with the filtered data.
  */
  // useEffect(() => {
  //   async function fetchPatientListData() {
  //     const res = await fetch(
  //       'https://qa-tenant.rxbb.io/api/resource/Patient?fields=["*"]',
  //       { headers: { Authorization: "token 8439f44d8979c57:0211dc092e01771" } }
  //     );

  //     const dataJson = await res.json();

  //     const finalData = dataJson.data.map((item: any) => ({
  //       mobile: item.mobile,
  //       sex: item.sex,
  //       dob: item.dob,
  //       customPatientStatus: item.custom_patient_status,
  //       patientName: item.patient_name,
  //       email: item.email,
  //     }));

  //     setData(finalData);
  //   }
  //   fetchPatientListData();
  // }, []);

  // Fetch patient data from a local JSON object

  useEffect(() => {
    const fetchData = async () => {
      try {
        //for filtering data with a DOB field
        // const url = BASE_URL + API.LIST_PATIENT +  (getFilterationAPIString ? `&or_filters=[["patient_name","like","%${getFilterationAPIString}%"],["email","like","%${getFilterationAPIString}%"],["status","like","%${getFilterationAPIString}%"],["mobile","like","%${getFilterationAPIString}%"],["sex","like","%${getFilterationAPIString}%"]` + (isValidDateFormat(getFilterationAPIString) ? `["dob","=","${getFilterationAPIString}"]]` :"]") : '')

        const url =
          BASE_URL +
          API.LIST_APPOINTMENT +
          `&limit_page_length=${getPagesize}` +
          `&limit_start=${getLimitStart}&order_by=creation desc` +
          `&filters=[["patient","=","${params.id}"]]`;
        const response = await axiosGETAPI(url, {
          headers: {
            Authorization: Cookies.get("Authorization"),
            "Content-Type": "multipart/form-data",
          },
        });
        setData(response.data.data);

        const urlGetAllSize = BASE_URL + API.GET_RECORD_COUNT;

        const res = await axiosPOSTAPI(
          urlGetAllSize,
          {
            doctype: "Patient Appointment",
            filters: `[["patient","=","${params.id}"]]`,
            fields: [],
            distinct: false,
          },
          {
            headers: { Authorization: Cookies.get("Authorization") },
          }
        );
        if (res.status === 200) {
          setAllDataCount(res.data.message);
        } else {
          console.log(
            "not a valid data while getting from GetAllDataCount API"
          );
        }
      } catch (error) {
        console.error("Error fetching patient data:", error);
        // Handle error: Display error message or fallback data
      }
    };

    fetchData();
  }, [getFilterationAPIString, getPagesize, getLimitStart, params]);

  return (
    <div>
      <DataTable
        data={data}
        // setFilter={setFilterationAPIString}
        setPageSize={setPageSize}
        getPageSize={getPagesize}
        getAllDataCount={getAllDataCount}
        setLimitStart={setLimitStart}
        getLimitStart={getLimitStart}
      />
    </div>
  );
};

//Communications component
const Communications = () => {
  return <div>Communications</div>;
};

// View Patient Component
const ViewPatient = () => {
  const params = useParams();
  const router = useNavigate()
  
  //   const [date, setDate] = useState<Date>();
  const [reload, setReload] = useState<boolean>(false);
  const [selectedStepper, setSelectedStepper] = useState("overview");
  const [selectGender, setSelectGender] = useState("Male");
  const [selectEmailPreference, setEmailPreference] = useState("");
  const [selectStatus, setStatus] = useState("Active");
  const [selectComment, setComment] = useState<CommentData[]>([]);
  const [selectActivity, setActivity] = useState<CommentData[]>([]);
  const [isDataLoaded, setDataLoaded] = useState<boolean>(false);
  const [selectPatientRelation, setSelectionPatientRelationData] = useState<
    any[]
  >([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles: any) => {
      setUploadedFiles(acceptedFiles);
      // Call your backend API endpoint to upload files
    },
  });
  const [tags, setTags] = useState<string[]>([]);
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

  const handlerStatus = (e: any) => {
    setStatus(e.target.value);
  };
  const {
    register,
    getValues,
    setValue,
    trigger,
    formState: { errors },
    control,
  } = useForm();
  const handlerEmailPreference = (e: any) => {
    setEmailPreference(e.target.value);
  };
  const changeStateGender = (e: any) => {
    setSelectGender(e.target.value);
  };
  const [selectInviteUser, setInviteUser] = useState<number>(0);

  const [getAPIDataDocs, setAPIDataDocs] = useState<any>();
  const [getAPIDataDocsInfo, setAPIDataDocsInfo] = useState<any>();
  const [linkTitle, setLinkTitle] = useState<any>();
  const [tableViewFieldState, setTableViewFieldState] = useState<any>();
  const handleInputChangeComboBox = (value: string, label: string) => {
    setComboBoxKeyValues((prev: any) => {
      return { ...prev, [label]: value };
    });
  };
  const [comboBoxKeyValues, setComboBoxKeyValues] = useState<any>({});
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
    {
      key: "appointments",
      label: "Appointments",
      icon: patientSubMenuAppointments.path,
    },
    {
      key: "communications",
      label: "Communications",
      icon: patientSubMenuCommunications.path,
    }
  ];

  const finalSubmit = async (isRedirect: boolean) => {
    const updateAddress = async () => {
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
              link_name: params.id,
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
            toast.error(
              "please filled all fields of Address Address Line 1, City"
            );
          } else {
            return 200;
          }
        } catch (error: any) {
          if (error.response.data.exc_type === "TimestampMismatchError") {
            toast("please refresh the page for make changes");
          } else {
            toast.error(
              "please filled all fields of Address Address Line 1, City"
            );
          }
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
              link_name: params.id,
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
          if (response.status !== 200) {
            toast.error(
              "please filled all fields of Address Address Line 1, City"
            );
          } else {
            return 200;
          }
        } catch (error: any) {
          if (error.response.data.exc_type === "TimestampMismatchError") {
            toast("please refresh the page for make changes");
          } else {
            toast.error(
              "please filled all fields of Address Address Line 1, City"
            );
          }
        }
      }
    };

    const UpdateContactDetails = async () => {
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
              toast.error(
                "please filled all fields of contact Primary Phone,Secondary Phone and Email"
              );
            } else {
              return 200;
            }
          } catch (error: any) {
            if (error.response.data.exc_type === "TimestampMismatchError") {
              toast("please refresh the page for make changes");
            } else {
              toast.error(
                "please filled all fields of contact Primary Phone, Secondary Phone and Email"
              );
            }
            // toast("please filled all fields of contact Primary Phone, Secondary Phone and Email "+error);
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
              link_name: params.id,
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
            toast.error(
              "please filled all fields of contact Primary Phone, Secondary Phone and Email"
            );
          } else {
            return 200;
          }
        } catch (error: any) {
          if (error.response.data.exc_type === "TimestampMismatchError") {
            toast("please refresh the page for make changes");
          } else {
            toast.error(
              "please filled all fields of contact Primary Phone, Secondary Phone and Email"
            );
          }
        }
      }
    };

    const UpdatePatient = async () => {
      const URL = BASE_URL + API.SAVE_DOCS;
      const NewData = {
        name: getAPIDataDocs.name,
        owner: getAPIDataDocs.owner,
        creation: getAPIDataDocs.creation,
        modified: getAPIDataDocs.modified,
        modified_by: getAPIDataDocs.modified_by,
        docstatus: getAPIDataDocs.docstatus,
        idx: getAPIDataDocs.idx,
        naming_series: getAPIDataDocs.naming_series,
        first_name:
          getValues("first_name") !== undefined
            ? getValues("first_name")
            : getAPIDataDocs.first_name,
        middle_name:
          getValues("middle_name") !== undefined
            ? getValues("middle_name")
            : getAPIDataDocs.middle_name,
        last_name:
          getValues("last_name") !== undefined
            ? getValues("last_name")
            : getAPIDataDocs.last_name,
        sex: selectGender !== undefined ? selectGender : getAPIDataDocs.sex,
        custom_pcp_name:
          getValues("custom_pcp_name") !== undefined
            ? getValues("custom_pcp_name")
            : getAPIDataDocs.custom_pcp_name,
        custom_patient_series: getAPIDataDocs.custom_patient_series,
        dob:
          getValues("dob") !== undefined
            ? getValues("dob")
            : getAPIDataDocs.dob,
        custom_pcp_phone:
          getValues("custom_pcp_phone") !== undefined
            ? getValues("custom_pcp_phone")
            : getAPIDataDocs.custom_pcp_phone,
        patient_name: getAPIDataDocs.patient_name,
        custom_patient_status:
          selectStatus || getAPIDataDocs.custom_patient_status,
        status: getAPIDataDocs.status,
        invite_user: selectInviteUser,
        inpatient_status: getAPIDataDocs.inpatient_status,
        report_preference: selectEmailPreference,
        blood_group: getAPIDataDocs.blood_group,
        mobile:
          getValues("mobile") !== undefined
            ? getValues("mobile")
            : getAPIDataDocs.mobile,
        phone:
          getValues("phone") !== undefined
            ? getValues("phone")
            : getAPIDataDocs.phone,
        email:
          getValues("email") !== undefined
            ? getValues("email")
            : getAPIDataDocs.email,
        custom_unsubscribe_to_marketing:
          getAPIDataDocs.custom_unsubscribe_to_marketing,
        customer: getAPIDataDocs.customer,
        customer_group: getAPIDataDocs.customer_group,
        territory: getAPIDataDocs.territory,
        default_currency: getAPIDataDocs.default_currency,
        default_price_list: getAPIDataDocs.default_price_list,
        language: getAPIDataDocs.language,
        custom_is_the_patient_cognitively_impared:
          getAPIDataDocs.custom_is_the_patient_cognitively_impared,
        custom_brief_interview_for_material_statusbims_score13:
          getAPIDataDocs.custom_brief_interview_for_material_statusbims_score13,
        custom_cognitive_impairment_noted_in_patients_chart:
          getAPIDataDocs.custom_cognitive_impairment_noted_in_patients_chart,
        custom_confirmed_status_with_family_membercaregiver:
          getAPIDataDocs.custom_confirmed_status_with_family_membercaregiver,
        custom_confirmed_status_with_healthcare_staff:
          getAPIDataDocs.custom_confirmed_status_with_healthcare_staff,
        custom_minimental_state_examinationmmse_score__27:
          getAPIDataDocs.custom_minimental_state_examinationmmse_score__27,
        marital_status:
          selectMaritalStatus !== undefined
            ? selectMaritalStatus
            : getAPIDataDocs.marital_status,
        custom_do_you_currently_use_or_have_you_ever_tobacco_profucts:
          usedTobacoProduct !== undefined
            ? usedTobacoProduct
            : getAPIDataDocs.custom_do_you_currently_use_or_have_you_ever_tobacco_profucts,
        custom_current_cigarette_smoker:
          selectCurrentCigaretteSmoker !== undefined
            ? selectCurrentCigaretteSmoker
            : getAPIDataDocs.custom_current_cigarette_smoker,
        custom_are_you_interested_in_quiting_1:
          getAPIDataDocs.custom_are_you_interested_in_quiting_1,
        custom_former_cigarette_smoker:
          selectFormerCigaretteSmoker !== undefined
            ? selectFormerCigaretteSmoker
            : getAPIDataDocs.custom_former_cigarette_smoker,
        custom_on_average_how_many_cigarettes_did_you_smoke_per_day:
          getValues(
            "custom_on_average_how_many_cigarettes_did_you_smoke_per_day"
          ) !== undefined
            ? getValues(
                "custom_on_average_how_many_cigarettes_did_you_smoke_per_day"
              )
            : getAPIDataDocs.custom_on_average_how_many_cigarettes_did_you_smoke_per_day,
        custom_how_many_years_did_you_smoke_for:
          getAPIDataDocs.custom_how_many_years_did_you_smoke_for,
        custom_other_tobacco_user:
          selectOtherTobbacoUser !== undefined
            ? selectOtherTobbacoUser
            : getAPIDataDocs.custom_other_tobacco_user,
        custom_are_you_interested_in_quiting_2:
          wantToQuit !== undefined
            ? wantToQuit
            : getAPIDataDocs.custom_are_you_interested_in_quiting_2,
        custom_past_year_have_you_had_4_or_more_alcoholic_drinks_iady:
          getValues(
            "custom_past_year_have_you_had_4_or_more_alcoholic_drinks_iady"
          ) !== undefined
            ? getValues(
                "custom_past_year_have_you_had_4_or_more_alcoholic_drinks_iady"
              )
            : getAPIDataDocs.custom_past_year_have_you_had_4_or_more_alcoholic_drinks_iady,
        custom_use_opioids_and_have_access_to_nacran:
          accessToNarcan !== undefined
            ? accessToNarcan
            : getAPIDataDocs.custom_use_opioids_and_have_access_to_nacran,
        custom_are_you_interesting_in_quiting:
          getAPIDataDocs.custom_are_you_interesting_in_quiting,
        custom_purpose_of_body_shapping:
          haveYouEverInjected !== undefined
            ? haveYouEverInjected
            : getAPIDataDocs.custom_purpose_of_body_shapping,
        custom_have_you_hospitalized_overnight:
          haveYouEverHospitalized !== undefined
            ? haveYouEverHospitalized
            : getAPIDataDocs.custom_have_you_hospitalized_overnight,
        custom_payment_type:
          selectPaymentType !== undefined
            ? selectPaymentType
            : getAPIDataDocs.custom_payment_type,
        custom_is_the_patient_the_primary_policy_holder:
          isPrimaryPolicyHolder !== undefined
            ? isPrimaryPolicyHolder
            : getAPIDataDocs.custom_is_the_patient_the_primary_policy_holder,
        doctype: getAPIDataDocs.doctype,
        custom_employment_housing_transportation:
          selectEmployeeHousing !== undefined
            ? selectEmployeeHousing
            : getAPIDataDocs.custom_employment_housing_transportation,
        custom_recreational_drug_usage:
          getAPIDataDocs.custom_recreational_drug_usage,
        custom_drug_allergies__side_effects:
          selectDrugAllergiesCardData !== undefined
            ? selectDrugAllergiesCardData
            : getAPIDataDocs.custom_drug_allergies__side_effects,
        patient_relation:
          selectPatientRelation !== undefined
            ? selectPatientRelation
            : getAPIDataDocs.patient_relation,
        custom_medications:
          selectMedicalCardData !== undefined
            ? selectMedicalCardData
            : getAPIDataDocs.custom_medications,
        custom_relative_medical_conditions:
          selectFamilyHealthHistory !== undefined
            ? selectFamilyHealthHistory
            : getAPIDataDocs.custom_relative_medical_conditions,
        custom_health_conditions:
          selectDiagnosisCardData !== undefined
            ? selectDiagnosisCardData
            : getAPIDataDocs.custom_health_conditions,
        custom_surgical_histories:
          selectSurgicalHistory !== undefined
            ? selectSurgicalHistory
            : getAPIDataDocs.custom_surgical_histories,
        custom_patient_notes:
          getValues("custom_patient_notes") !== undefined
            ? getValues("custom_patient_notes")
            : getAPIDataDocs.custom_patient_notes,
        __onload: getAPIDataDocs.__onload,
        occupation:
          getValues("occupation") !== undefined
            ? getValues("occupation")
            : getAPIDataDocs.occupation,
        custom_how_many_times_in_the_past_year:
          getValues("custom_how_many_times_in_the_past_year") !== undefined
            ? getValues("custom_how_many_times_in_the_past_year")
            : getAPIDataDocs.custom_how_many_times_in_the_past_year,
        custom_what_for_and_when:
          getValues("custom_what_for_and_when") !== undefined
            ? getValues("custom_what_for_and_when")
            : getAPIDataDocs.custom_what_for_and_when,
        tobacco_past_use:
          getValues("tobacco_past_use") !== undefined
            ? getValues("tobacco_past_use")
            : getAPIDataDocs.tobacco_past_use,
        tobacco_current_use:
          getValues("tobacco_current_use") !== undefined
            ? getValues("tobacco_current_use")
            : getAPIDataDocs.tobacco_current_use,
        alcohol_past_use:
          getValues("alcohol_past_use") !== undefined
            ? getValues("alcohol_past_use")
            : getAPIDataDocs.alcohol_past_use,
        alcohol_current_use:
          getValues("alcohol_current_use") !== undefined
            ? getValues("alcohol_current_use")
            : getAPIDataDocs.alcohol_current_use,
        surrounding_factors:
          getValues("surrounding_factors") !== undefined
            ? getValues("surrounding_factors")
            : getAPIDataDocs.surrounding_factors,
        other_risk_factors:
          getValues("other_risk_factors") !== undefined
            ? getValues("other_risk_factors")
            : getAPIDataDocs.other_risk_factors,
        custom_policy_number:
          getValues("custom_policy_number") !== undefined
            ? getValues("custom_policy_number")
            : getAPIDataDocs.custom_policy_number,
        custom_primary_carrier:
          getValues("custom_primary_carrier") !== undefined
            ? getValues("custom_primary_carrier")
            : getAPIDataDocs.custom_primary_carrier,
        custom_primary_holder_first_name:
          getValues("custom_primary_holder_first_name") !== undefined
            ? getValues("custom_primary_holder_first_name")
            : getAPIDataDocs.custom_primary_holder_first_name,
        custom_medical_record_number:
          getValues("custom_medical_record_number") !== undefined
            ? getValues("custom_medical_record_number")
            : getAPIDataDocs.custom_medical_record_number,
        custom_primary_holder_middle_name:
          getValues("custom_primary_holder_middle_name") !== undefined
            ? getValues("custom_primary_holder_middle_name")
            : getAPIDataDocs.custom_primary_holder_middle_name,
        custom_group_number:
          getValues("custom_group_number") !== undefined
            ? getValues("custom_group_number")
            : getAPIDataDocs.custom_group_number,
        custom_primary_holder_last_name:
          getValues("custom_primary_holder_last_name") !== undefined
            ? getValues("custom_primary_holder_last_name")
            : getAPIDataDocs.custom_primary_holder_last_name,
        custom_primary_holder_dob1:
          getValues("custom_primary_holder_dob1") !== undefined
            ? getValues("custom_primary_holder_dob1")
            : getAPIDataDocs.custom_primary_holder_dob1,
        custom_relationship_to_policy_holder:
          getValues("custom_relationship_to_policy_holder") !== undefined
            ? getValues("custom_relationship_to_policy_holder")
            : getAPIDataDocs.custom_relationship_to_policy_holder,
        custom_rxbin:
          getValues("custom_rxbin") !== undefined
            ? getValues("custom_rxbin")
            : getAPIDataDocs.custom_rxbin,
        custom_rxpcn:
          getValues("custom_rxpcn") !== undefined
            ? getValues("custom_rxpcn")
            : getAPIDataDocs.custom_rxpcn,
        custom_rxid:
          getValues("custom_rxid") !== undefined
            ? getValues("custom_rxid")
            : getAPIDataDocs.custom_rxid,
        custom_rxgroup:
          getValues("custom_rxgroup") !== undefined
            ? getValues("custom_rxgroup")
            : getAPIDataDocs.custom_rxgroup,
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
        } else {
          return 200;
        }
      } catch (error: any) {
        if (error.response.data.exc_type === "TimestampMismatchError") {
          toast("please refresh the page for make changes");
        } else {
          toast("please filled all fields of Patient");
        }
      }
    };
    const isValid = await trigger();
    if (isValid) {
      const updateAddressResponose = await updateAddress();
      const UpdateContactDetailsResponose = await UpdateContactDetails();
      const UpdatePatientResponose = await UpdatePatient();
      if (
        updateAddressResponose === 200 &&
        UpdateContactDetailsResponose === 200 &&
        UpdatePatientResponose === 200
      ) {
        toast.success("Patient Saved");
        if(isRedirect === true){
          router("/patients");
        }else{
          IncrementStepper()
        }
      }
      setReload((prev: boolean) => !prev);
    }

    // }
  };

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
          doctype: "Patient",
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
        setReload((prev: boolean) => !prev);
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
        { fid: name, is_private: 1, dt: "Patient", dn: params.id },
        {
          headers: {
            Authorization: Cookies.get("Authorization"),
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        setReload((prev: boolean) => !prev);
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
        { tag: tag, dt: "Patient", dn: params.id },
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
        { tag: tag, dt: "Patient", dn: params.id },
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
  useEffect(() => {
    const fetchData = async () => {
      try {
        const URL =
          BASE_URL + API.VIEW_DOCTYPE + "?doctype=Patient&name=" + params.id;
        const response = await axiosGETAPI(URL, {
          headers: { Authorization: Cookies.get("Authorization") },
        });
        if (response.status === 200) {
          const LOAD_GET_DOCTYPE =
            BASE_URL + API.LOAD_FORM_DOCTYPE + "?doctype=Patient";
          const responseLoadGETDocType = await axiosGETAPI(LOAD_GET_DOCTYPE);
          if (responseLoadGETDocType.status === 200) {
            setTableViewFieldState(
              JSON.parse(responseLoadGETDocType.data.user_settings)
            );
          }
        }

        setAPIDataDocs(response.data?.docs[0]);
        setAPIDataDocsInfo(response.data?.docinfo);
        setStatus(response.data?.docs[0]?.status);
        setEmailPreference(response.data?.docs[0]?.report_preference);
        setSelectGender(response.data?.docs[0]?.sex);
        setInviteUser(response.data?.docs[0]?.invite_user);
        setComment(response.data?.docinfo?.comments);
        setLinkTitle(response.data?._link_titles);
        if (response.data?.docinfo?.tags) {
          setTags(response.data?.docinfo?.tags.split(","));
        }

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
          ].sort((a, b) => {
            return (
              new Date(b.creation || "").getTime() -
              new Date(a.creation || "").getTime()
            );
          })
        );

        setMaritalStatus(response.data?.docs[0]?.marital_status);

        setUsedTobacoProduct(
          response.data?.docs[0]
            ?.custom_do_you_currently_use_or_have_you_ever_tobacco_profucts
        );
        setCurrentCigaretteSmoker(
          response.data?.docs[0]?.custom_current_cigarette_smoker === 1
            ? true
            : false
        );

        setFormerCigaretteSmoker(
          response.data?.docs[0]?.custom_former_cigarette_smoker === 1
            ? true
            : false
        );

        setOtherTobbacoUser(
          response.data?.docs[0]?.custom_other_tobacco_user === 1 ? true : false
        );

        setaccessToNarcan(
          response.data?.docs[0]?.custom_use_opioids_and_have_access_to_nacran
        );

        setWantToQuit(
          response.data?.docs[0]?.custom_are_you_interested_in_quiting_2
        );

        setHaveYouEverInjected(
          response.data?.docs[0]?.custom_purpose_of_body_shapping
        );

        setHaveYouEverHospitalized(
          response.data?.docs[0]?.custom_have_you_hospitalized_overnight
        );

        //medication data filled up
        setMedicationCardData(response.data?.docs[0]?.custom_medications);

        //diagnosis data filled up
        setDiagnosisCardData(response.data?.docs[0]?.custom_health_conditions);

        //DrugAllergies data filled up
        setDrugAllergiesCardData(
          response.data?.docs[0]?.custom_drug_allergies__side_effects
        );

        //Family Health Data Filled UP
        setFamilyHealthCardData(
          response.data?.docs[0]?.custom_relative_medical_conditions
        );

        //Sugical History Filled UP
        setSurgicalHisotryData(
          response.data?.docs[0]?.custom_surgical_histories
        );

        //Family Housing Filled up
        setemployeeHousingData(
          response.data?.docs[0]?.custom_employment_housing_transportation
        );

        setDataLoaded(true);

        //set Patient realtion data prefilled
        setSelectionPatientRelationData(
          response.data?.docs[0]?.patient_relation
        );
      } catch (e: any) {
        console.log(e);
      }
    };
    fetchData();
  }, [
    params,
    reload,
    setUsedTobacoProduct,
    setCurrentCigaretteSmoker,
    setFormerCigaretteSmoker,
    setOtherTobbacoUser,
    setaccessToNarcan,
    setWantToQuit,
    setHaveYouEverInjected,
    setHaveYouEverHospitalized,
    setMedicationCardData,
    setDiagnosisCardData,
    setDrugAllergiesCardData,
    setFamilyHealthCardData,
    setSurgicalHisotryData,
    setemployeeHousingData,
    setMaritalStatus,
  ]);
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
    isDataLoaded ? (
      <div className="px-3 pt-3 ">
        <div className="flex justify-between">
          <div className="flex flex-row gap-4 mb-2 ml-3">
            <div className="relative inline-block self-center">
              <img
                src={
                  getAPIDataDocs && getAPIDataDocs.image
                    ? BASE_URL + getAPIDataDocs.image
                    : getAPIDataDocs.sex === "Male"
                    ? MaleImage.path
                    : FemaleImage.path
                }
                alt={"not found"}
                className="flex-none block w-14 h-14 min-w-14 min-h-14 rounded-full"
              />
              <div
                className={` border-[#66BB6A] w-3 h-3 rounded-full ${PatientStatusCodeImage(
                  selectStatus
                )} absolute top-1 right-1`}
              ></div>
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl 2xl:text-4xl font-medium text-[#474747] ">
                {getAPIDataDocs.patient_name}
              </h3>
              <div className=" items-center">
                <div className="text-[#898989] flex flex-wrap lg:text-lg text-xs items-center">
                  {getAPIDataDocs.dob && (
                    <div className="inline-block">
                      <span>
                        <span className="text-[#474747]  font-medium">DOB</span>
                        :&nbsp;
                      </span>
                    </div>
                  )}
                  {[
                    getAPIDataDocs.dob,
                    getAPIDataDocs.email,
                    getAPIDataDocs.mobile,
                    getAPIDataDocs.custom_payment_type,
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
                  {getAPIDataDocs.custom_payment_type &&
                    getAPIDataDocs.custom_payment_type ===
                      paymentTypeMapping.custom_medicare_billing &&
                    getAPIDataDocs.custom_mbi_number && (
                      <>
                        <div className="border-2 rounded-full mx-2 w-1 h-1 inline-block border-[#898989]"></div>
                        <div className="inline-block">
                          <span>{getAPIDataDocs.custom_mbi_number}</span>
                        </div>
                      </>
                    )}
                  {getAPIDataDocs.custom_payment_type &&
                    getAPIDataDocs.custom_payment_type ===
                      paymentTypeMapping.custom_medical_billing &&
                    getAPIDataDocs.custom_bic_number && (
                      <>
                        <div className="border-2 rounded-full mx-2 w-1 h-1 inline-block border-[#898989]"></div>
                        <div className="inline-block">
                          <span>{getAPIDataDocs.custom_bic_number}</span>
                        </div>
                      </>
                    )}
                  {getAPIDataDocs.custom_payment_type &&
                    getAPIDataDocs.custom_payment_type ===
                      paymentTypeMapping.custom_private_insurance_billing &&
                    [
                      getAPIDataDocs.custom_primary_carrier,
                      getAPIDataDocs.custom_medical_record_number,
                      getAPIDataDocs.custom_group_number,
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

              contentChilder = {<Activity selectActivity={selectActivity}/>}
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
        <div className="space-x-2 text-nowrap align-middle  sm:hidden flex justify-end">
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
                              onClick={() => DeleteAttachment(attachment.name)}
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
        <Separator orientation="horizontal" className="my-2 lg:my-0" />

        <div className="flex h-[calc(100vh-180px)] overflow-auto">
          <Stepper
            steps={steps}
            selectedStepper={selectedStepper}
            setSelectedStepper={setSelectedStepper}
            hideSideIcons={false}
            progressCheckBox={false}
          />
          {/* <Separator
          orientation="vertical"
          className="h-[90vh] mr-4 hidden sm:block"
        /> */}
          <div className="w-full h-full flex flex-col overflow-hidden">
            <div className=" overflow-auto flex-grow">
              {selectedStepper === "overview" && (
                <>
                  <div className="mt-5  bg-[#F6F9FD] px-4 py-4 mx-1 border border-[#E0E0E0] rounded-lg ">
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
                        <InputSMResponsive
                          type="text"
                          defaultValue={getAPIDataDocs?.first_name}
                          {...register("first_name", { required: true })}
                          className={`${
                            errors.first_name && "border-[#FF441B]"
                          }`}
                        />
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
                          className={`${
                            errors.last_name && "border-[#FF441B]"
                          }`}
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
                            <PhoneInput
                              value={value}
                              onChange={onChange}
                              placeholder="Enter Phone Number"
                              prefix=""
                              inputClassName="w-full h-full"
                              className="w-full h-full"
                            />
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
                          placeholder="email@email.com"
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
                          dataValue={getAPIDataDocs.custom_race}
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
                          dataValue={getAPIDataDocs.custom_ethnicity}
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
                          placeholder="PCP Name"
                          defaultValue={getAPIDataDocs?.custom_pcp_name}
                          {...register("custom_pcp_name", { required: true })}
                          className={`${
                            errors.custom_pcp_name && "border-[#FF441B]"
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
                            <PhoneInput
                              value={value}
                              onChange={onChange}
                              placeholder="Enter Phone Number"
                              prefix=""
                              inputClassName="w-full h-full"
                              className="w-full h-full"
                            />
                          )}
                        />
                      </div>
                    </div>
                  </div>
                  <div className=" grid 2xl:grid-cols-2  gap-5 mt-5  bg-[#F6F9FD] px-4 py-4 mx-1 border border-[#E0E0E0] rounded-lg ">
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
                    <div className="mt-5   bg-[#F6F9FD] px-4 py-4 mx-1 border border-[#E0E0E0] rounded-lg ">
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
                            className={`${
                              (errors as any).address?.address_line1 &&
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
                            className={`${
                              (errors as any).address?.state &&
                              "border-[#FF441B]"
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
                            className={`${
                              (errors as any).address?.city &&
                              "border-[#FF441B]"
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
                            className={`${
                              (errors as any).address?.pincode &&
                              "border-[#FF441B]"
                            }`}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Contact Div */}
                    <div className="mt-5  bg-[#F6F9FD] px-4 py-4 mx-1 border border-[#E0E0E0] rounded-lg ">
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
                            defaultValue={
                              getAPIDataDocs?.__onload?.contact_list[0]
                                ?.mobile_no
                            }
                            render={({ field: { onChange, value } }) => (
                              <PhoneInput
                                value={value}
                                onChange={onChange}
                                placeholder="Enter Phone Number"
                                prefix=""
                                inputClassName="w-full h-full"
                                className="w-full h-full"
                              />
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
                              <PhoneInput
                                value={value}
                                onChange={onChange}
                                placeholder="Enter Phone Number"
                                prefix=""
                                inputClassName="w-full h-full"
                                className="w-full h-full"
                              />
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
                              getAPIDataDocs?.__onload?.contact_list[0]
                                ?.email_id
                            }
                            {...register("contact_details.email")}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Patient Relation */}
                    <div className="mt-5  bg-[#F6F9FD] px-4 py-4 mx-1 border border-[#E0E0E0] rounded-lg ">
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
                              linkTitle={linkTitle}
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
              {selectedStepper === "appointments" && (
                <Appointment params={params} />
              )}
              {selectedStepper === "communications" && <Communications />}
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
    ):<LoadingScreen/>
  );
};

export default ViewPatient;
