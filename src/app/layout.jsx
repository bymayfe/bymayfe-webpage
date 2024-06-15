import "./globals.css";
import "./homepage.css";
import mayfeNewLogo from "@/images/logos/mayfeLogoPNG_Pink.png";
export const metadata = {
  title: "ByMayFe",
  description: "ByMayFe's personal website",
  icons: {
    icon: mayfeNewLogo.src,
  },
};

import React from "react";
import ThemeHandler from "../providers/ThemeHandler";
import AuthProvider from "../providers/AuthProvider";

const Layout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <ThemeHandler>
          <AuthProvider>{children}</AuthProvider>
        </ThemeHandler>
      </body>
    </html>
  );
};

export default Layout;
