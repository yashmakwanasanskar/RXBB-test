import CapsuleLable from "@/components/shared/CapsuleLable";
import DialogWithInput from "../CustomDialogBox/DialogWithInput";
import { DeleteCardButton, EditCardButton } from "@/constants/images";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import ComboboxDropDown from "../comboBoxDropDown";

const MedicationsCard = ({
  addData,
  showData,
  data,
  setData,
  index,
}: {
  addData?: any;
  showData: any;
  data?: any;
  setData: any;
  index: any;
}) => {
  const [comboBoxKeyValue, setComboBoxKeyValues] = useState<any>({});

  const DeleteObjects = (key: number) => {
    setData((prev: any[]) =>
      prev.filter((_obj, index) => {
        return index !== key;
      })
    );
  };

  const [formData, setFormData] = useState<any>({});
  // Function to handle input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    label: string
  ) => {
    setFormData({ ...formData, [label]: e.target.value });
  };

  const EditObjects = (formData: any, index: any) => {
    setData((prev: any[]) =>
      prev.map((obj, idx) => {
        if (idx === index) {
          // Update the data of the object at the specified index
          return { ...obj, ...formData, ...comboBoxKeyValue };
        } else {
          // Return the original object for other indexes
          return obj;
        }
      })
    );
  };
  const handleInputChangeComboBox = (value: string, label: string) => {
    setComboBoxKeyValues((prev: any) => {
      return { ...prev, [label]: value };
    });
  };
  return (
    <div>
      {showData === true ? (
        <div className="p-2  bg-[#FFFFFF] border border-[#FFFFFF] rounded-xl drop-shadow-md">
          <div className="xl:grid xl:grid-cols-2 flex flex-wrap">
            <div className={` ${data.medication_name ? "" : "invisible"}`}>
              <p className="font-bold text-lg text-[#333333]">
                {data.medication_name}
              </p>
            </div>
            <div className="grid grid-cols-5">
              <div
                className={`grid xl:grid-cols-2 md:flex-col md:flex-wrap  col-span-4 gap-3`}
              >
                <div
                  className={`flex gap-2  object-center ${
                    data.prescriber ? "" : "invisible"
                  } `}
                >
                  <div className="self-center">
                    <p className="font-semibold text-xs text-wrap  text-[#7C8492] ">
                      Prescriber
                    </p>
                  </div>

                  <CapsuleLable text={data.prescriber} />
                </div>

                <div
                  className={`flex gap-2   ${
                    data.related_conditions ? "" : "invisible"
                  }`}
                >
                  <div className="self-center">
                    <p className="font-semibold text-xs text-nowrap  text-[#7C8492]">
                      Related Conditions
                    </p>
                  </div>
                  <CapsuleLable text={data.related_conditions} className={""} />
                </div>
              </div>
              <div className="flex justify-end">
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
                      <DialogTitle>Medications</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      {[
                        {
                          label: "Medication Name",
                          value: "medication_name",
                          data: data.medication_name,
                          type: "comboBox",
                          doctype: "Medication",
                          placeholder: "select Medication",
                        },
                        {
                          label: "Prescriber",
                          value: "prescriber",
                          data: data.prescriber,
                          type: "text",
                        },
                        {
                          label: "Related Conditions",
                          value: "related_conditions",
                          data: data.related_conditions,
                          type: "comboBox",
                          doctype: "Diagnosis",
                          placeholder: "select Related Conditions",
                        },
                        {
                          label: "Dosage",
                          value: "dosage",
                          data: data.dosage,
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
                              onChange={(e) => handleInputChange(e, val.value)}
                              defaultValue={val.data}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button
                          type="submit"
                          onClick={() => EditObjects(formData, index)}
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
          </div>

          <p
            className={`font-semibold text-sm text-[#474747] ${
              data.dosage ? "" : "invisible"
            }`}
          >
            <span className="text-[#FF6161]">*</span> {data.dosage}
          </p>
        </div>
      ) : (
        <DialogWithInput
          AddNewData={addData}
          dialogTitle="Medications"
          classname="w-full"
          inputLabel={[
            {
              label: "Medication Name",
              value: "medication_name",
              type: "comboBox",
              doctype: "Medication",
              placeholder: "select Medicaltion",
            },
            { label: "Prescriber", value: "prescriber", type: "text" },
            {
              label: "Related Conditions",
              value: "related_conditions",
              type: "comboBox",
              doctype: "Diagnosis",
              placeholder: "select Related Conditions",
            },
            { label: "Dosage", value: "dosage", type: "text" },
          ]}
        />
      )}
    </div>
  );
};

export default MedicationsCard;
