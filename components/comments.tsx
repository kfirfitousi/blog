"use client";

import { useEffect, useRef } from "react";

export function Comments() {
  const utterancesRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const scriptElement = document.createElement("script");
    scriptElement.src = "https://utteranc.es/client.js";
    scriptElement.async = true;
    scriptElement.defer = true;
    scriptElement.setAttribute("crossorigin", "annonymous");
    scriptElement.setAttribute("repo", "kfirfitousi/blog");
    scriptElement.setAttribute("issue-term", "pathname");
    scriptElement.setAttribute("label", "Comments");

    utterancesRef.current?.childElementCount === 0 &&
      utterancesRef.current?.appendChild(scriptElement);
  }, []);

  return <section ref={utterancesRef} />;
}
