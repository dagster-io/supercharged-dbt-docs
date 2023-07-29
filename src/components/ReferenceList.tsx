import React from "react";
import _ from "underscore";
import { ReferenceListClient } from "./ReferenceListClient";
import { serialize } from "@ungap/structured-clone";

export const ReferenceList = ({
  references,
  node,
}: {
  references: any;
  node?: any;
}) => {
  return (
    <ReferenceListClient
      references={serialize(references)}
      node={serialize(_.pick(node, ["resource_type", "name", "unique_id"]))}
    />
  );
};
