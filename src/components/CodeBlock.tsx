"use client";

import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { copyToClipboard } from "@/util/copyToClipboard";

export const CodeBlock = ({
  versions,
  defaultVersion,
  language,
}: {
  versions: Record<string, any>;
  defaultVersion: any;
  language: string;
}) => {
  const [selectedVersion, setSelectedVersion] = React.useState(defaultVersion);
  const source = versions[selectedVersion] || "";

  function titleCase(name: string) {
    return name.charAt(0).toUpperCase() + name.substring(1);
  }

  const [copied, setCopied] = React.useState(false);
  function handleCopyToClipboard() {
    copyToClipboard(source);
    setCopied(true);
    setTimeout(function () {
      setCopied(false);
    }, 1000);
  }

  return (
    <>
      <h6>Code</h6>
      <div className="panel">
        <div className="panel-body">
          <ul className="nav nav-tabs">
            {Object.keys(versions).map((version_name: any) => (
              <li
                className={
                  version_name == selectedVersion ? "active" : undefined
                }
                key={version_name}
              >
                <a
                  onClick={() => {
                    setSelectedVersion(version_name);
                  }}
                >
                  {titleCase(version_name)}
                </a>
              </li>
            ))}
            <li className="nav-pull-right"></li>
            <li>
              <a className="unselectable" onClick={handleCopyToClipboard}>
                {copied ? "copied" : "copy to clipboard"}
              </a>
            </li>
          </ul>
          <div style={{ marginTop: "1px" }}>
            <SyntaxHighlighter
              language={language}
              className="code line-numbers"
              customStyle={{ background: "white" }}
            >
              {source.trim()}
            </SyntaxHighlighter>
          </div>
        </div>
      </div>
    </>
  );
};
