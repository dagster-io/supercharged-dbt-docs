import _ from "lodash";
import Link from "next/link";
import React from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { getNodeUrl } from "@/util/nodeUrl";

function fuzzySearchObj(query: string, obj: any) {
  var objects = [];
  var search_keys: any = {
    name: "string",
    description: "string",
    raw_code: "string",
    columns: "object",
    column_description: "n/a", // special case
    tags: "array",
    arguments: "array",
    label: "string",
  };

  let query_segments = _.words(query.toLowerCase());

  for (const i in search_keys) {
    // column descriptions are a special case because they are not a top-level key
    if (i === "column_description") {
      for (var column_name in obj["columns"]) {
        if (obj["columns"][column_name]["description"] != null) {
          if (
            query_segments.every(
              (segment) =>
                obj["columns"][column_name]["description"]
                  .toLowerCase()
                  .indexOf(segment) != -1
            )
          ) {
            objects.push({ key: i, value: query });
          }
        }
      }
    } else if (!obj[i]) {
      // skip any other cases where the object is missing the key
      continue;
    } else if (
      search_keys[i] === "string" &&
      query_segments.every(
        (segment) => obj[i].toLowerCase().indexOf(segment) != -1
      )
    ) {
      objects.push({ key: i, value: query });
    } else if (search_keys[i] === "object") {
      for (var column_name in obj[i]) {
        // there is a spark bug where columns are missing from the catalog. That needs to be fixed
        // outside of docs but this if != null check will allow docs to continue to function now
        // and also when the bug is fixed.
        // relevant issue: https://github.com/dbt-labs/dbt-spark/issues/295
        if (obj[i][column_name]["name"] != null) {
          if (
            query_segments.every(
              (segment) =>
                obj[i][column_name]["name"].toLowerCase().indexOf(segment) != -1
            )
          ) {
            objects.push({ key: i, value: query });
          }
        }
      }
    } else if (search_keys[i] === "array") {
      for (var tag of obj[i]) {
        if (
          query_segments.every(
            (segment) =>
              JSON.stringify(tag).toLowerCase().indexOf(segment) != -1
          )
        ) {
          objects.push({ key: i, value: query });
        }
      }
    }
  }

  return objects;
}

function search(q: string, searchable: any) {
  if (q.length == 0) {
    return _.map(searchable, function (model) {
      return {
        model: model,
        matches: [],
      };
    });
  }

  const res: any[] = [];
  _.each(searchable, function (model) {
    var matches = fuzzySearchObj(q, model);
    if (matches.length) {
      res.push({
        model: model,
        matches: matches,
      });
    }
  });
  return res;
}

