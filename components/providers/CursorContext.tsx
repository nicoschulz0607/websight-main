"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type CursorMode = "default" | "view-project";

interface CursorContextValue {
  cursorMode: CursorMode;
  setCursorMode: (mode: CursorMode) => void;
}

const CursorContext = createContext<CursorContextValue>({
  cursorMode: "default",
  setCursorMode: () => {},
});

export function CursorProvider({ children }: { children: ReactNode }) {
  const [cursorMode, setCursorMode] = useState<CursorMode>("default");

  return (
    <CursorContext.Provider value={{ cursorMode, setCursorMode }}>
      {children}
    </CursorContext.Provider>
  );
}

export function useCursor() {
  return useContext(CursorContext);
}
