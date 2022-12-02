"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

interface CopyCodeProps {
  codeElement: React.ReactElement;
}

export function CopyCode({ codeElement }: CopyCodeProps) {
  const [isCopied, setIsCopied] = useState(false);

  const copy = () => {
    const _children = codeElement.props.children as React.ReactElement[];

    const text = Array.from(_children).reduce(function (acc, curr) {
      if (typeof curr === "string") {
        acc += curr;
      } else if ("props" in curr) {
        acc += curr.props.children;
      }
      return acc;
    }, "");

    navigator.clipboard.writeText(text);

    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <button
      className="w-4 h-4 absolute inset-y-2 right-4"
      onClick={() => !isCopied && copy()}
    >
      {isCopied ? (
        <Check
          className="text-rose-500 fill-white dark:text-rose-400 dark:fill-[#22272E] animate-pulse"
          aria-hidden
        />
      ) : (
        <Copy
          className="text-slate-300 fill-white dark:text-slate-700 dark:fill-[#22272E] hover:text-rose-500 dark:hover:text-rose-400"
          aria-label="Copy code"
        />
      )}
    </button>
  );
}
