import { useEffect, useState } from "react";
import { DynamicRadioButtonWithUseFormHook } from "./DynamicRadioButton";
import ComboboxDropDown from "./comboBoxDropDown";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { constructNow } from "date-fns";
import { PaymentTypeUploadImageIcon } from "@/constants/images";
import { Button } from "../ui/button";

const PaymentTypeComponent = ({
  register,
  setValue,
  getValues,
  getPaymentTypeOptions,
  handleInputChangeComboBox,
  comboBoxKeyValues,
  fieldLabel,
}: any) => {
  const [getInsuranceType, setInsuranceType] = useState<string>("");
  const [selectPrimaryPolicyHolder, setselectPrimaryPolicyHolder] =
    useState<string>("");
  const [selectTimeofPayment, setTimeofPayment] = useState<any>();
  useEffect(() => {
    console.log(comboBoxKeyValues);
  }, [comboBoxKeyValues]);
  return (
    <div
      className="w-full bg-white p-3 space-y-4"
      style={{ boxShadow: " 0px 4px 11px 0px #61616140" }}
    >
      <div>
        <Label className="text-[#303348] xl:text-sm text-xs font-medium">
          Insurance Type
        </Label>
        <DynamicRadioButtonWithUseFormHook
          setButtonSelection={setInsuranceType}
          getButtonSelection={getInsuranceType}
          data={[
            {
              value: "Insurance",
              label: "Insurance",
            },
            {
              value: "Not Insurance",
              label: "Not Insurance",
            },
            {
              value: "Cash",
              label: "Cash",
            },
          ]}
          defaultValue={"Insurance"}
          register={register}
          label={fieldLabel.insurance_type}
          setValueForm={setValue}
          getValueForm={getValues}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="grid  w-full  items-center gap-1.5">
          <Label className="text-[#303348] xl:text-sm text-xs font-medium">
            Payment Type
          </Label>
          <ComboboxDropDown
            staticValue={getPaymentTypeOptions}
            label={fieldLabel.payment_type}
            displayValue="label"
            outputValue="label"
            dataValue={comboBoxKeyValues?.[fieldLabel.payment_type]}
            handleInputChange={handleInputChangeComboBox}
            placeholder="Select Payment Type"
          />
        </div>
        {comboBoxKeyValues &&
          comboBoxKeyValues[fieldLabel.payment_type] ===
            "Private Insurance Billing" && (
            <div className="grid  w-full  items-center gap-1.5">
              <Label className="text-[#303348] xl:text-sm text-xs font-medium">
                Is Patient the Primary Policy Holder?
              </Label>
              <DynamicRadioButtonWithUseFormHook
                setButtonSelection={setselectPrimaryPolicyHolder}
                getButtonSelection={selectPrimaryPolicyHolder}
                data={[
                  {
                    value: "Yes",
                    label: "Yes",
                  },
                  {
                    value: "No",
                    label: "No",
                  },
                ]}
                register={register}
                label={fieldLabel.primary_policy_holder}
                setValueForm={setValue}
                getValueForm={getValues}
                defaultValue={""}
              />
            </div>
          )}
        {/* if primary policy holder is yes  */}

        {comboBoxKeyValues &&
          comboBoxKeyValues[fieldLabel.payment_type] ===
            "Private Insurance Billing" && (
            <div className="text-[#616161] xl:text-sm text-xs ">
              <Label className="text-[#616161] xl:text-sm text-xs ">
                Primary Carrier
              </Label>
              <Input
                type="text"
                className=" xl:text-sm text-xs "
                defaultValue={getValues(fieldLabel.primary_carrier)}
                {...register(fieldLabel.primary_carrier)}
              />
            </div>
          )}
        {comboBoxKeyValues &&
          comboBoxKeyValues[fieldLabel.payment_type] ===
            "Private Insurance Billing" && (
            <div className="text-[#616161] xl:text-sm text-xs ">
              <Label className="text-[#616161] xl:text-sm text-xs ">
                Medical Record Number
              </Label>
              <Input
                type="text"
                className=" xl:text-sm text-xs "
                defaultValue={getValues(fieldLabel.medical_record_number)}
                {...register(fieldLabel.medical_record_number)}
              />
            </div>
          )}
        {comboBoxKeyValues &&
          comboBoxKeyValues[fieldLabel.payment_type] ===
            "Private Insurance Billing" && (
            <div className="text-[#616161] xl:text-sm text-xs ">
              <Label className="text-[#616161] xl:text-sm text-xs ">
                Group Number
              </Label>
              <Input
                type="text"
                className=" xl:text-sm text-xs "
                defaultValue={getValues(fieldLabel.group_number)}
                {...register(fieldLabel.group_number)}
              />
            </div>
          )}

        {/* if primary policy holder is No */}

        {comboBoxKeyValues &&
          comboBoxKeyValues[fieldLabel.payment_type] ===
            "Private Insurance Billing" &&
          getValues(fieldLabel.primary_policy_holder) === "No" && (
            <div className="text-[#616161] xl:text-sm text-xs ">
              <Label className="text-[#616161] xl:text-sm text-xs ">
                Primary holder first name
              </Label>
              <Input
                type="text"
                className=" xl:text-sm text-xs "
                defaultValue={getValues(fieldLabel.primary_holder_first_name)}
                {...register(fieldLabel.primary_holder_first_name)}
              />
            </div>
          )}

        {comboBoxKeyValues &&
          comboBoxKeyValues[fieldLabel.payment_type] ===
            "Private Insurance Billing" &&
          getValues(fieldLabel.primary_policy_holder) === "No" && (
            <div className="text-[#616161] xl:text-sm text-xs ">
              <Label className="text-[#616161] xl:text-sm text-xs ">
                Primary holder middle name
              </Label>
              <Input
                type="text"
                className=" xl:text-sm text-xs "
                defaultValue={getValues(fieldLabel.primary_holder_middle_name)}
                {...register(fieldLabel.primary_holder_middle_name)}
              />
            </div>
          )}

        {comboBoxKeyValues &&
          comboBoxKeyValues[fieldLabel.payment_type] ===
            "Private Insurance Billing" &&
          getValues(fieldLabel.primary_policy_holder) === "No" && (
            <div className="text-[#616161] xl:text-sm text-xs ">
              <Label className="text-[#616161] xl:text-sm text-xs ">
                Primary holder last name
              </Label>
              <Input
                type="text"
                className=" xl:text-sm text-xs "
                defaultValue={getValues(fieldLabel.primary_holder_last_name)}
                {...register(fieldLabel.primary_holder_last_name)}
              />
            </div>
          )}

        {comboBoxKeyValues &&
          comboBoxKeyValues[fieldLabel.payment_type] ===
            "Private Insurance Billing" &&
          getValues(fieldLabel.primary_policy_holder) === "No" && (
            <div className="text-[#616161] xl:text-sm text-xs ">
              <Label className="text-[#616161] xl:text-sm text-xs ">
                Primary holder dob
              </Label>
              <Input
                type="date"
                className=" xl:text-sm text-xs "
                defaultValue={getValues(fieldLabel.primary_holder_dob)}
                {...register(fieldLabel.primary_holder_dob)}
              />
            </div>
          )}
        {comboBoxKeyValues &&
          comboBoxKeyValues[fieldLabel.payment_type] ===
            "Private Insurance Billing" &&
          getValues(fieldLabel.primary_policy_holder) === "No" && (
            <div className="text-[#616161] xl:text-sm text-xs ">
              <Label className="text-[#616161] xl:text-sm text-xs ">
                Relationship to policy holder
              </Label>
              <Input
                type="text"
                className=" xl:text-sm text-xs "
                defaultValue={getValues(
                  fieldLabel.relationship_to_policy_holder
                )}
                {...register(fieldLabel.relationship_to_policy_holder)}
              />
            </div>
          )}

        {comboBoxKeyValues &&
          ["Medicare Billing"].includes(
            comboBoxKeyValues[fieldLabel.payment_type]
          ) && (
            <div className="grid w-full  items-center gap-1.5">
              <Label className="text-[#616161] xl:text-sm text-xs ">
                Medi-Care ID Number
              </Label>
              <Input
                type="text"
                defaultValue={getValues(fieldLabel.medicare_id_number)}
                {...register(fieldLabel.medicare_id_number)}
              />
            </div>
          )}

        {comboBoxKeyValues &&
          ["Medi-Cal Billing"].includes(
            comboBoxKeyValues[fieldLabel.payment_type]
          ) && (
            <div className="grid w-full  items-center gap-1.5">
              <Label className="text-[#616161] xl:text-sm text-xs ">
                Medi-Cal ID Number
              </Label>
              <Input
                type="text"
                defaultValue={getValues(fieldLabel.medi_cal_id_number)}
                {...register(fieldLabel.medi_cal_id_number)}
              />
            </div>
          )}

        {comboBoxKeyValues &&
          ["Cash", "Credit Card"].includes(
            comboBoxKeyValues[fieldLabel.payment_type]
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
                defaultValue={getValues(fieldLabel.time_of_payment)}
                label={fieldLabel.time_of_payment}
                register={register}
                setValueForm={setValue}
                getValueForm={getValues}
              />
            </div>
          )}
      </div>

      <div>
        <Label className="text-[#474747] text-base font-bold block">
          Upload Insurance Card
        </Label>
        <div className=" grid  grid-cols-2 gap-4 space-x-2 ">
          <div className="">
            <Label className="text-[#707070] text-xs">Card Front</Label>
            <div className="border-[#9395A5] flex justify-center items-center rounded-xl border-dashed border-2  bg-[#F4F7FC] py-5">
              <div className="flex flex-col space-y-1 items-center">
                <img
                  src={PaymentTypeUploadImageIcon.path}
                  alt={PaymentTypeUploadImageIcon.alt}
                  className="w-15 h-15 min-w-15 min-h-15"
                />
                <Label className="text-[#9395A5] font-bold text-xs">
                  Images/Documents
                </Label>
                <Button className="bg-[#7ACFFF] text-white font-extrabold text-sm">
                  Browse
                </Button>
              </div>
            </div>
          </div>
          <div>
            <Label className="text-[#707070] text-xs">Card Back</Label>
            <div className="border-[#9395A5] flex justify-center items-center rounded-xl border-dashed border-2  bg-[#F4F7FC] py-5">
              <div className="flex flex-col space-y-1 items-center ">
                <img
                  src={PaymentTypeUploadImageIcon.path}
                  alt={PaymentTypeUploadImageIcon.alt}
                  className="w-15 h-15 min-w-15 min-h-15"
                />
                <Label className="text-[#9395A5] font-bold">
                  Images/Documents
                </Label>
                <Button className="bg-[#7ACFFF] text-white font-extrabold">
                  Browse
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PaymentTypeComponent;
