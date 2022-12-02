"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

interface CopyCodeProps {
  codeElement: React.ReactElement;
}

export function CopyCode({ codeElement }: CopyCodeProps) {
  const [isCopied, setIsCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(extractText(codeElement));

    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <button
      className="w-7 h-7 flex items-center justify-center absolute inset-y-1 right-1 rounded bg-white dark:bg-[#22272E]"
      onClick={() => !isCopied && copy()}
    >
      {isCopied ? (
        <Check
          className="w-6 h-6 text-rose-600 dark:text-rose-400 animate-pulse"
          aria-hidden
        />
      ) : (
        <Copy
          className="w-6 h-6 text-slate-300 dark:text-slate-700 hover:text-rose-600 dark:hover:text-rose-400"
          aria-label="Copy code"
        />
      )}
    </button>
  );
}

const extractText = (element: React.ReactElement): string => {
  if (typeof element === "string") {
    return element as string;
  }
  if (element.props.children) {
    return (Array.from(element.props.children) as React.ReactElement[])
      .map(extractText)
      .join("");
  }
  return "";
};
