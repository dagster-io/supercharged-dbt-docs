import _ from "lodash";
import OverviewPage from "../OverviewPage";

export default async function OverviewProjectPage({
  params: { id },
}: {
  params: { id: string };
}) {
  return <OverviewPage id={id} />;
}
