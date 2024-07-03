import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label, LabelSMResponsive } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { addIcon } from "@/constants/images";
import { useState } from "react";

import ComboboxDropDown from "../comboBoxDropDown";

const DialogWithRadio = ({ AddNewData }: any) => {
  const [selectGender, setSelectGender] = useState("Active");
  const [diagnosisValue, setDiagnosisValue] = useState("");
  const changeStateGender = (e: any) => {
    setSelectGender(e.target.value);
  };

  const onSubmit = () => {
    AddNewData({
      health_condition: diagnosisValue,
      condition_status: selectGender,
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="border border-[#BFC1C8] border-dashed rounded-xl flex justify-center bg-[#FFFFFF] drop-shadow-md cursor-pointer w-40 h-24">
          <img src={addIcon.path} alt={addIcon.alt} width={34} height={34} />
        </div>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Diagnostics</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Health Condition
            </Label>
            <div className="col-span-3">
              <ComboboxDropDown
                placeholder="select Health Condition"
                label="health_condition"
                setComboBoxValue={setDiagnosisValue}
                doctype={"Diagnosis"}
              />
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Condition Status
            </Label>
            <div className="grid w-full max-w-sm items-center gap-1.5 xl2:col-span-2 sm:col-span-0">
              <LabelSMResponsive className="text-[#616161]">
                {/* <span className="text-[#ED9192]">*</span> */}
              </LabelSMResponsive>
              <RadioGroup className="flex" defaultValue="Active">
                <div
                  className={`flex items-center space-x-2  ${
                    selectGender === "Active"
                      ? "bg-[#FFF0EB] border-[#EC7E5B] border-2"
                      : "border-2 border-[#DDDDDD] bg-white"
                  }  rounded-3xl p-2`}
                >
                  <RadioGroupItem
                    value="Active"
                    id="Active"
                    className="data-[state=checked]:text-[#EC7E5B] data-[state=checked]:border-[#EC7E5B]"
                    onClick={changeStateGender}
                  />
                  <LabelSMResponsive
                    htmlFor="Active"
                    className={`${
                      selectGender === "Active"
                        ? "text-[#FFFFFF]"
                        : "text-[#616161]"
                    } font-semibold text-[#EC7E5B]`}
                  >
                    Active
                  </LabelSMResponsive>
                </div>
                <div
                  className={`flex items-center space-x-2  ${
                    selectGender === "Resolved"
                      ? "bg-[#FFFFFF] border-2 border-[#4BC05B]"
                      : "border-2 border-[#DDDDDD] bg-white"
                  }  rounded-3xl p-2`}
                >
                  <RadioGroupItem
                    value="Resolved"
                    id="Resolved"
                    className="data-[state=checked]:text-[#4BC05B] data-[state=checked]:border-[#4BC05B]"
                    onClick={changeStateGender}
                  />
                  <LabelSMResponsive
                    htmlFor="Resolved"
                    className={`${
                      selectGender === "Resolved"
                        ? "text-[#FFFFFF] "
                        : "text-[#616161]"
                    } font-semibold text-[#4BC05B]`}
                  >
                    Resolved
                  </LabelSMResponsive>
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="button"
              className="bg-[#7ACFFF]"
              onClick={() => onSubmit()}
            >
              Save
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogWithRadio;
