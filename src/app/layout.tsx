import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Icons from "@/svgs/icons";
import Logo from "@/svgs/logo";
import Glyphs from "@/svgs/glyphs";
import { loadProject, project } from "./projectService";
import React, { Suspense } from "react";
import _ from "underscore";
import { GraphLauncher } from "@/components/GraphLauncher";
import { ModelTree } from "@/components/ModelTree";
import { SearchBar } from "@/components/SearchBar";
import Spinner from "@/components/Spinner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Modern DBT Docs",
  description: "built using React Server Components",
};

loadProject();

export default async function RootLayout({
  children,
  search,
  test,
  ...rest
}: {
  children: React.ReactNode;
  search?: React.ReactNode;
  test?: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={inter.className}>
        <main className="mx-8">
          <div>
            <GraphLauncher />
            <div className="app app-row">
              <div className="app-menu app-column">
                <div className="app-overlay" data-toggle=".app-menu"></div>
                <div className="app-header app-navbar app-shadow app-pad">
                  <div className="app-row app-middle">
                    <div className="app-body">
                      <div className="logo">
                        <Logo />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="app-body">
                  <div className="app-scroll app-pad app-flush-right no-x-overflow">
                    <Suspense>
                      <ModelTree />
                    </Suspense>
                  </div>
                </div>
              </div>
              <SearchWrapper>{children}</SearchWrapper>
            </div>
          </div>
        </main>
        <div style={{ display: "none" }}>
          <Icons />
          <Glyphs />
        </div>
      </body>
    </html>
  );
}

export const SearchWrapper = ({
  children,
  search,
}: {
  children: React.ReactNode;
  search?: React.ReactNode;
}) => {
  return (
    <div className="app-content app-column">
      <div className="app-header app-navbar app-shadow">
        <div className="app-frame app-pad app-row app-middle">
          <SearchBar />
        </div>
      </div>
      <div className="app-body">
        <Suspense
          fallback={
            <div
              style={{
                width: "100%",
                display: "grid",
                height: "100%",
                placeItems: "center",
              }}
            >
              <Spinner />
            </div>
          }
        >
          {children}
        </Suspense>
      </div>
    </div>
  );
};
