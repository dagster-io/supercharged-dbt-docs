"use client";

import React from "react";

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

  const { source, code } = React.useMemo(() => {
    const source = versions[selectedVersion] || "";
    // $timeout(function () {
    //   // for good measure, also use Prism's built-in mechanism to identify and
    //   // highlight all `code` elements based on their `language-xxxx` class
    //   Prism.highlightAll();
    // });

    return {
      source: source,
      code: source.trim(),
      highlighted: source.trim(), // codeService.highlight(code, language);
    };
  }, [selectedVersion, versions]);

  function titleCase(name: string) {
    return name.charAt(0).toUpperCase() + name.substring(1);
  }

  const [copied, setCopied] = React.useState(false);
  function copy_to_clipboard() {
    // codeService.copy_to_clipboard(scope.source);
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
              <a className="unselectable" ng-click="copy_to_clipboard()">
                {copied ? "copied" : "copy to clipboard"}
              </a>
            </li>
          </ul>
          <div style={{ marginTop: "1px" }}>
            <pre
              style={{ backgroundColor: "white" }}
              className="code line-numbers"
            >
              <code className={`source-code highlight ${language_class}`}>
                {highlighted}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </>
  );
};

function getLanguageClass(language: string) {
  return language === "python" ? "language-python" : "language-sql";
}
