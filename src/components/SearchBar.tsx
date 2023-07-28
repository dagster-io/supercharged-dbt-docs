"use client";

import { nextTick } from "process";

import { DOMElement, useEffect, useRef, useState, useTransition } from "react";
import Spinner from "./Spinner";
import useSWR from "swr";
import { SearchResults } from "./SearchResults";
import { createPortal } from "react-dom";

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
    node.style.position = "absolute";
    node.style.left = "0px";
    node.style.right = "0px";
    node.style.top = "81px";
    node.style.background = "rgb(249, 250, 251)";
    document.body.appendChild(node);
    setContainer(node);
    return () => {
      document.body.removeChild(node);
    };
  }, []);

  const { data, error, isLoading } = useSWR(
    isFocused || searchValue.trim().length > 0 ? "/searchdata" : null,
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
          // TODO: find a way to debounce the search query
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        type="text"
        className="form-control"
        placeholder="Search for models..."
      />
      <div className="app-body"></div>
      {isFocused ? (
        <div
          className="app-footer app-icn"
          ng-show="search.is_focused"
          ng-click="clearSearch()"
        >
          <svg className="icn icn-md">
            <use xlinkHref="#icn-close"></use>
          </svg>
        </div>
      ) : null}
      {container &&
        createPortal(
          data && searchValue.trim().length > 0 && (
            <SearchResults all={false} query={searchValue} searchable={data} />
          ),
          container
        )}
    </>
  );
}

export function ShowAllResultsLink({ results }: { results: number }) {
  // const url = new URL(window.location.href);
  // url.searchParams.set("a", "1");
  // const { push } = useRouter();
  // return (
  //   <a
  //     onClick={() => {
  //       push(`${url.pathname}?${url.searchParams.toString()}`);
  //     }}
  //   >
  //     Show {results - 20} more
  //   </a>
  // );
  return null;
}
