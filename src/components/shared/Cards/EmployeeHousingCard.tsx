import CapsuleLable from "@/components/shared/CapsuleLable";
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
import { DeleteCardButton, EditCardButton } from "@/constants/images";
import { axiosPOSTAPI } from "@/helpers/commonAPI";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import DialogWithRadioEmployeeHousing from "../CustomDialogBox/DialogWithRadioEmployeeHousing";
import DynamicRadioButton from "../DynamicRadioButton";
import ComboboxDropDown from "../comboBoxDropDown";

const EmployeeHousingCard = ({
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
  const DeleteObjects = (key: number) => {
    setData((prev: any[]) =>
      prev.filter((_obj, index) => {
        return index !== key;
      })
    );
  };
  const [selectYesNo, setSelectYesNo] = useState("yes");
  const { register } = useForm();
  // Function to handle input changes
  // const handleInputChange = (
  //   e: React.ChangeEvent<HTMLInputElement>,
  //   label: string
  // ) => {
  //   setFormData({ ...formData, [label]: e.target.value });
  // };
  
  const EditObjects = (index: any) => {
    setData((prev: any[]) =>
      prev.map((obj, idx) => {
        if (idx === index) {
          // Update the data of the object at the specified index
          return { ...obj, question:question,answer:answer,yes_no: selectYesNo,...comboBoxKeyValues};
        } else {
          // Return the original object for other indexes
          return obj;
        }
      })
    );
  };

  useEffect(()=>{
    if(showData===true){
      setSelectYesNo(data.yes_no)
      setAnswer(data.answer)
      setQuestion(data.question)
    }
  },[data,showData])
  
  const [question,setQuestion] = useState<string>("");
  const [answer,setAnswer] = useState<string>("");
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
    <div>
      {showData === true ? (
        <div className="p-2  bg-[#FFFFFF] border border-[#FFFFFF] rounded-xl drop-shadow-md">
          <div className="flex justify-between">
            <div>
              <p className="font-bold text-lg text-[#333333]">
                {data.question_tag}
              </p>
            </div>

            <div className="flex">
              <p className="font-semibold text-base mr-2 text-[#7C8492]">
                {data.question}
              </p>
              <CapsuleLable text={data.yes_no} />

              <div className="w-10" />

              <p className="font-semibold text-base mr-2 text-[#7C8492]">
                Answer
              </p>
              <CapsuleLable text={data.answer} />
            </div>
            <div className="flex">
              <Dialog>
                <DialogTrigger asChild>
                  <img
                    src={EditCardButton.path}
                    alt={EditCardButton.alt}
                    width={15}
                    height={20}
                    className="sm:mr-2 hover:cursor-pointer"

                  />
                </DialogTrigger>
                <DialogContent className="min-w-max">
                  <DialogHeader>
                    <DialogTitle>Diagnostics</DialogTitle>
                  </DialogHeader>
                  <div className="gap-4 py-4 space-y-2">
                    <div className=" items-center space-y-1">
                      <Label htmlFor="name" className="text-right">
                        Question Tag
                      </Label>

                      <div className="col-span-3">
                        <ComboboxDropDown
                          placeholder="select a Question tag"
                          label={"question_tag"}
                          handleInputChange={handleInputChangeComboBox}
                          doctype={"Environmental Question"}
                          dataValue= {data.question_tag}
                        />
                      </div>
                    </div>
                    <div className=" items-center space-y-1">
                      <Label htmlFor="name" className="text-right">
                        Question
                      </Label>
                      <Input
                        id="name"
                        className="col-span-3"
                        {...register("question")}
                        // defaultValue={data.question}
                        value={question}
                      />
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
                          placeholder="select a Answer tag"
                          label={"options"}
                          handleInputChange={handleInputChangeComboBox}
                          doctype={"Environmental Answer"}
                          dataValue={data.options}
                        />
                      </div>
                      <div className="items-center space-y-1 col-span-2">
                        <Label htmlFor="name" className="text-right">
                          Answer
                        </Label>
                        <Input
                          id="name"
                          className="col-span-3"
                          {...register("answer")}
                          // defaultValue={data.answer}
                          value={answer}
                        />
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
        </div>
      ) : (
        <DialogWithRadioEmployeeHousing
          AddNewData={addData}
          dialogTitle="Employee,Housing & Transportaion"
          inputLabel={[
            { label: "Medication Name", value: "question_tag",placeholder:"select a Question Tag" },
            { label: "Prescriber", value: "question" },
            { label: "Yes or No", value: "yes_no" },
            { label: "Answer", value: "answer",placeholder:"select a Question Tag" },
          ]}
        />
      )}
    </div>
  );
};

export default EmployeeHousingCard;
