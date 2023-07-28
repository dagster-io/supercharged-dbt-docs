import React from "react";
import { ModelTreeClient } from "./ModelTreeClient";

export async function ModelTree() {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
          .menu ul ul {
                margin-left: 12px;
          }
          .unselectable{
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
          }
    `,
        }}
      />
      <ModelTreeClient />
    </>
  );
}
