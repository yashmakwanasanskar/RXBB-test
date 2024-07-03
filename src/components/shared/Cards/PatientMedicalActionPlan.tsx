import DialogWithInput from "../CustomDialogBox/DialogWithInput";
import { DeleteCardButton, EditCardButton } from "@/constants/images";
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
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import ComboboxDropDown from "../comboBoxDropDown";
import { useState } from "react";

const PatientMedicalActionPlan = ({
  showData,
  data,
  addData,
  setData,
  index,
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
          return { ...obj, ...getValues(), ...comboBoxKeyValue };
        } else {
          // Return the original object for other indexes
          return obj;
        }
      })
    );
  };
  const { register, getValues } = useForm<{
    allergies: string;
    reaction: string;
  }>();
  const handleInputChangeComboBox = (value: string, label: string) => {
    setComboBoxKeyValues((prev: any) => {
      return { ...prev, [label]: value };
    });
  };
  const [comboBoxKeyValue, setComboBoxKeyValues] = useState<any>({});

  return (
    <div>
      {showData === true ? (
        <div className="p-3  bg-[#FFFFFF] border border-[#D4D6DD] rounded-xl drop-shadow-md min-h-[6.5rem]">
          <div className="flex justify-between gap-5">
            {data.medication && (
              <p className="font-bold text-lg">{data.medication}</p>
            )}
            <div className="flex ">
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
                    <DialogTitle>Medication Action Plan</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    {[
                      {
                        label: "Medication",
                        value: "value",
                        data: data.medication,
                        type: "comboBox",
                        doctype: "Medication",
                        placeholder: "select Medications",
                      },
                      {
                        label: "Description of the Problem",
                        value: "description",
                        data: data.description,
                        type: "text",
                      },
                      {
                        label: "what the Patient should do",
                        value: "patient_action",
                        data: data.patient_action,
                        type: "text",
                      },
                    ].map((val: any, index: any) => (
                      <div
                        className="grid grid-cols-4 items-center gap-4"
                        key={index}
                      >
                        <Label htmlFor="name" className="text-right">
                          {val.label}
                        </Label>
                        {val.type === "comboBox" && (
                          <div className="col-span-3">
                            <ComboboxDropDown
                              placeholder={val.placeholder}
                              label={val.value}
                              handleInputChange={handleInputChangeComboBox}
                              doctype={val.doctype}
                              dataValue={val.data}
                              staticValue={val.staticValue}
                            />
                          </div>
                        )}
                        {val.type === "text" && (
                          <Input
                            type={val.type}
                            className="col-span-3"
                            defaultValue={val.data}
                            {...register(val.value)}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button
                        type="submit"
                        onClick={() => EditObjects(index)}
                        className="bg-[#7ACFFF]"
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

          <div className="flex justify-start">
              <div className={`${data.description?"visible":"invisible"}`}>
                <p className="font-semibold text-base text-[#7C8492]">
                  Description of the Problem
                </p>
                <p className="font-semibold text-sm text-[#474747]">
                  {data.description}
                </p>
              </div>

              <div className={`ml-2 ${data.patient_action?"visible":"invisible"}`}>
                <p className="font-semibold text-base text-[#7C8492]">
                  What the Patient Should do
                </p>
                <p className="font-semibold text-sm text-[#474747]">
                  {data.patient_action}
                </p>
              </div>
          </div>
        </div>
      ) : (
        <DialogWithInput
          dialogTitle="Medications"
          inputLabel={[
            {
              label: "Medication",
              value: "medication",
              type: "comboBox",
              doctype: "Medication",
              placeholder: "select Medications",
            },
            {
              label: "Description of the Problem",
              value: "description",
              type: "text",
            },
            {
              label: "what the Patient should do",
              value: "patient_action",
              type: "text",
            },
          ]}
          AddNewData={addData}
          classname={"h-full min-h-[6.5rem]"}
        />
      )}
    </div>
  );
};

export default PatientMedicalActionPlan;
