import * as React from "react"

import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

const TextareaModifyStyle = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className="peer w-full h-full bg-transparent text-[#00003C] font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-[#e5e7eb] placeholder-shown:border-t-[#e5e7eb] border focus:border-2 focus:border-t-transparent text-sm px-3 py-3.5 rounded-[7px] border-t-transparent focus:border-gray-900 !leading-[14px]"
        ref={ref}
        {...props}
         placeholder=""
         rows={6}
      />
    )
  }
)
TextareaModifyStyle.displayName = "TextareaModifyStyle"

export { Textarea, TextareaModifyStyle }
