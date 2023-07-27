"use client";

import {
  useRouter,
  useSearchParams,
  ReadonlyURLSearchParams,
} from "next/navigation";
import { nextTick } from "process";

import { useEffect, useRef, useState, useTransition } from "react";
import Spinner from "./Spinner";

export function SearchBar() {
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    setSearchValue(searchParams?.get("q") || "");
  }, [searchParams, setSearchValue]);

  const [isSearching, startSearching] = useTransition();
  const [isFocused, setIsFocused] = useState(false);

  const previousUrlRef = useRef<string | null>(null);

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
          startSearching(() => {
            if (!location.pathname.startsWith("search?")) {
              previousUrlRef.current = location.pathname;
            }
            push(`/search?q=${newText}`);
          });
        }}
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
    </>
  );
}

export function ShowAllResultsLink({ results }: { results: number }) {
  const url = new URL(window.location.href);
  url.searchParams.set("a", "1");
  const { push } = useRouter();
  return (
    <a
      onClick={() => {
        push(`${url.pathname}?${url.searchParams.toString()}`);
      }}
    >
      Show {results - 20} more
    </a>
  );
}
