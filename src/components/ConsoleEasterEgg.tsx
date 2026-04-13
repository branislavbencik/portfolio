"use client";

import { useEffect } from "react";

export default function ConsoleEasterEgg() {
  useEffect(() => {
    console.log(
      `%c
  ┌─────────────────────────────────────┐
  │                                     │
  │   Branislav Benčík                  │
  │   Product Designer                  │
  │                                     │
  │   branislav.bencik@gmail.com        │
  │                                     │
  │   You're inspecting. I like that.   │
  │                                     │
  └─────────────────────────────────────┘
`,
      "font-family: monospace; color: #71717A;" // audit-ignore: console.log CSS string, not a stylesheet
    );
    console.log(
      "%c<0_0>  ping me if you're hiring",
      "font-family: monospace; color: #22c55e;" // audit-ignore: console.log CSS string, not a stylesheet
    );
  }, []);

  return null;
}
