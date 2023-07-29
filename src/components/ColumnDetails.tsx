"use client";
import React from "react";
import _ from "underscore";
import { ColumnDetailsClient } from "./ColumnDetailsClient";
import { serialize } from "@ungap/structured-clone";

export const ColumnDetails = ({ model }: { model: any }) => {
  return (
    <ColumnDetailsClient
      model={_.pick(model, ["docs", "config", "resource_type", "description"])}
    />
  );
};
