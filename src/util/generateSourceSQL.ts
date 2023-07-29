import _ from "underscore";

export function generateSourceSQL(model: any) {
  var query = ["select"];

  var num_columns = _.size(model.columns);
  var cols = _.keys(model.columns);
  _.each(cols, function (name, i) {
    var line = "    " + name;
    if (i + 1 != num_columns) {
      line += ",";
    }
    query.push(line);
  });

  const database = model.database ? model.database + "." : "";
  const rel = database + model.schema + "." + model.identifier;

  query.push("from " + rel);
  return query.join("\n");
}
