import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";

import { Dialog } from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { dropdownList } from "@/helpers/commonAPI";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Label } from "../ui/label";
import AddPatientModal from "./modals/add-patient";
import { userInfo } from "os";

export default function ComboboxDropDown({
  doctype = "Medication",
  buttonClassName = "",
  popOverClassName = "",
  icon = "",
  placeholder = "",
  label = "",
  handleInputChange,
  setComboBoxValue,
  staticValue,
  dataValue,
  sendObject = false,
  displayValue = "value",
  outputValue = "value",
  addEntity = null,
  description = null,
  disabled = false,
  doctypeFilter = undefined,
  multiple = false,
  referenceDoctype = undefined,
  optionsSelected = [],
}: any) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(dataValue ? dataValue : "");
  const [data, setData] = useState<any>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(()=>{
    setValue(dataValue)
  },[dataValue])
  
  useEffect(() => {

    const fetchData = async () => {
      const response = await dropdownList(
        searchTerm,
        doctype,
        referenceDoctype,
        doctypeFilter
      );
      if (multiple) {
        setData(
          response.filter(
            (item: any) => !optionsSelected.includes(item[displayValue])
          )
        );
        setValue("");
      } else {
        setData(response);
      }
    };
    if (staticValue) {
      if (multiple) {
        setData(
          staticValue.filter(
            (item: any) => !optionsSelected.includes(item[displayValue])
          )
        );
      } else {
        setData(staticValue);
      }
    } else {
      fetchData();
    }
  }, [searchTerm, doctype, staticValue, value, open]);

  useEffect(() => {
    if (data.length > 0 && handleInputChange) {
      const initialObject = data.filter((item: any) => {
        return item[displayValue] === value;
      });
      if (initialObject.length > 0) {
        handleInputChange(
          sendObject === true
            ? initialObject[0]
            : initialObject[0][outputValue],
          label
        );
      }
    }
  }, [data]);

  useEffect(() => {
    setSearchTerm("");
  }, [open]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="relative">
          {icon && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3  pointer-events-none">
              <img
                src={icon}
                alt="Input Icon"
                width={24}
                height={24}
                className="w-5 h-5"
              />
            </div>
          )}
          <div className="w-full">
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              onClick={(e) => {
                if (disabled) {
                  e.stopPropagation();
                }
              }}
              className={`${
                icon && "pl-10"
              }  justify-between text-[#7E7E7E] xl:text-sm text-xs w-full min-w-fit ${buttonClassName}`}
            >
              {value ? value : placeholder ? placeholder : "Select a Form"}
              {/* {value} */}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent align="start" className={` p-0 ${popOverClassName} `}>
        <Command>
          <CommandInput
            className=" xl:text-sm text-xs  "
            placeholder="Search..."
            onValueChange={(val) => setSearchTerm(val)}
            // onValueChange={(val)=>()}
          />
          <CommandEmpty className=" xl:text-sm text-xs">Not Found</CommandEmpty>
          <CommandGroup className="max-h-[20rem] overflow-auto">
            {data.map((item: any) => {
              return (
                <CommandItem
                  className=" xl:text-sm text-xs"
                  key={item.value}
                  value={item[displayValue]}
                  onSelect={(currentValue) => {
                    const newValue =
                      currentValue === value
                        ? ""
                        : data.find(
                            (val: any) =>
                              val[displayValue].toLowerCase() === currentValue
                          )[displayValue];
                    setValue(newValue);
                    handleInputChange &&
                      handleInputChange(
                        sendObject === true ? item : item[outputValue],
                        label
                      );
                    setComboBoxValue && setComboBoxValue(newValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === item[displayValue] ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <div className="flex flex-col gap-2">
                    <Label className="inline-block">{item[displayValue]}</Label>
                    {description && (
                      <Label className="inline-block font-normal">
                        {item[description]}
                      </Label>
                    )}
                  </div>
                </CommandItem>
              );
            })}
            {addEntity && (
              <CommandItem
                className=" xl:text-sm text-xs"
                onClickCapture={() => (window.location.href = addEntity.href)}
              >
                <Plus className="w-4 h-4 mr-2" />
                <Label className="font-semibold">{addEntity.name}</Label>
              </CommandItem>
            )}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export function ComboboxDropDownWithUseFormHook({
  doctype = "Medication",
  buttonClassName = "",
  popOverClassName = "",
  icon = "",
  placeholder = "",
  label = "",
  handleInputChange,
  setComboBoxValue,
  staticValue,
  dataValue,
  sendObject = false,
  displayValue = "value",
  outputValue = "value",
  addEntity = null,
  description = null,
  disabled = false,
  register,
  required = false,
  setValueForm,
  doctypeFilter = undefined,
  referenceDoctype = undefined,
  errors,
}: any) {
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [value, setValue] = useState(dataValue ? dataValue : "");
  const [data, setData] = useState<any>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(()=>{
    setValue(dataValue)
  },[dataValue])
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await dropdownList(
        searchTerm,
        doctype,
        referenceDoctype,
        doctypeFilter
      );
      setData(response);
    };
    if (staticValue) {
      setData(staticValue);
    } else {
      fetchData();
    }
    if (dataValue) {
      setValueForm(label, dataValue);
    }
  }, [searchTerm, doctype, staticValue, value, errors,open]);
  useEffect(() => {
    setSearchTerm("");
  }, [open]);
  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className="relative">
            {icon && (
              <div className="absolute inset-y-0 left-0 flex items-center pl-3  pointer-events-none">
                <img
                  src={icon}
                  alt="Input Icon"
                  width={24}
                  height={24}
                  className="w-5 h-5"
                />
              </div>
            )}
            <div className="w-full">
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                onClick={(e) => {
                  if (disabled) {
                    e.stopPropagation();
                  }
                }}
                {...(required
                  ? register(label, { required: true })
                  : register(label))}
                className={`${
                  icon && "pl-10"
                }  justify-between text-[#7E7E7E] xl:text-sm text-xs w-full min-w-fit ${buttonClassName} ${
                  errors[label] && "border-[#FF441B]"
                }`}
              >
                {value ? value : placeholder ? placeholder : "Select a Form"}
                {/* {value} */}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent className={` p-0 ${popOverClassName} `} align="start">
          <Command>
            <CommandInput
              className=" xl:text-sm text-xs  "
              placeholder="Search..."
              onValueChange={(val) => setSearchTerm(val)}
              // onValueChange={(val)=>()}
            />
            <CommandEmpty className=" xl:text-sm text-xs">
              {addEntity ? (
                <div
                  className=" xl:text-sm text-xs relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                  onClickCapture={() => {
                    false;
                    setOpenModal(true);
                  }}
                >
                  <div className="flex w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    <Label className="font-semibold">{addEntity.name}</Label>
                  </div>
                </div>
              ) : (
                "Not Found"
              )}
            </CommandEmpty>
            <CommandGroup className="max-h-[20rem] overflow-auto">
              {data.map((item: any) => {
                return (
                  <CommandItem
                    className={` xl:text-sm text-xs }`}
                    key={item.value}
                    value={item[displayValue]}
                    onSelect={(currentValue) => {
                      const newValue =
                        currentValue === value
                          ? ""
                          : data.find(
                              (val: any) =>
                                val[displayValue].toLowerCase() === currentValue
                            )[displayValue];
                      setValue(newValue);
                      setValueForm(label, item[outputValue]);
                      handleInputChange &&
                        handleInputChange(
                          sendObject === true ? item : item[outputValue],
                          label
                        );
                      setComboBoxValue && setComboBoxValue(newValue);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === item[displayValue]
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    <div className="flex flex-col gap-2">
                      <Label className="inline-block">
                        {item[displayValue]}
                      </Label>
                      {description && (
                        <Label className="inline-block font-normal">
                          {item[description]}
                        </Label>
                      )}
                    </div>
                  </CommandItem>
                );
              })}
              {addEntity && (
                <CommandItem
                  className=" xl:text-sm text-xs"
                  onClickCapture={() => {
                    setOpen(false);
                    setOpenModal(true);
                  }}
                >
                  <div className="flex w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    <Label className="font-semibold">{addEntity.name}</Label>
                  </div>
                </CommandItem>
              )}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
      <Dialog open={openModal} onOpenChange={setOpenModal}>
        {/* <DialogContent className="max-w-[60vw]"> */}
        {/* {addEntity && addEntity.name && <AddPatientModal />} */}
        {/* <DialogFooter>
              <Button>
                Edit Form
              </Button>
              <Button>
                Save
              </Button>
          </DialogFooter>
        </DialogContent> */}
      </Dialog>
    </>
  );
}