export function SearchResults({
  query,
  searchable,
  clearQuery,
}: {
  query: string;
  searchable: any;
  clearQuery: () => void;
}) {
  const [checkboxStatus, setCheckboxStatus] = React.useState({
    show_names: false,
    show_descriptions: false,
    show_columns: false,
    show_column_descriptions: false,
    show_code: false,
    show_tags: false,
  });

  function getModelName(model: any) {
    if (model.resource_type == "source") {
      return model.source_name + "." + model.name;
    } else if (model.resource_type == "macro") {
      return model.package_name + "." + model.name;
    } else if (model.resource_type == "metric") {
      return model.label;
    } else if (model.resource_type == "exposure") {
      return model.label;
    } else if (model.resource_type == "model" && model.version != null) {
      return model.label;
    } else {
      return model.name;
    }
  }

  function filterResults(results: any, checkboxStatus: any) {
    if (!_.some(_.values(checkboxStatus))) {
      return results;
    }

    let finalResults: any = [];
    let fileIDs: any = [];

    const {
      show_names,
      show_descriptions,
      show_columns,
      show_column_descriptions,
      show_code,
      show_tags,
    } = checkboxStatus;
    for (const result of results) {
      for (const match of result.matches) {
        if (!fileIDs.includes(result.model["unique_id"])) {
          const nameMatch =
            show_names && (match.key === "name" || match.key == "label");
          const descriptionMatch =
            show_descriptions && match.key == "description";
          const columnsMatch = show_columns && match.key === "columns";
          const columnDescriptionMatch =
            show_column_descriptions && match.key === "column_description";
          const codeMatch = show_code && match.key === "raw_code";
          const tagsMatch = show_tags && match.key === "tags";

          if (
            nameMatch ||
            descriptionMatch ||
            columnsMatch ||
            columnDescriptionMatch ||
            codeMatch ||
            tagsMatch
          ) {
            fileIDs.push(result.model["unique_id"]);
            finalResults.push(result);
          }
        }
      }
    }
    return finalResults;
  }

  const results = React.useMemo(
    () => filterResults(search(query, searchable), checkboxStatus),
    [query, searchable, checkboxStatus]
  );

  function shorten(text: string) {
    if (
      text != null &&
      text.trim().length > 0 &&
      query != null &&
      query.trim().length > 0
    ) {
      let modified = text.replace(/\s+/g, " ");
      //choose the first word in the search as the anchor for shortening.
      //Escaping in case the first token is "*" or another reserved regex character
      let first_token = escapeRegExp(getQueryTokens(query)[0]);
      let indexOfInstance = modified.search(new RegExp(first_token));
      let startIndex = indexOfInstance - 75 < 0 ? 0 : indexOfInstance - 75;
      let endIndex =
        indexOfInstance + 75 > modified.length
          ? modified.length
          : indexOfInstance + 75;
      let shortened = "..." + modified.substring(startIndex, endIndex) + "...";
      return shortened;
    }
    return text;
  }

  function highlight(text: string) {
    if (!query || !text) {
      return text || "";
    }
    //wrap each word in a capturing group with a pipe between them, to allow any of the matches to highlight
    //e.g. "hello WORLD" changes to "(hello)|(world)"
    let query_segments = getQueryTokens(query);
    let escaped_segments = query_segments.map((segment) =>
      escapeRegExp(segment)
    );
    let highlight_words = "(" + escaped_segments.join(")|(") + ")";
    return text.replace(
      new RegExp(highlight_words, "gi"),
      '<span class="search-result-match">$&</span>'
    );
  }

  function columnFilter(columns: string[]) {
    var matches = [];
    let query_segments = getQueryTokens(query);

    for (var column in columns) {
      if (
        query_segments.every(
          (segment) => column.toLowerCase().indexOf(segment) != -1
        )
      ) {
        matches.push(column);
      }
    }
    return matches;
  }

  //from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
  function escapeRegExp(string: string) {
    return string.replace(/[.*+\-?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
  }

  function getQueryTokens(query: string) {
    return _.words(query.toLowerCase());
  }

  const container = React.useRef<HTMLDivElement | null>(null);
  const rowVirtualizer = useVirtualizer({
    count: results.length,
    getScrollElement: () => container.current,
    estimateSize: () => 100,
  });

  const totalHeight = rowVirtualizer.getTotalSize();
  const items = rowVirtualizer.getVirtualItems();
  React.useLayoutEffect(
    () => {
      rowVirtualizer.measure();
      requestAnimationFrame(rowVirtualizer.measure);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [results]
  );

  return (
    <div style={{ position: "relative", height: "100%" }}>
      <div
        ref={container}
        style={{
          overflowY: "scroll",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        <div className="app-title">
          <div
            className="app-frame app-pad"
            style={{ marginBottom: 0, paddingBottom: 0 }}
          >
            <h1>
              <span className="break">{query}</span>
              <small>
                <span>{results.length}</span> search results
              </small>
            </h1>
            <input
              type="checkbox"
              id="name"
              checked={checkboxStatus.show_names}
              onChange={(e) => {
                setCheckboxStatus((status) => ({
                  ...status,
                  show_names: e.target.checked,
                }));
              }}
              style={{ marginLeft: "10px", marginRight: "5px" }}
            />
            <label htmlFor="name" style={{ marginRight: "25px" }}>
              Name
            </label>
            <input
              type="checkbox"
              id="desc"
              checked={checkboxStatus.show_descriptions}
              onChange={(e) => {
                setCheckboxStatus((status) => ({
                  ...status,
                  show_descriptions: e.target.checked,
                }));
              }}
              style={{ marginRight: "5px" }}
            />
            <label htmlFor="desc" style={{ marginRight: "25px" }}>
              Description
            </label>
            <input
              type="checkbox"
              id="column"
              checked={checkboxStatus.show_columns}
              onChange={(e) => {
                setCheckboxStatus((status) => ({
                  ...status,
                  show_columns: e.target.checked,
                }));
              }}
              style={{ marginRight: "5px" }}
            />
            <label htmlFor="column" style={{ marginRight: "25px" }}>
              Column
            </label>
            <input
              type="checkbox"
              id="column_description"
              checked={checkboxStatus.show_column_descriptions}
              onChange={(e) => {
                setCheckboxStatus((status) => ({
                  ...status,
                  show_column_descriptions: e.target.checked,
                }));
              }}
              style={{ marginRight: "5px" }}
            />
            <label htmlFor="column_description" style={{ marginRight: "25px" }}>
              Column Description
            </label>
            <input
              type="checkbox"
              id="code"
              checked={checkboxStatus.show_code}
              onChange={(e) => {
                setCheckboxStatus((status) => ({
                  ...status,
                  show_code: e.target.checked,
                }));
              }}
              style={{ marginRight: "5px" }}
            />
            <label htmlFor="code" style={{ marginRight: "15px" }}>
              SQL
            </label>
            <input
              type="checkbox"
              id="tag"
              checked={checkboxStatus.show_tags}
              onChange={(e) => {
                setCheckboxStatus((status) => ({
                  ...status,
                  show_tags: e.target.checked,
                }));
              }}
              style={{ marginRight: "5px" }}
            />
            <label htmlFor="tag" style={{ marginRight: "15px" }}>
              Tags
            </label>
          </div>
        </div>
        <div className="app-details">
          <div className="app-frame app-pad" style={{ paddingTop: 0 }}>
            <div className="results" style={{ height: totalHeight + "px" }}>
              {items.map(({ index, key, start, measureElement }) => {
                const result = results[index];
                return (
                  <div
                    key={key}
                    style={{
                      transform: `translateY(${start}px)`,
                      position: "absolute",
                      width: "100%",
                    }}
                    ref={(el) => {
                      measureElement(el);
                      requestAnimationFrame(() => measureElement(el));
                    }}
                  >
                    <Link
                      href={getNodeUrl(result.model)}
                      onClick={(e) => {
                        if (!e.ctrlKey && !e.metaKey) {
                          clearQuery();
                        }
                      }}
                    >
                      <div className="result search-result">
                        <div className="result-content">
                          <div className="result-icn">
                            <svg className="icn ">
                              <use xlinkHref="#icn-doc"></use>
                            </svg>
                          </div>
                          <div className="result-body">
                            <h4 className="a">
                              <span
                                dangerouslySetInnerHTML={{
                                  __html: checkboxStatus.show_names
                                    ? highlight(getModelName(result.model))
                                    : getModelName(result.model),
                                }}
                              />
                              <small>{result.model.resource_type}</small>
                            </h4>
                            <p
                              dangerouslySetInnerHTML={{
                                __html: checkboxStatus.show_descriptions
                                  ? highlight(shorten(result.model.description))
                                  : shorten(result.model.description),
                              }}
                            />
                          </div>
                        </div>
                        {query.length > 0 ? (
                          <>
                            <div className="sub-results">
                              <div style={{ display: "grid" }}>
                                <div
                                  style={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    rowGap: "2px",
                                    columnGap: "4px",
                                  }}
                                >
                                  {columnFilter(result.model.columns).map(
                                    (column: any, index, arr) => (
                                      <span key={index}>
                                        {index === 0 ? (
                                          <span>columns: </span>
                                        ) : null}
                                        <span
                                          dangerouslySetInnerHTML={{
                                            __html: checkboxStatus.show_columns
                                              ? highlight(
                                                  column +
                                                    (arr.length - 1 === index
                                                      ? ""
                                                      : ",")
                                                )
                                              : column +
                                                (arr.length - 1 === index
                                                  ? ""
                                                  : ","),
                                          }}
                                        />
                                      </span>
                                    )
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="sub-results">
                              <span>
                                <span
                                  dangerouslySetInnerHTML={{
                                    __html: highlight(
                                      shorten(result.model["raw_code"])
                                    ),
                                  }}
                                />
                              </span>
                            </div>
                            <div className="sub-results">
                              {result.model.tags.length ? (
                                <>
                                  <span>tags: </span>
                                  {result.model.tags.map(
                                    (
                                      tag: string,
                                      index: number,
                                      arr: string[]
                                    ) => (
                                      <span key={tag}>
                                        <span
                                          dangerouslySetInnerHTML={{
                                            __html: highlight(
                                              tag +
                                                (index === arr.length - 1
                                                  ? ""
                                                  : ",")
                                            ),
                                          }}
                                        ></span>
                                      </span>
                                    )
                                  )}
                                </>
                              ) : null}
                            </div>
                          </>
                        ) : null}
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
