import { CopilotTextarea, CopilotTextareaProps } from "@copilotkit/react-textarea";
import { cn } from "@/lib/utils";

// var CopilotTextarea = require('@copilotkit/react-textarea');


export function TextAreaComponent({ className, placeholder = "Start typing...", autosuggestionsConfig, ...props }: CopilotTextareaProps) {


  return (
    <CopilotTextarea
      // standard textarea args
      className={
        cn("min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className)}
      placeholder={placeholder}

      {...props}
      // ai-specific configs

      autosuggestionsConfig={autosuggestionsConfig}
      {...props}
    ></CopilotTextarea>
  );
};