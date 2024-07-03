import { Checkbox } from "@/components/ui/checkbox";
import { InputSMResponsive } from "@/components/ui/input";
import { LabelSMResponsive } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Controller, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogFooter,
  DialogHeader
} from "@/components/ui/dialog";
import API, { BASE_URL } from "@/constants/api.constant";
import {
  EthnicityDropDownOption,
  GenderDropDownOption,
  RaceDropDownOption,
} from "@/constants/fields";
import { axiosPOSTAPI } from "@/helpers/commonAPI";
import { PatientStatusCode } from "@/utilities/utils";
import Cookies from "js-cookie";
import { useState } from "react";
import toast from "react-hot-toast";
import { PhoneInput } from "react-international-phone";
import { DynamicRadioButtonWithUseFormHook } from "../DynamicRadioButton";
import ComboboxDropDown from "../comboBoxDropDown";
import ReqiredFieldErrorImage from "../reqiredFieldError";
const AddPatientModal = () => {
  const {
    register,
    getValues,
    setValue,
    formState: { errors },
    trigger,
    control,
  } = useForm();
  const [selectInviteUser, setInviteUser] = useState<any>(0);
  const [selectGender, setGender] = useState<any>("Female");
  const [selectStatus, setStatus] = useState<any>("Active");
  const [selectEmailPreference, setEmailPreference] = useState("");

  const handlerEmailPreference = (e: any) => {
    setEmailPreference(e.target.value);
  };
  const [comboBoxKeyValues, setComboBoxKeyValues] = useState<any>({});

  const handleInputChangeComboBox = (value: string, label: string) => {
    setComboBoxKeyValues((prev: any) => {
      return { ...prev, [label]: value };
    });
  };
  const createPatient = async () => {
    const isValid = await trigger();
    if (isValid) {
      // const oldData = getAPIDataDocs;
      const URL = BASE_URL + API.SAVE_DOCS;
      const NewData = {
        // name: "wfwefw-efewfwefwef",
        doctype: "Patient",

        owner: Cookies.get("email"),
        // ...getValues(),
        // __islocal: 1,
        // __unsaved: 1,
        docstatus: 0,
        naming_series: "P.#",
        // first_name:
        //   getValues("first_name") !== undefined ? getValues("first_name") : "",
        // middle_name:
        //   getValues("middle_name") !== undefined ? getValues("middle_name") : "",
        // last_name:
        //   getValues("last_name") !== undefined ? getValues("last_name") : "",
        // sex: selectGender !== undefined ? selectGender : "",
        // custom_pcp_name:
        //   getValues("custom_pcp_name") !== undefined
        //     ? getValues("custom_pcp_name")
        //     : "",
        // custom_patient_series: "P.#####",
        // dob: getValues("dob") !== undefined ? getValues("dob") : "",
        // custom_pcp_phone:
        //   getValues("custom_pcp_phone") !== undefined
        //     ? getValues("custom_pcp_phone")
        //     : "",
        // patient_name: "",
        // custom_patient_status: selectStatus,
        // status: "",
        // invite_user: "",
        // inpatient_status: "",
        // report_preference: selectEmailPreference,
        // blood_group: "",
        // mobile: getValues("mobile") !== undefined ? getValues("mobile") : "",
        // phone: getValues("phone") !== undefined ? getValues("phone") : "",
        // email: getValues("email") !== undefined ? getValues("email") : "",
        // custom_unsubscribe_to_marketing: "",
        // customer: "",
        // customer_group: "",
        // territory: "",
        // default_currency: "",
        // default_price_list: "",
        // language: "en",
        // custom_is_the_patient_cognitively_impared: "",
        // custom_brief_interview_for_material_statusbims_score13: "",
        // custom_cognitive_impairment_noted_in_patients_chart: "",
        // custom_confirmed_status_with_family_membercaregiver: "",
        // custom_confirmed_status_with_healthcare_staff: "",
        // custom_minimental_state_examinationmmse_score__27: "",
        // marital_status:"",
        // custom_do_you_currently_use_or_have_you_ever_tobacco_profucts:"",
        // custom_current_cigarette_smoker:"",
        // custom_are_you_interested_in_quiting_1: "",
        // custom_former_cigarette_smoker:"",
        // custom_on_average_how_many_cigarettes_did_you_smoke_per_day:"",
        // custom_how_many_years_did_you_smoke_for: "",
        // custom_other_tobacco_user:"",
        // custom_are_you_interested_in_quiting_2: "",
        // custom_past_year_have_you_had_4_or_more_alcoholic_drinks_iady:"",
        // custom_use_opioids_and_have_access_to_nacran:"",
        // custom_are_you_interesting_in_quiting: "",
        // custom_purpose_of_body_shapping:"",
        // custom_have_you_hospitalized_overnight:"",
        // custom_payment_type:"",
        // custom_is_the_patient_the_primary_policy_holder:[],
        // custom_employment_housing_transportation:[],
        // custom_recreational_drug_usage: "",
        // custom_drug_allergies__side_effects:[],
        // patient_relation:[],
        // custom_medications:[],
        // custom_relative_medical_conditions:[],
        // custom_health_conditions:[],
        // custom_surgical_histories:[],
        // custom_patient_notes:
        //   getValues("custom_patient_notes") !== undefined
        //     ? getValues("custom_patient_notes")
        //     : "",
        // __onload: "",
        // occupation:
        //   getValues("occupation") !== undefined ? getValues("occupation") : "",
        // custom_how_many_times_in_the_past_year:
        //   getValues("custom_how_many_times_in_the_past_year") !== undefined
        //     ? getValues("custom_how_many_times_in_the_past_year")
        //     : "",
        // custom_what_for_and_when:
        //   getValues("custom_what_for_and_when") !== undefined
        //     ? getValues("custom_what_for_and_when")
        //     : "",
        // tobacco_past_use:
        //   getValues("tobacco_past_use") !== undefined
        //     ? getValues("tobacco_past_use")
        //     : "",
        // tobacco_current_use:
        //   getValues("tobacco_current_use") !== undefined
        //     ? getValues("tobacco_current_use")
        //     : "",
        // alcohol_past_use:
        //   getValues("alcohol_past_use") !== undefined
        //     ? getValues("alcohol_past_use")
        //     : "",
        // alcohol_current_use:
        //   getValues("alcohol_current_use") !== undefined
        //     ? getValues("alcohol_current_use")
        //     : "",
        // surrounding_factors:
        //   getValues("surrounding_factors") !== undefined
        //     ? getValues("surrounding_factors")
        //     : "",
        // other_risk_factors:
        //   getValues("other_risk_factors") !== undefined
        //     ? getValues("other_risk_factors")
        //     : "",
        // custom_policy_number:
        //   getValues("custom_policy_number") !== undefined
        //     ? getValues("custom_policy_number")
        //     : "",
        // custom_primary_carrier:
        //   getValues("custom_primary_carrier") !== undefined
        //     ? getValues("custom_primary_carrier")
        //     : "",
        // custom_primary_holder_first_name:
        //   getValues("custom_primary_holder_first_name") !== undefined
        //     ? getValues("custom_primary_holder_first_name")
        //     : "",
        // custom_medical_record_number:
        //   getValues("custom_medical_record_number") !== undefined
        //     ? getValues("custom_medical_record_number")
        //     : "",
        // custom_primary_holder_middle_name:
        //   getValues("custom_primary_holder_middle_name") !== undefined
        //     ? getValues("custom_primary_holder_middle_name")
        //     : "",
        // custom_group_number:
        //   getValues("custom_group_number") !== undefined
        //     ? getValues("custom_group_number")
        //     : "",
        // custom_primary_holder_last_name:
        //   getValues("custom_primary_holder_last_name") !== undefined
        //     ? getValues("custom_primary_holder_last_name")
        //     : "",
        // custom_primary_holder_dob1:
        //   getValues("custom_primary_holder_dob1") !== undefined
        //     ? getValues("custom_primary_holder_dob1")
        //     : "",
        // custom_relationship_to_policy_holder:
        //   getValues("custom_relationship_to_policy_holder") !== undefined
        //     ? getValues("custom_relationship_to_policy_holder")
        //     : "",
        // custom_rxbin:
        //   getValues("custom_rxbin") !== undefined
        //     ? getValues("custom_rxbin")
        //     : "",
        // custom_rxpcn:"",
        // custom_rxid:"",
        // custom_rxgroup:"",
        // custom_how_many_cigarettes_do_you_smoke_per_day: "",
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
          toast.success("Patient Created Successfully");
          window.location.reload();
        }
        return 200;
      } catch (error: any) {
        toast("please filled all required fields");
      }
    }
  };

  return (
    <>
      <div className="pt-5 pr-5">


        <div className="flex justify-between pr-10">
          <h5 className="heading-text-xl font-semibold text-[#474747] flex items-center">
            Patient Information
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
              buttonClassName={`rounded-full ${PatientStatusCode(
                selectStatus
              )}`}
            />
          </div>
        </div>

        <Separator orientation="horizontal" className="my-3" />
        <div className="mt-5 bg-[#F6F9FD] border border-solid border-[#E0E0E0] rounded-[6px]">
        <div className="px-4 py-4">
          <div className="grid 2xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-4 mt-2">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <LabelSMResponsive className="text-[#616161]">
                First Name <span className="text-[#ED9192]">*</span>
                <ReqiredFieldErrorImage error={errors.first_name} />
              </LabelSMResponsive>
              <InputSMResponsive
                type="text"
                {...register("first_name", { required: true })}
                className={`${errors.first_name && "border-[#FF441B]"}`}
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <LabelSMResponsive className="text-[#616161]">
                Middle Name (optional)
              </LabelSMResponsive>
              <InputSMResponsive type="text" {...register("middle_name")} />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <LabelSMResponsive className="text-[#616161]">
                Last Name
                <ReqiredFieldErrorImage error={errors.last_name} />
              </LabelSMResponsive>
              <InputSMResponsive
                type="text"
                {...register("last_name", { required: true })}
                className={`${errors.last_name && "border-[#FF441B]"}`}
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Controller
                name="mobile"
                control={control}
                rules={{
                  required: selectEmailPreference === "Print" ? true : false,
                }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <>
                    <LabelSMResponsive className="text-[#616161]">
                      Primary Phone <ReqiredFieldErrorImage error={error} />
                    </LabelSMResponsive>
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
              />{" "}
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <LabelSMResponsive className="text-[#616161]">
                Secondary Phone
              </LabelSMResponsive>

              <Controller
                name="phone"
                control={control}
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
                Email
                <ReqiredFieldErrorImage error={errors.email} />
              </LabelSMResponsive>
              <InputSMResponsive
                type="text"
                {...(selectEmailPreference === "Email"
                  ? register("email", { required: true })
                  : register("email"))}
                className={`${errors.email && "border-[#FF441B]"}`}
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <LabelSMResponsive className="text-[#616161]">
                Date of birth
              </LabelSMResponsive>
              <InputSMResponsive type="date" {...register("dob")} />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5 xl2:col-span-2 sm:col-span-0">
              <LabelSMResponsive className="text-[#616161]">
                Gender <span className="text-[#ED9192]">*</span>
                <ReqiredFieldErrorImage error={errors.sex} />
              </LabelSMResponsive>
              {/* <DynamicRadioButtonWithUseFormHook
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
                setButtonSelection={setGender}
              /> */}
              <ComboboxDropDown
                label="sex"
                placeholder="select Gender"
                staticValue={GenderDropDownOption}
                handleInputChange={handleInputChangeComboBox}
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
                placeholder="Race"
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
          <Separator orientation="horizontal" className="my-6" />
          <div className="grid 2xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-4 mt-2">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <LabelSMResponsive className="text-[#616161]">
                PCP Name <span className="text-[#ED9192]">*</span>
                <ReqiredFieldErrorImage error={errors.custom_pcp_name} />
              </LabelSMResponsive>
              <InputSMResponsive
                type="text"
                placeholder="First Name Last Name"
                {...register("custom_pcp_name", { required: true })}
                className={`${errors.custom_pcp_name && "border-[#FF441B]"}`}
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
        <div className="grid 2xl:grid-cols-2 gap-5 mt-10 px-4 py-10 border-t border-solid">
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
              />
            </div>
          </div>
          <div className=" w-full max-w-sm items-center space-y-2">
            <LabelSMResponsive className="text-[#616161]">
              Report Preference
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
              By checking this box, a welcome email with access to the patient
              portal will be sent to the patient. You can also enable this
              access later if needed
            </LabelSMResponsive>
          </div>
        </div>
        </div>

        <DialogFooter className="mt-3 ">
          <div className="w-full flex justify-end">
            <div className="space-x-4">
              <Button
                className="bg-[#F4F8FF] text-[#474747] border-[#474747] border-x  border-y border-opacity-20 font-semibold  xl:text-sm text-xs"
                onClick={() => createPatient()}
              >
                Save
              </Button>
            </div>
          </div>
        </DialogFooter>
      </div>
    </>
  );
};
export default AddPatientModal;
