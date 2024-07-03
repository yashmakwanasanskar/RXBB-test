import DynamicRadioButton from "@/components/shared/DynamicRadioButton";
import InputWithIcon from "@/components/shared/InputWithIcon";
import { LabelSMResponsive } from "@/components/ui/label";
import {
  addressIcon,
  changeIcon,
  cityIcon,
  dateOfBirthIcon,
  emailIcon,
  impersonate,
  languageIcon,
  passwordReset,
  personName,
  phoneIcon,
  removeIcon,
  selectAllIcon,
  stateIcon,
  timeZoneIcon,
  unSelectAllIcon,
  userProfile,
  zipCodeIcon,
} from "@/constants/images";
import { useState } from "react";

const UserProfile = () => {
  const [getGenderSelection, setGenderSelection] = useState("male");
  const GenderData = [
    {
      label: "Male",
      value: "male",
    },
    {
      label: "Female",
      value: "Female",
    },
    {
      label: "Others",
      value: "others",
    },
  ];

  const checkboxNames = [
    "Insights Admin",
    "RxBB - Common Permissions",
    "RxBB - Pharmacist",
    "RxBB - Tenant Administrator",
    "Insights User",
    "RxBB - Contract Provider",
    "RxBB - Pharmacist & Technician",
    "Script Manager",
    "RxBB - Clerk",
    "RxBB - Medical Billing",
    "RxBB - Technician",
    "System Manager",
  ];

  return (
    <div className="m-5">
      <div className="flex flex-col md:flex-row md:justify-between my-5">
        <div>
          <h2 className="text-[#474747] font-medium text-3xl lg:text-4xl">
            User Profile
          </h2>
        </div>

        <div className="flex space-x-3 mt-3 md:mt-0 justify-between">
          <div className="px-3 text-center place-content-center rounded-full inline bg-[#D9EDE6] text-[#008993] font-medium text-sm lg:text-base">
            Active
          </div>

          <div className="flex gap-4">
            <div className="flex gap-2 px-3 py-1 rounded-lg bg-[#F6F9FD] cursor-pointer">
              <img
                src={passwordReset.path}
                alt="Password Reset"
                width={24}
                height={24}
              />
              <p className="hidden md:block text-[#616161] font-medium text-sm lg:text-base place-content-center">
                Password Reset
              </p>
            </div>

            <div className="flex gap-2 px-3 py-1 rounded-lg bg-[#F6F9FD] cursor-pointer">
              <img
                src={impersonate.path}
                alt="Impersonate"
                width={24}
                height={24}
              />
              <p className="hidden md:block text-[#616161] font-medium text-sm lg:text-base place-content-center">
                Impersonate
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#F6F9FD] border border-[#E0E0E0]">
        <div>
          <h3 className="p-3 font-semibold text-xl text-[#474747]">
            Basic Information
          </h3>
          <div className="border-[#E0E0E0] border" />
        </div>

        <div className="flex mx-8 mt-6 mb-2 items-center gap-6">
          <img
            src={userProfile.path}
            alt={userProfile.alt}
            width={100}
            height={100}
          />

          <div className="flex items-center p-3 place-content-center border-[#296EE2] border rounded-lg bg-[#FFFFFF]">
            <div className="sm:mr-2 pointer-events-none">
              <img
                src={changeIcon.path}
                alt="Input Icon"
                width={26}
                height={26}
              />
            </div>

            <p className="hidden sm:block font-medium text-base text-[#296EE2]">
              Change
            </p>
          </div>

          <div className="flex items-center p-3 place-content-center border-[#296EE2] border rounded-lg bg-[#FFFFFF]">
            <div className="sm:mr-2 pointer-events-none">
              <img
                src={removeIcon.path}
                alt="Input Icon"
                width={26}
                height={26}
              />
            </div>

            <p className="hidden sm:block font-medium text-base text-[#296EE2]">
              Remove
            </p>
          </div>
        </div>

        <form>
          <div className="flex flex-wrap -mx-2 p-5">
            <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
              <InputWithIcon
                label="First Name"
                icon={personName.path}
                placeholder="Administrator"
                type="text"
              />
            </div>
            <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
              <InputWithIcon
                label="Last name"
                icon={personName.path}
                placeholder="Administrator"
                type="password"
              />
            </div>
            <div className="grid w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
              <LabelSMResponsive className="text-[#616161]">
                Gender <span className="text-[#ED9192]">*</span>
              </LabelSMResponsive>
              <DynamicRadioButton
                data={GenderData}
                defaultValue="locations"
                getButtonSelection={getGenderSelection}
                setButtonSelection={setGenderSelection}
              />
            </div>
            <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
              <InputWithIcon
                label="Date of birth"
                icon={dateOfBirthIcon.path}
                placeholder="02-05-1994"
                type="text"
              />
            </div>
            <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
              <InputWithIcon
                label="Email"
                icon={emailIcon.path}
                placeholder="email@email.com"
                type="tel"
              />
            </div>
            <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
              <InputWithIcon
                label="Phone"
                icon={phoneIcon.path}
                placeholder="723-652-8960"
                type="date"
              />
            </div>
            <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
              <InputWithIcon
                label="Address Line 1"
                icon={addressIcon.path}
                placeholder="Address Line 1"
                type="text"
              />
            </div>
            <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
              <InputWithIcon
                label="Address Line 2"
                icon={addressIcon.path}
                placeholder="Address Line 2"
                type="text"
              />
            </div>
            <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
              <InputWithIcon
                label="State"
                icon={stateIcon.path}
                placeholder="USA"
                type="text"
              />
            </div>
            <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
              <InputWithIcon
                label="City"
                icon={cityIcon.path}
                placeholder="Chicago"
                type="text"
              />
            </div>
            <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
              <InputWithIcon
                label="Zip-Code"
                icon={zipCodeIcon.path}
                placeholder="60601"
                type="text"
              />
            </div>
            <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
              <InputWithIcon
                label="Language"
                icon={languageIcon.path}
                placeholder="English"
                type="text"
              />
            </div>
            <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
              <InputWithIcon
                label="Time Zone"
                icon={timeZoneIcon.path}
                placeholder="America/Los_Angeles"
                type="text"
              />
            </div>
          </div>
        </form>
      </div>

      <div className="mt-5 bg-[#F6F9FD] border border-[#E0E0E0]">
        <div>
          <h3 className="p-3 font-semibold text-xl text-[#474747]">Roles</h3>
          <div className="border-[#E0E0E0] border" />
        </div>

        <div className="px-7 py-6 grid grid-cols-10 gap-4">
          <input
            type="text"
            placeholder="Select role profile"
            className="p-5 col-span-6 md:col-span-6 2xl:col-span-8 rounded-full"
          />

          <div className="flex items-center place-content-center col-span-2 md:col-span-2 2xl:col-span-1 rounded-full bg-[#FFFFFF]">
            <div className="md:hidden lg:block md:pr-2 pointer-events-none">
              <img
                src={selectAllIcon.path}
                alt="Input Icon"
                width={20}
                height={20}
              />
            </div>

            <p className="hidden md:block font-medium text-base text-[#7E7E7E]">
              Select All
            </p>
          </div>

          <div className="flex items-center place-content-center col-span-2 md:col-span-2 2xl:col-span-1 rounded-full bg-[#FFFFFF]">
            <div className="md:hidden lg:block md:pr-2 pointer-events-none">
              <img
                src={unSelectAllIcon.path}
                alt="Input Icon"
                width={20}
                height={20}
              />
            </div>

            <p className="hidden md:block font-medium text-base text-[#7E7E7E]">
              Unselect All
            </p>
          </div>
        </div>

        <div className="p-7 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {checkboxNames.map((name, index) => (
            <div key={index}>
              <input
                type="checkbox"
                id={`checkbox-${index + 1}`}
                name={`checkbox-${index + 1}`}
                className="form-checkbox"
              />
              <label
                htmlFor={`checkbox-${index + 1}`}
                className="ml-2 font-medium text-base text-[#616161]"
              >
                {name}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
