import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import type { MultipleColumnFilter } from "@/types";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Checkbox } from "../ui/checkbox";
import { useEffect } from "react";

const MultipleColumnFilter = ({
  triggerButton,
  onOpen,
  open,
  columnData,
  keyMapping = {},
  setFilter,
  getFilter,
}: MultipleColumnFilter) => {
  const changeCheckboxFilter = (check: any, item: any) => {
    if (check) {
      setFilter((prev: any) => {
        if (!prev[item.key]) {
          return { ...prev, [item.key]: [item.name] };
        } else {
          return { ...prev, [item.key]: [...prev[item.key], item.name] };
        }
      });
    } else {
      setFilter((prev: any) => {
        if (!prev[item.key]) return prev; // if key does not exist, return the previous state

        const newArray = prev[item.key].filter(
          (name: string) => name !== item.name
        );

        if (newArray.length === 0) {
          const { [item.key]: _, ...rest } = prev;
          return rest;
        } else {
          return { ...prev, [item.key]: newArray };
        }
      });
    }
  };
  useEffect(()=>{
    console.log("getFilter",getFilter)
  },[getFilter])
  return (
    <DropdownMenu onOpenChange={onOpen} open={open}>
      <DropdownMenuTrigger>{triggerButton}</DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="rounded-xl bg-white border-2 border-[#C7CBF1]"
      >
        <div className=" p-4 flex gap-5  xl:flex-row flex-col max-h-[calc(100vh-15rem)] overflow-auto">
          {Object.keys(columnData).map((outerItem: string, idx: number) => {
            return (
              <div key={idx} className="gap-3 flex">
                <div className="space-y-2 ">
                  <Label className="text-[#474747] font-bold text-base">
                    {outerItem}
                  </Label>
                  {columnData[outerItem].map((innerItem: any, idx: number) => {
                    return (
                      <div key={idx} className="flex gap-2 items-center">
                        <Checkbox
                          defaultChecked={getFilter[innerItem.key]?.includes(
                            innerItem.name
                          )}
                          onCheckedChange={(check) =>
                            changeCheckboxFilter(check, innerItem)
                          }
                        />
                        <Label className="text-[#474747] text-base">
                          {Object.keys(keyMapping).includes(outerItem)
                            ? innerItem[keyMapping[outerItem]]
                            : innerItem.name}
                        </Label>
                      </div>
                    );
                  })}
                </div>
                {Object.keys(columnData).length !== idx + 1 && (
                  <Separator
                    orientation="vertical"
                    className={`border-[#DADADA] border-[0.1rem] xl:visible invisible`} 
                  />
                )}
              </div>
            );
          })}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MultipleColumnFilter;
