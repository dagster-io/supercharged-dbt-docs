import React, { Suspense } from "react";

export default function Home() {
  return (
    <div className="app-details app-scroll app-pad">
      <div className="app-frame app-pad">
        <div className="panel panel-default">
          <div className="panel-body">
            <p>
              <h1 id="data-documentation-for-gitlab">
                Data Documentation for GitLab
              </h1>
              <p>
                All other documentation is in our handbook in the following
                links:
              </p>
              <ul>
                <li>
                  <a href="https://about.gitlab.com/handbook/business-technology/data-team/platform/">
                    Data Team Handbook
                  </a>
                </li>
                <li>
                  <a href="https://about.gitlab.com/handbook/business-technology/data-team/platform/dbt-guide/">
                    dbt Guide
                  </a>
                </li>
                <li>
                  <a href="https://about.gitlab.com/handbook/business-technology/data-team/platform/sql-style-guide/">
                    SQL Style Guide
                  </a>
                </li>
              </ul>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
