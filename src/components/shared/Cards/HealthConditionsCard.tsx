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
import { DeleteCardButton, EditCardButton } from "@/constants/images";
import { useEffect, useState } from "react";
import DialogWithRadio from "../CustomDialogBox/DialogWithRadio";
import ComboboxDropDown from "../comboBoxDropDown";

const HealthConditionsCard = ({
  showData,
  data,
  index,
  addData,
  setData,
}: any) => {
  const DeleteObjects = (key: number) => {
    setData((prev: any[]) =>
      prev.filter((_obj, index) => {
        return index !== key;
      })
    );
  };

  const EditObjects = (index: any) => {
    setData((prev: any[]) =>
      prev.map((obj, idx) => {
        if (idx === index) {
          // Update the data of the object at the specified index
          return { ...obj, health_condition:diagnosisValue, condition_status: selectGender };
        } else {
          // Return the original object for other indexes
          return obj;
        }
      })
    );
  };

  const [selectGender, setSelectGender] = useState();
  const [diagnosisValue, setDiagnosisValue] = useState("");

  const changeStateGender = (e: any) => {
    setSelectGender(e.target.value);
  };
  useEffect(() => {
    if (showData === true) {
      setSelectGender(data.condition_status);
    }
  }, [showData, data]);

  return (
    <div>
      {showData === true ? (
        <div
          className={`border-2 border-[#D4D6DD] rounded-xl   border-t-8 ${
            data.condition_status == "Active"
              ? "border-t-[#EC7E5B]"
              : "border-t-[#4DC144]"
          }   h-24 bg-[#FFFFFF] drop-shadow-md pr-3`}
        >
          <div></div>
          <div className="flex justify-between">
            <div
              className={`p-[1px] m-3 w-24 ${
                data.condition_status == "Active"
                  ? "bg-[#FFF0EB]"
                  : "bg-[#E5F9E0]"
              }  rounded-full border ${
                data.condition_status == "Active"
                  ? "border-[#EC7E5B]"
                  : "border-[#4BC05B]"
              } text-center`}
            >
              <p
                className={`font-bold text-sm ${
                  data.condition_status == "Active"
                    ? "text-[#EC7E5B]"
                    : "text-[#4BC05B]"
                } `}
              >
                {data.condition_status}
              </p>
            </div>
            <div className="flex">
              <Dialog>
                <DialogTrigger asChild>
                  <img
                    src={EditCardButton.path}
                    alt={EditCardButton.alt}
                    width={15}
                    height={15}
                    className="sm:mr-2 hover:cursor-pointer"
                  />
                </DialogTrigger>
                <DialogContent className="min-w-max">
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
                          dataValue ={data.health_condition}
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
                                : "border-2 border-[rgb(221,221,221)] bg-white"
                            }  rounded-3xl p-2`}
                          >
                            <RadioGroupItem
                              value="Active"
                              id="Active"
                              className="data-[state=checked]:text-[#EC7E5B] data-[state=checked]:border-[#EC7E5B]"
                              onClick={changeStateGender}
                              checked={selectGender === "Active"}
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
                              checked={selectGender === "Resolved"}
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
                        onClick={() => EditObjects(index)}
                      >
                        Save
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <img
                src={DeleteCardButton.path}
                alt={DeleteCardButton.alt}
                width={20}
                height={20}
                className="sm:mr-2 hover:cursor-pointer"
                onClick={() => DeleteObjects(index)}
              />
            </div>
          </div>
          <p className="ml-4 font-bold text-lg text-[#333333] ">
            {data.health_condition}
          </p>
        </div>
      ) : (
        <DialogWithRadio AddNewData={addData} />
      )}
    </div>
  );
};

export default HealthConditionsCard;
