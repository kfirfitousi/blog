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
      className="absolute inset-y-1 right-1 flex h-7 w-7 items-center justify-center rounded bg-white dark:bg-[#22272E]"
      onClick={() => !isCopied && copy()}
    >
      {isCopied ? (
        <Check
          className="h-6 w-6 animate-pulse text-rose-600 dark:text-rose-400"
          aria-hidden
        />
      ) : (
        <Copy
          className="h-6 w-6 text-slate-300 hover:text-rose-600 dark:text-slate-700 dark:hover:text-rose-400"
          aria-label="Copy code"
        />
      )}
    </button>
  );
}

/**
 * Extracts the text from a ReactElement
 * @param element the element to extract the text from
 * @returns the extracted text
 */
const extractText = (element: React.ReactElement | string): string => {
  // If the element is a string, return it
  if (typeof element === "string") {
    return element;
  }

  // If the element is a ReactElement, check if it has children
  // If the children is a single string, return it
  if (typeof element.props.children === "string") {
    return element.props.children;
  }

  // If the children is an array, map over it and extract the text
  if (Array.isArray(element.props.children)) {
    return (element.props.children as (React.ReactElement | string)[])
      .map((child) => extractText(child))
      .join("");
  }

  // If the children is an object (ReactElement), extract the text from it recursively
  if (typeof element.props.children === "object") {
    return extractText(element.props.children);
  }

  return "";
};
