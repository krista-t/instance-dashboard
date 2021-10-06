//import { useState, useEffect } from "react";
const Instances = ({ instance, search, filter }) => {
  let instancesSummary = [];
  let defaultKeywords = [
    "schema:name",
    "schema:description",
    "pav:createdBy",
    "pav:lastUpdatedOn",
    "rdfs:label",
    "subject",
    "variable",
  ];

  instance.map((instance) => delete instance["@context"]);
  //search template json by keywords
  function iterateObject(obj, keywords, result = {}) {
    for (let key in obj) {
      if (typeof obj[key] == "object" && !Array.isArray(obj[key])) {
        iterateObject(obj[key], keywords, result);
      } else {
        if (keywords.includes(key)) {
          if (Array.isArray(obj[key])) {
            let term = [];
            let terms = [];
            for (let i = 0; i < obj[key].length; i++) {
              term = obj[key][i]["rdfs:label"];
              terms.push(term);
            }
            result[key] = terms;
          } else {
            result[key] = obj[key];
          }
        }
      }
    }
    return result;
  }

  let summaryData;
  for (let i = 0; i < instance.length; i++) {
    summaryData = iterateObject(instance[i], defaultKeywords, {});
    instancesSummary.push(summaryData);
  }

  function searchList(instancesSummary) {
    const searchQ = instancesSummary[0] && Object.keys(instancesSummary[0]);

    // eslint-disable-next-line array-callback-return
    return instancesSummary.filter((i) => {
      if ((filter && search) || !filter.length) {
        return searchQ.some(
          (q) =>
            i[q].toString().toLowerCase().indexOf(search.toLowerCase()) > -1
        );
      }
      // if (!filter.length) {
      //   return searchQ.some(
      //     (q) =>
      //       i[q].toString().toLowerCase().indexOf(search.toLowerCase()) > -1
      //   );
      // }
      if (filter) {
        return (
          i["subject"].some((s) => filter.indexOf(s) > -1) ||
          i["variable"].some((v) => filter.indexOf(v) > -1)
        );
      }
    });
  }

  return (
    <section className="instances">
      {searchList(instancesSummary).map((data, i) => (
        <div key={i} className="content">
          <h2>{data["schema:name"]}</h2>
          {/* <h5>AUTHOR: {data["pav:createdBy"]}</h5> */}
          <h4>LAST UPDATED: {data["pav:lastUpdatedOn"]}</h4>
          <p>{data["schema:description"]}</p>
          <p>Subjects: {data["subject"]}</p>
          <p>Variables: {data["variable"]}</p>
        </div>
      ))}
    </section>
  );
};

export default Instances;
