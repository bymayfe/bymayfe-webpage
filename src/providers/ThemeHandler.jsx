"use client";
import React, { Children } from "react";
import { ThemeProvider } from "next-themes";

const ThemeHandler = ({ children }) => {
  return (
    <ThemeProvider enableSystem={true} attribute="class">
      {children}
    </ThemeProvider>
  );
};

export default ThemeHandler;
