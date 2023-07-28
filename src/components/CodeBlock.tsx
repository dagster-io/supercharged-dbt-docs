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
  const language_class = React.useMemo(
    () => getLanguageClass(language),
    [language]
  );

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
              style={{ backgroundColor: "white" } as any}
              className="code line-numbers"
              codeTagProps={{
                className: `source-code highlight ${language_class}`,
              }}
            >
              {source.trim()}
            </SyntaxHighlighter>
          </div>
        </div>
      </div>
    </>
  );
};

function getLanguageClass(language: string) {
  return language === "python" ? "language-python" : "language-sql";
}
