const Instances = ({ instance, search, setSearch }) => {
  let instancesSummary = [];
  let instanceData = {};
  let defaultKeywords = [
    "schema:name",
    "schema:description",
    "pav:createdBy",
    "pav:lastUpdatedOn",
    "variable",
  ];

  // instance.map((inst) => iterateObject(inst));

  //search template json by keywords
  function iterateObject(obj, keywords, result = {}) {
    for (let key in obj) {
      if (typeof obj[key] == "object") {
        iterateObject(obj[key], keywords, result);
      } else {
        if (keywords.includes(key)) {
          result[key] = obj[key]; // add key-value pair to
        }
      }
    }
    return result;
  }

  for (let i = 0; i < instance.length; i++) {
    instancesSummary.push(iterateObject(instance[i], defaultKeywords, {}));
  }
  instancesSummary = instancesSummary.filter(
    (i) =>
      i["schema:name"].toLowerCase().includes(search.toLowerCase()) ||
      i["pav:lastUpdatedOn"].toLowerCase().includes(search.toLowerCase()) ||
      i["schema:description"].toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="instances">
      {instancesSummary.map((data, i) => (
        <div key={i} className="content">
          <h2>{data["schema:name"]}</h2>
          {/* <h5>AUTHOR: {data["pav:createdBy"]}</h5> */}
          <h4>LAST UPDATED: {data["pav:lastUpdatedOn"]}</h4>
          <p>{data["schema:description"]}</p>
        </div>
      ))}
    </section>
  );
};

export default Instances;
