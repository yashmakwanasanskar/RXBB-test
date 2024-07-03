import { CustomInputProps } from "@/types";

const InputWithIcon = ({
  label = "",
  icon,
  placeholder,
  type

}: CustomInputProps) => {
  return (
    <div className="flex flex-col space-y-1">
      {label && (
        <label className="font-medium label-text-sm text-[#616161]">{label}</label>
      )}

      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <img
            src={icon}
            alt="Input Icon"
            width={24}
            height={24}
            className="w-5 h-5"
          />
        </div>
        <input
          type={type}
          placeholder={placeholder}
          className="w-full border border-gray-300 rounded-md py-2 px-3 pl-10 font-medium text-base text-[#7E7E7E]"
        />
      </div>
    </div>
  );
};

export default InputWithIcon;
