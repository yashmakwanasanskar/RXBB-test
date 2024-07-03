import { addIcon } from "@/constants/images";
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
import { useState } from "react";
import ComboboxDropDown from "../comboBoxDropDown";

const PatientRelationDialogWithInput = ({
  AddNewData,
  dialogTitle,
  inputLabel,
  classname,
}: {
  AddNewData: any;
  dialogTitle: any;
  inputLabel: any;
  classname: any;
}) => {
  const [formData, setFormData] = useState<any>({});
  // Function to handle input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    label: string
  ) => {
    setFormData({ ...formData, [label]: e.target.value });
  };

  const handleInputChangeComboBox = (value: any, label: string) => {
    if(value.label){

        setFormData({ ...formData, [label]: value.value,patientName:value.label });
    }
    else{
        setFormData({ ...formData, [label]: value.value });
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          className={`border border-[#BFC1C8] border-dashed rounded-xl h-24 w-24 flex justify-center bg-[#FFFFFF] drop-shadow-md cursor-pointer ${classname}`}
        >
          <img src={addIcon.path} alt={addIcon.alt} width={34} height={34} />
        </div>
      </DialogTrigger>
      <DialogContent className="min-w-max">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4 col">
          {inputLabel.map((val: any, index: any) => (
            <div className="grid grid-cols-4 items-center gap-4" key={index}>
              <Label htmlFor="name" className="text-left">
                {val.label}
              </Label>
              {val.type === "comboBox" && (
                <div className="col-span-3">
                  <ComboboxDropDown
                    placeholder={val.placeholder}
                    label={val.value}
                    handleInputChange={handleInputChangeComboBox}
                    doctype={val.doctype}
                    staticValue = {val.staticValue}
                    sendObject = {val.sendObject}
                    displayValue = {val.displayValue?val.displayValue:"value"}
                  />
                </div>
              )}
              {val.type === "text" && (
                <Input
                  type={val.type}
                  className="col-span-3"
                  onChange={(e) => handleInputChange(e, val.value)}
                />
              )}
            </div>
          ))}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="submit"
              onClick={() => {
                AddNewData(formData)}}
              className="bg-[#7ACFFF]"
            >
              Save
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PatientRelationDialogWithInput;
