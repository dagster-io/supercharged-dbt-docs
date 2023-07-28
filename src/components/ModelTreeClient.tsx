"use client";

import Link from "next/link";
import React from "react";
import _ from "underscore";
import useSWR from "swr";

// Used before the data is loading to store which item was set as active
let _currentActive: string | null = null;
let _setActive: (uniqueId: string) => void = (uniqueId) => {
  _currentActive = uniqueId;
};
export function setActive(uniqueId: string) {
  _setActive(uniqueId);
}
async function fetcher(url: string) {
  const response = await fetch(url);
  const json = await response.json();
  return json;
}

const emptyObject = {};

export function ModelTreeClient() {
  const [activeSection, setActiveSection] = React.useState<
    "project" | "database"
  >("project");

  const { data } = useSWR("/treedata", fetcher);
  const tree = data || emptyObject;

  const [_unused, forceRerender] = React.useReducer((s) => s + 1, 0);
  const setActive = React.useCallback(
    (uniqueId: string) => {
      updateSelected(uniqueId, tree);
      forceRerender();
      setTimeout(() => {
        const el = document.querySelector(
          "*[data-nav-unique-id='" + uniqueId + "']"
        );
        if (el && el.scrollIntoView) {
          el.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "center",
          });
        }
      }, 100);
    },
    [tree]
  );
  React.useEffect(() => {
    if (data) {
      _setActive = setActive;
      if (_currentActive) {
        setActive(_currentActive);
      }
    }
  }, [data, setActive]);

  return (
    <>
      <div className="menu">
        <ul>
          <li>
            <a ui-sref="dbt.overview()" className="menu-link menu-main">
              Overview
            </a>
          </li>
          <li>
            <div className="switches">
              <div className="switch ">
                <span
                  className={`${
                    activeSection === "project" ? "active" : ""
                  } switch-label btn btn-sm`}
                  onClick={() => {
                    setActiveSection("project");
                  }}
                >
                  <svg className="icn menu-icon-on">
                    <use xlinkHref="#icn-dir-on"></use>
                  </svg>
                  Project
                </span>
              </div>
              <div className="switch">
                <span
                  className={`${
                    activeSection === "database" ? "active" : ""
                  } switch-label btn btn-sm`}
                  onClick={() => {
                    setActiveSection("database");
                  }}
                >
                  <svg className="icn menu-icon-on">
                    <use xlinkHref="#icn-tree-on"></use>
                  </svg>
                  Database
                </span>
              </div>
            </div>
          </li>
          {activeSection === "project" ? (
            <li>
              <div className="menu">
                <TreeSection
                  title="Sources"
                  elements={tree.sources}
                  resourceType="source"
                  setActive={setActive}
                />
                <TreeSection
                  title="Exposures"
                  elements={tree.exposures}
                  resourceType="exposure"
                  setActive={setActive}
                />
                <TreeSection
                  title="Metrics"
                  elements={tree.metrics}
                  resourceType="model"
                  setActive={setActive}
                />
                <TreeSection
                  title="Projects"
                  elements={tree.project}
                  resourceType="model"
                  setActive={setActive}
                />
              </div>
            </li>
          ) : (
            <li>
              <MenuTreeSection
                title="Tables and Views"
                elements={tree.database}
                resourceType="model"
                setActive={setActive}
              />
            </li>
          )}
        </ul>
      </div>
    </>
  );
}

const MenuTreeSection = ({
  title,
  elements,
  resourceType,
  setActive,
}: {
  title: string;
  elements: any;
  resourceType: any;
  setActive: (uniqueId: string) => void;
}) => {
  return elements?.length ? (
    <div className="menu">
      <TreeSection
        title={title}
        elements={elements}
        resourceType={resourceType}
        setActive={setActive}
      />
    </div>
  ) : null;
};

const TreeSection = ({
  title,
  elements,
  resourceType,
  setActive,
}: {
  title: string;
  elements: any;
  resourceType: any;
  setActive: (uniqueId: string) => void;
}) => {
  return elements?.length ? (
    <div>
      <strong>{title}</strong>
      <ul style={{ display: "block" }}>
        {elements.map((item: any) => (
          <ModelTreeLine
            key={item.name}
            item={item}
            resourceType={resourceType}
            active={item.active}
            setActive={setActive}
          />
        ))}
      </ul>
      <br />
    </div>
  ) : null;
};

