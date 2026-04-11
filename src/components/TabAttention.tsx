"use client";

import { useEffect, useRef } from "react";

const ORIGINAL_TITLE = "Branislav Benčík | Product Designer";
const RETURN_TITLE = "Still here.";
const REVERT_DELAY = 2000;

/**
 * When the user leaves the tab and comes back,
 * briefly shows "Still here." as the document title before reverting.
 * Only triggers once per session to avoid being annoying.
 */
export default function TabAttention() {
  const hasFired = useRef(false);

  useEffect(() => {
    function handleVisibilityChange() {
      if (document.visibilityState === "visible" && !hasFired.current) {
        hasFired.current = true;
        document.title = RETURN_TITLE;
        setTimeout(() => {
          document.title = ORIGINAL_TITLE;
        }, REVERT_DELAY);
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return null;
}
