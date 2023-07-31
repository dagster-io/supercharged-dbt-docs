"use client";
import { DOMElement, Suspense, useEffect, useState } from "react";
import Spinner from "./Spinner";
import useSWR from "swr";
import { createPortal } from "react-dom";
import React from "react";
import { lazyWithPreload } from "react-lazy-with-preload";

const SearchResults = lazyWithPreload(() =>
  import("./SearchResults").then((mod) => ({
    default: mod.SearchResults,
  }))
);
SearchResults.preload();

async function fetcher(url: string) {
  const response = await fetch(url);
  const json = await response.json();
  return json;
}

export function SearchBar() {
  const [searchValue, setSearchValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [container, setContainer] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = document.createElement("div");
    node.style.position = "fixed";
    node.style.left = "0px";
    node.style.right = "0px";
    node.style.top = "81px";
    node.style.bottom = "0px";
    node.style.background = "rgb(249, 250, 251)";
    document.body.appendChild(node);
    setContainer(node);
    return () => {
      if (node.parentNode === document.body) {
        document.body.removeChild(node);
      }
    };
  }, []);

  useEffect(() => {
    if (container) {
      if (!searchValue) {
        container.style.display = "none";
      } else {
        container.style.display = "block";
      }
    }
  }, [container, searchValue]);

  const { data, isLoading } = useSWR(
    isFocused || searchValue.trim().length > 0
      ? `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/searchdata`
      : null,
    fetcher
  );
  const isSearching = isLoading;

  return (
    <>
      {isSearching ? (
        <div className="app-footer app-icn">
          <Spinner />
        </div>
      ) : null}
      <input
        autoComplete="off"
        id="search"
        value={searchValue}
        onChange={(e) => {
          const newText = e.target.value;
          setSearchValue(newText);
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        type="text"
        className="form-control"
        placeholder="Search for models..."
      />
      <div className="app-body"></div>
      {searchValue.length ? (
        <div
          style={{ cursor: "pointer" }}
          className="app-footer app-icn"
          onClick={() => {
            setSearchValue("");
          }}
        >
          <svg className="icn icn-md">
            <use xlinkHref="#icn-close"></use>
          </svg>
        </div>
      ) : null}
      {container &&
        createPortal(
          data && searchValue.trim().length > 0 && (
            <Suspense
              fallback={
                <div style={{ width: "100%", height: "100%", margin: "auto" }}>
                  <Spinner />
                </div>
              }
            >
              <SearchResults
                query={searchValue}
                searchable={data}
                clearQuery={() => {
                  setSearchValue("");
                }}
              />
            </Suspense>
          ),
          container
        )}
    </>
  );
}
