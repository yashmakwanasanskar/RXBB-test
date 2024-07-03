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
import { Label, LabelSMResponsive } from "@/components/ui/label";
import API, { BASE_URL } from "@/constants/api.constant";
import { addIcon } from "@/constants/images";
import { axiosPOSTAPI } from "@/helpers/commonAPI";
import Cookies from "js-cookie";
import { useState } from "react";
import DynamicRadioButton from "../DynamicRadioButton";
import ComboboxDropDown from "../comboBoxDropDown";

const DialogWithRadioEmployeeHousing = ({ AddNewData, dialogTitle }: any) => {
  const [selectYesNo, setSelectYesNo] = useState("yes");
  const [question,setQuestion] = useState<string>("");
  const [answer,setAnswer] = useState<string>("");
  const onSubmit = () => {
    AddNewData({ question:question,answer:answer, yes_no: selectYesNo,...comboBoxKeyValues });
  };
  const handleInputChangeComboBox = (value: string, label: string) => {

    // const option = {options:{doctype:"Environmental Answer",docname:value,field:"answer"}}
    setComboBoxKeyValues((prev:any) => {
      return { ...prev, [label]: value };
    });
    const getFromSearchList = async (doctype:string,docname:string,field:string,setter:any)=>{
      const URL = BASE_URL + API.VALIDATAED_SEARCH_DROPDOWN_LIST  
      const response = await axiosPOSTAPI(URL,{doctype:doctype,docname:docname,fields:`["${field}"]`},{headers:{ Authorization: Cookies.get("Authorization"),"Content-Type": "multipart/form-data"}})
      setter(response.data.message[field])
    }
    if(label === "options"){
      getFromSearchList("Environmental Answer",value,"answer",setAnswer)
    }
    else if(label === "question_tag"){
      getFromSearchList("Environmental Question",value,"question",setQuestion)

    }
  };
  const [comboBoxKeyValues,setComboBoxKeyValues] = useState<any>()
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="border border-[#BFC1C8] border-dashed rounded-xl h-24 flex justify-center bg-[#FFFFFF] drop-shadow-md cursor-pointer">
          <img src={addIcon.path} alt={addIcon.alt} width={34} height={34} />
        </div>
      </DialogTrigger>
      <DialogContent className="min-w-max">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
        </DialogHeader>
        <div className="gap-4 py-4 space-y-2">
          <div className=" items-center space-y-1">
            <Label htmlFor="name" className="text-right">
              Question Tag
            </Label>
            <div className="col-span-3">
              <ComboboxDropDown
                label={"question_tag"}
                handleInputChange={handleInputChangeComboBox}
                doctype={"Environmental Question"}
                placeholder="select a Question Tag"
              />
            </div>
          </div>
          <div className=" items-center space-y-1">
            <Label htmlFor="name" className="text-right">
              Question
            </Label>
            <Input id="name" className="col-span-3" value={question} />
          </div>
          <div className="space-y-1 items-center gap-4">
            <Label htmlFor="username" className="text-right"></Label>
            <LabelSMResponsive className="">Yes/No</LabelSMResponsive>
            <DynamicRadioButton
              data={[
                { label: "Yes", value: "Yes" },
                { label: "No", value: "No" },
              ]}
              defaultValue={"no"}
              setButtonSelection={setSelectYesNo}
              getButtonSelection={selectYesNo}
            />
          </div>
          <div className=" items-center space-y-1">
            <Label htmlFor="name" className="text-right">
              Options
            </Label>
            <div className="col-span-3">
              <ComboboxDropDown
                placeholder="select a Answer Tag"
                label={"options"}
                handleInputChange={handleInputChangeComboBox}
                doctype={"Environmental Answer"}
              />
            </div>
            <div className="items-center space-y-1 col-span-2">
              <Label htmlFor="name" className="text-right">
                Answer
              </Label>
              <Input id="name" className="col-span-3 " value={answer}/>
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

export default DialogWithRadioEmployeeHousing;
