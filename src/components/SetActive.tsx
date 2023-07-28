"use client";

import React from "react";
import { setActive } from "./ModelTreeClient";

export function SetActive({ uniqueId }: { uniqueId: string }) {
  React.useEffect(() => {
    setActive(uniqueId);
  }, [uniqueId]);

  return null;
}
