"use client";

import React from "react";

export const MacroArguments = ({ macro }: { macro: any }) => {
  return (
    <div className="panel">
      <div className="panel-body">
        {macro.arguments.length === 0 ? (
          <div>
            Details are not available for this macro. This may be due to the
            fact that this macro doesn&apos;t have any arguments or that they
            haven&apos;t been documented yet.
          </div>
        ) : (
          <div
            className="table-responsive"
            style={{ maxHeight: "800px", overflowY: "scroll" }}
          >
            <table className="table table-borderless table-hover">
              <thead>
                <tr>
                  <th className="arg-header">Argument</th>
                  <th className="arg-header">Type</th>
                  <th className="arg-header">Description</th>
                  <th style={{ width: "1px" }} className="text-center">
                    More?
                  </th>
                </tr>
              </thead>
              <tbody>
                {macro.arguments.map((arg: any) => {
                  <MacroArgumentRow arg={arg} />;
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

function MacroArgumentRow({
  arg,
}: {
  arg: { name: string; description: string; type: string };
}) {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <>
      <tr
        onClick={() => {
          setExpanded(!expanded);
        }}
        className={`column-row${expanded ? " column-row-selected" : ""}`}
        style={{
          cursor: arg.description ? "pointer" : "auto",
        }}
      >
        <td>
          <div>
            <span className="text-dark">{arg.name}</span>
          </div>
        </td>
        <td>
          <span className="text-dark">{arg.type}</span>
        </td>
        <td
          style={{
            textOverflow: "ellipsis",
            overflowX: "hidden",
            whiteSpace: "nowrap",
            maxWidth: "1px",
          }}
        >
          {expanded ? null : <span>{arg.description}</span>}
        </td>
        <td className="text-center">
          {arg.description ? (
            <span className="text-light">
              {expanded ? (
                <span>
                  <svg className="icn">
                    <use xlinkHref="#icn-up"></use>
                  </svg>
                </span>
              ) : (
                <span>
                  <svg className="icn">
                    <use xlinkHref="#icn-right"></use>
                  </svg>
                </span>
              )}
            </span>
          ) : null}
        </td>
      </tr>
      {expanded ? (
        <tr style={{ backgroundColor: "white", padding: "10px" }}>
          <td colSpan={4} className="column-expanded">
            <div style={{ padding: "5px 20px" }}>
              <div style={{ marginBottom: "15px" }}>
                <h5>Description</h5>
                <span>{arg.description}</span>
              </div>
            </div>
          </td>
        </tr>
      ) : null}
    </>
  );
}
