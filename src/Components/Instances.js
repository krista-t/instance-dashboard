const Instances = ({ instance }) => {
  let instancesSummary = [];
  let instanceData = {};
  let defaultKeywords = [
    "schema:name",
    "schema:description",
    "pav:createdBy",
    "pav:lastUpdatedOn",
    "@id",
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
  console.log(instancesSummary);

  return (
    <section className="instances">
      {instancesSummary.map((data, i) => (
        <div key={i} className="content">
          <h2>{data["schema:name"]}</h2>
          <h4>{data["pav:lastUpdatedOn"]}</h4>
          <h4>Author: {data["pav:createdBy"]}</h4>
          <h4>{data["@id"]}</h4>
          <h4>{data["instance no"]}</h4>
          <p>{data["schema:description"]}</p>
        </div>
      ))}
    </section>
  );
};

export default Instances;
