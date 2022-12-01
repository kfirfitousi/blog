"use client";

import { useEffect, useRef } from "react";

export default function Comments() {
  const utterancesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scriptElement = document.createElement("script");
    scriptElement.src = "https://utteranc.es/client.js";
    scriptElement.async = true;
    scriptElement.defer = true;
    scriptElement.setAttribute("crossorigin", "annonymous");
    scriptElement.setAttribute("repo", "kfirfitousi/blog");
    scriptElement.setAttribute("issue-term", "pathname");
    scriptElement.setAttribute("theme", "github-light");

    utterancesRef.current?.childElementCount === 0 &&
      utterancesRef.current?.appendChild(scriptElement);
  }, []);

  return <section ref={utterancesRef} />;
}
