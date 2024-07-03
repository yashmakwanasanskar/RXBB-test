import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> { }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

const InputSMResponsive = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "input-text-sm flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 ring-offset-background file:border-0 file:bg-transparent  file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
InputSMResponsive.displayName = "InputSMResponsive";

const InputModifyStyle = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type,placeholder, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
        "peer w-full h-full !bg-transparent text-[#00003C] font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-[#e5e7eb] placeholder-shown:border-t-[#e5e7eb] border focus:border-2 focus:!border-t-transparent text-sm px-3 py-3.5 rounded-[7px] border-t-transparent focus:border-[#61CE70] !leading-[14px]"
        ,className
        )}
        placeholder= {placeholder ? placeholder : ""}
        ref={ref}
        {...props}
      />
    );
  }
);
InputModifyStyle.displayName = "InputModifyStyle";

export { Input, InputSMResponsive, InputModifyStyle };
