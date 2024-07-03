import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  DynamicRadioButtonProps,
  DynamicRadioButtonPropsWithUseFormHook,
} from "@/types";
import React, { useEffect } from "react";

const DynamicRadioButton: React.FC<DynamicRadioButtonProps> = ({
  setButtonSelection,
  getButtonSelection,
  data,
  defaultValue,
  disabled = false,
}) => {
  const handleSetButtonSelection = (e: any) => {
    setButtonSelection(e.target.value);
  };
  return (
    <RadioGroup defaultValue={defaultValue} className="sm:flex grid gap-5 mt-2">
      {data.map((item, index) => {
        return (
          <div
            className={`flex items-center space-x-2  ${
              getButtonSelection === item.value
                ? "bg-[#7ACFFF]"
                : "border-2 border-[#DDDDDD] bg-white"
            }  rounded-3xl p-2`}
            key={index}
          >
            <RadioGroupItem
              value={item.value}
              id={`${item.value}${index}`}
              className={`${
                getButtonSelection === item.value &&
                "border-[#FFFFFF] text-[#FFFFFF] xl:text-sm text-xs"
              }`}
              onClick={handleSetButtonSelection}
              checked={getButtonSelection === item.value}
              disabled={disabled}
            />
            <Label
              htmlFor={`${item.value}${index}`}
              className={`${
                getButtonSelection === item.value
                  ? "text-[#FFFFFF]"
                  : "text-[#616161]"
              } font-semibold xl:text-sm text-xs`}
            >
              {item.label}
            </Label>
          </div>
        );
      })}
    </RadioGroup>
  );
};

export const DynamicRadioButtonWithUseFormHook: React.FC<
  DynamicRadioButtonPropsWithUseFormHook
> = ({
  setButtonSelection,
  data,
  defaultValue,
  disabled = false,
  label,
  register,
  required = false,
  setValueForm,
  getValueForm
}) => {
  useEffect(()=>{
    if(defaultValue){
      setValueForm(label,defaultValue)
    }
  },[])
  const handleSetButtonSelection = (e: any) => {
    setButtonSelection(e.target.value);
    setValueForm(label,e.target.value)
  };
  return (
    <RadioGroup
      defaultValue={defaultValue}
      className="sm:flex grid gap-5 mt-2"
      {...(required?register(label, {
        required: true,
      }):register(label))}
    >
      {data.map((item, index) => {
        return (
          <div
            className={`flex items-center space-x-2  ${
              getValueForm(label) === item.value
                ? "bg-[#7ACFFF]"
                : "border-2 border-[#DDDDDD] bg-white"
            }  rounded-3xl p-2`}
            key={index}
          >
            <RadioGroupItem
              value={item.value}
              id={`${item.value}${index}${label}`}
              className={`${
                getValueForm(label) === item.value &&
                "border-[#FFFFFF] text-[#FFFFFF] xl:text-sm text-xs"
              }`}
              onClick={handleSetButtonSelection}
              checked={getValueForm(label) === item.value}
              disabled={disabled}
            />
            <Label
              htmlFor={`${item.value}${index}${label}`}
              className={`${
                getValueForm(label) === item.value
                  ? "text-[#FFFFFF]"
                  : "text-[#616161]"
              } font-semibold xl:text-sm text-xs`}
            >
              {item.label}
            </Label>
          </div>
        );
      })}
    </RadioGroup>
  );
};

export const DynamicRadioButtonWithUseFormHookWithMpdifyStyle: React.FC<
  DynamicRadioButtonPropsWithUseFormHook
> = ({
  setButtonSelection,
  getButtonSelection,
  data,
  defaultValue,
  disabled = false,
  label,
  register,
  required = false,
  setValueForm,
  getValueForm
}) => {
  useEffect(()=>{
    setValueForm(label,defaultValue)
  },[])
  const handleSetButtonSelection = (e: any) => {
    setButtonSelection(e.target.value);
    setValueForm(label,e.target.value)
  };
  return (
    <RadioGroup
      defaultValue={defaultValue}
      className="flex md:gap-5"
      {...(required?register(label, {
        required: true,
      }):register(label))}
    >
      {data.map((item, index) => {
        return (
          <div
            className={`flex items-center space-x-2 rounded-3xl p-1 md:p-2`}
            key={index}
          >
            <RadioGroupItem
              value={item.value}
              id={`${item.value}${index}${label}`}
              className={`${
                getButtonSelection === item.value &&
                "border-[#61CE70] text-[#61CE70] xl:text-sm text-xs"
              }`}
              onClick={handleSetButtonSelection}
              checked={getButtonSelection === item.value}
              disabled={disabled}
            />
            <Label
              htmlFor={`${item.value}${index}${label}`}
              className={`text-[#00003C] font-normal text-sm`}
            >
              {item.label}
            </Label>
          </div>
        );
      })}
    </RadioGroup>
  );
};

export default DynamicRadioButton;
