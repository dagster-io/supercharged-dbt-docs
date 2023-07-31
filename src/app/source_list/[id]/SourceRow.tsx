"use client";

import { MarkdownBlock } from "@/components/MarkdownBlock";
import Link from "next/link";
import React from "react";

export function SourceRow({ source }: { source: any }) {
  const [expanded, setExpanded] = React.useState(false);
  const hasMoreInfo = source.description.length;
  return (
    <>
      <tr
        onClick={() => {
          setExpanded(!expanded);
        }}
        className={`column-row ${expanded ? "column-row-selected" : ""}`}
        style={{ cursor: hasMoreInfo ? "pointer" : "auto" }}
      >
        <td>
          <div>
            <span className="text-dark">{source.source_name}</span>
          </div>
        </td>
        <td>
          <span className="text-dark">{source.name}</span>
        </td>
        <td
          style={{
            textOverflow: "ellipsis",
            overflowX: "hidden",
            whiteSpace: "nowrap",
            maxWidth: "1px",
          }}
        >
          {expanded ? null : <span>{source.description}</span>}
        </td>
        <td>
          <Link href={`/source/${source.unique_id}`}>View docs</Link>
        </td>
        <td className="text-center">
          {hasMoreInfo ? (
            <span className="text-light">
              {source.expanded ? (
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
      {source.expanded ? (
        <tr style={{ backgroundColor: "white", padding: "10px" }}>
          <td colSpan={5} className="column-expanded">
            <div style={{ padding: "5px 20px" }}>
              <div style={{ marginBottom: "15px" }}>
                <h5>Description</h5>
                <span>
                  <MarkdownBlock markdown={source.description} />
                </span>
              </div>
            </div>
          </td>
        </tr>
      ) : null}
    </>
  );
}
