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
import { Label } from "@/components/ui/label";
import { DeleteCardButton, EditCardButton } from "@/constants/images";
import { useState } from "react";
import { useForm } from "react-hook-form";
import PatientRelationDialogWithInput from "../CustomDialogBox/PatientRelationDialogWithInput";
import ComboboxDropDown from "../comboBoxDropDown";

const PatientRelationCard = ({
  showData,
  data,
  index,
  addData,
  setData,
  linkTitle
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
          return { ...obj, ...getValues(),...comboBoxKeyValue };
        } else {
          // Return the original object for other indexes
          return obj;
        } 
      })
    );
  };
  const [comboBoxKeyValue,setComboBoxKeyValues] = useState<any>({})
  const handleInputChangeComboBox = (value: any, label: string) => {
    setComboBoxKeyValues((prev:any) => {
      return { ...prev, [label]: value.value,patientName:value.label };
    });
  };
  const { register, getValues } = useForm();

  return (
    <div>
      {showData === true ? (
        <div
          className={`border-2 border-[#D4D6DD] rounded-xl   border-t-8  h-24 bg-[#FFFFFF] drop-shadow-md `}
        >
          <div className="flex justify-around  gap-3 px-2">
            <div>
              <p className={`font-bold text-base`}>{data.patientName?data.patientName:linkTitle[`Patient::${data.patient}`]}</p>
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
                    <DialogTitle>Patient Relation</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    {[
                      { label: "Patient", value: "patient",data:data.patientName?data.patientName:linkTitle[`Patient::${data.patient}`],type:"comboBox",doctype:"Patient",displayValue:"label",placeholder:"select Patient" },
                      { label: "Relation", value: "relation",data:data.relation,type:"comboBox",doctype:"Relative",staticValue:[{value:"Father"},{value:"Mother"},{value:"Spouse"},{value:"Sibilings"},{value:"Family"},{value:"Others"}],placeholder:"select Relation" },
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
                              placeholder="select Medication"
                              label={val.value}
                              handleInputChange={handleInputChangeComboBox}
                              doctype={val.doctype}
                              dataValue={val.data}
                              staticValue={val.staticValue}
                              sendObject
                              displayValue = {val.displayValue?val.displayValue:"value"}
                            />
                          </div>
                        )}
                        {val.type === "text" && (
                        <Input
                          type={val.type}
                          className="col-span-3"
                          defaultValue={val.data}
                          {...register(val.value)}
                        />)}
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
          <p className="ml-4 font-bold text-lg text-[#333333] ">
            {data.relation}
          </p>
        </div>
      ) : (
        <PatientRelationDialogWithInput
            dialogTitle="Patient Relation"
            AddNewData={addData}
            inputLabel={[
              { label: "Patient", value: "patient",type:"comboBox",doctype:"Patient",displayValue:"label",sendObject:true,placeholder:"select a Patient" },
              { label: "Relation", value: "relation",type:"comboBox",doctype:"Relative",sendObject:true,staticValue:[{value:"Father"},{value:"Mother"},{value:"Spouse"},{value:"Sibilings"},{value:"Family"},{value:"Others"}],placeholder:"select a Relation" },
            ]} classname={undefined}
            />
      )}
    </div>
  );
};

export default PatientRelationCard;
