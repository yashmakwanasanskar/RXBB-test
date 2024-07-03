import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import {
  ClearCustomFilterIcons,
  ClearRowCustomFilterIcons,
  addIcon,
} from "@/constants/images";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import ComboboxDemo from "./combobox";
import ComboboxDropDown from "./comboBoxDropDown";
import { useEffect, useState } from "react";
import API, { BASE_URL } from "@/constants/api.constant";
import { axiosPOSTAPI } from "@/helpers/commonAPI";
import { DatePickerWithRange } from "../ui/date-range";
import { convertDateFormat } from "@/utilities/utils";
import {
  AppointmentStatusFieldData,
  ISFieldStatusData,
  timeStampData,
} from "@/constants/fields";
import { Checkbox } from "../ui/checkbox";

const CustomFilter = ({
  onOpen,
  open,
  filter,
  setFilter,
  filterColumns,
  filterFieldState,
  setFilterFieldState,
  headingChild,
  triggerButton
}: any) => {
  useEffect(() => {
    console.log(
      "filter",
      filter,
      filterFieldState.map((item: any) => item.selected)
    );
  }, [filter, filterFieldState]);
  const [getFiscalData, setFiscalData] = useState<any>();
  useEffect(() => {
    const fetchData = async () => {
      const URL = BASE_URL + API.SELECT_FISCAL_YEAR;
      const response = await axiosPOSTAPI(URL, {});
      if (response.status === 200) {
        setFiscalData(response.data.message.options);
      }
    };
    fetchData();
  }, []);
  const addRow = () => {
    setFilter((prev: any[]) => {
      return [...prev, [filterColumns[0].value, "", ""]];
    });
    setFilterFieldState((prev: any[]) => {
      return [...prev, filterColumns[0]];
    });
  };

  const removeAllRow = () => {
    setFilter([]);
    setFilterFieldState([]);
  };
  const removeOneRow = (index: number) => {
    setFilterFieldState((prev: any) =>
      prev.filter((_: any, inx: number) => index !== inx)
    );
    setFilter((prev: any) =>
      prev.filter((_: any, inx: number) => index !== inx)
    );
  };
  const handleInputChangeComboBox = (
    object: any,
    label: any,
    index: number,
    position: number
  ) => {
    if (position === 0) {
      // Update filter state immutably
      setFilter((prev: string[][]) => {
        const newFilter = [...prev]; // Create a new array
        newFilter[index] = [...newFilter[index]]; // Create a new sub-array
        newFilter[index][position] = object.value; // Update the value
        return newFilter; // Return the new array
      });

      // Update filterFieldState immutably
      setFilterFieldState((prev: any) => {
        const newFilterFieldState = [...prev]; // Create a new array
        newFilterFieldState[index] = object; // Update the object at the specified index
        return newFilterFieldState; // Return the new array
      });
    }
    if (position === 1) {
      // Update filterFieldState immutably
      setFilterFieldState((prev: any) => {
        const newFilterFieldState = [...prev]; // Create a new array
        newFilterFieldState[index] = { ...newFilterFieldState[index] }; // Create a new sub-array
        newFilterFieldState[index].selected = object.label; // Update the object at the specified index
        return newFilterFieldState; // Return the new array
      });
      setFilter((prev: any) => {
        const newFilter = [...prev]; // Create a new array
        newFilter[index] = [...newFilter[index]]; // Create a new sub-array
        newFilter[index][position] = object.value; // Update the value

        return newFilter; // Return the new array
      });
    }
    if (position === 2) {
      console.log(object, label, index, position);
      setFilter((prev: any) => {
        const newFilter = [...prev]; // Create a new array
        newFilter[0] = [...newFilter[0]]; // Create a new sub-array
        newFilter[0][2] = object; // Update the value
        return newFilter; // Return the new array
      });
    }
  };
  return (
      <DropdownMenu onOpenChange={onOpen} open={open}>
        <DropdownMenuTrigger >{triggerButton}</DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-[#F6F9FD]">
          <div className=" min-w-[35vw]">
            {headingChild}

            <Separator orientation="horizontal" />

            <div className="p-2 h-40 overflow-auto">
              {filter.map((item: any, index: number) => {
                return (
                  <div
                    className="flex gap-3 items-top justify-around space-y-1"
                    key={index}
                  >
                    <div className="pt-3">
                      <Label className="text-[#303348] text-sm font-medium ">
                        Where
                      </Label>
                    </div>
                    <div className="grid grid-cols-3 w-full gap-3">
                      <ComboboxDropDown
                        placeholder="select Column"
                        staticValue={filterColumns}
                        handleInputChange={(object: any, label: string) =>
                          handleInputChangeComboBox(object, label, index, 0)
                        }
                        label="field_name"
                        displayValue="label"
                        dataValue={
                          (filter &&
                            filter[index][0] &&
                            filterColumns.filter(
                              (item: any) => item.value == filter[index][0]
                            )[0]?.label) ||
                          filterColumns[0].label
                        }
                        sendObject
                      />

                      <ComboboxDropDown
                        placeholder="Select Operator"
                        staticValue={filterFieldState[index].operations}
                        handleInputChange={(object: any, label: string) =>
                          handleInputChangeComboBox(object, label, index, 1)
                        }
                        label="custom_payment_type"
                        displayValue="label"
                        sendObject
                        dataValue={
                          filterFieldState[index]
                            ? filterFieldState[index].selected
                            : ""
                        }
                      />
                      <div className="space-y-1">
                        {filterFieldState[index].doctype &&
                          ["combobox"].includes(filterFieldState[index].type) &&
                          ["Equals", "Not Equal"].includes(
                            filterFieldState[index].selected
                          ) && (
                            <ComboboxDropDown
                              placeholder="select Column"
                              handleInputChange={(value: any, label: string) =>
                                handleInputChangeComboBox(
                                  value,
                                  label,
                                  index,
                                  2
                                )
                              }
                              doctype={filterFieldState[index].doctype}
                              label="third_column"
                              dataValue={filter[index][2]}
                            />
                          )}
                        {["date"].includes(filterFieldState[index].type) &&
                          ["Between"].includes(
                            filterFieldState[index].selected
                          ) && (
                            <DatePickerWithRange
                              handleInputChanges={(e: any) => {
                                handleInputChangeComboBox(
                                  [
                                    convertDateFormat(e.from),
                                    convertDateFormat(e.to),
                                  ],
                                  "",
                                  index,
                                  2
                                );
                              }}
                            />
                          )}

                        {["Like", "Not Like", "In", "Not In"].includes(
                          filterFieldState[index].selected
                        ) &&
                          ["text", "combobox", "Date", "status"].includes(
                            filterFieldState[index].type
                          ) && (
                            <Input
                              type="text"
                              onChange={(e: any) =>
                                handleInputChangeComboBox(
                                  ["In", "Not In"].includes(
                                    filterFieldState[index].selected
                                  )
                                    ? e.target.value.split(",")
                                    : `%${e.target.value}%`,
                                  "",
                                  index,
                                  2
                                )
                              }
                              defaultValue={filter[index][2]}
                            />
                          )}

                        {["Equals", "Not Equal", ">", "<", ">=", "<="].includes(
                          filterFieldState[index].selected
                        ) &&
                          ["text"].includes(filterFieldState[index].type) && (
                            <Input
                              type="text"
                              onChange={(e: any) =>
                                handleInputChangeComboBox(
                                  e.target.value,
                                  "",
                                  index,
                                  2
                                )
                              }
                              defaultValue={filter[index][2]}
                            />
                          )}

                        {["Is"].includes(filterFieldState[index].selected) && (
                          <ComboboxDropDown
                            placeholder="select value"
                            handleInputChange={(value: any, label: string) =>
                              handleInputChangeComboBox(value, label, index, 2)
                            }
                            doctype={filterFieldState[index].doctype}
                            label="third_column"
                            staticValue={ISFieldStatusData}
                            dataValue={filter[index][2]}
                          />
                        )}
                        {["Timespan"].includes(
                          filterFieldState[index].selected
                        ) && (
                          <ComboboxDropDown
                            placeholder="select TimeSpan"
                            handleInputChange={(value: any, label: string) => {
                              handleInputChangeComboBox(value, label, index, 2);
                            }}
                            label="third_column"
                            staticValue={timeStampData}
                            displayValue="label"
                            dataValue={filter[index][2]}
                          />
                        )}

                        {["Fiscal Year"].includes(
                          filterFieldState[index].selected
                        ) && (
                          <ComboboxDropDown
                            placeholder="select Year"
                            handleInputChange={(value: any, label: string) =>
                              handleInputChangeComboBox(value, label, index, 2)
                            }
                            doctype={filterFieldState[index].doctype}
                            label="third_column"
                            staticValue={getFiscalData}
                            dataValue={filter[index][2]}
                          />
                        )}

                        {["Like", "Not Like"].includes(
                          filterFieldState[index].selected
                        ) && (
                          <p className="text-[#303348]  text-xs">
                            use % as WildCard
                          </p>
                        )}

                        {["In", "Not In"].includes(
                          filterFieldState[index].selected
                        ) && (
                          <p className="text-[#303348]  text-xs">
                            Values separated by Commas
                          </p>
                        )}

                        {["Equals", "Not Equal", ">", "<", ">=", "<="].includes(
                          filterFieldState[index].selected
                        ) &&
                          filterFieldState[index].type === "date" && (
                            <Input
                              type="date"
                              onChange={(e: any) =>
                                handleInputChangeComboBox(
                                  e.target.value,
                                  "",
                                  index,
                                  2
                                )
                              }
                              defaultValue={filter[index][2]}
                            />
                          )}

                        {["Equals", "Not Equal", ">", "<", ">=", "<="].includes(
                          filterFieldState[index].selected
                        ) &&
                          filterFieldState[index].type === "status" && (
                            <ComboboxDropDown
                              placeholder="select Status"
                              handleInputChange={(value: any, label: string) =>
                                handleInputChangeComboBox(
                                  value,
                                  label,
                                  index,
                                  2
                                )
                              }
                              label="third_column"
                              staticValue={AppointmentStatusFieldData}
                              dataValue={filter[index][2]}
                            />
                          )}
                      </div>
                    </div>
                    <Button
                      className="rounded-full p-3 border-[#D4D6DD]"
                      variant={"outline"}
                      onClick={() => removeOneRow(index)}
                    >
                      <img
                        src={ClearRowCustomFilterIcons.path}
                        alt={ClearRowCustomFilterIcons.alt}
                        className="w-4 h-4 min-h-4 min-w-4"
                      />
                    </Button>
                  </div>
                );
              })}
            </div>
            <Separator orientation="horizontal" />
            <div className="flex justify-between items-center space-x-4 p-2">
              <Button
                variant="outline"
                className="items-center space-x-1 border-[#D4D6DD]"
                onClick={() => addRow()}
              >
                <img
                  src={addIcon.path}
                  alt={addIcon.alt}
                  className="w-6 h-6 min-h-4 min-w-4 "
                />
                <span className="text-[#303348] text-xs">Add Filter</span>
              </Button>
              <div
                className="flex items-center space-x-2 p-2"
                onClick={() => removeAllRow()}
              >
                {/* <Button variant="outline" className="flex items-center space-x-2"> */}

                <img
                  src={ClearCustomFilterIcons.path}
                  alt={ClearCustomFilterIcons.alt}
                  className="w-6 h-6 min-h-4 min-w-4"
                />
                <Label className="text-[#303348]  text-xs">
                  Clear All Filters
                </Label>
                {/* </Button> */}
              </div>
            </div>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
  );
};
export default CustomFilter;
