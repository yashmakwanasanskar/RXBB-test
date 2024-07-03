import { RoundedblueCheckbox } from "@/components/ui/checkbox";
import { ListStepProps, Step } from "@/types";
import React, { useContext, useEffect, useState } from "react";
import { LayoutContext } from "./LayoutContext";

// this component have two to disply either you can show checkbox by making progressCheckBox true
// other wise you have to pass icon on the steps list
export const Stepper: React.FC<ListStepProps> = ({
  steps,
  selectedStepper,
  setSelectedStepper,
  progressCheckBox = false,
  hideSideIcons = false,
}) => {
  const handleOptionClick = (option: any) => {
    setSelectedStepper(option);
    setVisitedStepper((prev) => [...prev, option]);
  };
  const [visitedSteper, setVisitedStepper] = useState<any[]>([selectedStepper]);
  const { setIsExpanded } = useContext(LayoutContext);

  useEffect(() => {
    setIsExpanded(false);
  }, []);
  return (
    <>
      <ul className="pt-4 mr-4  pr-3 hidden xl:block border-[#e2e8f0] md:border-r-2">
        {steps.map((item: Step, index: number) => (
          <li
            key={item.key}
            className={`flex rounded-xl cursor-pointer text-lg p-1 md:w-36 lg:w-44 xl:w-48 text-nowrap`}
            onClick={() => handleOptionClick(item.key)}
          >
            <div className="space-x-2 flex items-center data">
              {!hideSideIcons &&
                (progressCheckBox ? (
                  <div className="p-1 items-center relative">
                    <RoundedblueCheckbox
                      checked={index === steps.length - 1 ? false : true}
                      // checked
                      className=""
                    />
                    {
                      steps.length - 1 !== index &&
                      <div className={`relative before:content-[' '] before:absolute before:w-[2px] before:h-[30px] before:top-[-7px] before:left-[7px] before:border-b before:border-solid before:border-[#ddd] before:block before:text-center before:m-auto before:bg-[#173A78]`}></div>
                    }
                  </div>
                ) : (
                  item.icon && (
                    <img
                      src={item.icon}
                      alt="icons"
                      width={25}
                      height={25}
                      className="mx-2"
                    />
                  )
                ))}
              <div
                className={`py-1 px-3 ${selectedStepper === item.key &&
                  "bg-[#F4F4F5] rounded-xl w-fit"
                  } `}
              >
                <span
                  className={`${selectedStepper === item.key
                      ? "text-[#173A78] font-semibold"
                      : "text-[#5571A4]"
                    } w-fit text-sm`}
                >
                  {item.label}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};