const ModelTreeLine = ({
  item,
  resourceType,
  depth = 0,
  active = false,
  setActive,
}: {
  item: any;
  resourceType: any;
  depth?: number;
  active?: boolean;
  setActive: (uniqueId: string) => void;
}) => {
  const name = item.name;
  const end = _.last(name, 15).join("");
  const start = _.initial(name, end.length).join("");

  const [isOpen, setIsOpen] = React.useState(false);
  React.useEffect(() => {
    if (active && !item.unique_id) {
      setIsOpen(true);
    }
  }, [active, item.unique_id]);

  const classes: any = {
    active: item.active || isOpen,
    "menu-tree":
      item.type == "header" || item.type == "schema" || item.type == "folder",
    "menu-main": item.type == "header",
    "menu-node": item.type == "file" || item.type == "table",
  };
  const className = Object.keys(classes)
    .filter((key) => classes[key])
    .join(" ");

  return (
    <li className="unselectable">
      {item.unique_id ? (
        <Link href={`/${item.resource_type}/${item.unique_id}`} legacyBehavior>
          <a
            className={`unselectable ${className}`}
            onClick={() => {
              setActive(item.unique_id);
            }}
            data-nav-unique-id={item.unique_id}
            title={name}
          >
            <span className="filename">
              <span className="filename-normal">
                <svg className="icn menu-icon-on">
                  <use xlinkHref={getIcon(item.type, "on")} />
                </svg>
                <svg className="icn menu-icon-off">
                  <use xlinkHref={getIcon(item.type, "off")} />
                </svg>
              </span>
              <span className="filename-ellip">{start}</span>
              <span className="filename-normal">{end}</span>
            </span>
          </a>
        </Link>
      ) : (
        <a
          className={`unselectable ${className}`}
          onClick={() => {
            setIsOpen((isOpen) => !isOpen);
          }}
        >
          <span className="filename">
            <span className="filename-normal">
              <svg className="icn menu-icon-on">
                <use xlinkHref={getIcon(item.type, "on")} />
              </svg>
              <svg className="icn menu-icon-off">
                <use xlinkHref={getIcon(item.type, "off")} />
              </svg>
            </span>
            <span className="filename-ellip">{start}</span>
            <span className="filename-normal">{end}</span>
          </span>
        </a>
      )}

      {isOpen && item.items?.length ? (
        <ul>
          {item.items.map((subitem: any, index: number) => (
            <ModelTreeLine
              key={index}
              depth={depth + 1}
              item={subitem}
              resourceType={resourceType}
              active={subitem.active}
              setActive={setActive}
            />
          ))}
        </ul>
      ) : null}
    </li>
  );
};

function getIcon(type: keyof typeof icons, onOff: "on" | "off") {
  const icons = {
    header: {
      on: "icn-down",
      off: "icn-right",
    },
    database: {
      on: "icn-db-on",
      off: "icn-db",
    },
    schema: {
      on: "icn-tree-on",
      off: "icn-tree",
    },
    table: {
      on: "icn-doc-on",
      off: "icn-doc",
    },
    folder: {
      on: "icn-dir-on",
      off: "icn-dir",
    },
    file: {
      on: "icn-doc-on",
      off: "icn-doc",
    },
    group: {
      on: "icn-filter",
      off: "icn-filter",
    },
  };

  return "#" + icons[type][onOff];
}

function updateSelectedInTree(uniqueId: string, subtrees: any) {
  var is_active = false;
  _.each(subtrees, function (subtree) {
    if (subtree.unique_id) {
      if (subtree.unique_id == uniqueId) {
        subtree.active = true;
        is_active = true;
      } else {
        subtree.active = false;
      }
    } else {
      const child_active = updateSelectedInTree(uniqueId, subtree.items);
      subtree.active = child_active;
      is_active = child_active;
    }
  });
  return is_active;
}

function updateSelected(uniqueId: string, tree: any) {
  updateSelectedInTree(uniqueId, tree.project);
  updateSelectedInTree(uniqueId, tree.database);
  updateSelectedInTree(uniqueId, tree.groups);
  updateSelectedInTree(uniqueId, tree.sources);
  updateSelectedInTree(uniqueId, tree.exposures);
  updateSelectedInTree(uniqueId, tree.metrics);
}
