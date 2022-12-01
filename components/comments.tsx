"use client";

import { useEffect, useRef } from "react";

export function Comments() {
  const utterancesRefDark = useRef<HTMLDivElement>(null);
  const utterancesRefLight = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scriptElementLight = document.createElement("script");
    scriptElementLight.src = "https://utteranc.es/client.js";
    scriptElementLight.async = true;
    scriptElementLight.defer = true;
    scriptElementLight.setAttribute("crossorigin", "annonymous");
    scriptElementLight.setAttribute("repo", "kfirfitousi/blog");
    scriptElementLight.setAttribute("issue-term", "pathname");
    scriptElementLight.setAttribute("label", "Comments");
    scriptElementLight.setAttribute("theme", "github-light");

    utterancesRefLight.current?.childElementCount === 0 &&
      utterancesRefLight.current?.appendChild(scriptElementLight);

    const scriptElementDark = document.createElement("script");
    scriptElementDark.src = "https://utteranc.es/client.js";
    scriptElementDark.async = true;
    scriptElementDark.defer = true;
    scriptElementDark.setAttribute("crossorigin", "annonymous");
    scriptElementDark.setAttribute("repo", "kfirfitousi/blog");
    scriptElementDark.setAttribute("issue-term", "pathname");
    scriptElementDark.setAttribute("label", "Comments");
    scriptElementDark.setAttribute("theme", "github-dark-orange");

    utterancesRefDark.current?.childElementCount === 0 &&
      utterancesRefDark.current?.appendChild(scriptElementDark);
  }, []);

  return (
    <section>
      <div ref={utterancesRefLight} className="block dark:hidden" />
      <div ref={utterancesRefDark} className="hidden dark:block" />
    </section>
  );
}
