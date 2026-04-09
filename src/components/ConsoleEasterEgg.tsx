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
      "font-family: monospace; color: #71717A;"
    );
  }, []);

  return null;
}
