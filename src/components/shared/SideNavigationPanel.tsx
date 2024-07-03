import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  EventBorderImage,
  EventImage,
  PatientImage,
  PatientWithBorderImage,
  ServiceImage,
  ServiceWithBorderImage,
  appointmentIcon,
  dashboardIcon,
  eventsIcon,
  patientListIcon,
  scheduleIcon,
} from "@/constants/images";
import { NavItem } from "@/types/index";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SideNavigationPanel = ({ toggleState, closeToggle }: any) => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathName = location.pathname;

  // Array of navigation items
  const navItems = [
    // {
    //   key: '/',
    //   title: 'Dashboard',
    //   icon: dashboardIcon.path,
    //   alt: dashboardIcon.alt,
    // },
    {
      key: "/patients",
      title: "Patients",
      icon: PatientWithBorderImage.path,
      selectedIcon: PatientImage.path,
      alt: PatientImage.alt,
    },
    {
      key: "/appointments",
      title: "Appointments",
      icon: ServiceWithBorderImage.path,
      selectedIcon: ServiceImage.path,
      alt: ServiceImage.alt,
    },
    // {
    //   key: '/schedule',
    //   title: 'Schedule',
    //   icon: scheduleIcon.path,
    //   alt: scheduleIcon.alt,
    // },
    {
      key: "/events",
      title: "Events",
      icon: EventBorderImage.path,
      selectedIcon: EventImage.path,
      alt: EventImage.alt,
    },
  ];

  const [selectedOption, setSelectedOption] = useState(
    (
      navItems.slice(1).find((item) => pathName.includes(item.key)) ||
      navItems[0]
    ).key
  );

  // Function to handle option click
  const handleOptionClick = (option: string, closeSidePanel: boolean) => {
    navigate(`${option}`);
    setSelectedOption(option);

    if (closeSidePanel) {
      closeToggle();
    }
  };

  return (
    <>
      {/* Desktop side navigation */}
      <div
        className={`hidden md:block ${
          toggleState ? "md:w-44 lg:w-48 xl:w-52" : "w-20"
        } border-[#CCCCCC] md:border-r-2`}
      >
        <ul>
          {navItems.map((item) => (
            <NavItemComponent
              key={item.key}
              item={item}
              handleOptionClick={handleOptionClick}
              toggleState={toggleState}
              selectedOption={selectedOption}
              pathName={pathName}
            />
          ))}
        </ul>
      </div>

      {/* Mobile side navigation */}
      <div
        className={`md:hidden bg-gray-100 fixed z-50 transition-all duration-500 ease-in-out ${
          toggleState ? "h-screen w-screen" : "h-0 w-0"
        } overflow-hidden`}
      >
        <ul>
          {navItems.map((item) => (
            <MobileNavItemComponent
              key={item.key}
              item={item}
              handleOptionClick={handleOptionClick}
            />
          ))}
        </ul>
      </div>
    </>
  );
};

// Component for desktop navigation item
const NavItemComponent = ({
  item,
  handleOptionClick,
  toggleState,
  selectedOption,
  pathName,
}: {
  item: NavItem;
  handleOptionClick: Function;
  toggleState: boolean;
  selectedOption: string;
  pathName: string;
}) => {
  return (
    <li
      key={item.key}
      className={`${
        toggleState ? "md:m-2 md:p-1 lg:m-2 lg:p-2 xl:m-2 xl:p-3 " : "m-2 p-3"
      } flex md:rounded-lg cursor-pointer gap-x-3 place-items-center text-[#474747] ${
        pathName.includes(item.key) &&
        selectedOption === item.key &&
        "bg-[#F4F8FF]"
      } `}
      onClick={() => handleOptionClick(item.key, false)}
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            {selectedOption === item.key ? (
              <img
                src={item.selectedIcon}
                alt={item.alt}
                width={35}
                height={35}
                className={`${
                  toggleState ? "md:w-8 md:h-10" : "md:w-[34px] md:h-9"
                } transition-all duration-100`}
              />
            ) : (
              <img
                src={item.icon}
                alt={item.alt}
                width={35}
                height={35}
                className={`${
                  toggleState ? "md:w-8 md:h-10" : "md:w-[34px] md:h-9"
                } transition-all duration-100`}
              />
            )}
          </TooltipTrigger>
          <TooltipContent>
            <p>{item.title}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <span
        className={`${
          !toggleState && "hidden"
        } origin-left font-semibold md:text-xs lg:text-sm xl:text-base transition-opacity duration-300`}
      >
        {item.title}
      </span>
    </li>
  );
};

// Component for mobile navigation item
const MobileNavItemComponent = ({
  item,
  handleOptionClick,
}: {
  item: NavItem;
  handleOptionClick: Function;
}) => {
  return (
    <li
      key={item.key}
      className="flex m-7 gap-x-3 place-items-center text-[#474747]"
      onClick={() => handleOptionClick(item.key, true)}
    >
      <img src={item.icon} alt={item.alt} width={35} height={35} />
      <span className="font-semibold text-lg">{item.title}</span>
    </li>
  );
};

export default SideNavigationPanel;
