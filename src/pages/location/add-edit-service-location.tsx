import ComboboxDropDown, {
  ComboboxDropDownWithUseFormHook,
} from "@/components/shared/comboBoxDropDown";
import ReqiredFieldErrorImage from "@/components/shared/reqiredFieldError";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { InputSMResponsive } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import API, { BASE_URL } from "@/constants/api.constant";
import { axiosGETAPI, axiosPOSTAPI } from "@/helpers/commonAPI";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { PhoneInput } from "react-international-phone";
import Cookies from "js-cookie";
import { useSearchParams } from "react-router-dom";
import { formatTime } from "@/utilities/utils";
const ViewLocation = ({ onOpen, from, id, setReloadData }: any) => {
  const {
    register,
    getValues,
    setValue,
    control,
    trigger,
    formState: { errors },
    watch,
    reset,
  } = useForm();
  const [comboBoxKeyValues, setcomboboxKeyvalues] = useState<any>({});
  const overlapAppointments = watch("overlap_appointments");
  const allowAppointments = watch("allow_appointments");
  const handleInputChangesCombobox = (value: any, label: string) => {
    setcomboboxKeyvalues((prev: any) => ({ ...prev, [label]: value }));

    if (label === "service_unit_type") {
      handleCheckBox("allow_appointments", true);
      handleCheckBox("overlap_appointments", true);
    }
  };

  const handleCheckBox = (label: string, checked: any) => {
    setValue(label, checked ? 1 : 0);
  };
  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const response = await axiosGETAPI(
          BASE_URL +
            API.VIEW_DOCTYPE +
            "?doctype=Healthcare Service Unit&&name=" +
            id
        );
        if (response.status === 200) {
          reset({
            ...response.data.docs[0],
            custom_opening_time: formatTime(
              response.data.docs[0].custom_opening_time
            ),
            custom_closing_time: formatTime(
              response.data.docs[0].custom_closing_time
            ),
          });
          setcomboboxKeyvalues({
            company: response.data.docs[0].company,
          });
        }
      }
    };
    fetchData();
  }, []);
  const onsubmit = async () => {
    const isValid = await trigger();
    if (isValid) {
      const reqBody = {
        ...getValues(),
        docstatus: 0,
        doctype: "Healthcare Service Unit",
        owner: Cookies.get("email"),
        is_group: 0,
        inpatient_occupancy: 0,
        occupancy_status: "Vacant",
        company: comboBoxKeyValues?.company,
        __run_link_triggers: 1,
        healthcare_service_unit_name: getValues("healthcare_service_unit_name"),
        service_unit_capacity: getValues("service_unit_capacity"),
        custom_opening_time: getValues("custom_opening_time"),
        custom_closing_time: getValues("custom_closing_time"),
      };
      const response = await axiosPOSTAPI(BASE_URL + API.SAVE_DOCS, {
        doc: JSON.stringify(reqBody),
        action: "Save",
      });
      if (response.status === 200) {
        onOpen(false);
        if (from === "add") {
          toast.success("Location Created Successfully");
        } else {
          toast.success("Location Updated Successfully");
        }
        if (setReloadData) {
          setReloadData((prev: boolean) => !prev);
        }
      }
    }
  };
  return (
    <div className="m-4 space-y-6">
      <div className="space-y-2 bg-[#F6F9FD] border border-[#E0E0E0] p-3 rounded-xl  flex-col ">
        <Label className="text-[#303348] font-semibold text-lg align-middle">
          Location Details
        </Label>
        <Separator />
        <div className="grid md:grid-cols-2 gap-4 w-full h-full">
          <div className="space-y-1 w-full items-center gap-1.5">
            <Label className="text-[#303348] xl:text-sm text-xs font-medium">
              Location Name <span className="text-[#ED9192]">*</span>
              <ReqiredFieldErrorImage
                error={errors.healthcare_service_unit_name}
              />
            </Label>
            <InputSMResponsive
              type="text"
              placeholder=""
              className={`${
                errors.healthcare_service_unit_name && "required-border"
              }`}
              {...register("healthcare_service_unit_name", { required: true })}
            />
          </div>
          <div className="space-y-1 w-full items-center gap-1.5">
            <Label className="text-[#303348] xl:text-sm text-xs font-medium">
              Company <span className="text-[#ED9192]">*</span>
              <ReqiredFieldErrorImage error={errors.company} />
            </Label>
            <ComboboxDropDownWithUseFormHook
              label="company"
              placeholder="Select Appointment Type"
              doctype="Company"
              referenceDoctype="Healthcare Service Unit"
              handleInputChange={handleInputChangesCombobox}
              dataValue={comboBoxKeyValues?.company}
              register={register}
              setValueForm={setValue}
              errors={errors}
              required
            />
          </div>
          <div className="space-y-1 w-full items-center gap-1.5">
            <Label className="text-[#303348] xl:text-sm text-xs font-medium">
              Overlap Booking
            </Label>
            <InputSMResponsive
              type="text"
              placeholder=""
              {...register("service_unit_capacity")}
            />
          </div>

          <div className="space-y-1 w-full items-center gap-1.5">
            <Controller
              name="custom_contact_no"
              control={control}
              defaultValue={getValues("custom_contact_no")}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <>
                  <Label className="text-[#303348] xl:text-sm text-xs font-medium">
                    Contact No
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
          <div className="space-y-1 w-full items-center gap-6 flex">
            <div className="w-full">
              <Label className="text-[#303348] xl:text-sm text-xs font-medium">
                Opening Time <span className="text-[#ED9192]">*</span>
                <ReqiredFieldErrorImage error={errors.custom_opening_time} />
              </Label>
              <InputSMResponsive
                type="time"
                className={`${errors.custom_opening_time && "required-border"}`}
                placeholder=""
                {...register("custom_opening_time", { required: true })}
              />
            </div>
            <div className="w-full">
              <Label className="text-[#303348] xl:text-sm text-xs font-medium">
                Closing Time <span className="text-[#ED9192]">*</span>
                <ReqiredFieldErrorImage error={errors.custom_closing_time} />
              </Label>
              <InputSMResponsive
                type="time"
                className={`${errors.custom_closing_time && "required-border"}`}
                placeholder=""
                {...register("custom_closing_time", { required: true })}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <Button
          className="text-white bg-[#47BDFF] hover:bg-[#3EA4DE] rounded-xl"
          onClick={() => onsubmit()}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default ViewLocation;
