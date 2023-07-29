"use client";

import React from "react";

const ClientStateContext = React.createContext<
  Record<string, any> & {
    setContext: (id: string, key: string, value: any) => void;
  }
>({
  setContext: (_id, _key, _value) => {
    throw new Error("wtf");
  },
});

function ClientStateImpl<T>({
  id,
  initialState,
  children,
}: {
  id: string;
  initialState: Record<string, any>;
  children: React.ReactNode;
}) {
  const surroundingContext = React.useContext(ClientStateContext);
  const [currentState, setCurrentState] = React.useState(initialState);

  return (
    <ClientStateContext.Provider
      value={{
        ...surroundingContext,
        [id]: currentState,
        setContext: (contextId: string, key: string, value: any) => {
          if (contextId === id) {
            setCurrentState({
              ...currentState,
              [key]: value,
            });
          } else {
            surroundingContext.setContext(contextId, key, value);
          }
        },
      }}
    >
      {children}
    </ClientStateContext.Provider>
  );
}

export const ClientState = React.memo(ClientStateImpl);

export function If({
  id,
  stateKey,
  value,
  True,
  False,
}: {
  id: string;
  stateKey: string;
  value: string | number;
  true: string;
  True: React.ReactNode;
  False: React.ReactNode;
}) {
  const context = React.useContext(ClientStateContext);
  const stateValue = context[id][stateKey];
  if (JSON.stringify(stateValue) === JSON.stringify(value)) {
    return True;
  }
  return False;
}

export function OnClick({
  fn,
  children,
  tag = "div",
}: {
  fn: any;
  children: React.ReactNode;
  tag?: string;
}) {
  console.log({ fn });
  return React.createElement(tag, { onClick: fn }, children);
}

export function ToggleState({
  id,
  stateKey,
}: {
  id: string;
  stateKey: string;
}) {
  const context = React.useContext(ClientStateContext);
  const stateValue = context[id][stateKey];
  context.setContext(id, stateKey, !stateValue);
  return null;
}
