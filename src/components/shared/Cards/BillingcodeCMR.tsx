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
import { DeleteCardButton, EditCardButton } from "@/constants/images";
import { useForm } from "react-hook-form";

import { Label } from "@/components/ui/label";
import API, { BASE_URL } from "@/constants/api.constant";
import { useState } from "react";
import ComboboxDropDown from "../comboBoxDropDown";

import { axiosPOSTAPI } from "@/helpers/commonAPI";
import DialogWithInputCombobox from "../CustomDialogBox/DialogWithInputComboboxForBillingCode";
const BillingCodeCMR = ({
  showData,
  data1,
  data2,
  index,
  setData,
  addData,
  inputLabel,
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
          return {
            ...obj,
            ...getValues(),
            ...comboBoxKeyValue,
            definition: selectDefinition,
          };
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

  const [selectDefinition, setDefinition] = useState<string>("");
  const handleInputChangeComboBoxWithChangeInput = (
    value: string,
    label: string
  ) => {
    setComboBoxKeyValues((prev: any) => {
      return { ...prev, [label]: value };
    });

    const getFromSearchList = async (
      doctype: string,
      docname: string,
      field: string,
      setter: any
    ) => {
      const URL = BASE_URL + API.VALIDATAED_SEARCH_DROPDOWN_LIST;
      const response = await axiosPOSTAPI(URL, {
        doctype: doctype,
        docname: docname,
        fields: `["${field}"]`,
      });
      setter(response.data.message[field]);
    };
    if (label === "item_code") {
      getFromSearchList("Code Value", value, "definition", setDefinition);
    }
  };

  const { getValues } = useForm();
  const [comboBoxKeyValue, setComboBoxKeyValues] = useState<any>({});
  return (
    <div>
      {showData === true ? (
        <div className="h-24 border border-[#D4D6DD] bg-[#FFFFFF] rounded-xl drop-shadow-md">
          <div className="m-3 font-bold text-lg flex justify-between">
            {data1}
            <div className="flex ml-2">
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
                <DialogContent className="">
                  <DialogHeader>
                    <DialogTitle>Medications</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    {inputLabel.map((val: any, index: any) => (
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
                              label={val.value}
                              handleInputChange={
                                val.dependValueChange
                                  ? handleInputChangeComboBoxWithChangeInput
                                  : handleInputChangeComboBox
                              }
                              doctype={val.doctype}
                              dataValue={val.data}
                              staticValue={val.staticValue}
                              placeholder={val.placeholder}
                            />
                          </div>
                        )}
                        {val.type === "text" && (
                          <Input
                            type={val.type}
                            className="col-span-3"
                            value={  selectDefinition || val.data }
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
          <div className="mx-3 my-4">
            <Label>{data2}</Label>
          </div>
        </div>
      ) : (
        <DialogWithInputCombobox
          dialogTitle="Medications"
          AddNewData={addData}
          inputLabel={inputLabel}
          classname={undefined}
        />
      )}
    </div>
  );
};

export default BillingCodeCMR;
