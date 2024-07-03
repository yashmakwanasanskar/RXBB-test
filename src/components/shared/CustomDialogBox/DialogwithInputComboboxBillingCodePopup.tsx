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
import API, { BASE_URL } from "@/constants/api.constant";
import { addIcon } from "@/constants/images";
import { axiosPOSTAPI } from "@/helpers/commonAPI";
import { useEffect, useState } from "react";
import ComboboxDropDown from "../comboBoxDropDown";

const DialogWithInputComboboxBillingCode = ({
  AddNewData,
  dialogTitle,
  inputLabel,
  classname,
  onOpen,
  open,
}: {
  AddNewData: any;
  dialogTitle: any;
  inputLabel: any;
  classname: any;
  open: any;
  onOpen: any;
}) => {
  const [formData, setFormData] = useState<any>({});

  // Function to handle input changes
  // const handleInputChange = (
  //   e: React.ChangeEvent<HTMLInputElement>,
  //   label: string
  // ) => {
  //   setFormData({ ...formData, [label]: e.target.value });
  // };

  const handleInputChangeComboBox = (value: string, label: string) => {
    setFormData({ ...formData, [label]: value });
  };
  const [selectDefinition, setDefinition] = useState<string>("");
  const [selectInputFieldData, setInputFieldData] = useState<any>({});
  const handleInputFieldData = (label:string,value:string) =>{
    setInputFieldData((prev:any)=>{
      return {...prev,[label]:value}
    })
  }
  const handleInputChangeComboBoxWithChangeInput = (
    value: string,
    label: string
  ) => {
    setFormData({ ...formData, [label]: value });

    const getFromSearchList = async (
      doctype: string,
      docname: string,
      field: any,
      dependantField: any,
      setter: any
    ) => {
      const URL = BASE_URL + API.VALIDATAED_SEARCH_DROPDOWN_LIST;
      const response = await axiosPOSTAPI(URL, {
        doctype: doctype,
        docname: docname,
        fields: `${JSON.stringify(field)}`,
      });
      dependantField.forEach((item: string, index: number) => {
        setter((prev: any) => {
          return { ...prev, [item]: response.data.message[field[index]] };
        });
      });
    };
    if (label === "item_code") {
      getFromSearchList(
        "Code Value",
        value,
        ["definition", "code_value"],
        ["definition", "item_name"],
        setInputFieldData
      );
    }
  };
  return (
    <Dialog onOpenChange={onOpen} open={open}>
      <DialogTrigger asChild></DialogTrigger>
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
                    handleInputChange={
                      val.dependValueChange
                        ? handleInputChangeComboBoxWithChangeInput
                        : handleInputChangeComboBox
                    }
                    doctype={val.doctype}
                    staticValue={val.staticValue}
                  />
                </div>
              )}
              {val.type === "text" &&
                (val.dependantValue ? (
                  <Input
                    type={val.type}
                    className="col-span-3"
                    // onChange={(e) => handleInputChange(e, val.value)}
                    value={selectInputFieldData[val.value]}
                  />
                ) : (
                  <Input
                    type={val.type}
                    className="col-span-3"
                    onChange={(e:any) => handleInputFieldData(val.value, e.target.value)}
                  />
                ))}
            </div>
          ))}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="submit"
              onClick={() =>
                AddNewData({ ...formData, ...selectInputFieldData })
              }
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

export default DialogWithInputComboboxBillingCode;
