export const MacroArguments = ({ macro }: { macro: any }) => {
  return (
    <div className="panel">
      <div className="panel-body">
        {macro.arguments.length === 0 ? (
          <div>
            Details are not available for this macro. This may be due to the
            fact that this macro doesn&apos;t have any arguments or that they
            haven't been documented yet.
          </div>
        ) : (
          <div
            className="table-responsive"
            style={{ maxHeight: "800px", overflowY: "scroll" }}
          >
            <table className="table table-borderless table-hover">
              <thead>
                <tr>
                  <th className="arg-header">Argument</th>
                  <th className="arg-header">Type</th>
                  <th className="arg-header">Description</th>
                  <th style={{ width: "1px" }} className="text-center">
                    More?
                  </th>
                </tr>
              </thead>
              <tbody>
                {macro.arguments.map((arg: any) => {
                  <>
                    <tr
                      ng-click="arg.expanded = !arg.expanded"
                      ng-className="{'column-row-selected': arg.expanded}"
                      style={{ cursor: arg.description ? "pointer" : "auto" }}
                      className="column-row"
                    >
                      <td>
                        <div>
                          <span className="text-dark">{arg.name}</span>
                        </div>
                      </td>
                      <td>
                        <span className="text-dark">{arg.type}</span>
                      </td>
                      <td
                        style={{
                          textOverflow: "ellipsis",
                          overflowX: "hidden",
                          whiteSpace: "nowrap",
                          maxWidth: "1px",
                        }}
                      >
                        <span ng-show="!arg.expanded">{arg.description}</span>
                      </td>
                      <td className="text-center">
                        {arg.description ? (
                          <span className="text-light">
                            <span ng-if="arg.expanded">
                              <svg className="icn">
                                <use xlinkHref="#icn-up"></use>
                              </svg>
                            </span>
                            <span ng-if="!arg.expanded">
                              <svg className="icn">
                                <use xlinkHref="#icn-right"></use>
                              </svg>
                            </span>
                          </span>
                        ) : null}
                      </td>
                    </tr>
                    <tr
                      ng-show="arg.expanded"
                      style={{ backgroundColor: "white", padding: "10px" }}
                    >
                      <td colSpan={4} className="column-expanded">
                        <div style={{ padding: "5px 20px" }}>
                          <div style={{ marginBottom: "15px" }}>
                            <h5>Description</h5>
                            <span>{arg.description}</span>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </>;
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