export function ComboboxDropDownWithModifyStyle({
  doctype = "Medication",
  buttonClassName = "",
  popOverClassName = "",
  icon = "",
  placeholder = "",
  label = "",
  handleInputChange,
  setComboBoxValue,
  staticValue,
  dataValue,
  sendObject = false,
  displayValue = "value",
  outputValue = "value",
  addEntity = null,
  description = null,
  disabled = false,
  doctypeFilter = undefined,
  multiple = false,
  referenceDoctype = undefined,
  optionsSelected = [],
}: any) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(dataValue ? dataValue : "");
  const [data, setData] = useState<any>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(()=>{
    setValue(dataValue)
  },[dataValue])
  
  useEffect(() => {

    const fetchData = async () => {
      const response = await dropdownList(
        searchTerm,
        doctype,
        referenceDoctype,
        doctypeFilter
      );
      if (multiple) {
        setData(
          response.filter(
            (item: any) => !optionsSelected.includes(item[displayValue])
          )
        );
        setValue("");
      } else {
        setData(response);
      }
    };
    if (staticValue) {
      if (multiple) {
        setData(
          staticValue.filter(
            (item: any) => !optionsSelected.includes(item[displayValue])
          )
        );
      } else {
        setData(staticValue);
      }
    } else {
      fetchData();
    }
  }, [searchTerm, doctype, staticValue, value, open]);

  useEffect(() => {
    if (data.length > 0 && handleInputChange) {
      const initialObject = data.filter((item: any) => {
        return item[displayValue] === value;
      });
      if (initialObject.length > 0) {
        handleInputChange(
          sendObject === true
            ? initialObject[0]
            : initialObject[0][outputValue],
          label
        );
      }
    }
  }, [data]);

  useEffect(() => {
    setSearchTerm("");
  }, [open]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="relative">
          {icon && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3  pointer-events-none">
              <img
                src={icon}
                alt="Input Icon"
                width={24}
                height={24}
                className="w-5 h-5"
              />
            </div>
          )}
          <div className="w-full">
            <Button
              variant="selective"
              role="combobox"
              aria-expanded={open}
              onClick={(e) => {
                if (disabled) {
                  e.stopPropagation();
                }
              }}
              className={`${
                icon && "pl-10"
              }  justify-between text-[#00003C] font-normal xl:text-sm text-sm w-full min-w-fit focus-visible:!border-[#61CE70] h-[46px] ${buttonClassName}`}
            >
              {value ? value : placeholder ? placeholder : "Select a Form"}
              {/* {value} */}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent align="start" className={` p-0 ${popOverClassName} `}>
        <Command>
          <CommandInput
            className=" xl:text-sm text-xs  "
            placeholder="Search..."
            onValueChange={(val) => setSearchTerm(val)}
            // onValueChange={(val)=>()}
          />
          <CommandEmpty className=" xl:text-sm text-xs">Not Found</CommandEmpty>
          <CommandGroup className="max-h-[20rem] overflow-auto">
            {data.map((item: any) => {
              return (
                <CommandItem
                  className=" xl:text-sm text-xs"
                  key={item.value}
                  value={item[displayValue]}
                  onSelect={(currentValue) => {
                    const newValue =
                      currentValue === value
                        ? ""
                        : data.find(
                            (val: any) =>
                              val[displayValue].toLowerCase() === currentValue
                          )[displayValue];
                    setValue(newValue);
                    handleInputChange &&
                      handleInputChange(
                        sendObject === true ? item : item[outputValue],
                        label
                      );
                    setComboBoxValue && setComboBoxValue(newValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === item[displayValue] ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <div className="flex flex-col gap-2">
                    <Label className="inline-block">{item[displayValue]}</Label>
                    {description && (
                      <Label className="inline-block font-normal">
                        {item[description]}
                      </Label>
                    )}
                  </div>
                </CommandItem>
              );
            })}
            {addEntity && (
              <CommandItem
                className=" xl:text-sm text-xs"
                onClickCapture={() => (window.location.href = addEntity.href)}
              >
                <Plus className="w-4 h-4 mr-2" />
                <Label className="font-semibold">{addEntity.name}</Label>
              </CommandItem>
            )}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
